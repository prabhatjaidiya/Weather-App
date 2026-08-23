const CACHE_NAME = "weather-app-v3";

const APP_SHELL = [
    "/",
    "/manifest.json",
    "/pwa-192x192.png",
    "/pwa-512x512.png",
    "/favicon.svg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll(APP_SHELL)
        )
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter(
                            (name) => name !== CACHE_NAME
                        )
                        .map((name) =>
                            caches.delete(name)
                        )
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener("fetch", (event) => {
    const request = event.request;

    if (request.method !== "GET") return;

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request)
                .then((networkResponse) => {
                    if (
                        networkResponse.ok &&
                        new URL(request.url).origin ===
                        self.location.origin
                    ) {
                        const responseClone =
                            networkResponse.clone();

                        caches
                            .open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(
                                    request,
                                    responseClone
                                );
                            });
                    }

                    return networkResponse;
                })
                .catch(() => {
                    if (request.mode === "navigate") {
                        return caches.match("/");
                    }

                    return new Response("", {
                        status: 503,
                        statusText: "Offline",
                    });
                });
        })
    );
});