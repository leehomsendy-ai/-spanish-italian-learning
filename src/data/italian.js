/**
 * 義大利文學習資料
 * ------------------------------------------------------------
 * 資料格式與 spanish.js 相同，說明請見該檔案開頭。
 *
 * 內容來源（雲端硬碟）：
 *   - 「21 Andiamo al ristorante italiano.pdf」（義語的綺麗世界第 21 講）→ 對話 it-d1、文章 it-r2 字彙
 *   - 「Esercizio - indicativo - are essere avere fare, singolare plurale, aggettivi opposti」→ 題庫 it-e1~e3, e7~e9, e11
 *   - 「Esercizio - Articoli determinativi e indeterminativi, presente -are e fare…」→ 題庫 it-e4, e6, e10
 *   - 「Esercizi - Verbi essere, avere, -are prime 3 persone, cibo」→ 題庫 it-e5
 */

export default {
  meta: {
    code: 'it',
    name: 'Italiano',
    nameZh: '義大利文',
    speechLang: 'it-IT',
    flag: '🇮🇹',
  },

  dialogues: [
    {
      id: 'it-d1',
      level: 'A1',
      title: 'Andiamo al ristorante italiano',
      titleZh: '在義大利餐廳點餐',
      scene: '點餐',
      lines: [
        { speaker: 'Cameriere', text: 'Buonasera! Quanti siete?', zh: '晚安！你們幾位？' },
        { speaker: 'Marco', text: 'Siamo in due.', zh: '我們兩位。' },
        { speaker: 'Cameriere', text: 'Prego, accomodatevi. Ecco il menù.', zh: '請坐，這是菜單。' },
        { speaker: 'Cameriere', text: 'Cosa prendete?', zh: '你們要點什麼？' },
        { speaker: 'Marco', text: 'Vorrei un antipasto e un primo. Prendo i tortelli.', zh: '我想要一份前菜和一份第一道菜。我點義式餃子。' },
        { speaker: 'Giulia', text: 'Per me solo un primo: il risotto, per favore.', zh: '我只要第一道菜：燉飯，麻煩了。' },
        { speaker: 'Cameriere', text: "D'accordo. E da bere?", zh: '好的。那要喝什麼呢？' },
        { speaker: 'Giulia', text: 'Acqua e una bottiglia di vino rosso, per favore.', zh: '水和一瓶紅酒，麻煩了。' },
        { speaker: 'Cameriere', text: 'Volete prendere anche un secondo?', zh: '你們還要點第二道菜嗎？' },
        { speaker: 'Marco', text: "Sì. Com'è l'ossobuco?", zh: '好。燉牛膝怎麼樣？' },
        { speaker: 'Cameriere', text: 'Molto buono!', zh: '非常好吃！' },
        { speaker: 'Marco', text: 'Va bene, allora un ossobuco.', zh: '好，那就一份燉牛膝。' },
      ],
    },
    {
      id: 'it-d2',
      level: 'A2',
      title: 'Chiedere indicazioni a Roma',
      titleZh: '在羅馬問路',
      scene: '問路',
      lines: [
        { speaker: 'Turista', text: 'Scusi, per andare alla Fontana di Trevi?', zh: '不好意思，請問特雷維噴泉怎麼走？' },
        { speaker: 'Passante', text: 'Allora, vada sempre dritto fino al semaforo.', zh: '嗯，一直直走到紅綠燈。' },
        { speaker: 'Turista', text: 'E poi?', zh: '然後呢？' },
        { speaker: 'Passante', text: 'Al semaforo giri a sinistra e prenda la seconda strada a destra.', zh: '在紅綠燈左轉，再走右手邊第二條路。' },
        { speaker: 'Turista', text: 'È lontano?', zh: '很遠嗎？' },
        { speaker: 'Passante', text: 'No, sono circa cinque minuti a piedi.', zh: '不遠，走路大約五分鐘。' },
        { speaker: 'Turista', text: "C'è anche una farmacia qui vicino?", zh: '這附近有藥局嗎？' },
        { speaker: 'Passante', text: 'Sì, proprio di fronte alla fontana.', zh: '有，就在噴泉正對面。' },
        { speaker: 'Turista', text: 'Grazie mille!', zh: '非常感謝！' },
        { speaker: 'Passante', text: 'Prego, buona giornata!', zh: '不客氣，祝你有美好的一天！' },
      ],
    },
    {
      id: 'it-d3',
      level: 'B1',
      title: 'Alla stazione dei treni',
      titleZh: '在火車站買票',
      scene: '旅遊',
      lines: [
        { speaker: 'Viaggiatrice', text: 'Buongiorno, vorrei un biglietto per Firenze.', zh: '早安，我想買一張到佛羅倫斯的票。' },
        { speaker: 'Impiegato', text: 'Solo andata o andata e ritorno?', zh: '單程還是來回？' },
        { speaker: 'Viaggiatrice', text: 'Andata e ritorno. Parto oggi e torno venerdì.', zh: '來回。我今天出發，星期五回來。' },
        { speaker: 'Impiegato', text: "C'è un Frecciarossa alle dieci e un quarto, che arriva a Firenze a mezzogiorno meno dieci.", zh: '十點十五分有一班紅箭高鐵，十一點五十分抵達佛羅倫斯。' },
        { speaker: 'Viaggiatrice', text: 'Perfetto. Quanto costa?', zh: '太好了。多少錢？' },
        { speaker: 'Impiegato', text: 'In seconda classe sono ottantotto euro in totale.', zh: '二等車廂總共八十八歐元。' },
        { speaker: 'Viaggiatrice', text: 'Da quale binario parte il treno?', zh: '火車從哪個月台出發？' },
        { speaker: 'Impiegato', text: 'Dal binario sette, ma le consiglio di controllare il tabellone, perché a volte cambia.', zh: '七號月台，但建議您再確認看板，因為有時會變更。' },
        { speaker: 'Viaggiatrice', text: 'Devo convalidare il biglietto?', zh: '我需要打票嗎？' },
        { speaker: 'Impiegato', text: "No, per i treni ad alta velocità non è necessario: il biglietto ha già data e ora.", zh: '不用，高鐵車票不需要打票：票上已經有日期和時間。' },
        { speaker: 'Viaggiatrice', text: 'Grazie, è stato molto gentile.', zh: '謝謝，您真親切。' },
      ],
    },
  ],

  readings: [
    {
      id: 'it-r1',
      level: 'A1',
      title: 'Il caffè in Italia',
      titleZh: '義大利的咖啡文化',
      text:
        'In Italia il caffè è un piccolo rito quotidiano. La mattina molti italiani {{fanno}} colazione al bar: prendono un cappuccino e un {{cornetto}}. ' +
        'Il caffè italiano si chiama espresso: è piccolo, forte e si beve in piedi al {{bancone}}. ' +
        'Dopo le undici, gli italiani non {{bevono}} quasi mai il cappuccino, perché il latte è considerato pesante dopo i pasti. ' +
        'Al bar si paga prima alla cassa e poi si dà lo {{scontrino}} al barista. ' +
        'Molti italiani prendono due o tre caffè al giorno: uno a colazione, uno dopo pranzo e, a volte, uno nel pomeriggio con i colleghi. ' +
        'Un caffè costa circa un euro e venti. È {{veloce}}, economico e buonissimo!',
      vocab: {
        fanno: { lemma: 'fare', pos: '動詞（現在式 loro）', zh: '做；fare colazione = 吃早餐' },
        cornetto: { lemma: 'cornetto', pos: '名詞 (m.)', zh: '義式可頌（牛角麵包）' },
        bancone: { lemma: 'bancone', pos: '名詞 (m.)', zh: '吧台、櫃台' },
        bevono: { lemma: 'bere', pos: '動詞（現在式 loro）', zh: '喝（不規則：bevo, bevi, beve…）' },
        scontrino: { lemma: 'scontrino', pos: '名詞 (m.)', zh: '收據、小票' },
        veloce: { lemma: 'veloce', pos: '形容詞', zh: '快速的' },
      },
      questions: [
        {
          type: 'tf',
          q: 'Gli italiani bevono spesso il cappuccino dopo cena.',
          qZh: '義大利人常在晚餐後喝卡布奇諾。',
          answer: false,
          explain: '文中說十一點以後義大利人「quasi mai」（幾乎不）喝卡布奇諾，因為飯後喝牛奶被認為太膩。',
        },
        {
          type: 'mc',
          q: 'Al bar, dove si paga?',
          qZh: '在咖啡吧，要在哪裡付錢？',
          options: ['Al tavolo（在座位上）', 'Alla cassa（在收銀台）', 'Al barista, dopo il caffè（喝完再付給咖啡師）'],
          answer: 1,
          explain: '「si paga prima alla cassa e poi si dà lo scontrino al barista」—— 先到收銀台付錢，再把收據交給咖啡師。',
        },
        {
          type: 'tf',
          q: "L'espresso si beve spesso in piedi al bancone.",
          qZh: 'Espresso 通常是站在吧台喝的。',
          answer: true,
          explain: '「si beve in piedi al bancone」—— 站在吧台喝。',
        },
      ],
    },
    {
      id: 'it-r2',
      level: 'A2',
      title: 'Il pranzo della domenica',
      titleZh: '星期天的家庭午餐',
      text:
        'La domenica, in molte famiglie italiane, il pranzo è un momento speciale. Nonni, genitori e nipoti si {{riuniscono}} intorno alla tavola e mangiano insieme per ore. ' +
        'Il pasto tradizionale ha diverse {{portate}}. Prima c\'è l\'{{antipasto}}, per esempio affettati misti o una bruschetta. ' +
        'Poi arriva il {{primo}}: un piatto di pasta, come le lasagne, oppure un risotto. ' +
        'Dopo c\'è il {{secondo}}, di solito carne o pesce, con un {{contorno}} di verdure o un\'insalata. ' +
        'Alla fine non possono mancare la frutta, il dolce e naturalmente il caffè. ' +
        'Per gli italiani, il pranzo della domenica non è solo cibo: è un\'occasione per {{stare insieme}} e raccontarsi la settimana.',
      vocab: {
        riuniscono: { lemma: 'riunirsi', pos: '反身動詞（現在式 loro）', zh: '聚集、團聚（-isc- 型動詞）' },
        portate: { lemma: 'portata', pos: '名詞 (f.)', zh: '（一道道上的）菜（文中為複數）' },
        antipasto: { lemma: 'antipasto', pos: '名詞 (m.)', zh: '前菜、開胃菜' },
        primo: { lemma: 'primo (piatto)', pos: '名詞 (m.)', zh: '第一道主菜（義大利麵、燉飯、湯）' },
        secondo: { lemma: 'secondo (piatto)', pos: '名詞 (m.)', zh: '第二道主菜（肉或魚）' },
        contorno: { lemma: 'contorno', pos: '名詞 (m.)', zh: '配菜' },
        'stare insieme': { lemma: 'stare insieme', pos: '片語', zh: '相聚、在一起' },
      },
      questions: [
        {
          type: 'mc',
          q: "Che cos'è il «primo»?",
          qZh: '「primo」指的是什麼？',
          options: ['Un piatto di carne（肉類料理）', 'Pasta o risotto（義大利麵或燉飯）', 'Il dolce（甜點）'],
          answer: 1,
          explain: '「Poi arriva il primo: un piatto di pasta, come le lasagne, oppure un risotto.」',
        },
        {
          type: 'tf',
          q: 'Il secondo è di solito un dolce.',
          qZh: '第二道菜通常是甜點。',
          answer: false,
          explain: '「il secondo, di solito carne o pesce」—— 第二道菜通常是肉或魚，甜點在最後。',
        },
        {
          type: 'mc',
          q: 'Con il secondo si mangia spesso un…',
          qZh: '第二道菜常會搭配什麼？',
          options: ['contorno（配菜）', 'antipasto（前菜）', 'cornetto（可頌）'],
          answer: 0,
          explain: '「con un contorno di verdure o un\'insalata」—— 搭配蔬菜或沙拉作為配菜。',
        },
      ],
    },
    {
      id: 'it-r3',
      level: 'B1',
      title: 'Le piazze italiane',
      titleZh: '義大利的廣場',
      text:
        'Per capire l\'Italia bisogna {{passeggiare}} nelle sue piazze. Fin dal Medioevo, la piazza è stata il cuore della vita cittadina: qui si trovavano il mercato, la chiesa e il palazzo del governo. ' +
        'Ancora oggi la piazza è un luogo d\'{{incontro}}: le persone si danno appuntamento davanti alla fontana, bevono un aperitivo nei tavolini all\'aperto e chiacchierano fino a tardi. ' +
        'Ogni città ha la sua piazza famosa: Piazza San Marco a Venezia, Piazza del Campo a Siena, dove si {{svolge}} il celebre Palio, o Piazza Navona a Roma, costruita sopra un antico stadio romano. ' +
        'Durante l\'estate, molte piazze {{ospitano}} concerti e cinema all\'aperto. ' +
        'Insomma, la piazza non è soltanto uno spazio architettonico, ma un vero {{salotto}} all\'aperto dove gli italiani vivono la loro {{quotidianità}}.',
      vocab: {
        passeggiare: { lemma: 'passeggiare', pos: '動詞（原形）', zh: '散步、閒逛' },
        incontro: { lemma: 'incontro', pos: '名詞 (m.)', zh: '相遇、會面' },
        svolge: { lemma: 'svolgersi', pos: '反身動詞（現在式 lui/lei）', zh: '（活動）舉行、進行' },
        ospitano: { lemma: 'ospitare', pos: '動詞（現在式 loro）', zh: '接待、舉辦（活動）' },
        salotto: { lemma: 'salotto', pos: '名詞 (m.)', zh: '客廳' },
        quotidianità: { lemma: 'quotidianità', pos: '名詞 (f.)', zh: '日常生活' },
      },
      questions: [
        {
          type: 'mc',
          q: 'In quale piazza si svolge il Palio?',
          qZh: 'Palio 賽馬節在哪個廣場舉行？',
          options: ['Piazza San Marco', 'Piazza del Campo', 'Piazza Navona'],
          answer: 1,
          explain: '「Piazza del Campo a Siena, dove si svolge il celebre Palio」—— 西恩納的田野廣場。',
        },
        {
          type: 'tf',
          q: 'Piazza Navona è costruita sopra un antico stadio romano.',
          qZh: '納沃納廣場建在古羅馬體育場遺址上。',
          answer: true,
          explain: '「Piazza Navona a Roma, costruita sopra un antico stadio romano」。',
        },
        {
          type: 'mc',
          q: "Secondo l'autore, la piazza è come…",
          qZh: '作者把廣場比喻成什麼？',
          options: ['un museo（博物館）', 'un salotto all\'aperto（露天客廳）', 'un mercato（市場）'],
          answer: 1,
          explain: '結尾說廣場是「un vero salotto all\'aperto」—— 真正的露天客廳。',
        },
      ],
    },
  ],

  exercises: [
    // ---------- A1 ----------
    {
      id: 'it-e1',
      level: 'A1',
      type: 'conjugation',
      sentence: 'Io ___ italiano con i miei amici.',
      verb: 'parlare',
      answers: ['parlo'],
      explain: '-are 規則動詞現在式：去掉 -are，io 加 -o → parlo。完整變位：parlo, parli, parla, parliamo, parlate, parlano。',
    },
    {
      id: 'it-e2',
      level: 'A1',
      type: 'conjugation',
      sentence: 'Tu ___ molto simpatico.',
      verb: 'essere',
      answers: ['sei'],
      explain: 'essere（是）為不規則動詞：sono, sei, è, siamo, siete, sono。',
    },
    {
      id: 'it-e3',
      level: 'A1',
      type: 'conjugation',
      sentence: 'Maria ___ molti amici in città.',
      verb: 'avere',
      answers: ['ha'],
      explain: 'avere（有）為不規則動詞：ho, hai, ha, abbiamo, avete, hanno。h 不發音。',
    },
    {
      id: 'it-e4',
      level: 'A1',
      type: 'choice',
      prompt: '___ zaino è pesante.',
      options: ['Il', 'Lo', 'La', "L'"],
      answer: 1,
      explain: '陽性單數名詞以 s+子音、z、gn、ps、y 開頭時，定冠詞用 lo（lo zaino, lo studente）；其餘子音開頭用 il；母音開頭用 l\'。',
    },
    {
      id: 'it-e5',
      level: 'A1',
      type: 'choice',
      prompt: 'La ___ è un frutto dolce e rosso.',
      options: ['latte', 'fragola', 'pane'],
      answer: 1,
      explain: 'fragola = 草莓；latte = 牛奶；pane = 麵包。句中冠詞 la 也提示答案是陰性名詞。',
    },
    {
      id: 'it-e6',
      level: 'A1',
      type: 'reorder',
      words: ['Io', 'sono', 'felice.'],
      zh: '我很快樂。',
      explain: '義大利文基本語序為「主詞 + 動詞 + 補語」。essere 後接形容詞描述狀態或特質。',
    },
    // ---------- A2 ----------
    {
      id: 'it-e7',
      level: 'A2',
      type: 'conjugation',
      sentence: 'Noi ___ una passeggiata ogni mattina.',
      verb: 'fare',
      answers: ['facciamo'],
      explain: 'fare 為不規則動詞：faccio, fai, fa, facciamo, fate, fanno。fare una passeggiata = 散步。',
    },
    {
      id: 'it-e8',
      level: 'A2',
      type: 'conjugation',
      sentence: 'Loro ___ troppo veloce!',
      verb: 'parlare',
      answers: ['parlano'],
      explain: '-are 動詞 loro 形式字尾為 -ano → parlano。注意重音在倒數第三音節：PAR-la-no。',
    },
    {
      id: 'it-e9',
      level: 'A2',
      type: 'choice',
      prompt: 'Lo studente è bravo. → ___ studenti sono bravi.',
      options: ['I', 'Gli', 'Le'],
      answer: 1,
      explain: '單數用 lo 或 l\'（陽性）的名詞，複數定冠詞改為 gli：lo studente → gli studenti，l\'amico → gli amici。il 的複數則是 i。',
    },
    {
      id: 'it-e10',
      level: 'A2',
      type: 'choice',
      prompt: '___ idea mi sembra buona.',
      options: ['Un', 'Uno', "Un'", 'Una'],
      answer: 2,
      explain: 'idea 是陰性名詞，以母音開頭，不定冠詞 una 縮寫為 un\'（加省略符號）。陽性母音開頭則直接用 un（un amico），不加省略符號。',
    },
    {
      id: 'it-e11',
      level: 'A2',
      type: 'reorder',
      words: ['Noi', 'facciamo', 'esercizi', 'ogni', 'giorno.'],
      zh: '我們每天做練習。',
      explain: '時間副詞片語 ogni giorno（每天）通常放句尾。由於動詞變位已表明主詞，noi 也可省略：Facciamo esercizi ogni giorno.',
    },
    {
      id: 'it-e12',
      level: 'A2',
      type: 'choice',
      prompt: 'Cameriere: «Quanti siete?» — Tu: «___»',
      options: ['Siamo in due.', 'Abbiamo due.', 'Sono due anni.'],
      answer: 0,
      explain: '餐廳回答人數用「essere in + 數字」：Siamo in due（我們兩位）。義大利文以 essere 表達人數，而不是 avere。',
    },
    // ---------- B1 ----------
    {
      id: 'it-e13',
      level: 'B1',
      type: 'conjugation',
      sentence: 'Ieri io ___ al mare.',
      verb: 'andare，近過去式',
      answers: ['sono andato', 'sono andata'],
      explain: '近過去式（passato prossimo）= 助動詞 + 過去分詞。表示移動的動詞（andare, venire, partire…）用 essere 當助動詞，過去分詞需與主詞性別一致：sono andato（男）/ sono andata（女）。',
    },
    {
      id: 'it-e14',
      level: 'B1',
      type: 'choice',
      prompt: 'Domani probabilmente ___.',
      options: ['piove', 'pioverà', 'pioveva'],
      answer: 1,
      explain: 'domani（明天）＋ probabilmente（可能）表示對未來的推測，用簡單未來式：pioverà。pioveva 是未完成過去式。',
    },
    {
      id: 'it-e15',
      level: 'B1',
      type: 'reorder',
      words: ['Se', 'avessi', 'tempo,', 'viaggerei', 'di', 'più.'],
      zh: '如果我有時間，我會多去旅行。',
      explain: '與現在事實相反的假設：「Se + 虛擬式未完成過去式（avessi）, 條件式（viaggerei）」。',
    },
  ],
};
