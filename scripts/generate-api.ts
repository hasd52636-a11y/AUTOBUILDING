import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const approvedPath = path.join(__dirname, '../src/data/approved-resources.json');
const outputDir = path.join(__dirname, '../public/api');
const outputPath = path.join(outputDir, 'knowledge.json');

const data = JSON.parse(fs.readFileSync(approvedPath, 'utf-8'));
const resources = data.resources || data;

const simplified = resources.map((item: any) => ({
  id: item.id,
  name: item.title?.zh || item.title?.en || item.title || '',
  nameEn: item.title?.en || item.title?.zh || item.title || '',
  desc: item.description?.zh || item.description?.en || item.description || '',
  descEn: item.description?.en || item.description?.zh || item.description || '',
  category: item.primaryCategory || '',
  type: item.secondaryCategory || '',
  url: item.downloadUrl || item.url || '',
  version: item.version || '1.0.0',
  tags: item.capabilityTags || item.tags || [],
  imageUrl: item.imageUrl || '',
  videoUrl: item.videoPreviewUrl || '',
  externalLinks: item.externalLinks || []
}));

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(simplified, null, 2));

console.log(`Generated ${outputPath} with ${simplified.length} resources`);
