// Wiley 공식 Aims and Scope/Overview를 바탕으로 요약한 대표 주제. 확인: 2026-11-03.
const wiley = (code, topics, scopeSource, host = 'onlinelibrary.wiley.com') => ({
  homepage: `https://${host}/journal/${code}`,
  scopeSource: scopeSource || `https://onlinelibrary.wiley.com/page/journal/${code}/homepage/productinformation.html`,
  topics,
});

export const wileyDetails = {
  'Advanced Healthcare Materials': wiley('21922659', [
    '건강 증진을 위한 생체재료·의료기기·새로운 기술',
    '생체계면·나노의학·나노기술·약물 및 유전자 전달',
    '조직공학·재생의학·줄기세포와 임상 응용',
  ], undefined, 'advanced.onlinelibrary.wiley.com'),
  'Bioengineering & Translational Medicine': wiley('23806761', [
    '생물·화학공학 기반의 혁신적 의료 기술',
    '임상 실무와 상용 헬스케어 제품으로 이어지는 중개 연구',
    '생체분자공학 및 기존 기술의 임상적으로 유의미한 발전',
  ], 'https://aiche.onlinelibrary.wiley.com/hub/journal/23806761/homepage/productinformation.html', 'aiche.onlinelibrary.wiley.com'),
  'Ultrasound in Obstetrics & Gynecology': wiley('14690705', [
    '산과·부인과 및 모체–태아 의학의 영상 연구',
    '태아·산전 진단과 도플러·3차원 초음파',
    '산부인과 영상기법의 임상 적용·진료 지침·합의문',
  ], 'https://obgyn.onlinelibrary.wiley.com/hub/journal/14690705/aims-and-scope/read-full-aims-and-scope', 'obgyn.onlinelibrary.wiley.com'),
  'Journal of Magnetic Resonance Imaging': wiley('15222586', [
    '자기공명 기법의 진단적 응용에 관한 기초 연구',
    'MRI의 임상 연구와 진단 활용',
    '진단 자기공명 분야의 교육·리뷰 및 최신 지견',
  ]),
  'Human Brain Mapping': wiley('10970193', [
    '인간 행동을 뒷받침하는 신경계의 시공간적 조직화',
    'MRI·PET·SPECT·EEG·MEG 등 비침습적 뇌영상',
    '정상군·임상군의 뇌 지도화 기초·임상·이론·기술 연구',
  ]),
  'Biometrical Journal': wiley('15214036', [
    '의학·환경과학·농업 등 생명과학의 통계 방법',
    '실제 연구 문제에서 출발하는 통계 방법론 개발과 적용',
    '정량적 사례 연구와 코드·데이터를 통한 재현 가능한 연구',
  ]),
  'Statistics in Medicine': wiley('10970258', [
    '의학과 관련 과학에 적용하는 통계·정량적 방법',
    '실제 의학 문제로 설명·평가하는 새로운 통계 방법론',
    '임상시험·역학·생존분석 등 의학통계의 응용과 교육',
  ]),
  'Biotechnology and Bioengineering': wiley('10970290', [
    '효소·단백질공학·생촉매·대사·세포 생리',
    '바이오리액터·바이오공정의 모델링·설계·모니터링·제어',
    '생체재료·전달 시스템·조직공학·계산 및 시스템생물학',
  ], 'https://analyticalsciencejournals.onlinelibrary.wiley.com/hub/journal/10970290/homepage/productinformation.html', 'analyticalsciencejournals.onlinelibrary.wiley.com'),
  'Journal of Biomedical Materials Research Part A': wiley('15524965', [
    '생체재료의 제조·성능·평가와 생리 환경에서의 거동',
    '혈액·조직의 생체재료 반응 및 생체적합성',
    '의료·치과·인공장기·기기용 금속·고분자·세라믹·생체조직',
  ]),
  'Biotechnology Journal': wiley('18607314', [
    '세포·조직·오가노이드 배양·질병 모델·치료 연구',
    '합성생물학·나노생명공학·대사공학',
    '바이오에너지·바이오공정·산업·식물 및 의료생명공학',
  ], 'https://analyticalsciencejournals.onlinelibrary.wiley.com/hub/journal/18607314/homepage/productinformation.html', 'analyticalsciencejournals.onlinelibrary.wiley.com'),
  'Medical Physics': wiley('24734209', [
    '방사선 영상·핵의학의 의학물리 연구',
    '방사선종양학·방사선치료의 물리 및 기술',
    '임상 방사선 영향과 영상·치료 연구용 데이터',
  ], 'https://aapm.onlinelibrary.wiley.com/hub/journal/24734209/overview', 'aapm.onlinelibrary.wiley.com'),
  'Magnetic Resonance in Medicine': wiley('15222594', [
    '의료용 핵자기공명(NMR) 방법과 기술 개발',
    '전자상자성공명(EPR) 기법의 의료적 응용',
    '자기공명 기법의 개발·활용에 관한 독창적 방법론 연구',
  ]),
  'Advanced Therapeutics': wiley('23663987', [
    '표적 약물전달·세포치료·유전자치료',
    '개인맞춤의학·정밀의학·진단과 치료의 융합',
    '차세대 치료법의 약리학·독성학·신약 개발과 중개 연구',
  ], undefined, 'advanced.onlinelibrary.wiley.com'),
  'International Journal of Imaging Systems and Technology': wiley('10981098', [
    '의료영상 시스템·영상물리·정보학의 융합',
    'AI·머신러닝 기반 영상 획득·재구성·분석·해석',
    '영상기술의 설계·개발·검증과 임상 전환',
  ]),
  'NMR in Biomedicine': wiley('10991492', [
    'MRI·자기공명분광(MRS) 방법 및 계측기 개발',
    '생리·생화학·생물물리·의학 문제의 자기공명 연구',
    '새 MRI·MRS 기법을 이용한 질병 진단과 치료 연구',
  ], 'https://analyticalsciencejournals.onlinelibrary.wiley.com/hub/journal/10991492/homepage/productinformation.html', 'analyticalsciencejournals.onlinelibrary.wiley.com'),
  'Journal of Applied Clinical Medical Physics': wiley('15269914', [
    '방사선종양학·진단영상의 임상 의학물리',
    '중재영상·핵의학·보건물리 실무',
    '임상적으로 유의미한 기술 개발·교육·실무 지침',
  ], 'https://aapm.onlinelibrary.wiley.com/hub/journal/15269914/overview', 'aapm.onlinelibrary.wiley.com'),
  'Journal of Neuroimaging': wiley('15526569', [
    'MRI·CT·초음파·PET·SPECT 등 신경영상',
    '뇌졸중·종양·퇴행성 질환 등 신경계 질환의 영상 진단',
    '환자 진료·진단·치료에 유용한 신경영상 기술과 해석',
  ]),
  'The International Journal of Medical Robotics and Computer Assisted Surgery': wiley('1478596x', [
    '의료용 로봇·컴퓨터 보조 수술 시스템',
    '수술계획·의료영상·시각화·가상현실',
    '수술용 제어·햅틱·센서와 로봇 시스템의 임상 적용',
  ]),
  'Artificial Organs': wiley('15251594', [
    '인공장기의 연구·설계·개발·성능 평가',
    '장기 대체·회복·재생을 위한 기술 융합',
    '인공장기 기술의 임상 전환과 실제 적용',
  ], 'https://onlinelibrary.wiley.com/page/journal/15251594/homepage/aims-and-scope.html'),
  'International Journal for Numerical Methods in Biomedical Engineering': wiley('20407947', [
    '의공학 문제 해결을 위한 수치해석 방법의 발전',
    '생체 고체·유체역학 등 생의학 시스템 모델링',
    '계산 알고리즘·시뮬레이션·최적화 및 기존 방법과의 비교',
  ]),
  'Journal of Ultrasound in Medicine': wiley('15509613', [
    '의료 초음파의 환자 진료 및 임상 응용',
    '의료 초음파와 관련된 기초과학·생물학적 영향',
    '초음파 계측기와 기술 혁신·다양한 장기별 초음파',
  ]),
  'Lasers in Surgery and Medicine': wiley('10969101', [
    '의학·생물학에서 레이저·광 및 관련 에너지의 이용',
    '레이저 기반 진단·치료·임상시험과 새로운 기기',
    '레이저 생물물리·생체공학·광생물학·광화학',
  ], 'https://onlinelibrary.wiley.com/page/journal/10969101/homepage/ProductInformation.html'),
  'Pharmaceutical Statistics': wiley('15391612', [
    '신약 탐색·전임상·임상 개발 단계의 통계 응용',
    '시판 후 감시·역학·보건경제 및 의약품 생산 통계',
    '의약품 개발 통계의 방법·사례 연구·교육',
  ]),
  'Journal of Biomedical Materials Research Part B: Applied Biomaterials': wiley('15524981', [
    '생체재료·의료기기의 설계·개발·제조·임상 응용',
    '생체 내 분해·표면 상호작용·임플란트 회수 분석·상처 치유',
    '의료기기 규제·표준·전임상 평가·약물전달',
  ]),
  'Biotechnology Progress': wiley('15206033', [
    '바이오·바이오의약·바이오공정 산업의 공정·제품·기기 개발',
    '세포 생리·대사공학·생촉매·바이오리액터 설계',
    '분리정제·하류 공정·세포배양·조직공학·공정 제어',
  ], 'https://aiche.onlinelibrary.wiley.com/hub/journal/15206033/homepage/productinformation.html', 'aiche.onlinelibrary.wiley.com'),
  'Journal of Tissue Engineering and Regenerative Medicine': wiley('jterm', [
    '줄기·전구세포·생체재료·스캐폴드·성장인자의 조합',
    '조직·장기의 복구·대체·재생과 기능 회복',
    '임상 응용을 위한 생물학적 대체물·새 재료·조직공학',
  ]),
  'Journal of Biophotonics': wiley('18640648', [
    '빛과 생물학적 물질의 상호작용',
    '생의학·생명 및 환경과학용 광자 기술',
    '광학 영상·분광·현미경·광학 바이오센서·광역학 치료',
  ]),
  'Journal of Microscopy': wiley('13652818', [
    '광학·전자·X선 및 원자힘·근접장 현미경 기술',
    '공간분해 분광·성분 매핑·미세분석·영상분석',
    '물리·화학·재료·생물과학에서의 새로운 현미경 응용',
  ]),
  'Bioelectromagnetics': wiley('1521186x', [
    '전기장·자기장·전자기장과 생물학적 시스템의 관계',
    '정자기장·극저주파·고주파·마이크로파·밀리미터파',
    '전자기장의 생물학적 영향에 관한 생체전자기학 연구',
  ]),
  'Journal of Medical Imaging and Radiation Oncology': wiley('17549485', [
    '영상의학과 방사선종양학의 임상·과학 연구',
    '중재영상의학·중재신경영상의학',
    '영상과 방사선종양학 실무를 발전시키는 사례·리뷰·연구',
  ]),
  'Journal of Clinical Ultrasound': wiley('10970096', [
    '초음파·MRI·CT·핵의학을 포함하는 다중모달 영상',
    '의료영상의 진단 및 치료 응용',
    '심혈관·소화기·신경·근골격·태아·부인과 영상',
  ], 'https://obgyn.onlinelibrary.wiley.com/journal/10970096', 'obgyn.onlinelibrary.wiley.com'),
  'Clinical Physiology and Functional Imaging': wiley('1475097x', [
    '건강·질병 상태의 인체 생리에 관한 임상·실험 연구',
    '심혈관·신장·폐 시스템의 조절 기전',
    '임상적 관련성이 있는 생리학 방법론과 기능 평가',
  ]),
  'Annals of Noninvasive Electrocardiology': wiley('1542474x', [
    '비침습 심전도 기술을 통한 심장질환 진단·치료',
    '12유도·운동부하·고해상도·신호평균 심전도',
    '부정맥·허혈·재분극·심박변이도·T파 교대',
  ]),
};
