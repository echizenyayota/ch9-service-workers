// Service worker code goes in here!
var cacheVersion = "v1",
    cachedAssets = [
        "/css/global.css",
        "/js/debounce.js",
        "/js/nav.js",
        "/js/attach-nav.js",
        "/img/global/jeremy.svg",
        "/img/global/icon-github.svg",
        "/img/global/icon-email.svg",
        "/img/global/icon-twitter.svg",
        "/img/global/icon-linked-in.svg",
    ];

self.addEventListener("install", function(event) {
  event.waitUntil(caches.open(cacheVersion).then(function(cache) { // chashes -> caches
      return cache.addAll(cachedAssets); // chache -> cache
  }).then(function() {
      return self.skipWaiting();
  }));
});

self.addEventListener("activate", function(){
    return self.clients.claim();
});
