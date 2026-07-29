import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Printer, ClipboardCheck, Landmark, CheckCircle, Send, Navigation, HeartHandshake, FileText, Download, FileDown } from 'lucide-react';
import { CompanyInfo, Inquiry } from '../types';
import { EditableText } from './EditableText';

interface ContactSectionProps {
  companyInfo: CompanyInfo;
  setCompanyInfo: (info: CompanyInfo) => void;
  adminMode: boolean;
  onAddInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  preSelectedProductName?: string;
  clearPreSelectedProduct?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  companyInfo,
  setCompanyInfo,
  adminMode,
  onAddInquiry,
  preSelectedProductName = '',
  clearPreSelectedProduct
}) => {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(preSelectedProductName || '일반 장비 견적/유지관리');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preSelectedProductName) {
      setSelectedProduct(preSelectedProductName);
    }
  }, [preSelectedProductName]);

  const handleDownloadForm = (format: 'hwp' | 'docx' | 'pdf') => {
    if (format === 'hwp') {
      window.open('https://drive.google.com/file/d/1ShRDqtQ48qVfGZxcJXzLJN19debYoNNx/view?usp=sharing', '_blank');
      return;
    }
    const content = `===============================================================
[공식] KOLAS 표준 계측기 교정 및 성적서 발급 의뢰서 (${format.toUpperCase()})
===============================================================

1. 의뢰인 및 신청 기관 정보
---------------------------------------------------------------
- 신청 회사/기관명 : [                             ]
- 사업자등록번호   : [                             ]
- 대표자명         : [                             ]
- 담당자 성함/직급 : [                             ]
- 직통 전화번호     : [                             ]
- 회신 이메일 주소 : [                             ]
- 주소 (성적서 수령): [                             ]

2. 교정 대상 계측 장비 명세
---------------------------------------------------------------
순번 | 장비명/품명 | 제조사 | 모델명 | 시리얼번호(S/N) | 수량 | 희망 교정일
---------------------------------------------------------------
 1  |             |        |        |                 |      |
 2  |             |        |        |                 |      |
 3  |             |        |        |                 |      |
 4  |             |        |        |                 |      |
 5  |             |        |        |                 |      |

3. 성적서 및 교정 요청 조건
---------------------------------------------------------------
[ ] KOLAS 공인 교정 성적서 발급 요청
[ ] 국문 성적서  [ ] 영문 성적서  [ ] 둘 다 필요
[ ] 정기 출장 정밀 교정 (현장 방문 요청)
[ ] 입고 교정 (연구실 택배/직접 입고)
[ ] 긴급 처리 요청 (3 영업일 이내)

4. 세부 요청사항 및 현장 특이사항
---------------------------------------------------------------
[                                                             ]
[                                                             ]

---------------------------------------------------------------
위와 같이 계측 장비 교정 및 성적서 발급을 공식 의뢰합니다.

신청일자 : 2026년    월    일
신 청 인 :                        (서명 또는 인)

접수처 : (주)기인교정기술원 연구소
전  화 : ${companyInfo.phone}  |  팩  스 : ${companyInfo.fax}
이메일 : ${companyInfo.email}
===============================================================`;

    let mimeType = 'text/plain;charset=utf-8';
    let extension = format;
    if (format === 'docx') {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (format === 'pdf') {
      mimeType = 'application/pdf';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KOLAS_교정_및_성적서_발급_의뢰서_양식.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !content.trim()) {
      alert('필수 입력 항목을 모두 작성해 주세요.');
      return;
    }

    if (!agreePrivacy) {
      alert('개인정보 수집 및 이용에 동의하셔야 공식 신청서 전송이 가능합니다. 동의란에 체크 후에 다시 신청해 주시기 바랍니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('https://formspree.io/f/xjgqqeep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          company: company || '개인/일반',
          productName: selectedProduct,
          content,
          type: '일반 문의 및 교정 의뢰'
        })
      });
    } catch (error) {
      console.error('Formspree submission error:', error);
    }

    onAddInquiry({
      name,
      email,
      phone,
      company: company || '개인/일반',
      productName: selectedProduct,
      content
    });

    setIsSubmitting(false);
    setFormSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setContent('');
    setAgreePrivacy(false);
    if (clearPreSelectedProduct) clearPreSelectedProduct();

    // Clear success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000);
  };

  return (
    <div className="space-y-8 py-10 animate-in fade-in duration-300">
      
      {/* Top Banner: Download Calibration Request Form Templates */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-lg border border-sky-700/50 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-1.5 z-10">
            <div className="flex items-center gap-2">
              <span className="bg-sky-500/20 text-sky-300 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-sky-400/30 flex items-center gap-1">
                <FileDown className="w-3.5 h-3.5 text-sky-400" />
                공식 교정 의뢰서 양식 다운로드
              </span>
              <span className="text-xs text-slate-300 hidden sm:inline">사내 결재 / 서면 제출용 서식</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              KOLAS 계측기 교정 및 성적서 발급 신청서 양식
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              온라인 접수 외에 사내 결재, 서면 제출, 또는 이메일 접수({companyInfo.email})를 원하시는 경우, 아래 원하시는 서식 파일(HWP / DOCX / PDF)을 다운로드하여 사용하실 수 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap z-10">
            <a
              id="btn-download-form-hwp"
              href="https://drive.google.com/file/d/1ShRDqtQ48qVfGZxcJXzLJN19debYoNNx/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md hover:shadow-sky-500/20 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              HWP 양식 다운
            </a>
            <button
              id="btn-download-form-docx"
              type="button"
              onClick={() => handleDownloadForm('docx')}
              className="bg-slate-800 hover:bg-slate-700 text-sky-300 font-extrabold text-xs px-3.5 py-2.5 rounded-xl border border-sky-500/30 transition-all flex items-center gap-1.5 hover:border-sky-400 active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              DOCX 양식 다운
            </button>
            <button
              id="btn-download-form-pdf"
              type="button"
              onClick={() => handleDownloadForm('pdf')}
              className="bg-slate-800 hover:bg-slate-700 text-rose-300 font-extrabold text-xs px-3.5 py-2.5 rounded-xl border border-rose-500/30 transition-all flex items-center gap-1.5 hover:border-rose-400 active:scale-95 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-rose-400" />
              PDF 양식 다운
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
        
        {/* Left column: Contact Info & Interactive Simulated Map Card */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                CALIBRATION SERVICE REQUEST
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                공식 장비 교정 견적 및 성적서 발급 의뢰
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                교정 혹은 정밀 성능 점검이 필요한 계측 장비의 제조사, 모델명, 수량을 입력해 주시면, 담당 교정 연구팀이 사양을 세부 검토하여 영업시간(월~금 09:00~18:00) 내에 신속하게 견적서와 상세 절차 안내서를 회신해 드립니다.
              </p>
            </div>

            {/* Coordinates Grid list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/40">
                <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
                <div className="space-y-1">
                  <span className="font-bold block text-slate-900">본사 및 연구실 주소</span>
                  <p className="text-slate-500 leading-normal">
                    <EditableText
                      value={companyInfo.address}
                      onChange={(val) => setCompanyInfo({ ...companyInfo, address: val })}
                      adminMode={adminMode}
                      multiline
                      tagName="span"
                      className="text-slate-500"
                    />
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/40">
                <Phone className="w-5 h-5 text-sky-500 shrink-0" />
                <div className="space-y-1">
                  <span className="font-bold block text-slate-900">기술영업 및 긴급출동</span>
                  <p className="text-slate-500 leading-normal font-mono text-[11px]">
                    전화: <EditableText
                      value={companyInfo.phone}
                      onChange={(val) => setCompanyInfo({ ...companyInfo, phone: val })}
                      adminMode={adminMode}
                      tagName="span"
                      className="text-slate-500 font-mono"
                    /><br />
                    팩스: <EditableText
                      value={companyInfo.fax}
                      onChange={(val) => setCompanyInfo({ ...companyInfo, fax: val })}
                      adminMode={adminMode}
                      tagName="span"
                      className="text-slate-500 font-mono"
                    />
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/40">
                <Mail className="w-5 h-5 text-sky-500 shrink-0" />
                <div className="space-y-1">
                  <span className="font-bold block text-slate-900">이메일 문의 접수</span>
                  <p className="text-slate-500 leading-normal font-mono text-[11px]">
                    <EditableText
                      value={companyInfo.email}
                      onChange={(val) => setCompanyInfo({ ...companyInfo, email: val })}
                      adminMode={adminMode}
                      tagName="span"
                      className="text-slate-500 font-mono"
                    />
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/40">
                <Landmark className="w-5 h-5 text-sky-500 shrink-0" />
                <div className="space-y-1">
                  <span className="font-bold block text-slate-900">기업 기본 정보</span>
                  <p className="text-slate-500 leading-normal">
                    CEO: <EditableText
                      value={companyInfo.ceo}
                      onChange={(val) => setCompanyInfo({ ...companyInfo, ceo: val })}
                      adminMode={adminMode}
                      tagName="span"
                      className="text-slate-500"
                    /><br />
                    사업자번호: <EditableText
                      value={companyInfo.businessNo}
                      onChange={(val) => setCompanyInfo({ ...companyInfo, businessNo: val })}
                      adminMode={adminMode}
                      tagName="span"
                      className="text-slate-500 font-mono text-[10px]"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulated Map Card */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg relative h-48 sm:h-56">
            {/* Simulated Vector Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-radial-at-c from-sky-900/10 via-slate-900/80 to-slate-950" />
            
            {/* Simulated map graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <span className="absolute inline-flex h-8 w-8 rounded-full bg-sky-500 opacity-30 animate-ping" />
                <span className="relative flex h-4 w-4 rounded-full bg-sky-500 border-2 border-white shadow-md shadow-sky-500" />
              </div>
              <div className="bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-lg text-white text-[10px] font-bold mt-2 shadow-xl whitespace-nowrap">
                {companyInfo.name} 본사
              </div>
            </div>

            {/* Simulated Route Line */}
            <svg className="absolute inset-0 w-full h-full stroke-sky-500/20 stroke-[1.5] stroke-dasharray-[4_4]" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50 150 Q 150 100 250 120 T 450 60" fill="none" />
            </svg>

            {/* Map metadata display */}
            <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-slate-400 text-[9px] font-mono border border-slate-800 flex items-center gap-1.5">
              <Navigation className="w-2.5 h-2.5 text-sky-400" />
              <span>N 37.4789 / E 126.8791 (가산디지털단지 에이스하이엔드타워)</span>
            </div>

            <a
              id="link-external-map"
              href="https://map.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-[10px] px-3 py-1 rounded transition-colors shadow flex items-center gap-1"
            >
              네이버/카카오 지도 열기
            </a>
          </div>
        </div>

        {/* Right column: Online Inquiry Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-800 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-sky-500 shrink-0" />
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">KOLAS 표준 계측기 교정 및 성적서 발급 의뢰서</h3>
              </div>
              <div className="flex items-center gap-1.5 self-start sm:self-auto text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200/80">
                <span className="text-slate-500 font-medium">양식 다운로드:</span>
                <a href="https://drive.google.com/file/d/1ShRDqtQ48qVfGZxcJXzLJN19debYoNNx/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 hover:underline font-extrabold cursor-pointer">HWP</a>
                <span className="text-sky-300">•</span>
                <button type="button" onClick={() => handleDownloadForm('docx')} className="hover:text-sky-600 hover:underline font-extrabold cursor-pointer">DOCX</button>
                <span className="text-sky-300">•</span>
                <button type="button" onClick={() => handleDownloadForm('pdf')} className="hover:text-sky-600 hover:underline font-extrabold cursor-pointer">PDF</button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">의뢰인 / 담당자 성함 <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동 연구원 / 과장"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">소속 회사 / 기관·대학명 <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="한국환경연구원 또는 (주)기인교정기술원"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">회신용 이메일 주소 <span className="text-rose-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@co.kr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">직통 연락처 <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-5555-5678"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">교정 대상 계측기 / 시료채취 장치</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none font-semibold text-slate-700"
                >
                  <option value="일반 장비 견적/유지관리">일반 계측기 국가 표준 교정 및 성적서 발급</option>
                  <option value="다항목 수질 연속 측정기 WQ-80">다항목 수질 연속 측정기 WQ-80 (수질 센서 전극 교정)</option>
                  <option value="포터블 복합 가스 분석기 MX6-iBrid">포터블 복합 가스 분석기 MX6-iBrid (가스 검교정/센서 교체)</option>
                  <option value="대기질 고정밀 미세먼지 측정기 PM-2.5">대기질 고정밀 초미세먼지 측정기 PM-2.5 Beta (유량/농도 교정)</option>
                  <option value="대용량 미세먼지 샘플러 HV-1000F">대용량 미세먼지 샘플러 HV-1000F (대기 포집 유량 교정)</option>
                  <option value="실험실용 디지털 초음파 파쇄기 UHD-500">실험실용 디지털 초음파 파쇄기 UHD-500 (출력 진동수 정밀 점검)</option>
                  <option value="산업용 대용량 초음파 분산기 UHD-2000">산업용 대용량 초음파 분산기 UHD-2000 (출력 캘리브레이션)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">교정 대상 수량, 의뢰 모델명 및 세부 요청사항 <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="예: 다항목 수질연속측정기 WQ-80 3대 국가 공인 표준 교정 및 성적서 발급 신청합니다. 정기 주기(12개월) 도래로 인한 신속 접수 및 출장 교정 일정이 가능한지 답변 부탁드립니다."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none resize-none"
                />
              </div>

              {/* 개인정보 수집 및 이용 동의 */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">개인정보 수집 및 이용 동의</div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[10px] text-slate-500 leading-relaxed overflow-y-auto h-28 max-h-28 space-y-2">
                  <p className="font-semibold text-slate-600">회사는 견적 문의 및 상담 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.</p>
                  
                  <div>
                    <span className="font-bold text-slate-700 block">■ 수집 항목</span>
                    <p className="text-slate-600">회사명, 담당자명, 이메일 주소, 연락처, 상담 대상 장비군, 상세 상담 및 의뢰 요청 내용</p>
                  </div>
                  
                  <div>
                    <span className="font-bold text-slate-700 block">■ 수집 및 이용 목적</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      <li>견적 문의 접수 및 상담 진행</li>
                      <li>문의 내용 확인 및 답변 제공</li>
                      <li>견적서 작성 및 계약 관련 안내</li>
                      <li>고객 요청 사항 처리 및 서비스 제공</li>
                    </ul>
                  </div>
                  
                  <div>
                    <span className="font-bold text-slate-700 block">■ 보유 및 이용 기간</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      <li>원활한 상담 서비스 제공 및 상담 이력 관리를 위해 상담 완료 후 3개월간 개인정보를 보유·이용할 수 있습니다.</li>
                      <li>보유 기간이 경과하거나 수집 및 이용 목적이 달성된 경우에는 지체 없이 개인정보를 파기합니다.</li>
                      <li>다만, 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관계 법령에 따라 보존할 필요가 있는 경우에는 해당 법령에서 정한 기간 동안 개인정보를 보관합니다.</li>
                      <li>별도의 계약이 체결되는 경우에는 관련 법령 및 계약에 따른 보관 기간을 적용합니다.</li>
                    </ul>
                  </div>
                  
                  <p className="text-slate-500 border-t border-slate-200/60 pt-1 text-[9px]">
                    ※ 귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 필수 개인정보 수집 및 이용에 동의하지 않을 경우 견적 문의 접수 및 상담 서비스 이용이 제한될 수 있습니다.
                  </p>
                </div>
                
                <label className="flex items-center gap-2 cursor-pointer py-1 select-none">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <span className="text-[11px] font-bold text-slate-700">위 개인정보의 수집 및 이용에 동의합니다. <span className="text-rose-500">*</span></span>
                </label>
              </div>

              <button
                id="btn-submit-contact-form"
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'} text-white font-extrabold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer`}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? '공식 신청서 전송 중...' : '공식 교정 및 견적 신청서 전송'}
              </button>
            </form>
          </div>

          {/* Success Dialog Notification */}
          {formSubmitted && (
            <div className="mt-4 bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3 text-xs text-emerald-800 animate-in fade-in duration-150">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold">성공적으로 견적 의뢰가 접수되었습니다!</span>
                <p className="text-emerald-600 text-[11px]">작성하신 사양 및 정보는 국가 표준 DB 세션에 등록되어 담당 기술영업팀에 실시간 전송되었습니다. 검토 후 신속히 연락해 드리겠습니다.</p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
