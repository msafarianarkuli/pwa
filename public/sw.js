const staticCacheName = 'site-static-v5';
const dynamicCacheName = 'site-dynamic-v5';
const assets = [
  '/',
  'index.html',
  '/static/js/bundle.js',
  '/favicon.ico',
  '/logo192.png',
  '/manifest.json',
  '/static/media/p1.178ff787d529770a6544.png',
  '/about-me',
  '/contact-me',
  '/albums',
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(
            (key) =>
              key !== staticCacheName && key !== dynamicCacheName
          )
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          });
        })
      );
    })
    // .catch(() => {
    // if (evt.request.url.indexOf('.html') > -1) {
    // return caches.match('/offline');
    // }
    // })
  );
});
