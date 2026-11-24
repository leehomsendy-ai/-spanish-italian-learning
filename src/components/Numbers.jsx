import { useEffect, useMemo, useRef, useState } from 'react';
import { useStats } from '../hooks/useStats.js';
import { RANGES, RULES, accepted, toWords } from '../data/numbers.js';
import { Card, Feedback, RateToggle, Segmented, SpeakButton, SpeechNotice } from './ui.jsx';
import { CATEGORIES } from '../data/calendar.js';
import { load, save } from '../storage.js';
import CalendarPractice from './Calendar.jsx';

/** 數字・日期頁：切換 數字／星期／月份／四季 */
export default function Numbers(props) {
  const { data, speech, rate, setRate } = props;
  const [category, setCategory] = useState(() => {
    const c = load('sil-num-cat', 'numbers');
    return CATEGORIES.some((x) => x.id === c) ? c : 'numbers';
  });
  useEffect(() => save('sil-num-cat', category), [category]);
  useEffect(() => speech.stop(), [category]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-4">
      <Segmented
        label="練習類別"
        value={category}
        onChange={setCategory}
        options={CATEGORIES.map((c) => ({ value: c.id, label: c.label }))}
      />
      {category === 'numbers' ? (
        <NumberPractice {...props} />
      ) : (
        <div className="space-y-4">
          <CalendarPractice
            lang={data.meta.code}
            category={category}
            speech={speech}
            speechLang={data.meta.speechLang}
            rate={rate}
            setRate={setRate}
          />
          <SpeechNotice speech={speech} lang={data.meta.speechLang} langName={data.meta.nameZh} />
        </div>
      )}
    </div>
  );
}

const MODES = [
  { value: 'listen', label: '👂 聽數字', hint: '聽發音，寫出阿拉伯數字' },
  { value: 'spell', label: '✍️ 寫拼法', hint: '看數字，拼出完整的字' },
  { value: 'choose', label: '🔢 看字選數', hint: '看拼法，選出正確的數字' },
];
const ACCENTS = { es: ['á', 'é', 'í', 'ó', 'ú'], it: ['é', 'è', 'à', 'ò'] };

const norm = (s) => s.trim().toLowerCase().replace(/[-‐]/g, ' ').replace(/\s+/g, ' ');
const noAccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

function pick(range, prev) {
  let n;
  do n = rand(range.min, range.max);
  while (n === prev && range.max > range.min);
  return n;
}

/** 選擇題的干擾選項：優先用容易混淆的數字（相鄰、十位不同、數字對調） */
function options(n, range) {
  const s = String(n);
  const near = [n + 1, n - 1, n + 10, n - 10, n + 100, n - 100, Number([...s].reverse().join('')), n + 2];
  const set = new Set([n]);
  for (const x of near.sort(() => Math.random() - 0.5)) {
    if (set.size >= 4) break;
    if (x >= range.min && x <= range.max) set.add(x);
  }
  while (set.size < 4) set.add(rand(range.min, range.max));
  return [...set].sort(() => Math.random() - 0.5);
}

function NumberPractice({ data, speech, rate, setRate }) {
  const lang = data.meta.code;
  const speechLang = data.meta.speechLang;
  const { stats, record, resetSession } = useStats(`${lang}-num`);
  const [rangeId, setRangeId] = useState('units');
  const [mode, setMode] = useState('listen');
  const range = RANGES.find((r) => r.id === rangeId);
  const [n, setN] = useState(() => pick(range));
  const [result, setResult] = useState(null);

  // 切換語言／範圍／模式時換新題目
  useEffect(() => {
    setN((prev) => pick(range, prev));
    setResult(null);
  }, [rangeId, mode, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const word = toWords(lang, n);
  const say = (id, text) => (speech.speakingId === id ? speech.stop() : speech.speak(id, text, speechLang, rate));

  // 聽力模式：出新題時自動唸一次
  useEffect(() => {
    if (mode === 'listen' && !result) speech.speak('num-q', word, speechLang, rate);
  }, [n, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (correct, note) => {
    setResult({ correct, note });
    record(correct);
  };
  const next = () => {
    setResult(null);
    setN((prev) => pick(range, prev));
  };

  const rate100 = stats.sessionAnswered ? Math.round((stats.sessionCorrect / stats.sessionAnswered) * 100) : 0;

  return (
    <div className="space-y-4">
      <Card className="space-y-3 px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="w-10 text-sm text-[var(--muted)]">範圍</span>
          <Segmented
            label="數字範圍"
            value={rangeId}
            onChange={setRangeId}
            options={RANGES.map((r) => ({ value: r.id, label: `${r.label.replace('數', '')} ${r.sub}` }))}
            size="sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="w-10 text-sm text-[var(--muted)]">題型</span>
          <Segmented label="題型" value={mode} onChange={setMode} options={MODES} size="sm" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] pt-3 text-sm">
          <RateToggle rate={rate} onChange={setRate} />
          <span className="text-[var(--muted)]">
            本次 {stats.sessionCorrect}/{stats.sessionAnswered}（{rate100}%）・連勝 🔥 {stats.streak}・最佳 ⭐ {stats.bestStreak}
            {stats.sessionAnswered > 0 && (
              <button onClick={resetSession} className="ml-2 text-[var(--accent)] hover:underline">
                重來
              </button>
            )}
          </span>
        </div>
      </Card>

      <Card className="px-5 py-5">
        <p className="mb-3 text-sm text-[var(--muted)]">{MODES.find((m) => m.value === mode).hint}</p>
        {mode === 'listen' && (
          <ListenQ key={`${n}-${lang}`} n={n} word={word} done={!!result} onSubmit={submit} speech={speech} say={say} />
        )}
        {mode === 'spell' && <SpellQ key={`${n}-${lang}`} n={n} lang={lang} done={!!result} onSubmit={submit} />}
        {mode === 'choose' && (
          <ChooseQ key={`${n}-${lang}`} n={n} word={word} range={range} done={!!result} onSubmit={submit} />
        )}

        {result && (
          <>
            <Feedback correct={result.correct}>
              {result.note && <p className="mb-1">{result.note}</p>}
              <div className="flex items-center gap-2">
                <SpeakButton active={speech.speakingId === 'num-a'} disabled={!speech.supported} label={`朗讀 ${word}`} onClick={() => say('num-a', word)} />
                <p>
                  <span className="text-lg font-bold">{n}</span>
                  <span className="mx-2 text-[var(--muted)]">=</span>
                  <span className="text-lg font-semibold">{word}</span>
                </p>
              </div>
            </Feedback>
            <div className="mt-4 flex justify-end">
              <button
                autoFocus
                onClick={next}
                className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                下一題 →
              </button>
            </div>
          </>
        )}
      </Card>

      <Rules lang={lang} rangeId={rangeId} range={range} speech={speech} say={say} />
      <SpeechNotice speech={speech} lang={speechLang} langName={data.meta.nameZh} />
    </div>
  );
}

function ListenQ({ n, word, done, onSubmit, speech, say }) {
  const [value, setValue] = useState('');
  const check = (e) => {
    e.preventDefault();
    if (done || !value.trim()) return;
    const v = parseInt(value.replace(/\D/g, ''), 10);
    onSubmit(v === n, v === n ? null : `你的答案：${value.trim()}`);
  };
  return (
    <form onSubmit={check} className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => say('num-q', word)}
        disabled={!speech.supported}
        className="rounded-lg border border-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:opacity-40"
      >
        🔊 再聽一次
      </button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={done}
        autoFocus
        inputMode="numeric"
        autoComplete="off"
        aria-label="輸入聽到的數字"
        placeholder="輸入數字"
        className="w-32 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-center text-xl font-semibold outline-none focus:border-[var(--accent)]"
      />
      {!done && (
        <button
          type="submit"
          disabled={!value.trim()}
          className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
        >
          送出
        </button>
      )}
    </form>
  );
}

function SpellQ({ n, lang, done, onSubmit }) {
  const [value, setValue] = useState('');
  const ref = useRef(null);
  const answers = accepted(lang, n);

  const check = (e) => {
    e.preventDefault();
    if (done || !value.trim()) return;
    const v = norm(value);
    if (answers.some((a) => norm(a) === v)) onSubmit(true);
    else if (answers.some((a) => noAccent(norm(a)) === noAccent(v))) onSubmit(true, '⚠️ 拼字正確，但請注意重音符號。');
    else onSubmit(false, `你的答案：${value.trim()}`);
  };

  const insert = (ch) => {
    const el = ref.current;
    const s = el?.selectionStart ?? value.length;
    const t = el?.selectionEnd ?? value.length;
    setValue(value.slice(0, s) + ch + value.slice(t));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(s + 1, s + 1);
    });
  };

  return (
    <form onSubmit={check}>
      <p className="mb-3 text-5xl font-bold tabular-nums tracking-wide text-[var(--accent)]">{n}</p>
      <input
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={done}
        autoFocus
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="拼出這個數字"
        placeholder={lang === 'it' ? '例如 ventitré' : '例如 treinta y uno'}
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-lg outline-none focus:border-[var(--accent)]"
      />
      {!done && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {ACCENTS[lang].map((ch) => (
            <button
              type="button"
              key={ch}
              onClick={() => insert(ch)}
              className="h-8 w-8 rounded-md border border-[var(--border)] text-sm hover:border-[var(--accent)]"
            >
              {ch}
            </button>
          ))}
          <button
            type="submit"
            disabled={!value.trim()}
            className="ml-auto rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
          >
            送出
          </button>
        </div>
      )}
    </form>
  );
}

function ChooseQ({ n, word, range, done, onSubmit }) {
  const opts = useMemo(() => options(n, range), [n, range]);
  const [chosen, setChosen] = useState(null);
  return (
    <div>
      <p className="mb-4 text-2xl font-semibold leading-snug">{word}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {opts.map((o) => {
          let style = 'border-[var(--border)] hover:border-[var(--accent)]';
          if (done && o === n) style = 'border-[var(--good)] bg-[var(--good-bg)] text-[var(--good)]';
          else if (done && o === chosen) style = 'border-[var(--bad)] bg-[var(--bad-bg)] text-[var(--bad)]';
          else if (done) style = 'border-[var(--border)] opacity-60';
          return (
            <button
              key={o}
              disabled={done}
              onClick={() => {
                setChosen(o);
                onSubmit(o === n, o === n ? null : `你選了：${o}`);
              }}
              className={`rounded-lg border px-3 py-3 text-xl font-semibold tabular-nums transition-colors ${style}`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Rules({ lang, rangeId, range, speech, say }) {
  const rules = RULES[lang][rangeId];
  return (
    <Card className="overflow-hidden">
      <h3 className="border-b border-[var(--border)] px-5 py-3 font-bold">
        規則與對照表・{range.label} {range.sub}
      </h3>
      <ul className="list-disc space-y-1.5 px-5 py-3 pl-9 text-sm leading-relaxed">
        {rules.tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <ul className="grid border-t border-[var(--border)] sm:grid-cols-2">
        {rules.examples.map((x) => {
          const w = toWords(lang, x);
          const id = `num-ex-${x}`;
          const active = speech.speakingId === id;
          return (
            <li
              key={x}
              className={`flex items-center gap-3 border-b border-[var(--border)] px-5 py-2 sm:odd:border-r ${active ? 'bg-[var(--accent-soft)]' : ''}`}
            >
              <SpeakButton active={active} disabled={!speech.supported} label={`朗讀 ${w}`} onClick={() => say(id, w)} />
              <span className="w-10 text-right font-bold tabular-nums text-[var(--accent)]">{x}</span>
              <span className="min-w-0">{w}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
