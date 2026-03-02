import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    'nav.all': '全部',
    'nav.allTypes': '全部类型',
    'nav.submit': '提交资源',
    'hero.title1': '为什么选择',
    'hero.subtitle': '用AI践行一切可行的自动化验证，让先行者吃肉。这是一群由技术和理想者构建的社区，资源互补，技能切磋。',
    'hero.tag': 'AI势不可挡',
    'hero.start': '快速开始',
    'hero.startDesc': '这里收录了多个行业精英长时间自用实践后推荐的自动化软件、技能、MCP。我们提供官方或网盘直达链接，不保存任何代码文件，方便您一键获取，快速部署到自己的智能体。',
    'hero.browse': '浏览资源库',
    'card.copy': '获取资源',
    'card.copied': '已复制链接',
    
    // CLI Section
    'cli.tag': '开发者工具',
    'cli.title': '本地终端检索',
    'cli.subtitle': '习惯了黑框框？一行命令，直接在你的电脑上按二级分类检索，获取官方或网盘直达链接。',
    'cli.search': '按类型检索资源',
    'cli.pull': '一键获取链接',
    
    'join.title': '加入我们',
    'join.pull': '直达优质资源',
    'join.pullDesc': '收录行业精英推荐的自动化软件、技能、MCP，提供官方或网盘直达链接，安全可靠。',
    'join.community': '社群及知识库',
    'join.communityDesc': '这里有专门基于自动化实现而搭建的社群及知识库，可快速寻找回答任何关于你使用途中的问题。',
    'join.elite': '寻找行业精英',
    'join.eliteDesc': '我们重点寻找电商、AI编程技术人员、营销推广、产品设计及生产领域内的小伙伴。',
    'join.contribute': '贡献你的力量',
    'join.contributeDesc': '从为社区贡献或分享一个独特的自动化软件开始。准备好官方链接或网盘链接，并写好文档后发送至我们的邮箱或通过上方按钮提交审核。',
    'welfare.tag': '官方社群福利',
    'welfare.title': '加入 AUTO-BUILDING 核心交流群',
    'welfare.desc': '这里有专门基于自动化实现而搭建的社群及知识库，可快速寻找回答任何关于你使用途中的问题。我们重点寻找电商、AI编程技术人员、营销推广、产品设计及生产领域内的小伙伴。',
    'welfare.feature1': '资源互补，技能切磋',
    'welfare.feature2': '行业精英实战经验分享',
    'welfare.scan': '扫码加入微信群',
    'welfare.action': '扫一扫，立即进群吃肉 🍖',
    'empty.title': '暂时没有找到相关资源',
    'empty.desc': '请尝试更换筛选条件，或者为社区贡献第一个资源！',
    'footer.about': '关于我们',
    'footer.terms': '服务条款',
    'footer.privacy': '隐私政策',
    'marquee.text1': '用AI践行一切可行的自动化验证',
    'marquee.text2': '让先行者吃肉',
    'marquee.text3': '智能母体',
    
    // Categories
    'cat.智能母体': '智能母体',
    'cat.跨境电商': '跨境电商',
    'cat.视频电商': '视频电商',
    'cat.自媒体运行': '自媒体运行',
    'cat.广告营销推广': '广告营销推广',
    'cat.AI 硬件': 'AI 硬件',
    'cat.创意设计': '创意设计',
    'cat.社群福利': '社群福利',
    
    'type.motherbody': '智能母体',
    'type.agent': 'Agent',
    'type.skill': 'Skill',
    'type.mcp': 'MCP',
    'type.prompt': 'Prompt',
    'type.opensource_soft': '开源软件',
  },
  en: {
    'nav.all': 'All',
    'nav.allTypes': 'All Types',
    'nav.submit': 'Submit Resource',
    'hero.title1': 'Why Choose',
    'hero.subtitle': 'Practice all feasible automated verifications with AI, let the pioneers eat meat. This is a community built by technology and idealists, complementing resources and learning skills.',
    'hero.tag': 'AI is Unstoppable',
    'hero.start': 'Quick Start',
    'hero.startDesc': 'We curate automated software, skills, and MCPs recommended by industry elites. We provide direct official or cloud drive links without hosting any code, allowing you to quickly deploy them to your agent.',
    'hero.browse': 'Browse Resources',
    'card.copy': 'Get Resource',
    'card.copied': 'Link Copied',
    
    // CLI Section
    'cli.tag': 'Developer Tools',
    'cli.title': 'Local CLI Search',
    'cli.subtitle': 'Love the terminal? Search and get direct links to resources directly from your local machine with a single command.',
    'cli.search': 'Search by Type',
    'cli.pull': 'Get Direct Links',
    
    'join.title': 'Join Us',
    'join.pull': 'Direct Access',
    'join.pullDesc': 'Access curated automated software, skills, and MCPs via official or cloud drive links. Safe and reliable.',
    'join.community': 'Community & Wiki',
    'join.communityDesc': 'Dedicated community and knowledge base for automation. Find answers quickly.',
    'join.elite': 'Seeking Elites',
    'join.eliteDesc': 'Looking for partners in E-commerce, AI Coding, Marketing, and Product Design.',
    'join.contribute': 'Contribute',
    'join.contributeDesc': 'Start by sharing a unique automation tool. Prepare the official link or cloud drive link, write the docs, and email us or submit via the button above for review.',
    'welfare.tag': 'Official Community',
    'welfare.title': 'Join AUTO-BUILDING Core Group',
    'welfare.desc': 'A dedicated community and knowledge base for automation. Find answers quickly. Looking for partners in E-commerce, AI Coding, Marketing, and Product Design.',
    'welfare.feature1': 'Resource & Skill Exchange',
    'welfare.feature2': 'Elite Practical Experience',
    'welfare.scan': 'Scan to join WeChat',
    'welfare.action': 'Scan to join and eat meat 🍖',
    'empty.title': 'No resources found',
    'empty.desc': 'Try changing filters or contribute the first resource!',
    'footer.about': 'About Us',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'marquee.text1': 'Automate everything with AI',
    'marquee.text2': 'Pioneers take all',
    'marquee.text3': 'Motherbody',
    
    // Categories
    'cat.智能母体': 'AI Brains',
    'cat.跨境电商': 'Cross-border E-commerce',
    'cat.视频电商': 'Video E-commerce',
    'cat.自媒体运行': 'Social Media Ops',
    'cat.广告营销推广': 'Ad & Marketing',
    'cat.AI 硬件': 'AI Hardware',
    'cat.创意设计': 'Creative Design',
    'cat.社群福利': 'Community Welfare',
    
    'type.motherbody': 'Motherbody',
    'type.agent': 'Agent',
    'type.skill': 'Skill',
    'type.mcp': 'MCP',
    'type.prompt': 'Prompt',
    'type.opensource_soft': 'Open Source',
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [lang, setLang] = useState<Language>('zh');

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
