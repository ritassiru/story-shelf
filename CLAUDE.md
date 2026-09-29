# Story Shelf — instruções para o Claude

Converse com o professor em **português**. Os livros são em **inglês**, com
apoio em português (glossário, dicas, instruções curtas).

## O projeto

Estante de *graded readers* interativos (*choose your own adventure*) do Prof.
Ritaciro Cavalcante (IFAL Campus Viçosa), para o Ensino Médio Integrado.
Público: adolescentes de nível **A1/A2**, lendo **no celular**, muitas vezes
com internet limitada. Tudo precisa funcionar em tela pequena, no modo claro e
no escuro, e **sem internet**.

Livros hoje: `the-phone-on-the-bus` e `who-posted-it` (1º ano; Simple past,
question words, sequence words) e `the-fortune-app` (1º ano, 4º bimestre;
Simple future, simple past, question words) e `the-new-student` (2º ano, B1;
Present perfect, simple past, past continuous). Projeto irmão:
`ritassiru/the-ceo-game` (2º ano); mantenha a consistência visual entre eles.

**Particípio no balão:** `"verbForms": 3` nos metadados faz o balão reconhecer
e mostrar o particípio (usado em `the-new-student`). Sem o campo, os livros
mostram só *infinitive* e *past*. Ao escrever um livro com 3 formas, confira
falsos positivos também entre os particípios.

## Arquitetura

```
fonte/shelf.json                  livros da estante, ordem e publicado/rascunho
fonte/stories/<slug>/story.json   metadados (meta) + história de um livro
fonte/stories/<slug>/scenes.js    ilustrações do livro: SCENE_LIB["<slug>"] = (() => { ... return { cena: () => `svg` } })();
fonte/modelo/                     esqueleto usado por nova_historia.py (não aparece na estante)
fonte/template.html               visual e lógica, iguais para todos os livros
fonte/irreg.json                  verbos irregulares (o balão mostra infinitive e past)
fonte/a1.json                     glossário Beginner (A1) da estante toda, com _cognatos e _ignorar
fonte/build.py                    gera ../index.html (--online, --drafts, --out)
fonte/checar.py                   valida a estante e percorre todos os caminhos de cada livro
fonte/nova_historia.py            cria um livro novo a partir do modelo, como rascunho
index.html                        GERADO. Nunca edite à mão.
sw.js, manifest.webmanifest       GERADOS pelo build.py (aplicativo instalável, sem internet)
icon-*.png, apple-touch-icon.png  ícones do aplicativo (fonte/icones.py)
aula/<slug>/                      plano e slides de cada livro (feitos fora deste repo)
```

**O que é de cada livro fica na pasta dele**: texto, personagens, ilustrações,
palavras-chave, a pergunta das escolhas (`choicePrompt`) e as regras do
reconto (`retell`). **Nada específico de um livro entra no `template.html`.**
O template só tem o que vale para todos, incluindo os ajudantes de ilustração
`person()`, `SKY()` e `GROUND()`.

**Depois de qualquer mudança:** `python3 fonte/checar.py` e depois
`python3 fonte/build.py`. Abra o `index.html` e leia ao menos um caminho, em
largura de celular. Se mexeu no template, teste também uma estante com dois
livros (`python3 fonte/build.py --drafts` com um rascunho criado pelo
`nova_historia.py`), porque vários comportamentos só aparecem com mais de um.

## Regras para escrever livros

- Narração no **Simple Past** (ou no conteúdo gramatical do livro), frases
  curtas, vocabulário A1/A2. Palavras difíceis: `[[palavra|tradução]]`.
- Toda leitura de um livro tem **o mesmo número de escolhas** (`meta.chapters`)
  e caminhos de tamanho parecido.
- Use **sequence words** na narração. Cada capítulo e final tem **uma
  pergunta** do caderno, com 4 opções; varie a question word ao longo de cada
  caminho.
- **Capítulos compartilhados** precisam fazer sentido vindo de qualquer
  caminho: use `if`/`unless` e `sceneIf`.
- `event`/`eventPt`: frase no **passado**, em minúscula (exceto nomes).
- Toda escolha tem **`labelPt`**: o `label` em português, no imperativo
  (*Read the new messages* → *Ler as mensagens novas*). Aparece embaixo do
  botão no glossário Beginner. O `checar.py` avisa quando falta.
- **Glossário Beginner (A1):** toda palavra nova nos textos e eventos precisa
  estar em `fonte/a1.json` (tradução no sentido da história; verbo flexionado
  como `"started": "start|começar"`), em `_cognatos` (cognatos verdadeiros:
  *cinema, police, secret...*) ou em `_ignorar` (palavras em português na
  história, pedaços de pronúncia). O `checar.py` avisa quais faltam. Nomes
  próprios ficam de fora sozinhos. Falsos amigos (*library, introduce,
  realized, question, guitar, test*) **sempre** têm tradução.
- **Falsos positivos do glossário de verbos:** um substantivo com a forma de um
  verbo irregular (*costs*, *TV show*) precisa ser marcado com `[[...]]`.
- ***going to* + verbo é reconhecido sozinho como futuro** (balão "vai + verbo
  (futuro)", e não *go · went*). Antes de artigo, possessivo ou lugar (*going
  to school*, *going to bed*) continua sendo o verbo *go*. A regra (`GOING_TO`)
  está no `template.html` e no `checar.py`: se mudar, mude nos dois. O
  `checar.py` avisa quando acha um *going* fora dessa regra.
- Temas adequados a adolescentes, sem violência real. Lugares fictícios: não
  afirme fatos sobre lugares reais.
- Livro novo nasce como rascunho e só vai para `"published": true` quando o
  professor aprovar.

## Decisões de design já tomadas (não desfazer sem pedir)

- A estante é a página inicial; `#slug` abre direto a capa de um livro (é o
  link usado nos QR codes). A capa sempre tem o botão de voltar à estante.
- O caderno de detetive **bloqueia as escolhas** até a resposta certa; erro
  mostra dica e permite tentar de novo; o jogo conta os acertos de primeira.
- Glossário sublinhado só na **primeira ocorrência de cada palavra por tela**;
  o balão abre acima da palavra e não intercepta toques; a pontuação colada à
  palavra do glossário fica na mesma linha.
- **Engrenagem de configurações** em todas as telas (estante, capa, palavras-
  chave, capítulos, finais e caderno). Painel por cima da leitura, sem mexer
  nela, com: glossário em três níveis (Normal = palavras difíceis; Beginner =
  A1, quase todas as palavras + `labelPt` nos botões; Off), cores
  (auto/claro/escuro), tamanho do texto (normal/grande/maior ainda) e
  animações. Vale para a estante toda e fica no aparelho (`reader:gloss`,
  `reader:theme`, `reader:size`, `reader:motion`; um `reader:gloss` antigo
  true/false ainda é lido). Para acrescentar uma opção, edite `SETTINGS` e
  `applySettings()` no template. Tamanhos de fonte em `rem`. Mesmo painel no
  `the-ceo-game`.
- Letras acentuadas fazem parte da palavra no glossário (*Sônia* não vira
  *S* + *nia*), no template e no `checar.py`.
- **Aplicativo (PWA):** o `build.py` gera `sw.js` e `manifest.webmanifest`
  (GERADOS, nunca edite à mão) e o template registra o `sw.js` só em https ou
  localhost. O `sw.js` guarda o `index.html` e os ícones no aparelho; a versão
  (`CACHE`) vem do conteúdo, então **todo build que muda a estante muda o `sw.js`**
  e o celular pega a versão nova ao abrir com internet (na primeira ou na
  segunda vez). Os dois projetos ficam no mesmo site (`ritassiru.github.io`):
  o prefixo do cache (`ceo-game-` / `story-shelf-`) impede um de apagar o do
  outro. Ícones: `python3 fonte/icones.py` (sem dependências). O navegador
  embutido do app do Claude **não aceita service workers**: teste no Chrome.
  Só a estante publicada (sem `--out`) gera esses arquivos.
- **My words:** toda palavra cujo balão o aluno abre fica guardada no aparelho
  (`reader:words`, vale para a estante toda), com a tradução (verbos com as formas). O cartão *My words* aparece
  no caderno, no fim da leitura (só as palavras daquela leitura, pelo
  `state.t0`), e na estante, e a revisão em cartões abre no mesmo painel das configurações
  (`openSheet`), então não mexe na leitura nem na trava do reconto. *Not yet* zera o acerto da palavra,
  e ela volta primeiro na próxima revisão. *Clear my words* pede dois toques.
- Reconto: cada frase com verbo no passado e o mínimo de sequence words
  diferentes; montador em no máximo `maxHelp` frases; editar uma frase montada
  não tira a etiqueta.
- **A trava do reconto vale para a estante inteira**: quem termina um livro sem
  o reconto não lê de novo nem abre outro livro, mesmo recarregando ou
  digitando outro `#slug`.
- Armazenamento: finais por livro (`reader:<slug>:endings`); histórico e
  pendência globais (`reader:history`, `reader:pending`); configurações
  globais (`reader:gloss`, `reader:theme`, `reader:size`, `reader:motion`).
  Tudo em `try/catch`.
  "Apagar histórico" na capa apaga só aquele livro.

## Armadilhas já encontradas (evite repetir)

- **Nunca reuse o mesmo atributo `data-*` em elementos diferentes.** Os botões
  de escolha e os verbos do glossário usavam `data-c`, e tocar num verbo fazia
  a personagem escolher sozinha. Hoje: escolhas usam `data-choice`
  (selecionadas por `#choices [data-choice]`), verbos usam `data-cols`.
- **Não nomeie globais com nomes que já existem na janela do navegador**
  (`top`, `name`, `status`, `parent`, `length`...). Uma função `top` impediu o
  jogo de carregar.
- **Nomes de cena só com letras, números e `_`** (`phone_night`, não
  `phone-night`): o `checar.py` não reconhece nomes com hífen ou entre aspas.
- **Vários `alt` ou `sceneIf` que combinam: vale o último da lista**, no
  `template.html` e no `checar.py`. Se mudar essa regra, mude nos dois.
- **Identificadores dentro dos SVGs precisam ser únicos** (o `SKY()` já gera
  um id novo a cada chamada).
- **Ao substituir texto em arquivos, confira o resultado, não só a ausência do
  texto antigo.** Uma troca de links já "passou" na checagem sem ter mudado
  nada, porque o arquivo tinha sido alterado por fora.

## O que não fazer

- Não adicionar bibliotecas externas, CDNs nem qualquer acesso à rede.
- Não coletar nem enviar dados dos alunos.
- Não reproduzir letras de música ou textos protegidos.
- Não editar os arquivos de `aula/` sem o professor pedir.

## Pendências e ideias

- Licença do repositório ainda não definida.
- `.github/workflows/build.yml` roda `checar.py` e `build.py` a cada push em
  `fonte/` na `main` e salva o `index.html` gerado. Se o `checar.py` falhar,
  nada é salvo.
