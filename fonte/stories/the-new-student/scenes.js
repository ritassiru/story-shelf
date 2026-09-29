/* Ilustrações de "The New Student".
   Usa os ajudantes genéricos do template: person(), SKY(), GROUND().
   Cada cena é uma função que devolve o conteúdo de um SVG 540 x 220. */
SCENE_LIB["the-new-student"] = (() => {
const KAIO = { skin: "#8D5B3E", hair: "#1F130F", shirt: "#5D8963", style: "short",
  extra: '<text x="0" y="-18" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="700" fill="#FFFDF8">IFAL</text>' };
const FRECKLES = '<g fill="#C0703A"><circle cx="-9" cy="-63" r="1"/><circle cx="-6" cy="-61" r="1"/><circle cx="-10" cy="-60" r="1"/><circle cx="9" cy="-63" r="1"/><circle cx="6" cy="-61" r="1"/><circle cx="10" cy="-60" r="1"/></g>';
const STRAPS = '<path d="M-12 -44 L-10 -8 M12 -44 L10 -8" stroke="#6B4A32" stroke-width="4"/>';
const AOIFE = { skin: "#F1C9A8", hair: "#B5532E", shirt: "#3E7C8E", style: "long", s: 1.08, extra: FRECKLES };
const JULIA = { skin: "#C88A5E", hair: "#3A2418", shirt: "#A26769", style: "long" };
const TIAGO = { skin: "#D9A57E", hair: "#B5483A", shirt: "#E0AE55", style: "cap" };
const MARCOS = { skin: "#8D5B3E", hair: "#7E6A60", shirt: "#FFFDF8", style: "bald",
  extra: '<path d="M-2 -46 L2 -46 L3 -24 L0 -20 L-3 -24 Z" fill="#34466B"/><rect x="6" y="-36" width="10" height="13" rx="2" fill="#BFD6E0" stroke="#34466B" stroke-width="1"/>' };
const FLORAL = [[-10, -36], [7, -31], [-3, -21], [11, -13], [-12, -9], [3, -41]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#F3D36B"/>`).join("");
const NEIDE = { skin: "#A86B48", hair: "#ECE8E2", shirt: "#6D2E46", style: "bun",
  extra: FLORAL + '<path d="M-20 -18 L-30 6 L30 6 L20 -18 Z" fill="#6D2E46"/><circle cx="-14" cy="0" r="3" fill="#F3D36B"/><circle cx="12" cy="-6" r="3" fill="#F3D36B"/>' };

// variações de um personagem: mk(KAIO, SAD(KAIO.skin), ...) acrescenta desenhos ao "extra"
const mk = (o, ...ex) => Object.assign({}, o, { extra: (o.extra || "") + ex.join("") });
const at = (o, s) => Object.assign({}, o, { s });
const MOUTH = sk => `<rect x="-6" y="-64" width="12" height="8" fill="${sk}"/>`;
const SAD = sk => MOUTH(sk) + '<path d="M-4 -58 Q0 -62 4 -58" stroke="#5A2A2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
const LAUGH = sk => MOUTH(sk) + '<path d="M-5 -62 Q0 -53 5 -62 Z" fill="#5A2A2A"/>';
const WORRY = sk => MOUTH(sk) + '<path d="M-5 -59 q2.5 -2.5 5 0 q2.5 2.5 5 0" stroke="#5A2A2A" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
const SMIRK = sk => MOUTH(sk) + '<path d="M-5 -60 Q1 -58 6 -63" stroke="#5A2A2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
const EYES = (sk, dx, dy) => `<circle cx="-5" cy="-68" r="3" fill="${sk}"/><circle cx="5" cy="-68" r="3" fill="${sk}"/><circle cx="${-5 + dx}" cy="${-68 + dy}" r="1.8" fill="#2B1721"/><circle cx="${5 + dx}" cy="${-68 + dy}" r="1.8" fill="#2B1721"/>`;
const BACK = (o, long) => `<circle cx="0" cy="-68" r="15.5" fill="${o.hair}"/>${long ? `<path d="M-15 -70 L-16 -40 Q0 -34 16 -40 L15 -70 Z" fill="${o.hair}"/>` : ""}`;
const ARM = (o, x2, y2, left) => `<path d="M${left ? -14 : 14} -36 L${x2} ${y2}" stroke="${o.shirt === "#FFFDF8" ? "#E9DDCB" : o.shirt}" stroke-width="9" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="5" fill="${o.skin}"/>`;
const HEADPHONES = '<path d="M-17 -70 Q-17 -92 0 -92 Q17 -92 17 -70" stroke="#2B1721" stroke-width="4" fill="none"/><rect x="-21" y="-74" width="7" height="13" rx="3" fill="#2B1721"/><rect x="14" y="-74" width="7" height="13" rx="3" fill="#2B1721"/>';
const HELD = (x, y) => `<rect x="${x - 6}" y="${y - 10}" width="12" height="20" rx="2.5" fill="#2B1721"/><rect x="${x - 4.5}" y="${y - 8}" width="9" height="14" rx="1" fill="#9FD3E6"/>`;
const BACKPACK = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s || 1})"><rect x="-4" y="-60" width="34" height="50" rx="10" fill="#B5483A"/><rect x="2" y="-36" width="22" height="18" rx="5" fill="#8E3A2E"/></g>`;
const SUITCASE = (x, y) => `<rect x="${x - 16}" y="${y - 44}" width="32" height="44" rx="5" fill="#34466B"/><path d="M${x - 6} ${y - 44} V${y - 56} H${x + 6} V${y - 44}" stroke="#2B1721" stroke-width="3" fill="none"/><circle cx="${x - 10}" cy="${y + 2}" r="3" fill="#2B1721"/><circle cx="${x + 10}" cy="${y + 2}" r="3" fill="#2B1721"/>`;
const BOARD = (t1, t2) => `<rect x="150" y="16" width="240" height="78" rx="4" fill="#3E5A4A" stroke="#8E6A55" stroke-width="6"/><text x="270" y="50" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#ECE2D0">${t1}</text>${t2 ? `<text x="270" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#ECE2D0">${t2}</text>` : ""}`;
const HEADS = (xs, y, cols) => xs.map((x, i) => `<g transform="translate(${x} ${y})"><rect x="-24" y="-20" width="48" height="24" rx="10" fill="${cols[i % cols.length][0]}"/><circle cy="-30" r="15" fill="${cols[i % cols.length][1]}"/></g>`).join("");
const CROWD = [["#34466B", "#2B1B16"], ["#A26769", "#5A3A22"], ["#5D8963", "#1F130F"], ["#6D2E46", "#3A2418"], ["#E0AE55", "#2B1B16"], ["#3E7C8E", "#7E6A60"], ["#8E7E72", "#1F130F"]];
const TABLE = (x, w, y) => `<rect x="${x}" y="${y}" width="${w}" height="14" fill="#6B4A32"/><rect x="${x + 16}" y="${y + 14}" width="12" height="${192 - y - 14}" fill="#5A3A2E"/><rect x="${x + w - 28}" y="${y + 14}" width="12" height="${192 - y - 14}" fill="#5A3A2E"/>`;
const SHELVES = () => `<rect x="20" y="14" width="500" height="118" fill="#8E6A55"/>${[0, 1, 2].map(r => `<rect x="20" y="${50 + r * 40}" width="500" height="4" fill="#6B4A32"/>` + Array.from({ length: 30 }, (_, i) => `<rect x="${28 + i * 16.4}" y="${22 + r * 40 + (i % 3) * 3}" width="12" height="${28 - (i % 3) * 3}" fill="${["#6D2E46", "#3E7C8E", "#E0AE55", "#5D8963", "#A26769"][(i + r * 2) % 5]}"/>`).join("")).join("")}`;
const LIGHTS = y => Array.from({ length: 19 }, (_, i) => { const x = 10 + i * 29, yy = y + Math.sin(i / 18 * Math.PI) * 18; return `<circle cx="${x}" cy="${yy.toFixed(1)}" r="9" fill="#F3D36B" opacity=".25"/><circle cx="${x}" cy="${yy.toFixed(1)}" r="3.5" fill="#F3D36B"/>`; }).join("") + `<path d="M10 ${y} Q270 ${y + 36} 532 ${y}" stroke="#2B1721" stroke-width="1" fill="none"/>`;
const FLAG_BR = (x, y) => `<rect x="${x}" y="${y}" width="84" height="56" fill="#3E8E4A"/><path d="M${x + 42} ${y + 6} L${x + 78} ${y + 28} L${x + 42} ${y + 50} L${x + 6} ${y + 28} Z" fill="#F3D36B"/><circle cx="${x + 42}" cy="${y + 28}" r="12" fill="#2F4F9A"/>`;
const FLAG_IE = (x, y) => `<rect x="${x}" y="${y}" width="28" height="56" fill="#3E8E4A"/><rect x="${x + 28}" y="${y}" width="28" height="56" fill="#FFFDF8"/><rect x="${x + 56}" y="${y}" width="28" height="56" fill="#E0873A"/>`;

return {
  arrival: () => `${SKY("#F6E7C8", "#E9F1F4")}<rect x="240" y="60" width="300" height="130" fill="#D9CBBE"/><rect x="330" y="28" width="120" height="30" rx="4" fill="#5D8963"/><text x="390" y="49" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#FFFDF8">IFAL</text>
    ${[260, 470].map(x => `<rect x="${x}" y="84" width="50" height="40" rx="3" fill="#BFD6E0"/>`).join("")}${GROUND("#B9B0A6")}
    <path d="M10 186 L14 146 Q18 132 40 130 L66 112 Q74 106 88 106 L136 106 Q150 106 158 114 L176 130 Q196 132 198 146 L200 186 Z" fill="#A26769"/><path d="M74 116 L88 112 L118 112 L118 130 L64 130 Z" fill="#BFD6E0"/><path d="M124 112 L140 112 L160 130 L124 130 Z" fill="#BFD6E0"/>
    <circle cx="52" cy="188" r="14" fill="#2B1721"/><circle cx="162" cy="188" r="14" fill="#2B1721"/>
    ${BACKPACK(214, 200, 1.1)}${person(214, 204, mk(AOIFE, STRAPS, EYES(AOIFE.skin, 2, 0)))}
    ${person(370, 206, KAIO)}${person(440, 206, MARCOS)}`,
  classroom: () => `${SKY("#E9DDCB", "#E9DDCB")}${BOARD("Welcome, Aoife!", "🍀")}${GROUND("#C9B8A2")}
    <rect x="440" y="150" width="90" height="12" fill="#8E6A55"/>${person(485, 152, at(mk(TIAGO, SMIRK(TIAGO.skin), EYES(TIAGO.skin, -2, 0)), .8))}
    ${person(210, 196, mk(AOIFE, WORRY(AOIFE.skin)))}${person(300, 196, mk(KAIO, ARM(KAIO, -30, -44, true)))}
    ${HEADS([50, 120, 190, 260, 330, 400, 470], 222, CROWD)}`,
  deal: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="380" y="20" width="120" height="80" fill="#BFD6E0" stroke="#FFFDF8" stroke-width="6"/>${GROUND("#C9B8A2")}
    ${person(130, 176, mk(KAIO, LAUGH(KAIO.skin)))}${person(410, 176, mk(AOIFE, LAUGH(AOIFE.skin)))}${TABLE(80, 380, 160)}
    <rect x="166" y="104" width="208" height="56" rx="3" fill="#FFFDF8" stroke="#D9CBBE"/><line x1="270" y1="104" x2="270" y2="160" stroke="#B5483A" stroke-width="2"/>
    <text x="218" y="138" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-style="italic" fill="#34466B">oxente</text><text x="322" y="138" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-style="italic" fill="#34466B">grand</text>`,
  phone_video: () => `${SKY("#E9C4B0", "#E9DDCB")}<rect x="180" y="6" width="180" height="208" rx="18" fill="#2B1721"/><rect x="190" y="20" width="160" height="180" rx="8" fill="#FFFDF8"/>
    <rect x="198" y="30" width="144" height="96" rx="4" fill="#34466B"/>${person(270, 126, at({ skin: "#D9A57E", hair: "#B5483A", shirt: "#E0AE55", style: "cap" }, .8))}<circle cx="270" cy="78" r="18" fill="#FFFDF8" opacity=".85"/><path d="M264 68 L264 88 L281 78 Z" fill="#34466B"/>
    <text x="206" y="150" font-family="sans-serif" font-size="15" font-weight="700" fill="#2B1721">👁 312 views</text><rect x="206" y="162" width="120" height="7" rx="3" fill="#D9CBBE"/><rect x="206" y="176" width="86" height="7" rx="3" fill="#D9CBBE"/>
    ${[[80, 60, 34], [440, 50, 30], [120, 150, 26], [420, 150, 34], [490, 110, 22], [40, 120, 22]].map(([x, y, s]) => `<text x="${x}" y="${y}" font-size="${s}">😂</text>`).join("")}`,
  lunch_alone: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="0" y="20" width="540" height="10" fill="#D9CBBE"/>${GROUND("#C9B8A2")}
    ${[40, 76, 112, 150].map((x, i) => person(x, 150, at(mk({ skin: ["#C88A5E", "#8D5B3E", "#E3B08C", "#A86B48"][i], hair: CROWD[i][1], shirt: CROWD[i][0], style: ["long", "short", "curly", "bun"][i] }, LAUGH(["#C88A5E", "#8D5B3E", "#E3B08C", "#A86B48"][i])), .6))).join("")}
    <rect x="20" y="146" width="170" height="10" fill="#8E6A55"/>
    ${person(400, 178, mk(AOIFE, SAD(AOIFE.skin), EYES(AOIFE.skin, 1, 3), HEADPHONES, ARM(AOIFE, 20, -44)))}${HELD(422, 136)}
    ${TABLE(300, 210, 164)}<rect x="340" y="154" width="30" height="10" rx="3" fill="#FFFDF8"/>`,
  festival: () => `${SKY("#1F2A44", "#4A3A5C")}${LIGHTS(24)}${GROUND("#6B5344")}
    ${person(80, 200, mk({ skin: "#8D5B3E", hair: "#E0C27A", shirt: "#34466B", style: "cap" }, '<rect x="-24" y="-42" width="48" height="32" rx="4" fill="#B5483A"/>' + [0, 1, 2, 3, 4].map(i => `<rect x="${-18 + i * 8}" y="-42" width="3" height="32" fill="#6D2E46"/>`).join("")))}
    ${person(230, 200, mk(NEIDE, LAUGH(NEIDE.skin), ARM(NEIDE, 26, -38)))}${person(290, 200, mk(AOIFE, LAUGH(AOIFE.skin), ARM(AOIFE, -24, -38, true)))}
    ${[400, 440, 480].map((x, i) => `<g opacity=".85">${person(x, 196, at(mk({ skin: ["#C88A5E", "#E3B08C", "#A86B48"][i], hair: CROWD[i][1], shirt: CROWD[i + 3][0], style: ["short", "long", "curly"][i] }, LAUGH(["#C88A5E", "#E3B08C", "#A86B48"][i])), .7))}</g>`).join("")}
    <text x="420" y="110" font-size="18">👏</text><text x="80" y="92" font-size="18">🎶</text>`,
  library: () => `${SKY("#E9DDCB", "#E9DDCB")}${SHELVES()}${GROUND("#C9B8A2")}
    ${person(170, 206, mk(KAIO, WORRY(KAIO.skin), EYES(KAIO.skin, 2, 0)))}
    ${[0, 1, 2, 3].map(i => `<rect x="${140 + (i % 2) * 4}" y="${190 - i * 12}" width="60" height="12" rx="2" fill="${["#3E7C8E", "#A26769", "#E0AE55", "#5D8963"][i]}"/>`).join("")}
    ${person(380, 206, mk(AOIFE, LAUGH(AOIFE.skin), ARM(AOIFE, -30, -60, true)))}
    <rect x="290" y="56" width="92" height="74" rx="4" fill="#3E8E4A" stroke="#FFFDF8" stroke-width="3"/><text x="336" y="84" text-anchor="middle" font-size="20">🍀</text><text x="336" y="104" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#FFFDF8">Apresentação</text><text x="336" y="120" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#FFFDF8">IRLANDA</text>`,
  empty_desk: () => `${SKY("#E9DDCB", "#E9DDCB")}${BOARD("Monday")}${GROUND("#C9B8A2")}
    ${[300, 380, 460].map((x, i) => `${person(x, 150, at({ skin: ["#C88A5E", "#E3B08C", "#A86B48"][i], hair: CROWD[i][1], shirt: CROWD[i + 2][0], style: ["long", "short", "curly"][i] }, .6))}<rect x="${x - 26}" y="148" width="52" height="8" fill="#8E6A55"/>`).join("")}
    <ellipse cx="220" cy="158" rx="38" ry="10" fill="#F3E9D2"/><rect x="194" y="148" width="52" height="8" fill="#8E6A55"/><rect x="198" y="156" width="4" height="20" fill="#6B4A32"/><rect x="238" y="156" width="4" height="20" fill="#6B4A32"/><rect x="204" y="124" width="32" height="24" rx="3" fill="#A98468"/>
    ${person(80, 212, mk(KAIO, SAD(KAIO.skin), EYES(KAIO.skin, 3, -1)))}`,
  study_group: () => `${SKY("#E9DDCB", "#E9DDCB")}${SHELVES()}${GROUND("#C9B8A2")}
    ${person(130, 176, mk(KAIO, LAUGH(KAIO.skin)))}${person(220, 176, mk(AOIFE, LAUGH(AOIFE.skin)))}${person(320, 176, mk(JULIA, LAUGH(JULIA.skin)))}${person(410, 176, { skin: "#E3B08C", hair: "#5A3A22", shirt: "#34466B", style: "curly" })}
    ${TABLE(80, 380, 160)}${[150, 250, 340].map(x => `<rect x="${x}" y="146" width="50" height="14" rx="2" fill="#FFFDF8" stroke="#D9CBBE"/>`).join("")}
    <rect x="160" y="4" width="120" height="28" rx="12" fill="#FFFDF8" stroke="#D9CBBE"/><text x="220" y="23" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#2B1721">Have you ever...?</text>
    <circle cx="360" cy="20" r="14" fill="#FFFDF8" stroke="#D9CBBE"/><text x="360" y="26" text-anchor="middle" font-family="Georgia,serif" font-size="17" font-weight="700" fill="#6D2E46">?</text>
    <circle cx="96" cy="24" r="12" fill="#FFFDF8" stroke="#D9CBBE"/><text x="96" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="700" fill="#6D2E46">?</text>`,
  friends_photo: () => `${SKY("#BFD6E0", "#E9F1F4")}${FLAG_BR(60, 20)}${FLAG_IE(396, 20)}${GROUND("#C9B8A2")}
    ${person(170, 208, mk(JULIA, LAUGH(JULIA.skin)))}${person(330, 208, mk({ skin: "#E3B08C", hair: "#5A3A22", shirt: "#34466B", style: "curly" }, LAUGH("#E3B08C")))}
    ${person(222, 210, mk(KAIO, LAUGH(KAIO.skin), ARM(KAIO, -30, -80, true)))}${HELD(192, 120)}${person(282, 210, mk(AOIFE, LAUGH(AOIFE.skin)))}
    <rect x="264" y="164" width="40" height="24" rx="3" fill="#6B4A32"/><path d="M284 164 V188 M264 176 H304" stroke="#E0AE55" stroke-width="3"/>`,
  culture_day: () => `${SKY("#F6E7C8", "#E9DDCB")}<path d="M0 22 Q135 46 270 26 Q405 46 540 22" stroke="#6B4A32" stroke-width="1.5" fill="none"/>${Array.from({ length: 14 }, (_, i) => `<path d="M${20 + i * 37} ${30 + (i % 4) * 3} l8 0 l-4 12 Z" fill="${["#3E8E4A", "#FFFDF8", "#E0873A", "#F3D36B"][i % 4]}"/>`).join("")}
    ${GROUND("#C9B8A2")}
    <rect x="20" y="130" width="120" height="12" fill="#8E6A55"/><rect x="28" y="142" width="8" height="48" fill="#6B4A32"/><rect x="124" y="142" width="8" height="48" fill="#6B4A32"/>${[40, 66, 92, 118].map(x => `<ellipse cx="${x}" cy="124" rx="11" ry="6" fill="#FFFDF8" stroke="#D9CBBE"/>`).join("")}<text x="80" y="108" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#6D2E46">TAPIOCA</text>
    <rect x="400" y="130" width="120" height="12" fill="#8E6A55"/><rect x="408" y="142" width="8" height="48" fill="#6B4A32"/><rect x="504" y="142" width="8" height="48" fill="#6B4A32"/>${[430, 460, 490].map(x => `<ellipse cx="${x}" cy="122" rx="13" ry="9" fill="#C08A5A"/><path d="M${x - 6} 122 H${x + 6} M${x} 116 V128" stroke="#8E5A32" stroke-width="2"/>`).join("")}<text x="460" y="104" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#6D2E46">SODA BREAD</text>
    <ellipse cx="270" cy="182" rx="90" ry="14" fill="#B9A48C"/>
    ${person(210, 190, at(mk(KAIO, LAUGH(KAIO.skin), ARM(KAIO, 30, -34)), .8))}${person(330, 190, at(mk(AOIFE, LAUGH(AOIFE.skin), ARM(AOIFE, -30, -34, true)), .8))}
    ${person(250, 170, at(mk(JULIA, LAUGH(JULIA.skin)), .7))}${person(290, 170, at(mk(TIAGO, LAUGH(TIAGO.skin)), .7))}`,
  goodbye: () => `${SKY("#F2B880", "#E9DDCB")}<rect x="0" y="80" width="200" height="110" fill="#D9CBBE"/><rect x="340" y="80" width="200" height="110" fill="#D9CBBE"/><rect x="190" y="56" width="12" height="134" fill="#8E7E72"/><rect x="338" y="56" width="12" height="134" fill="#8E7E72"/>
    <rect x="224" y="30" width="92" height="24" rx="4" fill="#5D8963"/><text x="270" y="47" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#FFFDF8">IFAL</text>${GROUND("#B9B0A6")}
    ${person(110, 208, mk(KAIO, ARM(KAIO, 26, -70)))}${SUITCASE(438, 204)}${person(400, 206, mk(AOIFE, ARM(AOIFE, -26, -74, true)))}`,
  presentation: () => `${SKY("#34304A", "#4A3A5C")}<rect x="120" y="120" width="300" height="30" fill="#8E6A55"/><rect x="120" y="116" width="300" height="6" fill="#A98468"/>
    <path d="M200 0 L150 120 L390 120 L340 0 Z" fill="#F3E9D2" opacity=".12"/>
    ${person(270, 118, mk(AOIFE, LAUGH(AOIFE.skin), ARM(AOIFE, 22, -52)))}<rect x="292" y="60" width="3" height="58" fill="#2B1721"/><ellipse cx="293" cy="58" rx="5" ry="7" fill="#2B1721"/>
    <rect x="0" y="150" width="540" height="70" fill="#2B2233"/>
    ${HEADS([40, 100, 160, 220, 320, 380, 440, 500], 214, CROWD)}<g transform="translate(270 212)"><rect x="-24" y="-20" width="48" height="24" rx="10" fill="#5D8963"/><circle cy="-30" r="15" fill="#1F130F"/></g>
    ${[[60, 170], [180, 160], [350, 166], [470, 158], [270, 150]].map(([x, y]) => `<text x="${x}" y="${y}" font-size="18">😂</text>`).join("")}`,
  airport: () => `${SKY("#E9F1F4", "#E9F1F4")}<rect x="0" y="20" width="540" height="110" fill="#BFD6E0"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${i * 90}" y="20" width="6" height="110" fill="#8E7E72"/>`).join("")}<rect x="0" y="126" width="540" height="6" fill="#8E7E72"/>
    <path d="M300 70 L420 64 Q436 64 436 70 Q436 76 420 76 L300 72 Z" fill="#FFFDF8"/><path d="M360 68 L340 50 L352 50 L384 67 Z M360 72 L344 90 L356 90 L386 73 Z" fill="#FFFDF8"/><path d="M304 70 L296 58 L304 58 L314 69 Z" fill="#FFFDF8"/>
    <rect x="40" y="36" width="150" height="46" rx="4" fill="#2B1721"/><text x="115" y="56" text-anchor="middle" font-family="monospace" font-size="13" font-weight="700" fill="#F3D36B">DEPARTURES</text><text x="115" y="74" text-anchor="middle" font-family="monospace" font-size="13" fill="#F3D36B">GATE 5 ▶</text>
    ${GROUND("#D9D3CB")}${person(330, 204, mk(AOIFE, BACK(AOIFE, true)))}${SUITCASE(366, 204)}`
};
})();
