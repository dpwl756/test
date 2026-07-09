import React from 'react';
import { Edit3 } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  adminMode: boolean;
  multiline?: boolean;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  adminMode,
  multiline = false,
  className = '',
  tagName = 'span'
}) => {
  if (!adminMode) {
    const Tag = tagName as any;
    // Replace newlines with <br /> for paragraphs/divs
    if (multiline && (tagName === 'p' || tagName === 'div')) {
      return (
        <Tag className={className}>
          {value.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < value.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </Tag>
      );
    }
    return <Tag className={className}>{value}</Tag>;
  }

  // Admin Mode: Render inline input/textarea with distinct editable indicator
  const inputBaseStyle = "w-full bg-sky-50/70 border border-sky-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded px-1.5 py-0.5 transition-colors duration-150 outline-none";
  
  return (
    <div className="relative group w-full">
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBaseStyle} ${className} resize-y min-h-[80px] font-inherit`}
          rows={Math.max(2, value.split('\n').length)}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBaseStyle} ${className} font-inherit`}
        />
      )}
      <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-sky-500 text-white p-0.5 rounded text-[10px] flex items-center gap-1 shadow-sm z-10">
        <Edit3 className="w-2.5 h-2.5" />
        <span>편집 중</span>
      </div>
    </div>
  );
};
