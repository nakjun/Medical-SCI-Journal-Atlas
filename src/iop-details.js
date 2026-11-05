// 공식 Publishing Support의 Scope를 바탕으로 정리한 대표 주제. 확인: 2026-11-03.
const iop = (issn, slug, aboutSlug, topics) => ({
  homepage: `https://iopscience.iop.org/journal/${issn}`,
  scopeSource: `https://publishingsupport.iopscience.iop.org/journals/${slug}/about-${aboutSlug}/`,
  topics,
});

export const iopDetails = {
  'Biofabrication': iop('1758-5090', 'biofabrication', 'biofabrication', [
    '세포·조직·장기의 프린팅·패터닝·조립 기술',
    '바이오칩·장기칩 및 생체재료 통합 의료기기',
    '3차원 조직 지지체 제작과 생체제조 공정·구조 모델링',
  ]),
  'Machine Learning: Science and Technology': iop('2632-2153', 'machine-learning-science-and-technology', 'machine-learning-science-technology', [
    '과학 분야의 문제 해결을 위한 기계학습 응용',
    '물리적 통찰·과학적 문제에서 출발한 학습 이론과 방법',
    '물질·분자 설계, 생물·의료영상 및 과학 시뮬레이션',
  ]),
  'Measurement Science and Technology': iop('0957-0233', 'measurement-science-and-technology', 'measurement-science-technology', [
    '새로운 측정 기법과 계측 장비·센서 기술',
    '측정 불확도·정밀도·정확도와 성능 검증',
    '물리·공학·환경·생명과학 분야의 측정 이론과 응용',
  ]),
  'Bioinspiration & Biomimetics': iop('1748-3190', 'bioinspiration-biomimetics', 'bioinspiration-biomimetics', [
    '생물 시스템의 원리·기능을 활용한 생체모방 설계',
    '이동·항법·감각·협동 행동 및 자기조직화',
    '생체역학·새로운 재료와 생물 영감 장치·시스템',
  ]),
  'Inverse Problems': iop('0266-5611', 'inverse-problems', 'inverse-problems', [
    '역문제의 수학적 이론과 실험적 연구',
    '역문제 해결을 위한 수치 기법과 실용적 방법',
    '영상·신호처리·광학·음향·생물학·지구물리 응용',
  ]),
  'Journal of Neural Engineering': iop('1741-2552', 'journal-of-neural-engineering', 'journal-neural-engineering', [
    '뇌·기계 인터페이스, 신경 인터페이스와 신경보철',
    '신경조절·신경재활·생체전자 의약 기술',
    '신경영상·신경 신호처리와 계산·이론 신경과학',
  ]),
  'Biomedical Materials': iop('1748-605X', 'biomedical-materials', 'biomedical-materials', [
    '의료용 생체재료의 합성·특성·생체 내외 성능 평가',
    '조직공학·재생의학과 재료·세포 상호작용',
    '3차원 바이오프린팅·바이오잉크·미세유체 시스템',
  ]),
  'Smart Materials and Structures': iop('0964-1726', 'smart-materials-and-structures', 'smart-materials-structures', [
    '자극에 반응하는 스마트 재료와 적응형 구조·제어',
    '센싱·구동·에너지 응용 및 메타물질',
    '소프트 로봇·스마트 생체재료·인공근육 시스템',
  ]),
  'Journal of Physics D: Applied Physics': iop('0022-3727', 'journal-of-physics-d-applied-physics', 'journal-physics-d-applied-physics', [
    '응용자기학·반도체·포토닉스 및 저온 플라스마',
    '첨단·양자·나노 재료와 소자·표면·계면 물리',
    '에너지 재료·소자와 응용 생물물리 기술',
  ]),
  'Physics in Medicine & Biology': iop('0031-9155', 'physics-in-medicine-biology', 'physics-medicine-biology', [
    '방사선·비전리 방사선을 활용하는 치료 물리',
    '의료영상 획득·재구성·분석과 영상 유도 중재',
    '방사선량 측정·방사선 방호와 생물·의학 응용 물리',
  ]),
  'Journal of Breath Research': iop('1752-7163', 'journal-of-breath-research', 'journal-breath-research', [
    '호기 속 휘발성 유기화합물·에어로졸·바이오마커',
    '호흡 분석을 이용한 질환 진단·건강·노출 평가',
    '호기 시료 채취·분석 표준화와 데이터 해석·검증',
  ]),
  'Methods and Applications in Fluorescence': iop('2050-6120', 'methods-and-applications-in-fluorescence', 'methods-applications-fluorescence', [
    '형광 분광학·수명·에너지 전달 및 단분자 측정',
    '형광·초해상도 현미경과 정량 영상 기술',
    '형광 표지·탐침·센서 및 발광 나노재료',
  ]),
  'Nanotechnology': iop('0957-4484', 'nanotechnology', 'nanotechnology', [
    '나노 규모의 기초 현상과 과학·기술 응용',
    '나노미터 정밀도의 구조·재료·소자 제어와 변형',
    '나노 구조·소자의 합성과 마이크로·거시 시스템 통합',
  ]),
  'Journal of Optics': iop('2040-8986', 'journal-of-optics', 'journal-of-optics', [
    '순수·응용 광학의 실험 및 이론 연구',
    '나노·양자·생체 포토닉스와 빛·물질 상호작용',
    '비선형·초고속 광학, 광통신과 집적 광학',
  ]),
  'Journal of Micromechanics and Microengineering': iop('0960-1317', 'journal-of-micromechanics-and-microengineering', 'journal-micromechanics-microengineering', [
    '마이크로·나노 기계·전기기계 시스템과 MEMS/NEMS',
    '미세 시스템의 설계·제작·실험과 계산·시뮬레이션',
    '바이오 MEMS·바이오센서·장기칩과 의료용 소자',
  ]),
  'Physiological Measurement': iop('0967-3334', 'physiological-measurement', 'physiological-measurement', [
    '생리 기능의 감지·평가·시각화·모델링과 예측',
    '심전도·뇌파 등 생리 신호의 처리와 인공지능',
    '새로운 생리 측정 방법의 임상 응용과 대규모 검증',
  ]),
  'Medical Engineering & Physics': {
    homepage: 'https://www.sciencedirect.com/science/journal/13504533',
    scopeSource: 'https://shop.elsevier.com/journals/medical-engineering-and-physics/1350-4533',
    publisherNote: '실제 발행사: Elsevier · IPEM 공식 저널. 제공 목록에 따라 IOP 컬렉션에 포함했습니다.',
    topics: [
      '물리·공학 원리를 활용한 의료기기와 의료 기술 개발',
      '생체역학·생체재료·기계생물학 연구',
      '재활공학·생체 신호처리와 의료 현장 응용',
    ],
  },
  'Journal of Radiological Protection': iop('0952-4746', 'journal-of-radiological-protection', 'journal-radiological-protection', [
    '전리·비전리 방사선 방호의 이론과 실무',
    '선량 측정·계측기 개발 및 전문 측정 기술',
    '방사선 생물학적 영향·역학·위험 및 환경 영향 평가',
  ]),
  'Physical Biology': iop('1478-3975', 'physical-biology', 'physical-biology', [
    '생물 시스템을 이해하기 위한 정량 실험·이론·모델링',
    '분자·세포의 물리, 생체막·세포역학과 시스템생물학',
    '조직·발생·신경계·집단 행동과 진화의 물리적 원리',
  ]),
};
