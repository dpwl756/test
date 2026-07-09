import React, { useState } from 'react';
import { Search, FileText, ChevronRight, Eye, Calendar, User, Newspaper } from 'lucide-react';
import { NoticePost } from '../types';
import { EditableText } from './EditableText';

interface NoticeSectionProps {
  notices: NoticePost[];
  setNotices: React.Dispatch<React.SetStateAction<NoticePost[]>>;
  adminMode: boolean;
}

export const NoticeSection: React.FC<NoticeSectionProps> = ({
  notices,
  setNotices,
  adminMode
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [activeNotice, setActiveNotice] = useState<NoticePost | null>(null);

  const categories = ['전체', '공지사항', '보도자료', '기술자료', '제품매뉴얼'];

  const handleOpenNotice = (post: NoticePost) => {
    // Increment local view count for fidelity
    setNotices(prev => prev.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p));
    setActiveNotice({ ...post, views: post.views + 1 });
  };

  const filteredNotices = notices.filter(post => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 py-10 animate-in fade-in duration-300">
      
      {/* Search and Category Filter Panel */}
      <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Category horizontal scroll */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              id={`btn-notice-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input field */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="제목, 본문 키워드 검색..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-slate-800"
          />
        </div>
      </div>

      {/* Notices List Table-Style Grid */}
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100">
          {filteredNotices.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              검색 조건이나 해당 카테고리에 일치하는 게시물이 존재하지 않습니다.
            </div>
          ) : (
            filteredNotices.map((post) => (
              <button
                id={`btn-open-notice-${post.id}`}
                key={post.id}
                type="button"
                onClick={() => handleOpenNotice(post)}
                className="w-full text-left p-5 sm:p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  {/* Category, Date & Author */}
                  <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-400">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      post.category === '공지사항' ? 'bg-rose-50 text-rose-600' :
                      post.category === '기술자료' ? 'bg-sky-50 text-sky-600' :
                      post.category === '제품매뉴얼' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  </div>

                  {/* Title and content preview */}
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors text-xs sm:text-sm md:text-base truncate">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] sm:text-xs line-clamp-1 leading-relaxed mt-1">
                      {post.content}
                    </p>
                  </div>
                </div>

                {/* Right side: Views and Arrow */}
                <div className="flex items-center gap-4 text-slate-400 shrink-0 font-mono text-[11px] sm:text-xs">
                  <span className="hidden sm:flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ARTICLE READER MODAL */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col text-slate-800">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 space-y-2">
              <div className="flex justify-between items-start">
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                  activeNotice.category === '공지사항' ? 'bg-rose-100 text-rose-800' :
                  activeNotice.category === '기술자료' ? 'bg-sky-100 text-sky-800' :
                  activeNotice.category === '제품매뉴얼' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-slate-100 text-slate-800'
                }`}>
                  {activeNotice.category}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveNotice(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-lg font-bold font-sans p-1 hover:bg-slate-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                {activeNotice.title}
              </h3>

              {/* Author & Date metadata row */}
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1.5 border-t border-slate-50 font-mono">
                <span>작성부서: <strong className="text-slate-600 font-sans">{activeNotice.author}</strong></span>
                <span>등록일: <strong className="text-slate-600">{activeNotice.date}</strong></span>
                <span>조회수: <strong className="text-slate-600">{activeNotice.views}</strong></span>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 overflow-y-auto max-h-[50vh] text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap bg-slate-50/50">
              {activeNotice.content}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveNotice(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                목록으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
