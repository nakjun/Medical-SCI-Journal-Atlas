import React, { useMemo, useState } from 'react';
import { Bookmark, Search } from 'lucide-react';
import { journals, money, publishers } from './data';
import { JournalName } from './JournalTopics';
import { recommendJournals } from './recommendations';

export default function TopicRecommendations({ saved, toggleSaved }) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [nonOaOnly, setNonOaOnly] = useState(false);
  const results = useMemo(() => recommendJournals(journals, submitted, { nonOaOnly }), [submitted, nonOaOnly]);
  return <section className="topic-recommender" aria-labelledby="recommend-title">
    <div className="recommend-heading"><h2 id="recommend-title">연구 주제별 TOP 10</h2><span>전체 출판사 대상</span></div>
    <form onSubmit={event => { event.preventDefault(); setSubmitted(input.trim()); }}>
      <label htmlFor="research-topic">연구 주제 · 논문 제목 · 핵심 키워드</label>
      <div className="recommend-input"><input id="research-topic" value={input} onChange={event => setInput(event.target.value)} placeholder="예: 유방촬영 영상의 딥러닝 분할 / Mammographic segmentation" maxLength={2000} required /><button type="submit" className="primary-button" disabled={!input.trim()}><Search size={16} />추천 보기</button></div>
      <div className="recommend-options"><label><input type="checkbox" checked={nonOaOnly} onChange={event => setNonOaOnly(event.target.checked)} />Non-OA APC $0만</label><span>한글·영문 지원 · 입력 내용 외부 전송 없음</span></div>
    </form>
    <p className="recommend-note">저널명·주요 주제의 키워드 일치도 순 · 게재 가능성 예측 아님</p>
    {submitted && <div className="recommend-results" aria-live="polite">
      <p className="recommend-summary">“{submitted}” · {results.length}개 추천{results.length < 10 && ' · 일치하는 저널만 표시'}</p>
      {!results.length && <p>일치하는 저널 없음 · 분야 또는 연구 방법 키워드 추가</p>}
      <ol>{results.map(({ journal, matches, evidence }, index) => <li key={journal.id} className="recommend-card">
        <span className="recommend-rank">{String(index + 1).padStart(2, '0')}</span>
        <div className="recommend-detail"><JournalName journal={journal} /><div className="recommend-meta">{publishers.find(p => p.id === journal.publisherId)?.name} · {journal.quartile} · IF {journal.impactFactor.toFixed(1)} · Non-OA {money(journal.nonOaApc)} · OA {money(journal.oaApc)}</div><p className="recommend-match">일치 키워드: {matches.join(' · ')}</p>{evidence.length > 0 && <ul>{evidence.map(text => <li key={text}>{text}</li>)}</ul>}</div>
        <button type="button" className={`bookmark-button ${saved.includes(journal.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(journal.id)} aria-label={`${journal.name} ${saved.includes(journal.id) ? '저장 해제' : '저장'}`} aria-pressed={saved.includes(journal.id)}><Bookmark size={17} fill={saved.includes(journal.id) ? 'currentColor' : 'none'} /></button>
      </li>)}</ol>
    </div>}
  </section>;
}
