import test from 'node:test';
import assert from 'node:assert/strict';
import { journals } from '../src/data.js';
import { recommendJournals } from '../src/recommendations.js';

test('empty and unrelated subjects do not produce arbitrary recommendations', () => {
  for (const topic of ['', '   ', 'comparative evaluation of models', '중세 프랑스 시문학', 'zxqvxyz']) assert.deepEqual(recommendJournals(journals, topic), []);
});
test('English imaging topic finds relevant journals and provides scope evidence', () => {
  const results = recommendJournals(journals, 'Deep learning medical image segmentation');
  assert.equal(results.length, 10);
  assert.ok(results.some(r => r.journal.name === 'Medical Image Analysis'));
  assert.ok(results.every(r => r.matches.length && r.score > 0));
  assert.ok(results[0].evidence.length);
  assert.equal(new Set(results.map(r => r.journal.id)).size, results.length);
});
test('Korean and English concept queries produce the same ranking', () => {
  const ids = text => recommendJournals(journals, text).map(r => r.journal.id);
  assert.deepEqual(ids('의료영상 딥러닝 분할'), ids('medical imaging deep learning segmentation'));
});
test('Non-OA restriction is applied before selecting ten results', () => {
  const results = recommendJournals(journals, 'medical imaging deep learning', { nonOaOnly: true });
  assert.equal(results.length, 10);
  assert.ok(results.every(r => r.journal.nonOaApc === 0));
});
test('domain specificity favors biomaterial journals for biomaterial subjects', () => {
  const results = recommendJournals(journals, 'biomaterials tissue engineering');
  assert.ok(results.slice(0, 3).some(r => /Biomaterial|Biomedical Materials/.test(r.journal.name)));
});
test('short acronyms do not match substrings and duplicate words do not inflate scores', () => {
  assert.deepEqual(recommendJournals(journals, 'prediction'), []);
  assert.deepEqual(recommendJournals(journals, 'MRI MRI'), recommendJournals(journals, 'MRI'));
});
