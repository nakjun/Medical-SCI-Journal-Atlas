// Taylor & Francis Online 및 Dove Medical Press의 공식 Aims and scope 요약.
// 확인: 2026-11-03. 지표·APC는 사용자 제공 자료를 별도로 보존합니다.
const tf = (code, topics, overviewSource = false) => ({
  homepage: `https://www.tandfonline.com/journals/${code}`,
  scopeSource: `https://www.tandfonline.com/journals/${code}${overviewSource ? '' : '/about-this-journal'}`,
  topics,
});

export const taylorFrancisDetails = {
  'International Journal of Nanomedicine': {
    homepage: 'https://www.dovepress.com/international-journal-of-nanomedicine-journal',
    scopeSource: 'https://www.dovepress.com/aims-and-scope-international-journal-of-nanomedicine-d6-j5',
    topics: [
      '질환 진단·예방·치료를 위한 나노기술의 의료 응용',
      '나노 약물전달·바이오센서·재생 나노의학',
      '나노 진단·정보학과 나노재료의 생체적합성·안전성',
    ],
  },
  'Artificial Cells, Nanomedicine, and Biotechnology': tf('ianb20', [
    '인공세포·나노의학·의료 생명공학의 융합 연구',
    '합성생물학·합성 소기관·인공 엑소좀과 세포외 소포',
    '인공세포의 생물학적·면역 치료 응용과 임상 전환',
  ]),
  'Expert Review of Molecular Diagnostics': tf('iero20', [
    '질병의 분자적 원인 검출과 모니터링',
    '임상에서 활용할 진단·예후 예측 기술의 발전',
    '분자진단 기술의 임상적 영향과 향후 발전에 대한 전문가 평가',
  ]),
  'Nanomedicine': tf('innm20', [
    '인체 의료·건강에 적용하는 나노기술의 전임상·임상 연구',
    '나노 약물전달·진단·치료 통합 플랫폼과 생체센싱',
    '나노 의료기술의 안전성·독성 및 임상 전환',
  ]),
  'Journal of Biomaterials Science, Polymer Edition': tf('tbsp20', [
    '고분자 생체재료의 기초 특성과 기능',
    '분자·세포 수준에서의 생체재료·생물체 상호작용',
    '약물전달·조직공학용 고분자와 DNA·단백질 등 생체고분자',
  ]),
  'International Journal of Polymeric Materials and Polymeric Biomaterials': tf('gpom20', [
    '고분자 생체재료와 의생명용 고분자',
    '캡슐화·마이크로캡슐화 기술',
    '제어 방출 기술 및 의료 관련 고분자 재료의 응용',
  ], true),
  'International Journal of Hyperthermia': tf('ihyt20', [
    '열에너지를 이용한 질환 치료의 임상·전임상 연구',
    '온열·냉각 스트레스와 면역·생리적 반응',
    '치료 에너지 전달·온도 제어·영상·모니터링 기술',
  ], true),
  'Journal of Biological Dynamics': tf('tjbd20', [
    '생물 과정의 동적 모델 개발과 수학적 분석',
    '개체·개체군·군집·생태계 수준의 동역학',
    '역학·면역학·신경과학·생태·진화의 동적 현상',
  ]),
  'Biofouling': tf('gbif20', [
    '생물오손·생물막·생체접착의 형성과 제어',
    '방오 코팅·항균 기술과 생물학적 계면',
    '의료기기·치과·산업·해양 환경의 생물막 응용 연구',
  ]),
  'Computer Assisted Surgery': tf('icsu20', [
    '영상 유도 수술·중재 영상과 수술 로봇',
    '수술 계획·유도를 위한 가상·증강현실과 인공지능',
    '수술 시뮬레이션·술기 훈련 및 수술 후 평가',
  ], true),
  'Journal of Biopharmaceutical Statistics': tf('lbps20', [
    '의약품·의료기기·생물학적 제제 연구개발의 통계 방법',
    '임상시험 설계·안전성 평가와 시판 후 감시',
    '생체이용률·생물학적 동등성·약동학 분석',
  ]),
  'Expert Review of Medical Devices': tf('ierd20', [
    '의료기기의 연구·개발·시험·임상 사용에 대한 전문가 평가',
    '심혈관·정형외과·당뇨병·신경자극 등 치료 기기',
    '웨어러블·원격 모니터링·영상·인공지능 의료기술',
  ], true),
  'Journal of Biomolecular Structure and Dynamics': tf('tbsd20', [
    '생체분자의 구조·동역학·기능에 관한 생물물리 연구',
    '구조생물학·계산 모델링과 생물정보학적 접근',
    '구조·기능 관계를 밝히는 실험·이론·계산 방법 개발',
  ]),
  'Computer Methods in Biomechanics and Biomedical Engineering': tf('gcmb20', [
    '생체조직·장기·재료의 계산생체역학과 시뮬레이션',
    '인체 운동·세포역학·생체유체·혈류역학 모델링',
    '의료기기·임플란트의 설계·평가와 다중 규모·물리 모델',
  ], true),
  'Informatics for Health and Social Care': tf('imif20', [
    '건강·사회 돌봄과 디지털 헬스의 근거 기반 정보학',
    '돌봄 데이터의 표현·구조·활용과 정보시스템 생애주기',
    '정보기술의 현장 구현·영향 평가와 사람 중심 돌봄',
  ], true),
  'Electromagnetic Biology and Medicine': tf('iebm20', [
    '비전리 전자기장의 생물학적·의학적 영향과 응용',
    '0 Hz~300 GHz 전자기장과 생체 시스템의 상호작용',
    '전자기장 노출에 관한 생체 내외 실험과 역학 연구',
  ]),
};
