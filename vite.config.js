import { defineConfig, loadEnv } from 'vite';
import { createHandler } from './server/recommend.mjs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'OPENAI_');
  const handle = createHandler({ getKey: () => process.env.OPENAI_API_KEY || env.OPENAI_API_KEY });
  return { base: './', plugins: [{ name: 'local-recommend-api', configureServer(server) {
    server.middlewares.use('/.netlify/functions/recommend', async (req, res) => {
      try {
        const request = new Request(`http://${req.headers.host}/.netlify/functions/recommend`, {
          method: req.method, headers: req.headers,
          ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: req, duplex: 'half' } : {}),
        });
        const response = await handle(request);
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(await response.text());
      } catch { res.writeHead(500, { 'Content-Type': 'application/json' }); res.end('{"error":"Local API error"}'); }
    });
  } }] };
});
