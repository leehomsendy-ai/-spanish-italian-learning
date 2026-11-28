import { useEffect, useMemo, useRef, useState } from 'react';
import { useStats } from '../hooks/useStats.js';
import { CAL_RULES, CATEGORIES, WORDS } from '../data/calendar.js';
import { Card, Feedback, RateToggle, Segmented, SpeakButton } from './ui.jsx';

const MODES = [
  { value: 'listen', label: '👂 聽音選義', hint: '聽發音，選出中文意思' },
  { value: 'spell', label: '✍️ 看中文拼寫', hint: '看中文，拼出單字或句子（季節的冠詞、句尾標點可寫可不寫）' },
  { value: 'read', label: '📖 看字選義', hint: '看單字，選出中文意思' },
];
const ACCENTS = { es: ['á', 'é', 'í', 'ó', 'ú', 'ñ'], it: ['ì', 'è', 'é', 'à', 'ò', "'"] };

const norm = (s) => s.trim().toLowerCase().replace(/’/g, "'").replace(/[.!?¡¿]/g, '').replace(/\s+/g, ' ').trim();
const noAccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);

/** 星期／月份／四季的練習（由 Numbers 頁面切換類別時使用） */
export default function CalendarPractice({ lang, category, speech, speechLang, rate, setRate }) {
  const list = WORDS[lang][category];
  const { stats, record, resetSession } = useStats(`${lang}-cal`);
  const [mode, setMode] = useState('listen');
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * list.length));
  const [result, setResult] = useState(null);
  const item = list[idx] || list[0];

  const nextIdx = (prev) => {
    if (list.length < 2) return 0;
    let i;
    do i = Math.floor(Math.random() * list.length);
    while (i === prev);
    return i;
  };

  useEffect(() => {
    setIdx((p) => nextIdx(p));
    setResult(null);
  }, [category, mode, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const say = (id, text) => (speech.speakingId === id ? speech.stop() : speech.speak(id, text, speechLang, rate));

  useEffect(() => {
    if (mode === 'listen' && !result) speech.speak('cal-q', item.w, speechLang, rate);
  }, [idx, mode, category]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (correct, note) => {
    setResult({ correct, note });
    record(correct);
  };
  const next = () => {
    setResult(null);
    setIdx((p) => nextIdx(p));
  };

  const pct = stats.sessionAnswered ? Math.round((stats.sessionCorrect / stats.sessionAnswered) * 100) : 0;
  const qKey = `${lang}-${category}-${idx}-${mode}`;

  return (
    <>
      <Card className="space-y-3 px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="w-10 text-sm text-[var(--muted)]">題型</span>
          <Segmented label="題型" value={mode} onChange={setMode} options={MODES} size="sm" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] pt-3 text-sm">
          <RateToggle rate={rate} onChange={setRate} />
          <span className="text-[var(--muted)]">
            本次 {stats.sessionCorrect}/{stats.sessionAnswered}（{pct}%）・連勝 🔥 {stats.streak}・最佳 ⭐ {stats.bestStreak}
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
        {mode === 'spell' ? (
          <SpellQ key={qKey} item={item} lang={lang} done={!!result} onSubmit={submit} />
        ) : (
          <ChooseQ
            key={qKey}
            item={item}
            list={list}
            listen={mode === 'listen'}
            done={!!result}
            onSubmit={submit}
            replay={() => say('cal-q', item.w)}
            speech={speech}
          />
        )}
        {result && (
          <>
            <Feedback correct={result.correct}>
              {result.note && <p className="mb-1">{result.note}</p>}
              <div className="flex items-center gap-2">
                <SpeakButton active={speech.speakingId === 'cal-a'} disabled={!speech.supported} label={`朗讀 ${item.w}`} onClick={() => say('cal-a', item.w)} />
                <p>
                  <span className="text-lg font-semibold">{item.w}</span>
                  <span className="mx-2 text-[var(--muted)]">=</span>
                  <span>{item.zh}</span>
                  {item.note && <span className="ml-1 text-sm text-[var(--muted)]">（{item.note}）</span>}
                </p>
              </div>
            </Feedback>
            <div className="mt-4 flex justify-end">
              <button autoFocus onClick={next} className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                下一題 →
              </button>
            </div>
          </>
        )}
      </Card>

      <CalendarRules lang={lang} category={category} list={list} speech={speech} say={say} />
    </>
  );
}

function ChooseQ({ item, list, listen, done, onSubmit, replay, speech }) {
  const opts = useMemo(() => shuffle([item, ...shuffle(list.filter((x) => x !== item)).slice(0, 3)]), [item, list]);
  const [chosen, setChosen] = useState(null);
  return (
    <div>
      {listen ? (
        <button
          type="button"
          onClick={replay}
          disabled={!speech.supported}
          className="mb-4 rounded-lg border border-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:opacity-40"
        >
          🔊 再聽一次
        </button>
      ) : (
        <p className="mb-4 text-3xl font-semibold text-[var(--accent)]">{item.w}</p>
      )}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {opts.map((o) => {
          let style = 'border-[var(--border)] hover:border-[var(--accent)]';
          if (done && o === item) style = 'border-[var(--good)] bg-[var(--good-bg)] text-[var(--good)]';
          else if (done && o === chosen) style = 'border-[var(--bad)] bg-[var(--bad-bg)] text-[var(--bad)]';
          else if (done) style = 'border-[var(--border)] opacity-60';
          return (
            <button
              key={o.w}
              disabled={done}
              onClick={() => {
                setChosen(o);
                onSubmit(o === item, o === item ? null : `你選了：${o.zh}`);
              }}
              className={`rounded-lg border px-3 py-3 text-lg font-medium transition-colors ${style}`}
            >
              {o.zh}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SpellQ({ item, lang, done, onSubmit }) {
  const [value, setValue] = useState('');
  const ref = useRef(null);
  const answers = [item.w, ...(item.alt || [])].map(norm);

  const check = (e) => {
    e.preventDefault();
    if (done || !value.trim()) return;
    const v = norm(value);
    if (answers.includes(v)) onSubmit(true, /^[a-z]/.test(item.w) && /^[A-ZÁÉÍÓÚ]/.test(value.trim()) ? '💡 星期、月份、季節通常小寫。' : null);
    else if (answers.some((a) => noAccent(a) === noAccent(v))) onSubmit(true, '⚠️ 拼字正確，但請注意重音符號。');
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
      <p className="mb-3 text-4xl font-bold text-[var(--accent)]">{item.zh}</p>
      <input
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={done}
        autoFocus
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="拼出這個單字"
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

function CalendarRules({ lang, category, list, speech, say }) {
  const rules = CAL_RULES[lang][category];
  const label = CATEGORIES.find((c) => c.id === category).label;
  const row = (id, text, zh, extra) => {
    const active = speech.speakingId === id;
    return (
      <li key={id} className={`flex items-center gap-3 border-b border-[var(--border)] px-5 py-2 sm:odd:border-r ${active ? 'bg-[var(--accent-soft)]' : ''}`}>
        <SpeakButton active={active} disabled={!speech.supported} label={`朗讀 ${text}`} onClick={() => say(id, text)} />
        <span className="min-w-0 flex-1">
          <span className="font-medium">{text}</span>
          <span className="ml-2 text-sm text-[var(--muted)]">
            {zh}
            {extra && `（${extra}）`}
          </span>
        </span>
      </li>
    );
  };
  return (
    <Card className="overflow-hidden">
      <h3 className="border-b border-[var(--border)] px-5 py-3 font-bold">{label}・對照表與規則</h3>
      <ul className="grid sm:grid-cols-2">{list.map((x, i) => row(`cal-w-${i}`, x.w, x.zh, x.note))}</ul>
      <ul className="list-disc space-y-1.5 px-5 py-3 pl-9 text-sm leading-relaxed">
        {rules.tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <h4 className="border-t border-[var(--border)] bg-[var(--surface-2)] px-5 py-2 text-xs font-semibold text-[var(--accent)]">實用句型</h4>
      <ul className="grid sm:grid-cols-2">{rules.phrases.map(([t, zh], i) => row(`cal-p-${i}`, t, zh))}</ul>
    </Card>
  );
}
