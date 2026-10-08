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
