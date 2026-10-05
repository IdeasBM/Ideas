// Retire public beta caches. Authenticated pages and API must never be cached.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('task-fixer-cafeteria-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Deliberately no fetch handler. Network authentication remains authoritative.
