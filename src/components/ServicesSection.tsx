import React, { useState } from 'react';
import { ShieldCheck, Settings2, Calculator, ArrowRight, CheckCircle, Wrench, FileCheck, PhoneCall } from 'lucide-react';
import { ServiceItem, Inquiry } from '../types';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';

interface ServicesSectionProps {
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  adminMode: boolean;
  onAddInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  setServices,
  adminMode,
  onAddInquiry
}) => {
  // Calculator States
  const [eqType, setEqType] = useState<'water' | 'dust' | 'ultrasonic'>('water');
  const [quantity, setQuantity] = useState<number>(1);
  const [includeCertificate, setIncludeCertificate] = useState<boolean>(true);
  const [isExpress, setIsExpress] = useState<boolean>(false);
  
  // Service Booking Form States
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateServiceText = (id: string, field: keyof ServiceItem, value: any) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleUpdateServiceDetail = (id: string, detailIdx: number, value: string) => {
    setServices(prev => prev.map(s => {
      if (s.id === id) {
        const updatedDetails = [...s.details];
        updatedDetails[detailIdx] = value;
        return { ...s, details: updatedDetails };
      }
      return s;
    }));
  };

  // Pricing constants
  const prices = {
    water: 150000, // 150,000 KRW
    dust: 250000,
    ultrasonic: 200000
  };

  const basePrice = prices[eqType] * quantity;
  const certPrice = includeCertificate ? 80000 * quantity : 0;
  const expressPrice = isExpress ? 50000 : 0;
  const totalPrice = basePrice + certPrice + expressPrice;

  const handleBookService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !clientCompany.trim()) {
      alert('모든 필수 정보를 입력해 주세요.');
      return;
    }

    const eqTypeName = 
      eqType === 'water' ? '수질 연속 측정기' :
      eqType === 'dust' ? '미세먼지 샘플러/측정기' :
      '초음파 파쇄기 UHD';

    const bookingContent = `[KOLAS 교정 및 정기 예방 유지보수 신청]\n대항 장비: ${eqTypeName} (${quantity}대)\nKOLAS 성적서: ${includeCertificate ? '필요' : '미발급(자체필증)'}\n긴급 빠른처리: ${isExpress ? '요청(+5만)' : '일반(3~5 영업일)'}\n예상 청구 비용: ${totalPrice.toLocaleString()} 원\n신청 내용: 현장 출장 정밀 교정 및 임피던스/유량 조율을 신청합니다.`;

    setIsSubmitting(true);

    try {
      await fetch('https://formspree.io/f/xjgqqeep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: clientName,
          company: clientCompany,
          phone: clientPhone,
          email: `${clientCompany.replace(/\s+/g, '').toLowerCase()}@wooriservice.co.kr`,
          productName: `${eqTypeName} 교정케어`,
          content: bookingContent,
          type: '실시간 계산기 교정 접수'
        })
      });
    } catch (error) {
      console.error('Formspree booking submission error:', error);
    }

    onAddInquiry({
      name: clientName,
      phone: clientPhone,
      company: clientCompany,
      email: `${clientCompany.replace(/\s+/g, '').toLowerCase()}@wooriservice.co.kr`,
      productName: `${eqTypeName} 교정케어`,
      content: bookingContent
    });

    setIsSubmitting(false);
    setBookingSuccess(true);
    setClientName('');
    setClientPhone('');
    setClientCompany('');

    setTimeout(() => {
      setBookingSuccess(false);
    }, 5000);
  };

  return (
    <div className="space-y-16 py-10 animate-in fade-in duration-300">
      
      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
          MAINTENANCE & CALIBRATION
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          국가 교정 기준에 부합하는 철저한 유지보수 서비스
        </h2>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">
          기인교정기술원은 연구원분들이 사용 중인 계측기 및 파쇄 장비의 최고 수준의 정확성 보존과 KOLAS 국가 표준 연계 교정, 센서 영점 복원, 프로브 성능 조율을 전문으로 합니다.
        </p>
      </div>

      {/* Services Cards list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((srv) => (
          <div key={srv.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <EditableImage
                src={srv.imageUrl}
                onChange={(newSrc) => handleUpdateServiceText(srv.id, 'imageUrl', newSrc)}
                adminMode={adminMode}
                alt={srv.title}
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-900 text-base">
                  <EditableText
                    value={srv.title}
                    onChange={(val) => handleUpdateServiceText(srv.id, 'title', val)}
                    adminMode={adminMode}
                    tagName="span"
                    className="font-extrabold text-slate-900 text-base"
                  />
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  <EditableText
                    value={srv.desc}
                    onChange={(val) => handleUpdateServiceText(srv.id, 'desc', val)}
                    adminMode={adminMode}
                    multiline
                    tagName="span"
                    className="text-slate-500 text-xs leading-relaxed"
                  />
                </p>
              </div>

              {/* Bullet points checklist */}
              <ul className="space-y-2 pt-4 border-t border-slate-100">
                {srv.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2 text-[11px] text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                    <EditableText
                      value={detail}
                      onChange={(val) => handleUpdateServiceDetail(srv.id, dIdx, val)}
                      adminMode={adminMode}
                      tagName="span"
                      className="text-slate-600"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive KOLAS Calibration Estimate Calculator */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white max-w-5xl mx-auto border border-slate-800 shadow-xl flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Side: Calculator Setup */}
        <div className="lg:w-3/5 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400">
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">KOLAS Calibration Calculator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">계측 장비 정밀 교정비 실시간 계산기</h3>
            <p className="text-slate-400 text-xs">장비 유형과 대수, 옵션을 선택하면 투명한 예상 견적을 즉시 산출하고 예약할 수 있습니다.</p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Step 1: Equipment type */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">1단계: 계측 장비 유형 선택</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setEqType('water')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    eqType === 'water' ? 'border-sky-500 bg-sky-950/40 text-white' : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold">수질 종합 계측기</span>
                  <span className="text-[10px] text-slate-500 mt-1 font-mono">150,000원 / 대</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEqType('dust')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    eqType === 'dust' ? 'border-sky-500 bg-sky-950/40 text-white' : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold">미세먼지 샘플러/측정기</span>
                  <span className="text-[10px] text-slate-500 mt-1 font-mono">250,000원 / 대</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEqType('ultrasonic')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    eqType === 'ultrasonic' ? 'border-sky-500 bg-sky-950/40 text-white' : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold">초음파 균질기/파쇄기</span>
                  <span className="text-[10px] text-slate-500 mt-1 font-mono">200,000원 / 대</span>
                </button>
              </div>
            </div>

            {/* Step 2: Quantity slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>2단계: 교정 신청 대수 설정</span>
                <span className="text-sky-400 font-mono">{quantity} 대</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>1대</span>
                <span>10대</span>
                <span>20대</span>
              </div>
            </div>

            {/* Step 3: Options checklist */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">3단계: 추가 교정 사양 및 케어 옵션</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* KOLAS Certificate */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeCertificate}
                      onChange={(e) => setIncludeCertificate(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-800 text-sky-500 focus:ring-sky-500 bg-slate-900"
                    />
                    <div className="text-left">
                      <span className="font-bold block text-xs">KOLAS 공인성적서 발급</span>
                      <span className="text-[9px] text-slate-500">대당 +80,000원 청구</span>
                    </div>
                  </div>
                </label>

                {/* Express service */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isExpress}
                      onChange={(e) => setIsExpress(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-800 text-sky-500 focus:ring-sky-500 bg-slate-900"
                    />
                    <div className="text-left">
                      <span className="font-bold block text-xs">긴급 24시간 당일 처리</span>
                      <span className="text-[9px] text-slate-500">건당 일시불 +50,000원 청구</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quote Receipt & Booking Form */}
        <div className="lg:w-2/5 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold text-sky-400 bg-sky-950 border border-sky-900/40 px-2.5 py-1 rounded-full uppercase tracking-widest block text-center">
              ESTIMATE RECEIPT
            </span>
            
            {/* Bill Details */}
            <div className="space-y-2 text-xs border-b border-slate-800 pb-4">
              <div className="flex justify-between text-slate-400">
                <span>기본 교정 정비비 ({quantity}대)</span>
                <span className="font-mono text-white">{(prices[eqType] * quantity).toLocaleString()} 원</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>KOLAS 인증 수수료</span>
                <span className="font-mono text-white">{certPrice.toLocaleString()} 원</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>긴급 익스프레스 할증</span>
                <span className="font-mono text-white">{expressPrice.toLocaleString()} 원</span>
              </div>
            </div>

            {/* Total Price Display */}
            <div className="flex justify-between items-center py-2">
              <span className="text-xs font-bold text-slate-300">총 예상 견적 합계</span>
              <span className="text-xl font-extrabold text-sky-400 font-mono">{totalPrice.toLocaleString()} 원</span>
            </div>

            {/* Service quick booking form */}
            <form onSubmit={handleBookService} className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="의뢰 회사명/기관명"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded px-3 py-2 text-white outline-none"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="담당자 이름"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded px-3 py-2 text-white outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="연락처 (예: 010-1234-5678)"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded px-3 py-2 text-white outline-none"
                  required
                />
              </div>

              <button
                id="btn-submit-service-calc"
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-sky-500 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'} text-white font-bold py-2.5 rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs mt-2`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                {isSubmitting ? '교정 예약 접수 중...' : '이 견적으로 즉시 교정 예약 접수'}
              </button>
            </form>
          </div>

          {/* Success toast inside widget */}
          {bookingSuccess && (
            <div className="bg-emerald-950/60 border border-emerald-900/50 p-2.5 rounded-xl text-[10px] text-emerald-400 leading-relaxed text-center flex items-center gap-2 justify-center animate-bounce">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>교정 예약 신청이 접수되었습니다! 어드민 대시보드에서 수신 내역을 확인하세요.</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
