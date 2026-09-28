/* Ilustrações de "The Phone on the Bus".
   Usa os ajudantes genéricos do template: person(), SKY(), GROUND().
   Cada cena é uma função que devolve o conteúdo de um SVG 540 x 220. */
SCENE_LIB["the-phone-on-the-bus"] = (() => {
const LIA = { skin: "#C88A5E", hair: "#2B1B16", shirt: "#6D2E46", style: "long" };
const DAVI = { skin: "#8D5B3E", hair: "#1F130F", shirt: "#3E7C8E", style: "short" };
const RAFA = { skin: "#E3B08C", hair: "#5A3A22", shirt: "#34466B", style: "curly" };
const BIA = { skin: "#B97A55", hair: "#2B1B16", shirt: "#A26769", style: "bun" };
const PHONE = (x, y, glow) => `<g transform="translate(${x} ${y})">${glow ? '<circle r="16" fill="#FFF3B0" opacity=".55"/>' : ""}<rect x="-6" y="-10" width="12" height="20" rx="2.5" fill="#2B1721"/><rect x="-4.5" y="-8" width="9" height="14" rx="1" fill="#9FD3E6"/><circle cx="7" cy="8" r="2.5" fill="none" stroke="#E0AE55" stroke-width="1.5"/></g>`;
const CINEMA = (lights) => `<rect x="190" y="40" width="200" height="150" fill="#C9A98A"/><rect x="190" y="40" width="200" height="16" fill="#8E6A55"/>
  <rect x="222" y="64" width="136" height="26" rx="3" fill="${lights ? "#FFE08A" : "#6B5A50"}"/><text x="290" y="83" text-anchor="middle" font-family="Georgia,serif" font-size="17" font-weight="700" fill="${lights ? "#6D2E46" : "#3E3530"}" letter-spacing="3">CINEMA</text>
  <rect x="262" y="118" width="56" height="72" fill="#5A3A2E"/><circle cx="310" cy="156" r="2.5" fill="#E0AE55"/>
  <rect x="206" y="112" width="36" height="30" fill="${lights ? "#FFE08A" : "#7E7068"}"/><rect x="338" y="112" width="36" height="30" fill="${lights ? "#FFE08A" : "#7E7068"}"/>`;
const TREE = x => `<rect x="${x - 6}" y="120" width="12" height="70" fill="#6B4A32"/><circle cx="${x}" cy="108" r="36" fill="#5D8963"/><circle cx="${x - 22}" cy="124" r="22" fill="#6E9A74"/>`;

return {
  bus: () => `${SKY("#E9DDCB", "#E9DDCB")}
    <rect x="0" y="20" width="540" height="90" fill="#D9CBBE"/>${[30, 150, 270, 390].map(x => `<rect x="${x}" y="32" width="100" height="62" rx="8" fill="#BFD6E0"/>`).join("")}
    <rect x="0" y="150" width="540" height="70" fill="#8E7E72"/>
    <rect x="60" y="104" width="120" height="58" rx="10" fill="#A26769"/><rect x="330" y="104" width="120" height="58" rx="10" fill="#A26769"/>
    ${person(250, 200, LIA)}${PHONE(385, 182, true)}`,
  night: () => `${SKY("#1F2A44", "#34466B")}<circle cx="450" cy="50" r="22" fill="#F3E9D2"/>
    <rect x="370" y="20" width="140" height="100" fill="none" stroke="#8E7E72" stroke-width="6"/>
    <rect x="40" y="140" width="260" height="50" rx="8" fill="#6D2E46"/><rect x="40" y="128" width="70" height="26" rx="8" fill="#ECE2D0"/>
    ${GROUND("#2B2233")}${person(200, 176, LIA)}${PHONE(226, 132, true)}`,
  driver: () => `${SKY("#BFD6E0", "#E9F1F4")}<rect x="0" y="0" width="540" height="40" fill="#8E7E72"/><rect x="0" y="120" width="540" height="100" fill="#8E7E72"/>
    ${person(150, 205, { skin: "#9A6546", hair: "#34466B", shirt: "#E9DDCB", style: "cap" })}
    <ellipse cx="150" cy="178" rx="30" ry="12" fill="none" stroke="#2B1721" stroke-width="7"/>${person(360, 212, LIA)}${PHONE(392, 160, false)}`,
  cinema: () => `${SKY("#F2B880", "#E9DDCB")}${CINEMA(false)}${TREE(90)}${GROUND()}
    ${person(78, 196, Object.assign({}, LIA, { s: .8 }))}${person(118, 196, Object.assign({}, DAVI, { s: .8 }))}
    ${person(262, 196, Object.assign({}, RAFA, { s: .85, extra: '<rect x="18" y="-40" width="14" height="42" rx="6" fill="#2B1721"/>' }))}
    ${person(330, 196, Object.assign({}, BIA, { s: .85, extra: '<rect x="-16" y="-36" width="32" height="22" fill="#C08A2E"/>' }))}`,
  search: () => `${SKY("#E9DDCB", "#ECE2D0")}<rect x="190" y="12" width="160" height="200" rx="18" fill="#2B1721"/><rect x="200" y="30" width="140" height="168" rx="6" fill="#FFFDF8"/>
    <rect x="210" y="40" width="120" height="66" rx="4" fill="#BFD6E0"/>${PHONE(270, 72, false)}
    ${[0, 1, 2].map(i => `<rect x="210" y="${116 + i * 26}" width="${90 - i * 16}" height="8" rx="4" fill="#D9CBBE"/><text x="${316}" y="${126 + i * 26}" font-size="14">❤️</text>`).join("")}
    <text x="120" y="80" font-size="30">❤️</text><text x="400" y="110" font-size="26">💬</text><text x="420" y="60" font-size="22">❤️</text>`,
  school: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="150" y="26" width="240" height="96" rx="4" fill="#3E5A4A" stroke="#8E6A55" stroke-width="6"/>
    <text x="270" y="70" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#ECE2D0">Who is Rafa?</text><text x="270" y="96" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#ECE2D0">IFAL · Viçosa</text>
    ${GROUND("#C9B8A2")}${person(120, 206, { skin: "#8D5B3E", hair: "#7E6A60", shirt: "#34466B", style: "short", extra: '<rect x="-8" y="-72" width="16" height="6" rx="3" fill="none" stroke="#2B1721" stroke-width="1.5"/>' })}
    ${person(410, 206, LIA)}`,
  office: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="30" y="30" width="120" height="80" fill="#BFD6E0" stroke="#FFFDF8" stroke-width="6"/>
    <rect x="200" y="130" width="300" height="20" fill="#8E6A55"/><rect x="220" y="150" width="14" height="50" fill="#6B4A32"/><rect x="466" y="150" width="14" height="50" fill="#6B4A32"/>
    <rect x="400" y="96" width="70" height="34" fill="#C08A2E"/><text x="435" y="118" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#2B1721">LOST</text>
    ${person(300, 130, { skin: "#E3B08C", hair: "#7E6A60", shirt: "#3E7C8E", style: "bun", extra: '<circle cx="-5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/><circle cx="5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/>' })}
    ${PHONE(360, 120, true)}${person(120, 212, LIA)}`,
  police: () => `${SKY("#F2B880", "#E9DDCB")}${CINEMA(false)}${GROUND()}
    <rect x="400" y="150" width="120" height="40" rx="10" fill="#FFFDF8"/><rect x="420" y="130" width="70" height="26" rx="8" fill="#FFFDF8"/><rect x="440" y="122" width="22" height="9" rx="3" fill="#3E7CE0"/><rect x="462" y="122" width="10" height="9" rx="3" fill="#E04A4A"/>
    <circle cx="425" cy="192" r="11" fill="#2B1721"/><circle cx="495" cy="192" r="11" fill="#2B1721"/><rect x="400" y="162" width="120" height="8" fill="#34466B"/>
    ${person(360, 198, { skin: "#8D5B3E", hair: "#34466B", shirt: "#34466B", style: "cap", s: .85 })}${person(262, 198, Object.assign({}, RAFA, { s: .85 }))}${person(300, 198, Object.assign({}, BIA, { s: .85 }))}${person(90, 198, Object.assign({}, LIA, { s: .85 }))}`,
  door: () => `${SKY("#F2B880", "#E9DDCB")}${CINEMA(false)}${GROUND()}
    ${person(250, 200, Object.assign({}, RAFA, { extra: '<rect x="20" y="-44" width="16" height="46" rx="7" fill="#2B1721"/>' }))}
    ${person(320, 200, Object.assign({}, BIA, { extra: '<rect x="-18" y="-40" width="36" height="24" fill="#C08A2E"/>' }))}${person(130, 200, LIA)}${PHONE(154, 150, true)}`,
  station: () => `${SKY("#BFD6E0", "#E9F1F4")}<rect x="30" y="60" width="480" height="18" fill="#6D2E46"/><text x="270" y="74" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#FFFDF8" letter-spacing="2">BUS STATION · RODOVIÁRIA</text>
    <rect x="40" y="78" width="10" height="112" fill="#8E7E72"/><rect x="490" y="78" width="10" height="112" fill="#8E7E72"/>
    <rect x="300" y="110" width="220" height="70" rx="12" fill="#3E7C8E"/>${[0, 1, 2].map(i => `<rect x="${316 + i * 64}" y="120" width="52" height="28" rx="4" fill="#BFD6E0"/>`).join("")}<circle cx="340" cy="182" r="12" fill="#2B1721"/><circle cx="480" cy="182" r="12" fill="#2B1721"/>
    ${GROUND("#B9B0A6")}${person(150, 204, LIA)}${PHONE(174, 154, true)}${person(250, 204, Object.assign({}, RAFA, { extra: '<rect x="18" y="-44" width="16" height="46" rx="7" fill="#2B1721"/>' }))}`,
  screen: () => `<rect width="540" height="220" fill="#1F1418"/><rect x="120" y="18" width="300" height="120" fill="#F3E9D2"/>
    <text x="270" y="86" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="#6D2E46" font-style="italic">The End</text>
    <path d="M520 30 L420 60 L420 100 Z" fill="#FFF3B0" opacity=".25"/>
    ${[70, 150, 230, 310, 390, 470].map((x, i) => `<g transform="translate(${x} 214)"><circle cy="-40" r="16" fill="${i === 2 ? "#B9B3AE" : "#3A2830"}"/><rect x="-22" y="-26" width="44" height="30" rx="10" fill="#3A2830"/></g>`).join("")}`,
  newspaper: () => `${SKY("#E9DDCB", "#ECE2D0")}<rect x="110" y="14" width="320" height="196" fill="#FFFDF8" stroke="#D9CBBE"/>
    <text x="270" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="700" fill="#2B1721">VIÇOSA NEWS</text><rect x="130" y="50" width="280" height="2" fill="#2B1721"/>
    <text x="270" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="12" font-weight="700" fill="#2B1721">OLD CINEMA OPENS FOR ONE NIGHT</text>
    <rect x="130" y="82" width="150" height="100" fill="#D9CBBE"/><g transform="translate(205 180) scale(.7)">${CINEMA(true).replace(/x="(\d+)"/g, (m, v) => `x="${v - 290}"`).replace(/y="(\d+)"/g, (m, v) => `y="${v - 190}"`)}</g>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="292" y="${86 + i * 16}" width="${110 - (i % 2) * 20}" height="6" rx="3" fill="#D9CBBE"/>`).join("")}`,
  locked: () => `${SKY("#1F2A44", "#34466B")}<circle cx="470" cy="46" r="20" fill="#F3E9D2"/>${CINEMA(false)}${GROUND("#2B2233")}
    <rect x="280" y="140" width="20" height="16" rx="3" fill="#C08A2E"/><path d="M284 140 V132 Q290 124 296 132 V140" stroke="#C08A2E" stroke-width="3" fill="none"/>
    ${person(230, 200, Object.assign({}, RAFA, { s: .85 }))}${person(350, 200, Object.assign({}, BIA, { s: .85 }))}`
};
})();
