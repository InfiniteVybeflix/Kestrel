const V = 'kestrel-v4';
const SHELL = ['./', 'index.html', 'core.js', 'ui.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x != V).map(x => caches.delete(x)))).then(() => self.clients.claim())));
// Network first so updates apply immediately; the cache keeps the app working offline.
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method != 'GET' || r.url.includes('peerjs.com')) return;
  e.respondWith(fetch(r).then(res => { if (res.ok || res.type == 'opaque') { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); } return res; }).catch(() => caches.match(r)));
});
