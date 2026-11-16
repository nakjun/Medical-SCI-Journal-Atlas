import { journalDetails } from './journal-details.js';

// Bilingual concepts bridge English manuscript titles and Korean scope summaries.
const concepts = [
  ['의료영상', 'medical imaging', 'medical image', 'biomedical imaging', 'mammograph', '유방', '의료영상', '의료 영상', 'radiolog', '방사선영상'],
  ['영상 분할', 'segmentation', '분할', '분절'],
  ['딥러닝·AI', 'deep learning', 'machine learning', 'artificial intelligence', 'neural network', '딥러닝', '머신러닝', '인공지능', '학습', 'ai', 'u net', 'unet', 'transformer'],
  ['영상처리', 'image processing', 'computer vision', '영상처리', '영상 처리', '컴퓨터 비전', '영상 분석', 'image analysis', 'segmentation', '분할', '분절'],
  ['자기공명', 'magnetic resonance', 'mri', 'nmr', '자기공명'],
  ['초음파', 'ultrasound', 'ultrasonic', '초음파'],
  ['CT·단층영상', 'computed tomography', 'ct', '단층'],
  ['핵의학', 'nuclear medicine', 'pet', 'spect', '핵의학'],
  ['암·종양', 'cancer', 'oncolog', 'tumor', 'tumour', '종양', '암'],
  ['신경·뇌', 'neural', 'neuro', 'brain', '신경', '뇌'],
  ['재활', 'rehabilitation', '재활', '보조공학'],
  ['로봇·수술', 'robot', 'surgery', 'surgical', '로봇', '수술'],
  ['생체재료', 'biomaterial', '생체재료', '생체 재료'],
  ['조직공학·재생', 'tissue engineering', 'regenerative', 'biofabrication', 'bioprint', '조직공학', '재생의학', '바이오프린팅'],
  ['나노의학', 'nano', '나노'],
  ['약물 전달', 'drug delivery', '약물 전달', '약물전달'],
  ['바이오센서', 'biosensor', '바이오센서', '생체센서'],
  ['웨어러블', 'wearable', '웨어러블'],
  ['디지털 헬스', 'digital health', 'digital medicine', 'telemedicine', 'mhealth', '디지털 헬스', '디지털헬스', '원격의료', '모바일 헬스'],
  ['의료정보학', 'informatics', 'electronic health record', 'ehr', '정보학', '의무기록', '의료정보'],
  ['생체신호', 'biosignal', 'signal processing', '생체신호', '신호처리', '신호 처리'],
  ['심혈관', 'cardiac', 'cardiovascular', 'electrocardio', 'ecg', '심장', '심혈관', '심전도'],
  ['생체역학', 'biomechanic', 'gait', '생체역학', '보행'],
  ['통계', 'statistic', '통계'],
  ['임상시험', 'clinical trial', '임상시험'],
  ['유전체·생물정보학', 'genom', 'bioinformatics', '유전체', '생물정보'],
  ['광학·광자', 'optic', 'photonic', 'fluorescen', '광학', '광자', '형광'],
  ['방사선치료·선량', 'radiotherapy', 'dosimetry', '방사선치료', '선량'],
  ['생물공정', 'bioprocess', 'fermentation', '생물공정', '발효'],
  ['미세유체·MEMS', 'microfluid', 'mems', 'microelectromechanical', '미세유체', '미세기계'],
];
const stop = new Set('a an the of in for and or with on to by from using based study comparative comparison evaluation models model methods method research medical biomedical journal international transactions review 저널 연구 비교 평가 모델 기반 이용 활용 대한 위한 관한'.split(' '));
const normalize = text => text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
function contains(text, term) {
  // Short acronyms must match whole words: CT must not match "prediction".
  return /^[a-z0-9]{1,3}$/.test(term) ? text.split(' ').includes(term) : text.includes(term);
}
function features(text) {
  const normalized = normalize(text);
  const found = new Map();
  let residual = normalized;
  for (const [label, ...aliases] of concepts) {
    if (aliases.some(alias => contains(normalized, normalize(alias)))) found.set(`concept:${label}`, label);
    for (const alias of aliases) {
      const value = normalize(alias);
      if (value.length > 3) residual = residual.replaceAll(value, ' ');
    }
  }
  for (const token of residual.split(/\s+/)) {
    if (token.length >= 2 && !stop.has(token) && !concepts.some(([, ...aliases]) => aliases.includes(token))) found.set(`word:${token}`, token);
  }
  return found;
}

export function recommendJournals(items, topic, { nonOaOnly = false } = {}) {
  const query = features(topic);
  if (!query.size) return [];
  const documents = items.map(journal => {
    const topics = journalDetails[journal.name]?.topics || [];
    return { journal, topics, terms: features([journal.name, ...topics].join(' ')) };
  });
  const frequency = new Map();
  for (const { terms } of documents) for (const key of terms.keys()) frequency.set(key, (frequency.get(key) || 0) + 1);
  return documents.filter(({ journal }) => !nonOaOnly || journal.nonOaApc === 0).map(({ journal, topics, terms }) => {
    const matches = [...query].filter(([key]) => terms.has(key));
    const titleTerms = features(journal.name);
    const score = matches.reduce((sum, [key]) => sum + Math.log(1 + items.length / (frequency.get(key) || 1)) * (titleTerms.has(key) ? 1.35 : 1), 0);
    const evidence = topics.filter(text => {
      const keys = features(text);
      return matches.some(([key]) => keys.has(key));
    }).slice(0, 2);
    return { journal, score, matches: matches.map(([, label]) => label), evidence };
  }).filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.journal.name.localeCompare(b.journal.name, 'en'))
    .slice(0, 10);
}
