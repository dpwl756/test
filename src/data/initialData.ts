import { SEOConfig, SocialLinks, CompanyInfo, ProductItem, NoticePost, AppConfig, AboutInfo, ServiceItem } from '../types';

export const initialSEO: SEOConfig = {
  title: '기인교정기술원 - 국가 표준 계측기 교정 & 공인 성적서 발급 전문',
  description: 'KOLAS 가이드라인 준수 계측기 정밀 교정 및 성적서 발급 전문 기관 기인교정기술원입니다. 수질 연속 측정기, 복합 가스 분석기, 미세먼지 샘플러, 초음파 파쇄기 등 정밀 장비의 출장/내방 교정 서비스를 제공합니다.',
  keywords: '기인교정기술원, 국가 표준 교정, 계측기 교정, 교정 성적서, 수질측정기 교정, 가스분석기 교정, 미세먼지 샘플러 교정, 초음파 파쇄기 교정'
};

export const initialSocials: SocialLinks = {
  facebook: 'https://facebook.com/kiincal',
  linkedin: 'https://linkedin.com/company/kiincal',
  youtube: 'https://youtube.com/kiincal_official',
  instagram: 'https://instagram.com/kiincal_official'
};

export const initialCompany: CompanyInfo = {
  name: '기인교정기술원',
  ceo: '김홍도',
  address: '서울특별시 금천구 가산디지털1로 201, 에이스하이엔드타워 9차 1205호',
  phone: '02-555-1234',
  fax: '02-555-5678',
  email: 'info@kiincal.co.kr',
  businessNo: '120-81-12345',
  established: ''
};

export const initialAppConfig: AppConfig = {
  fontFamily: 'sans',
  accentColor: '#0284c7', // sky-600
  themeMode: 'light'
};

export const initialAbout: AboutInfo = {
  introduction: '기인교정기술원은 대기, 수질, 토양 등 지속 가능한 지구 환경을 위한 첨단 환경계측기와 산업용 초음파 장비의 국가 표준 교정 및 성적서 발급 전문 파트너입니다. 국가 표준에 소급된 최첨단 교정 표준 장비와 고정밀 기술을 통하여 대학, 국가 연구소, 환경 측정망 및 산업체에서 운용 중인 기기들의 높은 측정 신뢰도를 견인합니다.',
  mission: 'KOLAS 국가 표준 가이드라인을 엄격히 준수하는 정밀 교정 서비스를 통해 고객사의 정밀 측정 신뢰성을 수호합니다.',
  vision: '환경 계측기 및 초음파 파쇄 기기 표준 교정 및 공인 성적서 발급의 선도 기업으로서 보다 정밀하고 깨끗한 내일을 설계합니다.',
  history: []
};

export const initialProducts: ProductItem[] = [
  {
    id: 'prod-1',
    category: '환경계측기',
    name: '다항목 수질 연속 측정기 WQ-80 Multi (교정)',
    subName: 'Water Quality Analyzer Calibration',
    desc: '수소이온농도(pH), 용존산소(DO), 전기전도도(EC), 탁도, 수온 등 다항목 수질 연속 측정 장비의 센서 전극 표준 오차 보정 및 신뢰성 정밀 교정 서비스입니다. 정수장, 폐수처리장 현장 및 연구소 기기 교정에 최적화되어 있습니다.',
    spec: '교정 범위: pH 4.01 / 7.00 / 10.01 표준 완충액 매칭, DO 포화도 보정, 탁도 0-1000 NTU 보정\n소급 체계: 표준물질(CRM) 소급성 확보\n지원 방식: 내방 교정 및 출장 캘리브레이션 지원\n발급 문서: 교정 성적서 및 정밀도 진단 성적 서류',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=60',
    keyFeatures: ['전용 표준 물질 다중점 보정', '전극 표면 세정 및 기계적 이상 진단 포함', 'KOLAS 규격 매뉴얼에 따른 공인 성적서 대행 발급']
  },
  {
    id: 'prod-2',
    category: '환경계측기',
    name: '포터블 복합 가스 분석기 MX6-iBrid (검교정)',
    subName: 'Multi-Gas Monitor Calibration & Service',
    desc: '산소, 가연성 가스, 독성 가스 및 VOCs 등 가스 감지 측정기의 정밀 표준 가스 주입 검교정 및 센서 감도 원점 보정 서비스입니다. 현장 안전 및 밀폐공간 검사용 장비의 측정 신뢰성을 엄격히 확보합니다.',
    spec: '교정 대상 가스: O2, LEL/CH4, CO, H2S, SO2, NO2, PID(VOCs)\n적용 표준: 국가 공인 가스 및 표준 희석 가스 소급성 보증\n검사 서비스: 센서 수명 예측 점검, 필터 청소, 영점 복원\n발급 서류: 오차 평가 결과서 및 기기 검교정 필증 부착',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?w=600&auto=format&fit=crop&q=60',
    keyFeatures: ['공인 혼합 표준 가스 정밀 주입 영점 세팅', '펌프 흡입 유량 점검 및 기밀성 테스트 동시 수행', '센서 감도 하강 경보 및 소모품 수명 상태 보고']
  },
  {
    id: 'prod-3',
    category: '미세먼지 채취 및 측정기',
    name: '대기질 초미세먼지 자동 측정기 PM-2.5 Beta (교정)',
    subName: 'Beta Attenuation Mass Monitor Calibration',
    desc: '베타선 흡수법(Beta Attenuation) 기전 초미세먼지 질량 농도 자동 측정기의 정밀 유량 보정 및 베타선 검출기 캘리브레이션 서비스입니다. 국가 실시간 모니터링망 규격을 충족하는 오차 범위 보정을 수행합니다.',
    spec: '교정 제어: 샘플링 유량 16.7 L/min 유량 보상 영점 점검\n보정 기준: 기준 포일(Reference Foil)에 의한 오차 캘리브레이션\n지원 사양: 노즐 전극 세정, 히터 온도 정밀 측정 및 유량 적산 테스트\n성적 문서: 대기 환경 공인 교정 기록서 및 현장 보정 일지 발급',
    imageUrl: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=600&auto=format&fit=crop&q=60',
    keyFeatures: ['국가 환경 관제망 표준 형식 승인 규격 부합 교정', '베타선 감도 보정 및 필터 급지 구동부 상태 검사', '유량 적산값 오차 1% 미만 하향 영점 조율']
  },
  {
    id: 'prod-4',
    category: '미세먼지 채취 및 측정기',
    name: '대용량 미세먼지 샘플러 HV-1000F (유량 교정)',
    subName: 'High Volume Air Sampler Flow Calibration',
    desc: '대기 미세먼지 시료 포집을 위한 대용량 에어 샘플러의 유량 센서 표준 캘리브레이션 및 기압 보정 서비스입니다. 정밀한 시료 포집 체적 산출을 위한 오차 보정을 완벽히 검증합니다.',
    spec: '유량 범위: 500 ~ 1200 L/min 흡입 유량 정밀 적산 검증\n정밀 보정: Orifice 표준 검정 장치 연계 자동 유량 보정\n작동 점검: 브러시리스 모터 회전 속도에 따른 오차 곡선 검출\n발급 인증: 공인 유량 측정 소급 성적서 및 검증 라벨',
    imageUrl: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=600&auto=format&fit=crop&q=60',
    keyFeatures: ['오리피스 표준기를 활용한 공인 유량 검정', '실시간 흡입 유량 및 기압 자동 보상 보정', '진공 누출 테스트 및 가스 유입 실드 세척']
  },
  {
    id: 'prod-5',
    category: '초음파 파쇄기',
    name: '실험실용 디지털 초음파 파쇄기 UHD-500 (성능 점검)',
    subName: 'Ultrasonic Homogenizer Frequency Calibration',
    desc: '세포 파쇄 및 나노 분산 연구용 초음파 호모지나이저의 발진 주파수 튜닝, 티타늄 프로브 임피던스 임계 정밀 측정 및 실제 출력 전력(Watts) 성능 검증 서비스입니다.',
    spec: '측정 출력: 최대 500 Watts 실제 음향 파워 및 가열 열량 보정\n주파수 정밀도: 20 kHz ±0.5 kHz 자동 매칭 신호 측정\n점검 범위: 프로브 임피던스 피크 분석, 온도 센서 서모커플 교정\n인증 서류: 장치 출력 성능 측정 결과서 및 주파수 분석 기록 성적서',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=60',
    keyFeatures: ['디지털 주파수 스펙트럼 분석을 통한 최적 작동점 검출', '프로브 혼 피로도 진단 및 임피던스 정합 상태 측정', '온도 도포 가열 한계 설정 정확성 오차 보정']
  },
  {
    id: 'prod-6',
    category: '초음파 파쇄기',
    name: '산업용 대용량 초음파 분산기 UHD-2000 Pro (캘리브레이션)',
    subName: 'Industrial Ultrasonic Process Engine Tuning',
    desc: '공정 인라인 생산 라인에 가동 중인 2,000 Watts 급 최고출력 초음파 분산 엔진의 전력 밀도 및 진동 진폭 캘리브레이션 검사 서비스입니다. 장기 가동에 따른 정합 오차율을 원천 영점 조율합니다.',
    spec: '출력 용량: 최대 2,000 Watts 기계적 출력 에너지 도파 측정\n주파수 튜닝: 19 ~ 21 kHz 자동 공진 회로 실효 측정\n현장 검증: 이중 재킷 쿨링 열교환 유량 내 내열 보정 확인\n서류 발급: 산업용 에너지 출력 분포 측정 성적 보고서 발급',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=60',
    keyFeatures: ['공정 PLC 원격 제어 연동 신호 정확성 보정', '초음파 트랜스듀서 세라믹 소자 전압/전류 정합 오차 극최소화', '24시간 연속 운전 시 음향 변환 효율 분석 보고']
  }
];

export const initialNotices: NoticePost[] = [
  {
    id: 'post-1',
    title: '[공지사항] 계측기 국가 표준 교정 자동화 시스템 도입 및 출장 교정 예약 접수',
    content: '안녕하십니까, 기인교정기술원 기술교정팀입니다.\n당사가 계측기 신뢰성을 한층 고도화하기 위하여 표준 교정 자동화 시스템을 전면 가동함에 따라, 전국 현장 출장 교정 및 내방 교정 예약 시스템을 오픈하였습니다.\n\n해당 시스템은 표준물질(CRM)에 대한 완벽한 국가 표준 소급성을 보증하며, 교정 완료 후 성적서 발급까지 소요되는 시간을 단축시킵니다. 평일(월-금) 오전 9시부터 오후 6시까지 예약 신청이 가능하오니 학계 및 산학 연구원 분들의 많은 활용을 부탁드립니다.\n\n운영시간: 평일(월-금) 09:00 ~ 18:00 (주말 및 공휴일 휴무)\n문의 및 접수: 기술교정팀 대표전화(02-555-1234) 또는 이메일(info@kiincal.co.kr)',
    category: '공지사항',
    author: '관리자',
    date: '2026-07-01',
    views: 142
  },
  {
    id: 'post-2',
    title: '[기술자료] 초음파 파쇄기 UHD-500 주파수 임피던스 분석 및 정밀 캘리브레이션 기술 지침',
    content: '초음파 세포 파쇄 및 화학적 혼합 공정에서, 장기 가동 시 트랜스듀서 및 티타늄 프로브의 마모로 인해 미세한 주파수 정합 어긋남이 발생할 수 있습니다. 본 가이드라인에서는 디지털 임피던스 어날라이저를 활용한 실제 출력 성능 검증과 교정 절차를 수록하였습니다.\n\n1. 발진 주파수 정합 검사: 공진 주파수가 20 kHz ±0.5 kHz 범위를 유지하는지 실시간 스펙트럼 분석을 수행합니다.\n2. 전력 손실율 평가: 티타늄 혼 마모 시 발생하는 에너지 분산 효율 변화를 측정하여 영점 보정을 수행합니다.\n3. 온도 센서 연동 캘리브레이션: T-type 열전대의 측정 오차가 ±0.2℃ 이내가 되도록 다중점 교정을 제안합니다.\n\n자세한 보정 수식 및 교정 보고서 서식은 기술지원 자료실에서 다운로드할 수 있습니다.',
    category: '기술자료',
    author: '기술지원부',
    date: '2026-06-18',
    views: 298
  },
  {
    id: 'post-3',
    title: '[성적서가이드] 복합 가스 측정기 MX6-iBrid 표준 가스 검교정 절차 매뉴얼',
    content: '가스 감지 측정기의 측정 신뢰도를 KOLAS 권고 수준으로 유지하기 위한 표준 가스 주입 검교정 절차 가이드라인입니다.\n\n- 영점 세팅 (Fresh Air Calibration): 가스 오염 위험이 전혀 없는 깨끗한 대기 질 기준에서 영점을 맞춥니다.\n- 표준 가스 교정 (Span Calibration): 산소, CO, H2S, VOCs 등 대상 항목에 최적화된 인증 표준 가스(CRM)를 정밀 조절기를 통해 주입하여 지시 오차가 오차 한계 내에 들어오도록 캘리브레이션을 진행합니다.\n- 성적서 신청 및 기록: 정기 교정 완료 시 발행되는 표준 교정 필증 및 성적서를 항시 보관하여 유효 검사 기록을 증명하십시오.\n\n공인 규격 교정 및 정기 검교정 대행 신청은 당사 온라인 교정의뢰 또는 이메일 접수를 통해 상시 예약이 가능합니다.',
    category: '제품매뉴얼',
    author: '품질보증부',
    date: '2026-05-30',
    views: 187
  },
  {
    id: 'post-4',
    title: '[보도자료] 환경 계측 신뢰도 제고를 위한 고성능 표준 교정 체계 확립',
    content: '기인교정기술원은 대기 및 수질 측정 기리와 초음파 파쇄 장비의 정확한 측정을 보증하기 위해, 국가 표준 물질(CRM)에 완벽히 소급된 고성능 표준 교정 서비스를 본격 시행하였습니다.\n\n본 교정 체계는 대기질 자동측정기 및 시료채취 장비의 기밀 누설, 흡입 유량, 가스 감도 원점을 정밀 보정하여, 연구 기관이 신뢰성 높은 데이터를 산출할 수 있도록 지원합니다. 대표이사는 "장비를 판매하는 것에 그치는 시장에서, 정밀한 교정과 정도(精度) 관리를 통해 국가 측정 데이터의 신뢰성을 지탱하는 든든한 주춧돌이 되겠다"며 계측 신뢰성 강화에 대한 강력한 신념을 밝혔습니다.',
    category: '보도자료',
    author: '홍보실',
    date: '2026-05-15',
    views: 320
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: '현장 출장 표준 교정 및 성적서 발급 대행',
    desc: '정밀한 오차 판정과 신뢰도 확보를 위해 당사 전문 교정 기술 엔지니어가 가동 현장에 직접 방문하여 공인 표준 가스 및 소리/유량 표준 장비를 통해 계측기 영점을 조정해 드립니다.',
    details: [
      'KOLAS 가이드라인 및 국가 계량 표준 소급성 완벽 준수',
      '출장 교정 후 신속한 계측기 교정 성적서 발행 대행',
      '센서 감도 하강 모니터링 및 주기적 캘리브레이션 스케줄링 관리'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'srv-2',
    title: '교정 대비 기기 세정 및 정밀 사전 점검 케어',
    desc: '교정 시 오차 평가에 나쁜 영향을 주는 물리적 먼지 및 화학 물질 점검을 사전에 세정하고 예방 정비하는 유지보수 연계 프로그램입니다.',
    details: [
      '필터 세척, 노즐 기밀 진단, 유량 제어 밸브의 오작동 사전 제거',
      '주요 표준 부속 오염 제거를 통한 측정 수명 연장',
      '교정 오차 불합격율 최소화를 위한 전문 클리닝 서비스'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'srv-3',
    title: '초음파 파쇄기 주파수 공진 및 임피던스 정밀 조율',
    desc: '티타늄 프로브 마모와 트랜스듀서 수명에 의한 주파수 드리프트 현상을 계측하여 실제 에너지 전달 효율이 국가 공인 정합을 얻도록 조율하고 성능 보고서를 작성합니다.',
    details: [
      '디지털 임피던스 아날라이저를 활용한 공진 모드 피크 주파수 점검',
      '정밀 래핑(Lapping)을 통한 프로브 기계적 진동 보정',
      '장비 출력 오차 극소화를 위한 주파수 오차 캘리브레이션 지원'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=500&auto=format&fit=crop&q=60'
  }
];

export const initialCompanyBeliefs = {
  title: '지속 가능한 정밀 교정과 표준 계측기 신뢰성 검증의 중심',
  subtitle: '기인교정기술원의 3대 핵심 교정 신념 (Calibration Philosophy)',
  introText: '기인교정기술원은 설립 이래, 대한민국 산업계와 공공 연구 기관의 정밀 측정 및 환경 계측 인프라가 정직하고 정밀하게 운영될 수 있도록 계측기 표준 교정 서비스를 선도해 왔습니다. 미세먼지 시료채취 장치의 오리피스 유량 적산 교정, 복합 가스 분석기의 감도 캘리브레이션, 그리고 하이테크 초음파 장비의 출력 정확도 검증에 이르기까지 국가 표준 규격 소급성 체계를 준수하며, 투명하고 정밀한 성적서를 약속합니다.',
  beliefs: [
    {
      id: 'b-1',
      title: '0.1%의 타협 없는 고정밀 정직 (Precision First)',
      desc: '환경과 연구 결과는 아주 작은 오차로도 데이터 신뢰성에 거대한 영향을 끼칩니다. 당사가 점검하고 교정하는 모든 대기질·수질 분석기 및 초음파 호모지나이저의 성능 기록은 엄격히 국가 표준에 소급되어 타협 없는 정밀성을 약속합니다.'
    },
    {
      id: 'b-2',
      title: '신속하고 투명한 공인 교정 절차 (Reliable Calibration)',
      desc: '측정 신뢰성 관리는 장비 운용의 핵심입니다. 당사는 평일(월-금) 오전 9시부터 오후 6시까지 신속하고 체계적인 접수 및 출장 교정 일정을 제공하며, 접수된 시료는 신속히 교정하여 공인 교정 성적서 대행 발급까지 막힘없이 완수합니다.'
    },
    {
      id: 'b-3',
      title: '국가 측정 신뢰도를 지탱하는 동반자 (Infrastructure Partner)',
      desc: '연구진과 산업현장에서 수집하는 대기질, 수질 데이터의 신뢰성은 오차 없는 올바른 교정에서부터 시작합니다. 우리는 국가 측정 인프라의 표준을 확립하고 모든 기기의 정상 정합성을 보증하는 신뢰받는 동반자가 되겠습니다.'
    }
  ]
};

