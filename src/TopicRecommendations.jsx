import React, { useMemo, useState } from 'react';
import { Bookmark, Search } from 'lucide-react';
import { journals, money, publishers } from './data';
import { JournalName } from './JournalTopics';
import { recommendJournals } from './recommendations';

export default function TopicRecommendations({ saved, toggleSaved }) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [nonOaOnly, setNonOaOnly] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [busy, setBusy] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [notice, setNotice] = useState('');
  const fallback = useMemo(() => recommendJournals(journals, submitted, { nonOaOnly }), [submitted, nonOaOnly]);
  const results = aiResult ? aiResult.recommendations.map(row => ({ journal: journals.find(j => j.id === row.id), reason: row.reason, matches: [], evidence: [] })).filter(row => row.journal && (!nonOaOnly || row.journal.nonOaApc === 0)) : fallback;
  function clearResults() { setSubmitted(''); setAiResult(null); setNotice(''); }
  async function search(event) {
    event.preventDefault();
    if (busy || !input.trim()) return;
    setSubmitted(input.trim()); setAiResult(null); setNotice('');
    if (!useAI) return;
    setBusy(true);
    try {
      const response = await fetch('/.netlify/functions/recommend', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: input.trim(), nonOaOnly }), signal: AbortSignal.timeout(30000),
      });
      if (response.status === 404) throw new Error('AI 서버 함수 미배포 · Netlify에서 Git 저장소 연결 후 재배포 필요');
      if (response.status === 429) throw new Error('요청 한도 초과 · 잠시 후 다시 시도');
      if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('AI 서버 응답 형식 오류 · Netlify 함수 배포 상태 확인 필요');
      const data = await response.json();
      if (response.status === 422 && data.code === 'OFF_TOPIC') { setSubmitted(''); setNotice(data.error); return; }
      if (!response.ok) throw new Error(data.error || 'AI 연결 실패');
      if (!Array.isArray(data.recommendations) || !data.recommendations.every(row => journals.some(j => j.id === row.id))) throw new Error('AI 결과 확인 실패');
      setAiResult(data);
    } catch (error) {
      setNotice(`${error.name === 'TimeoutError' ? 'AI 응답 시간 초과' : error instanceof SyntaxError || error instanceof TypeError ? 'AI 서버 연결 불가' : error.message} · 기본 키워드 검색 결과 표시`);
    } finally { setBusy(false); }
  }
  return <section className="topic-recommender" aria-labelledby="recommend-title">
    <div className="recommend-heading"><h2 id="recommend-title">연구 주제별 TOP 10</h2><span>전체 출판사 대상</span></div>
    <form onSubmit={search}>
      <label htmlFor="research-topic">연구 주제 · 논문 제목 · 핵심 키워드</label>
      <div className="recommend-input"><input id="research-topic" value={input} onChange={event => setInput(event.target.value)} placeholder="예: 유방촬영 영상의 딥러닝 분할 / Mammographic segmentation" maxLength={2000} disabled={busy} required /><button type="submit" className="primary-button" disabled={busy || !input.trim()}><Search size={16} />{busy ? '주제 분석 중…' : '추천 보기'}</button></div>
      <div className="recommend-options"><label><input type="checkbox" checked={nonOaOnly} disabled={busy} onChange={event => { setNonOaOnly(event.target.checked); clearResults(); }} />Non-OA APC $0만</label><label><input type="checkbox" checked={useAI} disabled={busy} onChange={event => { setUseAI(event.target.checked); clearResults(); }} />AI 추천 사용</label><span>{useAI ? '입력 주제 OpenAI 전송 · 추천 결과 최대 24시간 캐시 재사용' : '기본 검색 · 외부 전송 없음'}</span></div>
    </form>
    <p className="recommend-note">{useAI ? 'GPT-6 Luna · 연구 주제와 저널 범위 기반 추천' : '저널명·주요 주제의 키워드 일치도 순'} · 게재 가능성 예측 아님</p>
    {useAI && <p className="recommend-note">연구 주제·논문 제목만 입력 · 일반 질문·코드 작성·지시 변경 요청 제외</p>}
    {busy && <p role="status">연구 주제 해석 및 저널 범위 비교 중…</p>}
    {notice && <p className="recommend-note" role="status">{notice}</p>}
    {submitted && !busy && <div className="recommend-results" aria-live="polite">
      {aiResult?.cached && <p className="recommend-note">저장된 추천 결과 · API 추가 호출 없음</p>}
      {aiResult && <p className="recommend-interpretation">{aiResult.interpretation}</p>}
      <p className="recommend-summary">“{submitted}” · {notice ? '기본 검색' : '추천'} {results.length}개{results.length < 10 && ' · 일치하는 저널만 표시'}</p>
      {!results.length && <p>{notice ? 'AI 추천 미완료 · 기본 키워드 검색에서 일치 항목 없음' : '일치하는 저널 없음 · 분야 또는 연구 방법 키워드 추가'}</p>}
      <ol>{results.map(({ journal, matches, evidence, reason }, index) => <li key={journal.id} className="recommend-card">
        <span className="recommend-rank">{String(index + 1).padStart(2, '0')}</span>
        <div className="recommend-detail"><JournalName journal={journal} /><div className="recommend-meta">{publishers.find(p => p.id === journal.publisherId)?.name} · {journal.quartile} · IF {journal.impactFactor.toFixed(1)} · Non-OA {money(journal.nonOaApc)} · OA {money(journal.oaApc)}</div><p className="recommend-match">{reason ? `추천 이유: ${reason}` : `일치 키워드: ${matches.join(' · ')}`}</p>{evidence.length > 0 && <ul>{evidence.map(text => <li key={text}>{text}</li>)}</ul>}</div>
        <button type="button" className={`bookmark-button ${saved.includes(journal.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(journal.id)} aria-label={`${journal.name} ${saved.includes(journal.id) ? '저장 해제' : '저장'}`} aria-pressed={saved.includes(journal.id)}><Bookmark size={17} fill={saved.includes(journal.id) ? 'currentColor' : 'none'} /></button>
      </li>)}</ol>
    </div>}
  </section>;
}
