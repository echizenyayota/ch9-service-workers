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
  deniedAssets = /(sw\.js|sw-install\.js)$/i;,
  htmlDocument = /(\/|\.html)$/i;
  if(allowedHosts.test(event.request.url) === true && deniedAssets.test(event.request.url) === false) {
      if (htmlDocument.test(event.request.url) === true) {
          event.respondWith(
              fetch(event.request).then(function(response) {
                  caches.open(cacheVersion).then(function(cache) {
                      cache.put(event.request, response.clone());
                  });
                  return response;
              }).catch(function() {
                  return caches.match(event.request);
              })
          );
      } else {
          event.respondWith(
              caches.match(event.request).then(function(cachedResponse) {
                  return cachedResponse ||
                  fetch(event.request).then(function(fetchedResponse) {
                      caches.open(cacheVersion).then(function(cache) {
                          cache.put(event.request, fetchedResponse);
                      });
                      return fetchedResponse.clone();
                  });
              })
          );
      }
  }
});
