// IEEE 및 발행 학회의 공식 소개를 바탕으로 요약한 대표 주제. 확인: 2026-11-03.
const detail = (homepage, topics, scopeSource = homepage) => ({ homepage, scopeSource, topics });
const xplore = id => `https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=${id}`;
const computer = code => `https://www.computer.org/digital-library/journals/${code}`;
const sps = slug => `https://signalprocessingsociety.org/publications-resources/${slug}`;
const openJournals = 'https://open.ieee.org/publishing-options/topical-journals/';

export const ieeeDetails = {
  'IEEE Transactions on Pattern Analysis and Machine Intelligence': detail(computer('tp'), [
    '컴퓨터 비전과 영상의 이해·분석',
    '패턴 분석·인식 및 이를 위한 기계학습',
    '기계 지능의 이론·알고리즘과 응용',
  ], `${computer('tp')}/cfp-ieee-pattern-analysis-machine-intelligence`),
  'IEEE Reviews in Biomedical Engineering': detail(xplore(4664312), [
    '의공학의 주요 발전과 최신 기술에 대한 종합 리뷰',
    '의료영상·바이오센서·신경공학·재활 기술',
    '공학·생물학·의학을 연결하는 연구 동향과 과제',
  ], 'https://technav.ieee.org/topic/ieee-reviews-in-biomedical-engineering/'),
  'IEEE Transactions on Image Processing': detail(sps('ieee-transactions-image-processing'), [
    '영상·비디오 및 다차원 신호 처리의 이론과 알고리즘',
    '영상의 생성·획득·통신·분석 및 표시',
    '새로운 영상 처리 구조와 시스템 구현',
  ], sps('ieee-transactions-image-processing/about-transactions-image-processing')),
  'IEEE Transactions on Medical Imaging': detail('https://ieeetmi.org/', [
    '신체 구조·형태·기능 및 세포·분자 수준의 의료영상',
    '새로운 영상 획득·처리·분석·시각화 기법',
    '의료영상의 패턴 인식·기계학습과 공학적 혁신',
  ], 'https://ieeetmi.org/scope/'),
  'IEEE Transactions on Affective Computing': detail(computer('ta'), [
    '사람의 감정을 인식·해석·모사하는 시스템',
    '감정 요인과 인간·기술 상호작용의 원리',
    '감정을 고려한 시스템의 설계·구현·평가',
  ], `${computer('ta')}/tac-general-call-for-papers`),
  'IEEE Transactions on Robotics': detail('https://www.ieee-ras.org/Publications/T-RO/', [
    '로봇공학 전반의 새로운 이론과 기술적 발전',
    '로봇의 설계·제어·인지 및 자율 행동',
    '로봇 시스템의 구현과 실제 응용 연구',
  ], 'https://www.ieee-ras.org/publications/t-ro/t-ro-information-for-authors/'),
  'IEEE Transactions on Neural Networks and Learning Systems': detail('https://cis.ieee.org/ieee-transactions-on-neural-networks-and-learning-systems.html', [
    '신경망과 관련 학습 시스템의 기초 이론',
    '신경망 구조·학습 방법과 시스템 설계',
    '신경망 및 학습 시스템의 다양한 응용',
  ], 'https://ai.ieee.org/research/'),
  'IEEE Journal of Biomedical and Health Informatics': detail(xplore(6221020), [
    '의생명·건강 분야의 정보통신 기술과 정보학',
    '건강 데이터의 수집·전송·저장·처리 및 분석',
    '의료 기록·진단·건강 모니터링과 맞춤형 의료',
  ], 'https://www.embs.org/jbhi/'),
  'IEEE Transactions on Instrumentation and Measurement': detail('https://ieee-ims.org/publication/ieee-tim', [
    '물리 현상 측정을 위한 이론·방법론과 계측 기술',
    '전기·전자 계측기와 신호 획득·처리 시스템',
    '측정 정보의 분석·표시·보존 및 측정 표준',
  ]),
  'IEEE Transactions on Visualization and Computer Graphics': detail(computer('tg'), [
    '컴퓨터 그래픽스의 이론·알고리즘과 시스템',
    '과학·정보 시각화 및 시각적 데이터 분석',
    '가상·증강현실과 시각적 상호작용 기술',
  ], `${computer('tg')}/cfp-ieee-transactions-on-visualization-computer-graphics`),
  'IEEE Transactions on Neural Systems and Rehabilitation Engineering': detail(xplore(7333), [
    '의공학의 신경 시스템 및 재활공학 연구',
    '기능적 전기 자극·신경 자극·근전도와 운동 제어',
    '인간 수행 능력의 측정·분석과 재활 보조기기',
  ], openJournals),
  'IEEE Transactions on Signal Processing': detail(sps('ieee-transactions-signal-processing'), [
    '신호 처리의 새로운 이론·알고리즘과 성능 분석',
    '신호의 이해·학습·검색 및 정보 추출',
    '다양한 신호와 데이터에 대한 처리 기술의 응용',
  ], sps('ieee-transactions-signal-processing/about-ieee-transactions-signal-processing')),
  'IEEE Transactions on NanoBioscience': detail('https://ieeenano.org/publications/t-nb/', [
    '생체분자부터 다세포까지 나노·마이크로 생체 시스템',
    '생명과학과 물리·재료·전자기·화학의 융합',
    '생체 정보의 저장·처리와 계산·알고리즘',
  ]),
  'IEEE Transactions on Ultrasonics': detail('https://ieee-uffc.org/publication/t-uson', [
    '초음파의 발생·전파·검출에 관한 이론과 기술',
    '의료 및 산업 분야의 초음파 응용',
    '초음파 변환기·압전 재료·소자와 센서',
  ]),
  'IEEE Transactions on Emerging Topics in Computational Intelligence': detail('https://cis.ieee.org/ieee-transactions-on-emerging-topics-in-computational-intelligence.html', [
    '계산 지능 분야의 새롭게 등장하는 이론과 방법',
    '자연에서 영감을 얻은 지능적 계산 기술',
    '계산 지능의 혁신적 응용과 학제 간 연구',
  ], 'https://ai.ieee.org/research/'),
  'IEEE Robotics and Automation Letters': detail('https://www.ieee-ras.org/publications/ieee-robotics-and-automation-letters/', [
    '로봇·자동화 분야의 새로운 연구 아이디어',
    '중요한 이론적 발견과 기술적 혁신',
    '로봇·자동화의 응용 결과와 사례 연구',
  ]),
  'IEEE Transactions on Biomedical Circuits and Systems': detail('https://ieee-cas.org/publication/TBioCAS', [
    '의생명 분야의 회로·시스템 이론과 설계',
    '생명과학과 마이크로전자 기술의 융합',
    '생체 신호·의료 응용을 위한 전자 회로와 시스템',
  ], 'https://ieee-cas.org/publication/TBioCAS/guidelines-authors'),
  'IEEE Transactions on Computational Imaging': detail(sps('ieee-transactions-computational-imaging'), [
    '영상 형성 과정에 계산을 결합하는 이미징 기술',
    '불완전·희소 측정에서의 영상 복원과 역문제',
    '새로운 센싱 방식 및 하드웨어·소프트웨어 통합',
  ]),
  'IEEE Sensors Journal': detail('https://ieee-sensors.org/ieee-sensors-journal/', [
    '물리·화학·생물 현상을 감지하는 센서',
    '센서의 이론·설계·모델링·제작과 응용',
    '센서 재료·전자 기술과 통합 센서·액추에이터',
  ]),
  'IEEE Transactions on Biomedical Engineering': detail(xplore(10), [
    '의공학의 기초 연구와 응용 연구',
    '생체·의료 응용을 위한 공학적 방법과 기술 개발',
    '공학적 기여가 있는 실험 및 임상 연구',
  ], 'https://www.embs.org/tbme/'),
  'IEEE Transactions on Human-Machine Systems': detail('https://www.ieeesmc.org/publications/transactions-on-human-machine-systems/', [
    '인간·기계 시스템과 인간·조직의 상호작용',
    '인지 인간공학과 인간의 정보 처리',
    '시스템·조직의 시험·평가 및 인간 중심 설계',
  ]),
  'IEEE Access': detail('https://ieeeaccess.ieee.org/', [
    'IEEE 전 분야의 다학제적 연구와 개발',
    '기술의 실용적 응용과 응용 지향 연구',
    '기존 학문 경계를 넘는 융합 공학 연구',
  ], 'https://ieeeaccess.ieee.org/about/'),
  'IEEE Transactions on Computational Biology and Bioinformatics': detail(computer('bb'), [
    '계산생물학·생물정보학의 수학·통계·알고리즘',
    '생물학 연구를 위한 소프트웨어와 데이터베이스',
    '생물학적 시스템의 계산 모델링과 데이터 분석',
  ], `${computer('bb')}/cfp-computational-biology-bioinformatics`),
  'IEEE Journal of Translational Engineering in Health and Medicine': detail(xplore(6221039), [
    '임상적 필요를 해결하는 첨단 공학 기술',
    '의료 기술의 임상 결과와 헬스케어 관련성',
    '공학·생명과학·의학을 잇는 중개 연구',
  ], openJournals),
  'IEEE Signal Processing Letters': detail(sps('ieee-signal-processing-letters'), [
    '신호 처리 분야의 새로운 아이디어와 기술',
    '영상·음성·언어·오디오 신호의 처리',
    '신호 처리 이론·방법·응용의 시의성 있는 발전',
  ]),
  'Journal of Microelectromechanical Systems': detail('https://eds.ieee.org/publications/journal-of-microelectromechanical-systems', [
    '미세전자기계 시스템의 설계·제작·특성 평가',
    '미세 규모 물리 현상과 기능성 소자',
    '마이크로 센서·액추에이터 및 시스템 공학',
  ], 'https://technav.ieee.org/topic/ieee-journal-of-microelectromechanical-systems/'),
  'IEEE Transactions on Haptics': detail('https://www.ieee-ras.org/publications/toh/', [
    '촉각 정보의 획득·전달·표현에 관한 과학과 기술',
    '물체 조작 및 인간의 촉각 상호작용',
    '햅틱 장치·시스템의 설계와 다양한 응용',
  ], 'https://www.ieee-ras.org/publications/toh/information-for-authors-toh/'),
  'IEEE Photonics Journal': detail('https://ieeephotonics.org/publications/photonics-journal/', [
    '광자공학 전반의 기초 연구와 응용',
    '빛의 발생·제어·활용을 위한 기술',
    '새로운 포토닉스 소자·시스템과 기술적 발전',
  ]),
  'IEEE Transactions on Nanotechnology': detail('https://ieeenano.org/publications/t-nano/', [
    '나노 규모 현상의 물리적 기초와 공학적 응용',
    '새로운 나노 재료·소자 및 시스템',
    '나노기술의 다양한 과학·공학 분야 융합',
  ]),
  'IEEE Transactions on Nuclear Science': detail('https://ieee-npss.org/publications/transactions-on-nuclear-science/', [
    '이온화 방사선의 검출·측정과 검출기 재료',
    '입자 가속기·원자로의 계측과 제어',
    '방사선이 재료·부품·시스템에 미치는 영향',
  ]),
};
