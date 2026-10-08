const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const makeCode = () => {
  const s = [...crypto.getRandomValues(new Uint8Array(6))].map(x => A[x % A.length]).join('');
  return s.slice(0, 3) + '-' + s.slice(3);
};
export const normCode = s => {
  const t = (s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return t.length === 6 ? t.slice(0, 3) + '-' + t.slice(3) : '';
};
export const addMsg = (list, m) => {
  if (list.some(x => x.id === m.id)) return false;
  list.push(m); list.sort((a, b) => a.ts - b.ts); return true;
};
export const DESTROY = { '1h': 36e5, '1d': 864e5, '7d': 6048e5 };
export const destroyAt = (m, now = Date.now()) => m === 'close' ? 'close' : DESTROY[m] ? now + DESTROY[m] : 'never';
export const expired = (r, now = Date.now()) => typeof r.d === 'number' && now > r.d;
export const left = ms => { const m = Math.max(1, Math.ceil(ms / 6e4)); return m < 60 ? m + ' min' : m < 1440 ? Math.round(m / 60) + ' h' : Math.round(m / 1440) + ' d'; };
