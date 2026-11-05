import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Info, X } from 'lucide-react';
import { journalDetails, topicsCheckedAt } from './journal-details';
import { getEditorialMetrics } from './editorial-metrics';

const TopicContext = createContext(null);

export function JournalTopicProvider({ children }) {
  const [preview, setPreview] = useState(null);
  const previewState = useRef(null);
  const closeTimer = useRef(null);
  const panelRef = useRef(null);

  function cancelClose() { clearTimeout(closeTimer.current); }
  function close({ force = false, restoreFocus = false } = {}) {
    cancelClose();
    const current = previewState.current;
    if (!current || (current.pinned && !force)) return;
    previewState.current = null;
    setPreview(null);
    if (restoreFocus && current.trigger.isConnected) {
      current.trigger.querySelector('.topic-info-button')?.focus({ preventScroll: true });
    }
  }
  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => close(), 160);
  }
  function open(journal, trigger, pinned = false) {
    cancelClose();
    const current = previewState.current;
    if (current?.pinned && !pinned) return;
    const bounds = trigger.getBoundingClientRect();
    const next = { journal, trigger, pinned, anchorTop: bounds.top, anchorLeft: bounds.left };
    previewState.current = next;
    setPreview(next);
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape' && previewState.current) {
        event.preventDefault();
        close({ force: true, restoreFocus: previewState.current.pinned });
      }
    }
    function onPointerDown(event) {
      const current = previewState.current;
      if (current && !current.trigger.contains(event.target) && !panelRef.current?.contains(event.target)) {
        close({ force: true });
      }
    }
    function onScroll(event) {
      if (panelRef.current?.contains(event.target)) return;
      const current = previewState.current;
      if (!current) return;
      const bounds = current.trigger.getBoundingClientRect();
      // 클릭·포커스가 유발한 스크롤의 지연 이벤트로 새 설명창이 닫히지 않게 합니다.
      if (!current.trigger.isConnected || Math.abs(bounds.top - current.anchorTop) > 1 || Math.abs(bounds.left - current.anchorLeft) > 1) {
        close({ force: true });
      }
    }
    const onResize = () => close({ force: true });
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      cancelClose();
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <TopicContext.Provider value={{ preview, open, close, scheduleClose, cancelClose, panelRef }}>
    {children}
    {preview && createPortal(<TopicPanel key={preview.journal.id} preview={preview} panelRef={panelRef}
      onMouseEnter={cancelClose} onMouseLeave={scheduleClose}
      onClose={() => close({ force: true, restoreFocus: true })}
      onDismiss={() => close({ force: true })} />, document.body)}
  </TopicContext.Provider>;
}

export function JournalName({ journal }) {
  const { preview, open, close, scheduleClose, cancelClose, panelRef } = useContext(TopicContext);
  const wrapRef = useRef(null);
  const focusFrame = useRef(null);
  const details = journalDetails[journal.name];
  const active = preview?.journal.id === journal.id;
  useEffect(() => () => cancelAnimationFrame(focusFrame.current), []);

  function onBlur(event) {
    cancelAnimationFrame(focusFrame.current);
    const target = event.relatedTarget;
    if (!wrapRef.current?.contains(target) && !panelRef.current?.contains(target)) close({ force: true });
  }

  return <span className="journal-title-wrap" ref={wrapRef} onMouseEnter={cancelClose} onMouseLeave={scheduleClose} onBlur={onBlur}>
    <a className="journal-link" href={details.homepage} target="_blank" rel="noopener noreferrer"
      aria-label={`${journal.name} 공식 페이지 (새 탭)`}
      aria-describedby={active ? `${journal.id}-topics` : undefined}
      onMouseEnter={() => open(journal, wrapRef.current)}
      onFocus={event => {
        const link = event.currentTarget;
        // 키보드 포커스로 인한 브라우저 자동 스크롤 이후에 위치를 측정합니다.
        focusFrame.current = requestAnimationFrame(() => {
          if (document.activeElement === link) open(journal, wrapRef.current);
        });
      }}
      onClick={() => { cancelAnimationFrame(focusFrame.current); close({ force: true }); }}>
      {journal.name}<ArrowUpRight size={12} aria-hidden="true" />
    </a>
    <button className={`topic-info-button ${active ? 'active' : ''}`}
      aria-label={`${journal.name} 주요 연구 주제 보기`} aria-haspopup="dialog"
      aria-expanded={active} aria-controls={active ? `${journal.id}-preview` : undefined}
      onClick={() => {
        if (active && preview.pinned) close({ force: true });
        else open(journal, wrapRef.current, true);
      }}><Info size={14} aria-hidden="true" /></button>
  </span>;
}

function TopicPanel({ preview, panelRef, onMouseEnter, onMouseLeave, onClose, onDismiss }) {
  const { journal, trigger, pinned } = preview;
  const details = journalDetails[journal.name];
  const metrics = getEditorialMetrics(journal);
  const [position, setPosition] = useState({ top: 0, left: 0, ready: false });

  useLayoutEffect(() => {
    const rect = trigger.getBoundingClientRect();
    const panel = panelRef.current.getBoundingClientRect();
    const gap = 10;
    const margin = 12;
    const left = Math.max(margin, Math.min(rect.left, window.innerWidth - panel.width - margin));
    const below = rect.bottom + gap;
    const above = rect.top - panel.height - gap;
    const top = below + panel.height <= window.innerHeight - margin ? below : Math.max(margin, above);
    setPosition({ top, left, ready: true });
    if (pinned) panelRef.current.querySelector('button')?.focus({ preventScroll: true });
  }, [journal.id, trigger, pinned, panelRef]);

  return <section ref={panelRef} id={`${journal.id}-preview`} role="dialog" aria-modal="false"
    aria-labelledby={`${journal.id}-preview-title`} aria-describedby={`${journal.id}-topics`}
    className="journal-topic-panel" style={{ top: position.top, left: position.left, visibility: position.ready ? 'visible' : 'hidden' }}
    onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget) && !trigger.contains(event.relatedTarget)) onDismiss();
    }}>
    <div className="topic-panel-top"><span>MAIN TOPICS</span><button aria-label="연구 주제 닫기" onClick={onClose}><X size={16} /></button></div>
    <h4 id={`${journal.id}-preview-title`}>{journal.name}</h4>
    {details.publisherNote && <p className="topic-scope-note">{details.publisherNote}</p>}
    <ul id={`${journal.id}-topics`}>{details.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
    <p className="topic-scope-note">공식 소개를 바탕으로 요약한 대표 주제입니다.</p>
    <div className="topic-panel-links"><a href={details.scopeSource} target="_blank" rel="noopener noreferrer">주제 요약 출처 <ArrowUpRight size={12} /></a><a href={details.homepage} target="_blank" rel="noopener noreferrer">공식 저널 페이지 <ArrowUpRight size={12} /></a></div>
    {metrics && <section className="topic-acceptance" aria-label="게재율">
      <div className="topic-acceptance-heading"><span>게재율 <small>Acceptance rate</small></span><strong>{metrics.approximate ? '약 ' : ''}{metrics.acceptanceRatePercent}%</strong></div>
      <p>{metrics.definition || '최종 결정 논문 기준 · 외부 심사 없는 거절 포함'}</p>
      {metrics.displayNote && <p className="topic-metric-conflict">{metrics.displayNote}</p>}
      {metrics.status === 'conflicting_homepage_statements' && <p className="topic-metric-conflict">Journal Metrics 영역은 {metrics.acceptanceRatePercent}%, 같은 페이지 본문은 {metrics.alternativeAcceptanceRatePercent}%로 표기가 상충합니다.</p>}
      <div className="topic-metric-source"><a href={metrics.sourceUrl} target="_blank" rel="noopener noreferrer">공식 지표 출처 <ArrowUpRight size={12} /></a><span>확인 {metrics.collectedAt}</span></div>
      <p className="topic-metric-period">집계 기간: {metrics.metricPeriod || '미표기'}{metrics.verificationMethod === 'official_page_search_index' ? ' · 공식 페이지 검색 색인에서 확인' : ''}</p>
    </section>}
    {journal.researchMetrics && <section className="topic-acceptance" aria-label="조사 지표 및 심사 기간">
      <div className="topic-acceptance-heading"><span>{journal.researchMetrics.firstDecision.label}</span><strong>{journal.researchMetrics.firstDecision.kind === 'target' ? '약 ' : ''}{journal.researchMetrics.firstDecision.value}{journal.researchMetrics.firstDecision.unit === 'months' ? '개월' : '일'}</strong></div>
      <p>{journal.researchMetrics.firstDecision.note}</p>
      {journal.researchMetrics.acceptanceNote && <p>게재율: {journal.researchMetrics.acceptanceNote}</p>}
      <div className="topic-metric-source"><a href={journal.researchMetrics.firstDecision.sourceUrl} target="_blank" rel="noopener noreferrer">공식 심사 안내 ↗</a><span>확인 {journal.researchMetrics.collectedAt}</span></div>
      <p>{journal.researchMetrics.note}</p><p>{journal.researchMetrics.apcNote}</p>
      <div className="topic-panel-links">{journal.researchMetrics.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>
    </section>}
    <div className="topic-panel-footer"><span>주제 확인 {details.checkedAt || topicsCheckedAt}</span><span>Esc로 닫기</span></div>
  </section>;
}
