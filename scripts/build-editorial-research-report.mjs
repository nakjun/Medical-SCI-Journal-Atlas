import { writeFileSync } from 'node:fs';
import { journals, publishers } from '../src/data.js';
import { editorialResearch, getEditorialMetrics } from '../src/editorial-metrics.js';

const rows = editorialResearch.flatMap(research => research.journals);
const labels = {
  observed_homepage_metrics: '공식 지표 확인',
  conflicting_homepage_statements: '공식 표기 상충',
  official_dated_report: '2025년 공식 안내',
  access_limited: '접근 제한 · 미확인',
  not_found_in_checked_sources: '확인 범위에서 수치 미확인',
  not_displayed_on_checked_page: '확인 페이지에 항목 없음',
  not_displayed_in_official_index: '공식 검색 색인에 수치 없음',
  not_displayed_on_homepage: '메인 지표에 항목 없음',
};
let report = '# 전체 저널 게재율 조사 · 2026-11-05\n\n';
report += '175개 저널 전체에 조사 기록을 남긴 1차 조사다. 접근 제한으로 미확인인 저널의 검증은 완료되지 않았다. 수치를 확인하지 못했다는 사실은 미공개임을 뜻하지 않는다. 현재 모달 표시 대상은 52개(기존 Wiley 32개 + 신규 20개)다.\n\n';
report += '공식 출판사·학회 안내만 채택했다. 검색 색인은 실시간 원문과 다를 수 있어 확인 방법을 표시한다. 연구 논문 속 실험 수치, 학회 채택률, 다른 저널 수치, 출판사 전체 평균은 제외했다. 오래된 회고나 전망치는 현재 게재율로 대체하지 않았다. JBHI는 2025년 안내임을 모달에 명시한다. 확인일과 집계 기간은 별개이며, 출판사별 분모·기간 차이 때문에 단순 비교에 주의해야 한다.\n\n';
report += 'Elsevier는 브라우저에서 7개 Insights 페이지를 읽어 3개 수치를 확인한 뒤 콘텐츠 접근 오류가 발생했다. 나머지는 검색 도구 접근도 제한돼 재확인이 필요하다. IOP는 Biofabrication 메인 열람 후 상세 지표에서 CAPTCHA가 나타나 진행하지 않았다. IEEE의 일부 Xplore·Computer Society 페이지도 접근 오류였다.\n\n';
report += '| 출판사 | 조사 대상 | 모달 표시 | 접근 제한 |\n|---|---:|---:|---:|\n';
for (const publisher of publishers) {
  const group = journals.filter(j => j.publisherId === publisher.id);
  report += `| ${publisher.name} | ${group.length} | ${group.filter(getEditorialMetrics).length} | ${group.filter(j => rows.find(r => r.journalId === j.id)?.status === 'access_limited').length} |\n`;
}
for (const publisher of publishers) {
  report += `\n## ${publisher.name}\n\n| 저널 | 게재율 | 상태 | 집계 기간 | 확인 방법 | 출처 |\n|---|---:|---|---|---|---|\n`;
  for (const journal of journals.filter(j => j.publisherId === publisher.id)) {
    const r = rows.find(row => row.journalId === journal.id);
    report += `| ${r.name} | ${r.acceptanceRatePercent === null ? '—' : `${r.approximate ? '약 ' : ''}${r.acceptanceRatePercent}%`} | ${labels[r.status] || r.status} | ${r.metricPeriod || '미표기'} | ${r.verificationMethod} | [공식 출처](${r.sourceUrl}) |\n`;
  }
}
report += '\nSpringer의 과거 참고자료 및 Wiley 상충 수치는 각 출판사별 JSON에 보존했다. IOP 컬렉션의 Medical Engineering & Physics는 사용자 분류를 유지했으나 실제 출처는 Elsevier다.\n';
writeFileSync(new URL('../docs/research/all-editorial-metrics-2026-11-05.md', import.meta.url), report);
console.log('175개 조사 결과 보고서 저장 완료');
