#!/usr/bin/env python3
"""Validate and append evidenced local-search observations; no network or account writes."""
import argparse
import csv
import hashlib
import io
import json
import math
import re
import zipfile
from collections import Counter
from datetime import datetime, timedelta
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = Path('docs/seo/evidence')
LEDGER = EVIDENCE / 'Local_Search_Observations.json'
EXECUTION = EVIDENCE / 'Local_Growth_Execution_2026-10-07.json'
BRAND_QUERY = re.compile(r'paul\s+(?:legal|(?:and\s+)?associates)|p\s*\.?\s*p\s*\.?\s*polachan|sojan\s+paul|sonam\s+paul', re.I)
COUNT_METRICS = {'organicKeywords', 'top3Keywords', 'top10Keywords', 'top20Keywords',
                 'backlinks', 'referringDomains', 'newBacklinks', 'lostBacklinks'}
ESTIMATE_METRICS = {'estimatedOrganicTraffic', 'authorityScore'}
COMMON = {'id', 'kind', 'observedAtUTC', 'sourceType', 'sourceURL', 'evidencePath'}
FIELDS = {
    'rank': {'keyword', 'engine', 'surface', 'location', 'device', 'language',
             'position', 'resultStatus', 'depth', 'competitors', 'landingURL', 'listingId'},
    'semrush': {'domain', 'database', 'reportPeriod', 'scope', 'keywordCountsBasis', 'metrics'},
    'reviews': {'profileId', 'profileURL', 'reviewCount', 'rating', 'responseCount', 'periodStart', 'periodEnd', 'newReviews'},
    'ai': {'engine', 'prompt', 'location', 'language', 'sessionContext', 'plaAppeared', 'competitors', 'citedURLs'},
    'citation': {'citationId', 'addressStatus', 'phoneStatus', 'correctionStatus', 'submittedAt', 'verifiedAt'},
}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def nonempty(value):
    return isinstance(value, str) and bool(value.strip())


def number(value, integer=False, low=0, high=None):
    return (not isinstance(value, bool) and isinstance(value, (int, float)) and
            math.isfinite(value) and (not integer or isinstance(value, int)) and
            value >= low and (high is None or value <= high))


def timestamp(value):
    require(nonempty(value), 'Observed timestamp is required')
    try:
        date = datetime.fromisoformat(value.replace('Z', '+00:00'))
    except ValueError as error:
        raise ValueError('Invalid observed timestamp') from error
    require(date.utcoffset() is not None, 'Observed timestamp must have a timezone')


def public_url(value):
    return isinstance(value, str) and urlparse(value).scheme == 'https' and bool(urlparse(value).hostname)


def evidence_file(root, value):
    require(nonempty(value), 'A saved evidence path is required')
    path = Path(value)
    require(not path.is_absolute() and '..' not in path.parts and path.parts[:3] == EVIDENCE.parts,
            'Evidence must be a repository-relative docs/seo/evidence file')
    require((root / path).is_file(), 'Saved evidence file does not exist')


def validate_baseline(data):
    require(data.get('schemaVersion') == 1, 'Unsupported local baseline schema')
    timestamp(data.get('observedAtUTC'))
    require(bool(re.fullmatch(r'[0-9a-f]{40}', data.get('sourceMain', ''))), 'Source main SHA required')
    rows = data['keywords']
    require(len({row['keyword'].casefold() for row in rows}) == len(rows), 'Duplicate keyword')
    require(len({row['id'] for row in rows}) == len(rows), 'Duplicate keyword ID')
    ids = {c['id'] for c in data['competitors']}
    require(len(ids) == len(data['competitors']), 'Duplicate competitor entity')
    for row in rows:
        require(row['priority'] in {'P0', 'P1', 'P2', 'IRRELEVANT'}, 'Unknown priority')
        if row['priority'] == 'IRRELEVANT':
            require(row['preferredLandingURL'] is None, 'Unrelated intent cannot have a landing')
            continue
        require(public_url(row['preferredLandingURL']), 'Preferred landing URL required')
        require(set(row['competitorCandidates']) <= ids, 'Unregistered competitor candidate')
        require('PROVISIONAL' in row['priorityStatus'], 'Candidate priority must disclose its basis')
        for field in ['estimatedDemand', 'difficulty', 'currentRanking', 'currentLandingURL',
                      'localPackPresence', 'organicPresence']:
            require(row[field] is None, 'Measured values belong in evidenced observation history, not candidate rows')
    return data


def baseline_files(root):
    return sorted(p for p in (root / EVIDENCE).glob('Local_Search_*.json')
                  if re.fullmatch(r'Local_Search_\d{4}-\d{2}-\d{2}\.json', p.name))


def load_baseline(root=ROOT):
    files = baseline_files(root)
    require(bool(files), 'No dated local baseline')
    return validate_baseline(json.loads(files[-1].read_text()))


def validate_record(row, baseline, root=ROOT):
    require(isinstance(row, dict), 'Observation must be a JSON object')
    kind = row.get('kind')
    require(kind in FIELDS, 'Unsupported observation kind')
    require(set(row) <= COMMON | FIELDS[kind], 'Unknown fields; do not store client data in the SEO ledger')
    require(COMMON | FIELDS[kind] <= set(row), 'Observation fields missing; use null for unmeasured optional metrics')
    require(bool(re.fullmatch(r'[a-z0-9][a-z0-9_-]{3,100}', row['id'])), 'Stable non-identifying observation ID required')
    timestamp(row['observedAtUTC'])
    require(public_url(row['sourceURL']), 'HTTPS source URL required')
    evidence_file(root, row['evidencePath'])

    if kind == 'rank':
        relevant = {r['keyword'].casefold() for r in baseline['keywords'] if r['priority'] != 'IRRELEVANT'}
        require(row['keyword'].casefold() in relevant, 'Rank query must have registered relevant intent')
        require(row['sourceType'] in {'geo_rank_tracker', 'manual_location_controlled'},
                'Public provider search and GSC averages are not location-controlled ranks')
        require(row['engine'] in {'Google', 'Bing'}, 'Actual ranking engine required')
        require(row['surface'] in {'local_pack', 'maps', 'organic'}, 'Keep pack, Maps and organic distinct')
        location = row['location']
        require(isinstance(location, dict) and set(location) == {'label', 'latitude', 'longitude'},
                'A verified point label and coordinates are required')
        require(nonempty(location['label']) and number(location['latitude'], low=-90, high=90) and
                number(location['longitude'], low=-180, high=180), 'Invalid or missing rank coordinates')
        require(row['device'] in {'desktop', 'mobile'} and nonempty(row['language']), 'Device and language required')
        require(number(row['depth'], integer=True, low=1), 'Measured search depth required')
        require(row['resultStatus'] in {'measured', 'not_found'}, 'Unavailable tracking is not an observed rank')
        if row['resultStatus'] == 'not_found':
            require(row['position'] is None, 'Not-found position must be null, not zero')
            require(row['landingURL'] is None, 'Do not assign a landing to an absent result')
        else:
            require(number(row['position'], integer=True, low=1, high=row['depth']), 'Invalid absolute observed position')
            if row['surface'] == 'organic':
                require(public_url(row['landingURL']), 'Preserve the actual ranked organic landing URL')
            else:
                require(nonempty(row['listingId']), 'Identify the actual PLA listing for a measured Maps/pack rank')
        require(row['landingURL'] is None or public_url(row['landingURL']), 'Invalid ranked landing URL')
        if row['surface'] == 'local_pack':
            require(row['engine'] == 'Google' and row['depth'] <= 3, 'Local Pack is a Google pack observation, not Maps depth')
        require(isinstance(row['competitors'], list) and all(nonempty(x) for x in row['competitors']), 'Competitor observations must be a list')

    elif kind == 'semrush':
        domains = {'paullegalassociates.com'} | {d for c in baseline['competitors'] for d in c['domains']}
        require(row['sourceType'] == 'semrush' and row['domain'] in domains, 'Semrush domain must be registered')
        require(row['database'] == 'in' and row['scope'] == 'national_domain', 'India national data must be labelled national')
        require(nonempty(row['reportPeriod']), 'Copy the actual provider report period')
        require(row['keywordCountsBasis'] in {'provider_domain_totals', 'complete_position_export', 'unavailable'}, 'Keyword-count basis required')
        metrics = row['metrics']
        require(isinstance(metrics, dict) and set(metrics) == COUNT_METRICS | ESTIMATE_METRICS, 'Complete metric contract required; unknowns null')
        for key, value in metrics.items():
            require(value is None or number(value, integer=key in COUNT_METRICS, high=100 if key == 'authorityScore' else None), 'Invalid Semrush metric')
        if row['keywordCountsBasis'] == 'unavailable':
            require(all(metrics[k] is None for k in ['organicKeywords', 'top3Keywords', 'top10Keywords', 'top20Keywords']),
                    'Do not calculate domain totals from a truncated keyword export')
        ordered = [metrics[k] for k in ['top3Keywords', 'top10Keywords', 'top20Keywords', 'organicKeywords'] if metrics[k] is not None]
        require(ordered == sorted(ordered), 'Top-3/10/20 counts are cumulative within the same keyword universe')

    elif kind == 'reviews':
        require(row['sourceType'] in {'google_profile', 'gbp_manager'}, 'Directory ratings are not Google review metrics')
        require(nonempty(row['profileId']) and public_url(row['profileURL']), 'Verified existing Google profile identity required')
        host = urlparse(row['profileURL']).hostname
        require(host in {'g.page', 'share.google', 'google.com'} or host.endswith('.google.com'),
                'A Google profile URL is required')
        require(row['reviewCount'] is None or number(row['reviewCount'], integer=True), 'Invalid review count')
        require(row['rating'] is None or number(row['rating'], low=1, high=5), 'Invalid rating')
        require(row['responseCount'] is None or number(row['responseCount'], integer=True), 'Invalid response count')
        if row['responseCount'] is not None:
            require(row['reviewCount'] is not None and row['responseCount'] <= row['reviewCount'], 'Response count exceeds observed review count')
        if row['newReviews'] is not None:
            require(number(row['newReviews'], integer=True) and row['periodStart'] is not None and row['periodEnd'] is not None,
                    'New-review counts need publication-date evidence and an explicit period')
        require((row['periodStart'] is None) == (row['periodEnd'] is None), 'Review-period boundaries must be paired')
        if row['periodStart'] is not None:
            start = datetime.fromisoformat(row['periodStart']).date()
            end = datetime.fromisoformat(row['periodEnd']).date()
            require(start <= end, 'Invalid review period')

    elif kind == 'ai':
        require(row['sourceType'] == 'independent_engine_answer', 'Operator/provider search is not an AI answer test')
        require(row['engine'] in {'ChatGPT Search', 'Copilot', 'Google AI Mode', 'Google AI Overviews'}, 'Actual independent engine required')
        require(row['prompt'] in baseline['ai']['probePrompts'], 'Use the registered repeated prompt cohort')
        require(all(nonempty(row[x]) for x in ['location', 'language', 'sessionContext']), 'AI test location/language/session required')
        require(isinstance(row['plaAppeared'], bool), 'PLA appearance must be explicitly observed')
        require(isinstance(row['competitors'], list) and all(nonempty(x) for x in row['competitors']), 'AI competitor list required')
        require(isinstance(row['citedURLs'], list) and all(public_url(x) for x in row['citedURLs']), 'Preserve actual cited URLs')

    elif kind == 'citation':
        require(row['citationId'] in {c['id'] for c in baseline['citations']}, 'Use the existing citation identity')
        require(row['sourceType'] in {'public_directory', 'public_company_profile', 'owned_profile_readback'}, 'Citation source type required')
        require(row['addressStatus'] in {'matches', 'conflict', 'mixed', 'not_observed'} and row['phoneStatus'] in {'matches', 'conflict', 'unconfirmed', 'not_observed'}, 'Field-level NAP state required')
        require(row['correctionStatus'] in {'not_submitted', 'submitted', 'verified'}, 'Separate preparation, submission and live verification')
        if row['correctionStatus'] == 'not_submitted':
            require(row['submittedAt'] is None and row['verifiedAt'] is None, 'Prepared correction is not submitted')
        else:
            timestamp(row['submittedAt'])
            if row['correctionStatus'] == 'submitted':
                require(row['verifiedAt'] is None, 'Submission alone is not verified')
            else:
                timestamp(row['verifiedAt'])
                require(datetime.fromisoformat(row['submittedAt'].replace('Z', '+00:00')) <=
                        datetime.fromisoformat(row['verifiedAt'].replace('Z', '+00:00')), 'Verification predates submission')
    return row


def read_ledger(root=ROOT):
    path = root / LEDGER
    data = json.loads(path.read_text()) if path.exists() else {'schemaVersion': 1, 'observations': []}
    require(data.get('schemaVersion') == 1 and isinstance(data.get('observations'), list), 'Invalid observation ledger')
    require(len({r['id'] for r in data['observations']}) == len(data['observations']), 'Duplicate observation ID')
    return data


def append_record(row, root=ROOT):
    baseline = load_baseline(root)
    validate_record(row, baseline, root)
    ledger = read_ledger(root)
    for saved in ledger['observations']:
        validate_record(saved, baseline, root)
        if saved['id'] == row['id']:
            require(saved == row, 'Conflicting observation ID; retain history, do not overwrite')
            return False
    ledger['observations'].append(row)
    target = root / LEDGER
    temporary = target.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + '\n')
    temporary.replace(target)
    return True


def read_gsc_export(path, baseline, observed_at, days, country=None, report_kind='web', ui_position=None):
    """Read an official CSV ZIP without publishing undisclosed/private query strings.

    Exported impressions measure PLA visibility, not keyword volume or Maps rank.
    Native generative-AI exports have impressions only and must be labelled explicitly.
    """
    timestamp(observed_at)
    require(days in {28, 90}, 'Use an exact complete 28- or 90-day period')
    require(country in {None, 'India'}, 'Use all countries or the native India filter')
    require(report_kind in {'web', 'generative_ai'}, 'Actual native report kind required')
    raw = path.read_bytes()
    require(len(raw) <= 10_000_000, 'Export exceeds the supported private input size')
    with zipfile.ZipFile(io.BytesIO(raw)) as archive:
        names = archive.namelist()
        require(len(names) == len(set(names)), 'Duplicate export members')
        require(sum(item.file_size for item in archive.infolist()) <= 20_000_000, 'Expanded export too large')
        required = {'Chart.csv', 'Pages.csv', 'Countries.csv', 'Devices.csv', 'Filters.csv'}
        if report_kind == 'web':
            required |= {'Queries.csv', 'Search appearance.csv'}
        require(required <= set(names), 'Official export tables are missing')
        tables = {name: list(csv.DictReader(io.StringIO(archive.read(name).decode('utf-8-sig'))))
                  for name in required}
    filters = {row['Filter']: row['Value'] for row in tables['Filters.csv']}
    require(set(filters) <= {'Search type', 'Date', 'Country'} and
            filters.get('Search type') == 'Web' and nonempty(filters.get('Date')),
            'Unsupported search type or query/page/device filter; do not mislabel a filtered report')
    require(filters.get('Country') == country, 'Requested country disagrees with the native filter')
    chart = tables['Chart.csv']
    require(len(chart) == days, 'Preset three months is not necessarily 90 days')
    dates = [datetime.strptime(row['Date'], '%Y-%m-%d').date() for row in chart]
    require(dates == [dates[0] + timedelta(days=n) for n in range(days)], 'Dates must be unique, ordered and contiguous')
    require(dates[-1] < datetime.fromisoformat(observed_at.replace('Z', '+00:00')).date(),
            'Do not include the current incomplete reporting day')

    def metric(row):
        result = {'impressions': int(row['Impressions'])}
        require(number(result['impressions'], integer=True), 'Invalid impression count')
        if report_kind == 'web':
            result.update(clicks=int(row['Clicks']), ctrPercent=float(row['CTR'].rstrip('%')),
                          averagePosition=float(row['Position']))
            require(number(result['clicks'], integer=True, high=result['impressions']) and
                    number(result['ctrPercent'], high=100) and number(result['averagePosition'], low=1),
                    'Invalid click, CTR or average-position value')
        return result

    totals = {'impressions': sum(metric(row)['impressions'] for row in chart)}
    if report_kind == 'web':
        totals['clicks'] = sum(metric(row)['clicks'] for row in chart)
        totals['ctrPercentFromCounts'] = totals['clicks'] / totals['impressions'] * 100 if totals['impressions'] else None
        require(ui_position is None or number(ui_position, low=1), 'Invalid native UI average position')
        totals['uiAveragePositionRounded'] = ui_position
    else:
        require(ui_position is None, 'AI impressions are not organic position or click metrics')
        totals.update(clicks=None, ctrPercentFromCounts=None, uiAveragePositionRounded=None)

    candidates = {r['keyword'].casefold(): r['id'] for r in baseline['keywords'] if r['priority'] != 'IRRELEVANT'}
    queries = tables.get('Queries.csv', [])
    query_keys = [r['Top queries'].casefold() for r in queries]
    require(len(query_keys) == len(set(query_keys)), 'Duplicate disclosed query rows')
    brand_rows = [r for r in queries if BRAND_QUERY.search(r['Top queries'])]
    nonbrand_rows = [r for r in queries if not BRAND_QUERY.search(r['Top queries'])]
    disclosed_clicks = sum(metric(r)['clicks'] for r in queries) if queries else 0
    if report_kind == 'web':
        require(disclosed_clicks <= totals['clicks'], 'Query clicks exceed the site aggregate; verify export scope')
    allowed_queries = [{'candidateId': candidates[r['Top queries'].casefold()],
                        'keyword': next(b['keyword'] for b in baseline['keywords'] if b['id'] == candidates[r['Top queries'].casefold()]),
                        **metric(r)} for r in queries if r['Top queries'].casefold() in candidates]

    pages = []
    for row in tables['Pages.csv']:
        url = row['Top pages']
        parsed = urlparse(url)
        require(parsed.scheme == 'https' and parsed.hostname == 'paullegalassociates.com' and
                not parsed.query and not parsed.username and not parsed.password and
                (not parsed.fragment or parsed.fragment.startswith('/')),
                'Do not publish foreign URLs, credentials or page query parameters')
        pages.append({'url': url, **metric(row)})
    result = {'sourceType': 'official_gsc_ui_csv', 'reportKind': report_kind,
              'observedAtUTC': observed_at, 'property': 'https://paullegalassociates.com/',
              'country': country or 'All countries', 'device': 'All devices',
              'periodStart': str(dates[0]), 'periodEnd': str(dates[-1]), 'completeDays': days,
              'nativeDateFilterLabel': filters['Date'], 'archiveSHA256': hashlib.sha256(raw).hexdigest(),
              'sourceObservationBasis': 'Official native exports obtained in this run; parsed and verified at the recorded UTC time. Period boundaries are copied from the export daily chart.',
              'totals': totals, 'pages': pages,
              'countries': [{'country': r['Country'], **metric(r)} for r in tables['Countries.csv']],
              'devices': [{'device': r['Device'], **metric(r)} for r in tables['Devices.csv']],
              'candidateQueries': allowed_queries,
              'limitations': ['GSC averages are reporting-period observations, not Maps/local ranks or keyword demand.',
                              'Query/page aggregates may differ from property totals; absent rows are unknown, not zero.',
                              'Raw exports remain private; only existing registered legal queries are published.']}
    if report_kind == 'web':
        result['disclosedQueries'] = {
            'rows': len(queries), 'clicks': disclosed_clicks,
            'impressions': sum(metric(r)['impressions'] for r in queries),
            'siteClicksNotInDisclosedQueries': totals['clicks'] - disclosed_clicks,
            'brandRule': BRAND_QUERY.pattern,
            'branded': {'clicks': sum(metric(r)['clicks'] for r in brand_rows), 'impressions': sum(metric(r)['impressions'] for r in brand_rows)},
            'nonBranded': {'clicks': sum(metric(r)['clicks'] for r in nonbrand_rows), 'impressions': sum(metric(r)['impressions'] for r in nonbrand_rows)}}
        result['searchAppearance'] = [{'appearance': r['Search Appearance'], **metric(r)} for r in tables['Search appearance.csv']]
    else:
        result['limitations'].append('Google generative-AI feature impressions are not independent AI-answer citations or qualified enquiries.')
    return result


def validate_gsc_report(report, baseline):
    require(report['sourceType'] == 'official_gsc_ui_csv' and report['property'] == 'https://paullegalassociates.com/',
            'Official existing-property source required')
    timestamp(report['observedAtUTC'])
    require(report['reportKind'] in {'web', 'generative_ai'} and report['country'] in {'All countries', 'India'} and
            report['device'] == 'All devices', 'Keep the native report kind and geographic scope')
    start = datetime.strptime(report['periodStart'], '%Y-%m-%d').date()
    end = datetime.strptime(report['periodEnd'], '%Y-%m-%d').date()
    require(report['completeDays'] in {28, 90} and (end - start).days + 1 == report['completeDays'], 'Invalid complete period')
    require(bool(re.fullmatch(r'[a-f0-9]{64}', report['archiveSHA256'])), 'Private source export hash required')
    require(number(report['totals']['impressions'], integer=True), 'Invalid total impressions')
    if report['reportKind'] == 'generative_ai':
        require(all(report['totals'][key] is None for key in ['clicks', 'ctrPercentFromCounts', 'uiAveragePositionRounded']) and
                not report['candidateQueries'] and 'disclosedQueries' not in report,
                'Do not convert Google AI impressions into clicks, queries or rankings')
    else:
        require(number(report['totals']['clicks'], integer=True), 'Invalid total clicks')
        disclosed = report['disclosedQueries']
        require(disclosed['branded']['clicks'] + disclosed['nonBranded']['clicks'] == disclosed['clicks'] and
                disclosed['siteClicksNotInDisclosedQueries'] == report['totals']['clicks'] - disclosed['clicks'] and
                number(disclosed['siteClicksNotInDisclosedQueries'], integer=True), 'Do not conceal anonymous query clicks')
    relevant = {r['id']: r['keyword'] for r in baseline['keywords'] if r['priority'] != 'IRRELEVANT'}
    require(len({r['candidateId'] for r in report['candidateQueries']}) == len(report['candidateQueries']), 'Duplicate measured candidate')
    for row in report['candidateQueries']:
        require(row['candidateId'] in relevant and row['keyword'] == relevant[row['candidateId']] and
                set(row) == {'candidateId', 'keyword', 'clicks', 'impressions', 'ctrPercent', 'averagePosition'},
                'Publish only the existing registered legal query fields, never private query rows or local ranks')
        require(number(row['clicks'], integer=True) and number(row['impressions'], integer=True) and
                number(row['ctrPercent'], high=100) and number(row['averagePosition'], low=1), 'Invalid candidate metrics')
    return report


def import_gsc(report, cycle_id, root=ROOT):
    validate_gsc_report(report, load_baseline(root))
    path = root / EXECUTION
    data = json.loads(path.read_text())
    cycles = [r for r in data['executionCycles'] if r['id'] == cycle_id]
    require(len(cycles) == 1, 'Use the existing actual execution cycle, not a parallel scorecard')
    reports = cycles[0].setdefault('officialGoogleMeasurement', {}).setdefault('gscReports', [])
    for saved in reports:
        if saved['archiveSHA256'] == report['archiveSHA256']:
            require(saved == report, 'Conflicting export metadata; preserve the earlier import')
            return False
        require((saved['reportKind'], saved['country'], saved['periodStart'], saved['periodEnd']) !=
                (report['reportKind'], report['country'], report['periodStart'], report['periodEnd']),
                'Conflicting report for the same settled period')
    reports.append(report)
    temporary = path.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    temporary.replace(path)
    return True


def export_keywords(baseline, target, execution=None):
    columns = ['id', 'keyword', 'priority', 'priorityStatus', 'intent', 'geographicModifier', 'nearMe',
               'estimatedDemand', 'demandScope', 'currentRanking', 'currentLandingURL', 'preferredLandingURL',
               'localPackPresence', 'organicPresence', 'difficulty', 'commercialImportance', 'action',
               'historicalExactQueryRows', 'historicalSource', 'competitorCandidates']
    measured_columns = ['measuredPriority', 'measuredPriorityBasis', 'gscReportPeriod', 'gscCountry',
                        'gscClicks', 'gscImpressions', 'gscCTRPercent', 'gscAveragePosition',
                        'gscQueryRowStatus', 'gscObservedLandingURLs', 'measuredNextAction', 'measurementEvidence']
    measurements = {}
    if execution:
        # A newer public/citation checkpoint does not supersede a verified Google report.
        # Keep its original reporting dates and source-matched decisions/landing evidence.
        reports = [(report, cycle['officialGoogleMeasurement'])
                   for cycle in execution['executionCycles']
                   for report in cycle.get('officialGoogleMeasurement', {}).get('gscReports', [])
                   if report['reportKind'] == 'web' and report['country'] == 'India' and report['completeDays'] == 90]
        if reports:
            report, google = max(reports, key=lambda item: (item[0]['periodEnd'], item[0]['observedAtUTC']))
            priorities = {r['candidateId']: r for r in google.get('keywordDecisions', [])}
            rows = {r['candidateId']: r for r in report['candidateQueries']}
            landings = {r['keyword'].casefold(): [p['url'] for p in r['pages']]
                        for r in google.get('queryPages', [])}
            for row in baseline['keywords']:
                if row['priority'] == 'IRRELEVANT':
                    continue
                actual, decision = rows.get(row['id']), priorities.get(row['id'], {})
                measurements[row['id']] = {
                    'measuredPriority': decision.get('priority'), 'measuredPriorityBasis': decision.get('basis'),
                    'gscReportPeriod': report['periodStart'] + '/' + report['periodEnd'], 'gscCountry': 'India',
                    'gscClicks': actual['clicks'] if actual else None,
                    'gscImpressions': actual['impressions'] if actual else None,
                    'gscCTRPercent': actual['ctrPercent'] if actual else None,
                    'gscAveragePosition': actual['averagePosition'] if actual else None,
                    'gscQueryRowStatus': 'DISCLOSED_EXACT_MATCH' if actual else 'NOT_RETURNED_UNKNOWN',
                    'gscObservedLandingURLs': json.dumps(landings[row['keyword'].casefold()], separators=(',', ':')) if row['keyword'].casefold() in landings else None,
                    'measuredNextAction': decision.get('nextAction'),
                    'measurementEvidence': str(EXECUTION)}
    if measurements:
        columns += measured_columns
    with target.open('w', newline='', encoding='utf-8') as handle:
        writer = csv.DictWriter(handle, fieldnames=columns, lineterminator='\n')
        writer.writeheader()
        for row in baseline['keywords']:
            output = {key: row.get(key) for key in columns}
            output.update(measurements.get(row['id'], {}))
            for key in ['historicalExactQueryRows', 'competitorCandidates']:
                output[key] = json.dumps(output[key] or [], ensure_ascii=False, separators=(',', ':'))
            writer.writerow(output)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('check')
    record = sub.add_parser('record')
    record.add_argument('input', type=Path, help='One public/aggregate observation JSON; never client-level data')
    export = sub.add_parser('export-keywords')
    export.add_argument('--output', type=Path, default=EVIDENCE / 'Local_Keyword_Queue.csv')
    gsc = sub.add_parser('import-gsc', help='Sanitise an official private CSV ZIP into an existing execution cycle')
    gsc.add_argument('input', type=Path)
    gsc.add_argument('--cycle', required=True)
    gsc.add_argument('--observed-at', required=True)
    gsc.add_argument('--days', type=int, choices=[28, 90], required=True)
    gsc.add_argument('--country', choices=['India'])
    gsc.add_argument('--report-kind', choices=['web', 'generative_ai'], default='web')
    gsc.add_argument('--ui-position', type=float)
    args = parser.parse_args()
    try:
        baseline = load_baseline()
        if args.command == 'record':
            row = json.loads(args.input.read_text())
            added = append_record(row)
            print(json.dumps({'id': row['id'], 'added': added, 'ledger': str(LEDGER)}))
        elif args.command == 'export-keywords':
            target = args.output if args.output.is_absolute() else ROOT / args.output
            execution = json.loads((ROOT / EXECUTION).read_text()) if (ROOT / EXECUTION).is_file() else None
            export_keywords(baseline, target, execution)
            print(json.dumps({'output': str(target), 'rows': len(baseline['keywords']), 'unknownMetricCells': 'blank; never zero'}))
        elif args.command == 'import-gsc':
            report = read_gsc_export(args.input, baseline, args.observed_at, args.days,
                                     args.country, args.report_kind, args.ui_position)
            added = import_gsc(report, args.cycle)
            print(json.dumps({'added': added, 'reportKind': report['reportKind'], 'period': [report['periodStart'], report['periodEnd']],
                              'country': report['country'], 'totals': report['totals'], 'candidateMatches': len(report['candidateQueries'])}))
        else:
            for path in baseline_files(ROOT):
                validate_baseline(json.loads(path.read_text()))
            ledger = read_ledger()
            for row in ledger['observations']:
                validate_record(row, baseline)
            reports = []
            if (ROOT / EXECUTION).is_file():
                execution = json.loads((ROOT / EXECUTION).read_text())
                for cycle in execution['executionCycles']:
                    for report in cycle.get('officialGoogleMeasurement', {}).get('gscReports', []):
                        validate_gsc_report(report, baseline)
                        reports.append(report)
            print(json.dumps({'status': 'PASS', 'candidateTerms': len(baseline['keywords']),
                              'officialGSCReports': len(reports),
                              'observationsByKind': dict(Counter(r['kind'] for r in ledger['observations'])),
                              'ledgerSHA256': hashlib.sha256(json.dumps(ledger, sort_keys=True).encode()).hexdigest()}))
    except (ValueError, KeyError, TypeError, OSError, zipfile.BadZipFile, UnicodeError) as error:
        parser.exit(1, str(error) + '\n')


if __name__ == '__main__':
    main()
