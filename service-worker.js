const CACHE_NAME = "lalarunner-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./metrunner01-120.png",
  "./metrunner01-152.png",
  "./metrunner01-167.png",
  "./metrunner01-180.png"
];

// インストール時にキャッシュ
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// 古いキャッシュの整理
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// オフライン対応：キャッシュ優先
self.addEventListener("fetch", event => {
  const request = event.request;

  // GET 以外は素通し
  if (request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        return cached;
      }
      return fetch(request).catch(() => {
        // オフラインでキャッシュもないときは何もしない（必要ならフォールバック画面を返す）
        return caches.match("./index.html");
      });
    })
  );
});
