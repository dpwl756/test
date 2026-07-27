import React, { useState } from 'react';
import { Image as ImageIcon, Link2, Check, X } from 'lucide-react';

interface EditableImageProps {
  src: string;
  onChange: (newSrc: string) => void;
  adminMode: boolean;
  className?: string;
  alt?: string;
}

const IMAGE_PRESETS = [
  {
    name: '화학/연구실 장비',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    category: '실험/계측'
  },
  {
    name: '연구실 샘플 분석',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?w=800&auto=format&fit=crop&q=80',
    category: '실험/계측'
  },
  {
    name: '대기 측정/미세먼지 타워',
    url: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=800&auto=format&fit=crop&q=80',
    category: '미세먼지'
  },
  {
    name: '야외 환경 분석 시스템',
    url: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop&q=80',
    category: '미세먼지'
  },
  {
    name: '실험실 배양/테스트',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    category: '초음파'
  },
  {
    name: '친환경 스마트 팩토리',
    url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
    category: '초음파/공업'
  },
  {
    name: '수해양 측정/현장 수질',
    url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80',
    category: '실험/계측'
  },
  {
    name: '엔지니어 제품 정밀 조립',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    category: '유지보수'
  },
  {
    name: '현장 모니터링/안전 장비',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    category: '유지보수'
  }
];

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  onChange,
  adminMode,
  className = '',
  alt = '기인교정기술원 이미지'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState(src);

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onChange(customUrl);
      setIsOpen(false);
    }
  };

  const handleSelectPreset = (url: string) => {
    setCustomUrl(url);
    onChange(url);
    setIsOpen(false);
  };

  return (
    <div className="relative group overflow-hidden rounded-lg h-full w-full">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-transform duration-300 ${
          adminMode ? 'group-hover:brightness-75' : ''
        } ${className}`}
      />

      {adminMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            id={`btn-edit-image-${alt.replace(/\s+/g, '-').toLowerCase()}`}
            type="button"
            onClick={() => {
              setCustomUrl(src);
              setIsOpen(true);
            }}
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all transform translate-y-2 group-hover:translate-y-0 text-sm cursor-pointer"
          >
            <ImageIcon className="w-4 h-4" />
            이미지 변경
          </button>
        </div>
      )}

      {/* Preset / Custom URL Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in-50 duration-200 text-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-sky-500" />
                이미지 설정 및 변경
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5 overflow-y-auto max-h-[75vh]">
              {/* Custom URL Input */}
              <form onSubmit={handleApplyCustomUrl} className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  이미지 외부 URL 주소 입력
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-slate-50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    적용
                  </button>
                </div>
              </form>

              {/* Presets List */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  기인교정기술원 카테고리별 추천 이미지 프리셋 ({IMAGE_PRESETS.length}개)
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {IMAGE_PRESETS.map((preset, index) => {
                    const isSelected = src === preset.url;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`group/preset relative aspect-video rounded-md overflow-hidden border-2 text-left transition-all ${
                          isSelected ? 'border-sky-500 ring-2 ring-sky-100' : 'border-slate-100 hover:border-slate-300'
                        } cursor-pointer`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover/preset:scale-105 transition-transform"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1">
                          <p className="text-[9px] text-white/90 font-medium truncate">{preset.name}</p>
                          <span className="text-[7px] text-sky-300 font-bold uppercase">{preset.category}</span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-sky-500 text-white rounded-full p-0.5 shadow-md">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
