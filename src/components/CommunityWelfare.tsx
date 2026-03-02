import React from 'react';
import { QrCode, Users, MessageCircle, Gift } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function CommunityWelfare() {
  const { t } = useLanguage();

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto">
      <div className="bg-white brutal-border brutal-shadow p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-brutal-yellow)] brutal-border rounded-full font-black text-sm">
            <Gift className="w-4 h-4" />
            <span>{t('welfare.tag')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            {t('welfare.title')}
          </h2>
          
          <p className="text-lg font-bold text-gray-700 leading-relaxed">
            {t('welfare.desc')}
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 font-bold">
              <div className="w-8 h-8 rounded-full bg-[var(--color-brutal-cyan)] brutal-border flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span>{t('welfare.feature1')}</span>
            </div>
            <div className="flex items-center gap-3 font-bold">
              <div className="w-8 h-8 rounded-full bg-[var(--color-brutal-purple)] brutal-border flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span>{t('welfare.feature2')}</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-auto flex flex-col items-center">
          <div className="bg-white p-4 brutal-border brutal-shadow-sm rounded-2xl mb-4">
            {/* Placeholder for QR Code */}
            <div className="w-48 h-48 bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
              <QrCode className="w-16 h-16 text-gray-400 mb-2" />
              <span className="text-sm font-bold text-gray-500">{t('welfare.scan')}</span>
            </div>
          </div>
          <p className="font-black text-center">
            {t('welfare.action')}
          </p>
        </div>
      </div>
    </div>
  );
}
