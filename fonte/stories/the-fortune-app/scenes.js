/* Ilustrações de "The Fortune App".
   Usa os ajudantes genéricos do template: person(), SKY(), GROUND().
   Cada cena é uma função que devolve o conteúdo de um SVG 540 x 220.
   O app FutureMe tem sempre a mesma cara: tela roxa com uma bola de cristal. */
SCENE_LIB["the-fortune-app"] = (() => {
const HOOD = '<path d="M-17 -45 Q0 -32 17 -45 L13 -50 Q0 -40 -13 -50 Z" fill="#26324F"/><path d="M-4 -40 L-5 -28 M4 -40 L5 -28" stroke="#ECE2D0" stroke-width="1.5"/><rect x="-11" y="-18" width="22" height="10" rx="3" fill="#26324F"/>';
const LEO = { skin: "#B97A55", hair: "#2B1B16", shirt: "#34466B", style: "curly", extra: HOOD };
const NANDO = { skin: "#6E4630", hair: "#1F130F", shirt: "#B5483A", style: "short",
  extra: '<rect x="-20" y="-32" width="40" height="6" fill="#FFFDF8"/><text x="0" y="-8" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#FFFDF8">7</text>' };
const MOM = { skin: "#B97A55", hair: "#2B1B16", shirt: "#5D8963", style: "long" };
const ANA = { skin: "#E3B08C", hair: "#5A3A22", shirt: "#FFFDF8", style: "bun",
  extra: '<path d="M-8 -46 L0 -38 L8 -46 Z" fill="#D9CBBE"/><circle cx="-5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/><circle cx="5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/>' };

// variações de um personagem: mk(LEO, SAD(LEO.skin), ...) acrescenta desenhos ao "extra"
const mk = (o, ...ex) => Object.assign({}, o, { extra: (o.extra || "") + ex.join("") });
const at = (o, s) => Object.assign({}, o, { s });
const MOUTH = sk => `<rect x="-6" y="-64" width="12" height="8" fill="${sk}"/>`;
const SAD = sk => MOUTH(sk) + '<path d="M-4 -58 Q0 -62 4 -58" stroke="#5A2A2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
const FLAT = sk => MOUTH(sk) + '<path d="M-4 -60 L4 -60" stroke="#5A2A2A" stroke-width="1.8" stroke-linecap="round"/>';
const LAUGH = sk => MOUTH(sk) + '<path d="M-5 -62 Q0 -53 5 -62 Z" fill="#5A2A2A"/>';
const WORRY = sk => MOUTH(sk) + '<path d="M-5 -59 q2.5 -2.5 5 0 q2.5 2.5 5 0" stroke="#5A2A2A" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
const EYES = (sk, dx, dy) => `<circle cx="-5" cy="-68" r="3" fill="${sk}"/><circle cx="5" cy="-68" r="3" fill="${sk}"/><circle cx="${-5 + dx}" cy="${-68 + dy}" r="1.8" fill="#2B1721"/><circle cx="${5 + dx}" cy="${-68 + dy}" r="1.8" fill="#2B1721"/>`;
const BACK = o => `<circle cx="0" cy="-68" r="15.5" fill="${o.hair}"/>`;  // de costas: a cabeça fica toda da cor do cabelo
const ARM = (o, x2, y2, left) => `<path d="M${left ? -14 : 14} -36 L${x2} ${y2}" stroke="${o.shirt === "#FFFDF8" ? "#E9DDCB" : o.shirt}" stroke-width="9" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="5" fill="${o.skin}"/>`;
const HELD = (x, y, glow) => `${glow ? `<circle cx="${x}" cy="${y}" r="18" fill="#C9B6F0" opacity=".45"/>` : ""}<rect x="${x - 6}" y="${y - 10}" width="12" height="20" rx="2.5" fill="#2B1721"/><rect x="${x - 4.5}" y="${y - 8}" width="9" height="14" rx="1" fill="#6E52A8"/>`;

const PURPLE = "#5B3F8C";
const BALL = (x, y, r) => `<path d="M${x - r * .7} ${y + r * .8} L${x + r * .7} ${y + r * .8} L${x + r * .5} ${y + r * 1.25} L${x - r * .5} ${y + r * 1.25} Z" fill="#E0AE55"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="#C9B6F0"/><circle cx="${x + r * .15}" cy="${y + r * .15}" r="${r * .6}" fill="#A98BE0" opacity=".6"/><circle cx="${x - r * .35}" cy="${y - r * .35}" r="${r * .25}" fill="#FFFDF8" opacity=".8"/>`;
// cartão com a tela do FutureMe: linhas de texto (ou barras, se lines for um número)
const FM = (x, y, w, h, lines, fs) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 9}" fill="#2B1721"/><rect x="${x + w * .06}" y="${y + w * .06}" width="${w * .88}" height="${h - w * .12}" rx="${w / 16}" fill="${PURPLE}"/>
  ${BALL(x + w / 2, y + h * .22, w * .13)}
  ${typeof lines === "number" ? Array.from({ length: lines }, (_, i) => `<rect x="${x + w * .18}" y="${y + h * (.52 + i * .13)}" width="${w * (i % 2 ? .44 : .64)}" height="${h * .05}" rx="2" fill="#E6DCF7"/>`).join("")
    : lines.map((t, i) => `<text x="${x + w / 2}" y="${y + h * .5 + i * (fs + 4)}" text-anchor="middle" font-family="sans-serif" font-size="${fs}" ${i === 0 ? 'font-weight="700"' : ""} fill="#FFFDF8">${t}</text>`).join("")}`;
const WINDOW = (x, y, inside) => `<rect x="${x}" y="${y}" width="120" height="90" fill="#BFD6E0"/>${inside || ""}<rect x="${x}" y="${y}" width="120" height="90" fill="none" stroke="#FFFDF8" stroke-width="6"/><rect x="${x + 58}" y="${y}" width="4" height="90" fill="#FFFDF8"/>`;
const CLOUD = (x, y, c) => `<g fill="${c}"><ellipse cx="${x}" cy="${y}" rx="22" ry="12"/><ellipse cx="${x + 18}" cy="${y - 8}" rx="16" ry="12"/><ellipse cx="${x + 32}" cy="${y}" rx="18" ry="11"/></g>`;
const BOARD = (t1, t2) => `<rect x="150" y="18" width="240" height="78" rx="4" fill="#3E5A4A" stroke="#8E6A55" stroke-width="6"/><text x="270" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#ECE2D0">${t1}</text>${t2 ? `<text x="270" y="80" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#ECE2D0">${t2}</text>` : ""}`;
const DESK = (x, w) => `<rect x="${x}" y="160" width="${w}" height="12" fill="#8E6A55"/><rect x="${x + 8}" y="172" width="8" height="20" fill="#6B4A32"/><rect x="${x + w - 16}" y="172" width="8" height="20" fill="#6B4A32"/>`;
const PAPER = (x, y, grade, rot) => `<g transform="translate(${x} ${y}) rotate(${rot || 0})"><rect x="-50" y="-66" width="100" height="132" fill="#FFFDF8" stroke="#D9CBBE"/>
  ${[0, 1, 2, 3, 4].map(i => `<rect x="-38" y="${-24 + i * 16}" width="${i % 2 ? 50 : 64}" height="5" rx="2" fill="#D9CBBE"/>`).join("")}
  <text x="12" y="-30" text-anchor="middle" font-family="Georgia,serif" font-size="30" font-weight="700" fill="#C0392B">${grade}</text><ellipse cx="12" cy="-40" rx="32" ry="20" fill="none" stroke="#C0392B" stroke-width="2.5"/></g>`;
const NIGHT = () => `${SKY("#1F2A44", "#2B3556")}`;

return {
  phone_ad: () => `${SKY("#E9DDCB", "#E9DDCB")}
    ${WINDOW(404, 24, `<circle cx="490" cy="46" r="12" fill="#F3D27A"/>${CLOUD(420, 50, "#8E8A96")}${CLOUD(446, 78, "#9E9AA6")}<path d="M424 66 l-4 10 M434 68 l-4 10 M450 92 l-4 10" stroke="#6E8AA0" stroke-width="2"/>`)}
    ${GROUND("#C9B8A2")}${person(110, 208, mk(LEO, EYES(LEO.skin, 2, -1), ARM(LEO, 28, -52)))}${HELD(138, 156, true)}
    <path d="M150 146 L196 110" stroke="#A98BE0" stroke-width="2" stroke-dasharray="4 5"/>
    <rect x="196" y="22" width="180" height="156" rx="16" fill="${PURPLE}"/>${BALL(286, 62, 22)}
    <text x="286" y="116" text-anchor="middle" font-family="sans-serif" font-size="21" font-weight="700" fill="#FFFDF8">FutureMe</text>
    <text x="286" y="138" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#E6DCF7">Know your future!</text>
    <rect x="251" y="146" width="70" height="24" rx="12" fill="#E0AE55"/><text x="286" y="163" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#5A3A12">FREE</text>
    <text x="186" y="30" font-size="16">✨</text><text x="370" y="176" font-size="16">✨</text>`,
  study: () => `${SKY("#E9DDCB", "#E9DDCB")}${WINDOW(30, 24)}${GROUND("#C9B8A2")}
    ${person(150, 176, mk(LEO, EYES(LEO.skin, 1, 2)))}${person(410, 176, mk(NANDO, LAUGH(NANDO.skin)))}
    <rect x="90" y="160" width="370" height="14" fill="#6B4A32"/><rect x="108" y="174" width="12" height="18" fill="#5A3A2E"/><rect x="430" y="174" width="12" height="18" fill="#5A3A2E"/>
    <rect x="178" y="118" width="96" height="42" rx="2" fill="#FFFDF8" stroke="#D9CBBE"/><text x="226" y="137" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#34466B">2x + 3 = 7</text><text x="226" y="154" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#34466B">x = 2 ✓</text>
    <rect x="292" y="104" width="84" height="54" rx="4" fill="#2B1721"/><rect x="298" y="110" width="72" height="42" fill="#BFD6E0"/><path d="M328 120 L328 142 L346 131 Z" fill="#6D2E46"/><rect x="284" y="156" width="100" height="5" rx="2" fill="#8E7E72"/>`,
  gaming: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="20" y="34" width="76" height="156" fill="#C9B8A2" stroke="#8E6A55" stroke-width="5"/>
    ${person(58, 192, at(mk(MOM, FLAT(MOM.skin)), .9))}
    <rect x="430" y="62" width="96" height="66" rx="4" fill="#2B1721"/><rect x="436" y="68" width="84" height="54" fill="#9FD3E6"/><rect x="452" y="96" width="12" height="12" fill="#E04A4A"/><rect x="484" y="84" width="12" height="12" fill="#5D8963"/><rect x="470" y="128" width="16" height="20" fill="#6B4A32"/><rect x="450" y="146" width="56" height="44" fill="#8E6A55"/>
    <circle cx="478" cy="95" r="60" fill="#9FD3E6" opacity=".12"/>
    ${GROUND("#C9B8A2")}<rect x="150" y="112" width="240" height="46" rx="12" fill="#A26769"/>
    ${person(270, 172, mk(LEO, LAUGH(LEO.skin), EYES(LEO.skin, 2, 0), '<rect x="-17" y="-36" width="34" height="14" rx="7" fill="#2B1721"/><circle cx="9" cy="-29" r="2.2" fill="#E04A4A"/><circle cx="-9" cy="-29" r="2.2" fill="#9FD3E6"/>'))}
    <rect x="140" y="150" width="260" height="30" rx="10" fill="#8E4F5A"/><rect x="132" y="130" width="24" height="54" rx="10" fill="#A26769"/><rect x="384" y="130" width="24" height="54" rx="10" fill="#A26769"/>
    <g transform="translate(186 198) rotate(-8)"><rect x="-26" y="-9" width="52" height="14" rx="2" fill="#3E7C8E"/><text x="0" y="2" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="700" fill="#FFFDF8">MATH</text></g>`,
  classroom: () => `${SKY("#E9DDCB", "#E9DDCB")}${BOARD("x + 5 = 12", "x = ?")}${GROUND("#C9B8A2")}
    ${person(160, 172, mk(LEO, EYES(LEO.skin, 3, 0), '<path d="M-9 -77 L-2 -75 M2 -76 L9 -79" stroke="#2B1721" stroke-width="2" stroke-linecap="round"/>', FLAT(LEO.skin)))}
    ${person(380, 172, mk(NANDO, EYES(NANDO.skin, -1, -2)))}
    ${DESK(110, 100)}${DESK(330, 100)}<rect x="364" y="152" width="34" height="8" fill="#FFFDF8"/><path d="M396 146 L410 158" stroke="#E0AE55" stroke-width="3" stroke-linecap="round"/>
    <text x="196" y="84" font-family="Georgia,serif" font-size="22" font-weight="700" fill="#6D2E46">?</text>`,
  premium: () => `${SKY("#F3E9D2", "#E9DDCB")}${GROUND("#C9B8A2")}<rect x="180" y="6" width="180" height="208" rx="18" fill="#2B1721"/><rect x="190" y="20" width="160" height="180" rx="8" fill="#E0AE55"/>
    <path d="M242 70 L246 44 L258 58 L270 38 L282 58 L294 44 L298 70 Z" fill="#FFF3B0" stroke="#A8741F" stroke-width="2"/>
    <rect x="254" y="100" width="32" height="26" rx="4" fill="#5A3A12"/><path d="M260 100 V92 Q270 80 280 92 V100" stroke="#5A3A12" stroke-width="5" fill="none"/><circle cx="270" cy="112" r="4" fill="#E0AE55"/>
    <text x="270" y="152" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#5A3A12">UNLOCK YOUR</text><text x="270" y="172" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="700" fill="#5A3A12">SECRET</text><text x="270" y="190" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#5A3A12">PREDICTION</text>
    ${[[420, 50], [470, 90], [440, 140], [120, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="#E0AE55" stroke="#A8741F" stroke-width="2"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#5A3A12">R$</text>`).join("")}
    ${person(90, 208, mk(LEO, WORRY(LEO.skin), EYES(LEO.skin, 2, -1)))}`,
  no_app: () => `${NIGHT()}${WINDOW(40, 20, `<rect x="40" y="20" width="120" height="90" fill="#34466B"/><circle cx="130" cy="46" r="13" fill="#F3E9D2"/>`)}${GROUND("#2B2233")}
    <circle cx="450" cy="96" r="60" fill="#F3D36B" opacity=".14"/>
    ${person(270, 152, mk(LEO, EYES(LEO.skin, 0, 2)))}
    <rect x="170" y="140" width="330" height="14" fill="#6B4A32"/><rect x="186" y="154" width="12" height="38" fill="#5A3A2E"/><rect x="472" y="154" width="12" height="38" fill="#5A3A2E"/>
    <path d="M232 120 L268 124 L268 140 L232 138 Z" fill="#FFFDF8"/><path d="M268 124 L304 120 L304 138 L268 140 Z" fill="#ECE2D0"/>
    <rect x="338" y="120" width="18" height="20" rx="3" fill="#A26769"/><path d="M356 125 q7 4 0 10" stroke="#A26769" stroke-width="3" fill="none"/><path d="M343 114 q-3 -6 1 -12 M351 114 q-3 -6 1 -12" stroke="#ECE2D0" stroke-width="1.6" fill="none" opacity=".7"/>
    <rect x="384" y="132" width="30" height="8" rx="2" fill="#2B1721"/>
    <path d="M440 140 L450 100 L460 140 Z" fill="#8E7E72"/><path d="M432 100 L468 100 L458 82 L442 82 Z" fill="#F3D36B"/>`,
  friends: () => `${SKY("#BFD6E0", "#E9F1F4")}<rect x="0" y="80" width="540" height="110" fill="#D9CBBE"/>${GROUND("#C9B8A2")}
    ${person(110, 208, mk(LEO, EYES(LEO.skin, 2, 0), ARM(LEO, 30, -60)))}${person(430, 208, mk(NANDO, LAUGH(NANDO.skin), ARM(NANDO, -30, -60, true)))}
    ${FM(150, 16, 116, 146, ["Your friend", "Nando is going", "to lie to you", "tomorrow."], 13)}
    ${FM(274, 16, 116, 146, ["Your friend", "Léo is going", "to lie to you", "tomorrow."], 13)}
    <text x="270" y="190" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="700" fill="#6D2E46">=</text>`,
  test: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="30" y="20" width="170" height="64" rx="4" fill="#3E5A4A" stroke="#8E6A55" stroke-width="6"/><text x="115" y="60" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#ECE2D0">MATH TEST</text>
    <circle cx="470" cy="46" r="26" fill="#FFFDF8" stroke="#6B4A32" stroke-width="4"/><path d="M470 46 L458 58" stroke="#2B1721" stroke-width="4" stroke-linecap="round"/><path d="M470 46 L470 68" stroke="#2B1721" stroke-width="2.5" stroke-linecap="round"/><text x="470" y="92" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#6D2E46">7:30</text>
    ${GROUND("#C9B8A2")}${person(190, 180, mk(LEO, WORRY(LEO.skin), EYES(LEO.skin, 2, 1)))}
    <rect x="232" y="138" width="10" height="16" rx="2" fill="#2B1721"/><path d="M248 136 q5 8 0 16 M254 132 q8 12 0 24" stroke="#B5483A" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${DESK(130, 120)}<rect x="160" y="150" width="56" height="10" fill="#FFFDF8"/>
    ${person(380, 206, mk(ANA, ARM(ANA, -34, -44, true)))}<rect x="322" y="150" width="30" height="38" fill="#FFFDF8" stroke="#D9CBBE" transform="rotate(-10 337 169)"/>`,
  night: () => `${NIGHT()}<rect x="40" y="30" width="96" height="40" rx="6" fill="#2B1721"/><text x="88" y="58" text-anchor="middle" font-family="monospace" font-size="20" font-weight="700" fill="#E04A4A">10:00</text>
    ${GROUND("#2B2233")}<rect x="150" y="112" width="18" height="78" rx="4" fill="#6B4A32"/><rect x="160" y="150" width="330" height="40" rx="6" fill="#3E7C8E"/><rect x="170" y="132" width="64" height="24" rx="8" fill="#ECE2D0"/>
    ${person(260, 178, mk(LEO, WORRY(LEO.skin), EYES(LEO.skin, 2, 0), ARM(LEO, 28, -50)))}<rect x="206" y="156" width="284" height="34" rx="6" fill="#34466B"/>
    <circle cx="262" cy="110" r="30" fill="#C9B6F0" opacity=".16"/>${HELD(290, 128, true)}
    <path d="M380 150 L414 146 L414 158 L380 160 Z" fill="#FFFDF8"/><path d="M414 146 L448 150 L448 160 L414 158 Z" fill="#ECE2D0"/>`,
  truth: () => `${SKY("#E9DDCB", "#ECE2D0")}
    ${[[20, 18], [98, 18], [20, 116], [98, 116], [382, 18], [460, 18], [382, 116], [460, 116]].map(([x, y]) => FM(x, y, 60, 88, 3)).join("")}
    <rect x="182" y="30" width="176" height="164" rx="4" fill="#FFFDF8" stroke="#D9CBBE"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="182" cy="${44 + i * 22}" r="4" fill="none" stroke="#8E7E72" stroke-width="2"/>`).join("")}
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="196" y="${60 + i * 22}" width="148" height="1.5" fill="#D9E4EA"/>`).join("")}
    <text x="272" y="100" text-anchor="middle" font-family="Georgia,serif" font-size="21" font-style="italic" fill="#34466B">My future?</text><text x="272" y="140" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="700" fill="#6D2E46">I decide.</text>`,
  grade: () => `${SKY("#E9DDCB", "#E9DDCB")}${GROUND("#C9B8A2")}${PAPER(330, 110, "8.5", 6)}
    ${person(130, 208, mk(LEO, LAUGH(LEO.skin), ARM(LEO, 32, -72)))}${HELD(164, 132, false)}
    <path d="M186 118 l6 -12 l6 12 l12 6 l-12 6 l-6 12 l-6 -12 l-12 -6 Z" fill="#F3D36B"/>
    <text x="440" y="60" font-size="24">🎉</text>`,
  grade_bad: () => `${SKY("#E9DDCB", "#E9DDCB")}${GROUND("#C9B8A2")}
    ${person(200, 208, mk(LEO, SAD(LEO.skin), EYES(LEO.skin, 0, 3), ARM(LEO, 36, -40)))}${PAPER(270, 118, "3.0", -4)}
    ${person(400, 208, mk(NANDO, FLAT(NANDO.skin), EYES(NANDO.skin, -2, 0)))}`,
  friends_apart: () => `${SKY("#E9DDCB", "#E9DDCB")}
    ${Array.from({ length: 14 }, (_, i) => `<rect x="${i * 40 + 2}" y="36" width="36" height="150" fill="${i % 2 ? "#A8B2B4" : "#B6BFC0"}"/><rect x="${i * 40 + 10}" y="50" width="20" height="3" fill="#7E898C"/><rect x="${i * 40 + 10}" y="58" width="20" height="3" fill="#7E898C"/><circle cx="${i * 40 + 30}" cy="112" r="2" fill="#7E898C"/>`).join("")}
    ${GROUND("#C9B8A2")}${person(420, 196, at(mk(NANDO, BACK(NANDO)), .8))}
    ${person(140, 208, mk(LEO, SAD(LEO.skin), ARM(LEO, 26, -40)))}${HELD(166, 166, false)}`
};
})();
