importScripts("../static/uv/uv.sw.js"); // start from root (../)

const sw = new UVServiceWorker();

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));