import React from 'react';
import { Shield, Eye, Lock, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">隐私政策</h1>
          <p className="text-gray-600">最后更新：2024年3月</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-blue-600" />
              概述
            </h2>
            <p className="text-gray-700 leading-relaxed">
              AUTO-BUILDING（以下简称"本平台"）高度重视用户隐私。本隐私政策说明我们在您使用本平台服务时如何收集、使用、存储和保护您的个人信息。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2 text-blue-600" />
              信息收集
            </h2>
            <p className="text-gray-700 mb-4">我们收集以下信息：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>提交的资源信息</strong> - 用户主动提交，用于审核、展示、搜索</li>
              <li><strong>邮箱地址</strong> - 用户主动填写（提交资源时），用于审核通知、回复联系</li>
              <li><strong>浏览记录</strong> - 匿名统计，用于改进服务</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-blue-600" />
              信息使用
            </h2>
            <p className="text-gray-700 leading-relaxed">
              我们使用收集的信息为您提供服务，包括：展示您提交的资源、
              向您发送审核通知、改进平台功能和分析使用情况。我们不会将您的个人信息出售给第三方。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">数据安全</h2>
            <p className="text-gray-700 leading-relaxed">
              我们采用行业标准的安全措施保护您的数据，包括加密存储、访问控制和定期安全审计。
              但请注意，互联网传输并非完全安全，我们无法保证绝对安全。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">您的权利</h2>
            <p className="text-gray-700 leading-relaxed">
              您有权访问、更正或删除您的个人信息。如需帮助，请联系我们。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">联系我们</h2>
            <p className="text-gray-700 leading-relaxed">
              如有隐私相关问题，请联系：contact@auto-building.example
            </p>
          </section>

          <section className="mt-12 pt-8 border-t text-center text-gray-500 text-sm">
            <p>© 2024 AUTO-BUILDING. All rights reserved.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
