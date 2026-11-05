import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, BookOpen, Bookmark, Check, ChevronDown, ChevronRight, CircleHelp, Globe2, Info, Layers3, LibraryBig, Search, SlidersHorizontal, Sparkles, TrendingUp, X } from 'lucide-react';
import { filterJournals, journals, money, publishers, quartileOf } from './data';
import './styles.css';
import { JournalName, JournalTopicProvider } from './JournalTopics';

const collectionSummary = publishers.map(p => `${p.name} ${journals.filter(j => j.publisherId === p.id).length}개`).join(', ');
const allCollection = { id: 'all', name: '전체 보기', monogram: 'ALL', description: '모든 출판사의 저널을 한곳에서 검색하고 비교하세요.', status: 'available' };
const publisherNames = Object.fromEntries(publishers.map(p => [p.id, p.name]));

function readSaved() {
  try {
    const stored = JSON.parse(localStorage.getItem('journal-atlas:saved') || '[]');
    return Array.isArray(stored) ? stored.filter(id => journals.some(j => j.id === id)) : [];
  } catch { return []; }
}

function App() {
  const [publisherId, setPublisherId] = useState('all');
  const [query, setQuery] = useState('');
  const [quartile, setQuartile] = useState('all');
  const [model, setModel] = useState('all');
  const [sort, setSort] = useState('quartile-asc');
  const [saved, setSaved] = useState(readSaved);
  const [savedOnly, setSavedOnly] = useState(false);
  const [guide, setGuide] = useState(false);
  const [toast, setToast] = useState('');
  const searchRef = useRef(null);
  const dialogRef = useRef(null);
  const publisher = publisherId === 'all' ? allCollection : publishers.find(p => p.id === publisherId);
  const collection = publisherId === 'all' ? journals : journals.filter(j => j.publisherId === publisherId);
  const nonOaCount = collection.filter(j => j.nonOaApc === 0).length;
  const filtered = useMemo(() => filterJournals(journals, { publisherId, query, quartile, model, sort, savedOnly, saved }), [publisherId, query, quartile, model, sort, savedOnly, saved]);
  const q1Count = collection.filter(j => quartileOf(j) === 'Q1').length;
  const knownIF = collection.map(j => j.impactFactor).filter(Number.isFinite);
  const knownAPC = collection.map(j => j.oaApc).filter(Number.isFinite);
  const maxIF = knownIF.length ? Math.max(...knownIF).toFixed(1) : '미확인';
  const minAPC = knownAPC.length ? money(Math.min(...knownAPC)) : '미확인';

  useEffect(() => {
    try { localStorage.setItem('journal-atlas:saved', JSON.stringify(saved)); } catch { /* Browsing still works when storage is unavailable. */ }
  }, [saved]);
  useEffect(() => { if (toast) { const timeout = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timeout); } }, [toast]);
  useEffect(() => {
    if (guide) dialogRef.current?.showModal(); else dialogRef.current?.close();
  }, [guide]);
  useEffect(() => {
    const handler = e => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) && !dialogRef.current?.open) {
        e.preventDefault(); searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  function reset() { setQuery(''); setQuartile('all'); setModel('all'); setSort('original'); }
  function selectPublisher(id) { setPublisherId(id); reset(); if (id === 'all') setSort('quartile-asc'); }
  function toggleSaved(id) { setSaved(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]); }
  function exportCsv() {
    const header = ['No.', 'Publisher', 'Journal', 'JCR 2025 Quartile', 'Impact Factor', 'Non-OA APC (USD)', 'OA APC (2026, USD)', 'IF 기준', '지표 출처'];
    const rows = filtered.map((j, index) => [publisherId === 'all' ? index + 1 : j.no, publisherNames[j.publisherId], j.name, j.quartile, (Number.isFinite(j.impactFactor) ? j.impactFactor.toFixed(1) : '미확인'), j.nonOaApc === undefined ? '미확인' : j.nonOaApc === null ? '해당 없음' : j.nonOaApc, Number.isFinite(j.oaApc) ? j.oaApc : '미확인', j.researchMetrics ? `${j.researchMetrics.jifDataYear} JIF / JCR ${j.researchMetrics.jcrReleaseYear} 발표` : '사용자 제공 2025 표기', j.researchMetrics?.sources[0].url || '사용자 제공']);
    const csv = '\uFEFF' + [header, ...rows].map(row => row.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = `journal-atlas-${publisherId}.csv`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); setToast(`${filtered.length}개 저널을 내보냈습니다.`);
  }

  return <>
    <a className="skip-link" href="#journal-list">저널 목록으로 건너뛰기</a>
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="./" aria-label="Journal Atlas 홈"><span className="brand-mark"><BookOpen size={21} strokeWidth={1.8} /></span>journal<span className="brand-light">atlas</span><span className="brand-dot">.</span></a>
        <nav className="main-nav" aria-label="주 메뉴"><button className={!savedOnly ? 'active' : ''} onClick={() => setSavedOnly(false)}>저널 둘러보기</button><button className={savedOnly ? 'active' : ''} onClick={() => setSavedOnly(true)}>저장한 저널 <span className="nav-count">{saved.length}</span></button></nav>
        <button className="guide-button" onClick={() => setGuide(true)}><CircleHelp size={16} /><span>데이터 가이드</span><ArrowUpRight size={14} /></button>
      </div>
    </header>

    <main className="main-container">
      <section className="catalog-overview" aria-label="수록 범위와 데이터 기준">
        <h1 className="sr-only">저널 지표 비교</h1>
        <span className="catalog-count">{journals.length}개 저널 · {publishers.length}개 컬렉션</span>
        <div className="catalog-meta"><span>JCR · IF 2025</span><span>OA APC 2026 · USD</span></div>
      </section>

      <section className="workspace" aria-label="출판사별 저널 탐색">
        <div className="section-kicker"><LibraryBig size={15} /> PUBLISHER COLLECTIONS</div>
        <div className="publisher-tabs" role="tablist" aria-label="출판사 선택">{[allCollection, ...publishers].map(p => <button key={p.id} id={`tab-${p.id}`} role="tab" aria-selected={publisherId === p.id} aria-controls="publisher-panel" className={`publisher-tab ${publisherId === p.id ? 'selected' : ''}`} onClick={() => selectPublisher(p.id)}><span className={`publisher-monogram ${p.id}`}>{p.monogram}</span><span>{p.name}</span>{p.status === 'upcoming' ? <span className="coming-tag">준비 중</span> : <span className="publisher-count">{p.id === 'all' ? journals.length : journals.filter(j => j.publisherId === p.id).length}</span>}{publisherId === p.id && <span className="selected-dot" />}</button>)}<span className="publisher-hint"><Globe2 size={14} /> 출판사별로 살펴보세요</span></div>

        <div id="publisher-panel" role="tabpanel" aria-labelledby={`tab-${publisherId}`}>
          <div className="collection-heading"><div><div className="collection-overline">{publisher.status === 'available' ? 'EXPLORE THE COLLECTION' : 'THE NEXT COLLECTION'}</div><h2>{publisher.name}<ArrowUpRight size={21} /></h2><p>{publisher.description}</p></div><span className="dataset-badge"><span className="status-dot" />{publisher.status === 'available' ? '제공 데이터 기준' : '데이터 등록 예정'}</span></div>
          {publisher.collectionNote && <p className="collection-note"><Info size={15} aria-hidden="true" /><span>{publisher.collectionNote}</span></p>}
          <div className="stats-grid">
            <Stat label="수록 저널" value={collection.length.toString().padStart(2, '0')} unit="journals" icon={<BookOpen size={18} />} detail="바이오·의공학 분야 컬렉션" />
            <Stat label="Q1 저널" value={knownIF.length ? q1Count : '미확인'} unit={collection.length ? `/ ${collection.length}` : ''} icon={<Sparkles size={18} />} detail={knownIF.length ? `전체 중 확인된 Q1 ${Math.round(q1Count / collection.length * 100)}%${collection.some(j => j.quartile === 'Q1*') ? ' · Q1* 포함' : ''}` : 'Quartile 확인 후 표시됩니다'} accent />
            <Stat label="최고 Impact Factor" value={maxIF} icon={<TrendingUp size={18} />} detail={publisherId === "jmir" || publisherId === "plos" ? "2025 JIF · JCR 2026 발표" : "제공 연도 및 개별 출처 기준"} />
            <Stat label="최저 OA 게재료" value={minAPC} unit={collection.length ? 'USD' : ''} icon={<Layers3 size={18} />} detail="2026년 OA APC 기준" />
          </div>

          {publisher.status === 'available' ? <>
            <div className="list-title" id="journal-list"><h3>{savedOnly ? '저장한 저널' : '저널 디렉터리'}<span>{filtered.length}</span></h3><button className="export-button" onClick={exportCsv} disabled={!filtered.length}><ArrowDownToLine size={15} />CSV 내보내기</button></div>
            <p className="journal-interaction-hint"><Info size={13} />저널명 클릭으로 공식 페이지 이동 · 마우스 올리기 또는 ⓘ 버튼으로 주요 주제 확인</p>
            <div className="filter-bar"><div className="search-box"><Search size={17} /><input ref={searchRef} aria-label="저널명 검색" placeholder="저널명으로 검색하세요" value={query} onChange={e => setQuery(e.target.value)} />{query ? <button aria-label="검색어 지우기" onClick={() => setQuery('')}><X size={15} /></button> : <kbd>/</kbd>}</div><div className="select-wrap"><SlidersHorizontal size={14} /><select aria-label="게재 방식 필터" value={model} onChange={e => setModel(e.target.value)}><option value="all">모든 게재 방식</option><option value="non-oa">Non-OA $0</option><option value="oa-only">Non-OA 해당 없음</option></select><ChevronDown size={13} /></div><div className="select-wrap sort-select"><select aria-label="정렬 기준" value={sort} onChange={e => setSort(e.target.value)}><option value="original">기본 순서</option><option value="quartile-asc">Quartile Q1 → Q4</option><option value="quartile-desc">Quartile Q4 → Q1</option><option value="if-desc">IF 높은 순</option><option value="if-asc">IF 낮은 순</option><option value="apc-asc">OA APC 낮은 순</option><option value="apc-desc">OA APC 높은 순</option><option value="name">저널명 A–Z</option></select><ChevronDown size={13} /></div></div>
            <div className="quick-filter-row"><button className={`non-oa-toggle ${model === 'non-oa' ? 'active' : ''}`} aria-pressed={model === 'non-oa'} onClick={() => setModel(model === 'non-oa' ? 'all' : 'non-oa')}><Check size={14} />Non-OA APC $0만 보기<span>{nonOaCount}</span></button><span className="sort-hint">Quartile 정렬 시 같은 구간 안에서는 IF 높은 순으로 표시합니다.</span></div>
            <div className="quartile-row"><div className="quartile-tabs" role="group" aria-label="Quartile 필터">{['all', 'Q1', 'Q2', 'Q3', 'Q4'].map(q => <button key={q} className={quartile === q ? 'active' : ''} aria-pressed={quartile === q} onClick={() => setQuartile(q)}>{q === 'all' ? '전체' : q}<span>{collection.filter(j => q === 'all' || quartileOf(j) === q).length}</span></button>)}</div><span className="results-caption" aria-live="polite">{collection.length}개 중 {filtered.length}개 표시</span></div>
            <div className="table-container"><table><caption className="sr-only">{publisher.name} 저널의 Quartile, IF, Non-OA 및 OA 게재료 비교</caption><thead><tr><th scope="col" className="no-col">NO.</th><th scope="col" className="name-col">저널명 <span>JOURNAL TITLE</span></th><th scope="col" aria-sort={sort === 'quartile-asc' ? 'ascending' : sort === 'quartile-desc' ? 'descending' : 'none'}><button className="th-button" onClick={() => setSort(sort === 'quartile-asc' ? 'quartile-desc' : 'quartile-asc')}>JCR Quartile <ArrowDown size={12} className={sort === 'quartile-asc' ? 'rotate' : ''} /></button><small>{publisherId === "jmir" || publisherId === "plos" ? "JCR 2026 발표" : "개별 출처 참조"}</small></th><th scope="col" aria-sort={sort === 'if-desc' ? 'descending' : sort === 'if-asc' ? 'ascending' : 'none'}><button className="th-button" onClick={() => setSort(sort === 'if-desc' ? 'if-asc' : 'if-desc')}>Impact Factor <ArrowDown size={12} className={sort === 'if-asc' ? 'rotate' : ''} /></button><small>{publisherId === "jmir" || publisherId === "plos" ? "2025 JIF" : "2025 제공 · 개별 연도 참조"}</small></th><th scope="col">Non-OA APC<small>USD</small></th><th scope="col" aria-sort={sort === 'apc-asc' ? 'ascending' : sort === 'apc-desc' ? 'descending' : 'none'}><button className="th-button" onClick={() => setSort(sort === 'apc-asc' ? 'apc-desc' : 'apc-asc')}>OA APC <ArrowDown size={12} className={sort === 'apc-asc' ? 'rotate' : ''} /></button><small>2026 · USD</small></th><th scope="col" className="save-col"><span className="sr-only">저장</span><Bookmark size={14} /></th></tr></thead><tbody>{filtered.map((j, index) => <tr key={j.id}><td className="row-number">{String(publisherId === 'all' ? index + 1 : j.no).padStart(2, '0')}</td><td className="journal-name"><JournalName journal={j} />{publisherId === 'all' && <span className="row-publisher">{publisherNames[j.publisherId]}</span>}</td><td><span className={`quartile-badge ${quartileOf(j).toLowerCase()}`}>{j.quartile}</span></td><td><span className="if-value">{(Number.isFinite(j.impactFactor) ? j.impactFactor.toFixed(1) : '미확인')}</span>{j.researchMetrics && Number.isFinite(j.impactFactor) && <small className="if-year">{j.researchMetrics.jifDataYear} JIF</small>}<span className="if-bar" aria-hidden="true"><i style={{ width: `${j.impactFactor / (Number(maxIF) || 1) * 100}%` }} /></span></td><td className={j.nonOaApc === null ? 'unavailable' : 'non-oa'}>{money(j.nonOaApc)}</td><td className="apc-value">{Number.isFinite(j.oaApc) ? money(j.oaApc) : '미확인'}</td><td><button className={`bookmark-button ${saved.includes(j.id) ? 'is-saved' : ''}`} aria-label={`${j.name} ${saved.includes(j.id) ? '저장 해제' : '저장'}`} aria-pressed={saved.includes(j.id)} onClick={() => toggleSaved(j.id)}><Bookmark size={16} fill={saved.includes(j.id) ? 'currentColor' : 'none'} /></button></td></tr>)}</tbody></table>{!filtered.length && <div className="empty-results"><Search size={27} /><h3>{savedOnly && !saved.length ? '아직 저장한 저널이 없습니다' : '조건에 맞는 저널이 없습니다'}</h3><p>{savedOnly && !saved.length ? '저널 옆 북마크를 눌러 관심 있는 저널을 모아보세요.' : '검색어를 바꾸거나 필터를 초기화해 보세요.'}</p><button onClick={() => { selectPublisher('all'); setSavedOnly(false); }}>전체 저널 보기 <ArrowRight size={14} /></button></div>}</div>
            <div className="table-bottom"><span><Check size={13} />전체 {filtered.length}개 결과를 표시하고 있습니다</span><a href="#journal-list">목록 위로 <ArrowRight size={13} className="up-arrow" /></a></div>
          </> : <div className="publisher-empty" id="journal-list"><span className="empty-icon"><LibraryBig size={30} strokeWidth={1.4} /></span><span className="eyebrow">NEXT IN THE ATLAS</span><h3>다음은, Elsevier입니다.</h3><p>Elsevier의 저널 지표와 게재료를 준비하고 있습니다.<br />데이터가 등록되면 이곳에서 같은 방식으로 검색하고 비교할 수 있습니다.</p><button className="primary-button" onClick={() => selectPublisher('springer')}>Springer Nature 둘러보기 <ArrowRight size={15} /></button><span className="empty-note">현재 등록된 Elsevier 저널은 0개입니다.</span></div>}
        </div>
      </section>

      <aside className="data-note"><Info size={18} /><div><strong>데이터를 읽기 전에</strong><p>JCR Quartile·IF는 2025년, OA APC는 2026년 제공 자료 기준입니다. Non-OA의 ‘해당 없음’은 $0과 다릅니다. Q1*의 별표는 원문 표기를 유지했으며, 의미는 별도 확인이 필요합니다.</p><p>IF가 확인된 저널만 수록합니다. JMIR·PLOS 12개는 2025 JIF 및 JCR 2026 발표 Quartile을 반영했습니다. 게재료는 변경될 수 있으므로 최종 투고 전 해당 저널의 공식 안내를 확인하세요.</p></div><button onClick={() => setGuide(true)}>자세히 보기 <ChevronRight size={14} /></button></aside>
    </main>
    <footer><div className="footer-inner"><span className="footer-brand">journal atlas.</span><span className="footer-affiliation">한신대학교 AI·SW대학 성낙준(Nak-Jun Sung, Ph.D. / <a href="https://github.com/nakjun" target="_blank" rel="noopener noreferrer">https://github.com/nakjun</a>)</span><button onClick={() => setGuide(true)}>데이터 기준 및 디자인 레퍼런스 <ArrowUpRight size={12} /></button><span className="footer-year">© 2026 Journal Atlas</span></div></footer>
    <dialog ref={dialogRef} onCancel={() => setGuide(false)} onClick={e => { if (e.target === dialogRef.current) setGuide(false); }} aria-labelledby="guide-title"><div className="dialog-content"><div className="dialog-top"><span className="eyebrow">A NOTE ON THE DATA</span><button aria-label="가이드 닫기" onClick={() => setGuide(false)}><X size={20} /></button></div><h2 id="guide-title">데이터 가이드</h2><p>사용자 제공 175개와 추가 조사 저널 중 IF가 확인된 13개를 수록했습니다. 현재 {collectionSummary}, 총 {journals.length}개입니다. 공식 JCR 또는 출판사와 연동된 서비스가 아닙니다.</p><dl><dt>JCR Quartile / Impact Factor</dt><dd>기존 제공 표의 2025년 값은 유지합니다. 추가 조사한 JMIR·PLOS는 2025 JIF(JCR 2026 발표) 기준이며, 공식 출처·분야·예외는 저널 설명창에 표시합니다. 원본 제공 표와 조사 지표의 연도 정의가 다를 수 있으므로 출처를 확인하세요. Q1*도 Q1 필터와 통계에 포함하며, 별표의 의미는 제공 자료에 명시되지 않았습니다.</dd><dt>Non-OA APC / OA APC</dt><dd>Non-OA $0은 제공 표상 APC가 0달러라는 뜻입니다. ‘해당 없음’은 Non-OA 금액을 적용할 수 없는 항목입니다. OA APC는 2026년 USD 금액이며 세금·할인·계약 조건은 제공 자료에 없습니다.</dd><dt>저장 및 내보내기</dt><dd>북마크는 현재 브라우저에 저장됩니다. CSV에는 현재 컬렉션과 검색·필터 조건에 해당하는 결과 및 각 저널의 출판사 정보가 포함됩니다.</dd><dt>공식 페이지와 주요 연구 주제</dt><dd>저널명을 클릭하면 공식 저널 페이지가 새 탭으로 열립니다. 마우스를 올리거나 키보드로 포커스하면 주요 주제를 확인할 수 있으며, ⓘ 버튼으로 설명창을 열어둘 수도 있습니다. 주제는 출판사·학회의 공식 소개를 바탕으로 요약한 대표 항목이며 전체 투고 범위를 대체하지 않습니다. 각 설명창에 원문 출처와 각 저널의 확인일을 표시합니다.</dd><dt>출판사별 컬렉션</dt><dd>{collectionSummary} 저널을 수록했습니다. ‘전체 보기’에서 모든 저널을 비교하거나 출판사 탭으로 전환할 수 있습니다. Quartile은 Q1→Q4 또는 역순으로 정렬하며 같은 구간 안에서는 IF 높은 순으로 표시합니다. ‘Non-OA APC $0만 보기’ 버튼은 해당 없음 항목을 제외합니다. 검색·필터 결과는 CSV로 내보낼 수 있습니다.</dd><dt>디자인 레퍼런스</dt><dd><a href="https://www.hs.ac.kr/kor/index.do" target="_blank" rel="noreferrer">한신대학교 대표 홈페이지 <ArrowUpRight size={12} /></a><span>보라색 강조색 #5C31C0 · 짙은 보라색 #241055 · 보조색 #756AB7</span><a href="https://linear.app/now/behind-the-latest-design-refresh" target="_blank" rel="noreferrer">Linear — A calmer interface <ArrowUpRight size={12} /></a><span>정보 위계, 낮은 대비의 구분선, 일관된 탐색 구조</span><a href="https://www.nature.com/nature-portfolio" target="_blank" rel="noreferrer">Nature Portfolio <ArrowUpRight size={12} /></a><span>학술 출판물의 타이포그래피와 컬렉션 탐색 구조</span></dd></dl><button className="primary-button" onClick={() => setGuide(false)}>확인했습니다 <Check size={16} /></button></div></dialog>
    {toast && <div role="status" className="toast"><Check size={16} />{toast}</div>}
  </>;
}

function Stat({ label, value, unit, icon, detail, accent }) {
  return <div className={`stat-card ${accent ? 'accent-stat' : ''}`}><div className="stat-label">{label}<span>{icon}</span></div><div className="stat-number">{value}<span>{unit}</span></div><p>{detail}</p></div>;
}

createRoot(document.getElementById('root')).render(<JournalTopicProvider><App /></JournalTopicProvider>);
