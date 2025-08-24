const CACHE_NAME = 'anoldmedia-v1';
const ASSETS = [
  './index.html',
  './assets/css/styles.css',
  './assets/js/main.js',
  './assets/images/logo.svg',
  './pages/live.html',
  './pages/shows.html',
  './pages/schedule.html',
  './pages/about.html',
  './pages/contact.html',
  './data/shows.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => {
      if (key !== CACHE_NAME) return caches.delete(key);
    })))
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});