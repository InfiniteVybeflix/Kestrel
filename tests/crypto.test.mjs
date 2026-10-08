import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveKey, seal, open } from '../apps/web/crypto.js';

test('round-trips a message', async () => {
  const k = await deriveKey('secret', 'r#1');
  assert.deepEqual(await open(k, await seal(k, { t: 'hi' })), { t: 'hi' });
});
test('wrong key cannot read', async () => {
  const s = await seal(await deriveKey('a', 'r#1'), { t: 'hi' });
  await assert.rejects(open(await deriveKey('b', 'r#1'), s));
});
