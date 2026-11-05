import { researchDetails } from './research-additions.js';
import { wileyDetails } from './wiley-details.js';
import { ieeeDetails } from './ieee-details.js';
import { iopDetails } from './iop-details.js';
import { taylorFrancisDetails } from './taylor-francis-details.js';

// 공식 출판사·학회 소개를 바탕으로 직접 요약. 원문 전체 범위가 아닌 대표 주제입니다.
// 확인일: 2026-11-03. 지표 및 APC는 사용자 제공 표와 별개로 관리합니다.
const springer = (code, topics) => ({
  homepage: `https://link.springer.com/journal/${code}`,
  scopeSource: `https://link.springer.com/journal/${code}/aims-and-scope`,
  topics,
});
const nature = (code, topics) => ({
  homepage: `https://www.nature.com/${code}/`,
  scopeSource: `https://www.nature.com/${code}/aims`,
  topics,
});
const elsevier = (slug, issn, topics) => ({
  // 출판사 공식 소개 페이지의 ScienceDirect 링크를 그대로 사용합니다.
  homepage: `https://www.sciencedirect.com/science/journal/${issn.replaceAll('-', '')}`,
  scopeSource: `https://shop.elsevier.com/journals/${slug}/${issn}`,
  topics,
});

export const journalDetails = {
  ...researchDetails,
  ...wileyDetails,
  ...ieeeDetails,
  ...iopDetails,
  ...taylorFrancisDetails,
  'Nature Biomedical Engineering': nature('natbiomedeng', [
    '질병의 진단·치료·모니터링을 위한 의료기기와 바이오센서',
    '생체재료·약물 전달·조직공학·재생의학',
    '의료영상·의료 AI·계산의학과 임상 중개 연구',
  ]),
  'npj Digital Medicine': nature('npjdigitalmed', [
    '웨어러블·모바일 기술과 디지털 바이오마커의 임상 활용',
    '의료 AI·머신러닝과 임상정보학',
    '디지털 도구의 임상 검증·원격의료·윤리 및 거버넌스',
  ]),
  'Journal of Nanobiotechnology': springer(12951, [
    '생물·의학 응용을 위한 나노소재·나노입자·나노센서',
    '나노의학 기반 진단·영상·치료·약물 개발',
    '마이크로·나노유체 및 MEMS/NEMS·나노독성학',
  ]),
  'Journal of Medical Systems': springer(10916, [
    '임상정보시스템·전자건강기록·임상 의사결정 지원',
    '모바일 헬스·소비자 건강 기술·의료 업무흐름과 운영',
    '의료영상·신호처리 및 임상 AI의 평가·안전·정책',
  ]),
  'Bio-Design and Manufacturing': springer(42242, [
    '3D 바이오프린팅·적층 제조·바이오잉크 설계',
    '조직·장기공학·스캐폴드·오가노이드 제작',
    '장기칩·의료 및 진단 기기·생체모방 제품 설계',
  ]),
  'European Journal of Nuclear Medicine and Molecular Imaging': springer(259, [
    '질병의 기능·대사·분자 수준 영상 및 고급 영상분석',
    '방사성의약품 치료·영상유도 치료·분자영상 탐침',
    '핵의학 관련 물리·선량평가·방사선생물학·방사화학',
  ]),
  'npj Regenerative Medicine': nature('npjregenmed', [
    '손상된 조직·장기의 복구·대체·재생',
    '줄기세포 생물학과 조직 재생을 위한 치료',
    '조직 복구·재생 및 장기이식을 위한 응용 연구',
  ]),
  'BioChip Journal': springer(13206, [
    'DNA·단백질·세포칩 및 랩온어칩·BioMEMS',
    '바이오센서·미세유체·마이크로 및 나노 기술',
    '고속 스크리닝·유전체·단백체 분석 및 의료진단',
  ]),
  'Journal of Biological Engineering': springer(13036, [
    '합성생물학·세포 설계·생체분자 및 조직공학',
    '바이오 생산·대사공학·바이오센서',
    '생태·환경공학과 생물공학 교육·바이오디자인',
  ]),
  'Bioresources and Bioprocessing': springer(40643, [
    '지속 가능한 생물자원 개발·가공·활용',
    '생촉매·생물전환·생합성·대사 및 바이오공정',
    '바이오에너지·바이오리파이너리·분리정제·환경생명공학',
  ]),
  'Journal of NeuroEngineering and Rehabilitation': springer(12984, [
    '신경과학과 의공학을 연결하는 신경공학',
    '재활의학·신체 기능 회복·인간 움직임 증강',
    '새로운 재활 방법 및 기술의 임상적 의미와 적용',
  ]),
  'European Radiology': springer(330, [
    '임상 영상 기반 질병 진단·병기 평가·의사결정',
    '의료영상 기술 혁신·계산과학·AI·라디오믹스',
    '근거 중심 영상 가이드라인과 환자 진료에 유의미한 연구',
  ]),
  'Insights into Imaging': springer(13244, [
    '임상 영상 실무·교육·비판적 고찰 및 권고안',
    '영상 AI·라디오믹스·디지털 헬스의 임상 적용',
    '영상의학 업무흐름·방사선 방호·전문직 및 관리 이슈',
  ]),
  'La radiologia medica': springer(11547, [
    '진단영상 및 중재영상 기법의 기초·임상 연구',
    '방사선치료·핵의학·방사선생물학의 임상적 의미',
    '의료영상 관련 보건물리·인공지능',
  ]),
  'European Radiology Experimental': springer(41747, [
    '영상기법의 물리적 기반·팬텀 및 전임상 실험',
    '새로운 CT·MRI·다중모달 영상 및 AI 영상재구성',
    '영상 바이오마커·분자영상·새로운 영상유도 중재',
  ]),
  'Japanese Journal of Radiology': springer(11604, [
    '진단영상·중재영상·방사선종양학·핵의학',
    '영상의학 관련 인공지능·기술 및 산업적 혁신',
    '영상의학의 임상 발전과 관련 사회·경제적 이슈',
  ]),
  'BMC Bioinformatics': springer(12859, [
    '생물학 데이터 분석을 위한 알고리즘·소프트웨어·통계',
    '유전체·전사체·단백체·서열 및 구조 분석',
    '바이오인포매틱스의 AI·머신러닝·네트워크·시스템생물학',
  ]),
  'Journal of Bionic Engineering': springer(42235, [
    '동물 운동에서 영감을 얻은 로봇·운동역학·제어',
    '천연 소재의 구조·기능을 모방하는 생체모방 재료',
    '의료용 재료·인공장기·재활기기 및 생체영감 계산법',
  ]),
  'BMC Medical Imaging': springer(12880, [
    '질병 진단·관리를 위한 영상기법의 개발과 평가',
    '의료영상 처리 도구 및 임상 활용',
    '신경·흉부·유방·복부·근골격 등 장기별 영상과 분자영상',
  ]),
  'International Journal of Computer Assisted Radiology and Surgery': springer(11548, [
    '의료영상 처리·시각화·컴퓨터 보조 진단',
    '영상유도 치료·수술 내비게이션·수술로봇',
    '수술 시뮬레이션·디지털 수술실·임상 업무흐름',
  ]),
  'BMC Medical Informatics and Decision Making': springer(12911, [
    '의료정보기술의 설계·구현·활용·평가',
    '임상 의사결정과 지식 지원 시스템',
    'eHealth·원격의료·모바일 헬스·기계학습 및 표준',
  ]),
  'Annals of Biomedical Engineering': springer(10439, [
    '생물공학·의공학 전반의 학제 간 연구',
    '생물·의료 문제 해결을 위한 통합적 공학 접근',
    '생물학 실험과 정량분석·이론·수학 모델의 연결',
  ]),
  'Journal of Materials Science: Materials in Medicine': springer(10856, [
    '의료·치과용 생체재료·임플란트·보철·기기',
    '생체재료 합성·특성분석·생체적합성·나노의학',
    '조직공학 구조체·세포 기질·재생의학 및 모델링',
  ]),
  'BioMedical Engineering OnLine': springer(12938, [
    '의료기기·계측·바이오센서·생체신호 및 영상처리',
    '생체역학·신경공학·재활공학·의료로봇',
    '생체재료·조직공학·약물전달 및 계산생물학',
  ]),
  'Biomedical Microdevices': springer(10544, [
    '진단·치료용 BioMEMS 및 의료 나노기술',
    '미세가공 칩·바이오센서·소형 분석 및 DNA 식별 시스템',
    '신경 자극·기록·세포 및 조직 연구·제어형 약물전달',
  ]),
  'Bioprocess and Biosystems Engineering': springer(449, [
    '바이오공정·생물시스템의 통합 설계와 최적화',
    '생촉매·대사공학·응용 합성생물학·세포공학',
    '바이오리액터·상하류 공정·모델링·계측·AI 기반 제어',
  ]),
  'Biomedical Engineering Letters': springer(13534, [
    '의공학 분야의 새로운 실험과 기술 개발',
    '새로운 의공학 기법의 이론적 분석',
    '개발 기술의 평가·검증 및 임상 적용',
  ]),
  'Medical & Biological Engineering & Computing': springer(11517, [
    '생체신호·의료영상 처리·시각화 및 AI',
    '생체역학·재료·의료기기·신경 및 재활공학',
    '의료 모델링·생물정보학·의사결정 지원·원격의료',
  ]),
  'Journal of Imaging Informatics in Medicine': springer(10278, [
    'PACS·영상정보시스템·DICOM/IHE·영상 기반 전자의무기록',
    '의료영상 AI·데이터 과학·정량영상·컴퓨터 보조 진단',
    '영상 업무흐름·품질·보안·AI 안전성 및 데이터 관리',
  ]),
  'Biomechanics and Modeling in Mechanobiology': springer(10237, [
    '분자·세포·조직·장기 수준의 생체역학과 기계생물학',
    '기계 자극 감지·성장·리모델링·적응·복구 기전',
    '고체·유체·열역학 기반 실험·이론·계산 모델',
  ]),
  'Physical and Engineering Sciences in Medicine': springer(13246, [
    '진단영상·핵의학·방사선치료의 의학물리와 선량 측정',
    '의료영상·생체신호 처리 및 특징 추출',
    '임상 의공학·의료 나노기술·전문직 실무',
  ]),
  'Cell and Tissue Research': springer(441, [
    '분자·세포·조직의 구조와 기능의 관계',
    '신경생물학·신경내분비학·생식·골격 및 면역계',
    '발생·줄기세포·근육 생물학 및 유전자 산물의 통합 작용',
  ]),
  'Biotechnology and Bioprocess Engineering': springer(12257, [
    '응용 분자·세포생물학·생촉매·대사 및 시스템생물학',
    '분리정제·바이오공정·세포배양·환경 및 식품생명공학',
    '바이오의약·생체재료·나노생명공학·센서·바이오전자',
  ]),
  'Biotechnology Letters': springer(10529, [
    '미생물·동식물 세포와 생촉매의 생명공학 응용',
    '분자생물학·유전학·대사공학·합성생물학',
    '세포·유전자 치료·재생의학과 디지털 바이오공정·스케일업',
  ]),
  'Cell and Tissue Banking': springer(10561, [
    '세포·조직의 채취·처리·보존·멸균·보관·공급',
    '보관 세포·조직의 품질 보증과 임상 이식 응용',
    '조직은행의 표준 실무·윤리·의료법적 문제',
  ]),
  'Cytotechnology': springer(10616, [
    '세포주 유래·유전적 변형·특성분석 및 배양 최적화',
    '세포배양 시스템·바이오리액터·스케일업·산업 생산',
    '줄기세포·조직공학·유전자치료·세포 기반 생물검정',
  ]),
  'Journal of Medical and Biological Engineering': springer(40846, [
    '의료·생물공학과 의공학 기술 개발',
    '생체신호·의료영상·바이오인포매틱스',
    '조직공학 및 의공학 관련 융합 기술',
  ]),
  'Journal of Medical Ultrasonics': springer(10396, [
    '의학·생물학 분야의 초음파 연구 전반',
    '초음파의 의학적 발전과 새로운 임상 응용',
    '의료 초음파의 공학적 원리와 기술 개발',
  ]),
  'Clinical and Translational Imaging': springer(40336, [
    '분자영상의 임상 및 중개 연구',
    '진단·치료용 승인·실험 단계 방사성의약품',
    '임상 전환을 위한 물리·선량평가·방사선생물학·방사약학',
  ]),
  'Journal of Artificial Organs': springer(10047, [
    '인공장기의 기초 연구부터 임상 적용까지',
    '혈액 정화·심혈관 중재·인공 대사장기',
    '생체재료 및 인공장기 관련 기술·산업 혁신',
  ]),

  'Medical Image Analysis': elsevier('medical-image-analysis', '1361-8415', [
    '의료·생물영상의 처리·분석·컴퓨터 비전',
    '다양한 영상 모달리티와 분자·세포부터 조직·장기까지의 분석',
    '의료영상 문제에 적용하는 가상현실·로봇 기술',
  ]),
  'Biomaterials': elsevier('biomaterials', '0142-9612', [
    '진단·치료용 생체재료의 설계와 임상 활용',
    '고분자·약물 및 유전자 전달체·면역 및 숙주 반응',
    '재생의학과 새로운 조영·감지 재료 기반 진단',
  ]),
  'Biosensors and Bioelectronics': elsevier('biosensors-and-bioelectronics', '0956-5663', [
    '바이오센서의 설계·개발·응용과 신호 변환 기술',
    'DNA칩·전자코·랩온어칩·소형 분석 시스템',
    '생물학적 재료·설계와 전자기술을 결합한 진단 기기',
  ]),
  'Diagnostic and Interventional Imaging': {
    homepage: 'https://www.em-consulte.com/revue/DII/derniernumero/diagnostic-and-interventional-imaging',
    scopeSource: 'https://www.em-consulte.com/revue/DII/presentation/diagnostic-and-interventional-imaging',
    topics: ['전신 장기·질환별 진단영상과 중재영상', '영상 기반 임상 의사결정 및 영상의학 기법', '조영제·의료물리·컴퓨터 기술·영상의학 실무와 정책'],
  },
  'Materials Today Bio': {
    homepage: 'https://www.sciencedirect.com/journal/materials-today-bio',
    scopeSource: 'https://www.elsevier.com/subject/materials-today/submit',
    topics: ['생물학과 재료과학이 만나는 학제 간 연구', '생물학적 응용을 위한 화학·물리·공학의 융합', '생물학·재료·의학의 접점에 있는 소재와 응용 연구'],
  },
  'Acta Biomaterialia': elsevier('acta-biomaterialia', '1742-7061', [
    '다양한 길이 척도에서 생체재료의 구조–기능 관계',
    '생체재료 표면·단백질 흡착·세포 상호작용·생체적합성',
    '재료의 역학적 특성·모델링·가공·기능 평가',
  ]),
  'Artificial Intelligence in Medicine': elsevier('artificial-intelligence-in-medicine', '0933-3657', [
    '의학·건강관리 분야 인공지능의 이론과 방법론',
    '지식·데이터 기반 의료 의사결정 지원',
    '실제 의료 문제에 대한 AI 적용 및 임상적 유용성 평가',
  ]),
  'Photoacoustics': {
    homepage: 'https://www.sciencedirect.com/journal/photoacoustics',
    scopeSource: 'https://www.elsevier.com/subject/physics-and-astronomy/journals/open-access-for-physics-journals',
    topics: ['광음향·광초음파·열음향 현상 및 연구 방법', '광학·전자기 여기로 발생하는 음향·열 현상의 활용', '물질·생체조직·생명체의 시각화와 특성 평가'],
  },
  'Biomaterials Advances': elsevier('biomaterials-advances', '2772-9508', [
    '의료용 생체모방·스마트·자기조립·자가치유 소재',
    '의료용 세라믹·금속·고분자·복합재료',
    '생체 내 감지·영상·약물 및 백신 전달 재료',
  ]),
  'Seminars in Nuclear Medicine': elsevier('seminars-in-nuclear-medicine', '0001-2998', [
    '핵의학 전반의 주제별 전문가 리뷰',
    'PET·SPECT 및 분자영상 연구',
    '핵의학과 관련 영상 분야의 최신 지견과 해설',
  ]),
  'Computer Methods and Programs in Biomedicine': elsevier('computer-methods-and-programs-in-biomedicine', '0169-2607', [
    '생의학 연구·의료 실무에 적용하는 계산 방법론',
    '생의학 정보처리·응용 소프트웨어와 시스템 개발',
    '생의학 소프트웨어의 형식적 방법·표준·공유 및 개선',
  ]),
  'Colloids and Surfaces B: Biointerfaces': elsevier('colloids-and-surfaces-b-biointerfaces', '0927-7765', [
    '생물학적 시스템의 콜로이드·계면 현상',
    '생체 계면의 물리화학적 기전과 응용 연구',
    '의료·제약·생명공학·식품·화장품 분야의 생체계면',
  ]),
  'Radiotherapy and Oncology': elsevier('radiotherapy-and-oncology', '0167-8140', [
    '임상 방사선치료·근접치료·입자치료·병합치료',
    '방사선생물학·중개 연구·의학물리·선량평가',
    '치료계획·영상·데이터 과학·AI 및 종양학 임상시험',
  ]),
  'Computerized Medical Imaging and Graphics': elsevier('computerized-medical-imaging-and-graphics', '0895-6111', [
    '의료영상의 계산·시각화·컴퓨터 비전 알고리즘',
    '딥러닝·생성형 AI 기반 영상 획득·재구성·분석',
    '정밀진단·영상유도 중재·의료로봇·VR/AR와 임상 전환',
  ]),
  'Journal of Cardiovascular Computed Tomography': elsevier('journal-of-cardiovascular-computed-tomography', '1934-5925', [
    '심혈관 CT의 임상 및 기술적 연구',
    '심혈관 CT 영상의 기초 연구와 임상적 의미',
    '심혈관 CT 활용 지침·실무 기법·새로운 발전',
  ]),
  'NeuroImage': elsevier('neuroimage', '1053-8119', [
    '신경영상을 통한 뇌 기능·구조·조직화의 이해',
    '뇌영상 획득·분석 방법과 다중 수준 모델링',
    '인간 뇌의 시스템 수준 이해를 위한 모델·자료·방법론',
  ]),
  'Journal of the American College of Radiology': elsevier('journal-of-the-american-college-of-radiology', '1546-1440', [
    '영상의학 임상 실무·진료 운영·환자 진료 개선',
    '보건의료 정책과 의료체계 내 영상의학의 역할',
    '영상의학 데이터 과학·교육 및 전문직 실무',
  ]),
  'Journal of Cardiovascular Magnetic Resonance': {
    homepage: 'https://www.journalofcmr.com/',
    scopeSource: 'https://www.journalofcmr.com/content/authorinfo',
    topics: ['심혈관 자기공명(CMR)의 기초·중개·임상 연구', '심혈관 MRI 방법의 설계·개발·제작·평가', '심혈관계에 적용하는 MR 기술과 임상 활용'],
  },
  'International Journal of Medical Informatics': elsevier('international-journal-of-medical-informatics', '1386-5056', [
    '의료 ICT의 설계·통합·배포·구현·평가',
    '실제 진료에서 의료정보학의 임상·인구집단 영향',
    '국제 비교·건강 형평성·지속 가능성·장기 거버넌스',
  ]),
  'Academic Radiology': elsevier('academic-radiology', '1076-6332', [
    '영상의학 교육과 진단·중재영상의 새로운 연구',
    '진료 품질 개선·인구집단 건강·의료서비스 연구',
    '학술 영상의학 운영·의료체계 개선·리더십',
  ]),
  'NeuroImage: Clinical': {
    homepage: 'https://www.journals.elsevier.com/neuroimage-clinical',
    scopeSource: 'https://shop.elsevier.com/journals/neuroimage/1053-8119',
    topics: ['신경계 질환의 영상 기반 비정상 구조–기능 관계', '신경계 병리와 비정상 발달의 신경영상 연구', '임상 신경영상에서의 바이오마커 활용'],
  },
  'European Journal of Radiology': elsevier('european-journal-of-radiology', '0720-048X', [
    '의료영상의 새로운 발전과 임상 영상 연구',
    '효율적이고 적절한 근거 중심 영상검사 실무',
    '영상 전문의·전공의를 위한 최신 영상 지견과 리뷰',
  ]),
  'Journal of Electromyography and Kinesiology': elsevier('journal-of-electromyography-and-kinesiology', '1050-6411', [
    '근전도·운동단위·운동 제어·근육 피로와 신경·근육 특성',
    '관절 생체역학·전기자극·인간 움직임 분석',
    '재활·스포츠·인체공학 및 근전도 신호처리',
  ]),
  'Journal of Biomedical Informatics': elsevier('journal-of-biomedical-informatics', '1532-0464', [
    '생의학 정보학의 일반화 가능한 새로운 방법론과 기술',
    '실제 생의학·임상 문제 해결을 위한 정보학 접근',
    '새 방법의 비교 평가와 일반화 가능한 개념적 기여',
  ]),
  'Biomedical Signal Processing and Control': elsevier('biomedical-signal-processing-and-control', '1746-8094', [
    '생체신호·의료영상의 획득·처리·분석·모델링',
    '생리·병리·행동 정보 추출과 임상 검증',
    '다중모달 데이터·실시간 처리·해석 가능성·제어 응용',
  ]),
  'Biocybernetics and Biomedical Engineering': elsevier('biocybernetics-and-biomedical-engineering', '0208-5216', [
    '생리 시스템의 모델링·의료진단·모니터링·치료 기술',
    '생체계측·센서·의료영상·뇌–컴퓨터 인터페이스',
    '조직공학·인공장기·생체재료·생체역학·재활',
  ]),
  'Journal of the Mechanical Behavior of Biomedical Materials': elsevier('journal-of-the-mechanical-behavior-of-biomedical-materials', '1751-6161', [
    '생체조직·세포·분자 및 생체재료의 역학적 거동',
    '외력에 의한 변형·손상·파괴의 실험과 이론',
    '의료·치과 기기용 재료의 설계와 실용적 성능',
  ]),
  'Regenerative Therapy': {
    homepage: 'https://www.sciencedirect.com/journal/regenerative-therapy',
    scopeSource: 'https://en.jsrm.jp/about-us/journals/',
    topics: ['줄기세포 생물학·세포공학·조직공학·재생의학', '재생치료의 기초 연구와 임상 중개', '세포 기반 제품의 산업 개발·규제·윤리·법·사회적 관점'],
  },
  'Current Opinion in Biomedical Engineering': elsevier('current-opinion-in-biomedical-engineering', '2468-4511', [
    '의공학 최신 발전에 대한 전문가 중심 리뷰와 견해',
    '생체재료·생체역학·기계생물학·의료영상',
    '분자·세포공학 및 의공학의 미래 방향',
  ]),
  'Journal of Biomechanics': elsevier('journal-of-biomechanics', '0021-9290', [
    '역학 원리로 생물학적 문제를 탐구하는 연구',
    '정형외과 생체역학·뼈·관절·임플란트의 역학',
    '조직공학·재생의학에서 생체역학적 요인의 역할',
  ]),
  'Ultrasound in Medicine & Biology': elsevier('ultrasound-in-medicine-and-biology', '0301-5629', [
    '초음파의 진단·중재·치료 응용과 임상 기법',
    '의료·생물 초음파의 물리·공학·기술',
    '초음파와 생물학적 시스템의 상호작용·생물학적 영향',
  ]),
  'Gait & Posture': elsevier('gait-and-posture', '0966-6362', [
    '인간 움직임·보행·자세·균형의 기초 및 임상 연구',
    '정상·병적 보행 측정과 보행·자세 이상 치료',
    '관절·근육 역학 모델 및 신경·근골격계 기능',
  ]),
  'Physica Medica': elsevier('physica-medica', '1120-1797', [
    '방사선치료·진단 및 치료 핵의학의 의학물리',
    '진단·중재영상·MRI·비전리 영상기법',
    '방사선 방호·방사선생물학·의학물리 AI·교육',
  ]),
  'Clinical Imaging': elsevier('clinical-imaging', '0899-7071', [
    '환자 진료를 개선하는 임상 영상의학 연구',
    '전신 장기별 영상·중재영상·분자영상·핵의학',
    '임상 AI·영상물리·정보학·실무·정책·교육',
  ]),
  'Magnetic Resonance Imaging': elsevier('magnetic-resonance-imaging', '0730-725X', [
    '자기공명영상의 물리·생명과학·임상 연구',
    'MRI 관련 기초 연구와 기술 혁신',
    'MRI의 개발·활용을 잇는 다학제 응용 연구',
  ]),
  'IRBM': {
    homepage: 'https://www.sciencedirect.com/journal/irbm',
    scopeSource: 'https://www.em-consulte.com/revue/IRBM/presentation/irbm',
    topics: ['생리·생체신호 및 의료영상 처리·센서', '생체역학·재료·의학물리·생물물리', '의료정보기술·장애 연구·계산생리학과 의공학 기술'],
  },
  'Clinical Biomechanics': elsevier('clinical-biomechanics', '0268-0033', [
    '의료·임상 응용을 중심으로 한 생체역학',
    '세포·조직·장기·신체 시스템의 손상·질병 기전',
    '진단·예후·치료법·기술 평가를 잇는 실험실–임상 연구',
  ]),
};

export const topicsCheckedAt = '2026-11-03';
