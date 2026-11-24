/**
 * 數字 0–999 轉成西班牙文／義大利文的寫法，以及各語言的數字規則說明。
 * toWords(lang, n) 回傳標準寫法；accepted(lang, n) 回傳所有可接受的寫法。
 */

const ES = {
  units: ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'],
  teens: ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'],
  twenties: ['veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'],
  tens: ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'],
  hundreds: ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'],
};

function esBelow100(n) {
  if (n < 10) return ES.units[n];
  if (n < 20) return ES.teens[n - 10];
  if (n < 30) return ES.twenties[n - 20];
  const t = Math.floor(n / 10);
  const u = n % 10;
  return u ? `${ES.tens[t]} y ${ES.units[u]}` : ES.tens[t];
}

function es(n) {
  if (n === 100) return 'cien';
  if (n < 100) return esBelow100(n);
  const h = Math.floor(n / 100);
  const r = n % 100;
  return r ? `${ES.hundreds[h]} ${esBelow100(r)}` : ES.hundreds[h];
}

const IT = {
  units: ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'],
  teens: ['dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'],
  tens: ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'],
};

function itBelow100(n) {
  if (n < 10) return IT.units[n];
  if (n < 20) return IT.teens[n - 10];
  const t = Math.floor(n / 10);
  const u = n % 10;
  if (!u) return IT.tens[t];
  const tens = u === 1 || u === 8 ? IT.tens[t].slice(0, -1) : IT.tens[t]; // ventuno, ventotto
  return tens + IT.units[u];
}

function itRaw(n) {
  if (n < 100) return itBelow100(n);
  const h = Math.floor(n / 100);
  const r = n % 100;
  const head = h === 1 ? 'cento' : `${IT.units[h]}cento`;
  if (!r) return head;
  const tail = itBelow100(r);
  // cento＋otto／ottanta → centotto、centottanta（省略 o）
  return (tail.startsWith('o') ? head.slice(0, -1) : head) + tail;
}

// 複合字結尾的 tre 要加重音：ventitré、centotré
const it = (n) => itRaw(n).replace(/(.)tre$/, '$1tré');

export function toWords(lang, n) {
  return lang === 'it' ? it(n) : es(n);
}

export function accepted(lang, n) {
  const main = toWords(lang, n);
  const list = [main];
  // 義大利文 101、201… 也常寫成 centuno、duecentuno
  if (lang === 'it' && n > 100 && n % 100 === 1) list.push(main.replace(/centouno$/, 'centuno'));
  return [...new Set(list)];
}

export const RANGES = [
  { id: 'units', label: '個位數', sub: '0–9', min: 0, max: 9 },
  { id: 'tens', label: '十位數', sub: '10–99', min: 10, max: 99 },
  { id: 'hundreds', label: '百位數', sub: '100–999', min: 100, max: 999 },
];

/** 規則說明：每個範圍列出重點與例子（例子會自動轉成寫法） */
export const RULES = {
  es: {
    units: { tips: ['0～9 要直接背起來。', '單獨數數時「1」說 uno；放在陽性名詞前變成 un（un café），陰性名詞前用 una（una cerveza）。'], examples: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
    tens: {
      tips: [
        '11～15 是獨立的字：once, doce, trece, catorce, quince。',
        '16～19 寫成一個字：dieci＋個位，注意 dieciséis 有重音。',
        '21～29 也寫成一個字：veinti＋個位，veintidós、veintitrés、veintiséis 有重音。',
        '31 以後用「十位 y 個位」分開寫：treinta y uno、noventa y nueve。',
      ],
      examples: [11, 15, 16, 19, 20, 21, 22, 23, 26, 30, 31, 45, 58, 67, 74, 89, 99],
    },
    hundreds: {
      tips: [
        '剛好 100 說 cien；101～199 用 ciento：ciento uno、ciento cincuenta。',
        '百位直接接後面的數字，中間不加 y：ciento veinte（✗ ciento y veinte）。',
        '要背的不規則：quinientos (500)、setecientos (700)、novecientos (900)。',
        '200～900 會配合名詞的陰陽性：doscientos euros／doscientas personas。',
      ],
      examples: [100, 101, 115, 150, 200, 234, 300, 400, 500, 555, 600, 700, 768, 800, 900, 999],
    },
  },
  it: {
    units: { tips: ['0～9 要直接背起來。', '「1」放在名詞前會變成 un／una：un caffè、una pizza。'], examples: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
    tens: {
      tips: [
        '11～16 以 -dici 結尾：undici…sedici；17～19 以 dici- 開頭：diciassette, diciotto, diciannove。',
        '所有數字都連在一起寫成一個字：trentadue、settantaquattro。',
        '個位是 1 或 8 時，十位的最後一個母音要去掉：ventuno、ventotto、trentuno、quarantotto。',
        '個位是 3 時要加重音：ventitré、trentatré。',
      ],
      examples: [11, 16, 17, 19, 20, 21, 23, 28, 30, 31, 38, 45, 58, 67, 74, 89, 99],
    },
    hundreds: {
      tips: [
        '100 是 cento，200 以上是「個位＋cento」：duecento、trecento…novecento。',
        '整個數字連成一個字：centoventi、trecentoquarantadue。',
        'cento 後面接 otto／ottanta 時省略 o：centotto、centottanta。',
        '結尾是 3 時加重音：centotré、duecentoventitré。',
      ],
      examples: [100, 101, 103, 108, 120, 180, 200, 234, 300, 400, 500, 555, 600, 700, 768, 800, 900, 999],
    },
  },
};
