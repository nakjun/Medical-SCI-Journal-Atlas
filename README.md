# Medical SCI Journal Atlas

## 🌐 [실제 서비스 바로가기 → medical-journal-atlas.netlify.app](https://medical-journal-atlas.netlify.app/)

- 의료·바이오·의공학·의료 AI 연구자용 저널 비교 서비스
- IF·JCR Quartile·게재료·연구 주제 비교
- React·Vite 기반 정적 웹사이트
- 별도 서버·로그인·API 키 불필요

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

- 권장 환경: Node.js 22.12 이상 + npm
- 검증 환경: Node.js 24

```bash
git clone https://github.com/nakjun/Medical-SCI-Journal-Atlas.git
cd Medical-SCI-Journal-Atlas
npm ci
npm run dev -- --port 5173 --strictPort
```

- 로컬 주소: [http://127.0.0.1:5173](http://127.0.0.1:5173)

## 테스트 및 빌드

```bash
npm test
npm run build
npm run preview
```

- `npm test`: 데이터·필터·정렬·출처 연결 검증
- `npm run build`: 배포용 `dist/` 생성
- `npm run preview`: 빌드 결과 로컬 미리보기

- 미리보기: HTTP 서버 사용
- Git 제외: `dist/`, `node_modules/`

## Netlify 배포

- 운영 주소: [medical-journal-atlas.netlify.app](https://medical-journal-atlas.netlify.app/)

### Git 연동 배포

- 기존 Netlify 사이트에 GitHub 저장소 연결
- 빌드 설정: `netlify.toml`

| 항목 | 설정 |
|---|---|
| 배포 브랜치 | `main` |
| Base directory | 저장소 루트 |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node.js | `24` |

- 저장소 연결 후 `main` push 시 자동 빌드·배포

### 수동 배포

- `npm ci` → `npm run build` 실행
- 생성된 `dist` 폴더를 Netlify에 업로드

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

- 기존 저널: `src/data.js`
- 추가 저널: `src/research-additions.js`
- JMIR·PLOS 지표: `docs/research/jmir-plos-metrics-2026-11-05.json`
- 공식 URL·주제·출처·확인일 갱신
- 저널 `id` 유지
- IF 미확인 값: `null` 처리, 목록 제외
- 변경 후 `npm test`·`npm run build` 실행
- 수록 개수 변경 시 테스트·README 갱신

## 기술 및 디자인

- React 19 / Vite 6 / Lucide React
- 한신대학교 홈페이지의 보라색 계열을 참고한 색상 구성: `#5C31C0`, `#241055`, `#756AB7`
- 밝은 배경과 비교 표 중심의 정보 전달형 디자인
- Google Fonts 사용, 연결 불가 시 시스템 글꼴 적용

## 제작자

- **한신대학교 AI·SW대학 성낙준 (Nak-Jun Sung, Ph.D.)**
- GitHub: [@nakjun](https://github.com/nakjun)

- 오류·업데이트 제안: [GitHub Issues](https://github.com/nakjun/Medical-SCI-Journal-Atlas/issues)
- 제보 항목: 저널명·공식 출처
