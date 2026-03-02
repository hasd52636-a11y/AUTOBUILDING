import React from 'react';
import { PRIMARY_CATEGORIES, SECONDARY_CATEGORIES, ResourceType } from '../data/resources';
import { useLanguage } from '../i18n/LanguageContext';

interface CategoryNavProps {
  activePrimary: string;
  setActivePrimary: (cat: string) => void;
  activeSecondary: ResourceType | 'all';
  setActiveSecondary: (cat: ResourceType | 'all') => void;
}

export default function CategoryNav({
  activePrimary,
  setActivePrimary,
  activeSecondary,
  setActiveSecondary
}: CategoryNavProps) {
  const { t } = useLanguage();

  return (
    <div className="sticky top-[96px] z-40 px-6 mb-12 flex flex-col items-center pointer-events-none">
      <div className="bg-white brutal-border-pill brutal-shadow flex items-center px-4 py-2 pointer-events-auto max-w-full overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 md:gap-6">
          <button
            onClick={() => setActivePrimary('all')}
            className={`px-4 py-2 font-black text-sm md:text-base whitespace-nowrap rounded-full transition-colors ${
              activePrimary === 'all' ? 'bg-[var(--color-brutal-yellow)]' : 'hover:bg-gray-100'
            }`}
          >
            {t('nav.all')}
          </button>
          {PRIMARY_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActivePrimary(cat)}
              className={`px-4 py-2 font-black text-sm md:text-base whitespace-nowrap rounded-full transition-colors ${
                activePrimary === cat ? 'bg-[var(--color-brutal-yellow)]' : 'hover:bg-gray-100'
              }`}
            >
              {t(`cat.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Categories (Types) */}
      {activePrimary !== 'AI 硬件' && activePrimary !== '智能母体' && (
        <div className="mt-4 flex flex-wrap justify-center gap-3 pointer-events-auto">
          <button
            onClick={() => setActiveSecondary('all')}
            className={`px-5 py-2 text-sm font-black rounded-xl brutal-border transition-all ${
              activeSecondary === 'all' 
                ? 'bg-[var(--color-brutal-black)] text-white brutal-shadow-sm translate-x-[-2px] translate-y-[-2px]' 
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {t('nav.allTypes')}
          </button>
          {SECONDARY_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveSecondary(cat.value)}
              className={`px-5 py-2 text-sm font-black rounded-xl brutal-border transition-all ${
                activeSecondary === cat.value 
                  ? 'bg-[var(--color-brutal-black)] text-white brutal-shadow-sm translate-x-[-2px] translate-y-[-2px]' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
