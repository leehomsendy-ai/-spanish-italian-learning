// 列出要產生音檔的句子（輸出 JSON 給 gen-audio.py 使用）
// 用法：node scripts/audio-items.mjs > items.json
import spanish from '../src/data/spanish.js';
import topicVocab from '../src/data/topic-vocab.js';
import { speechText } from '../src/speechText.js';

// 目前只處理講義「西文A1旅遊對話」（塞維亞相關）的 7 段對話
const DIALOGUE_IDS = ['es-t1', 'es-t2', 'es-t3', 'es-t4', 'es-t5', 'es-t6', 'es-t7'];

// 角色性別 → 聲音（F／M：女聲／男聲；F2、M2：同一段有兩位同性別角色時，第二位用的聲音）
const FEMALE = new Set(['Señora', 'Clienta', 'Dependienta', 'Marta', 'Mamá', 'Lucía', 'Recepcionista']);

const dialogues = [];
const lines = new Map(); // text → voice
const add = (raw, voice) => {
  const text = raw && speechText(raw);
  if (text && !lines.has(text)) lines.set(text, voice);
};

for (const id of DIALOGUE_IDS) {
  const d = spanish.dialogues.find((x) => x.id === id);
  const males = [...new Set(d.lines.filter((l) => l.speaker && !FEMALE.has(l.speaker)).map((l) => l.speaker))];
  const females = [...new Set(d.lines.filter((l) => FEMALE.has(l.speaker)).map((l) => l.speaker))];
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

console.log(JSON.stringify({ lang: 'es', items: [...lines].map(([text, voice]) => ({ text, voice })), dialogues }, null, 1));
