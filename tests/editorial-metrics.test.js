import test from 'node:test';
import assert from 'node:assert/strict';
import { journalCatalog as journals } from '../src/data.js';
import { editorialResearch, getEditorialMetrics } from '../src/editorial-metrics.js';

test('확인된 56개 게재율을 저널별 출처와 함께 연결한다', () => {
  const available = journals.filter(journal => getEditorialMetrics(journal));
  assert.equal(available.length, 56);
  assert.deepEqual(Object.fromEntries(['springer', 'elsevier', 'wiley', 'ieee', 'iop', 'taylor-francis'].map(id => [id, available.filter(j => j.publisherId === id).length])),
    { springer: 0, elsevier: 3, wiley: 32, ieee: 3, iop: 0, 'taylor-francis': 14 });
  for (const journal of available) {
    const metric = getEditorialMetrics(journal);
    assert.equal(new URL(metric.sourceUrl).protocol, 'https:');
    assert.match(metric.collectedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test('189개 저널의 조사 기록에 누락·중복·이름 불일치가 없다', () => {
  const rows = editorialResearch.flatMap(research => research.journals);
  assert.equal(rows.length, 189);
  assert.equal(new Set(rows.map(row => row.journalId)).size, 189);
  for (const row of rows) {
    assert.equal(journals.find(j => j.id === row.journalId)?.name, row.name);
    if (row.acceptanceRatePercent !== null) assert.ok(row.acceptanceRatePercent >= 0 && row.acceptanceRatePercent <= 100);
  }
});

test('출판사별 정의·근삿값·과거 안내를 분리하고 접근 제한은 숨긴다', () => {
  const metric = id => getEditorialMetrics(journals.find(j => j.id === id));
  assert.equal(metric('elsevier-2').acceptanceRatePercent, 11);
  assert.match(metric('elsevier-2').definition, /전체 투고/);
  assert.equal(metric('ieee-22').approximate, true);
  assert.match(metric('ieee-8').displayNote, /2025/);
  assert.equal(metric('iop-1'), null);
  assert.equal(metric('taylor-francis-13'), null);
  assert.equal(metric('taylor-francis-14').acceptanceRatePercent, 10);
});

test('미확인 값은 0이나 과거 보조 자료로 대체하지 않고 이름 불일치도 제외한다', () => {
  assert.equal(getEditorialMetrics(journals.find(j => j.id === 'wiley-3')), null);
  assert.equal(getEditorialMetrics(journals.find(j => j.id === 'springer-1')), null);
  assert.equal(getEditorialMetrics({ id: 'wiley-1', name: 'Other journal' }), null);
});

test('상충하는 Neuroimaging 공식 수치의 맥락을 유지한다', () => {
  const metric = getEditorialMetrics(journals.find(j => j.id === 'wiley-17'));
  assert.equal(metric.status, 'conflicting_homepage_statements');
  assert.equal(metric.acceptanceRatePercent, 13);
  assert.equal(metric.alternativeAcceptanceRatePercent, 28);
  assert.equal(metric.metricPeriod, null);
});

test('JMIR 목표 기간과 PLOS 실측 중앙값을 구분한다', () => {
 const rows=editorialResearch.at(-1).journals;
 assert.equal(rows.length,14);
 for(const row of rows.filter(r=>r.publisherId==='jmir')) {
   assert.equal(getEditorialMetrics(journals.find(j=>j.id===row.journalId)),null);
   assert.equal(row.firstDecision.kind,'target');
   assert.equal(row.firstDecision.value,2);
 }
 assert.deepEqual(rows.filter(r=>r.publisherId==='plos').map(r=>[r.acceptanceRatePercent,r.firstDecision.value]),[[33,52],[33,41],[26,32],[4,67]]);
 assert.ok(rows.filter(r=>r.publisherId==='plos').every(r=>r.firstDecision.kind==='median'&&r.metricPeriod==='2025'));
});

test('2025 JIF와 2026 발표 연도를 구분하고 이전 연도 지표가 되돌아오지 않는다', () => {
 const rows=editorialResearch.at(-1).journals;
 assert.deepEqual(rows.map(r=>r.impactFactor),[8.2,6.1,5.0,null,6.3,3.9,null,3.1,2.4,4.7,7.7,3.7,2.8,9.9]);
 assert.deepEqual(rows.map(r=>r.quartile),['Q1','Q1','Q2','미확인','Q1','Q1','미확인','Q1','Q2','Q1','Q1','Q1','Q2','Q1']);
 assert.ok(rows.every(r=>r.jifDataYear===2025&&r.jcrReleaseYear===2026));
 for(const r of rows) assert.equal(journals.find(j=>j.id===r.journalId).impactFactor,r.impactFactor);
});
