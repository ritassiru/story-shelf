/* Ilustrações de "The Shelter Dog".
   Usa os ajudantes genéricos do template: person(), SKY(), GROUND().
   Cada cena é uma função que devolve o conteúdo de um SVG 540 x 220.
   A Farofa tem sempre a mesma cara: marrom, com o focinho cinza. */
SCENE_LIB["the-shelter-dog"] = (() => {
const BIA = { skin: "#B97A55", hair: "#2B1B16", shirt: "#C08A2E", style: "long" };
const CAMERA = '<rect x="-12" y="-40" width="24" height="16" rx="3" fill="#2B1721"/><circle cx="0" cy="-32" r="5" fill="#8E7E72"/><circle cx="0" cy="-32" r="2.5" fill="#BFD6E0"/>';
const RAFA = { skin: "#E3B08C", hair: "#5A3A22", shirt: "#34466B", style: "curly", extra: CAMERA };
const APRON = '<path d="M-14 -40 L14 -40 L16 0 L-16 0 Z" fill="#E9DDCB"/><rect x="-6" y="-30" width="12" height="8" rx="2" fill="#D9CBBE"/>';
const CELIA = { skin: "#8D5B3E", hair: "#7E6A60", shirt: "#A26769", style: "bun", extra: APRON };
const GLASSES = '<circle cx="-5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/><circle cx="5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/>';
const ANTONIO = { skin: "#C88A5E", hair: "#ECE8E2", shirt: "#6B7F9A", style: "bald", extra: GLASSES };
const MARCIO = { skin: "#C88A5E", hair: "#2B1B16", shirt: "#FFFDF8", style: "short" };
const MOURA = { skin: "#E3B08C", hair: "#3A2418", shirt: "#B0413E", style: "short" };
const BOY = shirt => ({ skin: "#E3B08C", hair: "#3A2418", shirt, style: "cap", s: .7 });
const VOLUNTEER = { skin: "#9A6546", hair: "#1F130F", shirt: "#5D8963", style: "short", s: .9 };
const at = (o, s) => Object.assign({}, o, { s });
const mk = (o, ex) => Object.assign({}, o, { extra: (o.extra || "") + ex });
const HOLD = (o, x2, y2) => `<path d="M14 -36 L${x2} ${y2}" stroke="${o.shirt === "#FFFDF8" ? "#E9DDCB" : o.shirt}" stroke-width="9" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="5" fill="${o.skin}"/>`;

// a Farofa: y = linha das patas; o = { flip, lie, young, bandana, s }
const DOG = (x, y, o = {}) => {
  const s = o.s || 1, body = o.young ? "#A0662E" : "#8B5A2B", face = o.young ? "#A0662E" : "#A9876A", snout = o.young ? "#C08A5A" : "#D2CBC2";
  const legs = o.lie ? `<rect x="14" y="-6" width="22" height="6" rx="3" fill="${body}"/><rect x="-26" y="-6" width="16" height="6" rx="3" fill="${body}"/>`
    : o.young ? `<path d="M14 -16 L30 -6 M8 -16 L20 -2 M-14 -16 L-30 -8 M-18 -16 L-26 0" stroke="${body}" stroke-width="6" stroke-linecap="round"/>`
    : [-18, -10, 10, 18].map(lx => `<rect x="${lx - 3}" y="-16" width="6" height="16" rx="2" fill="${body}"/>`).join("");
  const by = o.lie ? -10 : -22, hy = o.lie ? -22 : -38;
  const tail = o.lie ? `<path d="M-26 ${by} Q-40 ${by + 4} -44 ${by - 2}" stroke="${body}" stroke-width="5" fill="none" stroke-linecap="round"/>`
    : `<path d="M-25 ${by - 4} Q-36 ${by - 10} -38 ${by - 22}" stroke="${body}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y}) scale(${o.flip ? -s : s} ${s})">${tail}${legs}
    <ellipse cx="0" cy="${by}" rx="27" ry="${o.lie ? 10 : 12}" fill="${body}"/>
    <circle cx="24" cy="${hy}" r="12" fill="${face}"/><ellipse cx="34" cy="${hy + 4}" rx="8" ry="6" fill="${snout}"/><circle cx="41" cy="${hy + 2}" r="2.6" fill="#2B1721"/>
    <path d="M17 ${hy - 9} Q10 ${hy - 2} 14 ${hy + 9} Q20 ${hy + 2} 21 ${hy - 8} Z" fill="#5E3A1C"/>
    <circle cx="28" cy="${hy - 3}" r="1.9" fill="#2B1721"/>
    ${o.bandana ? `<path d="M14 ${hy + 8} L30 ${hy + 10} L20 ${hy + 22} Z" fill="#E04A4A"/>` : ""}</g>`;
};
const PUPPY = (x, y, c, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -.45 : .45} .45)"><ellipse cx="0" cy="-20" rx="20" ry="13" fill="${c}"/><circle cx="20" cy="-34" r="13" fill="${c}"/><circle cx="25" cy="-36" r="2.4" fill="#2B1721"/><circle cx="33" cy="-31" r="3" fill="#2B1721"/>${[-12, -4, 6, 14].map(lx => `<rect x="${lx - 3}" y="-12" width="6" height="12" fill="${c}"/>`).join("")}<path d="M-18 -26 Q-30 -36 -24 -44" stroke="${c}" stroke-width="5" fill="none"/></g>`;
const FENCE = (x, w, y, h) => `<rect x="${x}" y="${y}" width="${w}" height="5" fill="#8E7E72"/>${Array.from({ length: Math.floor(w / 12) + 1 }, (_, i) => `<rect x="${x + i * 12}" y="${y}" width="3" height="${h}" fill="#8E7E72"/>`).join("")}`;
const SIGN = (x, y, t) => { const w = Math.max(160, t.length * 11 + 30); return `<rect x="${x - w / 2}" y="${y}" width="${w}" height="28" rx="4" fill="#6D2E46"/><text x="${x}" y="${y + 19}" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#FFFDF8" letter-spacing="2">${t}</text>`; };
const PAW = (x, y, r, c) => `<g fill="${c}"><circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${x - r}" cy="${y - r * 1.2}" r="${r * .45}"/><circle cx="${x}" cy="${y - r * 1.5}" r="${r * .45}"/><circle cx="${x + r}" cy="${y - r * 1.2}" r="${r * .45}"/></g>`;
const TREE = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s || 1})"><rect x="-6" y="-60" width="12" height="60" fill="#6B4A32"/><circle cx="0" cy="-80" r="34" fill="#5D8963"/><circle cx="-22" cy="-64" r="20" fill="#6E9A74"/><circle cx="22" cy="-66" r="22" fill="#4E7A56"/></g>`;
const BENCH = (x, y) => `<rect x="${x - 50}" y="${y - 30}" width="100" height="8" rx="2" fill="#8E6A55"/><rect x="${x - 50}" y="${y - 50}" width="100" height="7" rx="2" fill="#8E6A55"/><rect x="${x - 44}" y="${y - 22}" width="6" height="22" fill="#5A3A2E"/><rect x="${x + 38}" y="${y - 22}" width="6" height="22" fill="#5A3A2E"/>`;
const PIGEON = (x, y) => `<ellipse cx="${x}" cy="${y - 6}" rx="8" ry="5" fill="#8E7E72"/><circle cx="${x + 7}" cy="${y - 11}" r="3.5" fill="#6B7F9A"/><path d="M${x + 10} ${y - 11} l3 1 l-3 1 Z" fill="#E0AE55"/>`;
const HEART = (x, y, r, c) => `<path d="M${x} ${y + r} C${x - r * 1.6} ${y} ${x - r} ${y - r} ${x} ${y - r * .4} C${x + r} ${y - r} ${x + r * 1.6} ${y} ${x} ${y + r} Z" fill="${c || "#E04A4A"}"/>`;
const SQUARE = () => `${SKY("#BFD6E0", "#E9F1F4")}${TREE(60, 190, 1)}${TREE(480, 190, .9)}${GROUND("#C9B8A2")}<rect y="186" width="540" height="6" fill="#B9A48C"/>`;
const SHELTER_WALL = () => `${SKY("#E9DDCB", "#ECE2D0")}<rect x="0" y="40" width="540" height="150" fill="#F3E9D2"/>${SIGN(270, 10, "PATAS AMIGAS")}${PAW(450, 30, 7, "#A26769")}${PAW(90, 30, 7, "#A26769")}${GROUND("#C9A98A")}`;
const GATE = (x, open) => `<rect x="${x}" y="70" width="8" height="122" fill="#5A4A40"/><rect x="${x + 112}" y="70" width="8" height="122" fill="#5A4A40"/>
  <g ${open ? `transform="translate(${x + 8} 0) scale(.35 1) translate(${-x - 8} 0)"` : ""}>${FENCE(x + 8, 104, 84, 106)}</g>`;
const PHONE = (x, y, w, h, inner) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#2B1721"/><rect x="${x + 7}" y="${y + 14}" width="${w - 14}" height="${h - 26}" rx="3" fill="#FFFDF8"/>${inner}`;
const BEACH_PIC = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#BFD6E0"/><rect x="${x}" y="${y + h * .45}" width="${w}" height="${h * .2}" fill="#3E7CB0"/><rect x="${x}" y="${y + h * .65}" width="${w}" height="${h * .35}" fill="#E9CFA0"/>`;

return {
  shelter: () => `${SHELTER_WALL()}
    ${FENCE(30, 150, 100, 90)}${PUPPY(70, 190, "#E0AE55")}${PUPPY(110, 186, "#2B1721", true)}${PUPPY(150, 190, "#FFFDF8")}
    <rect x="360" y="170" width="150" height="20" rx="6" fill="#6B7F9A"/>${DOG(430, 190, { lie: true })}${FENCE(350, 170, 100, 90)}
    ${person(230, 205, BIA)}${person(290, 205, CELIA)}`,
  photos: () => `${SKY("#BFD6E0", "#E9F1F4")}${TREE(420, 190, 1.2)}${GROUND("#7FA36B")}
    ${DOG(420, 190, { lie: true, s: .9 })}${person(250, 205, mk(RAFA, HOLD(RAFA, 22, -40)))}${person(150, 205, BIA)}
    <g transform="rotate(-6 80 60)"><rect x="20" y="16" width="120" height="90" fill="#FFFDF8" stroke="#D9CBBE" stroke-width="2"/>${BEACH_PIC(28, 24, 104, 66)}${DOG(80, 82, { young: true, s: .6 })}</g>`,
  walk: () => `${SQUARE()}${BENCH(420, 190)}${person(420, 168, at(ANTONIO, .95))}${PIGEON(470, 192)}${PIGEON(490, 190)}
    ${person(170, 205, mk(BIA, HOLD(BIA, 26, -24)))}<path d="M196 181 Q230 175 252 165" stroke="#B0413E" stroke-width="2" fill="none"/>${DOG(240, 192)}`,
  bench: () => `${SQUARE()}${BENCH(300, 190)}${person(300, 168, ANTONIO)}${DOG(240, 192, { s: 1.05 })}${person(130, 205, BIA)}
    ${HEART(275, 92, 7)}${HEART(292, 76, 5)}`,
  phone_likes: () => `${SKY("#E9DDCB", "#ECE2D0")}${GROUND("#C9A98A")}
    ${PHONE(205, 12, 130, 176, `${BEACH_PIC(212, 30, 116, 90)}${DOG(268, 114, { young: true, s: .7 })}${HEART(228, 140, 6)}<text x="242" y="148" font-family="sans-serif" font-size="15" font-weight="700" fill="#2B1721">512</text><text x="220" y="168" font-family="sans-serif" font-size="11" fill="#5A4A40">She's 5! Adopt me!</text>`)}
    ${[[150, 60, 9], [380, 50, 11], [170, 120, 7], [400, 110, 8], [130, 30, 6], [420, 160, 6]].map(([x, y, r]) => HEART(x, y, r)).join("")}
    ${person(90, 205, BIA)}${person(460, 205, RAFA)}`,
  desk: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="380" y="24" width="120" height="86" fill="#34466B" stroke="#8E6A55" stroke-width="6"/><circle cx="470" cy="50" r="12" fill="#F3E9D2"/>
    <rect x="60" y="30" width="56" height="44" fill="#FFFDF8" stroke="#8E6A55" stroke-width="3"/>${DOG(84, 68, { s: .45 })}
    ${person(250, 160, BIA)}<rect x="130" y="150" width="280" height="12" fill="#6B4A32"/><rect x="146" y="162" width="10" height="30" fill="#5A3A2E"/><rect x="384" y="162" width="10" height="30" fill="#5A3A2E"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${150 + i * 2}" y="${136 - i * 10}" width="54" height="10" fill="${["#6D2E46", "#3E7C8E", "#E0AE55", "#5D8963"][i]}"/>`).join("")}
    <rect x="330" y="104" width="6" height="46" fill="#2B1721"/><path d="M314 104 L352 104 L344 86 L322 86 Z" fill="#E0AE55"/>${GROUND("#B9A48C")}`,
  walk_three: () => `${SQUARE()}<rect x="400" y="120" width="140" height="56" rx="14" fill="#3E7CB0"/><rect x="420" y="96" width="90" height="30" rx="8" fill="#3E7CB0"/><rect x="430" y="102" width="70" height="20" rx="3" fill="#BFD6E0"/>
    <circle cx="465" cy="112" r="8" fill="${MARCIO.skin}"/><circle cx="430" cy="178" r="14" fill="#2B1721"/><circle cx="520" cy="178" r="14" fill="#2B1721"/>
    ${person(110, 205, BIA)}${person(200, 205, mk(ANTONIO, HOLD(ANTONIO, 26, -24)))}<path d="M226 181 Q256 176 276 166" stroke="#B0413E" stroke-width="2" fill="none"/>${DOG(268, 193)}`,
  fair: () => `${SKY("#BFD6E0", "#E9F1F4")}${Array.from({ length: 14 }, (_, i) => `<path d="M${i * 40} 20 l20 0 l-10 16 Z" fill="${["#E04A4A", "#3E7CE0", "#E0AE55", "#5D8963"][i % 4]}"/>`).join("")}<path d="M0 20 L540 20" stroke="#2B1721"/>
    <rect x="320" y="110" width="200" height="30" fill="#8E6A55"/>${SIGN(150, 60, "ADOPTION FAIR")}${person(420, 110, at(CELIA, .8))}<rect x="440" y="70" width="3" height="22" fill="#2B1721"/><circle cx="441" cy="68" r="4" fill="#2B1721"/>
    <rect x="490" y="70" width="34" height="50" rx="4" fill="#2B1721"/><circle cx="507" cy="85" r="7" fill="#5A4A40"/><circle cx="507" cy="106" r="10" fill="#5A4A40"/>
    ${[0, 1, 2].map(i => `<path d="M${480 - i * 10} ${80 + i * 8} q-8 10 0 20" stroke="#2B1721" stroke-width="2" fill="none"/>`).join("")}
    ${GROUND("#C9B8A2")}${FENCE(20, 120, 150, 40)}${PUPPY(50, 190, "#E0AE55")}${PUPPY(90, 188, "#FFFDF8", true)}${PUPPY(125, 190, "#2B1721")}
    ${DOG(185, 192, { flip: true, s: .85 })}${person(230, 205, BIA)}${person(300, 205, at(MOURA, .9))}`,
  house: () => `${SKY("#ECE2D0", "#ECE2D0")}<rect x="40" y="30" width="110" height="70" fill="#2B1721"/><rect x="46" y="36" width="98" height="58" fill="#34466B"/>
    <rect x="30" y="100" width="130" height="10" fill="#6B4A32"/><rect x="40" y="110" width="8" height="82" fill="#5A3A2E"/><rect x="142" y="110" width="8" height="82" fill="#5A3A2E"/>
    <path d="M70 186 l8 -10 l6 8 Z M96 188 l10 -6 l2 8 Z" fill="#3E7C8E"/>${DOG(98, 190, { lie: true, s: .7 })}
    ${GROUND("#B9A48C")}${person(270, 205, BOY("#3E7CE0"))}${person(320, 205, BOY("#E0AE55"))}<circle cx="295" cy="186" r="9" fill="#FFFDF8" stroke="#2B1721" stroke-width="2"/>
    ${person(440, 205, mk(MOURA, HOLD(MOURA, 14, -62) + '<rect x="12" y="-76" width="8" height="15" rx="2" fill="#2B1721"/>'))}`,
  beach: () => `<rect x="10" y="8" width="520" height="204" fill="#FFFDF8"/><g transform="translate(22 18) scale(.955 .87)">${SKY("#9FD3E6", "#E9F1F4")}<circle cx="440" cy="50" r="24" fill="#F3D36B"/>
    <rect y="110" width="540" height="40" fill="#3E7CB0"/><rect y="150" width="540" height="70" fill="#E9CFA0"/>${person(240, 205, ANTONIO)}${DOG(320, 200)}</g>`,
  stage: () => `${SKY("#BFD6E0", "#E9F1F4")}${SIGN(270, 10, "ADOPT AN OLD FRIEND")}<rect x="120" y="136" width="300" height="20" fill="#8E6A55"/><rect x="120" y="156" width="300" height="38" fill="#6B4A32"/>
    ${person(240, 136, mk(BIA, HOLD(BIA, 10, -54)))}<rect x="246" y="74" width="4" height="12" fill="#2B1721"/><circle cx="248" cy="74" r="4" fill="#2B1721"/>${DOG(320, 136, { bandana: true, s: .9 })}
    ${GROUND("#C9B8A2")}${[30, 70, 110, 430, 470, 510].map((x, i) => `<g transform="translate(${x} 210)"><rect x="-22" y="-26" width="44" height="26" rx="10" fill="${["#34466B", "#A26769", "#5D8963", "#6D2E46", "#E0AE55", "#3E7C8E"][i]}"/><circle cy="-36" r="14" fill="${["#2B1B16", "#5A3A22", "#1F130F", "#7E6A60", "#3A2418", "#2B1B16"][i]}"/></g>`).join("")}
    ${HEART(160, 70, 9)}${HEART(380, 64, 8)}${HEART(400, 96, 6)}`,
  office: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="30" y="30" width="130" height="90" fill="#BFD6E0" stroke="#8E6A55" stroke-width="6"/><path d="M95 30 L95 120 M30 75 L160 75" stroke="#8E6A55" stroke-width="4"/>
    <ellipse cx="95" cy="186" rx="70" ry="10" fill="#6B7F9A"/>${DOG(95, 188, { lie: true })}
    <rect x="300" y="60" width="150" height="90" rx="4" fill="#2B1721"/><rect x="308" y="68" width="134" height="74" fill="#FFFDF8"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${314 + (i % 3) * 44}" y="${74 + Math.floor(i / 3) * 34}" width="38" height="28" fill="${["#E9CFA0", "#BFD6E0", "#D9CBBE"][i % 3]}"/>${PAW(333 + (i % 3) * 44, 94 + Math.floor(i / 3) * 34, 4, "#8B5A2B")}`).join("")}
    <rect x="364" y="150" width="20" height="14" fill="#2B1721"/>${GROUND("#B9A48C")}${person(260, 205, BIA)}${person(470, 205, CELIA)}`,
  rain: () => `${SKY("#8E9AA6", "#B9C2CA")}<rect x="0" y="60" width="540" height="130" fill="#D9D2C6"/>${SIGN(270, 26, "PATAS AMIGAS")}${GATE(210, true)}${GROUND("#8E7E72")}
    ${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 41) % 540} ${(i * 23) % 200} l-6 14" stroke="#6B7F9A" stroke-width="2"/>`).join("")}
    ${person(120, 205, BIA)}${person(170, 205, CELIA)}${person(400, 205, MOURA)}${DOG(320, 192, { flip: true, s: .8 })}`,
  gate: () => `${SKY("#BFD6E0", "#E9F1F4")}<rect x="0" y="60" width="540" height="130" fill="#F3E9D2"/>${SIGN(270, 26, "PATAS AMIGAS")}
    ${person(300, 200, VOLUNTEER)}${DOG(360, 192, { s: .85 })}${person(180, 200, mk(at(CELIA, .9), '<path d="M-14 -36 L-26 -78" stroke="#A26769" stroke-width="9" stroke-linecap="round"/><circle cx="-26" cy="-78" r="5" fill="#8D5B3E"/>'))}
    ${FENCE(120, 300, 100, 90)}${GROUND("#C9A98A")}${person(480, 210, mk(BIA, `<circle cx="0" cy="-68" r="15.5" fill="${BIA.hair}"/><path d="M-15 -70 L-16 -40 Q0 -34 16 -40 L15 -70 Z" fill="${BIA.hair}"/>`))}`
};
})();
