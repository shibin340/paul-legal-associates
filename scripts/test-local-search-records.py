"""Adversarial measurement checks: reject evidence that would misstate local outcomes."""
import copy
import importlib.util
import json
import tempfile
import unittest
import sys
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


if __name__ == '__main__':
    unittest.main()
