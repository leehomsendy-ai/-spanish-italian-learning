// 列出要產生音檔的句子（輸出 JSON 給 gen-audio.py 使用）
// 用法：node scripts/audio-items.mjs es > items-es.json
//       node scripts/audio-items.mjs it > items-it.json
import spanish from '../src/data/spanish.js';
import italian from '../src/data/italian.js';
import topicVocab from '../src/data/topic-vocab.js';
import { CAL_RULES, WORDS } from '../src/data/calendar.js';
import { speechText } from '../src/speechText.js';

const lang = process.argv[2] || 'es';

// 哪些內容要有音檔
const CONFIG = {
  es: {
    data: spanish,
    // 講義「西文A1旅遊對話」（塞維亞）＋ 天氣
    dialogues: ['es-t1', 'es-t2', 'es-t3', 'es-t4', 'es-t5', 'es-t6', 'es-t7', 'es-w1'],
    readings: ['es-r6'],
    calendar: ['weather'],
  },
  it: {
    data: italian,
    dialogues: ['it-w1'],
    readings: ['it-r7'],
    calendar: ['weather'],
  },
};

// 角色性別 → 聲音（F／M：女聲／男聲；F2、M2：同一段有兩位同性別角色時，第二位用的聲音）
const FEMALE = new Set(['Señora', 'Clienta', 'Dependienta', 'Marta', 'Mamá', 'Lucía', 'Recepcionista', 'Mei', 'Ana']);

const cfg = CONFIG[lang];
const dialogues = [];
const lines = new Map(); // text → voice
const add = (raw, voice) => {
  const text = raw && speechText(raw);
  if (text && !lines.has(text)) lines.set(text, voice);
};

for (const id of cfg.dialogues) {
  const d = cfg.data.dialogues.find((x) => x.id === id);
  const speakers = (pred) => [...new Set(d.lines.filter((l) => l.speaker && pred(l.speaker)).map((l) => l.speaker))];
  const males = speakers((s) => !FEMALE.has(s));
  const females = speakers((s) => FEMALE.has(s));
  const voiceOf = (sp) =>
    FEMALE.has(sp) ? (females.indexOf(sp) === 1 ? 'F2' : 'F') : males.indexOf(sp) === 1 ? 'M2' : 'M';
  const seq = [];
  for (const l of d.lines) {
    if (!l.text) continue;
    add(l.text, voiceOf(l.speaker));
    seq.push(speechText(l.text));
  }
  for (const q of d.questions || []) add(q.a, 'F');
  for (const [, items] of topicVocab[id] || []) for (const [w] of items) add(w, 'F');
  dialogues.push({ id, lines: seq });
}

// 短文：全文朗讀＋標示單字
const TOKEN = /\{\{([^}|]+)(?:\|([^}]+))?\}\}/g;
for (const id of cfg.readings) {
  const r = cfg.data.readings.find((x) => x.id === id);
  add(r.text.replace(TOKEN, '$1'), 'F');
  for (const m of r.text.matchAll(TOKEN)) add(m[1], 'F');
}

// 數字日期頁的類別（單字＋實用句型）
for (const cat of cfg.calendar) {
  for (const w of WORDS[lang][cat]) add(w.w, 'F');
  for (const [p] of CAL_RULES[lang][cat].phrases) add(p, 'F');
}

console.log(JSON.stringify({ lang, items: [...lines].map(([text, voice]) => ({ text, voice })), dialogues }, null, 1));
