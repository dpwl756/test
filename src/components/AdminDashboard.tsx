import React, { useState } from 'react';
import { Newspaper, MessageSquare, Plus, Edit2, Trash2, CheckCircle2, Shield, AlertCircle, FileText, Package, Eye, Check } from 'lucide-react';
import { NoticePost, Inquiry, ProductItem } from '../types';

interface AdminDashboardProps {
  notices: NoticePost[];
  setNotices: React.Dispatch<React.SetStateAction<NoticePost[]>>;
  inquiries: Inquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  products: ProductItem[];
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  accentColor: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  notices,
  setNotices,
  inquiries,
  setInquiries,
  products,
  setProducts,
  accentColor
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'inquiries' | 'products'>('posts');
  
  // Post states
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NoticePost | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<NoticePost['category']>('공지사항');
  const [postAuthor, setPostAuthor] = useState('관리자');

  // Product states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodSub, setProdSub] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductItem['category']>('환경계측기');
  const [prodDesc, setProdDesc] = useState('');
  const [prodSpec, setProdSpec] = useState('');
  const [prodImg, setProdImg] = useState('');
  const [prodFeatures, setProdFeatures] = useState('');

  // Post Actions
  const handleOpenCreatePost = () => {
    setEditingPost(null);
    setPostTitle('');
    setPostContent('');
    setPostCategory('공지사항');
    setPostAuthor('관리자');
    setIsPostModalOpen(true);
  };

  const handleOpenEditPost = (post: NoticePost) => {
    setEditingPost(post);
    setPostTitle(post.title);
    setPostContent(post.content);
    setPostCategory(post.category);
    setPostAuthor(post.author);
    setIsPostModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    if (editingPost) {
      // Edit existing
      setNotices(prev => prev.map(p => p.id === editingPost.id ? {
        ...p,
        title: postTitle,
        content: postContent,
        category: postCategory,
        author: postAuthor,
        date: new Date().toISOString().split('T')[0]
      } : p));
    } else {
      // Create new
      const newPost: NoticePost = {
        id: `post-${Date.now()}`,
        title: postTitle,
        content: postContent,
        category: postCategory,
        author: postAuthor,
        date: new Date().toISOString().split('T')[0],
        views: 0
      };
      setNotices(prev => [newPost, ...prev]);
    }
    setIsPostModalOpen(false);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      setNotices(prev => prev.filter(p => p.id !== id));
    }
  };

  // Inquiry Actions
  const handleToggleInquiryStatus = (id: string) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        let nextStatus: Inquiry['status'] = '접수대기';
        if (inq.status === '접수대기') nextStatus = '검토중';
        else if (inq.status === '검토중') nextStatus = '답변완료';
        else nextStatus = '접수대기';
        return { ...inq, status: nextStatus };
      }
      return inq;
    }));
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('이 문의 건을 목록에서 삭제하시겠습니까?')) {
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    }
  };

  // Product Actions
  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProdName('');
    setProdSub('');
    setProdCategory('환경계측기');
    setProdDesc('');
    setProdSpec('');
    setProdImg('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600');
    setProdFeatures('');
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: ProductItem) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdSub(prod.subName);
    setProdCategory(prod.category);
    setProdDesc(prod.desc);
    setProdSpec(prod.spec);
    setProdImg(prod.imageUrl);
    setProdFeatures(prod.keyFeatures.join('\n'));
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodDesc.trim()) return;

    const featuresList = prodFeatures.split('\n').filter(f => f.trim() !== '');

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        name: prodName,
        subName: prodSub,
        category: prodCategory,
        desc: prodDesc,
        spec: prodSpec,
        imageUrl: prodImg,
        keyFeatures: featuresList
      } : p));
    } else {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        name: prodName,
        subName: prodSub,
        category: prodCategory,
        desc: prodDesc,
        spec: prodSpec,
        imageUrl: prodImg,
        keyFeatures: featuresList
      };
      setProducts(prev => [...prev, newProd]);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('정말로 이 제품을 카탈로그에서 완전히 삭제하시겠습니까?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <section className="bg-slate-50 border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Admin Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-sky-400" />
              <span className="text-xs font-semibold tracking-wider text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-900/30">
                ADMIN CONSOLE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">통합 운영 관리 시스템 (어드민 대시보드)</h2>
            <p className="text-slate-400 text-xs mt-1">우리회사 웹사이트 콘텐츠, 뉴스 공지사항, 고객 문의 수신함을 실시간으로 관리하고 제어합니다.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-950/40 p-3 rounded-xl border border-slate-700/30">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="block text-[10px] text-slate-400">게시글</span>
              <span className="font-bold text-lg text-white">{notices.length}</span>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <span className="block text-[10px] text-slate-400">고객문의</span>
              <span className="font-bold text-lg text-amber-400">{inquiries.filter(i => i.status === '접수대기').length} <span className="text-xs text-slate-500 font-normal">/ {inquiries.length}</span></span>
            </div>
            <div className="text-center px-3">
              <span className="block text-[10px] text-slate-400">제품 수</span>
              <span className="font-bold text-lg text-sky-400">{products.length}</span>
            </div>
          </div>
        </div>

        {/* Inner Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden mb-6">
          <div className="flex border-b border-slate-200 text-sm font-semibold">
            <button
              id="tab-posts-manager"
              type="button"
              onClick={() => setActiveTab('posts')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'posts'
                  ? 'border-sky-600 text-sky-600 bg-slate-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/30'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              공지/새소식 글 관리
            </button>
            <button
              id="tab-inquiries-manager"
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'border-sky-600 text-sky-600 bg-slate-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/30'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              수신 문의 목록 ({inquiries.length}건)
            </button>
            <button
              id="tab-products-manager"
              type="button"
              onClick={() => setActiveTab('products')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'border-sky-600 text-sky-600 bg-slate-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/30'
              }`}
            >
              <Package className="w-4 h-4" />
              제품 카탈로그 목록 ({products.length}개)
            </button>
          </div>

          <div className="p-4 sm:p-6 text-slate-800 bg-white">
            
            {/* TAB 1: NOTICES MANAGER */}
            {activeTab === 'posts' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">회사 게시글 대장</h3>
                    <p className="text-xs text-slate-500">공지사항, 기술연구 백서, 보도자료를 관리합니다.</p>
                  </div>
                  <button
                    id="btn-create-post"
                    type="button"
                    onClick={handleOpenCreatePost}
                    className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    새 글 작성하기
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <th className="p-4 w-24">분류</th>
                        <th className="p-4">제목</th>
                        <th className="p-4 w-28">작성자</th>
                        <th className="p-4 w-28">날짜</th>
                        <th className="p-4 w-20">조회수</th>
                        <th className="p-4 w-32 text-center">액션</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {notices.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            등록된 게시글이 없습니다. 우측 상단의 새 글 작성을 눌러주세요.
                          </td>
                        </tr>
                      ) : (
                        notices.map((post) => (
                          <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                                post.category === '공지사항' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                post.category === '기술자료' ? 'bg-sky-50 text-sky-600 border border-sky-100' :
                                post.category === '제품매뉴얼' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {post.category}
                              </span>
                            </td>
                            <td className="p-4 font-medium text-slate-900 truncate max-w-xs sm:max-w-md" title={post.title}>
                              {post.title}
                            </td>
                            <td className="p-4 text-slate-500">{post.author}</td>
                            <td className="p-4 text-slate-500 font-mono">{post.date}</td>
                            <td className="p-4 text-slate-500 font-mono">{post.views}</td>
                            <td className="p-4 flex items-center justify-center gap-2">
                              <button
                                id={`btn-edit-post-${post.id}`}
                                type="button"
                                onClick={() => handleOpenEditPost(post)}
                                className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded transition-colors cursor-pointer"
                                title="게시글 수정"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`btn-delete-post-${post.id}`}
                                type="button"
                                onClick={() => handleDeletePost(post.id)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                title="게시글 삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: INQUIRIES MANAGER */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">홈페이지 문의 수신함</h3>
                  <p className="text-xs text-slate-500">고객님들이 '문의하기' 폼을 통해 접수한 제품 견적 및 유지보수 신청 실시간 목록입니다.</p>
                </div>

                <div className="space-y-3">
                  {inquiries.length === 0 ? (
                    <div className="p-12 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/30 text-slate-400">
                      <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      수신된 문의 내역이 없습니다.
                    </div>
                  ) : (
                    inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-slate-50 hover:bg-slate-100/50 rounded-xl p-5 border border-slate-200/60 transition-all flex flex-col md:flex-row justify-between gap-4"
                      >
                        <div className="space-y-3 flex-1">
                          {/* Top Meta info */}
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              inq.status === '접수대기' ? 'bg-amber-100 text-amber-800' :
                              inq.status === '검토중' ? 'bg-sky-100 text-sky-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {inq.status}
                            </span>
                            {inq.productName && (
                              <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                                대상장비: {inq.productName}
                              </span>
                            )}
                            <span className="text-slate-400 font-mono">{inq.date}</span>
                          </div>

                          {/* Content */}
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">
                              [{inq.company}] {inq.name} 담당자 문의
                            </h4>
                            <p className="text-slate-600 text-xs mt-1 bg-white p-3 rounded-lg border border-slate-100 whitespace-pre-wrap leading-relaxed">
                              {inq.content}
                            </p>
                          </div>

                          {/* Contact Info */}
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 font-mono">
                            <span>연락처: <strong className="text-slate-700">{inq.phone}</strong></span>
                            <span>이메일: <strong className="text-slate-700">{inq.email}</strong></span>
                          </div>
                        </div>

                        {/* Status controllers */}
                        <div className="flex md:flex-col justify-end items-center md:items-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                          <button
                            id={`btn-status-inquiry-${inq.id}`}
                            type="button"
                            onClick={() => handleToggleInquiryStatus(inq.id)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 text-sky-500" />
                            상태 변경
                          </button>
                          <button
                            id={`btn-delete-inquiry-${inq.id}`}
                            type="button"
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            삭제
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS MANAGER */}
            {activeTab === 'products' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">카탈로그 제품 대장</h3>
                    <p className="text-xs text-slate-500">제품소개 탭에 표시되는 고유 장비 카드를 추가, 수정 및 제거할 수 있습니다.</p>
                  </div>
                  <button
                    id="btn-create-product"
                    type="button"
                    onClick={handleOpenCreateProduct}
                    className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    새 제품 규격 등록
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((prod) => (
                    <div key={prod.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col bg-slate-50/30">
                      <div className="h-36 relative bg-slate-200">
                        <img src={prod.imageUrl} alt={prod.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <span className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                          {prod.category}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold">{prod.subName}</span>
                          <h4 className="font-bold text-slate-900 text-sm mt-0.5 leading-snug line-clamp-1">{prod.name}</h4>
                          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">{prod.desc}</p>
                        </div>
                        
                        <div className="flex justify-end gap-2 border-t border-slate-100 pt-3 mt-3">
                          <button
                            id={`btn-edit-product-${prod.id}`}
                            type="button"
                            onClick={() => handleOpenEditProduct(prod)}
                            className="text-[11px] font-bold text-sky-600 hover:bg-sky-50 px-2.5 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            장비 수정
                          </button>
                          <button
                            id={`btn-delete-product-${prod.id}`}
                            type="button"
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="text-[11px] font-bold text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            영구 삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* MODAL: POST CREATE/EDIT */}
        {isPostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in-50 duration-200 text-slate-800">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sky-500" />
                  {editingPost ? '게시글 수정하기' : '새 게시글 등록'}
                </h3>
              </div>
              <form onSubmit={handleSavePost}>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">분류</label>
                      <select
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                      >
                        <option value="공지사항">공지사항</option>
                        <option value="기술자료">기술자료</option>
                        <option value="제품매뉴얼">제품매뉴얼</option>
                        <option value="보도자료">보도자료</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">작성 부서/자</label>
                      <input
                        type="text"
                        value={postAuthor}
                        onChange={(e) => setPostAuthor(e.target.value)}
                        placeholder="예: 기술영업부"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">게시글 제목</label>
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="제목을 명확하게 입력하세요."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500 font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">본문 내용</label>
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="본문 내용을 입력하세요."
                      rows={8}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500 resize-y whitespace-pre-wrap"
                      required
                    />
                  </div>
                </div>
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPostModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white rounded-lg bg-sky-600 hover:bg-sky-700 cursor-pointer transition-colors"
                  >
                    저장 후 반영
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: PRODUCT CREATE/EDIT */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in-50 duration-200 text-slate-800">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Package className="w-5 h-5 text-sky-500" />
                  {editingProduct ? '제품 스펙 및 카드 수정' : '새 장비 규격 등록'}
                </h3>
              </div>
              <form onSubmit={handleSaveProduct}>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">제품 대분류</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                      >
                        <option value="환경계측기">환경계측기</option>
                        <option value="미세먼지 채취 및 측정기">미세먼지 채취 및 측정기</option>
                        <option value="초음파 파쇄기">초음파 파쇄기</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">이미지 주소 (URL)</label>
                      <input
                        type="url"
                        value={prodImg}
                        onChange={(e) => setProdImg(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">제품명 (국문)</label>
                      <input
                        type="text"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        placeholder="예: 초음파 파쇄기 UHD-500"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500 font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">영문 모델명</label>
                      <input
                        type="text"
                        value={prodSub}
                        onChange={(e) => setProdSub(e.target.value)}
                        placeholder="예: Ultrasonic Homogenizer UHD-500"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">주요 스펙 리스트 (줄바꿈하여 한 항목씩)</label>
                    <textarea
                      value={prodFeatures}
                      onChange={(e) => setProdFeatures(e.target.value)}
                      placeholder="예:&#13;온도 컨트롤 센서 내장&#13;4.3인치 LCD 컬러 스크린&#13;20kHz 오토튜닝"
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500 resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">제품 간략 설명 (Card Description)</label>
                    <textarea
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500 resize-y"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">상세 기술 사양 명세 (Specifications)</label>
                    <textarea
                      value={prodSpec}
                      onChange={(e) => setProdSpec(e.target.value)}
                      placeholder="예: 측정 유량: 10~50L/min, 입력 전원: AC 220V..."
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-500 resize-y font-mono whitespace-pre-wrap"
                      required
                    />
                  </div>
                </div>
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white rounded-lg bg-sky-600 hover:bg-sky-700 cursor-pointer transition-colors"
                  >
                    저장 후 반영
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
