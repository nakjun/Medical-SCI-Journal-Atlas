# Medical SCI Journal Atlas

## 🌐 [실제 서비스 바로가기 → medical-journal-atlas.netlify.app](https://medical-journal-atlas.netlify.app/)

**의료·바이오·의공학·의료 AI 연구자를 위한 저널 비교 웹사이트**입니다. 출판사별 저널의 Impact Factor, JCR Quartile, 게재료와 연구 주제를 한곳에서 비교할 수 있습니다.

React와 Vite로 만든 정적 웹사이트이며, 별도의 서버·로그인·API 키 없이 이용할 수 있습니다.

## 주요 기능

- **전체 보기 및 출판사 탭**: Springer Nature → Elsevier → IEEE → Wiley → Taylor & Francis → IOP → JMIR → PLOS
- **검색과 필터**: 저널명 검색, Q1–Q4 필터, Non-OA APC $0만 보기, OA 전용 저널 보기
- **정렬**: Quartile, IF, OA APC, 저널명 및 기본 순서
- **공식 저널 페이지 연결**: 저널명을 누르면 새 탭으로 이동
- **저널 소개 팝업**: 마우스 올리기·키보드 포커스로 주요 주제 확인, ⓘ 버튼으로 고정, Esc로 닫기
- **심사 지표 안내**: 확인된 게재율과 일부 저널의 첫 결정 기간, 출처·집계 기간·정의 표시
- **북마크**: 현재 브라우저의 localStorage에 관심 저널 저장
- **CSV 다운로드**: 현재 검색·필터 결과 내보내기, Excel용 UTF-8 BOM 지원
- **반응형 화면**: 모바일 표 가로 스크롤, 키보드 검색 단축키 `/`

## 수록 현황

| 출판사 | 저널 수 |
|---|---:|
| Springer Nature | 41 |
| Elsevier | 38 |
| IEEE | 30 |
| Wiley | 33 |
| Taylor & Francis | 16 |
| IOP | 18 |
| JMIR Publications | 8 |
| PLOS | 4 |
| **합계** | **188** |

## 로컬 실행

Node.js **22.12 이상**과 npm을 권장합니다. 현재 검증 환경은 Node.js 24입니다.

```bash
git clone https://github.com/nakjun/Medical-SCI-Journal-Atlas.git
cd Medical-SCI-Journal-Atlas
npm ci
npm run dev -- --port 5173 --strictPort
```

브라우저에서 [http://127.0.0.1:5173](http://127.0.0.1:5173)을 엽니다.

## 테스트 및 빌드

```bash
npm test
npm run build
npm run preview
```

- `npm test`: 데이터·출판사 분류·필터·정렬·출처 연결 등을 확인합니다.
- `npm run build`: 배포용 `dist/` 폴더를 생성합니다.
- `npm run preview`: 생성된 빌드를 로컬 HTTP 서버로 확인합니다.

`dist/index.html`을 파일로 직접 열기보다 HTTP 서버로 확인하세요. `dist/`와 `node_modules/`는 Git에 포함하지 않습니다.

## Netlify 배포

**운영 주소: [https://medical-journal-atlas.netlify.app/](https://medical-journal-atlas.netlify.app/)**

### Git 연동 배포

기존 Netlify 사이트에 이 저장소를 연결하고 다음 설정을 사용합니다. 저장소의 `netlify.toml`에도 같은 설정이 포함되어 있습니다.

| 항목 | 설정 |
|---|---|
| 배포 브랜치 | `main` |
| Base directory | 저장소 루트 |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node.js | `24` |

GitHub에 push하는 것과 Netlify의 Git 연동 설정은 별개입니다. Netlify에서 저장소 연결이 완료된 경우 이후 push 시 자동 빌드·배포할 수 있습니다.

### 수동 배포

`npm ci` → `npm run build` 실행 후, 생성된 **`dist` 폴더**를 기존 Netlify 사이트의 수동 배포 영역에 업로드합니다.

## 프로젝트 구조

```text
src/
  data.js                    # 전체 카탈로그, IF 확인 저널 추출, 필터·정렬
  research-additions.js       # 추가 조사 저널 및 Scientific Reports 지표
  journal-details.js         # 공식 링크·연구 주제 통합
  *-details.js               # 출판사별 공식 링크와 주제
  editorial-metrics.js        # 게재율 조사 기록 연결
  JournalTopics.jsx          # 저널 소개·심사 지표 팝업
  main.jsx                   # 목록, 탭, 검색, 통계, 북마크, CSV
  styles.css                 # 반응형 디자인
public/                      # 정적 자산
scripts/                     # 출처 보고서 생성 및 링크 조사 보조 도구
tests/                       # Node.js 내장 테스트 러너 기반 검증
docs/research/               # 날짜별 조사 기록과 출처 JSON
netlify.toml                 # Netlify 빌드 설정
```

## 데이터 유지보수

1. 기존 출판사 데이터는 `src/data.js`, 추가 저널은 `src/research-additions.js`에서 관리합니다.
2. JMIR·PLOS 상세 지표는 `docs/research/jmir-plos-metrics-2026-11-05.json`에서 덮어씁니다. 해당 저널 수정 시 이 파일도 확인하세요.
3. 저널별 공식 URL, 한국어 주제, 확인일과 지표의 출처·기준 연도를 기록합니다.
4. `id`는 북마크와 조사 기록 연결에 사용하므로 변경하지 않습니다.
5. 알 수 없는 IF를 `0`으로 넣지 않습니다. 숫자형 IF가 있는 저널만 화면에 노출됩니다.
6. `npm test`와 `npm run build`로 검증합니다. 수록 범위 변경 시 테스트와 README의 개수도 함께 갱신합니다.

## 기술 및 디자인

- React 19 / Vite 6 / Lucide React
- 한신대학교 홈페이지의 보라색 계열을 참고한 색상 구성: `#5C31C0`, `#241055`, `#756AB7`
- 밝은 배경과 비교 표 중심의 정보 전달형 디자인
- Google Fonts를 사용하며 연결할 수 없을 때 시스템 글꼴로 대체

## 제작자

**한신대학교 AI·SW대학 성낙준 (Nak-Jun Sung, Ph.D.)**
GitHub: [@nakjun](https://github.com/nakjun)

오류나 업데이트 제안은 [GitHub Issues](https://github.com/nakjun/Medical-SCI-Journal-Atlas/issues)에 저널명과 확인 가능한 공식 출처를 함께 남겨 주세요.
