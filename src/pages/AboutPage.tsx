import React from 'react';
import { BookOpen, Shield, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">关于 AUTO-BUILDING</h1>
          <p className="text-xl text-gray-600">智能体资源枢纽</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">我们的使命</h2>
            <p className="text-gray-700 leading-relaxed">
              AUTO-BUILDING 是由一群技术与理想主义者共同构建的 AI 自动化资源社区。
              我们致力于收录并分享经过行业精英实践验证的自动化软件、技能（Skill）、
              MCP 协议工具及提示词模板，帮助每一位先行者快速搭建属于自己的智能工作流。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">为什么选择我们</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">精选高质量资源，经过人工审核</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">自动采集最新 AI 工具，保持内容时效</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">中英文双语支持，方便国内外用户</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">开源免费，持续更新</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">资源分类</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: '智能母体', color: 'bg-purple-100 text-purple-700' },
                { name: '跨境电商', color: 'bg-blue-100 text-blue-700' },
                { name: '视频电商', color: 'bg-pink-100 text-pink-700' },
                { name: '自媒体运营', color: 'bg-yellow-100 text-yellow-700' },
                { name: '广告营销', color: 'bg-red-100 text-red-700' },
                { name: 'AI 硬件', color: 'bg-green-100 text-green-700' },
                { name: '创意设计', color: 'bg-indigo-100 text-indigo-700' },
                { name: '社群福利', color: 'bg-orange-100 text-orange-700' }
              ].map((cat) => (
                <div key={cat.name} className={`px-4 py-2 rounded-lg ${cat.color} text-center text-sm font-medium`}>
                  {cat.name}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">联系我们</h2>
            <div className="flex flex-col gap-3 text-gray-700">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-600" />
                <span>邮箱：contact@auto-building.example</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-3 text-blue-600" />
                <span>GitHub：github.com/hasd52636-a11y/AUTOBUILDING</span>
              </div>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t text-center text-gray-500 text-sm">
            <p>© 2024 AUTO-BUILDING. All rights reserved.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
