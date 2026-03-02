import React from 'react';
import { Mail, Users, BookOpen, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function JoinUs() {
  const { t } = useLanguage();

  return (
    <section id="join" className="bg-[var(--color-brutal-green)] py-24 px-6 border-t-8 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="font-black text-6xl md:text-8xl uppercase leading-none tracking-tight mb-8">
              {t('join.title')}
            </h2>
            <div className="space-y-8 text-lg font-bold">
              <div className="flex items-start gap-4">
                <div className="bg-black text-white p-3 brutal-border">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase mb-2">{t('join.pull')}</h3>
                  <p className="font-medium text-black/80">
                    {t('join.pullDesc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-black text-white p-3 brutal-border">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase mb-2">{t('join.community')}</h3>
                  <p className="font-medium text-black/80">
                    {t('join.communityDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-white p-3 brutal-border">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase mb-2">{t('join.elite')}</h3>
                  <p className="font-medium text-black/80">
                    {t('join.eliteDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-white p-8 brutal-border brutal-shadow transform rotate-2">
              <h3 className="font-black text-4xl uppercase mb-6 text-center">{t('join.contribute')}</h3>
              <p className="text-center font-medium mb-8">
                {t('join.contributeDesc')}
              </p>
              
              <a 
                href="mailto:909599954@qq.com"
                className="flex items-center justify-center gap-3 bg-black text-white py-4 px-6 font-black text-2xl uppercase hover:bg-[var(--color-brutal-yellow)] hover:text-black transition-colors brutal-border w-full"
              >
                <Mail className="w-8 h-8" />
                909599954@qq.com
              </a>
              
              <div className="mt-8 pt-6 border-t-4 border-black/10 text-center text-sm font-bold text-gray-500 uppercase">
                Let's build the future together
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brutal-purple)] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-brutal-cyan)] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}
