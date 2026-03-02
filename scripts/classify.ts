import { writeFileSync, readFileSync, existsSync } from 'fs';
import https from 'https';

const NVIDIA_API_KEY = "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";
const MODEL = "qwen/qwen3.5-397b-a17b";

interface RawResource {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  source: string;
  sourceUrl: string;
  type: string;
  tags: string[];
  stars: number;
  forks: number;
  trendScore: number;
  scrapedAt: string;
  isUniversal: boolean;
}

interface CategorizedResource {
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

function log(msg: string) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function callZhipuAPI(prompt: string): Promise<string> {
  return callNVIDIAAPI(prompt);
}

function callNVIDIAAPI(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = {
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4096,
      stream: false
    };

    const data = JSON.stringify(payload);
    const options = {
      hostname: 'integrate.api.nvidia.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed.choices[0]?.message?.content || '');
          } catch (e) {
            reject(new Error(`JSON parse error: ${body}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function translateWithLLM(title: string, desc: string): Promise<{ titleZh: string; descZh: string }> {
  return new Promise(async (resolve) => {
    try {
      const prompt = `请将以下AI工具的标题和描述翻译成中文。保持专业术语的准确性。

标题: ${title}
描述: ${desc}

请直接返回JSON格式，不要解释：
{"title":"翻译后的标题","desc":"翻译后的描述"}`;
      
      const content = await callNVIDIAAPI(prompt);
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        resolve({
          titleZh: parsed.title || title,
          descZh: parsed.desc || desc
        });
      } else {
        resolve({ titleZh: title, descZh: desc });
      }
    } catch (e) {
      console.log(`  ⚠️ LLM翻译失败，使用规则翻译: ${e}`);
      const { titleZh, descZh } = translateWithRules(title, desc);
      resolve({ titleZh, descZh });
    }
  });
}

function translateWithRules(title: string, desc: string): { titleZh: string; descZh: string } {
  const translations: Record<string, string> = {
    // 核心AI术语
    'agent': '智能体', 'agents': '智能体', 'ai agent': 'AI智能体', 'multi-agent': '多智能体',
    'framework': '框架', 'runtime': '运行时', 'platform': '平台',
    'tool': '工具', 'library': '库', 'sdk': '开发工具包',
    'api': '接口', 'server': '服务器', 'client': '客户端',
    'plugin': '插件', 'extension': '扩展',
    'integration': '集成', 'connector': '连接器',
    'automation': '自动化', 'automate': '自动化',
    'workflow': '工作流', 'orchestration': '编排',
    'script': '脚本', 'template': '模板', 'boilerplate': '模板',
    'open source': '开源', 'opensource': '开源', 'open-source': '开源',
    
    // AI/ML 术语
    'AI': '人工智能', 'artificial intelligence': '人工智能',
    'LLM': '大语言模型', 'large language model': '大语言模型',
    'language model': '语言模型', 'lm': '语言模型',
    'model': '模型', 'models': '模型',
    'assistant': '助手', 'chatbot': '聊天机器人', 'chat bot': '聊天机器人',
    'chat': '对话', 'conversation': '对话',
    'generative': '生成式', 'generation': '生成',
    'multimodal': '多模态', 'vision': '视觉', 'image': '图像', 'video': '视频', 'audio': '音频', 'speech': '语音',
    'deployment': '部署', 'deploy': '部署',
    'inference': '推理', 'infer': '推理',
    'training': '训练', 'train': '训练',
    'embedding': '向量', 'vector': '向量',
    'RAG': '检索增强', 'retrieval': '检索',
    
    // 能力/功能
    'memory': '记忆', 'knowledge': '知识', 'context': '上下文',
    'browser': '浏览器', 'automation': '自动化',
    'file': '文件', 'filesystem': '文件系统', 'storage': '存储',
    'database': '数据库', 'sql': 'SQL', 'data': '数据',
    'code': '代码', 'coding': '编程', 'developer': '开发者', 'dev': '开发',
    'prompt': '提示词', 'prompting': '提示工程',
    'search': '搜索', 'crawl': '抓取', 'scrap': '抓取',
    'webhook': 'Webhook', 'http': 'HTTP', 'rest': 'REST', 'api': 'API',
    'cloud': '云端', 'local': '本地', 'edge': '边缘',
    'security': '安全', 'auth': '认证', 'encryption': '加密',
    'monitoring': '监控', 'logging': '日志', 'analytics': '分析',
    'performance': '性能', 'optimization': '优化',
    
    // 应用场景
    'productivity': '效率', 'business': '商业', 'enterprise': '企业',
    'communication': '通讯', 'slack': 'Slack', 'discord': 'Discord', 'telegram': 'Telegram',
    'marketing': '营销', 'ads': '广告', 'seo': 'SEO',
    'ecommerce': '电商', 'shopify': 'Shopify', 'amazon': '亚马逊',
    'social media': '社交媒体', 'twitter': 'Twitter', 'instagram': 'Instagram',
    
    // 技术术语
    'cli': '命令行', 'command line': '命令行',
    'bridge': '桥接', 'gateway': '网关', 'proxy': '代理', 'middleware': '中间件',
    'parallel': '并行', 'concurrent': '并发', 'async': '异步',
    'distributed': '分布式', 'microservice': '微服务',
    'container': '容器', 'docker': 'Docker', 'kubernetes': 'K8s',
    'testing': '测试', 'debugging': '调试',
    
    // 设备/硬件
    'device': '设备', 'hardware': '硬件', 'robot': '机器人', 'robotics': '机器人技术',
    'iot': '物联网', 'embedded': '嵌入式', 'edge computing': '边缘计算',
    'wearable': '可穿戴', 'glasses': '眼镜', 'camera': '摄像头'
  };
  
  let titleZh = title;
  let descZh = desc;
  
  // 先转小写进行匹配
  const lowerTitle = title.toLowerCase();
  const lowerDesc = desc.toLowerCase();
  
  // 匹配翻译（按长度降序，避免短词先匹配）
  const sortedEntries = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);
  
  for (const [en, zh] of sortedEntries) {
    const regex = new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    titleZh = titleZh.replace(regex, zh);
    descZh = descZh.replace(regex, zh);
  }
  
  // 特殊处理：某些词需要保持英文首字母大写
  // 检查原始标题是否全大写，如果是则保留
  if (title === title.toUpperCase() && title.length > 2) {
    // 保持原样
  }
  
  return { titleZh, descZh };
}

async function translateResources(resources: CategorizedResource[]): Promise<CategorizedResource[]> {
  log('🔄 翻译中（LLM翻译）...');
  
  const translated: CategorizedResource[] = [];
  
  for (let i = 0; i < resources.length; i++) {
    const item = resources[i];
    
    // 检查是否已有有效的中文翻译
    if (item.title.zh && item.title.zh !== item.title.en && item.title.zh.length > 2) {
      translated.push(item);
      continue;
    }
    
    // 使用 LLM 翻译
    const { titleZh, descZh } = await translateWithLLM(item.title.en, item.description.en);
    
    translated.push({
      ...item,
      title: { zh: titleZh, en: item.title.en },
      description: { zh: descZh, en: item.description.en }
    });
    
    if ((i + 1) % 5 === 0) {
      log(`  翻译进度: ${i + 1}/${resources.length}`);
    }
  }
  
  log(`✅ 翻译完成: ${translated.length} 个`);
  return translated;
}

function detectCategoryLLM(title: string, desc: string, tags: string[], isUniversal: boolean): { primary: string; applicable: string[] } {
  const text = `${title} ${desc} ${tags.join(' ')}`.toLowerCase();
  
  // 严格规则：智能母体只收录真正的底层平台
  const motherbodyKeywords = [
    'openclaw', 'claude', 'anthropic', 'openai', 'gpt', 'gemini', 
    'minimax', 'kimi', 'moonshot', '文心', '通义', 'qwen',
    'copilot', 'notion ai', 'perplexity', ' manus', 
    'agent framework', 'runtime', 'agent runtime', '智能体平台',
    '多模态模型', '基础大模型', 'llm platform', 'model platform',
    'azure openai', 'aws bedrock', 'google ai', 'vertex ai'
  ];
  
  const isMotherbody = motherbodyKeywords.some(kw => text.includes(kw.toLowerCase()));
  
  // 严格排除：如果是具体应用而非平台，排除智能母体
  const excludedForMotherbody = [
    'shopify', 'amazon', '跨境', 'tiktok', '抖音', '短视频',
    'seo', '广告', '投放', 'marketing', 'ads', '选品', '剪辑',
    '视频', '直播', '带货', '小红书', '公众号'
  ];
  
  if (isMotherbody && !excludedForMotherbody.some(kw => text.includes(kw))) {
    return { primary: '智能母体', applicable: [] };
  }
  
  // MCP 严格匹配
  if (text.includes('mcp') || text.includes('model context protocol')) {
    return { primary: '智能母体', applicable: [] }; // MCP 暂时归入智能母体或新建分类
  }
  
  // 其他分类关键词（不包含AI硬件，因为那是视频内容）
  const categoryKeywords: Record<string, string[]> = {
    '跨境电商': ['amazon', 'shopify', '跨境', '物流', 'shipping', '选品', 'listing', 'erp', '支付', 'payment', '汇率', 'aliexpress', 'ebay', 'fba', '海外仓', '速卖通'],
    '视频电商': ['短视频', '直播', '抖音', '快手', 'tiktok', '视频剪辑', '字幕', '配音', 'tts', '视频去重', '搬运', '直播话术', '带货', '剪辑', 'video', 'b站', 'bilibili'],
    '自媒体运行': ['小红书', '公众号', '自媒体', '内容创作', '写作', '文案', '排版', '热点', '热搜', '粉丝', '内容分发', 'social media', 'instagram', '微博', '知乎'],
    '广告营销推广': ['广告', 'ads', '投放', 'marketing', 'seo', 'sem', '转化率', 'roi', '着陆页', 'a/b test', '受众', '人群包', '广告素材', '竞价', '出价', '预算'],
    '创意设计': ['design', '设计', 'ui', 'ux', 'figma', 'midjourney', 'stable diffusion', 'ai绘画', '图片生成', 'logo', '配色', '字体', '插画', '海报', '修图', '抠图'],
    '社群福利': ['社群', 'community', '微信群', 'discord', 'telegram', '积分', '等级', '抽奖', 'giveaway', '欢迎', '入群', '自动回复', '客服', '违禁词', '敏感词', '审核', '刷屏']
  };
  
  // 严格判断Agent vs Skill vs Prompt vs 开源软件
  let secondaryType = detectSecondaryType(title, desc, tags);
  
  // 评分
  const scores: Record<string, number> = {};
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    scores[category] = 0;
    for (const kw of keywords) {
      if (text.includes(kw.toLowerCase())) {
        scores[category] += 2; // 应用领域关键词权重更高
      }
    }
  }
  
  let maxScore = 0;
  let bestCategory = '智能母体'; // 默认
  
  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }
  
  // 适用场景
  let applicable: string[] = [];
  if (isUniversal || secondaryType === 'mcp' || secondaryType === 'opensource_soft') {
    applicable = Object.entries(scores)
      .filter(([_, score]) => score > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);
  }
  
  return { primary: bestCategory, applicable };
}

function detectSecondaryType(title: string, desc: string, tags: string[]): string {
  const text = `${title} ${desc} ${tags.join(' ')}`.toLowerCase();
  
  // MCP 严格匹配
  if (text.includes('mcp') || text.includes('model context protocol')) {
    return 'mcp';
  }
  
  // Prompt 严格匹配
  if (text.includes('prompt') || text.includes('提示词') || text.includes('template') && text.includes('role')) {
    return 'prompt';
  }
  
  // Skill 匹配：工作流、自动化脚本
  if (text.includes('skill') || text.includes('workflow') || text.includes('工作流') || text.includes('automation') && text.includes('script')) {
    return 'skill';
  }
  
  // Agent 匹配：任务执行、智能体
  if (text.includes('agent') && !text.includes('framework') && !text.includes('runtime')) {
    return 'agent';
  }
  
  // 默认为开源软件
  return 'opensource_soft';
}

function detectCapabilityTags(title: string, desc: string, existingTags: string[]): string[] {
  const text = `${title} ${desc}`.toLowerCase();
  const tags: string[] = [...existingTags];
  
  const capabilityMap: Record<string, string> = {
    'memory': '记忆/知识',
    'browser': '浏览器自动化',
    'file': '文件处理',
    'filesystem': '文件处理',
    'slack': '通讯集成',
    'discord': '通讯集成',
    'telegram': '通讯集成',
    'gmail': '通讯集成',
    'notion': '知识管理',
    'database': '数据库',
    'sql': '数据库',
    'api': 'API集成',
    'webhook': 'API集成',
    'image': '图像处理',
    'video': '视频处理',
    'audio': '语音处理',
    'speech': '语音处理',
    'tts': '语音处理',
    'code': '代码生成',
    'workflow': '工作流',
    'multimodal': '多模态',
    'llm': '大语言模型',
    'gpt': '大语言模型',
    'claude': '大语言模型',
    'translation': '翻译',
    'search': '搜索'
  };
  
  for (const [key, tag] of Object.entries(capabilityMap)) {
    if (text.includes(key) && !tags.includes(tag)) {
      tags.push(tag);
    }
  }
  
  return [...new Set(tags)];
}

function detectSecondaryCategory(type: string): string {
  return detectSecondaryType(type, '', []);
}

async function classifyWithLLM(resources: RawResource[]): Promise<CategorizedResource[]> {
  const batchSize = 3;
  const results: CategorizedResource[] = [];
  
  for (let i = 0; i < resources.length; i += batchSize) {
    const batch = resources.slice(i, i + batchSize);
    log(`📝 分类中... ${Math.min(i + batchSize, resources.length)}/${resources.length}`);
    
    try {
      const toolList = batch.map((r, idx) => `${idx + 1}. ${r.title}: ${r.description.substring(0, 100)}`).join('\n');
      const prompt = `你是一个AI工具分类专家。根据描述分类工具。

一级分类：智能母体/跨境电商/视频电商/自媒体运行/广告营销推广/AI硬件/创意设计/社群福利
二级分类：agent/skill/mcp/prompt/opensource_soft

直接返回JSON数组，不要解释：
[${batch.map((_, idx) => `{"id":${idx},"cat":"分类","type":"类型"}`).join(',')}]

工具列表：
${toolList}`;
      
      const content = await callNVIDIAAPI(prompt);
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        const classifications = JSON.parse(jsonMatch[0]);
        log(`    分类结果: ${JSON.stringify(classifications)}`);
        
        batch.forEach((resource, idx) => {
          const classification = classifications[idx] || {};
          const { primary, applicable } = detectCategoryLLM(resource.title, resource.description, resource.tags, resource.isUniversal);
          
          results.push({
            id: resource.id,
            title: { zh: resource.title, en: resource.titleEn },
            description: { zh: resource.description, en: resource.descriptionEn },
            primaryCategory: classification.cat || primary,
            secondaryCategory: (classification.type || 'agent').replace('opensource_soft', 'opensource_soft').replace('opensource', 'opensource_soft'),
            capabilityTags: detectCapabilityTags(resource.title, resource.description, resource.tags),
            applicableCategories: applicable,
            isUniversal: resource.isUniversal,
            downloadUrl: resource.sourceUrl,
            source: resource.source,
            sourceUrl: resource.sourceUrl,
            metrics: { stars: resource.stars, forks: resource.forks, trendScore: resource.trendScore },
            llmAnalysis: {
              innovationPoints: ['基于AI大模型', '自动化能力强', '开源可定制'],
              recommendationReason: `适用于${primary}场景的AI工具`,
              technicalHighlight: '开源项目，支持二次开发',
              applicableScenarios: applicable
            },
            status: 'pending',
            scrapedAt: resource.scrapedAt
          });
        });
      } else {
        throw new Error('No JSON');
      }
    } catch (e) {
      log(`  ⚠️ 使用规则匹配`);
      batch.forEach(resource => {
        const { primary, applicable } = detectCategoryLLM(resource.title, resource.description, resource.tags, resource.isUniversal);
        results.push({
          id: resource.id,
          title: { zh: resource.title, en: resource.titleEn },
          description: { zh: resource.description, en: resource.descriptionEn },
          primaryCategory: primary,
          secondaryCategory: detectSecondaryCategory(resource.type) || detectSecondaryType(resource.title, resource.description, resource.tags),
          capabilityTags: detectCapabilityTags(resource.title, resource.description, resource.tags),
          applicableCategories: applicable,
          isUniversal: resource.isUniversal,
          downloadUrl: resource.sourceUrl,
          source: resource.source,
          sourceUrl: resource.sourceUrl,
          metrics: { stars: resource.stars, forks: resource.forks, trendScore: resource.trendScore },
          llmAnalysis: {
            innovationPoints: ['基于AI大模型', '自动化能力强', '开源可定制'],
            recommendationReason: `适用于${primary}场景的AI工具`,
            technicalHighlight: '开源项目，支持二次开发',
            applicableScenarios: applicable
          },
          status: 'pending',
          scrapedAt: resource.scrapedAt
        });
      });
    }
  }
  return results;
}

function applyUpdateRules(resources: CategorizedResource[], existingResources: CategorizedResource[] = []): { pending: CategorizedResource[], updated: CategorizedResource[] } {
  const categoryMap = new Map<string, CategorizedResource[]>();
  
  const allResources = [...existingResources.filter(r => r.status === 'approved'), ...resources];
  
  allResources.forEach(r => {
    const key = `${r.primaryCategory}-${r.secondaryCategory}`;
    if (!categoryMap.has(key)) categoryMap.set(key, []);
    categoryMap.get(key)!.push(r);
  });
  
  const pending: CategorizedResource[] = [];
  const updated: CategorizedResource[] = [];
  
  categoryMap.forEach((items, key) => {
    items.sort((a, b) => b.metrics.trendScore - a.metrics.trendScore);
    
    items.slice(0, 20).forEach(item => {
      item.status = 'approved';
      updated.push(item);
    });
    
    items.slice(20, 25).forEach(item => {
      item.status = 'pending';
      pending.push(item);
    });
    
    items.slice(25).forEach(item => {
      item.status = 'archived';
    });
  });
  
  return { pending, updated };
}

async function main() {
  log('🏷️ 开始分类处理...');
  log('');
  
  if (!existsSync('./src/data/raw-resources.json')) {
    log('❌ 错误: 请先运行采集脚本 (npx tsx scripts/scrape-all.ts)');
    process.exit(1);
  }
  
  const rawData = JSON.parse(readFileSync('./src/data/raw-resources.json', 'utf-8'));
  const rawResources: RawResource[] = rawData.resources;
  
  log(`📊 待分类: ${rawResources.length} 个资源`);
  log('');
  
  let existingResources: CategorizedResource[] = [];
  if (existsSync('./src/data/all-resources.json')) {
    const existingData = JSON.parse(readFileSync('./src/data/all-resources.json', 'utf-8'));
    existingResources = existingData.resources || [];
    log(`📚 已有资源: ${existingResources.length} 个`);
    log('');
  }
  
  // 简化：跳过LLM，直接用规则分类
  const categorized = rawResources.map(r => {
    const { primary, applicable } = detectCategoryLLM(r.title, r.description, r.tags, r.isUniversal);
    const secondary = detectSecondaryType(r.title, r.description, r.tags);
    const { titleZh, descZh } = translateWithRules(r.title, r.description);
    
    return {
      id: r.id,
      title: { zh: titleZh, en: r.title },
      description: { zh: descZh, en: r.description },
      primaryCategory: primary,
      secondaryCategory: secondary,
      capabilityTags: detectCapabilityTags(r.title, r.description, r.tags),
      applicableCategories: applicable,
      isUniversal: r.isUniversal,
      downloadUrl: r.sourceUrl,
      source: r.source,
      sourceUrl: r.sourceUrl,
      metrics: { stars: r.stars, forks: r.forks, trendScore: r.trendScore },
      llmAnalysis: {
        innovationPoints: ['基于大语言模型', '自动化能力强', '开源可定制'],
        recommendationReason: `适用于${primary}场景的工具`,
        technicalHighlight: '开源项目，支持二次开发',
        applicableScenarios: applicable
      },
      status: 'pending' as const,
      scrapedAt: r.scrapedAt
    };
  });
  
  // 翻译
  const translated = await translateResources(categorized);
  
  const { pending, updated } = applyUpdateRules(translated, existingResources);
  
  const pendingOutput = {
    pending,
    total: pending.length,
    generatedAt: new Date().toISOString()
  };
  writeFileSync('./src/data/pending-review.json', JSON.stringify(pendingOutput, null, 2));
  
  const allOutput = {
    resources: updated,
    total: updated.length,
    lastUpdate: new Date().toISOString()
  };
  writeFileSync('./src/data/all-resources.json', JSON.stringify(allOutput, null, 2));
  
  log('');
  log('✅ 分类完成!');
  log(`📋 待审核: ${pending.length} 个`);
  log(`📦 已入库: ${updated.length} 个`);
  log('');
  log('📁 已保存到:');
  log('   - src/data/pending-review.json (待审核)');
  log('   - src/data/all-resources.json (全部资源)');
}

main().catch(console.error);
