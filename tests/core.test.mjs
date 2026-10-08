import test from 'node:test';
import assert from 'node:assert/strict';
import { makeCode, normCode, addMsg } from '../apps/web/core.js';

test('codes round-trip and normalise', () => {
  const c = makeCode();
  assert.match(c, /^[A-Z2-9]{3}-[A-Z2-9]{3}$/);
  assert.equal(normCode(c.toLowerCase().replace('-', ' ')), c);
  assert.equal(normCode('abc'), '');
});
test('messages dedupe and stay ordered', () => {
  const l = [];
  assert.ok(addMsg(l, { id: 'b', ts: 2 })); assert.ok(addMsg(l, { id: 'a', ts: 1 }));
  assert.ok(!addMsg(l, { id: 'a', ts: 1 }));
  assert.deepEqual(l.map(m => m.id), ['a', 'b']);
});

import { destroyAt, expired, left } from '../apps/web/core.js';
test('destroy timers', () => {
  assert.equal(destroyAt('never'), 'never'); assert.equal(destroyAt('close'), 'close');
  assert.equal(destroyAt('1h', 1000), 1000 + 36e5);
  assert.ok(expired({ d: 5 }, 10)); assert.ok(!expired({ d: 'close' }, 10)); assert.ok(!expired({ d: 20 }, 10));
  assert.equal(left(5 * 6e4), '5 min'); assert.equal(left(3 * 36e5), '3 h');
});
