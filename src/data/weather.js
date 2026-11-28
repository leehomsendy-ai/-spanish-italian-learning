/**
 * 主題：天氣 El tiempo / Il tempo
 * 義大利文的句子部分取自雲端硬碟「詹雅婷 - Appunti lezione」課堂筆記：
 *   Che tempo fa? / oggi è caldo o è freddo? / quanti gradi? / un tifone / piove = c'è pioggia / martedì prossimo
 * 併入 spanish.js、italian.js、topic-vocab.js；練習單字放在 calendar.js 的「天氣」類別。
 */

export const weatherDialogues = {
  es: {
    id: 'es-w1',
    level: 'A1',
    title: '¿Qué tiempo hace hoy?',
    titleZh: '今天天氣怎麼樣？',
    scene: '天氣',
    note: '問天氣：¿Qué tiempo hace? 回答：hace＋名詞（hace sol／calor／frío／viento）、estar＋形容詞（está nublado）、llueve／nieva。溫度：estamos a＋數字＋grados。',
    lines: [
      { speaker: 'Lucía', text: 'Hola, Diego. ¿Qué tal por Barcelona? ¿Qué tiempo hace?', zh: '嗨，Diego。巴塞隆納怎麼樣？天氣如何？' },
      { speaker: 'Diego', text: 'Hace muy buen tiempo. Hace sol y estamos a veinticinco grados.', zh: '天氣很好。出太陽，現在二十五度。' },
      { speaker: 'Lucía', text: '¡Qué suerte! Aquí en Madrid llueve y hace frío.', zh: '真好！馬德里這裡在下雨，很冷。' },
      { speaker: 'Diego', text: '¿Frío en mayo?', zh: '五月還會冷？' },
      { speaker: 'Lucía', text: 'Sí, solo estamos a doce grados. Y está muy nublado.', zh: '對，只有十二度，而且天很陰。' },
      { speaker: 'Diego', text: '¿Y mañana? ¿Va a hacer sol?', zh: '那明天呢？會出太陽嗎？' },
      { speaker: 'Lucía', text: 'Sí, el pronóstico dice que mañana va a hacer calor.', zh: '會，天氣預報說明天會很熱。' },
      { speaker: 'Diego', text: 'Entonces, ¡vamos a la playa el sábado!', zh: '那我們星期六去海邊吧！' },
      { speaker: 'Lucía', text: 'Vale, pero si hace viento, vamos al museo.', zh: '好，但如果颳風，我們就去博物館。' },
    ],
    questions: [
      { q: '¿Qué tiempo hace en Barcelona?', a: 'Hace sol y están a veinticinco grados.', zh: '出太陽，二十五度。' },
      { q: '¿Qué tiempo hace en Madrid?', a: 'Llueve, hace frío y está muy nublado.', zh: '下雨、很冷，天很陰。' },
      { q: '¿A cuántos grados están en Madrid?', a: 'Están a doce grados.', zh: '十二度。' },
      { q: '¿Qué tiempo va a hacer mañana?', a: 'Mañana va a hacer calor.', zh: '明天會很熱。' },
      { q: '¿Adónde van si hace viento?', a: 'Si hace viento, van al museo.', zh: '如果颳風，他們去博物館。' },
    ],
  },
  it: {
    id: 'it-w1',
    level: 'A1',
    source: '課堂筆記 Appunti lezione',
    title: 'Che tempo fa a Taipei?',
    titleZh: '台北天氣怎麼樣？',
    scene: '天氣',
    note: "問天氣：Che tempo fa? 回答：fa＋形容詞（fa caldo／freddo／fresco／bel tempo）、c'è＋名詞（c'è il sole、c'è vento）、piove／nevica。溫度：Quanti gradi ci sono? → Ci sono trenta gradi。",
    lines: [
      { speaker: 'Simone', text: 'Ciao Mei! Che tempo fa oggi a Taipei?', zh: '嗨，美！台北今天天氣怎麼樣？' },
      { speaker: 'Mei', text: "Fa molto caldo e c'è il sole.", zh: '很熱，出太陽。' },
      { speaker: 'Simone', text: 'Quanti gradi ci sono?', zh: '幾度？' },
      { speaker: 'Mei', text: "Ci sono trentatré gradi! E tu? Com'è il tempo a Licata?", zh: '三十三度！你呢？Licata 天氣怎麼樣？' },
      { speaker: 'Simone', text: 'Qui piove e fa fresco. Ci sono diciotto gradi.', zh: '這裡在下雨，很涼，十八度。' },
      { speaker: 'Mei', text: 'Martedì prossimo arriva un tifone a Taiwan.', zh: '下星期二有颱風要來台灣。' },
      { speaker: 'Simone', text: 'Un tifone? Allora martedì non lavori?', zh: '颱風？那星期二妳不用上班嗎？' },
      { speaker: 'Mei', text: "Forse no. Quando c'è il tifone, le scuole sono chiuse.", zh: '可能不用。颱風來的時候，學校會停課。' },
      { speaker: 'Simone', text: 'Ti piace il caldo?', zh: '妳喜歡熱天嗎？' },
      { speaker: 'Mei', text: "No, non mi piace. Preferisco l'autunno: fa bel tempo e non fa troppo caldo.", zh: '不喜歡。我比較喜歡秋天：天氣好，又不會太熱。' },
    ],
    questions: [
      { q: 'Che tempo fa a Taipei?', a: "Fa molto caldo e c'è il sole.", zh: '很熱，出太陽。' },
      { q: 'Quanti gradi ci sono a Taipei?', a: 'Ci sono trentatré gradi.', zh: '三十三度。' },
      { q: 'Che tempo fa a Licata?', a: 'Piove e fa fresco.', zh: '下雨，很涼。' },
      { q: 'Che cosa arriva martedì prossimo?', a: 'Arriva un tifone.', zh: '颱風要來。' },
      { q: 'Quale stagione preferisce Mei?', a: "Preferisce l'autunno.", zh: '她比較喜歡秋天。' },
    ],
  },
};

export const weatherReadings = {
  es: {
    id: 'es-r6',
    level: 'A2',
    theme: '天氣',
    title: 'El pronóstico del tiempo',
    titleZh: '週末天氣預報',
    text:
      'Buenos días. Este es el {{pronóstico}} del tiempo para el fin de semana. ' +
      'El sábado por la mañana va a hacer sol en casi toda España, pero por la tarde va a {{llover}} en el norte, en Galicia y en el País Vasco. ' +
      'En Madrid las {{temperaturas}} van a estar entre quince y veinticinco grados. ' +
      'En Andalucía va a hacer mucho calor: en Sevilla vamos a llegar a treinta y dos grados. ' +
      'El domingo va a cambiar el tiempo. Va a estar {{nublado}} en el centro y va a hacer {{viento}} en la costa de Valencia. ' +
      'En los Pirineos va a {{nevar}}, así que, si van a la montaña, lleven {{ropa de abrigo}}. ' +
      '¿Y en las islas Canarias? Como siempre, buen tiempo: sol y veintidós grados. ¡Buen fin de semana!',
    vocab: {
      pronóstico: { lemma: 'el pronóstico', pos: '名詞（陽性）', zh: '預報；el pronóstico del tiempo = 天氣預報' },
      llover: { lemma: 'llover', pos: '動詞（o→ue，只用第三人稱）', zh: '下雨；llueve = 正在下雨' },
      temperaturas: { lemma: 'la temperatura', pos: '名詞（陰性複數）', zh: '氣溫' },
      nublado: { lemma: 'nublado', pos: '形容詞', zh: '多雲的、陰天的' },
      viento: { lemma: 'el viento', pos: '名詞（陽性）', zh: '風；hace viento = 颳風' },
      nevar: { lemma: 'nevar', pos: '動詞（e→ie，只用第三人稱）', zh: '下雪；nieva = 正在下雪' },
      'ropa de abrigo': { lemma: 'la ropa de abrigo', pos: '名詞片語', zh: '保暖衣物' },
    },
    questions: [
      {
        type: 'mc',
        q: '¿Dónde va a llover el sábado por la tarde?',
        qZh: '星期六下午哪裡會下雨？',
        options: ['En el norte（北部）', 'En Andalucía（安達魯西亞）', 'En Canarias（加那利群島）'],
        answer: 0,
        explain: '「por la tarde va a llover en el norte, en Galicia y en el País Vasco」。ir a＋原形動詞＝將要…，是預報常用的未來說法。',
      },
      {
        type: 'tf',
        q: 'En Sevilla va a hacer frío.',
        qZh: '塞維亞會很冷。',
        answer: false,
        explain: '安達魯西亞會很熱，塞維亞會到 32 度（vamos a llegar a treinta y dos grados）。',
      },
      {
        type: 'mc',
        q: '¿Qué tiempo va a hacer en los Pirineos el domingo?',
        qZh: '星期天庇里牛斯山的天氣如何？',
        options: ['Va a nevar（會下雪）', 'Va a hacer calor（會很熱）', 'Va a llover（會下雨）'],
        answer: 0,
        explain: '「En los Pirineos va a nevar」，所以建議帶保暖衣物。',
      },
    ],
  },
  it: {
    id: 'it-r7',
    level: 'A2',
    theme: '天氣',
    title: 'Le previsioni del tempo',
    titleZh: '明天的天氣預報',
    text:
      'Buonasera, ecco le {{previsioni del tempo}} per domani. ' +
      'Al Nord il cielo è {{nuvoloso}} e al mattino c\'è la {{nebbia}} in Pianura Padana: attenzione sulle strade! ' +
      'Nel pomeriggio {{piove}} a Milano e a Torino, e sulle Alpi {{nevica}} sopra i millecinquecento metri. ' +
      'Le {{temperature}} sono basse: a Milano ci sono otto gradi. ' +
      'Al Centro fa bel tempo: a Roma e a Firenze c\'è il sole, ma c\'è un po\' di {{vento}}. ' +
      'Al Sud e in Sicilia fa ancora caldo: a Palermo ci sono ventitré gradi, una bella giornata per andare al mare. ' +
      'Nel fine settimana arriva un {{temporale}} da ovest e le temperature scendono in tutta Italia. ' +
      'Portate l\'{{ombrello}}! Buona serata.',
    vocab: {
      'previsioni del tempo': { lemma: 'le previsioni del tempo', pos: '名詞片語（陰性複數）', zh: '天氣預報' },
      nuvoloso: { lemma: 'nuvoloso', pos: '形容詞', zh: '多雲的' },
      nebbia: { lemma: 'la nebbia', pos: '名詞（陰性）', zh: '霧；c\'è la nebbia = 起霧' },
      piove: { lemma: 'piovere', pos: '動詞（第三人稱）', zh: '下雨' },
      nevica: { lemma: 'nevicare', pos: '動詞（第三人稱）', zh: '下雪' },
      temperature: { lemma: 'la temperatura', pos: '名詞（陰性複數）', zh: '氣溫' },
      vento: { lemma: 'il vento', pos: '名詞（陽性）', zh: '風；c\'è vento = 颳風' },
      temporale: { lemma: 'il temporale', pos: '名詞（陽性）', zh: '雷雨、暴風雨' },
      ombrello: { lemma: 'l\'ombrello', pos: '名詞（陽性）', zh: '雨傘' },
    },
    questions: [
      {
        type: 'mc',
        q: "Dove c'è la nebbia al mattino?",
        qZh: '早上哪裡起霧？',
        options: ['In Pianura Padana（波河平原）', 'A Roma（羅馬）', 'In Sicilia（西西里）'],
        answer: 0,
        explain: '「al mattino c\'è la nebbia in Pianura Padana」。',
      },
      {
        type: 'tf',
        q: 'A Roma piove.',
        qZh: '羅馬在下雨。',
        answer: false,
        explain: '中部天氣好：「a Roma e a Firenze c\'è il sole」，只是有點風。',
      },
      {
        type: 'mc',
        q: 'Che cosa arriva nel fine settimana?',
        qZh: '週末會有什麼天氣？',
        options: ['Un temporale（雷雨）', 'Il caldo（熱浪）', 'La neve a Palermo（巴勒摩下雪）'],
        answer: 0,
        explain: '「Nel fine settimana arriva un temporale da ovest」，所以主播說要帶傘。',
      },
    ],
  },
};

export const weatherExercises = {
  es: [
    { id: 'es-w-e1', level: 'A1', type: 'choice', prompt: '¿Qué tiempo hace? — «___ calor.»', options: ['Hace', 'Está', 'Hay', 'Es'], answer: 0, explain: '熱、冷、出太陽、颳風用 hacer＋名詞：hace calor、hace frío、hace sol、hace viento。' },
    { id: 'es-w-e2', level: 'A1', type: 'choice', prompt: 'Hoy ___ nublado.（今天是陰天）', options: ['hace', 'está', 'hay'], answer: 1, explain: 'nublado 是形容詞，要用 estar：está nublado。' },
    { id: 'es-w-e3', level: 'A1', type: 'choice', prompt: 'En esta ciudad ___ mucha niebla en invierno.', options: ['hay', 'hace', 'está'], answer: 0, explain: 'niebla（霧）、tormenta（暴風雨）用 hay＋名詞：hay niebla、hay tormenta。' },
    { id: 'es-w-e4', level: 'A1', type: 'choice', prompt: 'En agosto hace ___ calor en Sevilla.', options: ['muy', 'mucho', 'mucha'], answer: 1, explain: 'calor 是陽性名詞，所以用 mucho：hace mucho calor（不說 muy calor）。' },
    { id: 'es-w-e5', level: 'A1', type: 'conjugation', sentence: 'En Londres ___ mucho en otoño.', verb: 'llover', answers: ['llueve'], explain: 'llover 是 o→ue 變音動詞，天氣只用第三人稱單數：llueve（下雨）。' },
    { id: 'es-w-e6', level: 'A1', type: 'conjugation', sentence: 'En los Pirineos ___ en invierno.', verb: 'nevar', answers: ['nieva'], explain: 'nevar 是 e→ie 變音動詞：nieva（下雪）。' },
    { id: 'es-w-e7', level: 'A2', type: 'conjugation', sentence: 'Mañana ___ a hacer sol.', verb: 'ir', answers: ['va'], explain: '天氣預報常用 ir a＋原形表示未來：va a hacer sol、va a llover。' },
    { id: 'es-w-e8', level: 'A1', type: 'reorder', words: ['¿Qué', 'tiempo', 'hace', 'hoy', 'en', 'Madrid?'], zh: '今天馬德里天氣怎麼樣？', explain: '問天氣的固定句型：¿Qué tiempo hace…?' },
    { id: 'es-w-e9', level: 'A1', type: 'reorder', words: ['Hoy', 'estamos', 'a', 'veinte', 'grados.'], zh: '今天二十度。', explain: '說溫度：estamos a＋數字＋grados（也可以說 hace veinte grados）。' },
  ],
  it: [
    { id: 'it-w-e1', level: 'A1', type: 'choice', prompt: 'Che tempo fa? — «___ caldo.»', options: ['Fa', 'È', "C'è", 'Ha'], answer: 0, explain: '冷熱和好壞天氣用 fare：fa caldo、fa freddo、fa bel tempo。課堂上說的 è caldo 是口語，標準說法是 fa caldo。' },
    { id: 'it-w-e2', level: 'A1', type: 'choice', prompt: 'Oggi ___ il sole.', options: ["c'è", 'fa', 'è'], answer: 0, explain: "出太陽、颳風、起霧用 c'è＋名詞：c'è il sole、c'è vento、c'è la nebbia。" },
    { id: 'it-w-e3', level: 'A1', type: 'choice', prompt: 'Il cielo ___ nuvoloso.', options: ['è', 'fa', "c'è"], answer: 0, explain: 'nuvoloso（多雲的）是形容詞，用 essere：il cielo è nuvoloso／è nuvoloso。' },
    { id: 'it-w-e4', level: 'A1', type: 'choice', prompt: '課堂筆記：piove = ___', options: ["c'è pioggia", 'fa pioggia', 'è pioggia'], answer: 0, explain: "piove（下雨）也可以說 c'è la pioggia：pioggia 是名詞，所以用 c'è。" },
    { id: 'it-w-e5', level: 'A1', type: 'conjugation', sentence: 'A Londra ___ spesso.', verb: 'piovere', answers: ['piove'], explain: '天氣動詞只用第三人稱單數：piove（下雨）。' },
    { id: 'it-w-e6', level: 'A1', type: 'conjugation', sentence: 'Sulle Alpi ___ in inverno.', verb: 'nevicare', answers: ['nevica'], explain: 'nevicare → nevica（下雪）。' },
    { id: 'it-w-e7', level: 'A1', type: 'conjugation', sentence: 'Quanti gradi ___ oggi? — Ci sono trenta gradi.', verb: 'esserci', answers: ['ci sono'], explain: '問溫度用 Quanti gradi ci sono?（課堂筆記：quanti gradi?），gradi 是複數，所以用 ci sono。' },
    { id: 'it-w-e8', level: 'A1', type: 'reorder', words: ['Che', 'tempo', 'fa', 'oggi?'], zh: '今天天氣怎麼樣？', explain: '問天氣的固定句型：Che tempo fa?（課堂筆記）' },
    { id: 'it-w-e9', level: 'A1', type: 'reorder', words: ['Martedì', 'prossimo', 'arriva', 'un', 'tifone.'], zh: '下星期二颱風要來。', explain: 'martedì prossimo = 下星期二（課堂筆記）；arrivare（抵達）用在天氣上 = 颱風、寒流「來了」。' },
  ],
};

export const weatherVocab = {
  'es-w1': [
    ['天氣 El tiempo', [
      ['Hace sol. / Hace calor.', '出太陽。／很熱。'],
      ['Hace frío. / Hace viento.', '很冷。／颳風。'],
      ['Llueve. / Nieva.', '下雨。／下雪。'],
      ['Está nublado.', '陰天。'],
      ['Estamos a doce grados.', '現在十二度。'],
    ]],
    ['計畫 Planes', [
      ['el pronóstico', '天氣預報'],
      ['Va a hacer sol.', '會出太陽。'],
      ['si hace viento', '如果颳風'],
      ['la playa / el museo', '海邊／博物館'],
      ['¡Qué suerte!', '真幸運！'],
    ]],
  ],
  'it-w1': [
    ['天氣 Il tempo', [
      ['Che tempo fa?', '天氣怎麼樣？'],
      ["Fa caldo. / Fa freddo.", '很熱。／很冷。'],
      ["C'è il sole. / C'è vento.", '出太陽。／颳風。'],
      ['Piove. / Nevica.', '下雨。／下雪。'],
      ['Quanti gradi ci sono?', '幾度？'],
    ]],
    ['颱風與季節', [
      ['un tifone', '颱風'],
      ['martedì prossimo', '下星期二'],
      ['le scuole sono chiuse', '學校停課'],
      ['Fa fresco.', '天氣涼爽。'],
      ["Preferisco l'autunno.", '我比較喜歡秋天。'],
    ]],
  ],
};
