import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="bg-[var(--color-brutal-bg)] px-6 py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left side: Main Title */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white brutal-border-pill brutal-shadow-sm font-black text-sm mb-8">
              <Zap className="w-4 h-4 text-[var(--color-brutal-orange)] fill-current" />
              <span>{t('hero.tag')}</span>
            </div>
            
            <h1 className="font-black text-6xl md:text-8xl uppercase leading-[1.1] tracking-tight mb-8">
              {t('hero.title1')} <br/>
              <span className="text-[var(--color-brutal-purple)]">AUTO-BUILDING</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-bold max-w-2xl leading-relaxed text-gray-800">
              {t('hero.subtitle')}
            </p>
          </div>
          
          {/* Right side: Action Card */}
          <div className="w-full md:w-auto">
            <div className="bg-[var(--color-brutal-yellow)] brutal-border brutal-shadow p-8 max-w-sm transform rotate-2 hover:rotate-0 transition-transform">
              <h3 className="font-black text-2xl uppercase mb-4">{t('hero.start')}</h3>
              <p className="text-sm font-bold leading-relaxed mb-6 text-black/80">
                {t('hero.startDesc')}
              </p>
              <a href="#resources" className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-xl font-black text-lg uppercase hover:bg-[var(--color-brutal-green)] hover:text-black transition-colors w-full brutal-border">
                {t('hero.browse')} <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
