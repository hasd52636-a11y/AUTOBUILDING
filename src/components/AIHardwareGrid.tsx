import React, { useState } from 'react';
import { Play, ExternalLink, X } from 'lucide-react';
import { Resource } from '../data/resources';
import { useLanguage } from '../i18n/LanguageContext';

interface AIHardwareGridProps {
  resources: Resource[];
}

const getEmbedUrl = (url: string) => {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch && ytMatch[1]) {
    return { type: 'youtube', url: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1` };
  }
  
  // Bilibili
  const bvidMatch = url.match(/(?:bilibili\.com\/video\/|player\.bilibili\.com\/player\.html\?bvid=)(BV[a-zA-Z0-9]+)/);
  if (bvidMatch && bvidMatch[1]) {
    return { type: 'bilibili', url: `//player.bilibili.com/player.html?bvid=${bvidMatch[1]}&autoplay=1` };
  }
  
  return { type: 'native', url };
};

export default function AIHardwareGrid({ resources }: AIHardwareGridProps) {
  const { lang } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const renderVideoPlayer = (url: string, onClose: () => void) => {
    const embedInfo = getEmbedUrl(url);

    return (
      <div className="absolute inset-0 z-10 bg-black flex items-center justify-center">
        {embedInfo.type === 'native' ? (
          <video 
            src={embedInfo.url} 
            autoPlay 
            controls 
            className="w-full h-full object-contain"
            onEnded={onClose}
          />
        ) : (
          <iframe
            src={embedInfo.url}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 bg-white text-black p-1 border-2 border-black hover:bg-[var(--color-brutal-yellow)] transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <div 
            key={resource.id}
            className="group bg-white border-4 border-[var(--color-brutal-black)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Image / Video Container */}
            <div className="relative aspect-video border-b-4 border-[var(--color-brutal-black)] bg-gray-100 overflow-hidden">
              {activeVideo === resource.id && resource.videoPreviewUrl ? (
                renderVideoPlayer(resource.videoPreviewUrl, () => setActiveVideo(null))
              ) : (
                <>
                  <img 
                    src={resource.imageUrl || `https://picsum.photos/seed/${resource.id}/600/400`} 
                    alt={resource.title[lang]}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                      resource.primaryCategory === '智能母体' ? 'object-contain p-8 bg-gray-50' : 'object-cover'
                    }`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (resource.primaryCategory === '智能母体') {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${resource.id}&backgroundColor=b6e3f4`;
                      }
                    }}
                  />
                  {resource.videoPreviewUrl && (
                    <button 
                      onClick={() => setActiveVideo(resource.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="bg-[var(--color-brutal-yellow)] border-4 border-black p-4 rounded-full transform hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 fill-black" />
                      </div>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3 line-clamp-1">
                {resource.title[lang]}
              </h3>
              
              <p className="text-gray-700 font-medium mb-6 line-clamp-2 flex-grow">
                {resource.description[lang]}
              </p>

              {/* Tags */}
              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {resource.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[var(--color-brutal-bg)] border-2 border-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* External Links */}
              {resource.externalLinks && resource.externalLinks.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t-4 border-[var(--color-brutal-bg)]">
                  {resource.externalLinks.map((link, idx) => {
                    // Determine color based on index for variety
                    const colors = [
                      'hover:bg-[var(--color-brutal-yellow)]',
                      'hover:bg-[var(--color-brutal-green)]',
                      'hover:bg-[var(--color-brutal-cyan)]',
                      'hover:bg-[var(--color-brutal-purple)]'
                    ];
                    const hoverColor = colors[idx % colors.length];

                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 px-4 py-2 border-2 border-black font-bold text-sm transition-colors ${hoverColor}`}
                      >
                        {link.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
