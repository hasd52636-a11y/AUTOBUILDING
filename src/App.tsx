import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import ResourceGrid from './components/ResourceGrid';
import AIHardwareGrid from './components/AIHardwareGrid';
import GuideSection from './components/GuideSection';
import JoinUs from './components/JoinUs';
import CommunityWelfare from './components/CommunityWelfare';
import ReviewPage from './pages/ReviewPage';
import { MOCK_RESOURCES, ResourceType, PRIMARY_CATEGORIES } from './data/resources';
import { useLanguage } from './i18n/LanguageContext';
import { useEffect } from 'react';

// 尝试加载已审核的数据
let APPROVED_RESOURCES: any[] = [];
try {
  const approvedData = require('./data/approved-resources.json');
  APPROVED_RESOURCES = approvedData.resources || [];
} catch (e) {
  // 使用空数组
}

function HomePage() {
  const [activePrimary, setActivePrimary] = useState<string>('all');
  const [activeSecondary, setActiveSecondary] = useState<ResourceType | 'all'>('all');
  const { t } = useLanguage();
  
  // 优先使用已审核数据，如果没有则用mock数据
  const resources = APPROVED_RESOURCES.length > 0 ? APPROVED_RESOURCES : MOCK_RESOURCES;

  const filteredResources = useMemo(() => {
    return resources.filter((resource: any) => {
      const matchPrimary = activePrimary === 'all' || resource.primaryCategory === activePrimary;
      const matchSecondary = activeSecondary === 'all' || resource.secondaryCategory === activeSecondary;
      return matchPrimary && matchSecondary;
    });
  }, [activePrimary, activeSecondary, resources]);

  return (
    <div className="min-h-screen bg-[var(--color-brutal-bg)] text-[var(--color-brutal-black)] font-sans pt-[72px]">
      <Header />

      {/* Marquee Header */}
      <div className="bg-black text-white py-2 border-b-4 border-black overflow-hidden flex whitespace-nowrap">
        <div className="marquee-track text-sm font-bold uppercase tracking-widest">
          <span className="mx-4">AUTO-BUILDING</span>
          <span className="mx-4 text-[var(--color-brutal-yellow)]">{t('marquee.text1')}</span>
          <span className="mx-4">{t('marquee.text2')}</span>
          <span className="mx-4 text-[var(--color-brutal-green)]">{t('marquee.text3')}</span>
          <span className="mx-4">Agent</span>
          <span className="mx-4 text-[var(--color-brutal-purple)]">Skill</span>
          <span className="mx-4">MCP</span>
          <span className="mx-4 text-[var(--color-brutal-cyan)]">Prompt</span>
          <span className="mx-4">AUTO-BUILDING</span>
          <span className="mx-4 text-[var(--color-brutal-yellow)]">{t('marquee.text1')}</span>
          <span className="mx-4">{t('marquee.text2')}</span>
        </div>
      </div>

      <Hero />
      
      <main id="resources" className="relative z-20">
        <CategoryNav 
          activePrimary={activePrimary} 
          setActivePrimary={setActivePrimary}
          activeSecondary={activeSecondary}
          setActiveSecondary={setActiveSecondary}
        />
        
        <div className="min-h-[50vh]">
          {activePrimary === '社群福利' ? (
            <CommunityWelfare />
          ) : activePrimary === 'AI 硬件' ? (
            <AIHardwareGrid resources={filteredResources} />
          ) : (
            <ResourceGrid resources={filteredResources} />
          )}
        </div>
      </main>

      <GuideSection />
      
      <JoinUs />

      {/* Footer */}
      <footer className="bg-black text-white py-8 text-center border-t-8 border-[var(--color-brutal-purple)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-black text-3xl uppercase tracking-wider">AUTO-BUILDING</div>
          <div className="text-sm font-bold opacity-70">
            &copy; {new Date().getFullYear()} AUTO-BUILDING Community. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm font-black">
            <a href="#" className="hover:text-[var(--color-brutal-yellow)] transition-colors">{t('footer.about')}</a>
            <a href="#" className="hover:text-[var(--color-brutal-green)] transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-[var(--color-brutal-purple)] transition-colors">{t('footer.privacy')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}
