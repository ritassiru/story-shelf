/* Ilustrações de "Who Posted It?".
   Usa os ajudantes genéricos do template: person(), SKY(), GROUND().
   Cada cena é uma função que devolve o conteúdo de um SVG 540 x 220.
   Lia e Davi têm as mesmas cores de "The Phone on the Bus". */
SCENE_LIB["who-posted-it"] = (() => {
const LIA = { skin: "#C88A5E", hair: "#2B1B16", shirt: "#6D2E46", style: "long" };
const DAVI = { skin: "#8D5B3E", hair: "#1F130F", shirt: "#3E7C8E", style: "short" };
const PEDRO = { skin: "#A86B48", hair: "#1F130F", shirt: "#E0AE55", style: "short",
  extra: '<rect x="-20" y="-30" width="40" height="7" fill="#5D8963"/><text x="0" y="-7" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#2B1721">10</text>' };
const CHITA = [[-10, -36], [7, -31], [-3, -21], [11, -13], [-12, -9], [3, -41]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#F3D36B"/><circle cx="${x}" cy="${y}" r="1.3" fill="#FFFDF8"/>`).join("");
const MARIANA = { skin: "#D9A57E", hair: "#3A2418", shirt: "#B5483A", style: "bun", extra: CHITA };
const CAIO = { skin: "#E3B08C", hair: "#34466B", shirt: "#5D8963", style: "cap" };
const SONIA = { skin: "#B97A55", hair: "#A8A09A", shirt: "#34466B", style: "bun",
  extra: '<circle cx="-5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/><circle cx="5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/>' };

// variações de um personagem: mk(DAVI, SAD(DAVI.skin), ...) acrescenta desenhos ao "extra"
const mk = (o, ...ex) => Object.assign({}, o, { extra: (o.extra || "") + ex.join("") });
const at = (o, s) => Object.assign({}, o, { s });
const MOUTH = sk => `<rect x="-6" y="-64" width="12" height="8" fill="${sk}"/>`;
const SAD = sk => MOUTH(sk) + '<path d="M-4 -58 Q0 -62 4 -58" stroke="#5A2A2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
const LAUGH = sk => MOUTH(sk) + '<path d="M-5 -62 Q0 -53 5 -62 Z" fill="#5A2A2A"/>';
const WORRY = sk => MOUTH(sk) + '<path d="M-5 -59 q2.5 -2.5 5 0 q2.5 2.5 5 0" stroke="#5A2A2A" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
const ANGRY = sk => SAD(sk) + '<path d="M-9 -76 L-2 -73 M9 -76 L2 -73" stroke="#2B1721" stroke-width="2" stroke-linecap="round"/>';
const SWEAT = '<path d="M15 -82 q4 6 0 9 q-4 -3 0 -9 Z" fill="#9FD3E6"/>';
const ARM = (o, x2, y2, left) => `<path d="M${left ? -14 : 14} -36 L${x2} ${y2}" stroke="${o.shirt}" stroke-width="9" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="5" fill="${o.skin}"/>`;
const HAT = '<path d="M-24 -80 Q0 -87 24 -80 Q0 -74 -24 -80 Z" fill="#E0C27A"/><path d="M-11 -81 Q-10 -98 0 -98 Q10 -98 11 -81 Z" fill="#E0C27A"/><rect x="-11" y="-86" width="22" height="3" fill="#B5483A"/>';
const SKIRT = c => `<path d="M-20 -18 L-33 6 L33 6 L20 -18 Z" fill="${c}"/>` + [[-18, -2], [0, -8], [16, 0], [-6, 2]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#F3D36B"/>`).join("");
const HELD = (x, y) => `<rect x="${x - 6}" y="${y - 10}" width="12" height="20" rx="2.5" fill="#2B1721"/><rect x="${x - 4.5}" y="${y - 8}" width="9" height="14" rx="1" fill="#9FD3E6"/>`;

const PHONE = (x, y, glow) => `<g transform="translate(${x} ${y})">${glow ? '<circle r="18" fill="#FFF3B0" opacity=".5"/>' : ""}<rect x="-6" y="-10" width="12" height="20" rx="2.5" fill="#2B1721"/><rect x="-4.5" y="-8" width="9" height="14" rx="1" fill="#9FD3E6"/></g>`;
const FLAGS = ["#E0AE55", "#6D2E46", "#3E7C8E", "#A26769", "#5D8963", "#FFFDF8"];
const BUNT = pts => {  // bandeirinhas ao longo de uma corda (lista de pontos [x, y])
  let s = `<polyline points="${pts.map(p => p.join(",")).join(" ")}" fill="none" stroke="#6B4A32" stroke-width="1.5"/>`, k = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], n = Math.max(1, Math.floor(Math.hypot(x2 - x1, y2 - y1) / 24)), a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    for (let j = 0; j < n; j++) {
      const t = (j + .5) / n;
      s += `<path transform="translate(${(x1 + (x2 - x1) * t).toFixed(1)} ${(y1 + (y2 - y1) * t).toFixed(1)}) rotate(${a.toFixed(1)})" d="M-8 0 L8 0 L0 14 Z" fill="${FLAGS[k++ % FLAGS.length]}"/>`;
    }
  }
  return s;
};
const ROPE = y => [[0, y], [90, y + 14], [180, y + 20], [270, y + 14], [360, y + 20], [450, y + 14], [540, y]];
const ARROW = (x1, y1, x2, y2, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="3" stroke-linecap="round"/><path transform="translate(${x2} ${y2}) rotate(${(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI).toFixed(1)})" d="M2 0 L-10 -7 L-10 7 Z" fill="${c}"/>`;
const STAND = (x, open) => `<g transform="translate(${x} 0)"><rect x="0" y="92" width="6" height="98" fill="#6B4A32"/><rect x="98" y="92" width="6" height="98" fill="#6B4A32"/>
  ${[0, 1, 2, 3, 4].map(i => `<rect x="${i * 20.8}" y="78" width="20.8" height="18" fill="${i % 2 ? "#FFFDF8" : "#B5483A"}"/><path d="M${i * 20.8} 96 L${i * 20.8 + 20.8} 96 L${i * 20.8 + 10.4} 106 Z" fill="${i % 2 ? "#FFFDF8" : "#B5483A"}"/>`).join("")}
  <rect x="-4" y="140" width="112" height="50" fill="#8E6A55"/>
  ${open ? `<circle cx="52" cy="116" r="9" fill="#F3D36B"/><circle cx="52" cy="116" r="18" fill="#F3D36B" opacity=".25"/>${[20, 38, 66, 84].map(c => `<ellipse cx="${c}" cy="134" rx="5" ry="9" fill="#E0AE55"/>`).join("")}`
    : `<rect x="4" y="104" width="96" height="36" fill="#5A4A42"/><text x="52" y="128" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ECE2D0">CLOSED</text>`}</g>`;
const FIRE = (x, s) => `<g transform="translate(${x} 192) scale(${s})"><circle cy="-30" r="54" fill="#F2B880" opacity=".25"/>
  <rect x="-30" y="-10" width="60" height="10" rx="4" fill="#6B4A32" transform="rotate(12)"/><rect x="-30" y="-10" width="60" height="10" rx="4" fill="#5A3A2E" transform="rotate(-12)"/>
  <path d="M-22 -6 Q-28 -32 -8 -46 Q-10 -30 0 -26 Q-2 -52 12 -64 Q12 -38 22 -32 Q28 -18 22 -6 Z" fill="#E0703A"/><path d="M-12 -6 Q-14 -24 -2 -32 Q0 -20 6 -18 Q8 -32 14 -36 Q18 -18 12 -6 Z" fill="#F3D36B"/></g>`;
const CHAIR = x => `<g transform="translate(${x} 190)"><rect x="-12" y="-46" width="24" height="22" rx="3" fill="#A98468"/><rect x="-13" y="-24" width="26" height="5" fill="#8E6A55"/><rect x="-12" y="-19" width="4" height="19" fill="#8E6A55"/><rect x="8" y="-19" width="4" height="19" fill="#8E6A55"/></g>`;
const STARS = [[40, 20], [120, 44], [200, 16], [330, 30], [420, 14], [500, 46], [270, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#F3E9D2"/>`).join("");
const NIGHT = () => `${SKY("#1F2A44", "#4A3A5C")}${STARS}`;
const PARTY = full => `${NIGHT()}${BUNT(ROPE(22))}${BUNT(ROPE(54).map(([x, y]) => [x, y - 6]))}
  ${STAND(18, true)}${STAND(418, full)}${GROUND("#6B5344")}${FIRE(270, full ? 1 : .6)}`;

return {
  phone_night: () => `${SKY("#1F2A44", "#2B3556")}<rect x="380" y="18" width="130" height="92" fill="#34466B" stroke="#8E7E72" stroke-width="6"/><circle cx="470" cy="50" r="16" fill="#F3E9D2"/>
    <rect x="30" y="112" width="18" height="78" rx="4" fill="#6B4A32"/><rect x="40" y="150" width="300" height="40" rx="6" fill="#3E7C8E"/><rect x="50" y="132" width="64" height="24" rx="8" fill="#ECE2D0"/>
    ${GROUND("#2B2233")}${person(150, 178, mk(DAVI, WORRY(DAVI.skin), ARM(DAVI, 30, -46)))}<rect x="96" y="156" width="244" height="34" rx="6" fill="#6D2E46"/>
    <circle cx="150" cy="112" r="30" fill="#FFF3B0" opacity=".15"/>${PHONE(182, 130, true)}
    <rect x="200" y="84" width="54" height="28" rx="10" fill="#FFFDF8"/><text x="227" y="104" text-anchor="middle" font-size="16">😢</text>
    <rect x="236" y="44" width="124" height="30" rx="10" fill="#FFFDF8"/><text x="298" y="65" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#6D2E46">CANCELLED?</text>
    <rect x="290" y="94" width="54" height="28" rx="10" fill="#FFFDF8"/><text x="317" y="114" text-anchor="middle" font-size="16">😭</text>
    <rect x="186" y="12" width="46" height="26" rx="10" fill="#FFFDF8"/><text x="209" y="31" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#A26769">!!!</text>`,
  hall: () => `${SKY("#F6E7C8", "#E9DDCB")}<rect x="0" y="60" width="540" height="130" fill="#D9CBBE"/>${[30, 150, 270, 390].map(x => `<rect x="${x}" y="78" width="80" height="50" rx="4" fill="#BFD6E0"/>`).join("")}
    ${BUNT([[0, 22], [90, 34], [180, 40], [260, 34]])}${BUNT([[260, 34], [300, 110], [312, 176]])}${BUNT([[400, 30], [470, 36], [540, 24]])}
    ${GROUND("#C9B8A2")}
    ${person(80, 204, at(mk(LIA, SAD(LIA.skin)), .85))}${person(135, 204, at(mk({ skin: "#E3B08C", hair: "#5A3A22", shirt: "#34466B", style: "curly" }, SAD("#E3B08C")), .85))}
    ${person(190, 204, at(mk(DAVI, WORRY(DAVI.skin)), .85))}${person(450, 204, mk(PEDRO, LAUGH(PEDRO.skin)))}
    <text x="400" y="100" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#6D2E46">HA HA!</text>`,
  office: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="400" y="24" width="110" height="70" fill="#BFD6E0" stroke="#FFFDF8" stroke-width="6"/>
    <rect x="30" y="22" width="112" height="96" fill="#FFFDF8" stroke="#D9CBBE"/><rect x="30" y="22" width="112" height="22" fill="#B5483A"/><text x="86" y="38" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#FFFDF8">JUNE</text>
    ${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4, 5, 6].map(c => `<rect x="${37 + c * 14.5}" y="${52 + r * 16}" width="10" height="10" fill="${c === 6 ? "#E9DDCB" : "#D9CBBE"}"/>`).join("")).join("")}
    <circle cx="124" cy="89" r="10" fill="none" stroke="#B5483A" stroke-width="2.5"/>
    ${person(340, 132, mk(SONIA, WORRY(SONIA.skin), ARM(SONIA, 16, -62), '<rect x="10" y="-80" width="9" height="17" rx="2" fill="#2B1721"/><path d="M26 -86 q6 6 0 12 M32 -91 q10 11 0 22" stroke="#B5483A" fill="none" stroke-width="2" stroke-linecap="round"/>'))}
    <rect x="220" y="130" width="280" height="18" fill="#8E6A55"/><rect x="236" y="148" width="14" height="44" fill="#6B4A32"/><rect x="470" y="148" width="14" height="44" fill="#6B4A32"/>
    ${GROUND("#C9B8A2")}${person(150, 212, mk(DAVI, ARM(DAVI, 30, -44)))}${HELD(180, 162)}`,
  clues: () => `${SKY("#E9DDCB", "#ECE2D0")}
    <path d="M140 16 L153 8 L166 16 L179 8 L192 16 L205 8 L218 16 L231 8 L244 16 L257 8 L270 16 L283 8 L296 16 L309 8 L322 16 L335 8 L348 16 L361 8 L374 16 L387 8 L400 16 L400 210 L140 210 Z" fill="#FFFDF8" stroke="#D9CBBE"/>
    <rect x="140" y="16" width="260" height="42" fill="#3E7C8E"/><circle cx="236" cy="38" r="32" fill="#FFF3B0" fill-opacity=".25" stroke="#6D2E46" stroke-width="6"/><text x="170" y="44" font-family="sans-serif" font-size="18" font-weight="700" fill="#FFFDF8">...ha IFAL 🌽</text>
    <rect x="158" y="76" width="224" height="72" rx="12" fill="#DCEFD6"/><text x="174" y="110" font-family="sans-serif" font-size="17" font-weight="700" fill="#2B1721">...is cancelled 😢</text>
    <rect x="296" y="124" width="76" height="20" rx="4" fill="#F3D36B"/><text x="366" y="139" text-anchor="end" font-family="sans-serif" font-size="14" fill="#2B1721">7:12 p.m.</text>
    <text x="170" y="186" font-family="sans-serif" font-size="16" fill="#A26769">Date: ???</text>
    <path d="M213 61 L190 84" stroke="#6B4A32" stroke-width="10" stroke-linecap="round"/>
    <text x="70" y="104" text-anchor="middle" font-size="38">⚽</text><text x="70" y="140" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#2B1721">Pedro</text><text x="70" y="160" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2B1721">7:12 p.m.</text>
    <text x="470" y="96" text-anchor="middle" font-family="Georgia,serif" font-size="46" font-weight="700" fill="#6D2E46">?</text><text x="470" y="140" text-anchor="middle" font-family="Georgia,serif" font-size="20" font-style="italic" fill="#6D2E46">Who?</text>`,
  chatwar: () => `${SKY("#E9C4B0", "#E9DDCB")}<rect x="190" y="6" width="160" height="208" rx="18" fill="#2B1721"/><rect x="200" y="20" width="140" height="180" rx="6" fill="#FFFDF8"/>
    ${[0, 1, 2, 3, 4, 5].map(i => { const l = i % 2 === 0, y = 28 + i * 28; return `<rect x="${l ? 206 : 250}" y="${y}" width="84" height="22" rx="8" fill="${l ? "#D9CBBE" : "#F2B880"}"/><rect x="${l ? 214 : 258}" y="${y + 8}" width="${i % 3 ? 44 : 34}" height="6" rx="3" fill="#8E7E72"/><text x="${l ? 282 : 326}" y="${y + 16}" text-anchor="end" font-size="13">${["😡", "😠", "🤬", "😡", "😤", "😡"][i]}</text>`; }).join("")}
    <text x="60" y="60" font-size="30">😡</text><text x="455" y="54" font-size="30">🤬</text><text x="140" y="36" font-size="22">⚡</text><text x="380" y="110" font-size="22">⚡</text>
    ${ARROW(140, 110, 182, 80, "#B5483A")}${ARROW(400, 150, 358, 120, "#B5483A")}${ARROW(182, 160, 140, 140, "#6D2E46")}${ARROW(360, 60, 400, 80, "#6D2E46")}
    ${GROUND("#C9B8A2")}${person(90, 210, mk(DAVI, ANGRY(DAVI.skin), ARM(DAVI, 28, -48)))}${HELD(118, 162)}${person(460, 210, mk(PEDRO, ANGRY(PEDRO.skin), ARM(PEDRO, -28, -48, true)))}${HELD(432, 162)}`,
  library: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="20" y="16" width="500" height="120" fill="#8E6A55"/>
    ${[0, 1, 2].map(r => `<rect x="20" y="${52 + r * 40}" width="500" height="4" fill="#6B4A32"/>` + Array.from({ length: 30 }, (_, i) => `<rect x="${28 + i * 16.4}" y="${24 + r * 40 + (i % 3) * 3}" width="12" height="${28 - (i % 3) * 3}" fill="${["#6D2E46", "#3E7C8E", "#E0AE55", "#5D8963", "#A26769"][(i + r * 2) % 5]}"/>`).join("")).join("")}
    ${GROUND("#C9B8A2")}${person(180, 176, DAVI)}${person(360, 176, LIA)}
    <rect x="110" y="160" width="320" height="14" fill="#6B4A32"/><rect x="130" y="174" width="12" height="18" fill="#5A3A2E"/><rect x="398" y="174" width="12" height="18" fill="#5A3A2E"/>
    <rect x="206" y="104" width="128" height="58" rx="3" fill="#FFFDF8" stroke="#D9CBBE"/><line x1="270" y1="104" x2="270" y2="162" stroke="#D9CBBE"/>
    <text x="238" y="126" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-style="italic" fill="#6D2E46">Who?</text><text x="238" y="148" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-style="italic" fill="#6D2E46">When?</text>
    <text x="302" y="137" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-style="italic" fill="#6D2E46">Where?</text>`,
  dance: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="0" y="0" width="540" height="140" fill="#D9CBBE"/>${BUNT(ROPE(14))}
    <rect x="40" y="46" width="60" height="40" fill="#FFFDF8" stroke="#8E7E72" stroke-width="3"/><path d="M58 86 L62 104 L78 104 L82 86" fill="none" stroke="#B5483A" stroke-width="3"/>
    <rect x="0" y="140" width="540" height="80" fill="#C08A5A"/>${[180, 200].map(y => `<rect x="0" y="${y}" width="540" height="2" fill="#A26E44"/>`).join("")}
    ${person(150, 196, at(mk({ skin: "#9A6546", hair: "#2B1B16", shirt: "#E0AE55", style: "long" }, SKIRT("#3E7C8E"), HAT), .85))}${person(200, 196, at(mk({ skin: "#E3B08C", hair: "#5A3A22", shirt: "#A26769", style: "short" }, HAT), .85))}
    ${person(340, 206, mk(MARIANA, WORRY(MARIANA.skin), SKIRT("#B5483A"), ARM(MARIANA, 34, -50)))}${HELD(374, 156)}
    ${person(440, 206, mk(DAVI, SAD(DAVI.skin)))}`,
  phone_day: () => `${SKY("#BFD6E0", "#E9F1F4")}<rect x="150" y="10" width="240" height="200" rx="16" fill="#2B1721"/><rect x="160" y="22" width="220" height="176" rx="8" fill="#FFFDF8"/>
    <rect x="170" y="32" width="200" height="104" rx="10" fill="#DCEFD6"/>
    ${["Today's REHEARSAL", "is cancelled because", "of the rain.", "The June party is", "on Saturday! 🌽"].map((t, i) => `<text x="182" y="${52 + i * 19}" font-family="sans-serif" font-size="14" ${i === 0 || i > 2 ? 'font-weight="700"' : ""} fill="#2B1721">${t}</text>`).join("")}
    <rect x="176" y="148" width="188" height="36" rx="8" fill="#5D8963"/><text x="270" y="172" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="700" fill="#FFFDF8">NOT CANCELLED ✔</text>
    ${GROUND("#C9B8A2")}${person(55, 208, at(LIA, .9))}${person(110, 208, mk(DAVI, ARM(DAVI, 30, -52)))}${person(460, 208, mk(CAIO, WORRY(CAIO.skin), SWEAT))}`,
  party: () => `${PARTY(true)}
    ${person(170, 200, at(mk(LIA, LAUGH(LIA.skin), ARM(LIA, 26, -40)), .85))}${person(210, 200, at(mk(DAVI, LAUGH(DAVI.skin)), .85))}
    ${person(330, 200, at(mk(MARIANA, SKIRT("#B5483A"), HAT), .85))}${person(372, 200, at(mk({ skin: "#E3B08C", hair: "#5A3A22", shirt: "#34466B", style: "short" }, HAT), .85))}`,
  apology: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="120" y="18" width="300" height="84" rx="4" fill="#3E5A4A" stroke="#8E6A55" stroke-width="6"/>
    <text x="270" y="56" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#ECE2D0">June Party 🌽</text><text x="270" y="84" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#ECE2D0">Saturday</text>
    ${GROUND("#C9B8A2")}${person(220, 186, mk(DAVI, WORRY(DAVI.skin), ARM(DAVI, 46, -30)))}${person(320, 186, mk(PEDRO, ARM(PEDRO, -46, -30, true)))}
    ${[60, 130, 200, 270, 340, 410, 480].map((x, i) => `<g transform="translate(${x} 222)"><rect x="-24" y="-20" width="48" height="24" rx="10" fill="${["#34466B", "#A26769", "#5D8963", "#6D2E46", "#E0AE55", "#3E7C8E", "#8E7E72"][i]}"/><circle cy="-30" r="15" fill="${["#2B1B16", "#5A3A22", "#1F130F", "#3A2418", "#2B1B16", "#7E6A60", "#1F130F"][i]}"/></g>`).join("")}`,
  empty: () => `${PARTY(false)}${[190, 225, 315, 350].map(CHAIR).join("")}
    ${person(146, 204, at(mk(DAVI, SAD(DAVI.skin)), .85))}
    ${person(390, 200, at(mk(MARIANA, SKIRT("#B5483A"), HAT), .75))}${person(350, 200, at(mk({ skin: "#E3B08C", hair: "#5A3A22", shirt: "#34466B", style: "short" }, HAT), .75))}`,
  cancelled: () => `${SKY("#1F2A44", "#34466B")}${STARS}<circle cx="470" cy="40" r="18" fill="#F3E9D2"/>
    <rect x="0" y="90" width="170" height="100" fill="#8E7E72"/><rect x="370" y="90" width="170" height="100" fill="#8E7E72"/><rect x="160" y="62" width="14" height="128" fill="#6B5A50"/><rect x="366" y="62" width="14" height="128" fill="#6B5A50"/>
    <rect x="174" y="72" width="192" height="6" fill="#5A4A42"/>${Array.from({ length: 11 }, (_, i) => `<rect x="${180 + i * 17}" y="72" width="4" height="118" fill="#5A4A42"/>`).join("")}
    <rect x="196" y="96" width="148" height="54" rx="4" fill="#FFFDF8" stroke="#B5483A" stroke-width="3"/><text x="270" y="118" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#B5483A">JUNE PARTY</text><text x="270" y="140" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#B5483A">CANCELLED</text>
    <rect x="60" y="40" width="6" height="150" fill="#5A4A42"/><circle cx="63" cy="40" r="10" fill="#F3D36B"/><circle cx="63" cy="40" r="26" fill="#F3D36B" opacity=".18"/>
    ${GROUND("#2B2233")}${BUNT([[20, 196], [120, 204], [230, 198]])}${person(450, 204, at(mk(DAVI, SAD(DAVI.skin)), .9))}`
};
})();
