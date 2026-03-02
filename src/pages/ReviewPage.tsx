import React, { useState, useEffect } from 'react';
import { Check, X, TrendingUp, Star, GitFork, ExternalLink, Lightbulb, Target, Zap, Tag, Layers, RefreshCw, Edit2, Save } from 'lucide-react';

interface ReviewItem {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  primaryCategory: string;
  secondaryCategory: string;
  capabilityTags: string[];
  applicableCategories: string[];
  isUniversal: boolean;
  downloadUrl: string;
  source: string;
  sourceUrl: string;
  metrics: {
    stars: number;
    forks: number;
    trendScore: number;
  };
  llmAnalysis: {
    innovationPoints: string[];
    recommendationReason: string;
    technicalHighlight: string;
    applicableScenarios: string[];
  };
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  scrapedAt: string;
}

const PRIMARY_CATEGORIES = [
  '智能母体',
  '跨境电商',
  '视频电商',
  '自媒体运行',
  '广告营销推广',
  'AI 硬件',
  '创意设计',
  '社群福利'
];

const SECONDARY_CATEGORIES = [
  { label: '智能体', value: 'agent' },
  { label: '技能', value: 'skill' },
  { label: 'MCP协议', value: 'mcp' },
  { label: '提示词', value: 'prompt' },
  { label: '开源软件', value: 'opensource_soft' }
];

const categoryColors: Record<string, string> = {
  '智能母体': 'bg-purple-100 text-purple-800',
  '跨境电商': 'bg-blue-100 text-blue-800',
  '视频电商': 'bg-red-100 text-red-800',
  '自媒体运行': 'bg-pink-100 text-pink-800',
  '广告营销推广': 'bg-orange-100 text-orange-800',
  'AI 硬件': 'bg-green-100 text-green-800',
  '创意设计': 'bg-yellow-100 text-yellow-800',
  '社群福利': 'bg-cyan-100 text-cyan-800'
};

const typeColors: Record<string, string> = {
  'agent': 'bg-purple-500',
  'skill': 'bg-blue-500',
  'mcp': 'bg-green-500',
  'prompt': 'bg-yellow-500',
  'opensource_soft': 'bg-gray-500'
};

export default function ReviewPage() {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editPrimary, setEditPrimary] = useState('');
  const [editSecondary, setEditSecondary] = useState('');

  useEffect(() => {
    loadPendingItems();
  }, []);

  const loadPendingItems = () => {
    setLoading(true);
    fetch('/api/review/pending')
      .then(res => res.json())
      .then(data => {
        setItems(data.pending || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleApprove = async (id: string) => {
    setProcessing(true);
    try {
      await fetch(`/api/review/${id}/approve`, { method: 'POST' });
      setItems(items.filter(i => i.id !== id));
      setSelectedId(null);
      setEditingCategory(null);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (id: string) => {
    setProcessing(true);
    try {
      await fetch(`/api/review/${id}/reject`, { method: 'POST' });
      setItems(items.filter(i => i.id !== id));
      setSelectedId(null);
    } finally {
      setProcessing(false);
    }
  };

  const handleApproveAll = async () => {
    if (!confirm(`确认一键通过全部 ${items.length} 个项目？`)) return;
    
    setProcessing(true);
    try {
      await fetch('/api/review/approve-all', { method: 'POST' });
      setItems([]);
      setSelectedId(null);
      alert('✅ 全部审核通过！');
    } finally {
      setProcessing(false);
    }
  };

  const startEditCategory = (item: ReviewItem) => {
    setEditPrimary(item.primaryCategory);
    setEditSecondary(item.secondaryCategory);
    setEditingCategory(item.id);
  };

  const saveCategoryEdit = () => {
    if (selectedId) {
      setItems(items.map(item => 
        item.id === selectedId 
          ? { ...item, primaryCategory: editPrimary, secondaryCategory: editSecondary }
          : item
      ));
      setEditingCategory(null);
    }
  };

  const selected = selectedId ? items.find(i => i.id === selectedId) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">加载审核数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black flex items-center gap-2">
                📋 资源审核中心
              </h1>
              <p className="text-gray-600 mt-1">
                今日待审核: <span className="font-bold text-blue-600">{items.length}</span> 个项目
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={loadPendingItems}
                disabled={processing}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${processing ? 'animate-spin' : ''}`} />
                刷新
              </button>
              <button 
                onClick={handleApproveAll}
                disabled={items.length === 0 || processing}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                一键通过 ({items.length})
              </button>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">暂无待审核内容</h2>
            <p className="text-gray-500">所有资源已审核完成，或请先运行采集脚本</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 左侧：待审核列表 */}
            <div className="lg:col-span-4 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-black text-white p-4 font-bold flex items-center justify-between">
                <span>待审核列表 ({items.length})</span>
                <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                  每日5更
                </span>
              </div>
              <div className="divide-y max-h-[70vh] overflow-y-auto">
                {items.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedId === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3 className="font-bold text-lg line-clamp-1 flex-1">{item.title.zh}</h3>
                      <span className={`text-xs px-2 py-1 rounded text-white ${typeColors[item.secondaryCategory] || 'bg-gray-500'}`}>
                        {SECONDARY_CATEGORIES.find(c => c.value === item.secondaryCategory)?.label || item.secondaryCategory}
                      </span>
                    </div>
                    
                    {item.isUniversal && (
                      <div className="flex items-center gap-1 mb-2">
                        <Tag className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-orange-600 font-medium">通用型工具</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {item.metrics.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {item.metrics.forks}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        {item.metrics.trendScore}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[item.primaryCategory] || 'bg-gray-100'}`}>
                        {item.primaryCategory}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-400">
                      来源: {item.source} | {new Date(item.scrapedAt).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右侧：详情对比 */}
            <div className="lg:col-span-8">
              {selected ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
                  {/* 基本信息 */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-black mb-1">{selected.title.zh}</h2>
                        <p className="opacity-90 text-sm">{selected.title.en}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-white font-bold ${typeColors[selected.secondaryCategory]}`}>
                        {SECONDARY_CATEGORIES.find(c => c.value === selected.secondaryCategory)?.label || selected.secondaryCategory}
                      </span>
                    </div>
                    <a 
                      href={selected.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      查看来源
                    </a>
                  </div>

                  {/* 热度数据 */}
                  <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b">
                    <div className="text-center">
                      <div className="text-3xl font-black text-yellow-500">{selected.metrics.stars}</div>
                      <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                        <Star className="w-4 h-4" /> GitHub 收藏数
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-blue-500">{selected.metrics.forks}</div>
                      <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                        <GitFork className="w-4 h-4" /> 复刻数
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-green-500">{selected.metrics.trendScore}</div>
                      <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4" /> 热度评分
                      </div>
                    </div>
                  </div>

                  {/* 分类信息 - 可编辑 */}
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Layers className="w-5 h-5 text-blue-500" />
                        分类信息
                      </h3>
                      {editingCategory !== selected.id ? (
                        <button 
                          onClick={() => startEditCategory(selected)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-200"
                        >
                          <Edit2 className="w-4 h-4" />
                          修改分类
                        </button>
                      ) : (
                        <button 
                          onClick={saveCategoryEdit}
                          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm font-bold hover:bg-green-200"
                        >
                          <Save className="w-4 h-4" />
                          保存
                        </button>
                      )}
                    </div>
                    
                    {editingCategory === selected.id ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold mb-2">一级分类</label>
                          <select 
                            value={editPrimary}
                            onChange={(e) => setEditPrimary(e.target.value)}
                            className="w-full p-3 border-2 border-black rounded-lg font-bold"
                          >
                            {PRIMARY_CATEGORIES.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">二级分类</label>
                          <select 
                            value={editSecondary}
                            onChange={(e) => setEditSecondary(e.target.value)}
                            className="w-full p-3 border-2 border-black rounded-lg font-bold"
                          >
                            {SECONDARY_CATEGORIES.map(cat => (
                              <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded font-bold ${categoryColors[selected.primaryCategory]}`}>
                          {selected.primaryCategory}
                        </span>
                        <span className={`px-3 py-1 rounded text-white font-bold ${typeColors[selected.secondaryCategory]}`}>
                          {SECONDARY_CATEGORIES.find(c => c.value === selected.secondaryCategory)?.label || selected.secondaryCategory}
                        </span>
                        {selected.isUniversal && (
                          <span className="px-3 py-1 rounded bg-orange-100 text-orange-800 font-bold flex items-center gap-1">
                            <Tag className="w-4 h-4" /> 通用型工具
                          </span>
                        )}
                      </div>
                    )}
                    
                    {selected.isUniversal && selected.applicableCategories.length > 0 && !editingCategory && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">适用场景:</div>
                        <div className="flex flex-wrap gap-2">
                          {selected.applicableCategories.map(cat => (
                            <span key={cat} className="px-3 py-1 rounded bg-orange-50 text-orange-700 border border-orange-200">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selected.capabilityTags.length > 0 && !editingCategory && (
                      <div>
                        <div className="text-sm text-gray-600 mb-2">能力标签:</div>
                        <div className="flex flex-wrap gap-2">
                          {selected.capabilityTags.slice(0, 10).map(tag => (
                            <span key={tag} className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 描述 */}
                  <div className="p-6 border-b">
                    <h3 className="font-bold text-lg mb-2">描述</h3>
                      <p className="text-gray-700">
                        {selected.description.zh && selected.description.zh !== selected.description.en 
                          ? selected.description.zh 
                          : selected.description.en}
                      </p>
                  </div>

                  {/* 创新点 */}
                  <div className="p-6 border-b">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      创新点
                    </h3>
                    <ul className="space-y-2">
                      {selected.llmAnalysis.innovationPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-sm font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 推荐理由 */}
                  <div className="p-6 border-b bg-green-50">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-500" />
                      推荐理由
                    </h3>
                    <p className="text-gray-700">{selected.llmAnalysis.recommendationReason}</p>
                  </div>

                  {/* 技术亮点 */}
                  <div className="p-6 border-b">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-500" />
                      技术亮点
                    </h3>
                    <p className="text-gray-700">{selected.llmAnalysis.technicalHighlight}</p>
                  </div>

                  {/* 元信息 */}
                  <div className="p-4 bg-gray-50 text-sm text-gray-500 flex flex-wrap gap-4">
                    <span>来源: {selected.source}</span>
                    <span>采集时间: {new Date(selected.scrapedAt).toLocaleString('zh-CN')}</span>
                  </div>

                  {/* 审核按钮 */}
                  <div className="p-6 flex gap-4">
                    <button
                      onClick={() => handleApprove(selected.id)}
                      disabled={processing}
                      className="flex-1 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      批准入库
                    </button>
                    <button
                      onClick={() => handleReject(selected.id)}
                      disabled={processing}
                      className="flex-1 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      拒绝
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
                  <div className="text-6xl mb-4">👈</div>
                  <p>点击左侧列表查看详情</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
