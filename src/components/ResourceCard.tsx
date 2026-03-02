import React, { useState } from 'react';
import { Copy, CheckCircle2, Box, Code, Cpu, FileText, TerminalSquare, ExternalLink } from 'lucide-react';
import { Resource } from '../data/resources';
import { useLanguage } from '../i18n/LanguageContext';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [copied, setCopied] = useState(false);
  const { t, lang } = useLanguage();

  const getIcon = () => {
    switch (resource.secondaryCategory) {
      case 'agent': return <Cpu className="w-8 h-8" />;
      case 'skill': return <Code className="w-8 h-8" />;
      case 'mcp': return <Box className="w-8 h-8" />;
      case 'prompt': return <TerminalSquare className="w-8 h-8" />;
      case 'opensource_soft': return <FileText className="w-8 h-8" />;
      default: return <Box className="w-8 h-8" />;
    }
  };

  const getCategoryColor = () => {
    switch (resource.secondaryCategory) {
      case 'agent': return 'bg-[var(--color-brutal-cyan)]';
      case 'skill': return 'bg-[var(--color-brutal-purple)]';
      case 'mcp': return 'bg-[var(--color-brutal-yellow)]';
      case 'prompt': return 'bg-[var(--color-brutal-green)]';
      case 'opensource_soft': return 'bg-[var(--color-brutal-orange)]';
      default: return 'bg-white';
    }
  };

  const handleCopy = () => {
    const jsonPayload = {
      agent_resources: [
        {
          type: resource.secondaryCategory,
          name: resource.title[lang],
          download_url: resource.downloadUrl,
          version: resource.version
        }
      ]
    };
    
    navigator.clipboard.writeText(JSON.stringify(jsonPayload, null, 2))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('复制失败，请手动复制');
      });
  };

  return (
    <div className={`${getCategoryColor()} brutal-border brutal-shadow-hover brutal-shadow flex flex-col h-full group relative overflow-hidden`}>
      {/* Decorative dots */}
      <div className="absolute top-4 right-4 flex gap-1">
        <div className="w-3 h-3 rounded-full border-2 border-black"></div>
        <div className="w-3 h-3 rounded-full border-2 border-black"></div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        {/* Icon / Logo */}
        <div className="mb-6">
          <div className="inline-flex p-3 bg-white brutal-border rounded-xl">
            {resource.primaryCategory === '智能母体' && resource.imageUrl ? (
              <img 
                src={resource.imageUrl} 
                alt={resource.title[lang]} 
                className="w-8 h-8 object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${resource.id}&backgroundColor=b6e3f4`;
                }}
              />
            ) : (
              getIcon()
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="font-black text-2xl mb-3 tracking-wide">
          {resource.title[lang]}
        </h3>
        <p className="text-sm font-bold text-black/80 mb-6 flex-grow leading-relaxed">
          {resource.description[lang]}
        </p>
        
        {/* Footer Actions */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-black px-2 py-1 bg-white brutal-border rounded-md inline-block w-fit">
              {t(`cat.${resource.primaryCategory}`)}
            </span>
            <span className="text-[10px] font-black px-2 py-1 bg-black text-white rounded-md inline-block w-fit">
              v{resource.version}
            </span>
          </div>
          
          <div className="flex gap-2">
            <a
              href={resource.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 font-black text-sm rounded-xl brutal-border bg-white text-black hover:bg-gray-100 transition-colors"
              title={lang === 'zh' ? '直达链接' : 'Open Link'}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            {resource.primaryCategory !== '智能母体' && (
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 font-black text-sm rounded-xl brutal-border transition-colors ${
                  copied 
                    ? 'bg-[var(--color-brutal-green)] text-black' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> {t('card.copied')}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> {t('card.copy')}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
