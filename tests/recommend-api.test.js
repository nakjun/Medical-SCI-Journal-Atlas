import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler, validateResult, MODEL } from '../server/recommend.mjs';
import { journals } from '../src/data.js';
const request = (body = { topic: 'age prediction' }, options = {}) => new Request('https://atlas.test/.netlify/functions/recommend', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://atlas.test' }, body: JSON.stringify(body), ...options });
const result = { interpretation: '뇌 MRI 또는 얼굴 영상 등 입력 데이터에 따라 추천 분야 상이', recommendations: [{ id: 'springer-1', reason: '의료 AI·계산의학 범위와 연결 · 의료 데이터 기반 나이 예측 조건' }] };
const ok = value => Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(value) }] }] });

test('missing key returns a safe configuration message without calling OpenAI', async () => {
  const handle = createHandler({ getKey: () => '', fetchImpl: () => assert.fail('unexpected call') });
  assert.equal((await handle(request())).status, 503);
});
test('rejects invalid input, oversized payload, wrong origin and unsupported requests', async () => {
  const handle = createHandler({ getKey: () => 'test', fetchImpl: () => assert.fail('unexpected call') });
  for (const body of [null, {}, { topic: '' }, { topic: 'x'.repeat(2001) }, { topic: 'age', nonOaOnly: 'true' }]) assert.equal((await handle(request(body))).status, 400);
  assert.equal((await handle(request({ topic: 'x'.repeat(13000) }))).status, 413);
  assert.equal((await handle(request({}, { headers: { origin: 'https://evil.test' } }))).status, 403);
  assert.equal((await handle(request({}, { headers: { 'content-type': 'text/plain' } }))).status, 415);
  assert.equal((await handle(new Request('https://atlas.test/api'))).status, 405);
});
test('uses server-only key, fixed Luna model, scoped catalog and bounded cache', async () => {
  let count = 0; let clock = 0;
  const handle = createHandler({ getKey: () => 'private-test-key', now: () => clock, fetchImpl: async (url, options) => {
    count++;
    assert.equal(url, 'https://api.openai.com/v1/responses');
    assert.equal(options.headers.Authorization, 'Bearer private-test-key');
    const body = JSON.parse(options.body);
    assert.equal(body.model, MODEL); assert.equal(body.store, false);
    assert.equal(body.max_output_tokens, 3000);
    const catalog = JSON.parse(body.instructions.split('Catalog: ')[1]);
    assert.ok(catalog.every(row => journals.find(j => j.id === row.id).nonOaApc === 0));
    return ok(result);
  } });
  const query = { topic: 'age prediction', nonOaOnly: true };
  const response = await handle(request(query));
  assert.equal(response.status, 200);
  const value = await response.json();
  assert.equal(value.model, 'gpt-6-luna');
  assert.equal(JSON.stringify(value).includes('private-test-key'), false);
  await handle(request(query)); assert.equal(count, 1);
  clock = 600001; await handle(request(query)); assert.equal(count, 2);
});
test('rejects invented, duplicate, excluded IDs and unbounded generated reasons', () => {
  const eligible = journals.filter(j => j.nonOaApc === 0);
  for (const recommendations of [[{ id: 'fake', reason: 'reason' }], [result.recommendations[0], result.recommendations[0]], [{ id: 'springer-2', reason: 'reason' }], [{ id: 'springer-1', reason: 'x'.repeat(501) }]]) assert.throws(() => validateResult({ ...result, recommendations }, eligible));
});
test('upstream errors, refusals and truncation stay safe for fallback', async () => {
  const scenarios = [() => Response.json({ error: 'secret upstream debug' }, { status: 401 }), () => Response.json({ status: 'incomplete' }), () => ok({ ...result, recommendations: [{ id: 'fake', reason: 'fake' }] }), () => { throw new Error('private debug'); }];
  for (const fetchImpl of scenarios) {
    const response = await createHandler({ getKey: () => 'test', fetchImpl })(request());
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /secret|private|debug/);
  }
  assert.equal((await createHandler({ getKey: () => 'test', fetchImpl: () => Response.json({}, { status: 429 }) })(request())).status, 429);
});
