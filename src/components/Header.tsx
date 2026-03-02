import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe, PlusCircle, ClipboardCheck } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-black text-2xl tracking-tighter uppercase hover:text-blue-600">
        AUTO-BUILDING
      </Link>
      
      <div className="flex items-center gap-4">
        {/* Review Button - Only visible in dev/local */}
        <Link 
          to="/review"
          className="hidden md:flex items-center gap-2 bg-[var(--color-brutal-purple)] text-white px-4 py-1.5 rounded-full font-black text-sm brutal-border hover:translate-x-[-2px] hover:translate-y-[-2px] brutal-shadow-sm transition-all"
        >
          <ClipboardCheck className="w-4 h-4" />
          审核
        </Link>

        {/* Submit Resource Button */}
        <a 
          href="mailto:admin@example.com?subject=Submit Resource for AUTO-BUILDING"
          className="hidden md:flex items-center gap-2 bg-[var(--color-brutal-green)] text-black px-4 py-1.5 rounded-full font-black text-sm brutal-border hover:translate-x-[-2px] hover:translate-y-[-2px] brutal-shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          {t('nav.submit')}
        </a>

        {/* Language Toggle */}
        <div className="flex items-center gap-2 bg-[var(--color-brutal-bg)] p-1 brutal-border-pill">
          <Globe className="w-4 h-4 ml-2 text-gray-500" />
          <button
            onClick={() => setLang('zh')}
            className={`px-4 py-1 text-sm font-black rounded-full transition-colors ${
              lang === 'zh' 
                ? 'bg-[var(--color-brutal-yellow)] brutal-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-gray-500 hover:text-black'
            }`}
          >
            中文
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-1 text-sm font-black rounded-full transition-colors ${
              lang === 'en' 
                ? 'bg-[var(--color-brutal-yellow)] brutal-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-gray-500 hover:text-black'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
