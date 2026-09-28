/* Ilustrações do modelo. Troque "modelo" pelo slug da história (o nova_historia.py faz isso).
   Ajudantes do template:
     person(x, y, { skin, hair, shirt, style, s, extra })  -> uma pessoa; y é a linha dos pés;
                                                              style: long, short, curly, bun, cap, bald; s = escala
     SKY(corDeCima, corDeBaixo)                             -> céu em degradê
     GROUND(cor)                                            -> chão
   Cada cena devolve o conteúdo de um SVG de 540 x 220. */
SCENE_LIB["modelo"] = (() => {
  const HERO = { skin: "#C88A5E", hair: "#2B1B16", shirt: "#6D2E46", style: "long" };
  return {
    cover: () => `${SKY("#E9DDCB", "#ECE2D0")}${GROUND()}${person(270, 200, HERO)}`,
    room: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="370" y="30" width="120" height="80" fill="#BFD6E0" stroke="#FFFDF8" stroke-width="6"/>${GROUND("#C9B8A2")}${person(200, 205, HERO)}`,
    outside: () => `${SKY("#BFD6E0", "#E9F1F4")}<circle cx="460" cy="50" r="24" fill="#F3D27A"/>${GROUND("#8FB08F")}${person(270, 205, HERO)}`
  };
})();
