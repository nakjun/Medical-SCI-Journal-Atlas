import { getStore } from '@netlify/blobs';
import { createHandler } from '../../server/recommend.mjs';
// 256 slots bound storage; collisions evict entries, never mix results.
const store = () => getStore({ name: 'journal-recommendation-cache', consistency: 'strong' });
const sharedCache = {
  async get(key) {
    const row = await store().get(key.slice(0, 2), { type: 'json' });
    return row?.key === key ? row.entry : null;
  },
  async set(key, entry) { await store().setJSON(key.slice(0, 2), { key, entry }); },
};
export default createHandler({ sharedCache });
export const config = {
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'], action: 'rate_limit' },
};
