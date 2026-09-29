"""Gera a estante (../index.html) a partir de shelf.json e das pastas em stories/.

Uso:
  python3 fonte/build.py             -> ../index.html autossuficiente (fontes embutidas, funciona offline)
  python3 fonte/build.py --online    -> carrega as fontes do Google Fonts (arquivo mais leve)
  python3 fonte/build.py --drafts    -> inclui também os livros com "published": false (para testar)
  python3 fonte/build.py --out ARQ   -> grava em outro arquivo

Gera também manifest.webmanifest e sw.js (só na estante publicada), que deixam
instalar a estante no celular e abri-la sem internet depois da primeira visita
(os ícones vêm de icones.py).
"""
import base64, hashlib, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
P = lambda *p: os.path.join(HERE, *p)
URL = "https://ritassiru.github.io/story-shelf/"   # endereço publicado (GitHub Pages), usado nos QR codes
FACES = [("Fraunces", 600, "normal", "fraunces-latin-600-normal.woff2"), ("Fraunces", 800, "normal", "fraunces-latin-800-normal.woff2"),
         ("Atkinson Hyperlegible", 400, "normal", "atkinson-hyperlegible-latin-400-normal.woff2"),
         ("Atkinson Hyperlegible", 400, "italic", "atkinson-hyperlegible-latin-400-italic.woff2"),
         ("Atkinson Hyperlegible", 700, "normal", "atkinson-hyperlegible-latin-700-normal.woff2")]

def load_book(slug, base=None):
    d = base or P("stories", slug)
    s = json.load(open(os.path.join(d, "story.json"), encoding="utf-8"))
    book = dict(s["meta"]); book["story"] = {"start": s["start"], "nodes": s["nodes"], "endings": s["endings"]}
    return book, open(os.path.join(d, "scenes.js"), encoding="utf-8").read()

def main(online=False, drafts=False, out=None):
    shelf = json.load(open(P("shelf.json"), encoding="utf-8"))
    books, scenes = [], []
    for entry in shelf["books"]:
        if not entry.get("published") and not drafts: continue
        b, sc = load_book(entry["slug"]); books.append(b); scenes.append(sc)
    if not books: sys.exit("Nenhum livro publicado em shelf.json.")
    t = open(P("template.html"), encoding="utf-8").read()
    if not online:
        css = "\n".join(f'@font-face {{ font-family: "{f}"; font-weight: {w}; font-style: {s}; font-display: swap; src: url(data:font/woff2;base64,'
                        f'{base64.b64encode(open(P("fonts", fn), "rb").read()).decode()}) format("woff2"); }}' for f, w, s, fn in FACES)
        t = re.sub(r'<link rel="preconnect" href="https://fonts.googleapis.com">.*?display=swap" rel="stylesheet">', lambda m: "<style>\n" + css + "\n</style>", t, flags=re.S)
        assert "googleapis" not in t
    data = {"title": shelf["title"], "subtitle": shelf["subtitle"], "books": books}
    html = (t.replace("__TITLE__", shelf["title"]).replace("__SHELF__", json.dumps(data, ensure_ascii=False))
             .replace("__IRREG__", json.dumps(json.load(open(P("irreg.json"), encoding="utf-8")), ensure_ascii=False))
             .replace("__A1__", json.dumps({k: v for k, v in json.load(open(P("a1.json"), encoding="utf-8")).items() if not k.startswith("_")}, ensure_ascii=False))
             .replace("__SCENES__", "\n".join(scenes)))
    out = out or os.path.join(HERE, "..", "index.html")
    open(out, "w", encoding="utf-8").write(html)
    print(f"gerado: {out} | livros: {', '.join(b['slug'] for b in books)} | {len(html.encode()) // 1024} KB")
    if out == os.path.join(HERE, "..", "index.html"):   # só para a estante publicada (não para --out)
        arquivos_do_app(os.path.join(HERE, ".."), "story-shelf", shelf["title"], "Story Shelf", shelf["subtitle"], html)
        # página do professor: um QR code para a estante e um para cada livro publicado (#slug abre a capa)
        sys.path.insert(0, HERE)
        from qr import pagina_professor
        cartoes = [(shelf["title"], "A estante inteira · todos os livros", URL)] + [
            (b["title"], f'{b["level"]} · {", ".join(b["grammar"])}', URL + "#" + b["slug"]) for b in books]
        pag = pagina_professor(shelf["title"], shelf["subtitle"], cartoes)
        open(os.path.join(HERE, "..", "professor.html"), "w", encoding="utf-8", newline="\n").write(pag)
        print(f"professor.html gerado ({len(cartoes)} QR codes)")

# ---------------- aplicativo (PWA): instalar no celular e abrir sem internet ----------------
ICONES = ["icon-192.png", "icon-512.png", "apple-touch-icon.png"]
SW = r"""// GERADO por fonte/build.py. Nunca edite à mão.
// Guarda a estante no aparelho na primeira visita; depois ela abre mesmo sem internet.
// A versão muda a cada build: o celular baixa a estante nova na próxima vez que abrir com internet.
const CACHE = "__PREFIXO__-__VERSAO__";
const ARQUIVOS = __ARQUIVOS__;
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(ARQUIVOS.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  // apaga só as versões antigas desta estante (o outro projeto no mesmo site tem outro prefixo)
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith("__PREFIXO__-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(c => c.match(r, { ignoreSearch: true }).then(achou => achou ||
    // sem internet, só a página inicial vira o jogo guardado (professor.html, por exemplo, não)
    fetch(r).catch(() => r.mode === "navigate" && /\/(index\.html)?$/.test(new URL(r.url).pathname) ? c.match("index.html") : Response.error()))));
});
"""

def arquivos_do_app(raiz, prefixo, nome, curto, descricao, html):
    """Grava manifest.webmanifest e sw.js ao lado do index.html."""
    manifest = {"name": nome, "short_name": curto, "description": descricao, "lang": "en",
                "start_url": "./", "scope": "./", "display": "standalone",
                "background_color": "#F6F0E6", "theme_color": "#6D2E46",
                "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
                          {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
                          {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}
    man = json.dumps(manifest, ensure_ascii=False, indent=1) + "\n"
    open(os.path.join(raiz, "manifest.webmanifest"), "w", encoding="utf-8", newline="\n").write(man)
    # a versão sai do conteúdo (e não do arquivo gravado), para dar o mesmo resultado no Windows e no GitHub
    versao = hashlib.sha256((html + man).encode()).hexdigest()[:12]
    arquivos = ["./", "index.html", "manifest.webmanifest"] + ICONES
    sw = SW.replace("__PREFIXO__", prefixo).replace("__VERSAO__", versao).replace("__ARQUIVOS__", json.dumps(arquivos))
    open(os.path.join(raiz, "sw.js"), "w", encoding="utf-8", newline="\n").write(sw)
    print(f"aplicativo: manifest.webmanifest e sw.js (versão {versao})")


if __name__ == "__main__":
    a = sys.argv[1:]
    main(online="--online" in a, drafts="--drafts" in a, out=a[a.index("--out") + 1] if "--out" in a else None)
