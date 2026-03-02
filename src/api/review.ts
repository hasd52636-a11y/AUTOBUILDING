import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface ReviewItem {
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
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  scrapedAt: string;
  approvedAt?: string;
  reviewNote?: string;
}

function getDataPath(filename: string): string {
  return join(__dirname, '../data', filename);
}

export function getPendingReview(): { pending: ReviewItem[]; total: number } {
  const path = getDataPath('pending-review.json');
  
  if (!existsSync(path)) {
    return { pending: [], total: 0 };
  }
  
  const data = JSON.parse(readFileSync(path, 'utf-8'));
  return {
    pending: data.pending || [],
    total: data.total || 0
  };
}

export function getApprovedResources(): ReviewItem[] {
  const path = getDataPath('all-resources.json');
  
  if (!existsSync(path)) {
    return [];
  }
  
  const data = JSON.parse(readFileSync(path, 'utf-8'));
  return (data.resources || []).filter((r: ReviewItem) => r.status === 'approved');
}

export function approveItem(id: string, note?: string): boolean {
  const pendingPath = getDataPath('pending-review.json');
  const allPath = getDataPath('all-resources.json');
  
  if (!existsSync(pendingPath) || !existsSync(allPath)) {
    return false;
  }
  
  const pendingData = JSON.parse(readFileSync(pendingPath, 'utf-8'));
  const allData = JSON.parse(readFileSync(allPath, 'utf-8'));
  
  // 从pending中移除
  const itemIndex = pendingData.pending.findIndex((r: ReviewItem) => r.id === id);
  if (itemIndex === -1) return false;
  
  const item = pendingData.pending.splice(itemIndex, 1)[0];
  item.status = 'approved';
  item.approvedAt = new Date().toISOString();
  item.reviewNote = note;
  
  // 添加到all-resources
  const existingIndex = allData.resources.findIndex((r: ReviewItem) => r.id === id);
  if (existingIndex >= 0) {
    allData.resources[existingIndex] = item;
  } else {
    allData.resources.push(item);
  }
  
  // 保存
  writeFileSync(pendingPath, JSON.stringify(pendingData, null, 2));
  writeFileSync(allPath, JSON.stringify(allData, null, 2));
  
  return true;
}

export function rejectItem(id: string, note?: string): boolean {
  const pendingPath = getDataPath('pending-review.json');
  
  if (!existsSync(pendingPath)) {
    return false;
  }
  
  const pendingData = JSON.parse(readFileSync(pendingPath, 'utf-8'));
  
  const itemIndex = pendingData.pending.findIndex((r: ReviewItem) => r.id === id);
  if (itemIndex === -1) return false;
  
  // 标记为rejected并移除
  pendingData.pending.splice(itemIndex, 1);
  
  writeFileSync(pendingPath, JSON.stringify(pendingData, null, 2));
  
  return true;
}

export function approveAll(): { success: number; failed: number } {
  const pendingPath = getDataPath('pending-review.json');
  const allPath = getDataPath('all-resources.json');
  
  if (!existsSync(pendingPath) || !existsSync(allPath)) {
    return { success: 0, failed: 0 };
  }
  
  const pendingData = JSON.parse(readFileSync(pendingPath, 'utf-8'));
  const allData = JSON.parse(readFileSync(allPath, 'utf-8'));
  
  let success = 0;
  let failed = 0;
  
  for (const item of pendingData.pending) {
    item.status = 'approved';
    item.approvedAt = new Date().toISOString();
    
    const existingIndex = allData.resources.findIndex((r: ReviewItem) => r.id === item.id);
    if (existingIndex >= 0) {
      allData.resources[existingIndex] = item;
    } else {
      allData.resources.push(item);
    }
    success++;
  }
  
  // 清空pending
  pendingData.pending = [];
  
  writeFileSync(pendingPath, JSON.stringify(pendingData, null, 2));
  writeFileSync(allPath, JSON.stringify(allData, null, 2));
  
  return { success, failed };
}
