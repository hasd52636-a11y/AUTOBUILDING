# Auto-Building 🤖

> AI 工具资源自动采集、审核、发布系统

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 配置 .env 文件（见下方）
cp .env.example .env

# 3. 启动开发服务器
npm run dev
```

## 完整使用说明

**详细文档请查看 [USAGE.md](./USAGE.md)**

### 核心命令

| 命令 | 功能 |
|------|------|
| `npm run dev` | 启动网站（localhost:3000） |
| `npm run scrape` | 采集 AI 工具资源 |
| `npm run classify` | 分类和翻译 |
| `npm run process` | 处理审核通过的资源 |
| `npm run publish` | 发布到 GitHub |
| `npm run daily` | 执行完整每日流程 |

### 审核界面

运行 `npm run dev` 后访问：
- http://localhost:3000 - 首页
- http://localhost:3000/review - 审核页面
- http://localhost:3000/about - 关于我们
- http://localhost:3000/terms - 服务条款
- http://localhost:3000/privacy - 隐私政策

## 配置

创建 `.env` 文件：

```bash
# GitHub Token（必须）
GITHUB_TOKEN=你的GitHub_TOKEN

# 可选：通知
# TELEGRAM_BOT_TOKEN=
# TELEGRAM_CHAT_ID=
# WEBHOOK_URL=
```

## 技术栈

- React + TypeScript + Vite + TailwindCSS
- Node.js + Playwright + Octokit
- AI: NVIDIA API / Google AI
- 部署: Vercel

## GitHub 仓库

https://github.com/hasd52636-a11y/AUTOBUILDING

---

详细使用说明请阅读 [USAGE.md](./USAGE.md)
