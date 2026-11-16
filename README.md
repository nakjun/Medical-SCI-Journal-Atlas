# Medical SCI Journal Atlas

## 🌐 [실제 서비스 바로가기 → medical-journal-atlas.netlify.app](https://medical-journal-atlas.netlify.app/)

- 의료·바이오·의공학·의료 AI 연구자용 저널 비교 서비스
- IF·JCR Quartile·게재료·연구 주제 비교
- React·Vite 기반 정적 웹사이트
- 기본 탐색: API 키 불필요 · AI 추천: Netlify Functions + OpenAI API

## 주요 기능

- 연구 주제별 TOP 10 추천: 한글·영문 키워드, 일치 주제·추천 근거 표시
- 추천 결과 Non-OA APC $0 필터·북마크·공식 페이지 연결
- GPT-6 Luna로 태스크·연구 분야 해석 후 TOP 10 추천
- AI 사용 시 입력 주제 OpenAI 전송 · AI 해제 또는 연결 실패 시 기본 키워드 검색

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

### AI 추천 설정

- Netlify 환경변수: `OPENAI_API_KEY` · Functions 범위 · Production 환경
- 키 등록·변경 후 재배포
- 기본 모델: `gpt-6-luna` · Responses API · 응답 저장 비활성화(`store: false`)
- 함수 경로: `/.netlify/functions/recommend`
- 요청 제한: IP·도메인 조합별 1분 5회(Netlify 배포 시 적용)
- 결과 캐시: Netlify Blobs 공유 캐시 · 24시간 재사용 · 최대 256슬롯
- 대소문자·공백 정규화 · 필터·모델·정책·저널 범위 변경 시 별도 캐시
- 캐시 키: 검색어 해시 · 입력 원문 별도 저장 없음 · 생성된 추천·해석 저장
- 만료 항목: 재사용 중단 · 슬롯 덮어쓰기까지 저장소에 남을 수 있음
- 인스턴스 메모리 최대 100건 · 동일 인스턴스 내 동시 요청 통합
- 서로 다른 인스턴스의 동시 최초 요청은 중복 호출 가능
- Blobs 장애 시 메모리 캐시로 운영 · 로컬은 메모리 캐시만 사용
- 입력 검사: 명백한 지시 변경·무관 질문 즉시 차단 + 모델 범위 판단
- 차단 시 422 응답 · 기본 검색 자동 전환 없음
- 연구 주제 여부 판별은 규칙·모델 기반으로 오탐·누락 가능
- 입력 2,000자·출력 최대 3,000토큰·API 대기 25초 제한
- 로컬 AI 테스트: `.env.local`에 `OPENAI_API_KEY` 등록 후 개발 서버 재시작
- Netlify 환경변수는 로컬 서버에 자동 동기화되지 않음
- API 오류·키 미등록: 오류 안내와 기존 키워드 검색 결과 표시
- 키는 Git·React 소스·`VITE_` 변수에 포함 금지
- 호출 제한은 전체 지출 상한이 아님 · OpenAI 프로젝트 사용량 별도 관리

### 수동 배포

- `npm ci` → `npm run build` 실행
- `dist` 폴더만 업로드 시 기본 검색만 지원
- AI 추천 운영: Git 연동으로 서버 함수까지 함께 배포

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
