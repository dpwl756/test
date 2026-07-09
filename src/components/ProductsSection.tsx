import React, { useState, useEffect } from 'react';
import { Layers, FileSpreadsheet, ShieldCheck, MailQuestion, ArrowRight, CheckCircle } from 'lucide-react';
import { ProductItem, Inquiry } from '../types';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';

interface ProductsSectionProps {
  products: ProductItem[];
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  adminMode: boolean;
  onInquireProduct: (productName: string) => void;
  preSelectedCategory?: ProductItem['category'];
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  setProducts,
  adminMode,
  onInquireProduct,
  preSelectedCategory = '환경계측기'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductItem['category']>(preSelectedCategory);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    if (preSelectedCategory) {
      setSelectedCategory(preSelectedCategory);
    }
  }, [preSelectedCategory]);

  const categories: ProductItem['category'][] = ['환경계측기', '미세먼지 채취 및 측정기', '초음파 파쇄기'];
  const filteredProducts = products.filter(p => p.category === selectedCategory);

  const handleUpdateProductText = (id: string, field: keyof ProductItem, newValue: any) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: newValue } : p));
  };

  const handleUpdateProductFeatures = (id: string, index: number, value: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updatedFeatures = [...p.keyFeatures];
        updatedFeatures[index] = value;
        return { ...p, keyFeatures: updatedFeatures };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-12 py-10 animate-in fade-in duration-300">
      
      {/* Categories Tabs */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 border-b border-slate-200 pb-4 max-w-3xl mx-auto">
        {categories.map((cat) => {
          const count = products.filter(p => p.category === cat).length;
          return (
            <button
              id={`tab-category-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              {cat}
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                selectedCategory === cat ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image container */}
            <div className="aspect-video relative bg-slate-100 overflow-hidden">
              <EditableImage
                src={prod.imageUrl}
                onChange={(newSrc) => handleUpdateProductText(prod.id, 'imageUrl', newSrc)}
                adminMode={adminMode}
                alt={prod.name}
              />
            </div>

            {/* Content card */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] font-bold text-sky-600 font-mono tracking-wide uppercase">
                    <EditableText
                      value={prod.subName}
                      onChange={(val) => handleUpdateProductText(prod.id, 'subName', val)}
                      adminMode={adminMode}
                      tagName="span"
                      className="text-[10px] font-bold text-sky-600 font-mono"
                    />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mt-1 group-hover:text-sky-600 transition-colors line-clamp-1">
                    <EditableText
                      value={prod.name}
                      onChange={(val) => handleUpdateProductText(prod.id, 'name', val)}
                      adminMode={adminMode}
                      tagName="span"
                      className="font-extrabold text-slate-900 text-base"
                    />
                  </h3>
                </div>
                
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                  <EditableText
                    value={prod.desc}
                    onChange={(val) => handleUpdateProductText(prod.id, 'desc', val)}
                    adminMode={adminMode}
                    multiline
                    tagName="span"
                    className="text-slate-500 text-xs leading-relaxed"
                  />
                </p>

                {/* Key features bullets preview */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                  {prod.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                      <span className="text-sky-500 font-bold mt-0.5">•</span>
                      <EditableText
                        value={feat}
                        onChange={(val) => handleUpdateProductFeatures(prod.id, fIdx, val)}
                        adminMode={adminMode}
                        tagName="span"
                        className="text-slate-600"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action triggers */}
              <div className="flex gap-2.5 mt-6 pt-4 border-t border-slate-100">
                <button
                  id={`btn-view-details-${prod.id}`}
                  type="button"
                  onClick={() => setSelectedProduct(prod)}
                  className="flex-1 py-2 rounded-xl text-center text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                >
                  상세 규격 보기
                </button>
                <button
                  id={`btn-inquire-product-card-${prod.id}`}
                  type="button"
                  onClick={() => onInquireProduct(prod.name)}
                  className="flex-1 py-2 rounded-xl text-center text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm cursor-pointer transition-colors flex items-center justify-center gap-1"
                >
                  <MailQuestion className="w-3.5 h-3.5" />
                  견적 문의
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL DIALOG MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row text-slate-800 h-[85vh] md:h-auto max-h-[90vh]">
            {/* Left side: Image and details */}
            <div className="md:w-1/2 relative bg-slate-100 flex flex-col justify-center">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover max-h-[30vh] md:max-h-full"
              />
              <span className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                {selectedProduct.category}
              </span>
            </div>

            {/* Right side: technical features & detailed specifications */}
            <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold text-sky-600 uppercase tracking-widest font-mono">
                      {selectedProduct.subName}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mt-0.5 leading-tight">
                      {selectedProduct.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-xl font-bold font-sans p-1 hover:bg-slate-100 rounded-lg"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
                  {selectedProduct.desc}
                </p>

                {/* Key Highlight Bullets */}
                <div className="mt-5 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-500" />
                    주요 핵심 장점
                  </h4>
                  <ul className="space-y-1.5 pl-1.5">
                    {selectedProduct.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specs box */}
                <div className="mt-5 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-sky-500" />
                    정밀 기술 사양 (Specifications)
                  </h4>
                  <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100 font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed max-h-[160px] overflow-y-auto">
                    {selectedProduct.spec}
                  </div>
                </div>
              </div>

              {/* Bottom Actions inside detail card */}
              <div className="flex gap-2.5 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                >
                  닫기
                </button>
                <button
                  id={`btn-inquire-product-modal-${selectedProduct.id}`}
                  type="button"
                  onClick={() => {
                    onInquireProduct(selectedProduct.name);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  장비 견적 문의하기
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
