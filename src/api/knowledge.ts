import { MOCK_RESOURCES } from '../data/resources';

export function getKnowledgeJson() {
  // 简化数据结构，只保留智能体检索需要的核心字段，减小文件体积
  const simplifiedData = MOCK_RESOURCES.map(res => ({
    id: res.id,
    name: res.title,
    desc: res.description,
    cat: res.primaryCategory,
    type: res.secondaryCategory,
    url: res.downloadUrl
  }));

  return JSON.stringify(simplifiedData, null, 2);
}
