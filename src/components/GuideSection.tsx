import React, { useState } from 'react';
import { Terminal, Search, Download, ChevronRight, Bot, X, Copy, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function GuideSection() {
  const { t, lang } = useLanguage();
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 动态生成基于当前域名的技能文件 Prompt
  const generateSkillPrompt = () => {
    const domain = window.location.origin;
    
    if (lang === 'zh') {
      return `# Role
你是 AUTO-BUILDING 社区的专属知识库助手。你的任务是帮助用户在社区资源库中快速检索自动化工具、Agent、MCP 和开源软件。

# Workflow
1. 当用户询问寻找工具或资源时（例如："帮我找一个自动剪辑的工具" 或 "/找资源 自动剪辑"）。
2. 你必须首先使用联网工具 (Web Fetch / Browse) 静默读取此 JSON 数据源：
   \`${domain}/api/knowledge.json\`
3. 在你读取到的 JSON 数据中，根据用户的关键词（如分类、名称、描述）进行匹配。
4. 将找到的资源以清晰的列表形式回复给用户，必须包含：工具名称、分类、简介和直达链接。
5. 如果没有找到匹配的资源，请回复："在 AUTO-BUILDING 知识库中暂未收录相关工具，建议您换个关键词，或前往社区提交需求。"

# Constraints
- 仅根据读取到的 JSON 数据回答，不要捏造不存在的工具链接。
- 保持极客、专业的语气。`;
    } else {
      return `# Role
You are the exclusive knowledge base assistant for the AUTO-BUILDING community. Your task is to help users quickly search for automation tools, Agents, MCPs, and open-source software in the community repository.

# Workflow
1. When a user asks for a tool or resource (e.g., "Find me an auto-editing tool" or "/search auto-editing").
2. You MUST first use your web browsing tool (Web Fetch) to silently read this JSON data source:
   \`${domain}/api/knowledge.json\`
3. In the JSON data you read, match the user's keywords against categories, names, and descriptions.
4. Reply to the user with the found resources in a clear list format, which MUST include: Tool Name, Category, Description, and Direct Link.
5. If no matching resources are found, reply: "No related tools found in the AUTO-BUILDING knowledge base. Please try another keyword or submit a request to the community."

# Constraints
- Answer ONLY based on the JSON data read. Do not fabricate non-existent tool links.
- Maintain a geeky, professional tone.`;
    }
  };

  return (
    <section className="bg-[var(--color-brutal-purple)] text-white py-24 px-6 border-t-8 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-[var(--color-brutal-yellow)] brutal-border-pill font-black text-sm mb-8">
              <Terminal className="w-4 h-4" />
              <span>{t('cli.tag')}</span>
            </div>
            <h2 className="font-black text-5xl md:text-7xl uppercase leading-none tracking-tight mb-6 text-black" style={{ textShadow: '2px 2px 0 #fff' }}>
              {t('cli.title')}
            </h2>
            <p className="text-xl font-bold mb-8 text-black bg-white inline-block p-2 brutal-border">
              {t('cli.subtitle')}
            </p>

            <div className="space-y-6">
              <div className="bg-black p-6 brutal-border rounded-xl transform -rotate-1 hover:rotate-0 transition-transform">
                <h3 className="text-[var(--color-brutal-yellow)] font-black text-xl mb-2 flex items-center gap-2">
                  <Search className="w-5 h-5" /> {t('cli.search')}
                </h3>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-green-400 flex items-center gap-2 overflow-x-auto">
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  <span>npx auto-building search --type <span className="text-yellow-400">agent</span></span>
                </div>
              </div>

              <div className="bg-black p-6 brutal-border rounded-xl transform rotate-1 hover:rotate-0 transition-transform">
                <h3 className="text-[var(--color-brutal-cyan)] font-black text-xl mb-2 flex items-center gap-2">
                  <Download className="w-5 h-5" /> {t('cli.pull')}
                </h3>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-green-400 flex items-center gap-2 overflow-x-auto">
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                  <span>npx auto-building pull <span className="text-yellow-400">&lt;resource-id&gt;</span></span>
                </div>
              </div>

              {/* Get Skill File Button */}
              <div className="pt-4">
                <button 
                  onClick={() => setShowSkillModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-brutal-yellow)] text-black px-6 py-4 font-black text-lg brutal-border hover:translate-x-[-4px] hover:translate-y-[-4px] brutal-shadow transition-all rounded-xl"
                >
                  <Bot className="w-6 h-6" />
                  {lang === 'zh' ? '获取专属智能体技能 (Agent Skill)' : 'Get Agent Skill File'}
                </button>
                <p className="mt-3 text-sm font-bold text-black bg-white/80 p-2 rounded brutal-border inline-block">
                  {lang === 'zh' 
                    ? '将技能文件复制到 ChatGPT / Claude 中，直接对话检索本站资源。' 
                    : 'Copy the skill file to ChatGPT / Claude to search resources via chat.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            {/* Mock Terminal Window */}
            <div className="bg-black brutal-border rounded-xl overflow-hidden brutal-shadow-lg transform lg:rotate-2">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs font-mono text-gray-400">auto-building-cli</span>
              </div>
              <div className="p-6 font-mono text-sm text-gray-300 space-y-4 h-[400px] overflow-y-auto">
                <div>
                  <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> npx auto-building search --type mcp
                </div>
                <div className="text-yellow-400">🔍 正在检索 MCP 资源...</div>
                <div className="space-y-2">
                  <div className="text-white">ID: 2 | 天气查询MCP (v2.1.0)</div>
                  <div className="text-gray-500">实时天气查询MCP包，支持全国城市，精准到小时。</div>
                  <div className="text-white">ID: 6 | 社群自动回复MCP (v1.2.0)</div>
                  <div className="text-gray-500">接入微信/Discord，根据知识库自动回复常见问题。</div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> npx auto-building get 2
                </div>
                <div className="text-green-400">✅ 成功获取资源链接: 天气查询MCP</div>
                <div className="text-gray-400">直达链接: https://pan.baidu.com/s/1xxxxxx</div>
                <div className="animate-pulse text-gray-500 mt-2">_</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white text-black brutal-border brutal-shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b-4 border-black bg-[var(--color-brutal-yellow)]">
              <h3 className="font-black text-xl flex items-center gap-2">
                <Bot className="w-6 h-6" />
                {lang === 'zh' ? '智能体专属技能文件 (Prompt)' : 'Agent Skill File (Prompt)'}
              </h3>
              <button 
                onClick={() => setShowSkillModal(false)}
                className="p-1 hover:bg-black hover:text-white transition-colors brutal-border rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-[var(--color-brutal-bg)]">
              <p className="font-bold mb-4 text-gray-800">
                {lang === 'zh' 
                  ? '将以下内容复制并粘贴到您的智能体（如 ChatGPT Custom Instructions, Coze, Dify, OpenWebUI）的系统提示词中。' 
                  : 'Copy and paste the following content into the system prompt of your Agent (e.g., ChatGPT Custom Instructions, Coze, Dify, OpenWebUI).'}
              </p>
              
              <div className="relative group">
                <pre className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-x-auto brutal-border">
                  {generateSkillPrompt()}
                </pre>
                <button
                  onClick={() => handleCopy(generateSkillPrompt())}
                  className="absolute top-2 right-2 bg-white text-black p-2 rounded brutal-border hover:bg-[var(--color-brutal-yellow)] transition-colors flex items-center gap-2"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-xs font-bold">{copied ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制代码' : 'Copy')}</span>
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-white brutal-border">
                <h4 className="font-black mb-2 flex items-center gap-2">💡 {lang === 'zh' ? '使用方法示例' : 'Usage Example'}</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm space-y-2">
                  <p className="text-blue-600 font-bold">User: {lang === 'zh' ? '/找资源 帮我找一个做小红书文案的工具' : '/search Help me find a tool for copywriting'}</p>
                  <p className="text-gray-700">
                    <span className="font-bold text-purple-600">Agent:</span> {lang === 'zh' ? '正在为您检索 AUTO-BUILDING 知识库... 找到了！' : 'Searching AUTO-BUILDING knowledge base... Found it!'}
                    <br/>
                    <span className="font-bold">【小红书爆款文案】(Prompt)</span>
                    <br/>
                    简介：自动生成高转化率的小红书文案模板...
                    <br/>
                    直达链接：https://example.com/...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
