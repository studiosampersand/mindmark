const CACHE='mindmark-v0.000.001';
const CORE=['./','./index.html','./app/','./app/index.html','./beta-test/','./beta-test/index.html','./faq/','./privacy-legal/','./contact/','./assets/styles.css','./assets/logo.svg','./assets/icon-192.svg','./assets/icon-512.svg','./js/app.js','./data/trackers.js','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match('./index.html'))));});
