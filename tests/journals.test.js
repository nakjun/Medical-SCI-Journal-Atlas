import test from 'node:test';
import assert from 'node:assert/strict';
import { filterJournals, journals as allJournals, money, quartileOf } from '../src/data.js';

const journals = allJournals.filter(j => !j.id.startsWith("research-"));

const options = { publisherId: 'springer' };
const springer = journals.filter(j => j.publisherId === 'springer');

test('전체 보기에서 출판사를 합치고 Quartile·IF 정렬과 $0 필터를 결합한다', () => {
  const before = journals.map(j => j.id);
  const all = filterJournals(journals, { publisherId: 'all' });
  assert.equal(all.length, 175);
  assert.equal(new Set(all.map(j => j.publisherId)).size, 6);
  assert.deepEqual(all.map(j => j.id), before);
  for (const sort of ['quartile-asc', 'quartile-desc']) {
    const result = filterJournals(journals, { publisherId: 'all', sort });
    for (let i = 1; i < result.length; i++) {
      const prev = result[i - 1], current = result[i];
      const difference = Number(quartileOf(current).slice(1)) - Number(quartileOf(prev).slice(1));
      assert.ok(sort === 'quartile-asc' ? difference >= 0 : difference <= 0);
      if (difference === 0) assert.ok(prev.impactFactor >= current.impactFactor);
    }
    assert.equal(result.filter(j => j.quartile === 'Q1*').length, 2);
  }
  const free = filterJournals(journals, { publisherId: 'all', model: 'non-oa', sort: 'quartile-asc' });
  assert.equal(free.length, journals.filter(j => j.nonOaApc === 0).length);
  assert.ok(free.every(j => j.nonOaApc === 0));
  assert.equal(new Set(free.map(j => j.publisherId)).size, 6);
  const combined = filterJournals(journals, { publisherId: 'all', query: 'medical', model: 'non-oa', quartile: 'Q1', sort: 'quartile-asc' });
  assert.ok(combined.length > 1);
  assert.ok(combined.every(j => j.nonOaApc === 0 && quartileOf(j) === 'Q1' && j.name.toLowerCase().includes('medical')));
  assert.deepEqual(filterJournals(journals, { publisherId: 'all', savedOnly: true, saved: ['springer-1', 'ieee-1'] }).map(j => j.id), ['springer-1', 'ieee-1']);
  assert.deepEqual(journals.map(j => j.id), before);
});

test('Taylor & Francis 16개 원본과 출판사별 검색·필터·정렬·저장을 보존한다', () => {
  const options = { publisherId: 'taylor-francis' };
  const items = filterJournals(journals, options);
  assert.equal(items.length, 16);
  assert.deepEqual(['Q1', 'Q2', 'Q3', 'Q4'].map(q => items.filter(j => quartileOf(j) === q).length), [3, 8, 5, 0]);
  assert.deepEqual(items[0], { id: 'taylor-francis-1', no: 1, publisherId: 'taylor-francis', name: 'International Journal of Nanomedicine', quartile: 'Q1', impactFactor: 8.7, nonOaApc: null, oaApc: 3999 });
  assert.deepEqual(items.at(-1), { id: 'taylor-francis-16', no: 16, publisherId: 'taylor-francis', name: 'Electromagnetic Biology and Medicine', quartile: 'Q3', impactFactor: 1.5, nonOaApc: 0, oaApc: 3940 });
  assert.deepEqual(filterJournals(journals, { ...options, model: 'oa-only' }).map(j => j.no), [1, 2, 7, 8, 10]);
  assert.equal(filterJournals(journals, { ...options, model: 'non-oa' }).length, 11);
  assert.equal(filterJournals(journals, { ...options, query: 'nanomedicine', quartile: 'Q1' }).length, 2);
  assert.equal(filterJournals(journals, { ...options, sort: 'apc-asc' })[0].name, 'Computer Assisted Surgery');
  assert.equal(filterJournals(journals, { ...options, sort: 'apc-desc' })[0].oaApc, 5400);
  assert.equal(filterJournals(journals, { ...options, sort: 'if-desc' })[0].impactFactor, 8.7);
  assert.deepEqual(filterJournals(journals, { ...options, savedOnly: true, saved: ['iop-1', 'taylor-francis-1'] }).map(j => j.id), ['taylor-francis-1']);
});

test('IOP 제공 목록 19개와 모든 지표·필터·정렬·저장을 보존한다', () => {
  const options = { publisherId: 'iop' };
  const items = filterJournals(journals, options);
  assert.equal(items.length, 18);
  assert.deepEqual(['Q1', 'Q2', 'Q3', 'Q4'].map(q => items.filter(j => quartileOf(j) === q).length), [5, 7, 5, 1]);
  assert.deepEqual(items[0], { id: 'iop-1', no: 1, publisherId: 'iop', name: 'Biofabrication', quartile: 'Q1', impactFactor: 8.2, nonOaApc: 0, oaApc: 4295 });
  assert.equal(items.at(-1).name, 'Physical Biology');
  assert.equal(items.at(-1).impactFactor, 1.5);
  assert.equal(items.filter(j => j.oaApc === 3665).length, 14);
  assert.equal(allJournals.find(j => j.id === 'iop-17').publisherId, 'elsevier');
  assert.deepEqual(filterJournals(journals, { ...options, model: 'oa-only' }).map(j => j.no), [2]);
  assert.equal(filterJournals(journals, { ...options, model: 'non-oa' }).length, 17);
  assert.equal(filterJournals(journals, { ...options, query: 'physics', quartile: 'Q2' }).length, 2);
  assert.equal(filterJournals(journals, { ...options, sort: 'apc-asc' })[0].oaApc, 3325);
  assert.equal(filterJournals(journals, { ...options, sort: 'if-desc' })[0].impactFactor, 8.2);
  assert.deepEqual(filterJournals(journals, { ...options, savedOnly: true, saved: ['wiley-1', 'springer-1', 'elsevier-1', 'ieee-1', 'iop-1'] }).map(j => j.id), ['iop-1']);
});

test('IEEE 30개 원본 지표와 출판사별 필터·정렬·저장을 보존한다', () => {
  const options = { publisherId: 'ieee' };
  const items = filterJournals(journals, options);
  assert.equal(items.length, 30);
  assert.deepEqual(['Q1', 'Q2', 'Q3', 'Q4'].map(q => items.filter(j => quartileOf(j) === q).length), [14, 13, 3, 0]);
  assert.deepEqual(items[0], { id: 'ieee-1', no: 1, publisherId: 'ieee', name: 'IEEE Transactions on Pattern Analysis and Machine Intelligence', quartile: 'Q1', impactFactor: 20.4, nonOaApc: 0, oaApc: 2800 });
  assert.equal(items.at(-1).name, 'IEEE Transactions on Nuclear Science');
  assert.equal(items.at(-1).impactFactor, 2.4);
  assert.equal(items.find(j => j.no === 14).name, 'IEEE Transactions on Ultrasonics');
  assert.equal(items.filter(j => j.oaApc === 2800).length, 26);
  assert.equal(items.filter(j => j.oaApc === 2160).length, 4);
  assert.deepEqual(filterJournals(journals, { ...options, model: 'oa-only' }).map(j => j.no), [11, 22, 24, 28]);
  assert.equal(filterJournals(journals, { ...options, query: 'imaging', quartile: 'Q1' }).length, 1);
  assert.equal(filterJournals(journals, { ...options, sort: 'apc-asc' })[0].oaApc, 2160);
  assert.deepEqual(filterJournals(journals, { ...options, savedOnly: true, saved: ['wiley-1', 'springer-1', 'elsevier-1', 'ieee-1'] }).map(j => j.id), ['ieee-1']);
});

test('40개 원본 저널과 Quartile별 수량을 보존한다', () => {
  assert.equal(springer.length, 40);
  assert.equal(new Set(journals.map(j => j.id)).size, 175);
  assert.deepEqual(['Q1', 'Q2', 'Q3', 'Q4'].map(q => springer.filter(j => quartileOf(j) === q).length), [20, 11, 8, 1]);
  assert.equal(Math.max(...springer.map(j => j.impactFactor)), 26.3);
  assert.equal(Math.min(...springer.map(j => j.oaApc)), 1990);
  assert.equal(springer.filter(j => j.quartile === 'Q1*').length, 2);
});

test('Non-OA 해당 없음과 0달러를 구분한다', () => {
  assert.equal(money(null), '해당 없음');
  assert.equal(money(0), '$0');
  assert.equal(money(12850), '$12,850');
  const nonOa = filterJournals(journals, { ...options, model: 'non-oa' });
  const oaOnly = filterJournals(journals, { ...options, model: 'oa-only' });
  assert.equal(nonOa.length + oaOnly.length, 40);
  assert.ok(nonOa.every(j => j.nonOaApc === 0));
  assert.ok(oaOnly.every(j => j.nonOaApc === null));
});

test('검색, Q1 별표, 게재 방식 및 저장 필터를 결합한다', () => {
  const result = filterJournals(journals, { ...options, query: '  BIONIC  ', quartile: 'Q1', model: 'non-oa', savedOnly: true, saved: ['springer-18'] });
  assert.deepEqual(result.map(j => j.id), ['springer-18']);
  assert.equal(filterJournals(journals, { ...options, query: 'no-such-journal' }).length, 0);
  assert.equal(filterJournals(journals, { publisherId: 'missing' }).length, 0);
});

test('Elsevier 37개를 출판사별로 분리하고 지표·필터·정렬을 적용한다', () => {
  const items = filterJournals(journals, { publisherId: 'elsevier' });
  assert.equal(journals.length, 175);
  assert.equal(items.length, 38);
  assert.ok(items.every(j => j.publisherId === 'elsevier'));
  assert.deepEqual(['Q1', 'Q2', 'Q3', 'Q4'].map(q => items.filter(j => quartileOf(j) === q).length), [23, 10, 4, 1]);
  assert.deepEqual(items[0], { id: 'elsevier-1', no: 1, publisherId: 'elsevier', name: 'Medical Image Analysis', quartile: 'Q1', impactFactor: 14, nonOaApc: 0, oaApc: 4570 });
  assert.equal(items.at(-1).name, 'Medical Engineering & Physics');
  assert.equal(Math.max(...items.map(j => j.impactFactor)), 14);
  const cheapest = filterJournals(journals, { publisherId: 'elsevier', sort: 'apc-asc' })[0];
  assert.equal(cheapest.name, 'Regenerative Therapy');
  assert.equal(cheapest.oaApc, 1800);
  assert.equal(filterJournals(journals, { publisherId: 'elsevier', model: 'oa-only' }).length, 6);
  assert.equal(filterJournals(journals, { publisherId: 'elsevier', quartile: 'Q1', query: 'neuroimage' }).length, 2);
  assert.deepEqual(filterJournals(journals, { publisherId: 'elsevier', savedOnly: true, saved: ['springer-1', 'elsevier-1'] }).map(j => j.id), ['elsevier-1']);
});

test('정렬은 원본을 변경하지 않고 선택한 지표를 사용한다', () => {
  const before = journals.map(j => j.id);
  const ascending = filterJournals(journals, { ...options, sort: 'apc-asc' });
  assert.equal(ascending[0].name, 'Bioresources and Bioprocessing');
  assert.equal(ascending.at(-1).oaApc, 12850);
  assert.equal(filterJournals(journals, { ...options, sort: 'if-asc' })[0].impactFactor, 1.2);
  assert.deepEqual(journals.map(j => j.id), before);
});

test('Wiley 33개 원본 지표와 출판사별 필터·정렬·저장을 보존한다', () => {
  const options = { publisherId: 'wiley' };
  const items = filterJournals(journals, options);
  assert.equal(items.length, 33);
  assert.ok(items.every(j => j.publisherId === 'wiley'));
  assert.deepEqual(['Q1', 'Q2', 'Q3', 'Q4'].map(q => items.filter(j => quartileOf(j) === q).length), [7, 16, 8, 2]);
  assert.deepEqual(items[0], { id: 'wiley-1', no: 1, publisherId: 'wiley', name: 'Advanced Healthcare Materials', quartile: 'Q1', impactFactor: 11, nonOaApc: 0, oaApc: 4880 });
  assert.deepEqual(items.at(-1), { id: 'wiley-33', no: 33, publisherId: 'wiley', name: 'Annals of Noninvasive Electrocardiology', quartile: 'Q4', impactFactor: 0.9, nonOaApc: null, oaApc: 3130 });
  const cheapest = filterJournals(journals, { ...options, sort: 'apc-asc' })[0];
  assert.equal(cheapest.name, 'Journal of Applied Clinical Medical Physics');
  assert.equal(cheapest.oaApc, 1150);
  assert.equal(filterJournals(journals, { ...options, sort: 'apc-desc' })[0].oaApc, 5720);
  assert.equal(filterJournals(journals, { ...options, model: 'oa-only' }).length, 5);
  assert.equal(filterJournals(journals, { ...options, query: 'ultrasound', quartile: 'Q2' }).length, 1);
  assert.deepEqual(filterJournals(journals, { ...options, savedOnly: true, saved: ['springer-1', 'elsevier-1', 'wiley-1'] }).map(j => j.id), ['wiley-1']);
});

test('IF 미확인 저널을 목록과 검색·필터에서 제외한다', () => {
 assert.equal(allJournals.length,188);
 assert.ok(allJournals.every(j=>Number.isFinite(j.impactFactor)));
 assert.equal(filterJournals(allJournals,{publisherId:"all",query:"JMIR Neurotechnology"}).length,0);
 assert.equal(new Set(allJournals.map(j=>j.id)).size,188);
 assert.equal(filterJournals(allJournals,{publisherId:'all',quartile:'미확인'}).length,0);
 for(const sort of ['quartile-asc','quartile-desc','if-asc','if-desc','apc-asc','apc-desc']) {
 const result=filterJournals(allJournals,{publisherId:'all',sort});
 const known=j=>sort.startsWith('quartile')?j.quartile!=='미확인':Number.isFinite(sort.startsWith('if')?j.impactFactor:j.oaApc);
 const count=result.filter(known).length;
 assert.ok(result.slice(0,count).every(known));
 assert.ok(result.slice(count).every(j=>!known(j)));
 }
 const researched=allJournals.filter(j=>['jmir','plos'].includes(j.publisherId));
 assert.equal(researched.length,12);
 assert.ok(researched.every(j=>Number.isFinite(j.oaApc)&&j.nonOaApc===null));
 assert.equal(researched.filter(j=>Number.isFinite(j.impactFactor)).length,12);
 assert.equal(filterJournals(allJournals,{publisherId:'jmir',model:'oa-only'}).length,8);
 assert.equal(filterJournals(allJournals,{publisherId:'plos',model:'non-oa'}).length,0);
 assert.equal(money(undefined),'미확인');
});
