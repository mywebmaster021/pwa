// service-worker.js

// Cache the app's assets during the installation phase
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        '/js/main.js',
        '/assets/icons/icon-192x192.png',
        '/assets/icons/icon-512x512.png'
      ]);
    })
  );
});

// Intercept fetch requests and serve cached assets when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);  // Serve from cache or fetch from the network
    })
  );
});
