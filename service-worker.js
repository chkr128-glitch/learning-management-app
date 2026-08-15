const CACHE_NAME = 'studyloop-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon.png'
];

// インストール時にファイルを保存（キャッシュ）する
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// ネットワーク通信時に、保存したデータがあればそれを返す
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュ内にデータがあればそれを返す（オフラインでも表示可能に）
        if (response) {
          return response;
        }
        // なければ通常通りインターネットから取得する
        return fetch(event.request);
      })
  );
});
