"""Cria a pasta de uma história nova a partir do modelo e a coloca na estante como rascunho.

Uso:  python3 fonte/nova_historia.py minha-historia "My Story Title"

A história nasce com "published": false em shelf.json, então não aparece para os
alunos até você mudar para true. Para testar antes: python3 fonte/build.py --drafts
"""
import json, os, re, shutil, sys
HERE = os.path.dirname(os.path.abspath(__file__))
if len(sys.argv) < 3 or not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", sys.argv[1]):
    sys.exit('Uso: python3 fonte/nova_historia.py nome-com-hifens "Story Title"  (só minúsculas, números e hífens)')
slug, title = sys.argv[1], sys.argv[2]
dest = os.path.join(HERE, "stories", slug)
if os.path.exists(dest): sys.exit(f"Já existe: stories/{slug}")
shutil.copytree(os.path.join(HERE, "modelo"), dest)
sp = os.path.join(dest, "story.json"); s = json.load(open(sp, encoding="utf-8"))
s["meta"]["slug"], s["meta"]["title"] = slug, title
json.dump(s, open(sp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
jp = os.path.join(dest, "scenes.js"); js = open(jp, encoding="utf-8").read().replace('SCENE_LIB["modelo"]', f'SCENE_LIB["{slug}"]')
open(jp, "w", encoding="utf-8").write(js)
shp = os.path.join(HERE, "shelf.json"); shelf = json.load(open(shp, encoding="utf-8"))
shelf["books"].append({"slug": slug, "published": False})
json.dump(shelf, open(shp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"Criado stories/{slug}/ (rascunho). Edite story.json e scenes.js, depois rode:\n  python3 fonte/checar.py\n  python3 fonte/build.py --drafts")
