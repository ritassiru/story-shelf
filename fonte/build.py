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
        b, sc = load_book(entry["slug"]); b["code"] = entry["code"]; books.append(b); scenes.append(sc)
    if not books: sys.exit("Nenhum livro publicado em shelf.json.")
    t = open(P("template.html"), encoding="utf-8").read()
    if not online:
        css = "\n".join(f'@font-face {{ font-family: "{f}"; font-weight: {w}; font-style: {s}; font-display: swap; src: url(data:font/woff2;base64,'
                        f'{base64.b64encode(open(P("fonts", fn), "rb").read()).decode()}) format("woff2"); }}' for f, w, s, fn in FACES)
        t = re.sub(r'<link rel="preconnect" href="https://fonts.googleapis.com">.*?display=swap" rel="stylesheet">', lambda m: "<style>\n" + css + "\n</style>", t, flags=re.S)
        assert "googleapis" not in t
    data = {"title": shelf["title"], "subtitle": shelf["subtitle"], "turmas": shelf.get("turmas", []), "books": books}
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
        # o decodificador dos códigos de resultado entra depois dos QR codes (sem mexer no qr.py, que é o mesmo nos projetos)
        assert "</main>" in pag and "</head>" in pag
        pag = pag.replace("</main>", decodificador(books, shelf.get("turmas", [])) + "</main>", 1).replace("</head>", DEC_CSS + "</head>", 1)
        open(os.path.join(HERE, "..", "professor.html"), "w", encoding="utf-8", newline="\n").write(pag)
        print(f"professor.html gerado ({len(cartoes)} QR codes)")

# ---------------- decodificador do código de resultado (na professor.html) ----------------
# O código é SS-TUR-LIVRO-final-acertos-ajudas-X (o mesmo resultCode() do template): X é a letra de conferência,
# 65 + (soma dos códigos dos caracteres do corpo) mod 26. Se mudar lá, mude aqui.
DEC_CSS = """<style>
.dec { margin-top: 26px; }
.dec textarea { width: 100%; box-sizing: border-box; min-height: 120px; font: 1rem ui-monospace, Consolas, monospace; color: var(--ink); background: var(--panel); border: 2px solid var(--line); border-radius: 10px; padding: 10px; }
.dec table { width: 100%; border-collapse: collapse; margin: 12px 0; background: var(--panel); font-size: .95rem; }
.dec th, .dec td { border: 1px solid var(--line); padding: 6px 8px; text-align: left; vertical-align: top; }
.dec th { color: var(--berry); }
.dec .err { color: #B0413E; font-weight: 700; }
.dec .tab { overflow-x: auto; }
@media print { .dec { display: none; } }
</style>
"""

def decodificador(books, turmas):
    dec = {b["code"]: {"title": b["title"], "total": b["chapters"] + 1,
                       "ends": [f'{e["emoji"]} {e["short"]}' for e in b["story"]["endings"].values()], "frases": (b.get("retell") or {}).get("sentences", 5)} for b in books}
    nomes = {t["id"]: t["nome"] for t in turmas}; nomes["OUT"] = "Outra turma · visitante"
    return DEC_HTML.replace("__DEC__", json.dumps(dec, ensure_ascii=False)).replace("__TURMAS__", json.dumps(nomes, ensure_ascii=False))

DEC_HTML = r"""  <section class="dec" id="decoder">
    <h2>Decodificador dos códigos de resultado</h2>
    <p class="hint">No fim de cada leitura, depois do reconto, o aluno recebe um código. Cole os códigos aqui, <b>um por linha</b>;
      pode pôr o nome antes (<i>Ana SS-I1M-PB-3-04-1-K</i>). A turma vem dentro do código, e cada turma ganha a sua tabela.
      Tudo é calculado aqui mesmo, sem internet, e nada é enviado.</p>
    <textarea id="dec-in" spellcheck="false" placeholder="Ana SS-I1M-PB-3-04-1-K"></textarea>
    <p><button type="button" id="dec-copy" style="font:inherit;font-weight:700;color:#fff;background:var(--berry);border:0;border-radius:10px;padding:8px 14px;cursor:pointer" hidden>📋 Copiar a tabela (para planilha)</button>
      <span class="hint" id="dec-msg"></span></p>
    <div class="tab" id="dec-out"></div>
  </section>
<script>
const DEC = __DEC__, TURMAS = __TURMAS__;
const DEC_RX = /SS\s*-\s*([A-Za-z0-9]{3})\s*-\s*([A-Za-z]{2})\s*-\s*(\d)\s*-\s*(\d{1,2})\s*-\s*(\d)\s*-\s*([A-Za-z])/i;
const decCheck = body => String.fromCharCode(65 + [...body].reduce((s, c) => s + c.charCodeAt(0), 0) % 26);
const decEsc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function decLine(line) {
  const m = line.match(DEC_RX); if (!m) return line.trim() ? { bad: line.trim() } : null;
  const tur = m[1].toUpperCase(), bk = m[2].toUpperCase(), fim = +m[3], ft = +m[4], aj = +m[5];
  const body = `SS-${tur}-${bk}-${fim}-${String(ft).padStart(2, "0")}-${aj}`;
  const name = line.replace(m[0], "").replace(/^[\s:;,|–-]+|[\s:;,|–-]+$/g, "");
  return { name, tur, bk, fim, ft, aj, ok: decCheck(body) === m[6].toUpperCase(), B: DEC[bk] };
}
let decRows = [];
function decRender() {
  const lines = document.getElementById("dec-in").value.split("\n").map(decLine).filter(Boolean);
  const out = document.getElementById("dec-out"), msg = document.getElementById("dec-msg");
  decRows = [];
  if (!lines.length) { out.innerHTML = ""; msg.textContent = ""; document.getElementById("dec-copy").hidden = true; return; }
  const turNome = t => TURMAS[t] || "turma " + t;
  const turmas = [...new Set(lines.filter(r => r.B).map(r => r.tur))].sort();
  out.innerHTML = turmas.map(tur => {
    const rows = lines.filter(r => r.B && r.tur === tur);
    const body = rows.map(r => {
      const pct = Math.round(100 * r.ft / r.B.total), fim = r.B.ends[r.fim - 1] || "?";
      decRows.push([r.name || "—", turNome(tur), r.B.title, fim, `${r.ft}/${r.B.total} (${pct}%)`, `${r.B.frases - r.aj} de ${r.B.frases}`, r.ok ? "ok" : "conferir"]);
      return `<tr><td>${decEsc(r.name || "—")}</td><td>${decEsc(r.B.title)}</td><td>${decEsc(fim)}</td><td>${r.ft}/${r.B.total} <span class="hint">(${pct}%)</span></td>
        <td>${r.B.frases - r.aj} de ${r.B.frases}</td><td>${r.ok ? "✓" : '<span class="err">conferir a cópia</span>'}</td></tr>`;
    }).join("");
    // a média da turma conta só os códigos conferidos
    const okRows = rows.filter(r => r.ok), media = okRows.length ? Math.round(okRows.reduce((s, r) => s + r.ft / r.B.total, 0) / okRows.length * 100) : 0;
    return `<h3>${decEsc(turNome(tur))} · ${rows.length} ${rows.length === 1 ? "leitura" : "leituras"}</h3>
      <table><thead><tr><th>Aluno</th><th>Livro</th><th>Final</th><th>Caderno: acertos de primeira</th><th>Frases escritas sem ajuda</th><th>Cópia</th></tr></thead><tbody>${body}</tbody>
      <tfoot><tr><th>Turma <span class="hint">(códigos conferidos)</span></th><td colspan="2">${okRows.length} ${okRows.length === 1 ? "leitura" : "leituras"}</td><td>média ${media}%</td><td colspan="2"></td></tr></tfoot></table>`;
  }).join("");
  const bad = lines.filter(r => r.bad || !r.B), wrong = lines.filter(r => r.B && !r.ok);
  msg.textContent = [bad.length ? `${bad.length} linha(s) sem código reconhecido.` : "", wrong.length ? `${wrong.length} código(s) com a letra de conferência errada: provavelmente copiados com erro.` : ""].join(" ");
  document.getElementById("dec-copy").hidden = !decRows.length;
}
document.getElementById("dec-in").addEventListener("input", decRender);
document.getElementById("dec-copy").addEventListener("click", () => {
  const tsv = [["Aluno", "Turma", "Livro", "Final", "Acertos de primeira", "Frases sem ajuda", "Cópia"], ...decRows].map(r => r.join("\t")).join("\n");
  const done = () => { document.getElementById("dec-msg").textContent = "Tabela copiada: cole na planilha."; };
  if (navigator.clipboard) navigator.clipboard.writeText(tsv).then(done, () => { prompt("Copie a tabela:", tsv); });
  else prompt("Copie a tabela:", tsv);
});
</script>
"""

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
