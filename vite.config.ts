import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'serve-knowledge-json',
        configureServer(server) {
          server.middlewares.use('/api/knowledge.json', async (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            
            try {
              // 优先读取已审核数据
              let data;
              try {
                data = fs.readFileSync(path.join(__dirname, 'src/data/approved-resources.json'), 'utf-8');
              } catch {
                const { MOCK_RESOURCES } = await server.ssrLoadModule('/src/data/resources.ts');
                data = JSON.stringify(MOCK_RESOURCES);
              }
              const resources = JSON.parse(data);
              const simplifiedData = (resources.resources || resources).map((item: any) => ({
                id: item.id,
                name: item.title,
                desc: item.description,
                cat: item.primaryCategory,
                type: item.secondaryCategory,
                url: item.downloadUrl
              }));
              res.end(JSON.stringify(simplifiedData));
            } catch (e) {
              res.end(JSON.stringify({ error: "Failed to load resources" }));
            }
          });

          server.middlewares.use('/api/review/pending', async (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            
            try {
              const data = fs.readFileSync(path.join(__dirname, 'src/data/pending-review.json'), 'utf-8');
              res.end(data);
            } catch (e) {
              res.end(JSON.stringify({ pending: [], total: 0 }));
            }
          });

          server.middlewares.use('/api/review/approved', async (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            
            try {
              const data = fs.readFileSync(path.join(__dirname, 'src/data/approved-resources.json'), 'utf-8');
              res.end(data);
            } catch (e) {
              res.end(JSON.stringify({ resources: [] }));
            }
          });
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
