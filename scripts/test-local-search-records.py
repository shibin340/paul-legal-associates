"""Adversarial measurement checks: reject evidence that would misstate local outcomes."""
import copy
import importlib.util
import csv
import io
import json
import tempfile
import unittest
import sys
import zipfile
from datetime import date, timedelta
from pathlib import Path

sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('records', Path(__file__).with_name('local-search-records.py'))
records = importlib.util.module_from_spec(spec)
spec.loader.exec_module(records)


class MeasurementTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        folder = self.root / records.EVIDENCE
        folder.mkdir(parents=True)
        self.baseline = records.load_baseline()
        (folder / 'Local_Search_2026-10-07.json').write_text(json.dumps(self.baseline))
        (folder / 'provider-evidence.json').write_text('{}')
        self.common = {'id': 'measured-fixture-001', 'observedAtUTC': '2026-10-07T14:00:00Z',
                       'sourceURL': 'https://example.org/public-observation',
                       'evidencePath': 'docs/seo/evidence/provider-evidence.json'}
        # Synthetic valid point exists only in temporary tests, never in the measurement ledger.
        self.rank = dict(self.common, kind='rank', sourceType='geo_rank_tracker', keyword='lawyer near me',
                         engine='Google', surface='local_pack', location={'label': 'Synthetic test point', 'latitude': 18.9, 'longitude': 73.1},
                         device='mobile', language='en-IN', position=2, resultStatus='measured', depth=3,
                         competitors=[], landingURL=None, listingId='synthetic-listing-fixture')

    def tearDown(self):
        self.directory.cleanup()

    def reject(self, row):
        with self.assertRaises(ValueError):
            records.validate_record(row, self.baseline, self.root)

    def test_unlocated_near_me_rank_is_rejected(self):
        row = copy.deepcopy(self.rank)
        row['location']['latitude'] = None
        self.reject(row)

    def test_provider_results_and_gsc_averages_are_not_map_ranks(self):
        for provider in ['public_search', 'gsc_average_position']:
            self.reject(dict(self.rank, sourceType=provider))

    def test_not_found_and_unavailable_cannot_be_position_zero(self):
        self.reject(dict(self.rank, resultStatus='not_found', position=0))
        self.reject(dict(self.rank, resultStatus='unavailable', position=None))
        records.validate_record(dict(self.rank, resultStatus='not_found', position=None), self.baseline, self.root)

    def test_unrelated_query_and_maps_depth_cannot_be_local_pack(self):
        self.reject(dict(self.rank, keyword='doctor near me'))
        self.reject(dict(self.rank, depth=20, position=8))

    def test_organic_rank_keeps_the_actual_landing_and_maps_keeps_listing_identity(self):
        self.reject(dict(self.rank, surface='organic'))
        self.reject(dict(self.rank, listingId=None))
        records.validate_record(dict(self.rank, surface='organic', landingURL='https://paullegalassociates.com/'), self.baseline, self.root)

    def test_directory_rating_is_not_a_google_review_baseline(self):
        row = dict(self.common, kind='reviews', sourceType='public_directory', profileId='fixture',
                   profileURL='https://bdir.in/fixture', reviewCount=97, rating=4.9,
                   responseCount=None, periodStart=None, periodEnd=None, newReviews=None)
        self.reject(row)

    def test_google_generated_share_link_is_accepted_without_accepting_lookalikes(self):
        row = dict(self.common, kind='reviews', sourceType='google_profile', profileId='fixture',
                   profileURL='https://share.google/verified-profile-fixture', reviewCount=172, rating=4.9,
                   responseCount=None, periodStart=None, periodEnd=None, newReviews=None)
        records.validate_record(row, self.baseline, self.root)
        for url in ['https://share.google.example.org/fixture', 'https://notshare.google/fixture',
                    'https://google.com.example.org/fixture']:
            self.reject(dict(row, profileURL=url))

    def test_truncated_semrush_export_cannot_supply_domain_totals(self):
        metrics = {key: None for key in records.COUNT_METRICS | records.ESTIMATE_METRICS}
        metrics['organicKeywords'] = 100
        row = dict(self.common, kind='semrush', sourceType='semrush', domain='paullegalassociates.com',
                   database='in', scope='national_domain', reportPeriod='provider fixture',
                   keywordCountsBasis='unavailable', metrics=metrics)
        self.reject(row)
        row['keywordCountsBasis'] = 'provider_domain_totals'
        records.validate_record(row, self.baseline, self.root)
        self.reject(dict(row, scope='Panvel demand'))

    def test_operator_search_is_not_an_independent_ai_test(self):
        row = dict(self.common, kind='ai', sourceType='operator_search', engine='ChatGPT Search',
                   prompt=self.baseline['ai']['probePrompts'][0], location='India', language='English',
                   sessionContext='Synthetic test', plaAppeared=True, competitors=[], citedURLs=[])
        self.reject(row)

    def test_source_and_privacy_fields_are_required(self):
        self.reject(dict(self.rank, evidencePath='docs/seo/evidence/missing.json'))
        self.reject(dict(self.rank, evidencePath='../../outside.json'))
        self.reject(dict(self.rank, clientName='Synthetic private client'))

    def test_reimport_is_idempotent_and_conflict_preserves_history(self):
        self.assertTrue(records.append_record(self.rank, self.root))
        self.assertFalse(records.append_record(self.rank, self.root))
        with self.assertRaises(ValueError):
            records.append_record(dict(self.rank, position=1), self.root)
        saved = records.read_ledger(self.root)['observations']
        self.assertEqual(len(saved), 1)
        self.assertEqual(saved[0]['position'], 2)

    def gsc_fixture(self, days=28, filters=None, ai=False, page='https://paullegalassociates.com/'):
        """Synthetic private export; no real client/query or ranking fixture is saved."""
        metric = {'Impressions': '10'} if ai else {'Clicks': '1', 'Impressions': '10', 'CTR': '10%', 'Position': '4'}
        chart = [{'Date': str(date(2026, 8, 1) + timedelta(days=n)), **metric} for n in range(days)]
        tables = {'Chart.csv': chart,
                  'Pages.csv': [{'Top pages': page, **metric}],
                  'Countries.csv': [{'Country': 'India', **metric}],
                  'Devices.csv': [{'Device': 'Mobile', **metric}],
                  'Filters.csv': filters or [{'Filter': 'Search type', 'Value': 'Web'}, {'Filter': 'Date', 'Value': 'Custom synthetic period'}]}
        if not ai:
            tables.update({'Queries.csv': [{'Top queries': 'lawyer near me', **metric},
                                          {'Top queries': 'Synthetic unrelated private query', **metric}],
                           'Search appearance.csv': []})
        path = self.root / 'private-native-export.zip'
        with zipfile.ZipFile(path, 'w') as archive:
            for name, rows in tables.items():
                text = io.StringIO()
                writer = csv.DictWriter(text, fieldnames=list(rows[0]) if rows else ['Search Appearance', *metric])
                writer.writeheader()
                writer.writerows(rows)
                archive.writestr(name, text.getvalue())
        return path

    def test_native_gsc_keeps_registered_queries_and_anonymous_gap(self):
        report = records.read_gsc_export(self.gsc_fixture(), self.baseline, '2026-10-08T20:00:00Z', 28)
        self.assertEqual(report['totals']['clicks'], 28)
        self.assertEqual(report['disclosedQueries']['siteClicksNotInDisclosedQueries'], 26)
        self.assertEqual(len(report['candidateQueries']), 1)
        self.assertNotIn('Synthetic unrelated private query', json.dumps(report))
        self.assertNotIn('currentRanking', json.dumps(report))

    def test_native_gsc_rejects_wrong_period_country_and_filtered_scope(self):
        for days in (27, 29, 92):
            with self.assertRaises(ValueError):
                records.read_gsc_export(self.gsc_fixture(days=days), self.baseline, '2026-12-01T20:00:00Z', 28)
        with self.assertRaises(ValueError):
            records.read_gsc_export(self.gsc_fixture(), self.baseline, '2026-10-08T20:00:00Z', 28, country='India')
        filters = [{'Filter': 'Search type', 'Value': 'Web'}, {'Filter': 'Date', 'Value': 'Custom'},
                   {'Filter': 'Query', 'Value': 'lawyer near me'}]
        with self.assertRaises(ValueError):
            records.read_gsc_export(self.gsc_fixture(filters=filters), self.baseline, '2026-10-08T20:00:00Z', 28)

    def test_native_gsc_rejects_incomplete_day_and_public_url_parameters(self):
        with self.assertRaises(ValueError):
            records.read_gsc_export(self.gsc_fixture(), self.baseline, '2026-08-28T20:00:00Z', 28)
        for page in ('https://example.org/', 'https://paullegalassociates.com/?client=synthetic'):
            with self.assertRaises(ValueError):
                records.read_gsc_export(self.gsc_fixture(page=page), self.baseline, '2026-10-08T20:00:00Z', 28)

    def test_native_ai_impressions_cannot_be_organic_clicks_or_positions(self):
        report = records.read_gsc_export(self.gsc_fixture(ai=True), self.baseline, '2026-10-08T20:00:00Z', 28, report_kind='generative_ai')
        self.assertEqual(report['totals']['impressions'], 280)
        self.assertIsNone(report['totals']['clicks'])
        self.assertIsNone(report['totals']['uiAveragePositionRounded'])
        with self.assertRaises(ValueError):
            records.read_gsc_export(self.gsc_fixture(ai=True), self.baseline, '2026-10-08T20:00:00Z', 28, report_kind='generative_ai', ui_position=2)

    def test_native_gsc_import_preserves_history_and_is_idempotent(self):
        report = records.read_gsc_export(self.gsc_fixture(), self.baseline, '2026-10-08T20:00:00Z', 28)
        target = self.root / records.EXECUTION
        target.write_text(json.dumps({'executionCycles': [{'id': 'actual-cycle'}]}))
        self.assertTrue(records.import_gsc(report, 'actual-cycle', self.root))
        self.assertFalse(records.import_gsc(report, 'actual-cycle', self.root))
        changed = copy.deepcopy(report)
        changed['observedAtUTC'] = '2026-10-09T20:00:00Z'
        with self.assertRaises(ValueError):
            records.import_gsc(changed, 'actual-cycle', self.root)
        self.assertEqual(len(json.loads(target.read_text())['executionCycles'][0]['officialGoogleMeasurement']['gscReports']), 1)

    def test_saved_gsc_rejects_private_queries_and_maps_rank_fields(self):
        report = records.read_gsc_export(self.gsc_fixture(), self.baseline, '2026-10-08T20:00:00Z', 28)
        records.validate_gsc_report(report, self.baseline)
        for key, value in [('keyword', 'Synthetic private query'), ('localPackRank', 2)]:
            changed = copy.deepcopy(report)
            changed['candidateQueries'][0][key] = value
            with self.assertRaises(ValueError):
                records.validate_gsc_report(changed, self.baseline)

    def test_public_only_checkpoint_preserves_last_verified_keyword_measurements(self):
        filters = [{'Filter': 'Search type', 'Value': 'Web'}, {'Filter': 'Date', 'Value': 'Custom'},
                   {'Filter': 'Country', 'Value': 'India'}]
        report = records.read_gsc_export(self.gsc_fixture(days=90, filters=filters), self.baseline,
                                        '2026-12-01T20:00:00Z', 90, country='India')
        candidate = report['candidateQueries'][0]
        google_cycle = {'id': 'google-measured', 'officialGoogleMeasurement': {
            'gscReports': [report],
            'keywordDecisions': [{'candidateId': candidate['candidateId'], 'priority': 'P0',
                                  'basis': 'Synthetic source-backed decision', 'nextAction': 'Monitor'}],
            'queryPages': [{'keyword': 'lawyer near me', 'pages': [{'url': 'https://paullegalassociates.com/'}]}]}}
        execution = {'executionCycles': [google_cycle], 'latestExecutionCycleId': 'google-measured'}
        before = self.root / 'before.csv'
        after = self.root / 'after.csv'
        records.export_keywords(self.baseline, before, execution)
        execution['executionCycles'].append({'id': 'public-readback', 'accountAccess': 'SIGN_IN_REQUIRED'})
        execution['latestExecutionCycleId'] = 'public-readback'
        records.export_keywords(self.baseline, after, execution)
        self.assertEqual(before.read_bytes(), after.read_bytes())
        rows = list(csv.DictReader(io.StringIO(after.read_text())))
        measured = next(row for row in rows if row['id'] == candidate['candidateId'])
        self.assertEqual(measured['measuredPriority'], 'P0')
        self.assertEqual(measured['gscReportPeriod'], report['periodStart'] + '/' + report['periodEnd'])
        self.assertTrue(all(row['currentRanking'] == '' for row in rows))

    def test_later_historical_or_all_country_import_cannot_replace_latest_india_period(self):
        filters = [{'Filter': 'Search type', 'Value': 'Web'}, {'Filter': 'Date', 'Value': 'Custom'},
                   {'Filter': 'Country', 'Value': 'India'}]
        report = records.read_gsc_export(self.gsc_fixture(days=90, filters=filters), self.baseline,
                                        '2026-12-01T20:00:00Z', 90, country='India')
        execution = {'executionCycles': [{'id': 'current-india', 'officialGoogleMeasurement': {
            'gscReports': [report]}}], 'latestExecutionCycleId': 'current-india'}
        before = self.root / 'before.csv'
        after = self.root / 'after.csv'
        records.export_keywords(self.baseline, before, execution)
        older = copy.deepcopy(report)
        older.update(periodStart='2026-07-23', periodEnd='2026-10-20', observedAtUTC='2026-12-02T20:00:00Z')
        older['candidateQueries'][0]['clicks'] = 2
        all_country = copy.deepcopy(report)
        all_country.update(country=None, periodStart='2026-08-08', periodEnd='2026-11-05')
        all_country['candidateQueries'][0]['clicks'] = 3
        execution['executionCycles'].append({'id': 'later-import', 'officialGoogleMeasurement': {
            'gscReports': [older, all_country]}})
        execution['latestExecutionCycleId'] = 'later-import'
        records.export_keywords(self.baseline, after, execution)
        self.assertEqual(before.read_bytes(), after.read_bytes())


if __name__ == '__main__':
    unittest.main()
