import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { config } from 'dotenv';

config();

interface Resource {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  primaryCategory: string;
  secondaryCategory: string;
  capabilityTags: string[];
  applicableCategories: string[];
  isUniversal: boolean;
  downloadUrl: string;
  source: string;
  sourceUrl: string;
  metrics: {
    stars: number;
    forks: number;
    trendScore: number;
  };
  llmAnalysis: {
    innovationPoints: string[];
    recommendationReason: string;
    technicalHighlight: string;
    applicableScenarios: string[];
  };
  status: string;
  scrapedAt: string;
}

function log(msg: string) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function main() {
  log('🚀 开始发布流程...');
  log('');

  // 1. 读取已通过审核的资源
  if (!existsSync('./src/data/all-resources.json')) {
    log('❌ 错误: 没有找到已审核的资源数据');
    log('请先运行采集和审核流程');
    process.exit(1);
  }

  const allData = JSON.parse(readFileSync('./src/data/all-resources.json', 'utf-8'));
  const approvedResources: Resource[] = (allData.resources || [])
    .filter((r: Resource) => r.status === 'approved');

  log(`📦 审核通过的资源: ${approvedResources.length} 个`);
  log('');

  // 2. 转换为网站格式
  const websiteResources = approvedResources.map((item: Resource) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    primaryCategory: item.primaryCategory,
    secondaryCategory: item.secondaryCategory,
    downloadUrl: item.downloadUrl,
    version: '1.0.0',
    author: item.source,
    tags: item.capabilityTags,
    imageUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${item.id}&backgroundColor=b6e3f4`,
    externalLinks: [
      { label: '来源', url: item.sourceUrl },
      { label: 'GitHub', url: item.sourceUrl }
    ]
  }));

  // 3. 保存到 src/data/approved-resources.json
  if (!existsSync('./src/data')) {
    mkdirSync('./src/data');
  }

  writeFileSync(
    './src/data/approved-resources.json',
    JSON.stringify({ resources: websiteResources }, null, 2)
  );
  log('✅ 已保存到 src/data/approved-resources.json');

  // 4. Git 提交
  const commitMessage = `🤖 Auto-update: 添加 ${approvedResources.length} 个审核通过资源`;

  try {
    log('');
    log('📤 推送到 GitHub...');
    
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });

    log('');
    log('========================================');
    log('✅ 已推送到 GitHub!');
    log('🌐 Vercel 将自动部署（约需 1-2 分钟）');
    log('========================================');
  } catch (e) {
    log('');
    log('⚠️ Git 推送失败或没有需要提交的更改');
    log('但数据已保存到本地');
  }
}

main();
