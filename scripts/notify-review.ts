import { writeFileSync, readFileSync, existsSync } from 'fs';

interface ReviewItem {
  id: string;
  title: { zh: string; en: string };
  primaryCategory: string;
  secondaryCategory: string;
  metrics: { stars: number; forks: number; trendScore: number };
  llmAnalysis: { recommendationReason: string };
  sourceUrl: string;
}

function generateReviewMessage() {
  if (!existsSync('./data/pending-review.json')) {
    console.log('⚠️ 没有待审核数据');
    return null;
  }

  const data = JSON.parse(readFileSync('./data/pending-review.json', 'utf-8'));
  const items: ReviewItem[] = data.pending || [];

  if (items.length === 0) {
    console.log('ℹ️ 暂无待审核内容');
    return null;
  }

  const today = new Date().toLocaleDateString('zh-CN');

  let message = `# 📋 今日待审核资源\n\n`;
  message += `> 日期: ${today}\n`;
  message += `> 总数: ${items.length} 个\n\n`;

  // 按一级分类分组
  const byCategory: Record<string, ReviewItem[]> = {};
  items.forEach(item => {
    const cat = item.primaryCategory;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(item);
  });

  for (const [category, categoryItems] of Object.entries(byCategory)) {
    message += `## 📁 ${category} (${categoryItems.length}个)\n\n`;
    categoryItems.forEach((item, i) => {
      message += `${i + 1}. **${item.title.zh}**\n`;
      message += `   - 类型: ${item.secondaryCategory}\n`;
      message += `   - ⭐ ${item.metrics.stars} | 🔀 ${item.metrics.forks}\n`;
      message += `   - 💡 ${item.llmAnalysis.recommendationReason?.slice(0, 60) || ''}...\n`;
      message += `   - 🔗 [查看](${item.sourceUrl})\n\n`;
    });
  }

  message += `---\n`;
  message += `🔗 **审核地址**: http://localhost:3000/review\n`;
  message += `⏰ 请在审核完成后运行 \`publish.cmd\` 发布到网站\n`;

  // 保存到文件
  writeFileSync('./data/today-review-message.md', message);

  console.log('✅ 审核通知已生成');
  console.log(`📋 待审核: ${items.length} 个`);
  console.log('');

  return message;
}

generateReviewMessage();
