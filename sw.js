// GERADO por fonte/build.py. Nunca edite à mão.
// Guarda a estante no aparelho na primeira visita; depois ela abre mesmo sem internet.
// A versão muda a cada build: o celular baixa a estante nova na próxima vez que abrir com internet.
const CACHE = "story-shelf-45b39904ecf7";
const ARQUIVOS = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(ARQUIVOS.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  // apaga só as versões antigas desta estante (o outro projeto no mesmo site tem outro prefixo)
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith("story-shelf-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(c => c.match(r, { ignoreSearch: true }).then(achou => achou ||
    // sem internet, só a página inicial vira o jogo guardado (professor.html, por exemplo, não)
    fetch(r).catch(() => r.mode === "navigate" && /\/(index\.html)?$/.test(new URL(r.url).pathname) ? c.match("index.html") : Response.error()))));
});
