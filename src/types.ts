export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
}

export interface SocialLinks {
  facebook: string;
  linkedin: string;
  youtube: string;
  instagram: string;
}

export interface CompanyInfo {
  name: string;
  ceo: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  businessNo: string;
  established: string;
}

export interface ProductItem {
  id: string;
  category: '환경계측기' | '미세먼지 채취 및 측정기' | '초음파 파쇄기';
  name: string;
  subName: string;
  desc: string;
  spec: string;
  imageUrl: string;
  keyFeatures: string[];
}

export interface NoticePost {
  id: string;
  title: string;
  content: string;
  category: '공지사항' | '보도자료' | '기술자료' | '제품매뉴얼';
  author: string;
  date: string;
  views: number;
}

export interface AppConfig {
  fontFamily: 'sans' | 'serif' | 'mono' | 'gothic';
  accentColor: string; // Hex or Tailwind color class
  themeMode: 'light' | 'neutral' | 'clean';
}

export interface HistoryItem {
  year: string;
  content: string;
}

export interface AboutInfo {
  introduction: string;
  mission: string;
  vision: string;
  history: HistoryItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  details: string[];
  imageUrl: string;
}

export interface Inquiry {
  id: string;
  productName?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  content: string;
  date: string;
  status: '접수대기' | '검토중' | '답변완료';
}
