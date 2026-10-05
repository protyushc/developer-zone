/**
 * Service Worker for Web Playground PWA
 * Provides full offline support, asset pre-caching, and instant loading.
 */

const CACHE_NAME = 'webplayground-cache-v4';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './favicon.ico',
  './assets/css/styles.css',
  './assets/js/app.js',
  './manifest.json',
  // Standard & Desktop Icons
  './assets/icons/favicon.ico',
  './assets/icons/icon-16.png',
  './assets/icons/icon-32.png',
  './assets/icons/icon-48.png',
  './assets/icons/icon-72.png',
  './assets/icons/icon-96.png',
  './assets/icons/icon-128.png',
  './assets/icons/icon-144.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-256.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-192.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/icon.svg',
  './assets/icons/icon-maskable.svg',
  // Vendor JS Libraries & CodeMirror
  './vendor/jszip/jszip.min.js',
  './vendor/codemirror/codemirror.min.css',
  './vendor/codemirror/codemirror.min.js',
  './vendor/codemirror/theme/dracula.min.css',
  './vendor/codemirror/theme/eclipse.min.css',
  './vendor/codemirror/mode/xml/xml.min.js',
  './vendor/codemirror/mode/javascript/javascript.min.js',
  './vendor/codemirror/mode/css/css.min.js',
  './vendor/codemirror/mode/htmlmixed/htmlmixed.min.js',
  './vendor/codemirror/addon/edit/closetag.min.js',
  './vendor/codemirror/addon/edit/closebrackets.min.js',
  './vendor/codemirror/addon/selection/active-line.min.js',
  // Vendor Fonts
  './vendor/fonts/fonts.css',
  './vendor/fonts/1-uU9NCBsR6Z2vfE9aq3bh0NSDulI.woff2',
  './vendor/fonts/2-uU9NCBsR6Z2vfE9aq3bh2dSDulI.woff2',
  './vendor/fonts/3-uU9NCBsR6Z2vfE9aq3bh0dSDulI.woff2',
  './vendor/fonts/4-uU9NCBsR6Z2vfE9aq3bh3tSDulI.woff2',
  './vendor/fonts/5-uU9NCBsR6Z2vfE9aq3bhZ_Wmh2uX.woff2',
  './vendor/fonts/6-uU9NCBsR6Z2vfE9aq3bh09SDulI.woff2',
  './vendor/fonts/7-uU9NCBsR6Z2vfE9aq3bh3dSD.woff2',
  './vendor/fonts/8-uU9NCBsR6Z2vfE9aq3bh0NSDulI.woff2',
  './vendor/fonts/9-uU9NCBsR6Z2vfE9aq3bh2dSDulI.woff2',
  './vendor/fonts/10-uU9NCBsR6Z2vfE9aq3bh0dSDulI.woff2',
  './vendor/fonts/11-uU9NCBsR6Z2vfE9aq3bh3tSDulI.woff2',
  './vendor/fonts/12-uU9NCBsR6Z2vfE9aq3bhZ_Wmh2uX.woff2',
  './vendor/fonts/13-uU9NCBsR6Z2vfE9aq3bh09SDulI.woff2',
  './vendor/fonts/14-uU9NCBsR6Z2vfE9aq3bh3dSD.woff2',
  './vendor/fonts/15-uU9NCBsR6Z2vfE9aq3bh0NSDulI.woff2',
  './vendor/fonts/16-uU9NCBsR6Z2vfE9aq3bh2dSDulI.woff2',
  './vendor/fonts/17-uU9NCBsR6Z2vfE9aq3bh0dSDulI.woff2',
  './vendor/fonts/18-uU9NCBsR6Z2vfE9aq3bh3tSDulI.woff2',
  './vendor/fonts/19-uU9NCBsR6Z2vfE9aq3bhZ_Wmh2uX.woff2',
  './vendor/fonts/20-uU9NCBsR6Z2vfE9aq3bh09SDulI.woff2',
  './vendor/fonts/21-uU9NCBsR6Z2vfE9aq3bh3dSD.woff2',
  './vendor/fonts/22-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2',
  './vendor/fonts/23-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2',
  './vendor/fonts/24-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2',
  './vendor/fonts/25-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2',
  './vendor/fonts/26-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2',
  './vendor/fonts/27-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
  './vendor/fonts/28-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2',
  './vendor/fonts/29-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2',
  './vendor/fonts/30-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2',
  './vendor/fonts/31-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2',
  './vendor/fonts/32-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2',
  './vendor/fonts/33-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2',
  './vendor/fonts/34-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
  './vendor/fonts/35-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2',
  './vendor/fonts/36-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2',
  './vendor/fonts/37-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2',
  './vendor/fonts/38-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2',
  './vendor/fonts/39-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2',
  './vendor/fonts/40-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2',
  './vendor/fonts/41-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
  './vendor/fonts/42-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2',
  './vendor/fonts/43-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2',
  './vendor/fonts/44-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2',
  './vendor/fonts/45-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2',
  './vendor/fonts/46-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2',
  './vendor/fonts/47-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2',
  './vendor/fonts/48-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
  './vendor/fonts/49-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2'
];

// Install: pre-cache all assets and activate immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up outdated caches and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache with network fallback and dynamic caching
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignore non-GET requests and non-http(s) schemes (e.g. data:, blob:, chrome-extension:)
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Handle HTML navigation requests: Network-first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match('./index.html').then((cached) => cached || caches.match(request));
        })
    );
    return;
  }

  // Handle manifest.json: Network-first to ensure immediate propagation of app name and icon updates
  if (request.url.includes('manifest.json')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./manifest.json')))
    );
    return;
  }

  // Static assets: Cache-first with network fallback & background update
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache (stale-while-revalidate for local assets)
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse);
            });
          }
        }).catch(() => {
          // Network failure is expected in offline mode; silently ignore
        });
        return cachedResponse;
      }

      // If not in cache, fetch from network and store in cache
      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      });
    })
  );
});

// Listen for skip waiting messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

