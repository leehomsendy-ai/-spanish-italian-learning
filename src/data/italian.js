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

import { itTimeDialogues } from './travel-time.js';
import { weatherDialogues, weatherExercises, weatherReadings } from './weather.js';
import { itReflexiveDialogue, itReflexiveExercises, itReflexiveReading, itReflexiveVerbs } from './italian-riflessivi.js';

const italian = {
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
    {
      id: 'it-d4',
      level: 'A1',
      title: 'Piacere!',
      titleZh: '認識新朋友',
      scene: '自我介紹',
      lines: [
        { speaker: 'Luca', text: 'Ciao! Come ti chiami?', zh: '嗨！你叫什麼名字？' },
        { speaker: 'Mei', text: 'Ciao, mi chiamo Mei. E tu?', zh: '嗨，我叫美。你呢？' },
        { speaker: 'Luca', text: 'Io sono Luca. Di dove sei?', zh: '我是盧卡。你是哪裡人？' },
        { speaker: 'Mei', text: 'Sono taiwanese, di Taichung.', zh: '我是台灣人，來自台中。' },
        { speaker: 'Luca', text: 'Che bello! Sei qui in vacanza?', zh: '真好！你來這裡度假嗎？' },
        { speaker: 'Mei', text: 'No, sono una studentessa. Studio arte a Firenze.', zh: '不是，我是學生。我在佛羅倫斯念藝術。' },
        { speaker: 'Luca', text: 'Quanti anni hai?', zh: '你幾歲？' },
        { speaker: 'Mei', text: 'Ho ventidue anni. E tu, che lavoro fai?', zh: '我二十二歲。那你做什麼工作？' },
        { speaker: 'Luca', text: 'Faccio il cuoco in un ristorante.', zh: '我在一家餐廳當廚師。' },
        { speaker: 'Mei', text: 'Piacere di conoscerti!', zh: '很高興認識你！' },
        { speaker: 'Luca', text: 'Piacere mio! A presto!', zh: '我也很高興！再見！' },
      ],
    },
    {
      id: 'it-d5',
      level: 'A2',
      title: 'Al mercato',
      titleZh: '在市場買蔬果',
      scene: '購物',
      lines: [
        { speaker: 'Fruttivendolo', text: 'Buongiorno, signora! Cosa le do oggi?', zh: '早安，女士！今天要買什麼？' },
        { speaker: 'Cliente', text: 'Buongiorno. Vorrei un chilo di pomodori.', zh: '早安。我想要一公斤番茄。' },
        { speaker: 'Fruttivendolo', text: 'Ecco qua. Sono molto dolci, vengono dalla Sicilia.', zh: '給您。這些很甜，是西西里產的。' },
        { speaker: 'Cliente', text: 'Quanto costano le fragole?', zh: '草莓多少錢？' },
        { speaker: 'Fruttivendolo', text: 'Tre euro al cestino.', zh: '一盒三歐元。' },
        { speaker: 'Cliente', text: 'Allora ne prendo due cestini.', zh: '那我買兩盒。' },
        { speaker: 'Fruttivendolo', text: 'Altro?', zh: '還要別的嗎？' },
        { speaker: 'Cliente', text: "Sì, anche mezzo chilo di carote e un po' di lattuga.", zh: '要，還要半公斤紅蘿蔔和一點萵苣。' },
        { speaker: 'Fruttivendolo', text: 'Basta così?', zh: '這樣就好了嗎？' },
        { speaker: 'Cliente', text: "Sì, grazie. Quant'è in tutto?", zh: '對，謝謝。總共多少錢？' },
        { speaker: 'Fruttivendolo', text: 'Sono dieci euro e cinquanta.', zh: '十歐元五十分。' },
        { speaker: 'Cliente', text: 'Ecco a lei. Buona giornata!', zh: '給您。祝您有美好的一天！' },
      ],
    },
    {
      id: 'it-d6',
      level: 'B1',
      title: 'In farmacia',
      titleZh: '在藥局買藥',
      scene: '就醫',
      lines: [
        { speaker: 'Farmacista', text: 'Buonasera, mi dica.', zh: '晚安，請說。' },
        { speaker: 'Cliente', text: 'Buonasera. Ho mal di testa da stamattina e mi sento molto stanco.', zh: '晚安。我從早上開始頭痛，而且覺得很累。' },
        { speaker: 'Farmacista', text: 'Ha anche la febbre?', zh: '也有發燒嗎？' },
        { speaker: 'Cliente', text: 'Credo di sì, ma non ho il termometro.', zh: '我想有，但我沒有體溫計。' },
        { speaker: 'Farmacista', text: 'Ha già preso qualcosa?', zh: '已經吃過什麼藥了嗎？' },
        { speaker: 'Cliente', text: 'No, niente. Sono in Italia da due giorni e non so cosa comprare.', zh: '沒有，什麼都沒吃。我來義大利兩天，不知道該買什麼。' },
        { speaker: 'Farmacista', text: 'Le consiglio questo antidolorifico. Ne prenda una compressa ogni sei ore, non più di tre al giorno.', zh: '我建議您這個止痛藥。每六小時吃一錠，一天不超過三錠。' },
        { speaker: 'Cliente', text: 'Serve la ricetta?', zh: '需要處方箋嗎？' },
        { speaker: 'Farmacista', text: 'No, è un farmaco da banco. Se domani la febbre non passa, però, è meglio andare dal medico.', zh: '不用，這是成藥。不過如果明天還沒退燒，最好去看醫生。' },
        { speaker: 'Cliente', text: "D'accordo. Prendo anche un termometro, per favore.", zh: '好的。我也買一支體溫計，麻煩了。' },
        { speaker: 'Farmacista', text: 'Certo. In tutto sono quattordici euro.', zh: '當然。總共十四歐元。' },
      ],
    },
  ],

  readings: [
    {
      id: 'it-r1',
      level: 'A1',
      theme: '飲食文化',
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
      theme: '家庭聚餐',
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
      theme: '城市文化',
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
    {
      id: 'it-r4',
      level: 'A1',
      theme: '日常生活',
      title: 'La mia giornata',
      titleZh: '我的一天',
      text:
        'Mi chiamo Giulia e abito a Bologna. La mattina mi sveglio alle sette. Prima {{faccio}} colazione con un caffè e i biscotti, poi prendo l\'autobus per andare al lavoro. ' +
        '{{Lavoro}} in un ufficio in centro, dalle nove alle cinque. A pranzo mangio un panino con i colleghi. ' +
        'Dopo il lavoro {{faccio la spesa}} al supermercato e torno a casa. ' +
        'La sera {{cucino}} la pasta e {{guardo}} un po\' di televisione. ' +
        'Il sabato faccio una passeggiata nel parco con il mio cane e la domenica pranzo con la mia famiglia. ' +
        'Vado a letto alle undici, perché la sera sono sempre molto {{stanca}}!',
      vocab: {
        faccio: { lemma: 'fare', pos: '動詞（現在式 io）', zh: '做；fare colazione = 吃早餐' },
        Lavoro: { lemma: 'lavorare', pos: '動詞（現在式 io）', zh: '工作' },
        'faccio la spesa': { lemma: 'fare la spesa', pos: '片語', zh: '買菜、採買日用品' },
        cucino: { lemma: 'cucinare', pos: '動詞（現在式 io）', zh: '煮、做菜' },
        guardo: { lemma: 'guardare', pos: '動詞（現在式 io）', zh: '看（電視、影片）' },
        stanca: { lemma: 'stanco', pos: '形容詞（陰性）', zh: '疲累的' },
      },
      questions: [
        {
          type: 'mc',
          q: 'Come va al lavoro Giulia?',
          qZh: 'Giulia 怎麼去上班？',
          options: ['A piedi（走路）', 'In autobus（搭公車）', 'In macchina（開車）'],
          answer: 1,
          explain: '「poi prendo l\'autobus per andare al lavoro」。',
        },
        {
          type: 'tf',
          q: 'Giulia pranza a casa tutti i giorni.',
          qZh: 'Giulia 每天都回家吃午餐。',
          answer: false,
          explain: '平日她和同事吃三明治（A pranzo mangio un panino con i colleghi），只有星期天和家人吃午餐。',
        },
        {
          type: 'mc',
          q: 'Cosa fa Giulia il sabato?',
          qZh: 'Giulia 星期六做什麼？',
          options: ['Lavora in ufficio（上班）', 'Fa una passeggiata nel parco（在公園散步）', 'Va al mare（去海邊）'],
          answer: 1,
          explain: '「Il sabato faccio una passeggiata nel parco con il mio cane」。',
        },
      ],
    },
    {
      id: 'it-r5',
      level: 'A2',
      theme: '節慶',
      title: 'Il Carnevale di Venezia',
      titleZh: '威尼斯嘉年華',
      text:
        'Il Carnevale di Venezia è una delle {{feste|festa}} più antiche e famose d\'Italia. Si festeggia ogni anno a febbraio, nei giorni prima della Quaresima. ' +
        'Durante il Carnevale, migliaia di persone arrivano in città da tutto il mondo. ' +
        'Molti {{indossano}} costumi eleganti del Settecento e bellissime {{maschere|maschera}} che nascondono il viso. ' +
        'Nel passato, le maschere permettevano a tutti, ricchi e poveri, di essere {{uguali|uguale}} per qualche giorno. ' +
        'Uno degli eventi più attesi è il «Volo dell\'Angelo»: una ragazza scende dal campanile di San Marco sopra la piazza piena di gente. ' +
        'Nelle pasticcerie si vendono dolci tipici, come le frittelle e i galani. ' +
        'Se visitate Venezia in questo periodo, {{prenotate}} l\'albergo con molto {{anticipo}}!',
      vocab: {
        festa: { lemma: 'festa', pos: '名詞 (f.)', zh: '節慶、派對（文中為複數 feste）' },
        indossano: { lemma: 'indossare', pos: '動詞（現在式 loro）', zh: '穿戴' },
        maschera: { lemma: 'maschera', pos: '名詞 (f.)', zh: '面具（文中為複數 maschere）' },
        uguale: { lemma: 'uguale', pos: '形容詞', zh: '平等的、相同的（文中為複數 uguali）' },
        prenotate: { lemma: 'prenotare', pos: '動詞（命令式 voi）', zh: '預訂' },
        anticipo: { lemma: 'anticipo', pos: '名詞 (m.)', zh: '提前；con anticipo = 提早' },
      },
      questions: [
        {
          type: 'mc',
          q: 'In quale mese si festeggia il Carnevale di Venezia?',
          qZh: '威尼斯嘉年華在幾月舉行？',
          options: ['Dicembre', 'Febbraio', 'Luglio'],
          answer: 1,
          explain: '「Si festeggia ogni anno a febbraio」—— 每年二月，在大齋期之前。',
        },
        {
          type: 'tf',
          q: 'Nel passato le maschere rendevano ricchi e poveri uguali per qualche giorno.',
          qZh: '過去面具讓富人和窮人能平等幾天。',
          answer: true,
          explain: '「le maschere permettevano a tutti, ricchi e poveri, di essere uguali per qualche giorno」。',
        },
        {
          type: 'mc',
          q: 'Che cosa sono le frittelle?',
          qZh: 'frittelle 是什麼？',
          options: ['Costumi（服裝）', 'Dolci tipici（傳統甜點）', 'Maschere（面具）'],
          answer: 1,
          explain: '「Nelle pasticcerie si vendono dolci tipici, come le frittelle e i galani」。',
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

// 旅遊時間對話（時刻表、訂房日期、季節）
italian.dialogues.push(...itTimeDialogues);

// 主題：反身動詞（雲端硬碟《學會A1-A2作業簿》第 5 課，見 italian-riflessivi.js）
italian.verbs = [...(italian.verbs || []), ...itReflexiveVerbs];
italian.dialogues.push(itReflexiveDialogue);
italian.readings.push(itReflexiveReading);
italian.exercises.push(...itReflexiveExercises);

// 主題：天氣（見 weather.js；句子部分取自課堂筆記）
italian.dialogues.push(weatherDialogues.it);
italian.readings.push(weatherReadings.it);
italian.exercises.push(...weatherExercises.it);

export default italian;
