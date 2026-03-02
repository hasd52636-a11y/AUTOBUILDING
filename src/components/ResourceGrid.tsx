import React from 'react';
import { Resource } from '../data/resources';
import ResourceCard from './ResourceCard';
import { useLanguage } from '../i18n/LanguageContext';

interface ResourceGridProps {
  resources: Resource[];
}

export default function ResourceGrid({ resources }: ResourceGridProps) {
  const { t } = useLanguage();

  if (resources.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-black text-4xl uppercase mb-4 text-gray-400">
          {t('empty.title')}
        </h2>
        <p className="text-gray-500 font-medium">
          {t('empty.desc')}
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      {/* 智能母体专区背景 */}
      {resources.some(r => r.primaryCategory === '智能母体') && (
        <div className="mb-12 bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 border-4 border-purple-300 rounded-2xl p-8">
          <h2 className="font-black text-3xl text-purple-800 mb-6 flex items-center gap-3">
            🧠 智能母体专区
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resources.filter(r => r.primaryCategory === '智能母体').map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}
      
      {/* 其他分类 */}
      {resources.filter(r => r.primaryCategory !== '智能母体').length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {resources.filter(r => r.primaryCategory !== '智能母体').map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}
