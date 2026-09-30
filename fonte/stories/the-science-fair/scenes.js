/* Ilustrações de "The Science Fair".
   Usa os ajudantes genéricos do template: person(), SKY(), GROUND().
   Cada cena é uma função que devolve o conteúdo de um SVG 540 x 220.
   O robô Bolt tem sempre a mesma cara: azul, com antena vermelha. */
SCENE_LIB["the-science-fair"] = (() => {
const MAYA = { skin: "#8D5B3E", hair: "#1F130F", shirt: "#3E7C8E", style: "curly" };
const THEO = { skin: "#E3B08C", hair: "#C08A2E", shirt: "#6D2E46", style: "short" };
const GLASSES = '<circle cx="-5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/><circle cx="5" cy="-68" r="5" fill="none" stroke="#2B1721" stroke-width="1.5"/>';
const RITA = { skin: "#C88A5E", hair: "#2B1B16", shirt: "#FFFDF8", style: "bun", extra: GLASSES };
const BENTO = { skin: "#9A6546", hair: "#D9CBBE", shirt: "#8E6A55", style: "bald", extra: GLASSES };
const CAIQUE = { skin: "#E3B08C", hair: "#5A3A22", shirt: "#5D8963", style: "cap" };
const JUDGE = (skin, shirt, style) => ({ skin, hair: "#7E6A60", shirt, style, s: .85, extra: '<rect x="8" y="-38" width="16" height="20" fill="#FFFDF8" stroke="#8E7E72"/>' });
const at = (o, s) => Object.assign({}, o, { s });
// o robô: y = linha das rodas
const BOLT = (x, y, s, on) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-3" y="-78" width="6" height="12" fill="#8E7E72"/><circle cx="0" cy="-80" r="5" fill="${on ? "#E04A4A" : "#8E7E72"}"/>
  <rect x="-22" y="-66" width="44" height="30" rx="6" fill="#3E7CE0"/><circle cx="-9" cy="-52" r="5" fill="${on ? "#FFF3B0" : "#2B1721"}"/><circle cx="9" cy="-52" r="5" fill="${on ? "#FFF3B0" : "#2B1721"}"/>
  <rect x="-28" y="-34" width="56" height="28" rx="6" fill="#34466B"/><rect x="-42" y="-30" width="14" height="6" rx="3" fill="#8E7E72"/><rect x="28" y="-30" width="14" height="6" rx="3" fill="#8E7E72"/>
  <circle cx="-16" cy="-4" r="7" fill="#2B1721"/><circle cx="16" cy="-4" r="7" fill="#2B1721"/></g>`;
const SMOKE = (x, y) => [0, 1, 2].map(i => `<circle cx="${x + i * 9}" cy="${y - i * 16}" r="${7 + i * 4}" fill="#B9B0A6" opacity=".7"/>`).join("");
const TABLE = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="10" fill="#8E6A55"/><rect x="${x + 10}" y="${y + 10}" width="8" height="${190 - y}" fill="#6B4A32"/><rect x="${x + w - 18}" y="${y + 10}" width="8" height="${190 - y}" fill="#6B4A32"/>`;
const BANNER = t => `<rect x="90" y="14" width="360" height="30" rx="4" fill="#6D2E46"/><text x="270" y="35" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#FFFDF8" letter-spacing="2">${t}</text>`;
const GYM = () => `${SKY("#E9DDCB", "#ECE2D0")}${BANNER("IFAL SCIENCE FAIR")}${GROUND("#C9A98A")}`;
const CLOCK = (x, y, r, h, m) => { const a = (v, t) => (v / t) * 2 * Math.PI - Math.PI / 2;
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFDF8" stroke="#2B1721" stroke-width="4"/>
  <line x1="${x}" y1="${y}" x2="${x + Math.cos(a(h % 12 + m / 60, 12)) * r * .5}" y2="${y + Math.sin(a(h % 12 + m / 60, 12)) * r * .5}" stroke="#2B1721" stroke-width="4" stroke-linecap="round"/>
  <line x1="${x}" y1="${y}" x2="${x + Math.cos(a(m, 60)) * r * .8}" y2="${y + Math.sin(a(m, 60)) * r * .8}" stroke="#6D2E46" stroke-width="3" stroke-linecap="round"/>`; };

return {
  robot: () => `${SKY("#E9DDCB", "#ECE2D0")}${TABLE(150, 150, 240)}${BOLT(270, 150, 1.1, false)}${SMOKE(292, 64)}${person(95, 205, MAYA)}${person(445, 205, THEO)}`,
  night: () => `${SKY("#1F2A44", "#34466B")}<circle cx="470" cy="46" r="20" fill="#F3E9D2"/><rect x="385" y="20" width="130" height="90" fill="none" stroke="#8E7E72" stroke-width="6"/>
    ${TABLE(120, 145, 290)}${BOLT(240, 145, .85, true)}<rect x="330" y="128" width="42" height="17" rx="4" fill="#E04A4A"/><circle cx="339" cy="146" r="4" fill="#2B1721"/><circle cx="363" cy="146" r="4" fill="#2B1721"/>
    ${GROUND("#2B2233")}${person(80, 205, MAYA)}${person(460, 205, THEO)}`,
  lab: () => `${SKY("#E9DDCB", "#E9DDCB")}<rect x="140" y="18" width="260" height="84" rx="4" fill="#3E5A4A" stroke="#8E6A55" stroke-width="6"/>
    <text x="270" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#ECE2D0">1. market</text><text x="270" y="80" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#ECE2D0">2. Seu Bento</text>
    ${TABLE(150, 150, 240)}${BOLT(220, 150, .85, false)}${person(330, 150, at(RITA, .9))}${person(75, 205, at(MAYA, .9))}${person(475, 205, at(THEO, .9))}`,
  market: () => `${SKY("#F2B880", "#E9DDCB")}${[40, 200, 360].map((x, i) => `<rect x="${x}" y="40" width="140" height="18" fill="${["#E04A4A", "#3E7CE0", "#C08A2E"][i]}"/>
    <path d="${Array.from({ length: 7 }, (_, k) => `M${x + k * 20} 58 q10 10 20 0`).join(" ")}" fill="${["#E04A4A", "#3E7CE0", "#C08A2E"][i]}"/><rect x="${x + 6}" y="66" width="128" height="70" fill="#FFFDF8" opacity=".6"/>`).join("")}
    ${[0, 1, 2, 3].map(k => `<circle cx="${230 + k * 22}" cy="98" r="8" fill="#8E7E72"/><rect x="${226 + k * 22}" y="90" width="8" height="16" fill="#5A4A40"/>`).join("")}
    ${GROUND("#C9B8A2")}${person(270, 200, { skin: "#B97A55", hair: "#2B1B16", shirt: "#E9DDCB", style: "short", s: .9 })}${person(90, 205, MAYA)}${person(450, 205, THEO)}`,
  shop: () => `${SKY("#E9DDCB", "#E9DDCB")}${[80, 170, 260, 350, 440].map((x, i) => CLOCK(x, 50, 20, 8 + i, i * 11)).join("")}
    <rect x="130" y="130" width="280" height="60" fill="#8E6A55"/><rect x="130" y="126" width="280" height="8" fill="#6B4A32"/>
    ${person(270, 130, at(BENTO, .9))}${BOLT(360, 126, .7, true)}${person(70, 205, MAYA)}${person(480, 205, THEO)}`,
  wash: () => `${SKY("#BFD6E0", "#E9F1F4")}${GROUND("#B9B0A6")}
    <rect x="160" y="120" width="220" height="56" rx="16" fill="#C08A2E"/><path d="M200 120 Q220 88 260 86 L310 86 Q340 88 350 120 Z" fill="#C08A2E"/><rect x="226" y="94" width="40" height="24" rx="4" fill="#BFD6E0"/><rect x="276" y="94" width="40" height="24" rx="4" fill="#BFD6E0"/>
    <circle cx="210" cy="178" r="16" fill="#2B1721"/><circle cx="330" cy="178" r="16" fill="#2B1721"/>
    ${[0, 1, 2, 3, 4].map(k => `<circle cx="${190 + k * 40}" cy="${112 - (k % 2) * 16}" r="${6 + k % 3 * 2}" fill="#FFFDF8" stroke="#BFD6E0"/>`).join("")}
    <path d="M430 196 L440 166 L470 166 L480 196 Z" fill="#3E7CE0"/>${person(110, 205, MAYA)}${person(430, 205, at(THEO, .95))}${person(500, 205, at(CAIQUE, .9))}`,
  fair: () => `${GYM()}${TABLE(170, 140, 200)}<rect x="190" y="70" width="70" height="62" fill="#FFFDF8" stroke="#D9CBBE"/><text x="225" y="104" text-anchor="middle" font-size="22">🤖</text>
    ${BOLT(310, 140, .75, true)}${person(90, 200, at(MAYA, .9))}${person(140, 200, at(THEO, .9))}
    ${person(410, 200, JUDGE("#C88A5E", "#34466B", "short"))}${person(455, 200, JUDGE("#E3B08C", "#A26769", "bun"))}${person(500, 200, JUDGE("#6E4630", "#5D8963", "bald"))}`,
  prize: () => `${GYM()}${[...Array(22)].map((_, k) => `<rect x="${(k * 53) % 520 + 10}" y="${50 + (k * 37) % 90}" width="6" height="10" fill="${["#E04A4A", "#3E7CE0", "#E0AE55", "#5D8963"][k % 4]}" transform="rotate(${k * 29} ${(k * 53) % 520 + 13} ${55 + (k * 37) % 90})"/>`).join("")}
    <path d="M250 110 L290 110 L284 150 L256 150 Z" fill="#E0AE55"/><rect x="262" y="150" width="16" height="16" fill="#E0AE55"/><rect x="246" y="166" width="48" height="10" rx="3" fill="#C08A2E"/>
    ${BOLT(370, 190, .8, true)}${person(170, 200, MAYA)}${person(215, 200, THEO)}`,
  clock: () => `${SKY("#E9DDCB", "#ECE2D0")}${BANNER("IFAL SCIENCE FAIR")}${CLOCK(270, 100, 42, 10, 15)}${GROUND("#C9A98A")}
    ${TABLE(40, 150, 110)}${TABLE(390, 150, 110)}${person(210, 205, MAYA)}${person(330, 205, THEO)}${BOLT(270, 205, .6, true)}`
};
})();
