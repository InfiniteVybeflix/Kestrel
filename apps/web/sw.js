const V = 'kestrel-v2';
const SHELL = ['./', 'index.html', 'core.js', 'ui.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x != V).map(x => caches.delete(x)))).then(() => self.clients.claim())));
// Stale-while-revalidate: opens instantly, even offline, and updates in the background.
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method != 'GET' || r.url.includes('peerjs.com')) return;
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => { if (res.ok || res.type == 'opaque') { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
