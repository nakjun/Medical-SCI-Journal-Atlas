import { writeFile } from 'node:fs/promises';
import { journals, publishers } from '../src/data.js';
import { journalDetails, topicsCheckedAt } from '../src/journal-details.js';

const lines = [
  '# 저널 공식 링크 및 주요 주제 출처', '',
  `확인일: ${topicsCheckedAt}. ${publishers.map(p => `${p.name} ${journals.filter(j => j.publisherId === p.id).length}개`).join(', ')}를 제공 컬렉션별로 일대일 연결합니다. 총 ${journals.length}개입니다.`, '',
  '주제는 공식 출판사·학회의 Aims and scope 또는 공식 저널 소개를 바탕으로 한국어로 요약했습니다. 대표 주제 3개이며 전체 투고 범위나 투고 적합성 판단을 대체하지 않습니다. 기존 IF·Quartile·APC 수치는 변경하지 않았습니다.', '',
  '## 확인 방법과 한계', '',
  '- Springer 저널은 공식 Aims and scope의 저널명과 분야를 대조했습니다. Nature 계열은 Nature 공식 소개를 사용했습니다.',
  '- Elsevier 30개는 공식 Elsevier Shop 소개의 설명과 실제 ScienceDirect 링크를 확인했습니다. 추출 결과는 `official-link-check.json`에 있으며 동반 저널·논문 링크와 해당 저널 홈페이지를 구분했습니다.',
  '- 나머지 7개는 Elsevier 공식 주제 안내, Elsevier Masson의 EM consulte, JCMR 공식 사이트, 일본재생의료학회 소개 등을 확인했습니다. NeuroImage: Clinical은 NeuroImage 공식 소개의 동반 저널 설명과 링크를 사용했습니다.',
  '- ScienceDirect 등 일부 사이트는 자동 조회에 403을 반환합니다. 이는 URL이 없다는 판정이 아니며, 공식 출처의 실제 링크를 우선 사용했습니다. 모든 외부 페이지의 HTTP 200 응답을 확인했다는 의미는 아닙니다.',
  '- npj Regenerative Medicine의 Aims 페이지는 자동 조회 시 인증 리다이렉트로 열리지 않아 검색 인덱스의 공식 소개와 Journal Information을 함께 확인했습니다.',
  '- Wiley 33개는 Wiley Online Library의 공식 Overview/Aims and Scope 및 저널 소개에서 저널명·온라인 ISSN·연구 분야를 대조했습니다. AIChE·AAPM·Advanced Portfolio 등의 공식 전용 서브도메인 링크도 사용합니다. 일부 Wiley 페이지도 자동 조회를 제한하므로 공식 검색 인덱스에 표시된 소개를 함께 확인했습니다.',
  '- IEEE 30개는 IEEE·발행 학회의 저널 소개 및 공식 주제 안내를 확인했습니다. 일부 학회 사이트는 자동 조회를 제한하므로 공식 검색 인덱스의 소개도 참고했습니다. IEEE Xplore의 punumber는 저널 식별자입니다. IEEE Transactions on Ultrasonics는 UFFC 학회의 공식 T-USON 페이지로 연결하며 표의 명칭·지표는 그대로 보존합니다.',
  '- IOP 컬렉션 19개 중 18개는 IOP Publishing Support의 Scope와 공식 Homepage 링크를 대조했습니다. IOPscience는 자동 접근을 제한하므로 모든 외부 URL의 HTTP 200을 확인한 것은 아닙니다. 17번 Medical Engineering & Physics는 Elsevier 발행의 IPEM 공식 저널로 확인했으며, 요청 목록에 따라 이 컬렉션에 수록하고 실제 발행사를 화면에 표시합니다. 해당 저널의 Elsevier 공식 소개와 ScienceDirect 링크를 사용했습니다.',
  '- Taylor & Francis 16개는 Taylor & Francis Online 및 Dove Medical Press의 공식 Aims and scope를 대조했습니다. International Journal of Nanomedicine은 Taylor & Francis 계열 Dove Medical Press 페이지를 사용하며 Nanomedicine은 innm20 저널과 연결합니다. 일부 페이지는 자동 조회에 403을 반환하므로 공식 검색 인덱스의 소개도 활용했습니다. 지표·APC는 사용자 제공값을 유지했습니다.',
  '- 링크 및 주제는 정적 데이터입니다. 출판사 변경 사항이 자동 동기화되지는 않습니다.', '',
];
for (const publisher of publishers) {
  lines.push(`## ${publisher.name}`, '');
  for (const journal of journals.filter(j => j.publisherId === publisher.id)) {
    const detail = journalDetails[journal.name];
    lines.push(`### ${journal.no}. ${journal.name}`, '',
      `- [공식 저널 페이지](${detail.homepage})`,
      `- [주제 요약 출처](${detail.scopeSource})`, '',
      ...(detail.publisherNote ? [`발행사 안내: ${detail.publisherNote}`, ''] : []),
      ...detail.topics.map(topic => `- ${topic}`), '');
  }
}
await writeFile(new URL('../docs/journal-sources.md', import.meta.url), lines.join('\n'), 'utf8');
console.log(`${journals.length}개 저널 출처 목록 생성: docs/journal-sources.md`);
