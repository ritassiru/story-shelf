"""Confere a estante e todas as histórias. Rode depois de qualquer edição.

Uso:  python3 fonte/checar.py            (confere todos os livros de shelf.json)
      python3 fonte/checar.py --modelo   (confere também o modelo de história)

Para cada livro, percorre TODOS os caminhos de leitura e verifica: metadados,
ilustrações existentes, número de escolhas igual em todos os caminhos, finais
alcançáveis, perguntas válidas, tamanho da leitura por caminho, variedade de
question words, sequence words e verbo no passado nos eventos do reconto.
Avisa também quando um "going" não está em "going to" + verbo (o balão mostraria go · went).
"""
import json, os, re, sys
from collections import Counter
HERE = os.path.dirname(os.path.abspath(__file__))
IR = json.load(open(os.path.join(HERE, "irreg.json"), encoding="utf-8"))
PAST = {f.lower() for v in IR for f in v[1].split(" / ")} | {"didn't", "couldn't", "wasn't", "weren't", "hadn't", "could"}
NOT_PAST = {"need", "feed", "seed", "speed", "red", "bed", "indeed", "shed"}
SEQ = ["first", "then", "after that", "next", "suddenly", "later", "finally", "in the end"]
META = ["slug", "title", "level", "grammar", "blurb", "cover", "chapters", "choicePrompt", "keywords"]
# "going to" + verbo: o template mostra como futuro. A mesma regra está em template.html (GOING_TO).
GOING_TO = re.compile(r"\b(going to)(?=\s+(?!(?:the|a|an|my|your|his|her|its|our|their|this|that|these|those|school|bed|sleep|work|church|class|town|home)\b)[a-z])", re.I)
has_past = lambda s: any(x in PAST or (x.endswith("ed") and len(x) > 3 and x not in NOT_PAST) for x in re.findall(r"[a-z']+", s.lower()))

def texto(par, flags):
    out = []
    for p in par:
        if isinstance(p, str): out.append(p); continue
        if "if" in p and p["if"] not in flags: continue
        if "unless" in p and p["unless"] in flags: continue
        out.append(p.get("text", p.get("msg", "")))
    return " ".join(re.sub(r"\[\[([^|\]]+)\|[^\]]+\]\]", r"\1", t) for t in out)

def check_book(slug, pasta):
    erros, avisos = [], []
    S = json.load(open(os.path.join(pasta, "story.json"), encoding="utf-8"))
    M, N, E = S.get("meta", {}), S["nodes"], S["endings"]
    for k in META:
        if k not in M: erros.append(f"meta: falta o campo '{k}'")
    if M.get("slug") != slug: erros.append(f"meta.slug é '{M.get('slug')}', mas a pasta se chama '{slug}'")
    for g in M.get("keywords", []):
        if isinstance(g, str) and g not in ("sequence", "question"): erros.append(f"keywords: grupo pronto desconhecido '{g}'")
        if isinstance(g, dict) and not all(len(w) == 3 for w in g.get("words", [])): erros.append(f"keywords '{g.get('title')}': cada palavra precisa de [emoji, inglês, português]")
    rt = dict({"sentences": 5, "minSequence": 3, "maxHelp": 3}, **M.get("retell", {}))
    if not (0 < rt["maxHelp"] < rt["sentences"]): erros.append("retell: maxHelp precisa ser menor que sentences")
    js = open(os.path.join(pasta, "scenes.js"), encoding="utf-8").read()
    if f'SCENE_LIB["{slug}"]' not in js: erros.append(f'scenes.js precisa registrar SCENE_LIB["{slug}"]')
    cenas = set(re.findall(r"^\s*(\w+): \(\) =>", js, re.M))
    for nid, n in [("capa", {"scene": M.get("cover")})] + list({**N, **E}.items()):
        for sc in [n.get("scene")] + [a["scene"] for a in n.get("sceneIf", [])]:
            if sc not in cenas: erros.append(f"{nid}: a ilustração '{sc}' não existe em scenes.js")
    ranks = [e.get("rank") for e in E.values()]
    if len(set(ranks)) != len(ranks): erros.append("endings: há dois finais com o mesmo 'rank'")
    for eid, e in E.items():
        if e.get("tier") not in ("good", "mixed", "bad"): erros.append(f"{eid}: tier deve ser good, mixed ou bad")
    for nid, n in {**N, **E}.items():
        q = n.get("question")
        if not q or len(q["options"]) != 4 or not (0 <= q["answer"] < 4): erros.append(f"{nid}: pergunta ausente ou inválida")
        if not has_past(n.get("event", "")): erros.append(f"{nid}: evento sem verbo no passado: '{n.get('event')}'")
        for c in n.get("choices", []):
            for t in [c["to"]] + [a["to"] for a in c.get("alt", [])]:
                if t not in N and t not in E: erros.append(f"{nid}: escolha leva a '{t}', que não existe")
            if "[[" in c["label"]: erros.append(f"{nid}: rótulo de botão com [[glossário]]")
            if not has_past(c["event"]): erros.append(f"{nid}: evento sem verbo no passado: '{c['event']}'")
    for nid, n in {**N, **E}.items():
        frases = [p if isinstance(p, str) else p.get("text", p.get("msg", "")) for p in n["text"]] + [n.get("event", "")] + [c["event"] for c in n.get("choices", [])]
        for f in frases:
            solto = re.search(r"\bgoing\b", GOING_TO.sub("", re.sub(r"\[\[[^\]]+\]\]", "", f)), re.I)
            if solto: avisos.append(f"{nid}: 'going' fora de 'going to' + verbo; o balão vai mostrar go · went. Se for futuro, marque com [[...]]: '{f[:60]}'")
    if erros: return erros, avisos, None
    paths = []
    def walk(nid, flags, trail):
        if nid in E: paths.append((trail + [nid], flags)); return
        for c in N[nid]["choices"]:
            f2 = flags | set(c.get("set", [])); to = c["to"]
            for a in c.get("alt", []):
                if a["if"] in f2: to = a["to"]
            walk(to, f2, trail + [nid])
    walk(S["start"], frozenset(), [])
    vistos = {x for p, _ in paths for x in p}
    for nid in list(N) + list(E):
        if nid not in vistos: erros.append(f"'{nid}' nunca é alcançado")
    ne = Counter(len(p) - 1 for p, _ in paths)
    if set(ne) != {M.get("chapters")}: erros.append(f"meta.chapters = {M.get('chapters')}, mas os caminhos têm {dict(ne)} escolhas")
    palavras, whs = [], []
    for p, flags in paths:
        t = " ".join(texto((N.get(x) or E.get(x))["text"], flags) for x in p)
        palavras.append(len(t.split()))
        wh = [(N.get(x) or E.get(x))["question"]["wh"] for x in p]; whs.append(len(set(wh)))
        seqs = {s for s in SEQ if re.search(r"\b" + s + r"\b", t.lower())}
        if len(seqs) < rt["minSequence"]: avisos.append(f"caminho {' > '.join(p)}: só {len(seqs)} sequence words no texto")
        if len(set(wh)) < len(wh) - 1: avisos.append(f"caminho {' > '.join(p)}: question words repetidas {wh}")
    if max(palavras) > 1.5 * min(palavras): avisos.append("há caminhos muito mais longos que outros")
    resumo = (f"{len(paths)} caminhos · {M.get('chapters')} escolhas cada · finais {dict(Counter(p[-1] for p, _ in paths))} · "
              f"palavras {min(palavras)}–{max(palavras)} · question words por caminho {min(whs)}–{max(whs)}")
    return erros, avisos, resumo

def main():
    shelf = json.load(open(os.path.join(HERE, "shelf.json"), encoding="utf-8"))
    slugs = [b["slug"] for b in shelf["books"]]
    total_erros = 0
    if len(slugs) != len(set(slugs)): print("ERRO: slug repetido em shelf.json"); total_erros += 1
    pastas = {d for d in os.listdir(os.path.join(HERE, "stories")) if os.path.isdir(os.path.join(HERE, "stories", d))}
    for d in sorted(pastas - set(slugs)): print(f"AVISO: stories/{d} existe, mas não está em shelf.json")
    alvos = [(s, os.path.join(HERE, "stories", s), next(b for b in shelf["books"] if b["slug"] == s).get("published")) for s in slugs]
    if "--modelo" in sys.argv: alvos.append(("modelo", os.path.join(HERE, "modelo"), None))
    for slug, pasta, pub in alvos:
        if not os.path.isdir(pasta): print(f"ERRO: {slug}: pasta {pasta} não existe"); total_erros += 1; continue
        erros, avisos, resumo = check_book(slug, pasta)
        estado = "publicado" if pub else ("rascunho" if pub is False else "modelo")
        print(f"\n📖 {slug} ({estado})")
        if resumo: print("   " + resumo)
        for a in avisos: print("   AVISO:", a)
        for e in erros: print("   ERRO:", e)
        total_erros += len(erros)
    print("\nRESULTADO:", "OK" if not total_erros else f"{total_erros} erro(s)")
    sys.exit(1 if total_erros else 0)

if __name__ == "__main__":
    main()
