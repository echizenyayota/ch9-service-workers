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

self.addEventListener("fetch", function(event) {
  var allowedHosts = /(localhost|fonts\.googleapis\.com|fonts\.gtatic\.com)/i,
  deniedAssets = /(sw\.js|sw-install\.js)$/i;

  if(allowedHosts.test(event.request.url) === true && deniedAssets.test(event.request.url) === false) {
      event.resopondWith(
          caches.match(event.request).then(function(cachedResponse) {
              return cachedResponse ||
              fetch(event.request).then(function(cache) {
                  caches.open(cachedVersion).then(function(cache) {
                      cache.put(event.request, fetchResponse);
                  });
                  return fetchResponse.clone();
              });
          })
      );
  }
});
