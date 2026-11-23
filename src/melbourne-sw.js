/* Melbourne day guide: online-fresh, offline-readable. */
const CACHE = 'melbourne-day-v4';
const PAGE = '/melbourne.html';
const PHOTO_URLS = [
'https://rydercom.com.au/Upload/listing/500719700/500719700_1_Boardwalk_Boulevard_Lifestyle_2_63.jpeg',
'https://www.visitmelbourne.com/-/media/atdw/melbourne/see-and-do/nature-and-wildlife/sanctuaries-zoos-and-farms/cc1abadbe63aed80ddf44ce7616770bd_1600x1200.jpeg?ts=20240701310524',
'https://images.7news.com.au/publication/C-12182425/1373daca9cffe7bb23107817db7b27c3f74bca52.jpg',
'https://uploads-ssl.webflow.com/653b48eaf7ae4267b096da99/65f849a3c994a55209ad1064_26109176326_622357cd4b_b.jpg',
'https://acmi-website-media-prod.s3.amazonaws.com/static/images/Adam_Gibson_SOMI_TVC_Stills_LowRes_8_2.original.jpg',
'https://fullsuitcase.com/wp-content/uploads/2020/06/One-day-in-Melbourne-things-to-do-and-itinerary.jpg.webp'
];
const validResponse = r => r && (r.ok || r.type === 'opaque');
async function cacheOnline(url) {
  const cache = await caches.open(CACHE);
  const request = new Request(url, { mode: new URL(url, self.location.origin).origin === self.location.origin ? 'same-origin' : 'no-cors', cache:'reload' });
  const res = await fetch(request);
  if (validResponse(res)) await cache.put(url, res.clone());
}
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    await Promise.allSettled([cacheOnline(PAGE), ...PHOTO_URLS.map(cacheOnline)]);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    for(const name of await caches.keys()) if(name.startsWith('melbourne-day-') && name!==CACHE) await caches.delete(name);
    await self.clients.claim();
  })());
});
async function fetchPage(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request, {cache:'no-store'});
    if(response.ok) await cache.put(PAGE, response.clone());
    return response;
  } catch(error) {
    return (await cache.match(PAGE)) || Response.error();
  }
}
async function fetchPhoto(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request.url);
  if(cached) return cached;
  try {
    const response = await fetch(request);
    if(validResponse(response)) await cache.put(request.url, response.clone());
    return response;
  }catch(error){return Response.error();}
}
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if(url.origin === location.origin && url.pathname === PAGE) {
    event.respondWith(fetchPage(event.request));
  } else if(PHOTO_URLS.includes(event.request.url)) {
    event.respondWith(fetchPhoto(event.request));
  }
});
self.addEventListener('message', event => {
  if(event.data?.type!=='OFFLINE_STATUS')return;
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    const page=!!await cache.match(PAGE);
    let photos=0;
    for(const url of PHOTO_URLS) if(await cache.match(url)) photos++;
    event.source?.postMessage({type:'OFFLINE_STATUS',page,photos,total:PHOTO_URLS.length});
  })());
});
