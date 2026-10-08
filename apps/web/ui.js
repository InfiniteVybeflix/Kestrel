// Settings, themes, wallpapers and the saved-rooms store. Everything lives in localStorage.
const $ = s => document.querySelector(s);
const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
export const J = (k, d) => { try { return JSON.parse(localStorage[k]) ?? d; } catch { return d; } };
export const S = { name: '', theme: 'auto', accent: 'gold', wp: 'dots', dim: 0, font: 1, bub: 'round', enter: 1, time: 1, sound: 1, notif: 0, save: 1, keep: 1, receipts: 1, ttl: 0, ...J('ks', {}) };
export const saveS = () => localStorage.ks = JSON.stringify(S);
export const rooms = () => J('kr', []);
export const putRooms = l => localStorage.kr = JSON.stringify(l);
export const AC = { gold: ['#f2b705', '#ffdc62'], mint: ['#2fd1a0', '#8ff0cf'], rose: ['#ff7f9c', '#ffc0cf'], sky: ['#4cb8ff', '#a5dcff'], lilac: ['#a78bfa', '#d3c5ff'] };
export const WP = { none: '', dots: 'radial-gradient(#88888855 1.6px,transparent 1.7px) 0 0/22px 22px', grid: 'linear-gradient(#88888824 1px,transparent 1px) 0 0/26px 26px,linear-gradient(90deg,#88888824 1px,transparent 1px) 0 0/26px 26px', sunrise: 'linear-gradient(160deg,#fff3c4,#ffd25a 55%,#f0a800)', dusk: 'linear-gradient(160deg,#35506e,#141e30)', meadow: 'linear-gradient(160deg,#d9f7c8,#7fd6a0)', blush: 'linear-gradient(160deg,#ffe3ea,#ffb3c6)' };
export function look(r = {}) {
  const dark = S.theme == 'night' || (S.theme == 'auto' && matchMedia('(prefers-color-scheme:dark)').matches);
  const [g, g3] = AC[r.accent || S.accent] || AC.gold, d = document.documentElement, w = r.wp || S.wp;
  d.dataset.th = dark ? 'night' : 'day'; d.dataset.bs = S.bub;
  d.style.setProperty('--g', g); d.style.setProperty('--g3', g3); d.style.setProperty('--fz', S.font);
  const img = w == 'custom' ? localStorage[r.wp ? 'kw_' + r.code : 'kw'] : '';
  const layer = img ? `url("${img}") center/cover` : WP[w] || '', sh = `rgba(0,0,0,${S.dim / 100})`;
  $('#msgs').style.background = (layer ? `linear-gradient(${sh},${sh}),${layer},` : '') + 'var(--pa)';
}
export function build(host, defs, obj, on) {
  host.replaceChildren(...defs.map(([k, l, t, o]) => {
    const row = el('label', 'set'); row.append(el('span', '', l)); let i;
    if (t == 'select') { i = el('select'); o.forEach(([v, n]) => { const p = el('option', '', n); p.value = v; i.append(p); }); i.value = obj[k] ?? o[0][0]; }
    else if (t == 'toggle') { i = el('input'); i.type = 'checkbox'; i.checked = !!obj[k]; }
    else if (t == 'range') { i = el('input'); i.type = 'range'; i.min = 0; i.max = 60; i.value = obj[k] || 0; }
    else { i = el('input'); i.type = 'text'; i.maxLength = 24; i.value = obj[k] || ''; }
    i.onchange = i.oninput = () => { obj[k] = t == 'toggle' ? +i.checked : t == 'range' ? +i.value : i.value !== '' && !isNaN(i.value) ? +i.value : i.value; on(k); };
    row.append(i); return row;
  }));
}
