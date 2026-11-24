/**
 * 西班牙文學習資料
 * ------------------------------------------------------------
 * 擴充方式：直接在 dialogues / readings / exercises 陣列中新增物件即可。
 * level 可為 'A1' | 'A2' | 'B1'。
 *
 * 文章標記語法：{{顯示文字}} 或 {{顯示文字|vocab鍵值}}
 *   被標記的字會高亮，並從 vocab 物件中取出詞性、原形與中文解釋。
 *
 * 題型：
 *   conjugation：動詞變位填空（answers 可放多個可接受答案）
 *   choice     ：單字／文法選擇題（answer 為正確選項的 index）
 *   reorder    ：句子重組（words 為「正確順序」，畫面上會自動打亂）
 *
 * 內容來源：
 *   - 講義「西文A1旅遊對話：解答＋動詞變化＋過去式與進行式」→ spanish-a1-travel.js
 * 雲端硬碟：
 *   - 共用資料夾「Jo要學西文」：
 *       「5. Saber vs. Conocer.pdf」→ 題庫 es-e19~e21, es-e23, es-e26, es-e27
 *       「6&7. Ser vs. Estar.pdf」  → 題庫 es-e16~e18, es-e22, es-e24, es-e25
 *   - 「Espanol」資料夾（《圖解基礎西班牙語》《圖解西語王》《帶著西語去旅行》、Español Eco）
 *     透過 API 看不到任何檔案，對話與文章依這些書的主題（基礎、旅行）自行撰寫。
 */

import { travelDialogues, travelExercises, verbs } from './spanish-a1-travel.js';
import { esTimeDialogues } from './travel-time.js';

const spanish = {
  meta: {
    code: 'es',
    name: 'Español',
    nameZh: '西班牙文',
    speechLang: 'es-ES',
    flag: '🇪🇸',
  },

  dialogues: [
    {
      id: 'es-d1',
      level: 'A1',
      title: 'En un bar de tapas',
      titleZh: '在小吃酒吧點餐',
      scene: '點餐',
      lines: [
        { speaker: 'Camarero', text: '¡Hola, buenas tardes! ¿Qué van a tomar?', zh: '你們好，午安！要喝點什麼？' },
        { speaker: 'Lucía', text: 'Hola. Para mí, una caña, por favor.', zh: '你好。我要一杯生啤酒，麻煩了。' },
        { speaker: 'Pablo', text: 'Yo quiero un agua sin gas.', zh: '我要一瓶無氣泡礦泉水。' },
        { speaker: 'Camarero', text: 'Muy bien. ¿Y para comer?', zh: '好的。那吃的呢？' },
        { speaker: 'Lucía', text: 'Una ración de patatas bravas y una tortilla española.', zh: '一份辣醬馬鈴薯和一份西班牙烘蛋。' },
        { speaker: 'Pablo', text: '¿Tienen jamón ibérico?', zh: '你們有伊比利火腿嗎？' },
        { speaker: 'Camarero', text: 'Sí, claro. Está muy bueno.', zh: '當然有，非常好吃。' },
        { speaker: 'Pablo', text: 'Entonces, media ración de jamón, por favor.', zh: '那請給我半份火腿。' },
        { speaker: 'Lucía', text: '¿Nos trae la cuenta, por favor?', zh: '可以給我們帳單嗎？' },
        { speaker: 'Camarero', text: 'Claro. Son veintidós euros.', zh: '好的，一共二十二歐元。' },
      ],
    },
    {
      id: 'es-d2',
      level: 'A2',
      title: 'Preguntar el camino en Madrid',
      titleZh: '在馬德里問路',
      scene: '問路',
      lines: [
        { speaker: 'Turista', text: 'Perdone, ¿sabe dónde está el Museo del Prado?', zh: '不好意思，請問您知道普拉多美術館在哪裡嗎？' },
        { speaker: 'Señora', text: 'Sí, no está lejos. Siga todo recto por esta calle.', zh: '知道，不遠。沿著這條街一直往前走。' },
        { speaker: 'Turista', text: '¿Todo recto? ¿Y después?', zh: '一直走？然後呢？' },
        { speaker: 'Señora', text: 'Cuando llegue a la plaza, gire a la derecha.', zh: '到了廣場之後，向右轉。' },
        { speaker: 'Turista', text: '¿Se puede ir andando?', zh: '可以走路過去嗎？' },
        { speaker: 'Señora', text: 'Sí, está a unos diez minutos a pie.', zh: '可以，走路大約十分鐘。' },
        { speaker: 'Turista', text: '¿Hay una estación de metro cerca?', zh: '附近有地鐵站嗎？' },
        { speaker: 'Señora', text: 'Sí, la estación de Atocha está muy cerca del museo.', zh: '有，阿托查車站離美術館很近。' },
        { speaker: 'Turista', text: 'Muchas gracias por su ayuda.', zh: '非常感謝您的幫忙。' },
        { speaker: 'Señora', text: 'De nada. ¡Que disfrute de la visita!', zh: '不客氣，祝您參觀愉快！' },
      ],
    },
    {
      id: 'es-d3',
      level: 'B1',
      title: 'En una tienda de ropa',
      titleZh: '在服飾店購物',
      scene: '購物',
      lines: [
        { speaker: 'Dependienta', text: 'Buenos días, ¿le puedo ayudar en algo?', zh: '早安，有什麼需要幫忙的嗎？' },
        { speaker: 'Cliente', text: 'Sí, estoy buscando una chaqueta para el invierno.', zh: '有，我在找一件冬天穿的外套。' },
        { speaker: 'Dependienta', text: '¿Qué talla usa?', zh: '您穿什麼尺寸？' },
        { speaker: 'Cliente', text: 'Normalmente uso la M, pero depende de la marca.', zh: '我通常穿 M，但要看品牌。' },
        { speaker: 'Dependienta', text: 'Esta de lana está rebajada un treinta por ciento. ¿Quiere probársela?', zh: '這件羊毛外套打七折。您要試穿看看嗎？' },
        { speaker: 'Cliente', text: 'Sí, ¿dónde están los probadores?', zh: '好，試衣間在哪裡？' },
        { speaker: 'Dependienta', text: 'Al fondo, a la izquierda.', zh: '在最裡面的左手邊。' },
        { speaker: 'Cliente', text: 'Me queda un poco grande. ¿La tienen en una talla menos?', zh: '我穿有點大。有小一號的嗎？' },
        { speaker: 'Dependienta', text: 'Lo siento, de ese color ya no nos queda. Si quiere, se la pido y le llega en dos días.', zh: '抱歉，那個顏色已經沒貨了。如果您願意，我可以幫您訂，兩天後到貨。' },
        { speaker: 'Cliente', text: 'Vale, me parece bien. ¿Puedo pagar con tarjeta?', zh: '好，沒問題。我可以刷卡嗎？' },
        { speaker: 'Dependienta', text: 'Por supuesto.', zh: '當然可以。' },
      ],
    },
    {
      id: 'es-d4',
      level: 'A1',
      title: 'Encantado de conocerte',
      titleZh: '認識新朋友',
      scene: '自我介紹',
      lines: [
        { speaker: 'Ana', text: '¡Hola! ¿Cómo te llamas?', zh: '你好！你叫什麼名字？' },
        { speaker: 'Wei', text: 'Hola, me llamo Wei. ¿Y tú?', zh: '你好，我叫偉。你呢？' },
        { speaker: 'Ana', text: 'Yo soy Ana. ¿De dónde eres?', zh: '我是安娜。你是哪裡人？' },
        { speaker: 'Wei', text: 'Soy de Taiwán, de Taipéi.', zh: '我來自台灣，台北。' },
        { speaker: 'Ana', text: '¡Qué interesante! ¿Qué haces en Madrid?', zh: '好有趣！你在馬德里做什麼？' },
        { speaker: 'Wei', text: 'Estudio español en una academia.', zh: '我在一間語言學校學西班牙文。' },
        { speaker: 'Ana', text: 'Hablas muy bien. ¿Cuántos años tienes?', zh: '你說得很好。你幾歲？' },
        { speaker: 'Wei', text: 'Tengo veinticinco años. ¿Y tú?', zh: '我二十五歲。你呢？' },
        { speaker: 'Ana', text: 'Yo tengo veintiocho. Soy profesora de inglés.', zh: '我二十八歲，是英文老師。' },
        { speaker: 'Wei', text: '¡Encantado de conocerte, Ana!', zh: '很高興認識你，安娜！' },
        { speaker: 'Ana', text: '¡Igualmente!', zh: '我也是！' },
      ],
    },
    {
      id: 'es-d5',
      level: 'A2',
      title: 'En la recepción del hotel',
      titleZh: '飯店入住',
      scene: '住宿',
      lines: [
        { speaker: 'Recepcionista', text: 'Buenas noches, bienvenido al Hotel Sol. ¿En qué puedo ayudarle?', zh: '晚安，歡迎來到太陽飯店。有什麼可以為您服務的？' },
        { speaker: 'Cliente', text: 'Buenas noches. Tengo una reserva a nombre de Lin.', zh: '晚安。我有用「林」的名字訂房。' },
        { speaker: 'Recepcionista', text: 'Un momento… Sí, una habitación doble para tres noches. ¿Me deja su pasaporte, por favor?', zh: '請稍等……有的，雙人房住三晚。可以給我您的護照嗎？' },
        { speaker: 'Cliente', text: 'Aquí tiene. ¿El desayuno está incluido?', zh: '在這裡。有含早餐嗎？' },
        { speaker: 'Recepcionista', text: 'Sí, se sirve de siete a diez en el comedor de la primera planta.', zh: '有，早上七點到十點在二樓餐廳供應（西班牙的 primera planta 是台灣的二樓）。' },
        { speaker: 'Cliente', text: 'Perfecto. ¿Hay wifi en la habitación?', zh: '太好了。房間有 wifi 嗎？' },
        { speaker: 'Recepcionista', text: 'Sí, la contraseña está en esta tarjeta. Su habitación es la 305, en la tercera planta.', zh: '有，密碼在這張卡片上。您的房間是 305，在四樓。' },
        { speaker: 'Cliente', text: '¿A qué hora tengo que dejar la habitación?', zh: '我幾點要退房？' },
        { speaker: 'Recepcionista', text: 'Antes de las doce. Si necesita algo, llame a recepción.', zh: '十二點以前。如果需要任何東西，請打電話到櫃台。' },
        { speaker: 'Cliente', text: 'Muchas gracias.', zh: '非常感謝。' },
        { speaker: 'Recepcionista', text: 'A usted. ¡Que descanse!', zh: '不客氣，祝您好好休息！' },
      ],
    },
    {
      id: 'es-d6',
      level: 'B1',
      title: 'En la consulta del médico',
      titleZh: '看醫生',
      scene: '就醫',
      lines: [
        { speaker: 'Médica', text: 'Buenos días, siéntese. ¿Qué le pasa?', zh: '早安，請坐。您哪裡不舒服？' },
        { speaker: 'Paciente', text: 'Desde hace tres días me duele mucho la garganta y tengo tos.', zh: '三天前開始喉嚨很痛，而且咳嗽。' },
        { speaker: 'Médica', text: '¿Ha tenido fiebre?', zh: '有發燒嗎？' },
        { speaker: 'Paciente', text: 'Sí, anoche tenía treinta y ocho grados.', zh: '有，昨晚三十八度。' },
        { speaker: 'Médica', text: 'Vamos a ver… Abra la boca, por favor. Tiene la garganta bastante inflamada.', zh: '我看看……請張開嘴巴。您的喉嚨相當發炎。' },
        { speaker: 'Paciente', text: '¿Es algo grave?', zh: '嚴重嗎？' },
        { speaker: 'Médica', text: 'No se preocupe, es una infección leve. Le voy a recetar un jarabe y unas pastillas.', zh: '別擔心，是輕微感染。我開糖漿和一些藥片給您。' },
        { speaker: 'Paciente', text: '¿Cada cuánto tengo que tomar las pastillas?', zh: '藥片多久要吃一次？' },
        { speaker: 'Médica', text: 'Una cada ocho horas, después de comer, durante cinco días.', zh: '每八小時一顆，飯後吃，連續五天。' },
        { speaker: 'Paciente', text: '¿Puedo ir a trabajar mañana?', zh: '我明天可以去上班嗎？' },
        { speaker: 'Médica', text: 'Es mejor que descanse un par de días y que beba mucha agua.', zh: '最好休息個兩天，並多喝水。' },
        { speaker: 'Paciente', text: 'Entendido. Muchas gracias, doctora.', zh: '了解。非常感謝，醫生。' },
      ],
    },
  ],

  readings: [
    {
      id: 'es-r1',
      level: 'A1',
      theme: '生活作息',
      title: 'Los horarios en España',
      titleZh: '西班牙人的作息',
      text:
        'En España, los horarios son diferentes. Por la mañana, mucha gente toma un {{café}} con leche y una tostada. ' +
        'A las dos o a las tres de la tarde, la familia come junta. La {{comida}} es la comida más importante del día. ' +
        'Por la tarde, algunas tiendas {{cierran}} unas horas y muchas personas {{descansan}} un poco: es la famosa siesta. ' +
        'La {{cena}} es muy tarde, a las nueve o a las diez de la noche, y muchos restaurantes no sirven cenas antes de las ocho. ' +
        'Los fines de semana, los españoles {{salen}} con sus amigos y pasean por la calle. ¡Las ciudades tienen mucha vida por la noche! Si visitas España, adapta tu reloj a su ritmo.',
      vocab: {
        café: { lemma: 'café', pos: '名詞 (m.)', zh: '咖啡' },
        comida: { lemma: 'comida', pos: '名詞 (f.)', zh: '午餐；（泛指）食物、一餐' },
        cierran: { lemma: 'cerrar', pos: '動詞（現在式 ellos）', zh: '關門、關閉（e→ie 變位）' },
        descansan: { lemma: 'descansar', pos: '動詞（現在式 ellos）', zh: '休息' },
        cena: { lemma: 'cena', pos: '名詞 (f.)', zh: '晚餐' },
        salen: { lemma: 'salir', pos: '動詞（現在式 ellos）', zh: '出門、外出' },
      },
      questions: [
        {
          type: 'tf',
          q: 'En España, la cena es normalmente a las siete.',
          qZh: '在西班牙，晚餐通常在晚上七點。',
          answer: false,
          explain: '文中提到晚餐很晚，大約在晚上九點或十點（a las nueve o a las diez de la noche）。',
        },
        {
          type: 'mc',
          q: '¿Cuál es la comida más importante del día?',
          qZh: '一天中最重要的一餐是哪一餐？',
          options: ['El desayuno（早餐）', 'La comida（午餐）', 'La cena（晚餐）'],
          answer: 1,
          explain: '「La comida es la comida más importante del día.」在西班牙 la comida 特指下午兩、三點的午餐。',
        },
        {
          type: 'tf',
          q: 'Algunas tiendas cierran unas horas por la tarde.',
          qZh: '有些商店下午會暫停營業幾個小時。',
          answer: true,
          explain: '「Por la tarde, algunas tiendas cierran unas horas」—— 這就是午睡（siesta）的時段。',
        },
      ],
    },
    {
      id: 'es-r2',
      level: 'A2',
      theme: '飲食文化',
      title: 'Ir de tapas',
      titleZh: '吃 Tapas 的文化',
      text:
        'Ir de tapas es una costumbre muy {{típica}} de España. Una tapa es una porción pequeña de comida que se sirve con una bebida. ' +
        'En algunas ciudades, como Granada, las tapas son {{gratis}} cuando pides una caña o un vino. ' +
        'Los españoles no {{suelen}} quedarse en un solo bar: {{prefieren}} ir de un bar a otro con sus amigos y probar platos diferentes. ' +
        'Las tapas más populares son las patatas bravas, la tortilla, las croquetas y el jamón. ' +
        'La palabra «tapa» viene del verbo {{tapar}}: antiguamente se ponía un trozo de pan o de jamón encima del vaso para taparlo y evitar las moscas. ' +
        'Hoy, ir de tapas es sobre todo una forma de {{compartir}} tiempo con otras personas.',
      vocab: {
        típica: { lemma: 'típico', pos: '形容詞（陰性）', zh: '典型的、具代表性的' },
        gratis: { lemma: 'gratis', pos: '形容詞／副詞', zh: '免費的' },
        suelen: { lemma: 'soler', pos: '動詞（現在式 ellos）', zh: '通常、習慣做…（後接原形動詞，o→ue）' },
        prefieren: { lemma: 'preferir', pos: '動詞（現在式 ellos）', zh: '比較喜歡、偏好（e→ie）' },
        tapar: { lemma: 'tapar', pos: '動詞（原形）', zh: '蓋住、遮蓋' },
        compartir: { lemma: 'compartir', pos: '動詞（原形）', zh: '分享、共度' },
      },
      questions: [
        {
          type: 'mc',
          q: 'En Granada, ¿cuándo son gratis las tapas?',
          qZh: '在格拉納達，什麼時候 tapas 是免費的？',
          options: ['Los fines de semana（週末）', 'Cuando pides una bebida（點飲料時）', 'Por la mañana（早上）'],
          answer: 1,
          explain: '「las tapas son gratis cuando pides una caña o un vino」—— 點一杯啤酒或葡萄酒就附贈。',
        },
        {
          type: 'tf',
          q: 'Los españoles normalmente se quedan toda la noche en el mismo bar.',
          qZh: '西班牙人通常整晚待在同一家酒吧。',
          answer: false,
          explain: '文中說他們「no suelen quedarse en un solo bar」，而是一家接一家地吃（ir de un bar a otro）。',
        },
        {
          type: 'mc',
          q: '¿De qué verbo viene la palabra «tapa»?',
          qZh: '「tapa」這個字來自哪個動詞？',
          options: ['tomar', 'tapar', 'tocar'],
          answer: 1,
          explain: 'tapa 源自 tapar（蓋住）：以前會在杯子上放一片麵包或火腿來擋蒼蠅。',
        },
      ],
    },
    {
      id: 'es-r3',
      level: 'B1',
      theme: '旅遊',
      title: 'El Camino de Santiago',
      titleZh: '聖雅各朝聖之路',
      text:
        'Cada año, cientos de miles de personas de todo el mundo recorren el Camino de Santiago, una ruta de {{peregrinación}} que termina en la catedral de Santiago de Compostela, en Galicia. ' +
        'Aunque su origen es religioso, hoy en día los {{peregrinos|peregrino}} lo hacen por motivos muy distintos: algunos buscan un reto deportivo; otros quieren desconectar de la rutina o conocer gente nueva. ' +
        'La ruta más conocida es el Camino Francés, que {{atraviesa}} el norte de España a lo largo de unos ochocientos kilómetros. ' +
        'Por el camino, los caminantes duermen en {{albergues|albergue}} sencillos y económicos. ' +
        'Para obtener la «Compostela», el certificado oficial, es necesario haber recorrido {{al menos}} los últimos cien kilómetros a pie. ' +
        'Muchos dicen que lo más importante no es llegar, sino la experiencia del {{viaje}}: los paisajes, las conversaciones y la sensación de {{superarse}} cada día.',
      vocab: {
        peregrinación: { lemma: 'peregrinación', pos: '名詞 (f.)', zh: '朝聖' },
        peregrino: { lemma: 'peregrino', pos: '名詞 (m.)', zh: '朝聖者（文中為複數 peregrinos）' },
        atraviesa: { lemma: 'atravesar', pos: '動詞（現在式 él/ella）', zh: '穿越、橫越（e→ie）' },
        albergue: { lemma: 'albergue', pos: '名詞 (m.)', zh: '庇護所、簡易旅舍（文中為複數）' },
        'al menos': { lemma: 'al menos', pos: '片語', zh: '至少' },
        viaje: { lemma: 'viaje', pos: '名詞 (m.)', zh: '旅程、旅行' },
        superarse: { lemma: 'superarse', pos: '反身動詞', zh: '超越自我、突破自己' },
      },
      questions: [
        {
          type: 'mc',
          q: '¿Cuántos kilómetros hay que recorrer como mínimo para obtener la Compostela?',
          qZh: '至少要走多少公里才能取得 Compostela 證書？',
          options: ['50 km', '100 km', '800 km'],
          answer: 1,
          explain: '「es necesario haber recorrido al menos los últimos cien kilómetros a pie」—— 至少徒步最後 100 公里。',
        },
        {
          type: 'tf',
          q: 'Hoy en día todos los peregrinos hacen el Camino por motivos religiosos.',
          qZh: '現在所有朝聖者都是出於宗教原因走這條路。',
          answer: false,
          explain: '文中提到雖然起源是宗教，但如今動機「muy distintos」：運動挑戰、逃離日常、認識新朋友等。',
        },
        {
          type: 'mc',
          q: '¿Cuánto mide aproximadamente el Camino Francés?',
          qZh: '法國之路大約多長？',
          options: ['Unos 100 km', 'Unos 300 km', 'Unos 800 km'],
          answer: 2,
          explain: '「a lo largo de unos ochocientos kilómetros」—— 約 800 公里。',
        },
      ],
    },
    {
      id: 'es-r4',
      level: 'A1',
      theme: '家庭',
      title: 'Mi familia',
      titleZh: '我的家人',
      text:
        'Me llamo Carmen y vivo en Sevilla con mi familia. Somos cinco personas. Mi {{padre}} se llama Antonio y es médico. ' +
        'Mi {{madre}}, Lucía, es profesora en un colegio. Tengo dos {{hermanos|hermano}}: Pablo tiene doce años y Marta tiene diecisiete. ' +
        'Yo tengo veinte años y estudio en la universidad. También tenemos un perro muy simpático que se llama Toby. ' +
        'Los domingos comemos en casa de mis {{abuelos|abuelo}}, que viven en un pueblo cerca de Sevilla. ' +
        'Mi abuela {{cocina}} muy bien: su gazpacho es el mejor del mundo. Después de comer, mi abuelo y mi hermano juegan a las cartas. ' +
        'Me {{gusta}} mucho pasar tiempo con mi familia.',
      vocab: {
        padre: { lemma: 'padre', pos: '名詞 (m.)', zh: '父親' },
        madre: { lemma: 'madre', pos: '名詞 (f.)', zh: '母親' },
        hermano: { lemma: 'hermano', pos: '名詞 (m.)', zh: '兄弟（複數 hermanos 可泛指兄弟姊妹）' },
        abuelo: { lemma: 'abuelo', pos: '名詞 (m.)', zh: '祖父、外祖父（複數 abuelos = 祖父母）' },
        cocina: { lemma: 'cocinar', pos: '動詞（現在式 él/ella）', zh: '做菜、烹飪' },
        gusta: { lemma: 'gustar', pos: '動詞（現在式 3 單）', zh: '喜歡（me gusta + 事物／原形動詞）' },
      },
      questions: [
        {
          type: 'mc',
          q: '¿Cuántas personas hay en la familia de Carmen?',
          qZh: 'Carmen 家有幾個人？',
          options: ['Tres', 'Cinco', 'Siete'],
          answer: 1,
          explain: '「Somos cinco personas.」—— 父母、Carmen 和兩個兄弟姊妹，共五人。',
        },
        {
          type: 'tf',
          q: 'Carmen tiene un gato.',
          qZh: 'Carmen 家養了一隻貓。',
          answer: false,
          explain: '他們養的是一隻狗（un perro）Toby。',
        },
        {
          type: 'mc',
          q: '¿Qué hace la familia los domingos?',
          qZh: '這家人星期天做什麼？',
          options: ['Va a la playa（去海邊）', 'Come en casa de los abuelos（去祖父母家吃飯）', 'Juega al fútbol（踢足球）'],
          answer: 1,
          explain: '「Los domingos comemos en casa de mis abuelos」。',
        },
      ],
    },
    {
      id: 'es-r5',
      level: 'A2',
      theme: '節慶',
      title: 'Las Fallas de Valencia',
      titleZh: '瓦倫西亞火節',
      text:
        'Cada año, del quince al diecinueve de marzo, Valencia celebra las Fallas, una de las {{fiestas|fiesta}} más famosas de España. ' +
        'Durante meses, los artistas de cada barrio construyen enormes figuras de cartón y madera llamadas «ninots». ' +
        'Muchas son {{divertidas|divertido}} y critican a políticos o a personajes famosos. ' +
        'Durante la fiesta, las calles se llenan de música, flores y {{petardos|petardo}}. ' +
        'Todos los días a las dos de la tarde hay una «mascletà» en la plaza del Ayuntamiento: un espectáculo de petardos muy ruidoso. ' +
        'La última noche, la «Cremà», los valencianos {{queman}} casi todas las figuras. ' +
        'Solo se {{salva}} un ninot, elegido por votación popular, que se guarda en un museo. ' +
        'Es una noche mágica, pero también un poco triste, porque el trabajo de todo un año {{desaparece}} en pocos minutos.',
      vocab: {
        fiesta: { lemma: 'fiesta', pos: '名詞 (f.)', zh: '節慶、派對（文中為複數）' },
        divertido: { lemma: 'divertido', pos: '形容詞', zh: '有趣的、好笑的（文中為陰性複數）' },
        petardo: { lemma: 'petardo', pos: '名詞 (m.)', zh: '鞭炮（文中為複數）' },
        queman: { lemma: 'quemar', pos: '動詞（現在式 ellos）', zh: '燒、焚燒' },
        salva: { lemma: 'salvarse', pos: '反身動詞（現在式 3 單）', zh: '倖免、被保留下來' },
        desaparece: { lemma: 'desaparecer', pos: '動詞（現在式 3 單）', zh: '消失' },
      },
      questions: [
        {
          type: 'mc',
          q: '¿Cuándo se celebran las Fallas?',
          qZh: '火節在什麼時候舉行？',
          options: ['En enero', 'En marzo', 'En agosto'],
          answer: 1,
          explain: '「del quince al diecinueve de marzo」—— 每年三月十五日到十九日。',
        },
        {
          type: 'tf',
          q: 'Los valencianos queman todas las figuras sin excepción.',
          qZh: '瓦倫西亞人會把所有人偶全部燒掉，沒有例外。',
          answer: false,
          explain: '「Solo se salva un ninot」—— 有一個由民眾票選的人偶會保留下來，收藏在博物館。',
        },
        {
          type: 'mc',
          q: '¿Qué es la «mascletà»?',
          qZh: '「mascletà」是什麼？',
          options: ['Un desfile de flores（花車遊行）', 'Un espectáculo de petardos（鞭炮表演）', 'Un museo（博物館）'],
          answer: 1,
          explain: '「un espectáculo de petardos muy ruidoso」—— 每天下午兩點在市政廳廣場的鞭炮秀。',
        },
      ],
    },
  ],

  exercises: [
    // ---------- A1 ----------
    {
      id: 'es-e1',
      level: 'A1',
      type: 'conjugation',
      sentence: 'Yo ___ español con mis amigos.',
      verb: 'hablar',
      answers: ['hablo'],
      explain: '-ar 規則動詞現在式：去掉 -ar，主詞 yo 加 -o → hablo。完整變位：hablo, hablas, habla, hablamos, habláis, hablan。',
    },
    {
      id: 'es-e2',
      level: 'A1',
      type: 'conjugation',
      sentence: 'Nosotros ___ estudiantes de español.',
      verb: 'ser',
      answers: ['somos'],
      explain: 'ser 是不規則動詞：soy, eres, es, somos, sois, son。表示身分、職業時用 ser。',
    },
    {
      id: 'es-e3',
      level: 'A1',
      type: 'choice',
      prompt: '在餐廳想要「帳單」，應該說：¿Me trae ___, por favor?',
      options: ['la carta', 'la cuenta', 'la mesa', 'el camarero'],
      answer: 1,
      explain: 'la cuenta = 帳單；la carta = 菜單；la mesa = 桌子；el camarero = 服務生。',
    },
    {
      id: 'es-e4',
      level: 'A1',
      type: 'choice',
      prompt: '早上見面打招呼：«Buenos ___»',
      options: ['días', 'tardes', 'noches'],
      answer: 0,
      explain: 'Buenos días（早安）用於中午前；Buenas tardes（午安）用於下午到傍晚；Buenas noches（晚安）用於晚上。注意 día 是陽性，所以用 buenos。',
    },
    {
      id: 'es-e5',
      level: 'A1',
      type: 'reorder',
      words: ['Me', 'llamo', 'Ana', 'y', 'soy', 'de', 'Taiwán.'],
      zh: '我叫安娜，我來自台灣。',
      explain: 'llamarse（叫做）是反身動詞：me llamo, te llamas, se llama…。「ser de + 地方」表示來自哪裡。',
    },
    // ---------- A2 ----------
    {
      id: 'es-e6',
      level: 'A2',
      type: 'conjugation',
      sentence: 'Ellos ___ dos hijos.',
      verb: 'tener',
      answers: ['tienen'],
      explain: 'tener 為 e→ie 母音變化動詞，且 yo 形式不規則：tengo, tienes, tiene, tenemos, tenéis, tienen。',
    },
    {
      id: 'es-e7',
      level: 'A2',
      type: 'conjugation',
      sentence: '¿Tú ___ un café?',
      verb: 'querer',
      answers: ['quieres'],
      explain: 'querer 為 e→ie 母音變化動詞：quiero, quieres, quiere, queremos, queréis, quieren（nosotros / vosotros 不變音）。',
    },
    {
      id: 'es-e8',
      level: 'A2',
      type: 'choice',
      prompt: 'Hoy María ___ muy cansada.',
      options: ['es', 'está', 'hay'],
      answer: 1,
      explain: 'estar 用於暫時的狀態或感受（累、生病、心情）；ser 用於本質、身分等較持久的特質。「今天很累」是暫時狀態，所以用 está。',
    },
    {
      id: 'es-e9',
      level: 'A2',
      type: 'reorder',
      words: ['¿Dónde', 'está', 'la', 'estación', 'de', 'metro?'],
      zh: '地鐵站在哪裡？',
      explain: '疑問詞 dónde 放句首並加重音符號；詢問位置用 estar。西文疑問句前後都要有問號 ¿ ?。',
    },
    {
      id: 'es-e10',
      level: 'A2',
      type: 'choice',
      prompt: 'Ayer ___ al cine con mis amigos.',
      options: ['voy', 'fui', 'iré'],
      answer: 1,
      explain: 'ayer（昨天）表示過去已完成的動作，用簡單過去式（pretérito indefinido）。ir 的過去式不規則：fui, fuiste, fue, fuimos, fuisteis, fueron。',
    },
    // ---------- B1 ----------
    {
      id: 'es-e11',
      level: 'B1',
      type: 'conjugation',
      sentence: 'Ayer nosotros ___ en un restaurante italiano.',
      verb: 'comer',
      answers: ['comimos'],
      explain: '-er 動詞簡單過去式：comí, comiste, comió, comimos, comisteis, comieron。注意 nosotros 形式 -imos 與現在式 comemos 不同。',
    },
    {
      id: 'es-e12',
      level: 'B1',
      type: 'conjugation',
      sentence: 'Cuando era niño, ___ en Sevilla.',
      verb: 'vivir, yo',
      answers: ['vivía'],
      explain: '描述過去的習慣或背景用未完成過去式（imperfecto）。-ir 動詞：vivía, vivías, vivía, vivíamos, vivíais, vivían。',
    },
    {
      id: 'es-e13',
      level: 'B1',
      type: 'choice',
      prompt: 'Espero que tú ___ bien.',
      options: ['estás', 'estés', 'estar'],
      answer: 1,
      explain: '表達希望、願望的 esperar que 後接虛擬式（subjuntivo）。estar 的虛擬式現在式：esté, estés, esté, estemos, estéis, estén。',
    },
    {
      id: 'es-e14',
      level: 'B1',
      type: 'reorder',
      words: ['Si', 'tengo', 'tiempo,', 'viajaré', 'a', 'México.'],
      zh: '如果我有時間，我會去墨西哥旅行。',
      explain: '真實條件句：「Si + 現在式, 未來式」。表示有可能實現的條件。',
    },
    {
      id: 'es-e15',
      level: 'B1',
      type: 'choice',
      prompt: 'Este regalo es ___ ti.',
      options: ['por', 'para'],
      answer: 1,
      explain: 'para 表示目的、對象或接受者（給你的禮物）；por 表示原因、經由、交換或代替。',
    },

    // ---------- 雲端硬碟講義：Ser vs. Estar ----------
    {
      id: 'es-e16',
      level: 'A1',
      type: 'choice',
      prompt: 'Juan ___ triste.',
      options: ['es', 'está'],
      answer: 1,
      explain: '情緒狀態、身體狀況用 estar：Estoy contenta（我很開心）、Juan está triste（Juan 很傷心）、¿Estás cansado?（你累了嗎？）。',
    },
    {
      id: 'es-e17',
      level: 'A1',
      type: 'choice',
      prompt: 'Mis amigos ___ profesores.',
      options: ['son', 'están'],
      answer: 0,
      explain: '職業用 ser：Soy estudiante、Pablo es programador、Mis amigos son profesores。名字、國籍、個性也用 ser。',
    },
    {
      id: 'es-e18',
      level: 'A1',
      type: 'reorder',
      words: ['Esta', 'mesa', 'es', 'de', 'madera.'],
      zh: '這張桌子是木頭做的。',
      explain: '材質用「ser de + 材料」：La silla es de plástico（這張椅子是塑膠做的）。',
    },
    // ---------- 雲端硬碟講義：Saber vs. Conocer ----------
    {
      id: 'es-e19',
      level: 'A2',
      type: 'conjugation',
      sentence: 'No ___ a Juan.',
      verb: 'conocer, yo',
      answers: ['conozco'],
      explain: '「conocer + a + 人」表示認識某人。conocer 的 yo 形式不規則：conozco, conoces, conoce, conocemos, conocéis, conocen。',
    },
    {
      id: 'es-e20',
      level: 'A2',
      type: 'conjugation',
      sentence: '¿___ tocar la guitarra?',
      verb: 'saber, tú',
      answers: ['sabes'],
      explain: '「saber + 原形動詞」表示會不會做某事、有沒有這個能力：No sé cocinar（我不會做菜）、Sabemos cantar（我們會唱歌）。',
    },
    {
      id: 'es-e21',
      level: 'A2',
      type: 'conjugation',
      sentence: 'No ___ quién es Marcos.',
      verb: 'saber, yo',
      answers: ['sé'],
      explain: '「saber + 疑問詞（qué, dónde, quién, cómo…）」表示知道某件事。saber 的 yo 形式不規則：sé（要加重音，以區別代名詞 se）。',
    },
    {
      id: 'es-e22',
      level: 'A2',
      type: 'choice',
      prompt: 'El concierto ___ en la Taipéi Arena.',
      options: ['está', 'es'],
      answer: 1,
      explain: '一般地點、位置用 estar（Estoy en Taiwán），但「活動或事件舉行的地點」是例外，要用 ser：La boda es en España（婚禮在西班牙舉行）。',
    },
    {
      id: 'es-e23',
      level: 'A2',
      type: 'choice',
      prompt: '¿___ usted el sur de Taiwán?（您去過／知道台灣南部嗎？）',
      options: ['Sabe', 'Conoce'],
      answer: 1,
      explain: '「conocer + 地方」表示知道、去過某個地方：Conozco París、Conocemos Barcelona。對地方、人、事物的熟悉用 conocer。',
    },
    {
      id: 'es-e24',
      level: 'B1',
      type: 'choice',
      prompt: 'Mi novio ___ muy guapo hoy.（今天有特別打扮）',
      options: ['es', 'está'],
      answer: 1,
      explain: 'ser 與 estar 都能接 guapo，但意思不同：Mi novio es guapo（天生帥）；Mi novio está guapo hoy（今天特別帥）。',
    },
    {
      id: 'es-e25',
      level: 'B1',
      type: 'choice',
      prompt: 'Ya podemos salir: ___ listos.',
      options: ['somos', 'estamos'],
      answer: 1,
      explain: '有些形容詞搭配 ser 與 estar 意思完全不同：ser listo = 聰明；estar listo = 準備好了。同理 ser aburrido = 很無聊的人；estar aburrido = 感到無聊。',
    },
    {
      id: 'es-e26',
      level: 'B1',
      type: 'conjugation',
      sentence: 'Hoy ___ a la novia de mi amigo.',
      verb: 'conocer, yo，現在完成式',
      answers: ['he conocido', 'conocí'],
      explain: 'conocer 用在過去時態可表示「第一次認識某人」：Hoy he conocido a mis vecinos。西班牙用 hoy 時常用現在完成式（he conocido）；拉丁美洲較常用簡單過去式（conocí）。',
    },
    {
      id: 'es-e27',
      level: 'B1',
      type: 'choice',
      prompt: '¿___ la canción «Cielito lindo»? — Sí, ¡y la canto muy bien!',
      options: ['Conoces', 'Sabes'],
      answer: 1,
      explain: '談論歌曲時兩者都能用但意思不同：¿Sabes la canción…? = 知道而且會唱；¿Conoces la canción…? = 聽過，但不一定會唱。回答說「會唱」，所以用 sabes。',
    },
  ],
};

// 講義「西文A1旅遊對話」：7 段對話、動詞變化表與練習題（見 spanish-a1-travel.js）
spanish.dialogues.push(...travelDialogues);
// 旅遊時間對話（時刻表、訂房日期、季節）
spanish.dialogues.push(...esTimeDialogues);
spanish.exercises.push(...travelExercises);
spanish.verbs = verbs;

export default spanish;
