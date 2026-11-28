/**
 * 星期、月份、四季：單字與規則說明（西班牙文／義大利文）
 * 每個項目：{ w 標準寫法, zh 中文, alt 其他可接受寫法 }
 */

export const CATEGORIES = [
  { id: 'numbers', label: '數字' },
  { id: 'days', label: '星期' },
  { id: 'months', label: '月份' },
  { id: 'seasons', label: '四季' },
  { id: 'weather', label: '天氣' },
];

const ZH_DAYS = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
const ZH_MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const ZH_SEASONS = ['春天', '夏天', '秋天', '冬天'];

const ZH_WEATHER = ['☀️ 出太陽', '🥵 很熱', '🥶 很冷', '🌬️ 颳風', '😊 天氣好', '🌧️ 天氣不好', '☔ 下雨', '❄️ 下雪', '☁️ 陰天／多雲', '🌫️ 起霧', '⛈️ 雷雨', '🍃 涼爽', '🌀 颱風'];

const zip = (words, zh) => words.map((w, i) => (typeof w === 'string' ? { w, zh: zh[i] } : { ...w, zh: zh[i] }));

export const WORDS = {
  es: {
    days: zip(['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'], ZH_DAYS),
    months: zip(
      ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', { w: 'septiembre', alt: ['setiembre'] }, 'octubre', 'noviembre', 'diciembre'],
      ZH_MONTHS,
    ),
    seasons: zip(
      [
        { w: 'la primavera', alt: ['primavera'], note: '3–5 月' },
        { w: 'el verano', alt: ['verano'], note: '6–8 月' },
        { w: 'el otoño', alt: ['otoño'], note: '9–11 月' },
        { w: 'el invierno', alt: ['invierno'], note: '12–2 月' },
      ],
      ZH_SEASONS,
    ),
    weather: zip(
      [
        'Hace sol.', 'Hace calor.', 'Hace frío.', 'Hace viento.', 'Hace buen tiempo.', 'Hace mal tiempo.',
        { w: 'Llueve.', alt: ['Está lloviendo.'] }, { w: 'Nieva.', alt: ['Está nevando.'] },
        'Está nublado.', 'Hay niebla.', 'Hay tormenta.', 'Hace fresco.', 'Hay un tifón.',
      ],
      ZH_WEATHER,
    ),
  },
  it: {
    days: zip(['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'], ZH_DAYS),
    months: zip(
      ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
      ZH_MONTHS,
    ),
    seasons: zip(
      [
        { w: 'la primavera', alt: ['primavera'], note: '3–5 月' },
        { w: "l'estate", alt: ['estate', 'l’estate'], note: '6–8 月' },
        { w: "l'autunno", alt: ['autunno', 'l’autunno'], note: '9–11 月' },
        { w: "l'inverno", alt: ['inverno', 'l’inverno'], note: '12–2 月' },
      ],
      ZH_SEASONS,
    ),
    weather: zip(
      [
        "C'è il sole.", 'Fa caldo.', 'Fa freddo.', "C'è vento.", 'Fa bel tempo.', 'Fa brutto tempo.',
        { w: 'Piove.', alt: ["C'è la pioggia.", "C'è pioggia."] }, 'Nevica.',
        { w: 'È nuvoloso.', alt: ['Il cielo è nuvoloso.'] }, "C'è la nebbia.", "C'è un temporale.", 'Fa fresco.', "C'è un tifone.",
      ],
      ZH_WEATHER,
    ),
  },
};

/** 規則重點與實用句型（句型可朗讀） */
export const CAL_RULES = {
  es: {
    days: {
      tips: [
        '星期和月份都用小寫開頭：lunes，不是 Lunes。',
        '前面加 el 表示「這個星期幾」：el lunes voy a Madrid（這週一我去馬德里）。',
        '加 los 表示「每個星期幾」：los lunes trabajo（我每週一上班）。',
        'lunes～viernes 單複數同形；sábado、domingo 的複數加 -s：los sábados。',
        '注意重音：miércoles、sábado。',
      ],
      phrases: [
        ['¿Qué día es hoy?', '今天星期幾？'],
        ['Hoy es martes.', '今天星期二。'],
        ['El museo cierra los lunes.', '博物館每週一休館。'],
        ['Abrimos de lunes a viernes.', '我們週一到週五營業。'],
        ['el fin de semana', '週末'],
      ],
    },
    months: {
      tips: [
        '月份小寫：enero、agosto。',
        '「在幾月」用 en：en agosto（在八月）。',
        '日期的說法：el＋日＋de＋月：el quince de agosto（8 月 15 日）。',
        '1 號可以說 el uno 或 el primero：el uno de mayo。',
        'septiembre 也可以寫成 setiembre。',
      ],
      phrases: [
        ['¿Qué fecha es hoy?', '今天幾月幾號？'],
        ['Hoy es el quince de agosto.', '今天是 8 月 15 日。'],
        ['Mi cumpleaños es en marzo.', '我的生日在三月。'],
        ['del uno al diez de julio', '從 7 月 1 日到 10 日'],
      ],
    },
    seasons: {
      tips: [
        '四季要記冠詞：la primavera（陰性），el verano、el otoño、el invierno（陽性）。',
        '「在某個季節」：en primavera、en verano（也可以說 en el verano）。',
        '西班牙在北半球：春 3–5 月、夏 6–8 月、秋 9–11 月、冬 12–2 月。',
        '天氣用 hacer：hace calor（熱）、hace frío（冷）、hace sol（出太陽）。',
      ],
      phrases: [
        ['¿Qué estación te gusta más?', '你最喜歡哪個季節？'],
        ['Me gusta la primavera.', '我喜歡春天。'],
        ['En verano hace mucho calor.', '夏天很熱。'],
        ['En invierno hace frío y nieva.', '冬天很冷，會下雪。'],
      ],
    },
    weather: {
      tips: [
        '問天氣：¿Qué tiempo hace?（天氣怎麼樣？）',
        'hacer＋名詞：hace sol、hace calor、hace frío、hace viento、hace buen／mal tiempo。',
        '「很熱」說 hace mucho calor（calor 是名詞，用 mucho，不說 muy calor）。',
        'estar＋形容詞：está nublado（陰天）；正在下：está lloviendo、está nevando。',
        'hay＋名詞：hay niebla（起霧）、hay tormenta（暴風雨）。',
        'llover、nevar 只用第三人稱單數：llueve（o→ue）、nieva（e→ie）。',
        '溫度：Estamos a veinte grados.／Hace veinte grados.（20 度）',
      ],
      phrases: [
        ['¿Qué tiempo hace hoy?', '今天天氣怎麼樣？'],
        ['¿A cuántos grados estamos?', '現在幾度？'],
        ['Estamos a veinticinco grados.', '現在二十五度。'],
        ['Hace mucho calor.', '非常熱。'],
        ['Mañana va a llover.', '明天會下雨。'],
        ['¿Qué dice el pronóstico?', '天氣預報怎麼說？'],
      ],
    },
  },
  it: {
    days: {
      tips: [
        '星期和月份都用小寫開頭：lunedì，不是 Lunedì。',
        'lunedì～venerdì 的重音在最後：lunedì、martedì…，別忘了寫 ì。',
        '不加冠詞表示「這個星期幾」：lunedì vado a Roma（這週一我去羅馬）。',
        '加冠詞表示「每個星期幾」：il lunedì lavoro（我每週一上班）；domenica 是陰性：la domenica。',
      ],
      phrases: [
        ['Che giorno è oggi?', '今天星期幾？'],
        ['Oggi è martedì.', '今天星期二。'],
        ['Il museo è chiuso il lunedì.', '博物館每週一休館。'],
        ['Siamo aperti dal lunedì al venerdì.', '我們週一到週五營業。'],
        ['il fine settimana', '週末'],
      ],
    },
    months: {
      tips: [
        '月份小寫：gennaio、agosto。',
        '「在幾月」用 a 或 in：a agosto／in agosto（ad agosto 也很常見）。',
        '日期的說法：il＋日＋月，不加 di：il quindici agosto（8 月 15 日）。',
        '1 號要用序數 primo：il primo maggio（5 月 1 日）。',
      ],
      phrases: [
        ['Quanti ne abbiamo oggi?', '今天幾號？'],
        ['Oggi è il quindici agosto.', '今天是 8 月 15 日。'],
        ['Il mio compleanno è a marzo.', '我的生日在三月。'],
        ['dal primo al dieci luglio', '從 7 月 1 日到 10 日'],
      ],
    },
    seasons: {
      tips: [
        "四季要記冠詞：la primavera、l'estate（陰性），l'autunno、l'inverno（陽性）。",
        "「在某個季節」：in primavera、in estate／d'estate、in autunno、in inverno。",
        '義大利在北半球：春 3–5 月、夏 6–8 月、秋 9–11 月、冬 12–2 月。',
        '天氣用 fare：fa caldo（熱）、fa freddo（冷）、fa bel tempo（天氣好）。',
      ],
      phrases: [
        ['Qual è la tua stagione preferita?', '你最喜歡哪個季節？'],
        ['Mi piace la primavera.', '我喜歡春天。'],
        ["D'estate fa molto caldo.", '夏天很熱。'],
        ['In inverno fa freddo e nevica.', '冬天很冷，會下雪。'],
      ],
    },
    weather: {
      tips: [
        '問天氣：Che tempo fa?（課堂筆記）',
        'fare＋形容詞：fa caldo、fa freddo、fa fresco、fa bel／brutto tempo。課堂上說的 «oggi è caldo» 是口語，標準說法是 fa caldo。',
        "c'è＋名詞：c'è il sole、c'è vento、c'è la nebbia、c'è un temporale、c'è un tifone。",
        '形容天空用 essere：è nuvoloso（多雲）、è sereno（晴朗）。',
        "piovere、nevicare 只用第三人稱單數：piove、nevica。課堂筆記：piove = c'è pioggia。",
        '溫度：Quanti gradi ci sono? → Ci sono trenta gradi.（課堂筆記：quanti gradi?）',
      ],
      phrases: [
        ['Che tempo fa oggi?', '今天天氣怎麼樣？'],
        ['Quanti gradi ci sono?', '幾度？'],
        ['Ci sono trenta gradi.', '三十度。'],
        ['Fa molto caldo.', '非常熱。'],
        ['Domani piove.', '明天會下雨。'],
        ['Martedì prossimo arriva un tifone.', '下星期二颱風要來。'],
      ],
    },
  },
};
