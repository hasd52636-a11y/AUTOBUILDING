import { Octokit } from '@octokit/rest';
import { chromium } from 'playwright';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

interface RawResource {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  source: string;
  sourceUrl: string;
  type: 'agent' | 'skill' | 'mcp' | 'prompt' | 'opensource_soft';
  tags: string[];
  stars: number;
  forks: number;
  trendScore: number;
  scrapedAt: string;
  isUniversal: boolean;
}

const configData = JSON.parse(readFileSync('./config/sources.json', 'utf-8'));
const categoryRules = JSON.parse(readFileSync('./config/category-rules.json', 'utf-8'));

function log(msg: string) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function generateId(): string {
  return `auto-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

async function scrapeGitHubRepo(owner: string, repo: string): Promise<RawResource[]> {
  try {
    const { data } = await octokit.repos.get({ owner, repo });
    
    const readme = await octokit.repos.getReadme({ owner, repo });
    const readmeContent = Buffer.from(readme.data.content, 'base64').toString('utf-8');
    
    const resources: RawResource[] = [];
    const lines = readmeContent.split('\n');
    let inTable = false;
    
    for (const line of lines) {
      if (line.includes('|') && line.includes('---')) {
        inTable = true;
        continue;
      }
      
      if (inTable && line.includes('|')) {
        const cols = line.split('|').filter(c => c.trim() && c.trim() !== '-');
        if (cols.length >= 2) {
          const title = cols[1]?.trim() || '';
          const url = cols[2]?.trim() || '';
          const desc = cols[3]?.trim() || '';
          
          if (title && (url.includes('http') || url.includes('github'))) {
            resources.push({
              id: generateId(),
              title: title,
              titleEn: title,
              description: desc || '暂无描述',
              descriptionEn: desc || 'No description',
              source: `${owner}/${repo}`,
              sourceUrl: url.startsWith('http') ? url : `https://github.com/${url}`,
              type: detectType(title, desc),
              tags: extractTags(title, desc),
              stars: data.stargazers_count,
              forks: data.forks_count,
              trendScore: data.stargazers_count + data.forks_count * 2,
              scrapedAt: new Date().toISOString(),
              isUniversal: isUniversalTool(title, desc)
            });
          }
        }
      }
    }
    
    return resources;
  } catch (e) {
    log(`  ⚠️ 采集失败 ${owner}/${repo}: ${e}`);
    return [];
  }
}

async function scrapeDirectory(url: string, sourceName: string): Promise<RawResource[]> {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    await page.waitForTimeout(2000);
    
    const items = await page.evaluate(() => {
      const results: any[] = [];
      
      const cards = document.querySelectorAll('[class*="card"], [class*="item"], [class*="resource"], article, .item');
      
      cards.forEach((card) => {
        const titleEl = card.querySelector('h1, h2, h3, h4, [class*="title"], a[class*="title"]');
        const descEl = card.querySelector('p, [class*="description"], [class*="desc"]');
        const linkEl = card.querySelector('a[href]');
        const tagEls = card.querySelectorAll('[class*="tag"], [class*="badge"], span[class*="tag"]');
        
        const title = titleEl?.textContent?.trim() || '';
        const description = descEl?.textContent?.trim() || '';
        const link = linkEl?.getAttribute('href') || '';
        
        if (title && link) {
          results.push({
            title,
            description: description.slice(0, 200),
            link: link.startsWith('http') ? link : `https://${link}`,
            tags: Array.from(tagEls).map(t => t.textContent?.trim()).filter(Boolean)
          });
        }
      });
      
      return results;
    });
    
    await browser.close();
    
    return items.map(item => ({
      id: generateId(),
      title: item.title,
      titleEn: item.title,
      description: item.description || '暂无描述',
      descriptionEn: item.description || 'No description',
      source: sourceName,
      sourceUrl: item.link,
      type: detectType(item.title, item.description),
      tags: item.tags,
      stars: 0,
      forks: 0,
      trendScore: 0,
      scrapedAt: new Date().toISOString(),
      isUniversal: isUniversalTool(item.title, item.description)
    }));
  } catch (e) {
    log(`  ⚠️ 采集失败 ${sourceName}: ${e}`);
    return [];
  }
}

async function searchGitHubByTopic(topic: string, minStars: number = 10): Promise<RawResource[]> {
  try {
    const { data } = await octokit.search.repos({
      q: `topic:${topic} stars:>${minStars}`,
      sort: 'stars',
      order: 'desc',
      per_page: 20
    });
    
    return data.items.map(repo => ({
      id: generateId(),
      title: repo.name.replace(/[-_]/g, ' '),
      titleEn: repo.name,
      description: repo.description || '暂无描述',
      descriptionEn: repo.description || 'No description',
      source: 'GitHub Search',
      sourceUrl: repo.html_url,
      type: detectType(repo.name, repo.description || ''),
      tags: repo.topics || [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      trendScore: repo.stargazers_count + repo.forks_count * 2,
      scrapedAt: new Date().toISOString(),
      isUniversal: isUniversalTool(repo.name, repo.description || '')
    }));
  } catch (e) {
    log(`  ⚠️ 搜索失败 ${topic}: ${e}`);
    return [];
  }
}

function detectType(title: string, desc: string): RawResource['type'] {
  const text = `${title} ${desc}`.toLowerCase();
  
  if (text.includes('mcp')) return 'mcp';
  if (text.includes('prompt') || text.includes('提示词')) return 'prompt';
  if (text.includes('skill') || text.includes('技能')) return 'skill';
  if (text.includes('agent') || text.includes('智能体') || text.includes('agent')) return 'agent';
  if (text.includes('open source') || text.includes('开源')) return 'opensource_soft';
  
  return 'agent';
}

function extractTags(title: string, desc: string): string[] {
  const text = `${title} ${desc}`.toLowerCase();
  const tags: string[] = [];
  
  const keywordTags: Record<string, string> = {
    'memory': '记忆/知识',
    'browser': '浏览器自动化',
    'file': '文件处理',
    'slack': '通讯集成',
    'discord': '通讯集成',
    'database': '数据库',
    'api': 'API集成',
    'image': '图像处理',
    'video': '视频处理',
    'audio': '语音处理',
    'code': '代码生成',
    'workflow': '工作流',
    'multimodal': '多模态'
  };
  
  for (const [key, tag] of Object.entries(keywordTags)) {
    if (text.includes(key)) tags.push(tag);
  }
  
  return [...new Set(tags)];
}

function isUniversalTool(title: string, desc: string): boolean {
  const text = `${title} ${desc}`.toLowerCase();
  const universalKeywords = [
    'memory', 'browser', 'file system', 'filesystem', 'slack', 'discord',
    'telegram', 'gmail', 'notion', 'database', 'sql', 'git', 'github',
    'api', 'webhook', 'http', 'json', 'tool', 'utility', 'general'
  ];
  
  return universalKeywords.some(kw => text.includes(kw));
}

async function scrapeAll() {
  log('🚀 开始采集资源...');
  log('');
  
  const allResources: RawResource[] = [];
  const seenUrls = new Set<string>();
  
  // 1. 从配置的GitHub仓库采集
  log('📦 从GitHub仓库采集...');
  const githubSources = configData.sources.filter((s: any) => s.type === 'github' && s.enabled);
  
  for (const source of githubSources) {
    const [owner, repo] = source.repo.split('/');
    log(`  → 采集 ${owner}/${repo}`);
    const items = await scrapeGitHubRepo(owner, repo);
    items.forEach(item => {
      if (!seenUrls.has(item.sourceUrl)) {
        seenUrls.add(item.sourceUrl);
        allResources.push(item);
      }
    });
    log(`    采集到 ${items.length} 个`);
  }
  
  // 2. 搜索通用型工具（记忆、浏览器等）
  log('');
  log('🔍 搜索通用型工具...');
  const universalTopics = ['claude-mcp', 'openai-tools', 'ai-agents', 'langchain-tools'];
  
  for (const topic of universalTopics) {
    const items = await searchGitHubByTopic(topic, 5);
    items.forEach(item => {
      if (!seenUrls.has(item.sourceUrl)) {
        seenUrls.add(item.sourceUrl);
        allResources.push(item);
      }
    });
  }
  
  // 注意：AI硬件采集已禁用，因为需要视频内容
  // 如需启用，请参考 resources.ts 中的静态数据
  
  // 4. 目录网站采集
  log('');
  log('🌐 采集目录网站...');
  const dirSources = configData.sources.filter((s: any) => s.type === 'directory' && s.enabled);
  
  for (const source of dirSources) {
    log(`  → 采集 ${source.name}`);
    const items = await scrapeDirectory(source.url, source.name);
    items.forEach(item => {
      if (!seenUrls.has(item.sourceUrl)) {
        seenUrls.add(item.sourceUrl);
        allResources.push(item);
      }
    });
    log(`    采集到 ${items.length} 个`);
  }
  
  // 去重
  log('');
  log('📊 去重处理...');
  const uniqueMap = new Map<string, RawResource>();
  for (const item of allResources) {
    const key = item.sourceUrl.toLowerCase();
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    } else {
      const existing = uniqueMap.get(key)!;
      if (item.stars > existing.stars) {
        uniqueMap.set(key, item);
      }
    }
  }
  
  const finalResources = Array.from(uniqueMap.values());
  
  // 按热度排序
  finalResources.sort((a, b) => b.trendScore - a.trendScore);
  
  log('');
  log(`✅ 采集完成! 共 ${finalResources.length} 个资源`);
  
  // 保存原始数据
  if (!existsSync('./src/data')) mkdirSync('./src/data');
  
  const output = {
    resources: finalResources,
    total: finalResources.length,
    scrapedAt: new Date().toISOString()
  };
  
  writeFileSync('./src/data/raw-resources.json', JSON.stringify(output, null, 2));
  log('📁 已保存到 src/data/raw-resources.json');
  
  return output;
}

scrapeAll().catch(console.error);
