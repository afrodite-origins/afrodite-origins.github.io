// Afrodite Origins: abre como aplicativo. Sempre busca a versão nova na rede;
// só usa a cópia guardada quando o celular está sem internet.
const CACHE='afrodite-origins-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.mode!=='navigate')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(k=>k.put('./',c)).catch(()=>{});return r})
    .catch(()=>caches.match('./').then(r=>r||Response.error())));
});
