export { default } from '../../server/recommend.mjs';
export const config = {
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'], action: 'rate_limit' },
};
