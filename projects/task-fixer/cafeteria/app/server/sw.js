'use strict';
const CACHE='task-fixer-cafeteria-private-0.7.3',ASSETS=['./app.php','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
// No forced activation: close previous tabs after updating.
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('task-fixer-cafeteria-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;const known=ASSETS.some(p=>new URL(p,self.registration.scope).href===url.href);if(!known)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
