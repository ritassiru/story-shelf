# Story Shelf

Uma estante de *graded readers* interativos em inglês, no estilo *choose your
own adventure*, feita para o Ensino Médio Integrado do IFAL Campus Viçosa. Cada
livro é uma história curta com escolhas que levam a finais diferentes, um
caderno de detetive com perguntas de compreensão e um reconto final.

**▶ Estante:** `https://ritassiru.github.io/story-shelf/`
**▶ Link direto para um livro:** `https://ritassiru.github.io/story-shelf/#the-phone-on-the-bus`
*(os links funcionam depois de ativar o GitHub Pages; veja abaixo)*

---

## Livros na estante

| Livro | Nível | Conteúdos | Turma |
|---|---|---|---|
| **The Phone on the Bus** | A2 | Simple past · question words · sequence words | 1º ano |

## Instalar no celular e usar sem internet

Depois da **primeira** visita com internet, o celular guarda o livros da estante e ele abre
mesmo sem sinal. Para ter um ícone na tela inicial:

- **Android (Chrome):** engrenagem ⚙️ → *Install the shelf*, ou menu ⋮ →
  *Instalar app* / *Adicionar à tela inicial*.
- **iPhone (Safari):** botão *Compartilhar* → *Adicionar à Tela de Início*.

Quando você publica uma mudança, o celular baixa a versão nova sozinho na
próxima vez que abrir com internet (às vezes só na segunda vez).

## O que todo livro tem

- **Palavras-chave antes de começar**, com tradução.
- **Capítulos curtos no passado**, com ilustração, sequence words destacadas e
  **glossário de toque**: palavras difíceis mostram a tradução, e verbos
  irregulares mostram *infinitive* e *past* (*see · saw*).
- **My words:** as palavras que o aluno consultou no glossário aparecem no
  caderno, no fim da leitura, e podem ser revisadas em cartões (na estante).
  Ficam só no aparelho.
- **Configurações** (ícone de engrenagem, em todas as telas): glossário em três
  níveis (*Normal*, só as palavras difíceis; *Beginner*, para iniciantes totais
  (A1), com quase todas as palavras traduzidas e tradução nos botões de
  escolha; *Off*), cores (automático, claro ou escuro), tamanho do texto e
  animações. Valem para a estante toda e ficam guardadas no próprio aparelho.
- **Caderno de detetive**: depois de cada capítulo, uma pergunta com uma
  question word. O aluno só continua quando acerta; se errar, recebe uma dica e
  tenta de novo. No fim, vê quantas acertou de primeira.
- **Escolhas que levam a finais diferentes**, e um **mapa dos finais** já
  descobertos.
- **Reconto final**: frases no passado contando a história que leu, com
  sequence words. Há um montador de frases (*Help me write*) para parte delas.
- **Trava:** quem termina um livro precisa fazer o reconto antes de ler de novo
  ou abrir outro livro, mesmo recarregando a página.

## Como usar em aula

Os materiais de cada livro ficam em [`aula/`](aula/), numa pasta com o nome do
livro. *The Phone on the Bus* entra no **Encontro 7 (Review Day)** do plano
*Storyteller* do 1º ano: pré-leitura com a capa projetada, 25 minutos de
leitura em duplas no celular, e as frases do reconto, copiadas no caderno,
valem o visto do dia. Nos slides, o QR code usa o link direto do livro, então o
aluno cai na capa sem passar pela estante.

**Sem internet na sala:** abra o `index.html` no computador, projete, leia os
capítulos em voz alta e deixe a turma votar em cada escolha.

## Usar sem internet

O `index.html` é autossuficiente: as fontes estão embutidas nele e ele não
acessa nada online. No computador, dê dois cliques. No celular Android, abra
com o Chrome. No iPhone, prefira o link do GitHub Pages.

## Publicar no GitHub Pages

**Settings → Pages →** *Deploy from a branch*, branch `main`, pasta
`/ (root)`. Em cerca de um minuto, a estante fica disponível no link acima.

## Estrutura

```
index.html                  a estante pronta (gerada; não edite à mão)
aula/<livro>/               plano de aula e slides de cada livro
fonte/
  shelf.json                quais livros aparecem na estante, e em que ordem
  stories/<livro>/
    story.json              a história: metadados, capítulos, escolhas, perguntas e finais
    scenes.js               as ilustrações do livro
  modelo/                   esqueleto de história, usado para criar livros novos
  template.html             visual e lógica, iguais para todos os livros
  irreg.json                verbos irregulares do glossário
  a1.json                   glossário Beginner (A1), cognatos e palavras ignoradas
  build.py                  gera o index.html
  checar.py                 confere a estante e todos os caminhos de cada livro
  nova_historia.py          cria a pasta de um livro novo a partir do modelo
  fonts/                    fontes embutidas (licença SIL OFL)
```

## Como criar um livro novo

```bash
python3 fonte/nova_historia.py the-lost-dog "The Lost Dog"
```

Isso cria `fonte/stories/the-lost-dog/` a partir do modelo e coloca o livro em
`shelf.json` como **rascunho** (`"published": false`), invisível para os
alunos. Depois:

1. Edite `story.json`: metadados, capítulos, escolhas, perguntas e finais. O
   modelo mostra todos os recursos, com texto de exemplo entre colchetes.
2. Edite `scenes.js`: as ilustrações do livro.
3. Confira e gere uma versão de teste que inclui rascunhos:
   ```bash
   python3 fonte/checar.py
   python3 fonte/build.py --drafts
   ```
4. Quando estiver pronto, mude para `"published": true` em `shelf.json` e rode
   `python3 fonte/build.py`.

### Metadados do livro (`meta` em story.json)

```json
"meta": {
  "slug": "the-phone-on-the-bus",
  "title": "The Phone on the Bus",
  "level": "A2",
  "grammar": ["Simple past", "Question words", "Sequence words"],
  "blurb": "Lia finds a phone on the bus... You decide what she does next!",
  "cover": "bus",
  "chapters": 4,
  "choicePrompt": "What does Lia do?",
  "keywords": [ {"title": "Story words", "pt": "palavras da história", "words": [["📱", "phone", "celular"]]},
                "sequence", "question" ],
  "retell": {"sentences": 5, "minSequence": 3, "maxHelp": 3}
}
```

- `slug`: igual ao nome da pasta; é o que vai no link direto (`#slug`).
- `cover`: a ilustração da capa (uma das cenas de `scenes.js`).
- `chapters`: quantas escolhas cada leitura tem, do começo ao fim.
- `keywords`: grupos da tela de palavras-chave. `"sequence"` e `"question"`
  são grupos prontos, iguais em todos os livros.
- `retell`: quantas frases o reconto pede, quantas sequence words diferentes
  exige e em quantas o montador pode ajudar.
- `verbForms` (opcional): `3` faz o balão dos verbos irregulares reconhecer
  também o particípio (*see · saw · seen*), para livros com *present perfect*.
  Sem o campo, o balão mostra só *infinitive* e *past*.

### Capítulos, escolhas e finais

```json
"p2b": {
  "chapter": 2, "title": "The Driver", "scene": "driver",
  "text": [
    "Lia walked to the front of the bus.",
    {"msg": "Where is the key??? — B"},
    {"if": "posted", "text": "Só aparece para quem postou as mensagens."},
    {"unless": "posted", "text": "Só aparece para quem NÃO postou."}
  ],
  "event": "she talked to the bus driver", "eventPt": "ela conversou com o motorista do ônibus",
  "question": {"wh": "Where", "q": "Where did Rafa study before?",
               "options": ["At IFAL", "In Maceió", "At a music school", "On the bus"],
               "answer": 0, "hint": "Read what Seu Antônio said."},
  "choices": [
    {"label": "Take it to the school office", "labelPt": "Levar o celular à secretaria da escola", "to": "p3z", "event": "...", "eventPt": "..."},
    {"label": "Look for Rafa", "labelPt": "Procurar o Rafa", "to": "p3y", "set": ["looked"], "event": "...", "eventPt": "..."}
  ]
}
```

- `text`: parágrafos. `{"msg": ...}` vira um balão de mensagem de celular;
  `if`/`unless` mostram um parágrafo só para quem passou (ou não) por uma
  escolha; `[[palavra|tradução]]` cria o glossário de toque. Os verbos
  irregulares e o *going to* + verbo (futuro) ganham balão sozinhos.
- `scene` e `sceneIf`: a ilustração, e uma troca conforme o caminho. Os nomes
  das cenas são simples, só letras, números e `_` (`phone_night`, não
  `phone-night`).
- `question`: as opções são embaralhadas na tela, então a certa pode ficar em
  qualquer posição no arquivo.
- `choices`: `to` é o próximo capítulo ou final; `set` marca algo que o leitor
  fez; `alt` muda o destino conforme essas marcas
  (`"alt": [{"if": "posted", "to": "e6"}]`). Se mais de um `alt` (ou
  `sceneIf`) combinar com as marcas do leitor, vale o **último** da lista, no
  jogo e no `checar.py`.
- `labelPt`: o texto do botão em português, no imperativo. Aparece embaixo do
  botão quando o glossário está no nível *Beginner*.
- `event`/`eventPt`: o que aconteceu, no passado e em português. Vão para a
  lista do reconto e para o montador de frases.
- **Glossário Beginner:** palavras novas nos textos precisam de tradução em
  `fonte/a1.json`, ou entrar em `_cognatos` (cognatos verdadeiros, como
  *cinema*) ou em `_ignorar` (palavras em português na história). O
  `checar.py` avisa quais faltam.
- Finais (`endings`) têm também `rank` (ordem no mapa, do melhor ao pior),
  `tier` (`good`, `mixed` ou `bad`), `emoji` e `short` (nome curto do mapa).

**Capítulos compartilhados:** um capítulo alcançado por mais de um caminho
precisa fazer sentido vindo de qualquer um; use `if`/`unless`.

## Conferir antes de publicar

```bash
python3 fonte/checar.py            # a estante inteira (instantâneo)
python3 fonte/checar.py --modelo   # inclui o modelo
python3 fonte/build.py             # gera o index.html
```

Para cada livro, o `checar.py` percorre todos os caminhos e avisa se algum
termina num beco sem saída, se um final ficou inalcançável, se o número de
escolhas não bate com `chapters`, se os caminhos têm tamanhos muito diferentes,
se falta pergunta, se uma ilustração citada não existe ou se um evento do
reconto está sem verbo no passado.

## Privacidade

A estante não envia nada para lugar nenhum. O histórico, os mapas de finais e a
trava do reconto ficam só no navegador do aparelho. Na capa de cada livro, o
aluno pode apagar o histórico daquele livro.

## Créditos

Criado por Prof. Ritaciro Cavalcante da Silva, IFAL Campus Viçosa. Os lugares
das histórias são fictícios.

Fontes: [Fraunces](https://github.com/undercasetype/Fraunces) (The Fraunces
Project Authors) e [Atkinson Hyperlegible](https://www.brailleinstitute.org/freefont/)
(Braille Institute), ambas sob a SIL Open Font License 1.1. As licenças estão
em `fonte/fonts/`.
