import researchedMetrics from '../docs/research/jmir-plos-metrics-2026-11-05.json' with { type: 'json' };
import { researchAdditions } from './research-additions.js';
// 사용자 제공 데이터. null은 Non-OA '해당 없음'을 뜻하며 0달러와 구분합니다.
const springerRows = [
  ['Nature Biomedical Engineering', 'Q1', 26.3, 0, 12850],
  ['npj Digital Medicine', 'Q1', 18.0, null, 4290],
  ['Journal of Nanobiotechnology', 'Q1', 15.0, null, 3890],
  ['Journal of Medical Systems', 'Q1', 8.8, 0, 5290],
  ['Bio-Design and Manufacturing', 'Q1', 7.9, 0, 3190],
  ['European Journal of Nuclear Medicine and Molecular Imaging', 'Q1', 7.6, 0, 5390],
  ['npj Regenerative Medicine', 'Q1', 7.0, null, 4390],
  ['BioChip Journal', 'Q1', 6.7, 0, 3690],
  ['Journal of Biological Engineering', 'Q1', 6.3, null, 3090],
  ['Bioresources and Bioprocessing', 'Q1', 6.3, null, 1990],
  ['Journal of NeuroEngineering and Rehabilitation', 'Q1', 6.0, null, 4190],
  ['European Radiology', 'Q1', 6.0, 0, 4590],
  ['Insights into Imaging', 'Q1', 5.6, null, 3390],
  ['La radiologia medica', 'Q1', 5.3, 0, 3990],
  ['European Radiology Experimental', 'Q1', 4.7, null, 3090],
  ['Japanese Journal of Radiology', 'Q1', 4.6, 0, 4290],
  ['BMC Bioinformatics', 'Q1', 4.4, null, 3090],
  ['Journal of Bionic Engineering', 'Q1*', 4.4, 0, 3490],
  ['BMC Medical Imaging', 'Q1', 3.9, null, 3290],
  ['International Journal of Computer Assisted Radiology and Surgery', 'Q1*', 2.8, 0, 5090],
  ['BMC Medical Informatics and Decision Making', 'Q2', 5.5, null, 3090],
  ['Annals of Biomedical Engineering', 'Q2', 5.2, 0, 4690],
  ['Journal of Materials Science: Materials in Medicine', 'Q2', 4.7, null, 2690],
  ['BioMedical Engineering OnLine', 'Q2', 4.6, null, 2790],
  ['Biomedical Microdevices', 'Q2', 4.4, 0, 4490],
  ['Bioprocess and Biosystems Engineering', 'Q2', 4.3, 0, 4290],
  ['Biomedical Engineering Letters', 'Q2', 3.4, 0, 3990],
  ['Medical & Biological Engineering & Computing', 'Q2', 3.1, 0, 4090],
  ['Journal of Imaging Informatics in Medicine', 'Q2', 3.1, 0, 4890],
  ['Biomechanics and Modeling in Mechanobiology', 'Q2', 3.0, 0, 4390],
  ['Physical and Engineering Sciences in Medicine', 'Q2', 2.4, 0, 3790],
  ['Cell and Tissue Research', 'Q3', 3.1, 0, 5490],
  ['Biotechnology and Bioprocess Engineering', 'Q3', 2.8, 0, 3990],
  ['Biotechnology Letters', 'Q3', 2.5, 0, 3990],
  ['Cell and Tissue Banking', 'Q3', 2.3, 0, 4190],
  ['Cytotechnology', 'Q3', 2.2, 0, 4390],
  ['Journal of Medical and Biological Engineering', 'Q3', 2.1, 0, 3490],
  ['Journal of Medical Ultrasonics', 'Q3', 2.1, 0, 4390],
  ['Clinical and Translational Imaging', 'Q3', 1.4, 0, 4190],
  ['Journal of Artificial Organs', 'Q4', 1.2, 0, 3990],
];

const elsevierRows = [
  ['Medical Image Analysis', 'Q1', 14.0, 0, 4570],
  ['Biomaterials', 'Q1', 13.6, 0, 4800],
  ['Biosensors and Bioelectronics', 'Q1', 11.8, 0, 5440],
  ['Diagnostic and Interventional Imaging', 'Q1', 11.1, 0, 3520],
  ['Materials Today Bio', 'Q1', 11.0, null, 3290],
  ['Acta Biomaterialia', 'Q1', 10.4, 0, 4100],
  ['Artificial Intelligence in Medicine', 'Q1', 7.8, 0, 3440],
  ['Photoacoustics', 'Q1', 6.9, null, 4070],
  ['Biomaterials Advances', 'Q1', 6.7, 0, 3380],
  ['Seminars in Nuclear Medicine', 'Q1', 6.6, 0, 4910],
  ['Computer Methods and Programs in Biomedicine', 'Q1', 6.4, 0, 3320],
  ['Colloids and Surfaces B: Biointerfaces', 'Q1', 5.9, 0, 4120],
  ['Radiotherapy and Oncology', 'Q1', 5.8, 0, 4510],
  ['Computerized Medical Imaging and Graphics', 'Q1', 5.5, 0, 2920],
  ['Journal of Cardiovascular Computed Tomography', 'Q1', 5.4, 0, 3530],
  ['NeuroImage', 'Q1', 5.3, null, 3540],
  ['Journal of the American College of Radiology', 'Q1', 5.3, 0, 3810],
  ['Journal of Cardiovascular Magnetic Resonance', 'Q1', 5.0, null, 3000],
  ['International Journal of Medical Informatics', 'Q1', 5.0, 0, 3450],
  ['Academic Radiology', 'Q1', 4.7, 0, 3510],
  ['NeuroImage: Clinical', 'Q1', 4.2, null, 3490],
  ['European Journal of Radiology', 'Q1', 3.9, 0, 3310],
  ['Journal of Electromyography and Kinesiology', 'Q1', 2.7, 0, 3630],
  ['Journal of Biomedical Informatics', 'Q2', 5.9, 0, 3550],
  ['Biomedical Signal Processing and Control', 'Q2', 5.7, 0, 3470],
  ['Biocybernetics and Biomedical Engineering', 'Q2', 4.9, 0, 3180],
  ['Journal of the Mechanical Behavior of Biomedical Materials', 'Q2', 4.1, 0, 3800],
  ['Regenerative Therapy', 'Q2', 4.0, null, 1800],
  ['Current Opinion in Biomedical Engineering', 'Q2', 3.8, 0, 4040],
  ['Journal of Biomechanics', 'Q2', 2.9, 0, 3510],
  ['Ultrasound in Medicine & Biology', 'Q2', 2.8, 0, 3760],
  ['Gait & Posture', 'Q2', 2.7, 0, 3890],
  ['Physica Medica', 'Q2', 2.7, 0, 3260],
  ['Clinical Imaging', 'Q3', 2.2, 0, 3670],
  ['Magnetic Resonance Imaging', 'Q3', 2.1, 0, 3380],
  ['IRBM', 'Q3', 1.9, 0, 3430],
  ['Clinical Biomechanics', 'Q4', 1.4, 0, 2750],
];

const wileyRows = [
  ['Advanced Healthcare Materials', 'Q1', 11.0, 0, 4880],
  ['Bioengineering & Translational Medicine', 'Q1', 6.2, null, 3500],
  ['Ultrasound in Obstetrics & Gynecology', 'Q1', 5.3, 0, 5300],
  ['Journal of Magnetic Resonance Imaging', 'Q1', 4.3, 0, 3830],
  ['Human Brain Mapping', 'Q1', 4.0, null, 3870],
  ['Biometrical Journal', 'Q1', 2.1, 0, 3930],
  ['Statistics in Medicine', 'Q1', 2.1, 0, 5720],
  ['Biotechnology and Bioengineering', 'Q2', 3.9, 0, 5060],
  ['Journal of Biomedical Materials Research Part A', 'Q2', 3.8, 0, 4420],
  ['Biotechnology Journal', 'Q2', 3.7, 0, 5020],
  ['Medical Physics', 'Q2', 3.2, 0, 3690],
  ['Magnetic Resonance in Medicine', 'Q2', 3.2, 0, 3830],
  ['Advanced Therapeutics', 'Q2', 3.2, 0, 4430],
  ['International Journal of Imaging Systems and Technology', 'Q2', 3.0, 0, 3990],
  ['NMR in Biomedicine', 'Q2', 2.8, 0, 3820],
  ['Journal of Applied Clinical Medical Physics', 'Q2', 2.5, null, 1150],
  ['Journal of Neuroimaging', 'Q2', 2.5, 0, 3940],
  ['The International Journal of Medical Robotics and Computer Assisted Surgery', 'Q2', 2.4, 0, 4620],
  ['Artificial Organs', 'Q2', 2.2, 0, 4230],
  ['International Journal for Numerical Methods in Biomedical Engineering', 'Q2', 2.1, 0, 4250],
  ['Journal of Ultrasound in Medicine', 'Q2', 2.1, 0, 4510],
  ['Lasers in Surgery and Medicine', 'Q2', 2.1, 0, 4620],
  ['Pharmaceutical Statistics', 'Q2', 1.5, 0, 5120],
  ['Journal of Biomedical Materials Research Part B: Applied Biomaterials', 'Q3', 3.0, 0, 4420],
  ['Biotechnology Progress', 'Q3', 2.8, 0, 4590],
  ['Journal of Tissue Engineering and Regenerative Medicine', 'Q3', 2.0, null, 3150],
  ['Journal of Biophotonics', 'Q3', 2.0, 0, 3530],
  ['Journal of Microscopy', 'Q3', 1.9, 0, 5000],
  ['Bioelectromagnetics', 'Q3', 1.6, 0, 3620],
  ['Journal of Medical Imaging and Radiation Oncology', 'Q3', 1.5, 0, 4070],
  ['Journal of Clinical Ultrasound', 'Q3', 1.3, 0, 3520],
  ['Clinical Physiology and Functional Imaging', 'Q4', 1.7, 0, 4440],
  ['Annals of Noninvasive Electrocardiology', 'Q4', 0.9, null, 3130],
];

const ieeeRows = [
  ['IEEE Transactions on Pattern Analysis and Machine Intelligence', 'Q1', 20.4, 0, 2800],
  ['IEEE Reviews in Biomedical Engineering', 'Q1', 16.0, 0, 2800],
  ['IEEE Transactions on Image Processing', 'Q1', 15.3, 0, 2800],
  ['IEEE Transactions on Medical Imaging', 'Q1', 12.4, 0, 2800],
  ['IEEE Transactions on Affective Computing', 'Q1', 11.3, 0, 2800],
  ['IEEE Transactions on Robotics', 'Q1', 11.1, 0, 2800],
  ['IEEE Transactions on Neural Networks and Learning Systems', 'Q1', 9.7, 0, 2800],
  ['IEEE Journal of Biomedical and Health Informatics', 'Q1', 7.7, 0, 2800],
  ['IEEE Transactions on Instrumentation and Measurement', 'Q1', 7.0, 0, 2800],
  ['IEEE Transactions on Visualization and Computer Graphics', 'Q1', 6.8, 0, 2800],
  ['IEEE Transactions on Neural Systems and Rehabilitation Engineering', 'Q1', 6.6, null, 2160],
  ['IEEE Transactions on Signal Processing', 'Q1', 5.5, 0, 2800],
  ['IEEE Transactions on NanoBioscience', 'Q1', 4.2, 0, 2800],
  ['IEEE Transactions on Ultrasonics', 'Q1', 4.0, 0, 2800],
  ['IEEE Transactions on Emerging Topics in Computational Intelligence', 'Q2', 6.0, 0, 2800],
  ['IEEE Robotics and Automation Letters', 'Q2', 5.3, 0, 2800],
  ['IEEE Transactions on Biomedical Circuits and Systems', 'Q2', 5.1, 0, 2800],
  ['IEEE Transactions on Computational Imaging', 'Q2', 4.7, 0, 2800],
  ['IEEE Sensors Journal', 'Q2', 4.5, 0, 2800],
  ['IEEE Transactions on Biomedical Engineering', 'Q2', 4.4, 0, 2800],
  ['IEEE Transactions on Human-Machine Systems', 'Q2', 4.4, 0, 2800],
  ['IEEE Access', 'Q2', 4.2, null, 2160],
  ['IEEE Transactions on Computational Biology and Bioinformatics', 'Q2', 4.1, 0, 2800],
  ['IEEE Journal of Translational Engineering in Health and Medicine', 'Q2', 3.9, null, 2160],
  ['IEEE Signal Processing Letters', 'Q2', 3.6, 0, 2800],
  ['Journal of Microelectromechanical Systems', 'Q2', 3.5, 0, 2800],
  ['IEEE Transactions on Haptics', 'Q2', 3.1, 0, 2800],
  ['IEEE Photonics Journal', 'Q3', 2.6, null, 2160],
  ['IEEE Transactions on Nanotechnology', 'Q3', 2.5, 0, 2800],
  ['IEEE Transactions on Nuclear Science', 'Q3', 2.4, 0, 2800],
];

const iopRows = [
  ['Biofabrication', 'Q1', 8.2, 0, 4295],
  ['Machine Learning: Science and Technology', 'Q1', 4.2, null, 3350],
  ['Measurement Science and Technology', 'Q1', 3.7, 0, 3665],
  ['Bioinspiration & Biomimetics', 'Q1', 3.5, 0, 3665],
  ['Inverse Problems', 'Q1', 2.1, 0, 3665],
  ['Journal of Neural Engineering', 'Q2', 4.0, 0, 3665],
  ['Biomedical Materials', 'Q2', 3.9, 0, 3665],
  ['Smart Materials and Structures', 'Q2', 3.8, 0, 3665],
  ['Journal of Physics D: Applied Physics', 'Q2', 3.2, 0, 3665],
  ['Physics in Medicine & Biology', 'Q2', 3.1, 0, 3325],
  ['Journal of Breath Research', 'Q2', 2.7, 0, 3665],
  ['Methods and Applications in Fluorescence', 'Q2', 2.5, 0, 3665],
  ['Nanotechnology', 'Q3', 2.9, 0, 3665],
  ['Journal of Optics', 'Q3', 2.6, 0, 3665],
  ['Journal of Micromechanics and Microengineering', 'Q3', 2.5, 0, 3665],
  ['Physiological Measurement', 'Q3', 2.5, 0, 3325],
  ['Medical Engineering & Physics', 'Q3', 2.4, 0, 3670],
  ['Journal of Radiological Protection', 'Q3', 1.7, 0, 3665],
  ['Physical Biology', 'Q4', 1.5, 0, 3665],
];

const taylorFrancisRows = [
  ['International Journal of Nanomedicine', 'Q1', 8.7, null, 3999],
  ['Artificial Cells, Nanomedicine, and Biotechnology', 'Q1', 5.6, null, 3565],
  ['Expert Review of Molecular Diagnostics', 'Q1', 4.3, 0, 5400],
  ['Nanomedicine', 'Q2', 4.6, 0, 4320],
  ['Journal of Biomaterials Science, Polymer Edition', 'Q2', 3.5, 0, 4740],
  ['International Journal of Polymeric Materials and Polymeric Biomaterials', 'Q2', 3.2, 0, 4740],
  ['International Journal of Hyperthermia', 'Q2', 2.8, null, 3565],
  ['Journal of Biological Dynamics', 'Q2', 2.7, null, 2840],
  ['Biofouling', 'Q2', 2.5, 0, 5100],
  ['Computer Assisted Surgery', 'Q2', 2.3, null, 2370],
  ['Journal of Biopharmaceutical Statistics', 'Q2', 1.3, 0, 3940],
  ['Expert Review of Medical Devices', 'Q3', 2.8, 0, 5400],
  ['Journal of Biomolecular Structure and Dynamics', 'Q3', 2.5, 0, 4740],
  ['Computer Methods in Biomechanics and Biomedical Engineering', 'Q3', 1.9, 0, 3565],
  ['Informatics for Health and Social Care', 'Q3', 1.7, 0, 5100],
  ['Electromagnetic Biology and Medicine', 'Q3', 1.5, 0, 3940],
];

export const publishers = [
  { id: 'springer', name: 'Springer Nature', monogram: 'SN', description: 'Springer · Nature Portfolio · BMC', status: 'available' },
  { id: 'elsevier', name: 'Elsevier', monogram: 'E', description: '바이오·의공학 · 의료영상 · 의료정보학', status: 'available' },
  { id: 'ieee', name: 'IEEE', monogram: 'IE', description: '의공학 · 인공지능 · 신호·영상처리 · 로보틱스', status: 'available' },
  { id: 'wiley', name: 'Wiley', monogram: 'W', description: '생체재료 · 의료영상 · 의학물리 · 바이오통계', status: 'available' },
  { id: 'taylor-francis', name: 'Taylor & Francis', monogram: 'TF', description: '나노의학 · 생체재료 · 의료기기 · 계산생체역학', status: 'available' },
  { id: 'iop', name: 'IOP', monogram: 'IO', description: '바이오패브리케이션 · 의학물리 · 계측 · 응용물리', status: 'available', collectionNote: 'Medical Engineering & Physics는 실제 출판사인 Elsevier 컬렉션으로 분류했습니다.' },
  { id: 'jmir', name: 'JMIR Publications', monogram: 'JM', description: '의료 AI · 디지털 헬스 · 의료정보학', status: 'available' },
  { id: 'plos', name: 'PLOS', monogram: 'PL', description: '디지털 헬스 · 계산생물학 · 의학', status: 'available' },
];

function toJournals(rows, publisherId) {
  return rows.map(([name, quartile, impactFactor, nonOaApc, oaApc], index) => ({
  id: `${publisherId}-${index + 1}`, no: index + 1, publisherId,
  name, quartile, impactFactor, nonOaApc, oaApc,
  }));
}

export const journalCatalog = [...toJournals(springerRows, 'springer'), ...toJournals(elsevierRows, 'elsevier'), ...toJournals(wileyRows, 'wiley'), ...toJournals(ieeeRows, 'ieee'), ...toJournals(iopRows, 'iop'), ...toJournals(taylorFrancisRows, 'taylor-francis')];

// Keep original IDs stable for bookmarks and editorial research.
journalCatalog.find(j => j.id === 'iop-17').publisherId = 'elsevier';
for (const item of researchAdditions) journalCatalog.push({ ...item, no: 0 });
for (const metric of researchedMetrics.journals) {
  const journal = journalCatalog.find(j => j.id === metric.journalId && j.name === metric.name);
  if (journal) Object.assign(journal, { impactFactor: metric.impactFactor, quartile: metric.quartile,
    oaApc: metric.oaApc, nonOaApc: metric.nonOaApc, metricsPending: !Number.isFinite(metric.impactFactor), researchMetrics: metric });
}
export const journals = journalCatalog.filter(j => Number.isFinite(j.impactFactor));
for (const publisher of publishers) journals.filter(j => j.publisherId === publisher.id).forEach((j, i) => { j.no = i + 1; });

export const quartileOf = journal => journal.quartile.replace('*', '');
export const money = value => value === undefined ? '미확인' : value === null ? '해당 없음' : `$${value.toLocaleString('en-US')}`;

export function filterJournals(items, { publisherId, query = '', quartile = 'all', model = 'all', sort = 'original', savedOnly = false, saved = [] }) {
  const needle = query.trim().toLowerCase();
  const result = items.filter(j => (publisherId === 'all' || j.publisherId === publisherId)
    && j.name.toLowerCase().includes(needle)
    && (quartile === 'all' || quartileOf(j) === quartile)
    && (model === 'all' || (model === 'non-oa' ? j.nonOaApc === 0 : j.nonOaApc === null))
    && (!savedOnly || saved.includes(j.id)));
  const comparators = {
    original: () => 0,
    'quartile-asc': (a, b) => quartileOf(a).localeCompare(quartileOf(b)) || b.impactFactor - a.impactFactor || a.name.localeCompare(b.name),
    'quartile-desc': (a, b) => quartileOf(b).localeCompare(quartileOf(a)) || b.impactFactor - a.impactFactor || a.name.localeCompare(b.name),
    'if-desc': (a, b) => b.impactFactor - a.impactFactor || a.no - b.no,
    'if-asc': (a, b) => a.impactFactor - b.impactFactor || a.no - b.no,
    'apc-asc': (a, b) => a.oaApc - b.oaApc || a.no - b.no,
    'apc-desc': (a, b) => b.oaApc - a.oaApc || a.no - b.no,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  const compare = comparators[sort] || comparators.original;
  return result.sort((a, b) => {
    const missing = j => sort.startsWith('quartile') ? quartileOf(j) === '미확인' : sort.startsWith('if-') ? !Number.isFinite(j.impactFactor) : sort.startsWith('apc-') ? !Number.isFinite(j.oaApc) : false;
    if (missing(a) !== missing(b)) return missing(a) ? 1 : -1;
    return compare(a, b);
  });
}
