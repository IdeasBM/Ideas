'use strict';
const CACHE='task-fixer-cafeteria-0.5.1',ASSETS=['./cafeteria-beta-0.5.1.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
// Never force activation during an unfinished transaction. Old worker waits for tabs to close.
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('task-fixer-cafeteria-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;const known=ASSETS.some(p=>new URL(p,self.registration.scope).href===url.href);if(!known)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
