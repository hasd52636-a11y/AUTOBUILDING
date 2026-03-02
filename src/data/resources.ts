export type ResourceType = 'motherbody' | 'agent' | 'skill' | 'mcp' | 'prompt' | 'opensource_soft';

export interface Resource {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  primaryCategory: string;
  secondaryCategory: ResourceType;
  downloadUrl: string;
  version: string;
  author?: string;
  // AI 硬件专属字段
  imageUrl?: string;
  tags?: string[];
  videoPreviewUrl?: string;
  externalLinks?: { label: string; url: string }[];
}

export const PRIMARY_CATEGORIES = [
  '智能母体',
  '跨境电商',
  '视频电商',
  '自媒体运行',
  '广告营销推广',
  'AI 硬件',
  '创意设计',
  '社群福利'
];

export const SECONDARY_CATEGORIES: { labelKey: string; value: ResourceType }[] = [
  { labelKey: 'type.motherbody', value: 'motherbody' },
  { labelKey: 'type.agent', value: 'agent' },
  { labelKey: 'type.skill', value: 'skill' },
  { labelKey: 'type.mcp', value: 'mcp' },
  { labelKey: 'type.prompt', value: 'prompt' },
  { labelKey: 'type.opensource_soft', value: 'opensource_soft' },
];

export const MOTHERBODY_RESOURCES: Resource[] = [
  {
    id: 'mb-1',
    title: { zh: 'OpenClaw', en: 'OpenClaw' },
    description: { zh: '开源的计算机控制智能体，支持跨平台自动化操作与任务执行。', en: 'Open-source computer control agent supporting cross-platform automation.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://github.com/OpenClaw/OpenClaw',
    version: '1.0.0',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=OpenClaw&backgroundColor=b6e3f4',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'GitHub', url: 'https://github.com/OpenClaw/OpenClaw' }]
  },
  {
    id: 'mb-2',
    title: { zh: 'Minimax', en: 'Minimax' },
    description: { zh: '国内领先的通用大模型平台，提供强大的多模态交互与智能体构建能力。', en: 'Leading general LLM platform providing powerful multimodal interaction.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://www.minimax.io/',
    version: '2.0.0',
    imageUrl: 'https://logo.clearbit.com/minimax.io',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'Official', url: 'https://www.minimax.io/' }]
  },
  {
    id: 'mb-3',
    title: { zh: 'Manus Agent', en: 'Manus Agent' },
    description: { zh: '全球首款通用型AI Agent，无需API即可自主操作电脑完成复杂工作流。', en: 'World\'s first general-purpose AI Agent for autonomous computer operation.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://manus.im/',
    version: '1.5.0',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Manus&backgroundColor=c0aede',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'Official', url: 'https://manus.im/' }]
  },
  {
    id: 'mb-4',
    title: { zh: 'Claude Cowork', en: 'Claude Cowork' },
    description: { zh: 'Anthropic推出的企业级协作智能体，深度集成工作流与逻辑推理。', en: 'Enterprise collaboration agent by Anthropic with deep workflow integration.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://claude.ai/',
    version: '3.5.0',
    imageUrl: 'https://logo.clearbit.com/anthropic.com',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'Official', url: 'https://claude.ai/' }]
  },
  {
    id: 'mb-5',
    title: { zh: 'Copilot Tasks', en: 'Copilot Tasks' },
    description: { zh: '微软生态原生的自动化任务执行器，无缝调度Office 365与Windows底层能力。', en: 'Microsoft ecosystem native automation task executor.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://copilot.microsoft.com/',
    version: '1.0.0',
    imageUrl: 'https://logo.clearbit.com/microsoft.com',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'Official', url: 'https://copilot.microsoft.com/' }]
  },
  {
    id: 'mb-6',
    title: { zh: 'Notion Custom Agents', en: 'Notion Custom Agents' },
    description: { zh: 'Notion内置的定制化智能助手，可基于工作区知识库自动处理文档。', en: 'Notion built-in custom intelligent assistant based on workspace knowledge.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://www.notion.so/product/ai',
    version: '2.1.0',
    imageUrl: 'https://logo.clearbit.com/notion.so',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'Official', url: 'https://www.notion.so/product/ai' }]
  },
  {
    id: 'mb-7',
    title: { zh: 'Perplexity Computer', en: 'Perplexity Computer' },
    description: { zh: '结合实时搜索与深度研究的计算智能体，提供精准的数据分析与信息整合。', en: 'Computing agent combining real-time search and deep research.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://www.perplexity.ai/',
    version: '1.0.0',
    imageUrl: 'https://logo.clearbit.com/perplexity.ai',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'Official', url: 'https://www.perplexity.ai/' }]
  },
  {
    id: 'mb-8',
    title: { zh: 'LobsterAI', en: 'LobsterAI' },
    description: { zh: '专注于高精度网页抓取与数据结构化的智能体，像龙虾一样精准捕获信息。', en: 'Agent focused on high-precision web scraping and data structuring.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://github.com/lobsterai/lobster',
    version: '0.9.0',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=LobsterAI&backgroundColor=ffdfbf',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'GitHub', url: 'https://github.com/lobsterai/lobster' }]
  },
  {
    id: 'mb-9',
    title: { zh: 'NanoClaw', en: 'NanoClaw' },
    description: { zh: '极轻量级的端侧智能体，专为低功耗设备设计，提供基础的自动化控制能力。', en: 'Ultra-lightweight edge agent designed for low-power devices.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://github.com/OpenClaw/NanoClaw',
    version: '1.0.0',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=NanoClaw&backgroundColor=c0aede',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'GitHub', url: 'https://github.com/OpenClaw/NanoClaw' }]
  },
  {
    id: 'mb-10',
    title: { zh: 'Nanobot', en: 'Nanobot' },
    description: { zh: '灵活的微型自动化脚本机器人，支持快速部署与多节点协同工作。', en: 'Flexible micro automation script robot supporting rapid deployment.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://github.com/nanobot-ai/nanobot',
    version: '2.0.1',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Nanobot&backgroundColor=b6e3f4',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'GitHub', url: 'https://github.com/nanobot-ai/nanobot' }]
  },
  {
    id: 'mb-11',
    title: { zh: 'ZeroClaw', en: 'ZeroClaw' },
    description: { zh: '零配置开箱即用的桌面自动化智能体，通过自然语言直接驱动系统UI。', en: 'Zero-config out-of-the-box desktop automation agent.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://github.com/OpenClaw/ZeroClaw',
    version: '1.1.0',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=ZeroClaw&backgroundColor=ffdfbf',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'GitHub', url: 'https://github.com/OpenClaw/ZeroClaw' }]
  },
  {
    id: 'mb-12',
    title: { zh: 'PicoClaw', en: 'PicoClaw' },
    description: { zh: '专为树莓派等微型计算机打造的硬件控制智能体，连接物理世界与AI。', en: 'Hardware control agent designed for microcomputers like Raspberry Pi.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://github.com/OpenClaw/PicoClaw',
    version: '1.0.5',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=PicoClaw&backgroundColor=c0aede',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'GitHub', url: 'https://github.com/OpenClaw/PicoClaw' }]
  },
  {
    id: 'mb-13',
    title: { zh: 'KimiClaw', en: 'KimiClaw' },
    description: { zh: '基于Kimi大模型长文本能力深度定制的智能体，擅长超长文档处理。', en: 'Agent deeply customized based on Kimi LLM\'s long-context capabilities.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://kimi.moonshot.cn/',
    version: '1.0.0',
    imageUrl: 'https://logo.clearbit.com/moonshot.cn',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'Official', url: 'https://kimi.moonshot.cn/' }]
  },
  {
    id: 'mb-14',
    title: { zh: 'PocherClaw', en: 'PocherClaw' },
    description: { zh: '针对复杂多步骤任务的编排型智能体，支持自定义工作流与多Agent协作。', en: 'Orchestration agent for complex multi-step tasks supporting custom workflows.' },
    primaryCategory: '智能母体',
    secondaryCategory: 'motherbody',
    downloadUrl: 'https://github.com/OpenClaw/PocherClaw',
    version: '1.2.0',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=PocherClaw&backgroundColor=b6e3f4',
    tags: ['AI大脑'],
    externalLinks: [{ label: 'GitHub', url: 'https://github.com/OpenClaw/PocherClaw' }]
  }
];

/**
 * ------------------------------------------------------------------------
 * 真实资源列表 (REAL RESOURCES)
 * ------------------------------------------------------------------------
 * 管理员请在这里添加经过审核的资源。
 * 格式参考下方的示例。
 */
export const REAL_RESOURCES: Resource[] = [
  // 示例：
  // {
  //   id: 'real-1',
  //   title: { zh: '我的真实资源', en: 'My Real Resource' },
  //   description: { zh: '这是一个真实的描述', en: 'This is a real description' },
  //   primaryCategory: '跨境电商',
  //   secondaryCategory: 'agent',
  //   downloadUrl: 'https://your-actual-link.com/file.zip',
  //   version: '1.0.0',
  //   author: 'YourName'
  // }
];

/**
 * ------------------------------------------------------------------------
 * 模拟数据生成器 (MOCK DATA GENERATOR)
 * ------------------------------------------------------------------------
 * 用于在没有足够真实数据时填充页面。
 */
const generateMockData = (): Resource[] => {
  const resources: Resource[] = [];
  let idCounter = 1;

  const templates = {
    '跨境电商': [
      { t: '亚马逊选品分析', e: 'Amazon Product Research', type: 'agent' },
      { t: 'Shopify自动上架', e: 'Shopify Auto Lister', type: 'skill' },
      { t: '跨境物流追踪', e: 'Global Logistics Tracker', type: 'mcp' },
      { t: '多语言客服回复', e: 'Multilingual CS Reply', type: 'prompt' },
      { t: '速卖通竞品监控', e: 'AliExpress Competitor Monitor', type: 'agent' },
      { t: '独立站SEO优化', e: 'Independent Site SEO', type: 'skill' },
      { t: 'TikTok Shop数据抓取', e: 'TikTok Shop Scraper', type: 'opensource_soft' },
      { t: '跨境支付汇率换算', e: 'FX Rate Converter', type: 'mcp' },
      { t: '爆款Listing生成器', e: 'Viral Listing Generator', type: 'prompt' },
    ],
    '视频电商': [
      { t: '短视频自动剪辑', e: 'Short Video Auto Editor', type: 'skill' },
      { t: '直播话术生成', e: 'Live Stream Script Gen', type: 'prompt' },
      { t: '抖音带货数据分析', e: 'Douyin Sales Analytics', type: 'agent' },
      { t: '视频去重工具', e: 'Video Deduplication Tool', type: 'opensource_soft' },
      { t: '自动添加字幕', e: 'Auto Subtitle Adder', type: 'skill' },
      { t: '快手热门音乐提取', e: 'Kuaishou Hot Music Extractor', type: 'mcp' },
      { t: '视频封面批量制作', e: 'Batch Cover Maker', type: 'agent' },
      { t: '带货转化率预测', e: 'CVR Predictor', type: 'mcp' },
      { t: '爆款视频脚本', e: 'Viral Video Script', type: 'prompt' },
    ],
    '自媒体运行': [
      { t: '小红书爆款文案', e: 'XHS Viral Copywriting', type: 'prompt' },
      { t: '公众号排版助手', e: 'WeChat Article Formatter', type: 'skill' },
      { t: '热点话题追踪', e: 'Hot Topic Tracker', type: 'agent' },
      { t: '评论区自动互动', e: 'Auto Comment Replier', type: 'mcp' },
      { t: '粉丝画像分析', e: 'Follower Persona Analytics', type: 'agent' },
      { t: '文章配图自动生成', e: 'Auto Image Generator', type: 'skill' },
      { t: '知乎高赞回答模板', e: 'Zhihu Top Answer Template', type: 'prompt' },
      { t: '自媒体数据大屏', e: 'Social Media Dashboard', type: 'opensource_soft' },
      { t: '违禁词检测', e: 'Banned Word Checker', type: 'mcp' },
    ],
    '广告营销推广': [
      { t: 'Facebook广告优化', e: 'FB Ads Optimizer', type: 'agent' },
      { t: 'Google Ads关键词挖掘', e: 'Google Ads Keyword Miner', type: 'skill' },
      { t: '落地页A/B测试', e: 'Landing Page A/B Tester', type: 'mcp' },
      { t: '高转化广告语', e: 'High CVR Ad Copy', type: 'prompt' },
      { t: 'ROI实时监控', e: 'Real-time ROI Monitor', type: 'agent' },
      { t: '竞品广告素材抓取', e: 'Competitor Ad Scraper', type: 'opensource_soft' },
      { t: '受众群体定位', e: 'Audience Targeting', type: 'skill' },
      { t: '营销活动策划', e: 'Campaign Planner', type: 'prompt' },
      { t: '联盟营销追踪', e: 'Affiliate Tracker', type: 'mcp' },
    ],
    'AI 硬件': [
      { 
        t: 'Rabbit R1', 
        e: 'Rabbit R1', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/rabbit/600/400',
        tags: ['AI Device', 'Voice Assistant', 'LAM'],
        videoPreviewUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        externalLinks: [{ label: 'YouTube', url: 'https://youtube.com' }, { label: 'Official', url: 'https://rabbit.tech' }]
      },
      { 
        t: 'Humane AI Pin', 
        e: 'Humane AI Pin', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/humane/600/400',
        tags: ['Wearable', 'Laser Projection', 'Voice'],
        videoPreviewUrl: 'https://www.bilibili.com/video/BV1GJ411x7h7',
        externalLinks: [{ label: 'Bilibili', url: 'https://bilibili.com' }]
      },
      { 
        t: 'Meta Smart Glasses', 
        e: 'Meta Smart Glasses', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/meta/600/400',
        tags: ['AR', 'Camera', 'Meta AI'],
        videoPreviewUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        externalLinks: [{ label: 'YouTube', url: 'https://youtube.com' }]
      },
      { 
        t: 'Apple Vision Pro', 
        e: 'Apple Vision Pro', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/vision/600/400',
        tags: ['Spatial Computing', 'VR/AR', 'Premium'],
        videoPreviewUrl: 'https://www.bilibili.com/video/BV1GJ411x7h7',
        externalLinks: [{ label: 'Official', url: 'https://apple.com' }]
      },
      { 
        t: 'Limitless Pendant', 
        e: 'Limitless Pendant', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/limitless/600/400',
        tags: ['Meeting Assistant', 'Wearable', 'Audio'],
        videoPreviewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        externalLinks: [{ label: 'YouTube', url: 'https://youtube.com' }]
      },
      { 
        t: 'Brilliant Labs Frame', 
        e: 'Brilliant Labs Frame', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/frame/600/400',
        tags: ['Open Source', 'AR Glasses', 'Lightweight'],
        videoPreviewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        externalLinks: [{ label: 'GitHub', url: 'https://github.com' }]
      },
      { 
        t: 'Plaud Note', 
        e: 'Plaud Note', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/plaud/600/400',
        tags: ['Voice Recorder', 'ChatGPT', 'Transcription'],
        videoPreviewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        externalLinks: [{ label: 'Bilibili', url: 'https://bilibili.com' }]
      },
      { 
        t: 'Oasis AI Keyboard', 
        e: 'Oasis AI Keyboard', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/keyboard/600/400',
        tags: ['Productivity', 'Hardware', 'Copilot'],
        videoPreviewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        externalLinks: [{ label: 'YouTube', url: 'https://youtube.com' }]
      },
      { 
        t: 'Figure 01 Robot', 
        e: 'Figure 01 Robot', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/figure/600/400',
        tags: ['Humanoid', 'OpenAI', 'Robotics'],
        videoPreviewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        externalLinks: [{ label: 'YouTube', url: 'https://youtube.com' }]
      },
      { 
        t: 'NVIDIA Jetson Orin', 
        e: 'NVIDIA Jetson Orin', 
        type: 'agent',
        imageUrl: 'https://picsum.photos/seed/nvidia/600/400',
        tags: ['Edge AI', 'Developer Kit', 'Compute'],
        videoPreviewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        externalLinks: [{ label: 'Official', url: 'https://nvidia.com' }]
      },
    ],
    '创意设计': [
      { t: 'Midjourney提示词库', e: 'Midjourney Prompt Library', type: 'prompt' },
      { t: 'Figma自动排版', e: 'Figma Auto Layout', type: 'skill' },
      { t: '批量抠图工具', e: 'Batch Background Remover', type: 'opensource_soft' },
      { t: '配色方案生成', e: 'Color Palette Generator', type: 'agent' },
      { t: '字体识别MCP', e: 'Font Recognition MCP', type: 'mcp' },
      { t: '3D模型纹理生成', e: '3D Texture Generator', type: 'skill' },
      { t: 'UI组件库导出', e: 'UI Component Exporter', type: 'mcp' },
      { t: 'Logo设计灵感', e: 'Logo Design Inspiration', type: 'prompt' },
      { t: '插画风格转换', e: 'Illustration Style Transfer', type: 'agent' },
    ],
    '社群福利': [
      { t: '微信群自动回复', e: 'WeChat Group Auto Reply', type: 'mcp' },
      { t: 'Discord积分机器人', e: 'Discord Level Bot', type: 'opensource_soft' },
      { t: '社群活跃度分析', e: 'Community Activity Analytics', type: 'agent' },
      { t: '抽奖活动管理', e: 'Giveaway Manager', type: 'skill' },
      { t: '迎新话术模板', e: 'Welcome Message Template', type: 'prompt' },
      { t: '违规内容过滤', e: 'Toxic Content Filter', type: 'mcp' },
      { t: '群成员画像分析', e: 'Member Persona Analytics', type: 'agent' },
      { t: '每日早报生成', e: 'Daily Morning Post Gen', type: 'skill' },
      { t: '社群运营SOP', e: 'Community Ops SOP', type: 'prompt' },
    ]
  };

  for (const [category, items] of Object.entries(templates)) {
    items.forEach((item: any, index) => {
      resources.push({
        id: `mock-${idCounter++}`,
        title: { zh: item.t, en: item.e },
        description: { 
          zh: `这是一个关于${item.t}的自动化工具，帮助你在${category}领域提高效率。`,
          en: `This is an automation tool for ${item.e}, helping you improve efficiency in the ${category} field.`
        },
        primaryCategory: category,
        secondaryCategory: item.type as ResourceType,
        downloadUrl: `https://example.com/resource-${idCounter}.zip`,
        version: `1.${index}.0`,
        author: 'AutoBuilder',
        imageUrl: item.imageUrl,
        tags: item.tags,
        videoPreviewUrl: item.videoPreviewUrl,
        externalLinks: item.externalLinks
      });
    });
  }

  return resources;
};

// 合并真实数据和模拟数据。当您有足够的真实数据时，可以移除 generateMockData()
export const MOCK_RESOURCES = [...MOTHERBODY_RESOURCES, ...REAL_RESOURCES, ...generateMockData()];
