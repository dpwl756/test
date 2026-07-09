import React, { useState } from 'react';
import { Settings, Palette, Globe, Share2, Building, X, Check, RefreshCw } from 'lucide-react';
import { SEOConfig, SocialLinks, CompanyInfo, AppConfig } from '../types';

interface AdminSidebarProps {
  appConfig: AppConfig;
  setAppConfig: (config: AppConfig) => void;
  seoConfig: SEOConfig;
  setSeoConfig: (seo: SEOConfig) => void;
  socialLinks: SocialLinks;
  setSocialLinks: (socials: SocialLinks) => void;
  companyInfo: CompanyInfo;
  setCompanyInfo: (info: CompanyInfo) => void;
  onReset: () => void;
}

const ACCENT_COLORS = [
  { name: '스카이 블루 (기본)', hex: '#0284c7', bgClass: 'bg-sky-600' },
  { name: '트러스트 블루', hex: '#1d4ed8', bgClass: 'bg-blue-700' },
  { name: '에코 그린', hex: '#047857', bgClass: 'bg-emerald-700' },
  { name: '딥 차콜', hex: '#1f2937', bgClass: 'bg-slate-800' },
  { name: '테크 아웃핏', hex: '#4f46e5', bgClass: 'bg-indigo-600' },
  { name: '머스타드 옐로우', hex: '#b45309', bgClass: 'bg-amber-700' },
];

const FONTS = [
  { id: 'sans', name: '현대적인 고딕 (Inter / Sans)' },
  { id: 'serif', name: '우아한 명조 (Playfair / Serif)' },
  { id: 'mono', name: '테크니컬 모노 (Fira / Mono)' },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  appConfig,
  setAppConfig,
  seoConfig,
  setSeoConfig,
  socialLinks,
  setSocialLinks,
  companyInfo,
  setCompanyInfo,
  onReset
}) => {
  const [activeTab, setActiveTab] = useState<'design' | 'seo' | 'social' | 'company'>('design');
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        id="btn-open-sidebar"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 bottom-4 z-40 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-2 transition-transform duration-200 animate-bounce cursor-pointer"
        title="디자인 커스텀 패널 열기"
      >
        <Settings className="w-5 h-5 animate-spin-slow" />
        <span className="text-xs font-semibold pr-1">설정 패널</span>
      </button>
    );
  }

  return (
    <div className="fixed left-4 top-24 bottom-4 w-80 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 z-40 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
      {/* Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-sky-400" />
          <span className="font-bold text-sm tracking-tight text-white">우리회사 사이트 편집기</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onReset}
            className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
            title="초기값으로 리셋"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 bg-slate-950/50 border-b border-slate-800 text-[11px] font-medium text-slate-400">
        <button
          type="button"
          onClick={() => setActiveTab('design')}
          className={`py-2.5 border-b-2 transition-colors flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'design' ? 'border-sky-500 text-white bg-slate-900/40' : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          디자인
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`py-2.5 border-b-2 transition-colors flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'seo' ? 'border-sky-500 text-white bg-slate-900/40' : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          SEO 설정
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`py-2.5 border-b-2 transition-colors flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'social' ? 'border-sky-500 text-white bg-slate-900/40' : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          소셜 연동
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('company')}
          className={`py-2.5 border-b-2 transition-colors flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'company' ? 'border-sky-500 text-white bg-slate-900/40' : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          기업 정보
        </button>
      </div>

      {/* Content Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-slate-300">
        
        {/* DESIGN TAB */}
        {activeTab === 'design' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Color accent selection */}
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">대표 브랜드 컬러 선택</h4>
              <div className="grid grid-cols-2 gap-2">
                {ACCENT_COLORS.map((color) => {
                  const isSelected = appConfig.accentColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setAppConfig({ ...appConfig, accentColor: color.hex })}
                      className={`flex items-center gap-2 p-2 rounded-lg bg-slate-800 border transition-all text-left cursor-pointer ${
                        isSelected ? 'border-sky-500 ring-1 ring-sky-500/30' : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${color.bgClass} flex items-center justify-center`}>
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      <span className="text-[10px] text-slate-200 truncate">{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Family selection */}
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">웹사이트 폰트 스타일</h4>
              <div className="space-y-1.5">
                {FONTS.map((font) => {
                  const isSelected = appConfig.fontFamily === font.id;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => setAppConfig({ ...appConfig, fontFamily: font.id as any })}
                      className={`w-full flex items-center justify-between p-2 rounded-lg bg-slate-800 border transition-all text-left cursor-pointer ${
                        isSelected ? 'border-sky-500 bg-sky-950/20' : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-slate-200">{font.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hint Box */}
            <div className="bg-sky-950/40 border border-sky-900/50 p-2.5 rounded-lg text-slate-400 leading-relaxed">
              <span className="font-semibold text-sky-400">💡 팁: </span>
              어드민 모드에서는 화면 상의 <strong>모든 텍스트를 클릭</strong>해 직접 변경할 수 있습니다. 상단 메뉴나 제품 카드의 이미지 역시 마우스를 올리면 변경할 수 있습니다.
            </div>
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === 'seo' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">메타 타이틀 (SEO Title)</label>
              <input
                type="text"
                value={seoConfig.title}
                onChange={(e) => setSeoConfig({ ...seoConfig, title: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">메타 설명 (SEO Description)</label>
              <textarea
                value={seoConfig.description}
                onChange={(e) => setSeoConfig({ ...seoConfig, description: e.target.value })}
                rows={4}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs resize-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">검색 키워드 (Keywords)</label>
              <input
                type="text"
                value={seoConfig.keywords}
                onChange={(e) => setSeoConfig({ ...seoConfig, keywords: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
                placeholder="콤마(,)로 구분"
              />
            </div>
          </div>
        )}

        {/* SOCIAL TAB */}
        {activeTab === 'social' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Facebook</label>
              <input
                type="url"
                value={socialLinks.facebook}
                onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">LinkedIn</label>
              <input
                type="url"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">YouTube</label>
              <input
                type="url"
                value={socialLinks.youtube}
                onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Instagram</label>
              <input
                type="url"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
          </div>
        )}

        {/* COMPANY TAB */}
        {activeTab === 'company' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">회사명</label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">대표이사</label>
              <input
                type="text"
                value={companyInfo.ceo}
                onChange={(e) => setCompanyInfo({ ...companyInfo, ceo: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">사업자 등록번호</label>
              <input
                type="text"
                value={companyInfo.businessNo}
                onChange={(e) => setCompanyInfo({ ...companyInfo, businessNo: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">본사 주소</label>
              <input
                type="text"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">대표 전화</label>
              <input
                type="text"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">대표 팩스</label>
              <input
                type="text"
                value={companyInfo.fax}
                onChange={(e) => setCompanyInfo({ ...companyInfo, fax: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">대표 이메일</label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-950 px-4 py-2 text-[10px] text-slate-500 flex items-center justify-between border-t border-slate-800">
        <span>어드민 세션 활성화 중</span>
        <span>v1.0.0</span>
      </div>
    </div>
  );
};
