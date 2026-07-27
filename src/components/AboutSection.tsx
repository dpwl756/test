import React from 'react';
import { Target, Eye } from 'lucide-react';
import { AboutInfo } from '../types';
import { EditableText } from './EditableText';

interface AboutSectionProps {
  aboutInfo: AboutInfo;
  setAboutInfo: (info: AboutInfo) => void;
  adminMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  aboutInfo,
  setAboutInfo,
  adminMode
}) => {
  return (
    <div className="space-y-16 py-10 animate-in fade-in duration-300">
      
      {/* Intro block */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
          ABOUT KIIN CALIBRATION
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          지속 가능한 지구 환경을 위한 스마트 계측 솔루션
        </h2>
        <div className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
          <EditableText
            value={aboutInfo.introduction}
            onChange={(val) => setAboutInfo({ ...aboutInfo, introduction: val })}
            adminMode={adminMode}
            multiline
            tagName="p"
            className="text-slate-600 text-sm leading-relaxed text-center"
          />
        </div>
      </div>

      {/* Mission & Vision Bento Style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Mission Card */}
        <div className="bg-slate-50 border border-slate-200/60 p-8 rounded-2xl relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-100/40 rounded-full flex items-center justify-center text-sky-200 group-hover:scale-110 transition-transform">
            <Target className="w-12 h-12" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-sky-500 rounded-xl text-white">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">기인교정기술원의 미션 (Mission)</h3>
          </div>
          <div className="text-slate-600 text-xs sm:text-sm leading-relaxed z-10 relative">
            <EditableText
              value={aboutInfo.mission}
              onChange={(val) => setAboutInfo({ ...aboutInfo, mission: val })}
              adminMode={adminMode}
              multiline
              tagName="p"
              className="text-slate-600 text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Vision Card */}
        <div className="bg-slate-50 border border-slate-200/60 p-8 rounded-2xl relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-100/40 rounded-full flex items-center justify-center text-sky-200 group-hover:scale-110 transition-transform">
            <Eye className="w-12 h-12" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-sky-500 rounded-xl text-white">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">기인교정기술원의 비전 (Vision)</h3>
          </div>
          <div className="text-slate-600 text-xs sm:text-sm leading-relaxed z-10 relative">
            <EditableText
              value={aboutInfo.vision}
              onChange={(val) => setAboutInfo({ ...aboutInfo, vision: val })}
              adminMode={adminMode}
              multiline
              tagName="p"
              className="text-slate-600 text-sm leading-relaxed"
            />
          </div>
        </div>
      </div>



    </div>
  );
};
