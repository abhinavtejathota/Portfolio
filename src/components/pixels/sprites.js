const C = {
  skin: "#f4c49c",
  hair: "#2d1b0e",
  shirt: "#00f5ff",
  shirtAlt: "#39ff14",
  pants: "#1a1a2e",
  shoes: "#444",
  eye: "#111",
  metal: "#aab",
  glow: "#ffe600",
  white: "#fff",
  red: "#ff4444",
  purple: "#b388ff",
  orange: "#ff6b2b",
  pink: "#ff00aa",
  dark: "#16162a",
};

function frame(rows) {
  return rows.map((row) => row.split("").map((ch) => palette[ch] ?? null));
}

const palette = {
  ".": null,
  H: C.hair,
  S: C.skin,
  E: C.eye,
  T: C.shirt,
  G: C.shirtAlt,
  P: C.pants,
  O: C.shoes,
  M: C.metal,
  Y: C.glow,
  W: C.white,
  R: C.red,
  U: C.purple,
  A: C.orange,
  B: "#e8f4ff",
  K: C.pink,
  D: C.dark,
};

const devIdle = frame([
  "......HHHH......",
  ".....HHHHHH.....",
  ".....HSEESH.....",
  ".....HSEESH.....",
  "......SSSS......",
  "....TTTTTTTT....",
  "....TTTTTTTT....",
  "...STTTTTTTTS...",
  "...STTTTTTTTS...",
  "....PP....PP....",
  "....PP....PP....",
  "....OO....OO....",
]);

const devJump = frame([
  "......HHHH......",
  ".....HHHHHH.....",
  ".....HSEESH.....",
  ".....HSEESH.....",
  "......SSSS......",
  "....TTTTTTTT....",
  "...STTTTTTTTS...",
  "....PP....PP....",
  "....PP....PP....",
  "....OO....OO....",
  "................",
  "................",
]);

const botIdle = frame([
  "....MMMMMMMM....",
  "...MYYYYYYYYM...",
  "...MYE....EYM...",
  "...MYE....EYM...",
  "...MYYYYYYYYM...",
  "....MMMMMMMM....",
  "...MMMMMMMMMM...",
  "..MMMMMMMMMMMM..",
  "..MM......MM....",
  "..MM......MM....",
  "..OO......OO....",
  "..OO......OO....",
]);

const botWalk1 = frame([
  "....MMMMMMMM....",
  "...MYYYYYYYYM...",
  "...MYE....EYM...",
  "...MYYYYYYYYM...",
  "....MMMMMMMM....",
  "...MMMMMMMMMM...",
  "..MMMMMMMMMMMM..",
  "..MM......MM....",
  "..MM......MM....",
  "..OO......OO....",
  "................",
  "..OO......OO....",
]);

const explorerIdle = frame([
  "......HHHH......",
  ".....HHHHHH.....",
  ".....HSEESH.....",
  ".....HSEESH.....",
  "......SSSS......",
  "....GGGGGGGG....",
  "...SGGGGGGGGS...",
  "...SGGGGGGGGS...",
  "....PP....PP....",
  "...PPP....PPP...",
  "...OO.....OO....",
  "................",
]);

const explorerWalk = frame([
  "......HHHH......",
  ".....HHHHHH.....",
  ".....HSEESH.....",
  "......SSSS......",
  "....GGGGGGGG....",
  "...SGGGGGGGGS...",
  "....PP....PP....",
  "...PPP....PPP...",
  "...OO.....OO....",
  "................",
  "..OO........OO..",
  "................",
]);

const internIdle = frame([
  "......HHHH......",
  ".....HHHHHH.....",
  ".....HSEESH.....",
  "......SSSS......",
  "....AAAAAAAA....",
  "...SAAAAAAAAS...",
  "...SAAWWWWAAS...",
  "....PP....PP....",
  "....PP....PP....",
  "....OO....OO....",
  "................",
  "................",
]);

const scholarIdle = frame([
  "....UUUUUUUU....",
  ".....HHHHHH.....",
  ".....HSEESH.....",
  ".....HSEESH.....",
  "......SSSS......",
  "....TTTTTTTT....",
  "...STTTTTTTTS...",
  "....PP....PP....",
  "....PP....PP....",
  "....OO....OO....",
  "................",
  "................",
]);

const trophyIdle = frame([
  "................",
  "...YYYYYYYYYY...",
  "..YYYYYYYYYYYY..",
  "..YYYYYYYYYYYY..",
  "...YYYYYYYYYY...",
  "....YYYYYYYY....",
  ".....YYYYYY.....",
  "......YYYY......",
  "......YYYY......",
  ".....DDDDDD.....",
  "....DDDDDDDD....",
  "................",
]);

const mailIdle = frame([
  "................",
  "..WWWWWWWWWWWW..",
  ".WWWWWWWWWWWWWW.",
  ".WWWWWWWWWWWWWW.",
  "..WWWWWWWWWWWW..",
  "...WWWWWWWWWW...",
  "....WWWWWWWW....",
  ".....WWWWWW.....",
  "......WWWW......",
  "................",
  "................",
  "................",
]);

const contactIdle = frame([
  "....BBBBBBBB....",
  "...BBBBBBBBBB...",
  "...BBBBBBBBBB...",
  "....BBBBBBBB....",
  "......SSSS......",
  ".....HSEESH.....",
  ".....HSEESH.....",
  "......SSSS......",
  "....KKKKKKKK....",
  "...SKKKKKKKKS...",
  "....PP....PP....",
  "....OO....OO....",
]);

const contactJump = frame([
  "....BBBBBBBB....",
  "...BBBBBBBBBB...",
  "...BBBBBBBBBB...",
  "......SSSS......",
  ".....HSEESH.....",
  ".....HSEESH.....",
  "....KKKKKKKK....",
  "...SKKKKKKKKS...",
  "....PP....PP....",
  "....OO....OO....",
  "................",
  "................",
]);

const guideStar = frame([
  "................",
  ".......Y........",
  "......YYY.......",
  ".....YYYYY......",
  "....YYYYYYY.....",
  ".....YYYYY......",
  "......YYY.......",
  ".......Y........",
  "................",
  "................",
  "................",
  "................",
]);

export const SPRITES = {
  dev: { idle: devIdle, jump: devJump, walk: devIdle },
  bot: { idle: botIdle, jump: botIdle, walk: botWalk1 },
  explorer: { idle: explorerIdle, jump: explorerIdle, walk: explorerWalk },
  intern: { idle: internIdle, jump: internIdle, walk: internIdle },
  scholar: { idle: scholarIdle, jump: scholarIdle, walk: scholarIdle },
  trophy: { idle: trophyIdle, jump: trophyIdle, walk: trophyIdle },
  mail: { idle: mailIdle, jump: mailIdle, walk: mailIdle },
  contact: { idle: contactIdle, jump: contactJump, walk: contactIdle },
  guide: { idle: guideStar, jump: guideStar, walk: guideStar },
};

export const PIXEL_SIZE = 3;
