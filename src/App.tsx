import React, { useState, useEffect } from 'react';
import {
  Layers,
  ShieldCheck,
  Activity,
  Wind,
  Zap,
  Award,
  ArrowRight,
  Clock,
  PhoneCall,
  FileText,
  CheckCircle,
  Building,
  Database,
  Monitor,
  AlertCircle,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  ChevronRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Mail,
  Sliders,
  Eye,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

// Data and Types
import { SEOConfig, SocialLinks, CompanyInfo, ProductItem, NoticePost, AppConfig, AboutInfo, ServiceItem, Inquiry } from './types';
import {
  initialSEO,
  initialSocials,
  initialCompany,
  initialAppConfig,
  initialAbout,
  initialProducts,
  initialNotices,
  initialServices,
  initialCompanyBeliefs
} from './data/initialData';

// Modular Components
import { EditableText } from './components/EditableText';
import { EditableImage } from './components/EditableImage';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutSection } from './components/AboutSection';
import { ProductsSection } from './components/ProductsSection';
import { ServicesSection } from './components/ServicesSection';
import { NoticeSection } from './components/NoticeSection';
import { ContactSection } from './components/ContactSection';
import { CompanyBeliefs, CompanyBeliefsData } from './components/CompanyBeliefs';


export default function App() {
  // --- Admin Mode State ---
  const [adminMode, setAdminMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('woori_admin_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // --- Active Section State ---
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'products' | 'services' | 'notices' | 'contact'>('home');
  const [preSelectedProduct, setPreSelectedProduct] = useState<string>('');
  const [preSelectedCategory, setPreSelectedCategory] = useState<ProductItem['category']>('환경계측기');

  // --- Core Content States ---
  const [seoConfig, setSeoConfig] = useState<SEOConfig>(() => {
    const saved = localStorage.getItem('woori_seo');
    return saved ? JSON.parse(saved) : initialSEO;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const saved = localStorage.getItem('woori_socials');
    return saved ? JSON.parse(saved) : initialSocials;
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem('woori_company');
    return saved ? JSON.parse(saved) : initialCompany;
  });

  const [appConfig, setAppConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('woori_config');
    return saved ? JSON.parse(saved) : initialAppConfig;
  });

  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(() => {
    const saved = localStorage.getItem('woori_about');
    return saved ? JSON.parse(saved) : initialAbout;
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('woori_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [notices, setNotices] = useState<NoticePost[]>(() => {
    const saved = localStorage.getItem('woori_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('woori_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [companyBeliefs, setCompanyBeliefs] = useState<CompanyBeliefsData>(() => {
    const saved = localStorage.getItem('woori_beliefs');
    return saved ? JSON.parse(saved) : initialCompanyBeliefs;
  });


  // --- Inquiries State (Contact Form submissions) ---
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('woori_inquiries');
    if (saved) return JSON.parse(saved);
    // Seed some mock initial inquiries for rich admin dashboard experience
    return [
      {
        id: 'inq-1',
        name: '박건우 팀장',
        email: 'park_kw@keti.re.kr',
        phone: '010-9876-5432',
        company: '전자부품연구소 (KETI)',
        productName: '대기질 고정밀 초미세먼지 자동 측정기 PM-2.5 Beta',
        content: '환경부 스마트 그린 스쿨 실외 대기 전용 모니터링 구축과 관련하여, PM-2.5 Beta 장비 5대의 공급 단가 및 현장 설치 칼리브레이션 지원 범위를 이메일로 요청드립니다.',
        date: '2026-07-06',
        status: '검토중'
      },
      {
        id: 'inq-2',
        name: '정민아 연구원',
        email: 'ma_jeong@kaist.ac.kr',
        phone: '010-4433-2211',
        company: 'KAIST 생명과학과 실습소',
        productName: '실험실용 디지털 초음파 파쇄기 UHD-500',
        content: '효모 현탁액 균질 파쇄용으로 UHD-500 신형 구매를 조율하고 있습니다. 직경 3mm 전용 티타늄 혼 부속 교체 단가와 소음 방지 챔버 케이스 스펙 자료를 송신해 주십시오.',
        date: '2026-07-08',
        status: '접수대기'
      }
    ];
  });

  // --- Sync States with LocalStorage ---
  useEffect(() => {
    localStorage.setItem('woori_admin_mode', JSON.stringify(adminMode));
  }, [adminMode]);

  useEffect(() => {
    localStorage.setItem('woori_seo', JSON.stringify(seoConfig));
    document.title = seoConfig.title;
  }, [seoConfig]);

  useEffect(() => {
    localStorage.setItem('woori_socials', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('woori_company', JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem('woori_config', JSON.stringify(appConfig));
  }, [appConfig]);

  useEffect(() => {
    localStorage.setItem('woori_about', JSON.stringify(aboutInfo));
  }, [aboutInfo]);

  useEffect(() => {
    localStorage.setItem('woori_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('woori_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('woori_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('woori_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('woori_beliefs', JSON.stringify(companyBeliefs));
  }, [companyBeliefs]);

  // --- Reset All Data to Initial Defaults ---
  const handleResetData = () => {
    if (window.confirm('정말로 모든 데이터 및 에디터 설정을 초기 공장 기본값으로 리셋하시겠습니까? (작성된 공지 및 수신된 고객 문의는 보존됩니다)')) {
      setSeoConfig(initialSEO);
      setSocialLinks(initialSocials);
      setCompanyInfo(initialCompany);
      setAppConfig(initialAppConfig);
      setAboutInfo(initialAbout);
      setProducts(initialProducts);
      setServices(initialServices);
      setCompanyBeliefs(initialCompanyBeliefs);
      alert('초기 기본값으로 리셋되었습니다!');
    }
  };


  // --- Add Inquiry Handler (submitted from Contact Form or Services Calculator) ---
  const handleAddInquiry = (newInq: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const inquiryWithMeta: Inquiry = {
      ...newInq,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: '접수대기'
    };
    setInquiries(prev => [inquiryWithMeta, ...prev]);
  };

  // --- Navigation Redirect Helper ---
  const handleInquireProduct = (productName: string) => {
    setPreSelectedProduct(productName);
    setActiveSection('contact');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // --- Dynamic Style Settings ---
  const fontClass = 
    appConfig.fontFamily === 'serif' ? 'font-serif' :
    appConfig.fontFamily === 'mono' ? 'font-mono' :
    'font-sans';

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${fontClass} transition-colors duration-200`}>
      {/* Dynamic Style injection for absolute brand colors */}
      <style>{`
        .theme-accent-bg { background-color: ${appConfig.accentColor} !important; }
        .theme-accent-text { color: ${appConfig.accentColor} !important; }
        .theme-accent-border { border-color: ${appConfig.accentColor} !important; }
        .theme-accent-ring:focus { --tw-ring-color: ${appConfig.accentColor} !important; }
        .theme-accent-hover-bg:hover { background-color: ${appConfig.accentColor}dd !important; }
        .theme-accent-hover-text:hover { color: ${appConfig.accentColor} !important; }
      `}</style>

      {/* --- UPPER TOP UTILITY HEADLINE BAR (Contains Admin Mode Switch) --- */}
      <header className="bg-slate-900 text-slate-300 py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800 sticky top-0 z-50 shadow-sm flex justify-between items-center text-xs">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-slate-500 font-mono">가산 스마트 디바이스 산업 클러스터 벤처지정기업</span>
          <span className="text-[10px] bg-slate-800 text-sky-400 px-2 py-0.5 rounded border border-slate-700/50 font-semibold flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            한글 웹 에디터 내장형
          </span>
        </div>

        {/* Admin Switcher Widget */}
        <button
          id="btn-admin-toggle"
          onClick={() => setAdminMode(prev => !prev)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold transition-all ${
            adminMode 
              ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/20' 
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          } cursor-pointer`}
          title="웹사이트 실시간 수정 및 어드민 패널 토글"
        >
          {adminMode ? <ToggleRight className="w-5 h-5 text-white animate-pulse" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
          <span>관리자 편집 모드 : {adminMode ? '활성화' : '실행하기'}</span>
        </button>
      </header>

      {/* --- CORPORATE NAVIGATION NAVBAR --- */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-10 z-40 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <button
            type="button"
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl theme-accent-bg flex items-center justify-center text-white font-extrabold shadow-md transform group-hover:scale-105 transition-all">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
                <EditableText
                  value={companyInfo.name}
                  onChange={(val) => setCompanyInfo({ ...companyInfo, name: val })}
                  adminMode={adminMode}
                  tagName="span"
                  className="font-black text-slate-900"
                />
              </h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">Environmental & Ultrasonic Systems</p>
            </div>
          </button>

          {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-extrabold text-slate-600">
            {[
              { id: 'home', label: '홈' },
              { id: 'about', label: '회사 소개' },
              { id: 'products', label: '제품 소개' },
              { id: 'services', label: '유지보수 및 서비스' },
              { id: 'notices', label: '공지 및 새소식' },
              { id: 'contact', label: '교정 및 성적서 의뢰' }
            ].map((tab) => (
              <button
                id={`nav-link-${tab.id}`}
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveSection(tab.id as any);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-4.5 py-2.5 rounded-lg transition-all cursor-pointer ${
                  activeSection === tab.id
                    ? 'theme-accent-text bg-slate-50 font-black'
                    : 'hover:text-slate-950 hover:bg-slate-50/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Spacer to balance layout without Quick Consultation CTA */}
          <div className="flex items-center gap-2" />
        </div>

        {/* Mobile menu rail */}
        <div className="flex lg:hidden overflow-x-auto gap-1 border-t border-slate-50 pt-3.5 mt-3.5 text-[11px] font-bold text-slate-500 no-scrollbar">
          {[
            { id: 'home', label: '홈' },
            { id: 'about', label: '회사소개' },
            { id: 'products', label: '제품소개' },
            { id: 'services', label: '유지보수' },
            { id: 'notices', label: '공지새소식' },
            { id: 'contact', label: '교정의뢰' }
          ].map((tab) => (
            <button
              id={`nav-link-mobile-${tab.id}`}
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveSection(tab.id as any);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 rounded-full shrink-0 transition-colors cursor-pointer ${
                activeSection === tab.id
                  ? 'theme-accent-bg text-white'
                  : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* --- EDITABLE SIDEBAR (Visible ONLY in Admin Mode) --- */}
      {adminMode && (
        <AdminSidebar
          appConfig={appConfig}
          setAppConfig={setAppConfig}
          seoConfig={seoConfig}
          setSeoConfig={setSeoConfig}
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
          companyInfo={companyInfo}
          setCompanyInfo={setCompanyInfo}
          onReset={handleResetData}
        />
      )}

      {/* --- MAIN PAGE VIEWPORT --- */}
      <main className={`min-h-[60vh] pb-16 ${adminMode ? 'lg:pl-84' : ''} transition-all duration-300`}>
        
        {/* VIEW 1: HOME PAGE */}
        {activeSection === 'home' && (
          <div className="space-y-20 animate-in fade-in duration-300">
            
            {/* HERO BANNER SECTION */}
            <section className="bg-slate-50 border-b border-slate-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf815_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                
                {/* Left side: catchy value proposition */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider text-sky-700 bg-sky-100/70 border border-sky-200/50">
                      정밀 과학 계측의 파트너
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <Clock className="w-3 h-3" />
                      24/7 엔지니어 케어 보장
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    환경 계측부터<br />
                    초음파 분산까지,<br />
                    <span className="theme-accent-text">신뢰의 하이테크 솔루션</span>
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
                    우리회사는 국가 연구소, 환경 측정망 및 바이오 나노 공정용 티타늄 균질 가공 등 최고 수준의 제품과 신속방문 KOLAS 공인 교정 유지관리 서비스를 일괄 지원합니다.
                  </p>

                  <div className="flex flex-wrap gap-3.5">
                    <button
                      id="btn-hero-cta-products"
                      type="button"
                      onClick={() => setActiveSection('products')}
                      className="px-6 py-3 rounded-xl font-bold text-xs text-white theme-accent-bg theme-accent-hover-bg shadow-lg shadow-sky-100 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      장비 라인업 보기
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      id="btn-hero-cta-contact"
                      type="button"
                      onClick={() => setActiveSection('contact')}
                      className="px-6 py-3 rounded-xl font-bold text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all cursor-pointer"
                    >
                      무료 견적서 요청
                    </button>
                  </div>

                  {/* Trust badges */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 max-w-md text-xs">
                    <div className="space-y-1">
                      <span className="block font-black text-slate-900 text-base sm:text-lg">15+ 개국</span>
                      <p className="text-slate-500 text-[10px]">교정 표준 소급 국가</p>
                    </div>
                    <div className="space-y-1">
                      <span className="block font-black text-slate-900 text-base sm:text-lg">1,200+ 대</span>
                      <p className="text-slate-500 text-[10px]">계측기 영점 교정 실적</p>
                    </div>
                    <div className="space-y-1">
                      <span className="block font-black text-slate-900 text-base sm:text-lg">99.2 %</span>
                      <p className="text-slate-500 text-[10px]">성적서 적기 발급율</p>
                    </div>
                  </div>
                </div>

                {/* Right side: visual aesthetic corporate graphic/photo */}
                <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 max-w-lg mx-auto w-full h-80 sm:h-96">
                  <EditableImage
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
                    onChange={() => {}}
                    adminMode={false}
                    alt="메인 과학 장비 이미지"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl text-white text-xs border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Precision System</span>
                      <p className="font-extrabold mt-0.5">UHD-500 High-Capacity Homogenizer</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-sky-500 rounded text-white shrink-0 uppercase tracking-wider">
                      NEW MODEL
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* THREE CORE BUSINESS PILLARS (ENVIRONMENT, DUST, ULTRASONIC) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  OUR BUSINESS FIELDS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  우리회사의 3대 핵심 핵심 사업 부문
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm">
                  정밀 환경 측정 시스템 구축, 첨단 미세먼지 수집 성분 분석, 실험실 나노 분산 가공에 이르기까지 전문 엔지니어링을 자랑합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Pillar 1: Environmental Measuring */}
                <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative group text-left">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold mb-6 group-hover:scale-105 transition-transform">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2">환경 가스 및 수질 계측기</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                    pH, 용존산소, 탁도를 비롯한 수해양 센서와 산소, 가연성 가스, 휘발성유기화합물(VOC) 다항목 환경가스 고정밀 휴대 분석장비를 완비하였습니다.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPreSelectedCategory('환경계측기');
                      setActiveSection('products');
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
                  >
                    제품 스펙 둘러보기
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Pillar 2: Fine dust sampler */}
                <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative group text-left">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold mb-6 group-hover:scale-105 transition-transform">
                    <Wind className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2">미세먼지 채취 및 측정기</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                    국가 공인 형식 승인을 획득한 PM-2.5/PM-10 실시간 미세먼지 측정 장비 및 유량 보상식 대용량 공기 분진 시료 포집 석영필터 샘플러를 제조 및 독점 공급합니다.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPreSelectedCategory('미세먼지 채취 및 측정기');
                      setActiveSection('products');
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
                  >
                    제품 스펙 둘러보기
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Pillar 3: Ultrasonic Homogenizer */}
                <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative group text-left">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold mb-6 group-hover:scale-105 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2">초음파 세포 파쇄기</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                    생명 과학 바이오 균체 파쇄, 나노 복합재 유화 분산 공정에 필수적인 20kHz 대역 티타늄 합금 부스터 및 펄스 조율 제어 모듈 기반 고출력 호모지나이저 엔진입니다.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPreSelectedCategory('초음파 파쇄기');
                      setActiveSection('products');
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
                  >
                    제품 스펙 둘러보기
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* TRUST & ACCREDITATION BANNER */}
            <section className="bg-slate-50 border-y border-slate-100 py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                <div className="space-y-2.5 max-w-xl">
                  <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">KOLAS 공인 교정 인증 및 철저한 A/S 보장</h4>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    우리회사에서 도입하신 모든 가스 탐지기와 수질 측정 센서, 미세먼지 샘플러는 매년 국가 규정 기준에 따른 고정밀 방문 영점 보정 서비스를 저렴하게 약정 신청할 수 있습니다.
                  </p>
                </div>
                <button
                  id="btn-home-go-services"
                  type="button"
                  onClick={() => setActiveSection('services')}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white theme-accent-bg theme-accent-hover-bg shadow transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  캘리브레이션 서비스 자세히보기
                  <Award className="w-4 h-4" />
                </button>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: ABOUT US */}
        {activeSection === 'about' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <AboutSection
              aboutInfo={aboutInfo}
              setAboutInfo={setAboutInfo}
              adminMode={adminMode}
            />
          </section>
        )}

        {/* VIEW 3: PRODUCTS INTRODUCTION */}
        {activeSection === 'products' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                WOORI PRODUCT SPECIFICATIONS
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                카테고리별 전문 산업용 장비군
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                우리회사의 고정밀 계측 기기와 최신 공정 모듈 리스트입니다. 견적 신청 시 담당 전문 연구원이 빠르게 컨설팅을 도와드립니다.
              </p>
            </div>
            <ProductsSection
              products={products}
              setProducts={setProducts}
              adminMode={adminMode}
              onInquireProduct={handleInquireProduct}
              preSelectedCategory={preSelectedCategory}
            />
          </section>
        )}

        {/* VIEW 4: SERVICES & AS SUPPORT */}
        {activeSection === 'services' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <ServicesSection
              services={services}
              setServices={setServices}
              adminMode={adminMode}
              onAddInquiry={handleAddInquiry}
            />
          </section>
        )}

        {/* VIEW 5: NOTICE / BULLETIN BOARD */}
        {activeSection === 'notices' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                COMPANY NOTICES & TECHNICAL MANUALS
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                우리회사 공지사항 및 기술공유 백서
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                정부 연구 개발 과제 진행 일정, 장비 운용 한글 한글 가이드 설명서, 그리고 최신 정밀 계측 학회 학술 자료 등을 전해드립니다.
              </p>
            </div>
            <NoticeSection
              notices={notices}
              setNotices={setNotices}
              adminMode={adminMode}
            />
          </section>
        )}

        {/* VIEW 6: CONTACT US */}
        {activeSection === 'contact' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                CALIBRATION REQUEST
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                공식 장비 교정 견적 및 성적서 발급 접수
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                측정 장비 정기 교정, 수질 및 대기 가스 분석기 오차율 검사, 초음파 파쇄 진동수 정밀 캘리브레이션 등 교정 견적 및 성적서 신청을 접수받고 있습니다.
              </p>
            </div>
            <ContactSection
              companyInfo={companyInfo}
              setCompanyInfo={setCompanyInfo}
              adminMode={adminMode}
              onAddInquiry={handleAddInquiry}
              preSelectedProductName={preSelectedProduct}
              clearPreSelectedProduct={() => setPreSelectedProduct('')}
            />
          </section>
        )}

        {/* COMPANY BELIEFS AND INTRODUCTION (Global Pre-Footer Trust Anchor) */}
        <CompanyBeliefs
          data={companyBeliefs}
          onChange={setCompanyBeliefs}
          adminMode={adminMode}
        />

        {/* --- INTEGRATED SECURE ADMIN OPERATIONS PANEL (Always Rendered at bottom for developers, visible in Admin Mode!) --- */}
        {adminMode && (
          <AdminDashboard
            notices={notices}
            setNotices={setNotices}
            inquiries={inquiries}
            setInquiries={setInquiries}
            products={products}
            setProducts={setProducts}
            accentColor={appConfig.accentColor}
          />
        )}

      </main>

      {/* --- CORPORATE COMPREHENSIVE FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Top row: brand and social links */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 rounded theme-accent-bg flex items-center justify-center text-white font-extrabold text-xs">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-sm tracking-tight">우리회사 (Woori Company)</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed max-w-sm">
                우리회사는 지속적인 기술 제휴와 국내 직접 가공 생산 라인 조성을 통해 최고 품질의 대기·수질 센서 장비와 초음파 파쇄 가열 장비를 정직하게 제공합니다.
              </p>
            </div>

            {/* Social Media Link icons */}
            <div className="flex items-center gap-3">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-sky-500 transition-colors border border-slate-700/50"
                title="페이스북 페이지 방문"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-sky-500 transition-colors border border-slate-700/50"
                title="링크드인 팔로우"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-sky-500 transition-colors border border-slate-700/50"
                title="공식 유튜브 채널 구독"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-sky-500 transition-colors border border-slate-700/50"
                title="인스타그램 소식 구독"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Middle row: company registry specs info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-500">
            <div className="space-y-3 leading-relaxed">
              <h5 className="font-extrabold text-slate-300 text-[11px] uppercase tracking-wider">법인 정보 등록 명세</h5>
              <p className="space-y-1">
                <span>회사명: {companyInfo.name}</span><br />
                <span>대표이사: {companyInfo.ceo} (직인생략)</span><br />
                <span>사업자등록번호: {companyInfo.businessNo}</span>
              </p>
            </div>

            <div className="space-y-3 leading-relaxed">
              <h5 className="font-extrabold text-slate-300 text-[11px] uppercase tracking-wider">가산 본사 및 연구소 연락처</h5>
              <p className="space-y-1">
                <span>주소: {companyInfo.address}</span><br />
                <span>대표전화: <strong className="text-slate-400">{companyInfo.phone}</strong></span><br />
                <span>대표팩스: {companyInfo.fax}</span><br />
                <span>대표이메일: <strong className="text-slate-400">{companyInfo.email}</strong></span>
              </p>
            </div>

            <div className="space-y-3 leading-relaxed">
              <h5 className="font-extrabold text-slate-300 text-[11px] uppercase tracking-wider">신뢰 약정 및 책임 보증</h5>
              <p className="text-[11px]">
                우리회사의 모든 미세먼지 측정장비 및 수질 다항목 센서는 환경부 공인 형식승인 1등급 인증 규격을 득하였으며, 초음파 파쇄 가동 소모품 프로브 임피던스는 1년간 무상 보증 수리를 보장합니다.
              </p>
            </div>
          </div>

          {/* Bottom row: copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600 text-[11px] border-t border-slate-800/60 pt-8">
            <span>© 2026 {companyInfo.name}. All rights reserved. Registered Venture Firm.</span>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setActiveSection('services');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="hover:text-slate-400 transition-colors cursor-pointer"
              >
                교정 서비스 이용약관
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveSection('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-slate-400 transition-colors cursor-pointer"
              >
                개인정보처리방침
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
