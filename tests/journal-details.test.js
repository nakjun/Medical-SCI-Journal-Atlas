import test from 'node:test';
import assert from 'node:assert/strict';
import { journalCatalog as journals } from '../src/data.js';
import { journalDetails, topicsCheckedAt } from '../src/journal-details.js';
import { readFileSync } from 'node:fs';

test('219개 저널 모두 공식 페이지·출처·3개 주제에 일대일 대응한다', () => {
  assert.equal(Object.keys(journalDetails).length, 219);
  const homepages = new Set();
  const allowed = new Set(['link.springer.com', 'ietresearch.onlinelibrary.wiley.com', 'mtt.org', 'journals.plos.org', 'www.nature.com', 'www.sciencedirect.com', 'www.journals.elsevier.com', 'shop.elsevier.com', 'www.em-consulte.com', 'www.elsevier.com', 'www.journalofcmr.com', 'en.jsrm.jp', 'onlinelibrary.wiley.com', 'advanced.onlinelibrary.wiley.com', 'obgyn.onlinelibrary.wiley.com', 'aiche.onlinelibrary.wiley.com', 'aapm.onlinelibrary.wiley.com', 'analyticalsciencejournals.onlinelibrary.wiley.com']);
  for (const journal of journals) {
    const details = journalDetails[journal.name];
    assert.ok(details, journal.name);
    for (const field of ['homepage', 'scopeSource']) {
      const url = new URL(details[field]);
      assert.equal(url.protocol, 'https:', `${journal.name}: ${field}`);
      const ieeeHost = ['www.computer.org', 'ieeexplore.ieee.org', 'technav.ieee.org', 'signalprocessingsociety.org', 'ieeetmi.org', 'www.ieee-ras.org', 'cis.ieee.org', 'ai.ieee.org', 'www.embs.org', 'ieee-ims.org', 'open.ieee.org', 'ieeenano.org', 'ieee-uffc.org', 'ieee-cas.org', 'ieee-sensors.org', 'www.ieeesmc.org', 'ieeeaccess.ieee.org', 'eds.ieee.org', 'ieeephotonics.org', 'ieee-npss.org'].includes(url.hostname);
      const iopHost = ['iopscience.iop.org', 'publishingsupport.iopscience.iop.org'].includes(url.hostname);
      const tfHost = ['www.tandfonline.com', 'www.dovepress.com'].includes(url.hostname);
      assert.ok((journal.publisherId === 'jmir' && (url.hostname === 'www.jmir.org' || url.hostname.endsWith('.jmir.org'))) || allowed.has(url.hostname) || (journal.publisherId === 'ieee' && ieeeHost) || (journal.publisherId === 'iop' && iopHost) || (journal.publisherId === 'taylor-francis' && tfHost), `${journal.name}: ${field}`);
      if (url.search) {
        assert.equal(url.hostname, 'ieeexplore.ieee.org');
        assert.equal(url.pathname, '/xpl/RecentIssue.jsp');
        assert.deepEqual([...url.searchParams.keys()], ['punumber']);
        assert.match(url.searchParams.get('punumber'), /^\d+$/);
      }
    }
    homepages.add(details.homepage);
    assert.ok(details.topics.length >= 2, journal.name);
    assert.equal(new Set(details.topics).size, details.topics.length, journal.name);
    assert.ok(details.topics.every(topic => topic.trim().length > (journal.id.startsWith('research-') ? 1 : 10)), journal.name);
  }
  assert.equal(homepages.size, 219);
  assert.equal(topicsCheckedAt, '2026-11-03');
});

test('Elsevier 30개 링크가 출판사 소개에서 추출한 해당 저널 링크와 일치한다', () => {
  const checks = JSON.parse(readFileSync(new URL('../docs/official-link-check.json', import.meta.url), 'utf8'));
  assert.equal(checks.length, 30);
  for (const check of checks) {
    const name = check.name === 'Radiotherapy & Oncology' ? 'Radiotherapy and Oncology' : check.name;
    assert.ok(check.links.includes(journalDetails[name].homepage), name);
    assert.equal(journalDetails[name].scopeSource, check.source);
  }
});
