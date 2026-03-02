import express from 'express';
import { getPendingReview, getApprovedResources, approveItem, rejectItem, approveAll, ReviewItem } from './src/api/review';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 获取待审核列表
app.get('/api/review/pending', (req, res) => {
  try {
    const data = getPendingReview();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// 获取已通过列表
app.get('/api/review/approved', (req, res) => {
  try {
    const data = getApprovedResources();
    res.json({ resources: data });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// 批准单个
app.post('/api/review/:id/approve', (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  const success = approveItem(id, note);
  res.json({ success });
});

// 拒绝单个
app.post('/api/review/:id/reject', (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  const success = rejectItem(id, note);
  res.json({ success });
});

// 一键通过全部
app.post('/api/review/approve-all', (req, res) => {
  const result = approveAll();
  res.json(result);
});

// 发布到网站
app.post('/api/publish', (req, res) => {
  try {
    const { execSync } = require('child_process');
    
    // 读取审核通过的资源
    const approved = getApprovedResources();
    
    // 转换为网站格式
    const websiteResources = approved.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      primaryCategory: item.primaryCategory,
      secondaryCategory: item.secondaryCategory,
      downloadUrl: item.downloadUrl,
      version: '1.0.0',
      tags: item.capabilityTags,
      imageUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${item.id}&backgroundColor=b6e3f4`,
      externalLinks: [{ label: '来源', url: item.sourceUrl }]
    }));
    
    // 写入文件
    const fs = require('fs');
    fs.writeFileSync(
      './src/data/approved-resources.json',
      JSON.stringify({ resources: websiteResources }, null, 2)
    );
    
    // Git 操作
    try {
      execSync('git add .', { stdio: 'inherit' });
      execSync(`git commit -m "🤖 Auto-update: 添加 ${approved.length} 个审核通过资源"`, { stdio: 'inherit' });
      execSync('git push origin main', { stdio: 'inherit' });
      
      res.json({ 
        success: true, 
        message: `已推送到 GitHub，Vercel 将自动部署`,
        count: approved.length
      });
    } catch (gitError) {
      res.json({ 
        success: true, 
        message: `已保存到本地，但 Git 推送失败: ${gitError}`,
        count: approved.length
      });
    }
  } catch (e) {
    res.status(500).json({ success: false, error: String(e) });
  }
});

app.listen(PORT, () => {
  console.log(`🎯 Review API Server running on http://localhost:${PORT}`);
});
