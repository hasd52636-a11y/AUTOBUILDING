import React from 'react';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">服务条款</h1>
          <p className="text-gray-600">最后更新：2024年3月</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 服务接受</h2>
            <p className="text-gray-700 leading-relaxed">
              AUTO-BUILDING（以下简称"本平台"）向用户提供 AI 自动化资源的浏览、检索、下载服务。
              用户在使用本平台前，请仔细阅读本服务条款。使用本平台即表示您同意接受本条款的约束。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 服务描述</h2>
            <p className="text-gray-700 leading-relaxed">
              本平台提供 AI 自动化相关资源的索引和链接服务，包括但不限于：
              自动化软件、技能（Skill）、MCP 协议工具、提示词模板等。
              本平台不直接提供资源下载，而是链接到第三方来源。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 用户行为规范</h2>
            <p className="text-gray-700 mb-4">您同意不使用本平台：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>上传或发布非法、有害、歧视性或侵犯他人权利的内容</li>
              <li>进行任何可能损害、干扰或未经授权访问本平台的行为</li>
              <li>商业广告或垃圾信息</li>
              <li>其他违反法律法规的行为</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 知识产权</h2>
            <p className="text-gray-700 leading-relaxed">
              本平台上的资源内容归原作者或原机构所有。本平台仅提供索引和链接服务，
              不对资源的知识产权归属负责。如您认为您的权益被侵犯，请联系我们处理。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 免责声明</h2>
            <p className="text-gray-700 leading-relaxed">
              本平台按"原样"提供资源，不做任何明示或暗示的保证。用户需自行判断资源的可用性和适用性。
              本平台不对因使用本平台服务导致的任何损失负责，包括但不限于直接损失、间接损失或利润损失。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 服务变更与终止</h2>
            <p className="text-gray-700 leading-relaxed">
              本平台保留随时修改、暂停或终止服务的权利，恕不另行通知。
              对于服务的任何变更，您继续使用本平台即表示接受这些变更。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 联系我们</h2>
            <p className="text-gray-700 leading-relaxed">
              如有任何问题，请联系：contact@auto-building.example
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
