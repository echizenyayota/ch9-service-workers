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
    event.waitUntil(chashes.open(cacheVersion).then(function(cache) {
        return chache.addAll(cachedAssets);
    }).then(function() {
        return self.skipWainting();
    }));
});

self.addEventListener("activate", function(){
    return self.clients.claim();
});
