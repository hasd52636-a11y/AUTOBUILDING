import { writeFileSync, readFileSync, existsSync } from 'fs';

function processApprovedResources() {
  console.log('🔄 处理已通过资源...');
  
  // 读取数据
  const allData = JSON.parse(readFileSync('./src/data/all-resources.json', 'utf-8'));
  const pendingData = JSON.parse(readFileSync('./src/data/pending-review.json', 'utf-8'));
  
  // 合并所有资源
  const allResources = [...allData.resources, ...pendingData.pending];
  
  // 按ID去重，保留最新的
  const uniqueMap = new Map();
  allResources.forEach(item => {
    uniqueMap.set(item.id, item);
  });
  
  // 获取所有approved的资源
  let approved = Array.from(uniqueMap.values())
    .filter(item => item.status === 'approved');
  
  // 修复分类名称
  approved = approved.map(item => {
    let secondary = item.secondaryCategory;
    if (secondary.includes('opensource_soft')) {
      secondary = 'opensource_soft';
    }
    return { ...item, secondaryCategory: secondary };
  });
  
  // 按一级分类+二级分类分组，然后按名称字母排序
  const categorized: Record<string, typeof approved> = {};
  
  approved.forEach(item => {
    const key = `${item.primaryCategory}-${item.secondaryCategory}`;
    if (!categorized[key]) categorized[key] = [];
    categorized[key].push(item);
  });
  
  // 每个分类内按名称排序
  const sortedApproved: typeof approved = [];
  
  Object.keys(categorized).sort().forEach(key => {
    categorized[key].sort((a, b) => {
      const nameA = (a.title.zh || a.title.en || '').toLowerCase();
      const nameB = (b.title.zh || b.title.en || '').toLowerCase();
      return nameA.localeCompare(nameB, 'zh-CN');
    });
    sortedApproved.push(...categorized[key]);
  });
  
  console.log(`✅ 去重后: ${sortedApproved.length} 个`);
  
  // 修复分类名称
  const fixedApproved = sortedApproved.map(item => {
    let secondary = item.secondaryCategory;
    // 修复重复的分类名
    if (secondary.includes('opensource_soft')) {
      secondary = 'opensource_soft';
    }
    return { ...item, secondaryCategory: secondary };
  });
  
  // 保存
  writeFileSync(
    './src/data/approved-resources.json',
    JSON.stringify({ resources: fixedApproved }, null, 2)
  );
  
  console.log('✅ 已保存到 src/data/approved-resources.json');
  
  // 打印分类统计
  const stats: Record<string, number> = {};
  sortedApproved.forEach(item => {
    const key = `${item.primaryCategory} - ${item.secondaryCategory}`;
    stats[key] = (stats[key] || 0) + 1;
  });
  
  console.log('\n📊 分类统计:');
  Object.entries(stats).forEach(([key, count]) => {
    console.log(`  ${key}: ${count}`);
  });
}

processApprovedResources();
