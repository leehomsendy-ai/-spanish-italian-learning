/**
 * 義大利文主題：反身動詞 I verbi riflessivi
 * ------------------------------------------------------------
 * 來源（雲端硬碟「義大利文」資料夾）：
 *   - 《學會A1-A2作業簿 2025年新版》第 5 課 I verbi riflessivi（5.1 變化表、5.2 填空與解答）
 *     以及第 4 課 4.5、第 6 課 6.2、第 7 課 7.4、第 8 課 8.3、第 15 課 15.1 裡的反身動詞句子
 *   - 「詹雅婷 - Appunti lezione」課堂筆記：Come ti chiami? / mi chiamo… / A che ora ti svegli?
 * 併入 italian.js：verbs、dialogues、readings、exercises。
 */

const SOURCE = '學會A1-A2作業簿 第5課';
const P = ['io', 'tu', 'lui / lei', 'noi', 'voi', 'loro'];

export const itReflexiveVerbs = [
  {
    id: 'it-v1',
    level: 'A1',
    source: SOURCE,
    title: 'I verbi riflessivi',
    titleZh: '反身動詞',
    intro:
      '反身動詞表示動作回到主詞自己身上，例如「我洗（我自己）」= mi lavo。原形以 -arsi、-ersi、-irsi 結尾。變化方法：去掉 -si，照一般 -are／-ere／-ire 動詞變化，再在前面加上反身代名詞 mi, ti, si, ci, vi, si。',
    tables: [
      {
        title: '反身代名詞（以 alzarsi 起床為例）',
        headers: ['人稱', '反身代名詞', '動詞變化', '中文'],
        rows: [
          ['io', 'mi', 'mi alzo', '我起床'],
          ['tu', 'ti', 'ti alzi', '你起床'],
          ['lui / lei', 'si', 'si alza', '他／她起床'],
          ['noi', 'ci', 'ci alziamo', '我們起床'],
          ['voi', 'vi', 'vi alzate', '你們起床'],
          ['loro', 'si', 'si alzano', '他們起床'],
        ],
        note: '代名詞放在變位動詞「前面」：mi alzo。否定時 non 放在代名詞前面：Paolo non si trucca mai.',
      },
      {
        title: '講義 5.1：四個動詞的現在時變化',
        headers: ['原型', '中文', ...P],
        rows: [
          ['truccarsi', '化妝', 'mi trucco', 'ti trucchi', 'si trucca', 'ci trucchiamo', 'vi truccate', 'si truccano'],
          ['pettinarsi', '梳頭髮', 'mi pettino', 'ti pettini', 'si pettina', 'ci pettiniamo', 'vi pettinate', 'si pettinano'],
          ['lavarsi', '洗（自己）', 'mi lavo', 'ti lavi', 'si lava', 'ci laviamo', 'vi lavate', 'si lavano'],
          ['vestirsi', '穿衣服', 'mi vesto', 'ti vesti', 'si veste', 'ci vestiamo', 'vi vestite', 'si vestono'],
        ],
        note: 'truccarsi 的 tu 和 noi 要加 h：ti trucchi、ci trucchiamo，才能保留 /k/ 的發音。',
      },
      {
        title: '日常作息常用的反身動詞',
        headers: ['原型', '中文', ...P],
        rows: [
          ['svegliarsi', '醒來', 'mi sveglio', 'ti svegli', 'si sveglia', 'ci svegliamo', 'vi svegliate', 'si svegliano'],
          ['alzarsi', '起床', 'mi alzo', 'ti alzi', 'si alza', 'ci alziamo', 'vi alzate', 'si alzano'],
          ['chiamarsi', '名叫', 'mi chiamo', 'ti chiami', 'si chiama', 'ci chiamiamo', 'vi chiamate', 'si chiamano'],
          ['farsi la doccia', '洗澡（淋浴）', 'mi faccio', 'ti fai', 'si fa', 'ci facciamo', 'vi fate', 'si fanno'],
          ['radersi', '刮鬍子', 'mi rado', 'ti radi', 'si rade', 'ci radiamo', 'vi radete', 'si radono'],
          ['mettersi', '穿上、戴上', 'mi metto', 'ti metti', 'si mette', 'ci mettiamo', 'vi mettete', 'si mettono'],
          ['riposarsi', '休息', 'mi riposo', 'ti riposi', 'si riposa', 'ci riposiamo', 'vi riposate', 'si riposano'],
          ['divertirsi', '玩得開心', 'mi diverto', 'ti diverti', 'si diverte', 'ci divertiamo', 'vi divertite', 'si divertono'],
          ['addormentarsi', '睡著', 'mi addormento', 'ti addormenti', 'si addormenta', 'ci addormentiamo', 'vi addormentate', 'si addormentano'],
          ['sentirsi', '感覺（身體）', 'mi sento', 'ti senti', 'si sente', 'ci sentiamo', 'vi sentite', 'si sentono'],
        ],
        note: 'farsi la doccia 的 fare 是不規則動詞（faccio, fai, fa, facciamo, fate, fanno），la doccia 不變：si fanno la doccia。',
      },
      {
        title: '同一個動詞：反身 vs. 非反身',
        headers: ['非反身', '意思', '反身', '意思', '例句'],
        rows: [
          ['lavare', '洗（別的東西）', 'lavarsi', '洗自己', 'Lavo la macchina. ／ Mi lavo.'],
          ['svegliare', '叫醒（別人）', 'svegliarsi', '自己醒來', 'Sveglio i bambini. ／ Mi sveglio alle sette.'],
          ['chiamare', '打電話、叫', 'chiamarsi', '名叫', 'Chiamo Marco. ／ Mi chiamo Marco.'],
          ['vestire', '幫（別人）穿衣', 'vestirsi', '自己穿衣', 'Vesto la bambina. ／ Mi vesto.'],
          ['mettere', '放', 'mettersi', '穿上、戴上', 'Metto il libro sul tavolo. ／ Mi metto la giacca.'],
        ],
      },
      {
        title: '進一步：情態動詞與過去式',
        headers: ['用法', '說明', '例句'],
        rows: [
          ['情態動詞＋原形', '代名詞可放前面，或接在原形後面（去掉 -e）', 'Domani devo alzarmi presto. = Domani mi devo alzare presto.'],
          ['身體部位', '用定冠詞，不用所有格', 'Mi lavo le mani.（不說 le mie mani）'],
          ['將來時', '代名詞一樣放前面（講義 15.1）', 'Quando andrò in pensione, mi iscriverò in palestra.'],
          ['近過去時（A2）', '助動詞用 essere，過去分詞配合主詞陰陽性', 'Stamattina mi sono alzato / alzata alle sei.'],
        ],
      },
    ],
  },
];

export const itReflexiveDialogue = {
  id: 'it-d7',
  level: 'A1',
  source: SOURCE,
  title: 'A che ora ti svegli?',
  titleZh: '你幾點起床？',
  scene: '日常作息',
  note: '反身動詞：mi sveglio（我醒來）、mi alzo（我起床）、mi faccio la doccia（我洗澡）。代名詞放在動詞前面，否定時 non 放最前面。',
  lines: [
    { speaker: 'Luca', text: 'Mei, a che ora ti svegli la mattina?', zh: '美，妳早上幾點醒來？' },
    { speaker: 'Mei', text: 'Mi sveglio alle sei, ma mi alzo alle sei e un quarto.', zh: '我六點醒，但六點十五分才起床。' },
    { speaker: 'Luca', text: 'Così presto! Perché?', zh: '這麼早！為什麼？' },
    { speaker: 'Mei', text: 'La mia scuola inizia alle sette e mezza. Prima mi faccio la doccia, poi mi vesto e faccio colazione.', zh: '我的學校七點半開始。我先洗澡，然後穿衣服、吃早餐。' },
    { speaker: 'Luca', text: 'Io invece la mattina non mi faccio la doccia. Me la faccio la sera.', zh: '我反而早上不洗澡，我晚上洗。' },
    { speaker: 'Mei', text: 'E tu, a che ora ti alzi?', zh: '那你幾點起床？' },
    { speaker: 'Luca', text: 'Di solito mi alzo alle otto. Mi rado, mi metto la giacca e vado in ufficio.', zh: '我通常八點起床。刮鬍子、穿上外套，然後去辦公室。' },
    { speaker: 'Mei', text: 'E nel fine settimana?', zh: '那週末呢？' },
    { speaker: 'Luca', text: 'Nel fine settimana mi alzo molto tardi e mi riposo. Il sabato sera esco con gli amici e mi diverto!', zh: '週末我很晚才起床，好好休息。星期六晚上和朋友出去，玩得很開心！' },
    { speaker: 'Mei', text: 'Beato te! Io il sabato mi addormento sul divano alle dieci.', zh: '真羨慕你！我星期六十點就在沙發上睡著了。' },
  ],
  questions: [
    { q: 'A che ora si sveglia Mei?', a: 'Si sveglia alle sei.', zh: '她六點醒來。' },
    { q: 'Perché Mei si alza presto?', a: 'Perché la sua scuola inizia alle sette e mezza.', zh: '因為她的學校七點半開始。' },
    { q: 'Quando si fa la doccia Luca?', a: 'Si fa la doccia la sera.', zh: '他晚上洗澡。' },
    { q: 'Che cosa fa Luca prima di andare in ufficio?', a: 'Si rade e si mette la giacca.', zh: '他刮鬍子、穿上外套。' },
    { q: 'Che cosa fa Luca il sabato sera?', a: 'Esce con gli amici e si diverte.', zh: '他和朋友出去，玩得很開心。' },
  ],
};

export const itReflexiveReading = {
  id: 'it-r6',
  level: 'A1',
  theme: '反身動詞',
  title: 'La mattina di Paolo e Francesca',
  titleZh: 'Paolo 和 Francesca 的早晨',
  text:
    'Paolo e Francesca abitano a Milano. Ogni mattina {{si svegliano|svegliarsi}} alle sei e mezza. ' +
    'Francesca {{si alza|alzarsi}} subito e prepara il caffè, ma Paolo resta a letto ancora dieci minuti. ' +
    'Poi Paolo {{si fa la doccia|farsi la doccia}} e {{si rade|radersi}}, ma solo una volta ogni due giorni. ' +
    'Francesca invece {{si trucca|truccarsi}} ogni giorno e {{si pettina|pettinarsi}} davanti allo specchio. ' +
    'Paolo non si trucca mai: non è mica una donna! ' +
    'Alle sette e mezza {{si vestono|vestirsi}}. Paolo {{si mette|mettersi}} giacca e cravatta perché lavora in banca. ' +
    'Francesca è insegnante e si mette un vestito comodo. ' +
    'La sera sono stanchi: cenano alle otto, guardano un po\' la televisione e alle undici {{si addormentano|addormentarsi}}. ' +
    'Ma nel fine settimana è diverso: si alzano tardi, vanno al mare e {{si divertono|divertirsi}} con gli amici.',
  vocab: {
    svegliarsi: { lemma: 'svegliarsi', pos: '反身動詞（loro）', zh: '醒來' },
    alzarsi: { lemma: 'alzarsi', pos: '反身動詞（lei）', zh: '起床' },
    'farsi la doccia': { lemma: 'farsi la doccia', pos: '反身動詞片語（lui）', zh: '洗澡（淋浴）' },
    radersi: { lemma: 'radersi', pos: '反身動詞（lui）', zh: '刮鬍子' },
    truccarsi: { lemma: 'truccarsi', pos: '反身動詞（lei）', zh: '化妝' },
    pettinarsi: { lemma: 'pettinarsi', pos: '反身動詞（lei）', zh: '梳頭髮' },
    vestirsi: { lemma: 'vestirsi', pos: '反身動詞（loro）', zh: '穿衣服' },
    mettersi: { lemma: 'mettersi', pos: '反身動詞（lui）', zh: '穿上、戴上' },
    addormentarsi: { lemma: 'addormentarsi', pos: '反身動詞（loro）', zh: '睡著' },
    divertirsi: { lemma: 'divertirsi', pos: '反身動詞（loro）', zh: '玩得開心' },
  },
  questions: [
    {
      type: 'mc',
      q: 'Chi si alza subito?',
      qZh: '誰一醒來就馬上起床？',
      options: ['Paolo', 'Francesca', 'Tutti e due（兩個都是）'],
      answer: 1,
      explain: '「Francesca si alza subito e prepara il caffè, ma Paolo resta a letto ancora dieci minuti.」',
    },
    {
      type: 'tf',
      q: 'Paolo si rade ogni giorno.',
      qZh: 'Paolo 每天刮鬍子。',
      answer: false,
      explain: '他「una volta ogni due giorni」每兩天刮一次。',
    },
    {
      type: 'mc',
      q: 'Perché Paolo si mette giacca e cravatta?',
      qZh: 'Paolo 為什麼穿西裝打領帶？',
      options: ['Perché va a una festa（去派對）', 'Perché lavora in banca（在銀行上班）', 'Perché fa freddo（天氣冷）'],
      answer: 1,
      explain: '「Paolo si mette giacca e cravatta perché lavora in banca.」',
    },
  ],
};

export const itReflexiveExercises = [
  // 講義 5.2（附解答）
  { id: 'it-rf1', level: 'A1', type: 'conjugation', sentence: 'Francesca ___ ogni giorno.', verb: 'truccarsi', answers: ['si trucca'], explain: '主詞 Francesca 是第三人稱單數：si＋trucca。（講義 5.2）' },
  { id: 'it-rf2', level: 'A1', type: 'conjugation', sentence: 'Paolo ___ una volta ogni due giorni.', verb: 'radersi', answers: ['si rade'], explain: 'radersi 是 -ere 動詞：mi rado, ti radi, si rade…（講義 5.2）' },
  { id: 'it-rf3', level: 'A1', type: 'conjugation', sentence: 'Paolo non ___ mai. Non è mica una donna!', verb: 'truccarsi', answers: ['si trucca'], explain: '否定句：non 放在反身代名詞前面 → non si trucca。（講義 5.2）' },
  { id: 'it-rf4', level: 'A1', type: 'conjugation', sentence: 'Gli italiani ___ la doccia la mattina.', verb: 'farsi', answers: ['si fanno'], explain: 'farsi la doccia：fare 不規則，loro → fanno，加上 si → si fanno la doccia。（講義 5.2）' },
  { id: 'it-rf5', level: 'A1', type: 'conjugation', sentence: 'I cinesi ___ la sera prima di andare a letto.', verb: 'lavarsi', answers: ['si lavano'], explain: '主詞 I cinesi 是 loro：si lavano。（講義 5.2）' },
  { id: 'it-rf6', level: 'A1', type: 'conjugation', sentence: '___ giacca e cravatta per andare a lavoro.', verb: 'mettersi，io', answers: ['mi metto'], explain: '中文是「我穿著西裝」，主詞 io：mi metto。（講義 5.2）' },
  // 作業簿其他課的句子
  { id: 'it-rf7', level: 'A1', type: 'conjugation', sentence: 'Noi, di solito, ___ alle sei e andiamo a lavorare verso le otto.', verb: 'alzarsi', answers: ['ci alziamo'], explain: 'noi 的反身代名詞是 ci：ci alziamo。（講義 4.5）' },
  { id: 'it-rf8', level: 'A1', type: 'conjugation', sentence: 'Silvia ___ alle sette e prepara il caffè.', verb: 'alzarsi', answers: ['si alza'], explain: '第三人稱單數：si alza。（講義 8.3）' },
  { id: 'it-rf9', level: 'A1', type: 'conjugation', sentence: 'I bambini ___ alle sette e fanno colazione.', verb: 'svegliarsi', answers: ['si svegliano'], explain: 'loro：si svegliano。注意 svegliarsi 的 tu 是 ti svegli（只有一個 i）。（講義 8.3）' },
  { id: 'it-rf10', level: 'A1', type: 'conjugation', sentence: 'Nel fine settimana ___ molto tardi perché esco tutte le sere!', verb: 'alzarsi，io', answers: ['mi alzo'], explain: 'io：mi alzo。（講義 6.2）' },
  { id: 'it-rf11', level: 'A1', type: 'conjugation', sentence: 'A che ora ___ la mattina?', verb: 'svegliarsi，tu', answers: ['ti svegli'], explain: 'tu：ti svegli（svegli-o → svegl-i，不寫成 sveglii）。（課堂筆記）' },
  { id: 'it-rf12', level: 'A1', type: 'conjugation', sentence: 'Ciao! Io ___ Mei. E tu, come ti chiami?', verb: 'chiamarsi', answers: ['mi chiamo'], explain: '自我介紹最常用的反身動詞：mi chiamo…（我叫…）。（課堂筆記）' },
  {
    id: 'it-rf13', level: 'A1', type: 'choice',
    prompt: '「Paolo 從來不化妝。」哪一句正確？',
    options: ['Paolo si non trucca mai.', 'Paolo non si trucca mai.', 'Paolo si trucca non mai.', 'Non Paolo si trucca mai.'],
    answer: 1,
    explain: '否定詞 non 要放在反身代名詞前面：non si trucca。',
  },
  {
    id: 'it-rf14', level: 'A1', type: 'choice',
    prompt: '「我洗手。」哪一句正確？',
    options: ['Mi lavo le mie mani.', 'Lavo le mani a me.', 'Mi lavo le mani.', 'Lavo me le mani.'],
    answer: 2,
    explain: '反身動詞＋身體部位時，用定冠詞 le，不用所有格 mie：Mi lavo le mani.',
  },
  {
    id: 'it-rf15', level: 'A1', type: 'choice',
    prompt: 'truccarsi（化妝）的 tu 形式是：',
    options: ['ti trucci', 'ti trucchi', 'si trucchi', 'ti trucca'],
    answer: 1,
    explain: '-care 結尾的動詞，遇到 i 要加 h 保留 /k/ 音：ti trucchi、ci trucchiamo。',
  },
  {
    id: 'it-rf16', level: 'A1', type: 'choice',
    prompt: 'Domani devo ___ presto.（明天我得早起）',
    options: ['alzarmi', 'mi alzare', 'alzarsi', 'alzo'],
    answer: 0,
    explain: '情態動詞（dovere、potere、volere）＋反身動詞時，代名詞可接在原形後：devo alzarmi（也可說 mi devo alzare）。代名詞要跟主詞一致，所以不是 alzarsi。',
  },
  {
    id: 'it-rf17', level: 'A1', type: 'choice',
    prompt: '「Chiamo Marco.」和「Mi chiamo Marco.」的意思分別是：',
    options: ['都是「我叫 Marco」', '「我打電話給 Marco」／「我叫 Marco」', '「我叫 Marco」／「我打電話給 Marco」'],
    answer: 1,
    explain: 'chiamare 是「打電話、叫（某人）」；反身的 chiamarsi 才是「名叫」。',
  },
  {
    id: 'it-rf18', level: 'A1', type: 'reorder',
    words: ['Mi', 'sveglio', 'alle', 'sette', 'e', 'mi', 'alzo', 'subito.'],
    zh: '我七點醒來，然後馬上起床。',
    explain: '每個反身動詞前面都要有自己的代名詞：mi sveglio… mi alzo。',
  },
  {
    id: 'it-rf19', level: 'A1', type: 'reorder',
    words: ['Come', 'si', 'chiama', 'tua', 'sorella?'],
    zh: '你妹妹叫什麼名字？',
    explain: '問第三人稱的名字：Come si chiama…? 親屬名詞單數前的所有格不加冠詞：tua sorella。',
  },
  {
    id: 'it-rf20', level: 'A2', type: 'conjugation',
    sentence: 'Stamattina Giulia ___ alle sei.',
    verb: 'alzarsi，近過去時',
    answers: ['si è alzata'],
    explain: '反身動詞的近過去時用 essere 當助動詞，過去分詞配合主詞：Giulia 是陰性 → si è alzata。',
  },
];

export const itReflexiveVocab = {
  'it-d7': [
    ['早上 La mattina', [
      ['svegliarsi', '醒來'],
      ['alzarsi', '起床'],
      ['farsi la doccia', '洗澡（淋浴）'],
      ['lavarsi i denti', '刷牙'],
      ['vestirsi', '穿衣服'],
      ['fare colazione', '吃早餐'],
    ]],
    ['晚上與週末 La sera e il weekend', [
      ['riposarsi', '休息'],
      ['divertirsi', '玩得開心'],
      ['addormentarsi', '睡著'],
      ['andare a letto', '上床睡覺'],
      ['Beato te!', '真羨慕你！'],
    ]],
  ],
  'it-r6': [
    ['梳妝 Prepararsi', [
      ['truccarsi', '化妝'],
      ['pettinarsi', '梳頭髮'],
      ['radersi', '刮鬍子'],
      ['mettersi la giacca', '穿上外套'],
      ['lo specchio', '鏡子'],
    ]],
    ['頻率 Quanto spesso', [
      ['ogni giorno', '每天'],
      ['una volta ogni due giorni', '每兩天一次'],
      ['di solito', '通常'],
      ['non… mai', '從不'],
    ]],
  ],
};
