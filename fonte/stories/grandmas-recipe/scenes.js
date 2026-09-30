/* Ilustrações de "Grandma's Recipe".
   Usa os ajudantes genéricos do template: person(), SKY(), GROUND().
   Cada cena é uma função que devolve o conteúdo de um SVG 540 x 220.
   O caderno da avó é sempre azul; a cocada, sempre em quadradinhos claros. */
SCENE_LIB["grandmas-recipe"] = (() => {
const JOANA = { skin: "#B97A55", hair: "#2B1B16", shirt: "#E0AE55", style: "long" };
const NINO = { skin: "#B97A55", hair: "#2B1B16", shirt: "#3E7CE0", style: "short", s: .72 };
const GLASSES = '<circle cx="-5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/><circle cx="5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/>';
const LURDES = { skin: "#8D5B3E", hair: "#D9CBBE", shirt: "#A26769", style: "bun", extra: GLASSES };
const JUDGE = (skin, shirt, style) => ({ skin, hair: "#7E6A60", shirt, style, s: .85 });
const at = (o, s) => Object.assign({}, o, { s });
const COCADA = (x, y, n) => `<ellipse cx="${x}" cy="${y + 6}" rx="${n * 9 + 10}" ry="8" fill="#FFFDF8" stroke="#D9CBBE"/>${Array.from({ length: n }, (_, k) =>
  `<rect x="${x - n * 9 + k * 18 + 2}" y="${y - 8}" width="14" height="12" rx="2" fill="#F3E4C0" stroke="#D9B98A"/>`).join("")}`;
const NOTEBOOK = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-30" y="-40" width="60" height="80" rx="4" fill="#34466B"/><rect x="-24" y="-34" width="48" height="68" fill="#F3E9D2"/>
  ${[0, 1, 2, 3, 4].map(k => `<rect x="-18" y="${-26 + k * 12}" width="${36 - (k % 2) * 10}" height="3" fill="#8E7E72"/>`).join("")}<circle cx="6" cy="6" r="9" fill="#8E6A55" opacity=".55"/></g>`;
const KITCHEN = () => `${SKY("#ECE2D0", "#ECE2D0")}<rect x="0" y="0" width="540" height="18" fill="#D9CBBE"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => `<rect x="${k * 60}" y="18" width="58" height="40" fill="${k % 2 ? "#FFFDF8" : "#E9F1F4"}"/>`).join("")}
  <rect x="360" y="70" width="150" height="120" fill="#FFFDF8" stroke="#D9CBBE"/><rect x="376" y="84" width="118" height="10" rx="3" fill="#8E7E72"/><circle cx="400" cy="130" r="14" fill="#2B1721"/><circle cx="460" cy="130" r="14" fill="#2B1721"/>
  <rect x="60" y="140" width="260" height="10" fill="#8E6A55"/><rect x="72" y="150" width="8" height="40" fill="#6B4A32"/><rect x="300" y="150" width="8" height="40" fill="#6B4A32"/>${GROUND("#C9B8A2")}`;
const SQUARE = () => `${SKY("#F2B880", "#E9DDCB")}${[...Array(12)].map((_, k) => `<path d="M${k * 48} 20 l24 14 l24 -14" fill="none" stroke="${["#E04A4A", "#3E7CE0", "#E0AE55", "#5D8963"][k % 4]}" stroke-width="3"/>`).join("")}
  <rect x="120" y="44" width="300" height="26" rx="4" fill="#6D2E46"/><text x="270" y="62" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#FFFDF8" letter-spacing="2">COCADA CONTEST</text>
  <rect x="60" y="130" width="420" height="10" fill="#8E6A55"/><rect x="72" y="140" width="8" height="50" fill="#6B4A32"/><rect x="460" y="140" width="8" height="50" fill="#6B4A32"/>${GROUND("#C9B8A2")}`;

return {
  kitchen: () => `${KITCHEN()}${NOTEBOOK(130, 118, .55)}${COCADA(240, 128, 3)}${person(190, 200, JOANA)}${person(290, 200, NINO)}`,
  phone: () => `${SKY("#E9DDCB", "#ECE2D0")}<rect x="300" y="20" width="150" height="170" rx="18" fill="#2B1721"/><rect x="310" y="36" width="130" height="136" rx="6" fill="#BFD6E0"/>
    <text x="375" y="84" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#2B1721">Vó Zefa</text><text x="375" y="112" text-anchor="middle" font-size="26">📶❌</text>
    <text x="375" y="150" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6E5C63">call ended</text>${GROUND("#C9B8A2")}${person(170, 205, JOANA)}${person(90, 205, NINO)}`,
  neighbor: () => `${SKY("#BFD6E0", "#E9F1F4")}<rect x="240" y="40" width="260" height="150" fill="#E9A8A0"/><path d="M230 44 L370 0 L510 44 Z" fill="#8E6A55"/>
    <rect x="330" y="92" width="60" height="98" fill="#5A3A2E"/><rect x="262" y="70" width="46" height="40" fill="#BFD6E0" stroke="#FFFDF8" stroke-width="4"/><rect x="420" y="70" width="46" height="40" fill="#BFD6E0" stroke="#FFFDF8" stroke-width="4"/>
    ${[40, 80, 120].map(x => `<circle cx="${x}" cy="176" r="14" fill="#5D8963"/>`).join("")}${GROUND("#C9B8A2")}${person(360, 200, at(LURDES, .9))}${person(200, 205, JOANA)}${NOTEBOOK(232, 150, .3)}`,
  notebook: () => `${SKY("#1F2A44", "#34466B")}<circle cx="470" cy="46" r="20" fill="#F3E9D2"/>${NOTEBOOK(270, 104, 1.5)}
    <rect x="360" y="40" width="80" height="54" rx="4" fill="#FFF3B0" transform="rotate(8 400 67)"/><text x="400" y="66" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#6D2E46" transform="rotate(8 400 67)">a pinch of salt</text>
    <text x="400" y="82" text-anchor="middle" font-size="12" transform="rotate(8 400 67)">❤️</text>${GROUND("#2B2233")}${person(120, 205, JOANA)}${person(470, 205, NINO)}`,
  contest: () => `${SQUARE()}${COCADA(150, 120, 3)}${COCADA(270, 120, 3)}${COCADA(390, 120, 3)}
    ${person(110, 205, at(JOANA, .9))}${person(330, 205, JUDGE("#C88A5E", "#34466B", "short"))}${person(390, 205, JUDGE("#E3B08C", "#A26769", "bun"))}${person(450, 205, JUDGE("#6E4630", "#5D8963", "bald"))}`,
  prize: () => `${SQUARE()}${[...Array(22)].map((_, k) => `<rect x="${(k * 53) % 520 + 10}" y="${78 + (k * 37) % 60}" width="6" height="10" fill="${["#E04A4A", "#3E7CE0", "#E0AE55", "#5D8963"][k % 4]}" transform="rotate(${k * 29} ${(k * 53) % 520 + 13} ${83 + (k * 37) % 60})"/>`).join("")}
    <path d="M250 84 L290 84 L284 120 L256 120 Z" fill="#E0AE55"/><rect x="262" y="120" width="16" height="10" fill="#E0AE55"/>${COCADA(380, 120, 2)}
    ${person(200, 205, JOANA)}${person(250, 205, NINO)}${person(340, 205, at(LURDES, .9))}`,
  clock: () => `${SQUARE()}<circle cx="270" cy="100" r="26" fill="#FFFDF8" stroke="#2B1721" stroke-width="3"/><line x1="270" y1="100" x2="270" y2="82" stroke="#2B1721" stroke-width="3"/><line x1="270" y1="100" x2="284" y2="104" stroke="#6D2E46" stroke-width="3"/>
    <rect x="360" y="160" width="120" height="10" fill="#8E6A55"/>${person(420, 205, at(JOANA, .9))}${COCADA(420, 150, 2)}${person(120, 205, { skin: "#9A6546", hair: "#D9CBBE", shirt: "#34466B", style: "bald", s: .85 })}`
};
})();
