# 🚀 Auto-Building 快速使用指南

## 首次运行

### 1. 安装依赖
```bash
npm install
```

### 2. 运行采集和分类
```bash
# Windows
run-daily.cmd

# 或手动执行
npx tsx scripts/scrape-all.ts
npx tsx scripts/classify.ts
```

### 3. 启动审核界面
```bash
# 启动开发服务器
npm run dev

# 浏览器打开审核页面
http://localhost:3000/review
```

### 4. 审核并发布
- 在审核页面查看待审核资源
- 点击"一键通过"或逐个审核
- 审核完成后运行:
```bash
# Windows
publish.cmd
```

---

## 日常使用流程

```
┌─────────────────────────────────────────────────────────────┐
│                     每日工作流程                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 运行采集 (每日一次)                                      │
│     → 双击 run-daily.cmd                                   │
│     → 自动采集 + 分类 + 生成待审核                           │
│                                                             │
│  2. 审核 (人工)                                             │
│     → 浏览器打开 http://localhost:3000/review             │
│     → 查看详情 → 一键通过 / 逐个审核                        │
│                                                             │
│  3. 发布                                                    │
│     → 双击 publish.cmd                                     │
│     → 自动推送到 GitHub                                    │
│     → Vercel 自动部署                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 配置说明

### 环境变量 (.env)

```
GOOGLE_API_KEY=你的Google API Key
GITHUB_TOKEN=你的GitHub Token
```

### 数据文件

| 文件 | 说明 |
|-----|------|
| `data/raw-resources.json` | 采集的原始数据 |
| `data/all-resources.json` | 全部已分类资源 |
| `data/pending-review.json` | 待审核资源 |

---

## 注意事项

1. **Google API 配额**: 免费版有配额限制，LLM分类会消耗配额
2. **GitHub Token**: 需要有读取仓库的权限
3. **定时执行**: 可使用 Windows 任务计划程序定时运行 `run-daily.cmd`

---

## 故障排除

### LLM 分类失败
- 原因: Google API 配额用完
- 解决: 系统会自动使用规则匹配作为备选

### GitHub 采集失败
- 检查 GITHUB_TOKEN 是否有效
- 网络是否正常

### 审核页面无法访问
- 确保开发服务器正在运行: `npm run dev`
- 检查端口 3000 是否被占用
