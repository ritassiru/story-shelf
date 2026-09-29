"""Gera a estante (../index.html) a partir de shelf.json e das pastas em stories/.

Uso:
  python3 fonte/build.py             -> ../index.html autossuficiente (fontes embutidas, funciona offline)
  python3 fonte/build.py --online    -> carrega as fontes do Google Fonts (arquivo mais leve)
  python3 fonte/build.py --drafts    -> inclui também os livros com "published": false (para testar)
  python3 fonte/build.py --out ARQ   -> grava em outro arquivo
"""
import base64, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
P = lambda *p: os.path.join(HERE, *p)
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

if __name__ == "__main__":
    a = sys.argv[1:]
    main(online="--online" in a, drafts="--drafts" in a, out=a[a.index("--out") + 1] if "--out" in a else None)
