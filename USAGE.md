# Auto-Building 项目使用说明

## 项目简介

这是一个 AI 工具资源自动采集、审核、发布的全自动化系统。

- **采集**: 从 GitHub 和目录网站自动采集 AI 工具资源
- **分类**: 使用规则 + LLM 进行智能分类和翻译
- **审核**: Web 界面审核待入库资源
- **发布**: 自动推送到 GitHub，Vercel 自动部署

---

## 目录结构

```
auto-building/
├── src/                          # 前端网站源码
│   ├── pages/                    # 页面组件
│   │   ├── AboutPage.tsx        # 关于我们
│   │   ├── PrivacyPage.tsx     # 隐私政策
│   │   ├── TermsPage.tsx       # 服务条款
│   │   └── ReviewPage.tsx      # 审核页面
│   ├── components/              # UI 组件
│   ├── data/                    # 数据文件（重要！）
│   │   ├── approved-resources.json  # 已审核资源（网站展示用）
│   │   ├── all-resources.json        # 全部资源
│   │   ├── pending-review.json       # 待审核队列
│   │   └── raw-resources.json         # 原始采集数据
│   └── ...
├── scripts/                      # 自动化脚本
│   ├── scrape-all.ts           # 1. 采集资源
│   ├── classify.ts             # 2. 分类翻译
│   ├── process-approved.ts     # 3. 处理审核通过
│   └── publish.ts              # 4. 推送到GitHub
├── config/                      # 配置文件
│   ├── category-rules.json     # 分类规则
│   └── sources.json            # 数据源配置
├── .env                        # 环境变量（API密钥）
├── package.json
└── README.md
```

---

## 快速开始

### 1. 环境准备

**安装 Node.js**
- 下载: https://nodejs.org (推荐 v18+)

**克隆项目**
```bash
git clone https://github.com/hasd52636-a11y/AUTOBUILDING.git
cd AUTOBUILDING
```

**安装依赖**
```bash
npm install
```

### 2. 配置 API 密钥

编辑 `.env` 文件，添加以下内容：

```bash
# GitHub Token（必须）- 用于采集GitHub仓库
GITHUB_TOKEN=你的GitHub_TOKEN

# 可选：通知配置
# TELEGRAM_BOT_TOKEN=
# TELEGRAM_CHAT_ID=
# WEBHOOK_URL=
```

**获取 GitHub Token:**
1. 登录 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 生成新 Token，勾选 `repo` 权限
3. 复制 Token 到 `.env`

---

## 日常使用流程

### 完整流程（推荐）

```bash
# 一步完成所有步骤
npm run daily
```

### 手动分步执行

#### 步骤 1: 采集资源
```bash
npx tsx scripts/scrape-all.ts
```
- 从 GitHub 和目录网站采集 AI 工具
- 输出: `src/data/raw-resources.json`

#### 步骤 2: 分类翻译
```bash
npx tsx scripts/classify.ts
```
- 自动分类（中英文翻译）
- 输出: 
  - `src/data/pending-review.json`（待审核）
  - `src/data/all-resources.json`（全部已处理）

#### 步骤 3: 审核资源
```bash
npm run dev
```
打开 http://localhost:3000/review 进行审核

审核通过后，运行：
```bash
npx tsx scripts/process-approved.ts
```
- 合并审核通过的资源
- 去重、排序
- 输出: `src/data/approved-resources.json`

#### 步骤 4: 发布
```bash
npx tsx scripts/publish.ts
```
- 自动提交到 GitHub
- Vercel 自动部署

---

## Windows 快速脚本

项目根目录已包含以下批处理文件，直接双击即可：

| 文件 | 功能 |
|------|------|
| `run-daily.cmd` | 执行每日完整流程 |
| `publish.cmd` | 立即发布到 GitHub |

---

## 审核界面使用

1. 运行 `npm run dev`
2. 打开 http://localhost:3000/review
3. 每个资源显示：
   - 标题、描述、来源链接
   - 热度数据（stars、forks）
   - AI 分析（创新点、推荐理由）
   - 一级/二级分类（可修改）
4. 点击 ✅ 通过 或 ❌ 拒绝

---

## 移动项目到新电脑

### 方法 1: Git 克隆（推荐）

```bash
# 克隆到新电脑
git clone https://github.com/hasd52636-a11y/AUTOBUILDING.git
cd AUTOBUILDING

# 安装依赖
npm install

# 配置 .env 文件（需要重新获取 GitHub Token）
```

### 方法 2: 复制整个文件夹

1. 复制整个 `auto-building` 文件夹到新电脑
2. **必须**重新运行 `npm install`
3. 确保 `.env` 文件存在且包含有效 Token

---

## 数据文件说明

| 文件 | 用途 | 重要性 |
|------|------|--------|
| `approved-resources.json` | 网站展示的核心数据 | ⭐⭐⭐ 必须推送 |
| `all-resources.json` | 所有已处理资源 | ⭐⭐ 建议保留 |
| `pending-review.json` | 待审核资源 | ⭐⭐ 审核用 |
| `raw-resources.json` | 原始采集数据 | ⭐ 可删除 |

---

## 常见问题

### Q: 采集失败/速度慢
A: 检查 `.env` 中的 `GITHUB_TOKEN` 是否有效，或网络代理是否正常

### Q: 审核页面空白
A: 确保 `pending-review.json` 中有待审核资源

### Q: 发布后网站没更新
A: 等待 1-2 分钟，Vercel 自动部署完成后刷新

### Q: 如何只运行某个步骤
A: 参见上面的"手动分步执行"章节

---

## 技术栈

- **前端**: React + TypeScript + Vite + TailwindCSS
- **后端脚本**: Node.js + Playwright + Octokit
- **AI**: NVIDIA API (Qwen 模型) / Google AI
- **部署**: Vercel + GitHub

---

## 许可证

MIT License
