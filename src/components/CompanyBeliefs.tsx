import React from 'react';
import { ShieldCheck, Flame, Users, Sparkles, Compass, Lightbulb, GraduationCap } from 'lucide-react';
import { EditableText } from './EditableText';

export interface BeliefItem {
  id: string;
  title: string;
  desc: string;
}

export interface CompanyBeliefsData {
  title: string;
  subtitle: string;
  introText: string;
  beliefs: BeliefItem[];
}

interface CompanyBeliefsProps {
  data: CompanyBeliefsData;
  onChange: (newData: CompanyBeliefsData) => void;
  adminMode: boolean;
}

export const CompanyBeliefs: React.FC<CompanyBeliefsProps> = ({
  data,
  onChange,
  adminMode
}) => {
  const handleUpdateField = (field: keyof CompanyBeliefsData, val: any) => {
    onChange({
      ...data,
      [field]: val
    });
  };

  const handleUpdateBelief = (index: number, field: 'title' | 'desc', val: string) => {
    const updatedBeliefs = [...data.beliefs];
    updatedBeliefs[index] = {
      ...updatedBeliefs[index],
      [field]: val
    };
    onChange({
      ...data,
      beliefs: updatedBeliefs
    });
  };

  // Pre-configured icons for the 3 beliefs
  const icons = [
    <ShieldCheck className="w-6 h-6 text-sky-600" />,
    <Users className="w-6 h-6 text-emerald-600" />,
    <Sparkles className="w-6 h-6 text-amber-600" />
  ];

  const iconContainers = [
    "bg-sky-50 text-sky-600 border border-sky-100",
    "bg-emerald-50 text-emerald-600 border border-emerald-100",
    "bg-amber-50 text-amber-600 border border-amber-100"
  ];

  return (
    <section id="company-beliefs-section" className="bg-slate-50 border-t border-b border-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-100/75 px-3 py-1 rounded-full border border-sky-200/50">
            <Compass className="w-3.5 h-3.5" />
            Corporate Philosophy & Intro
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            <EditableText
              value={data.title}
              onChange={(val) => handleUpdateField('title', val)}
              adminMode={adminMode}
              tagName="span"
              className="font-black text-slate-900"
            />
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-500 font-semibold tracking-wide">
            <EditableText
              value={data.subtitle}
              onChange={(val) => handleUpdateField('subtitle', val)}
              adminMode={adminMode}
              tagName="span"
              className="text-slate-500"
            />
          </p>
        </div>

        {/* Section 1: Detailed Company Introduction */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 p-6 sm:p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Visual Brand Tag */}
            <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                KIIN
              </div>
              <div>
                <span className="block text-xs font-extrabold text-slate-900">기인교정기술원</span>
                <span className="block text-[9px] text-slate-400 font-mono uppercase tracking-wider font-bold">ESTD 2010</span>
              </div>
            </div>

            {/* Long narrative intro */}
            <div className="md:col-span-3 text-slate-600 text-xs sm:text-sm leading-relaxed text-center md:text-left space-y-1">
              <EditableText
                value={data.introText}
                onChange={(val) => handleUpdateField('introText', val)}
                adminMode={adminMode}
                multiline={true}
                tagName="p"
                className="text-slate-600 text-xs sm:text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Three Pillars of Corporate Beliefs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {data.beliefs.map((belief, index) => (
            <div
              key={belief.id}
              className="bg-white border border-slate-200/60 hover:border-slate-300 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div className="space-y-4">
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-transform group-hover:scale-105 ${iconContainers[index % iconContainers.length]}`}>
                  {icons[index % icons.length]}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                    <span className="text-sky-500 font-mono text-sm">0{index + 1}.</span>
                    <EditableText
                      value={belief.title}
                      onChange={(val) => handleUpdateBelief(index, 'title', val)}
                      adminMode={adminMode}
                      tagName="span"
                      className="font-black text-slate-900"
                    />
                  </h3>
                  
                  <div className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    <EditableText
                      value={belief.desc}
                      onChange={(val) => handleUpdateBelief(index, 'desc', val)}
                      adminMode={adminMode}
                      multiline={true}
                      tagName="p"
                      className="text-slate-500 text-xs sm:text-sm leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Little Accent indicator at the bottom */}
              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-[10px] font-bold text-slate-400 font-mono">
                <span>COMMITMENT TO EXCELLENCE</span>
                <span className="theme-accent-text group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
