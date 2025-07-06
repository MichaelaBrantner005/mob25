
const CACHE_NAME = "kwm-cache-v1";
const CACHED_URLS = [
    "css/materialize.min.css",
    "css/styles.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v143/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "img/logo.svg",
    "js/app.js",
    "js/zitate.js",
    "js/materialize.min.js",
    "pages/mehr.html",
    "pages/zitate.html",
    "pages/neuerBeitrag.html",
    "index.html",
    "/",
    "manifest.webmanifest",
    "favicon.ico",
];

self.addEventListener("install", function(event) {
    console.log("Service Worker installing.");
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(c) {
            return c.addAll(CACHED_URLS);
        }).catch((err)=>{
            console.error(err);
        })
    );
})

// Network first, falling back to cache strategy
self.addEventListener("fetch", function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request).then(function(response) {
                return response;
            });
        })
    );
});

self.addEventListener("activate",(event)=>{
    event.waitUntil(
        caches.keys().then((cacheNames)=>{
            return Promise.all( // warte auf mehrere Promises
                cacheNames.map((cacheName)=>{
                    if(CACHE_NAME !== cacheName && cacheName.startsWith("kwm-cache")){
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});