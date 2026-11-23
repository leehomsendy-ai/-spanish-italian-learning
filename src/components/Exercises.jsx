import { useEffect, useMemo, useRef, useState } from 'react';
import { useStats } from '../hooks/useStats.js';
import { Card, EmptyState, Feedback, LevelBadge } from './ui.jsx';

const TYPE_LABEL = { conjugation: '動詞變位填空', choice: '單字／文法選擇', reorder: '句子重組' };
const ACCENTS = {
  es: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'],
  it: ['à', 'è', 'é', 'ì', 'ò', 'ù'],
};

const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.!?¡¿]/g, '');
const stripAccents = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Exercises({ data, level }) {
  const { stats, record, resetSession, resetAll } = useStats(data.meta.code);
  const pool = useMemo(() => data.exercises.filter((e) => e.level === level), [data, level]);
  const [round, setRound] = useState(0);
  const order = useMemo(() => shuffle(pool), [pool, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(null); // { correct, note }
  const [roundScore, setRoundScore] = useState(0);

  useEffect(() => {
    setIndex(0);
    setResult(null);
    setRoundScore(0);
  }, [order]);

  if (pool.length === 0) return <EmptyState>此程度目前沒有題目，請切換其他難度，或到資料檔新增內容。</EmptyState>;

  const finished = index >= order.length;
  const ex = order[index];

  const submit = (correct, note) => {
    setResult({ correct, note });
    if (correct) setRoundScore((n) => n + 1);
    record(correct);
  };

  const next = () => {
    setResult(null);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    resetSession();
    setRound((r) => r + 1);
  };

  return (
    <div className="space-y-4">
      <StatsBar stats={stats} onReset={resetAll} />

      {finished ? (
        <Card className="px-5 py-10 text-center">
          <div className="mb-2 text-4xl">{roundScore === order.length ? '🏆' : roundScore >= order.length / 2 ? '🎉' : '💪'}</div>
          <h2 className="text-lg font-bold">本回合完成！</h2>
          <p className="mt-1 text-[var(--muted)]">
            答對 {roundScore} / {order.length} 題
          </p>
          <button
            onClick={restart}
            className="mt-5 rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            ↺ 再練一次（題目重新洗牌）
          </button>
        </Card>
      ) : (
        <Card key={`${round}-${index}`} className="px-5 py-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <LevelBadge level={ex.level} />
              <span className="text-xs font-medium text-[var(--muted)]">{TYPE_LABEL[ex.type]}</span>
            </div>
            <span className="text-xs text-[var(--muted)]">
              第 {index + 1} / {order.length} 題
            </span>
          </div>
          <div className="mb-5 h-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
            <div
              className="h-full bg-[var(--accent)] transition-all"
              style={{ width: `${((index + (result ? 1 : 0)) / order.length) * 100}%` }}
            />
          </div>

          {ex.type === 'conjugation' && <Conjugation ex={ex} lang={data.meta.code} done={!!result} onSubmit={submit} />}
          {ex.type === 'choice' && <Choice ex={ex} done={!!result} onSubmit={submit} />}
          {ex.type === 'reorder' && <Reorder ex={ex} done={!!result} onSubmit={submit} />}

          {result && (
            <>
              <Feedback correct={result.correct}>
                {result.note && <p className="mb-1 font-medium">{result.note}</p>}
                <p className="mb-1">
                  <span className="text-[var(--muted)]">正確答案：</span>
                  <strong>{correctAnswerText(ex)}</strong>
                </p>
                <p>
                  <span className="text-[var(--muted)]">文法解析：</span>
                  {ex.explain}
                </p>
              </Feedback>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={next}
                  autoFocus
                  className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  {index + 1 < order.length ? '下一題 →' : '查看結果'}
                </button>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}

function correctAnswerText(ex) {
  if (ex.type === 'conjugation') return ex.answers.join(' / ');
  if (ex.type === 'choice') return ex.options[ex.answer];
  return ex.words.join(' ');
}

function StatsBar({ stats, onReset }) {
  const [confirming, setConfirming] = useState(false);
  const pct = (c, a) => (a ? Math.round((c / a) * 100) : 0);
  const items = [
    { label: '本次答對率', value: `${pct(stats.sessionCorrect, stats.sessionAnswered)}%`, sub: `${stats.sessionCorrect}/${stats.sessionAnswered}` },
    { label: '目前連勝', value: `🔥 ${stats.streak}`, sub: '連續答對' },
    { label: '最佳連勝', value: `⭐ ${stats.bestStreak}`, sub: '歷史紀錄' },
    { label: '累計答對率', value: `${pct(stats.totalCorrect, stats.totalAnswered)}%`, sub: `共 ${stats.totalAnswered} 題` },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((it) => (
          <Card key={it.label} className="px-3 py-2.5">
            <p className="text-xs text-[var(--muted)]">{it.label}</p>
            <p className="text-xl font-bold tabular-nums">{it.value}</p>
            <p className="text-[11px] text-[var(--muted)]">{it.sub}</p>
          </Card>
        ))}
      </div>
      <div className="mt-1.5 flex justify-end gap-3 text-xs">
        {confirming ? (
          <>
            <span className="text-[var(--muted)]">確定清除此語言的所有紀錄？</span>
            <button
              onClick={() => {
                onReset();
                setConfirming(false);
              }}
              className="font-medium text-[var(--bad)]"
            >
              清除
            </button>
            <button onClick={() => setConfirming(false)} className="text-[var(--muted)]">
              取消
            </button>
          </>
        ) : (
          <button onClick={() => setConfirming(true)} className="text-[var(--muted)] hover:text-[var(--bad)]">
            清除紀錄
          </button>
        )}
      </div>
    </div>
  );
}

function Conjugation({ ex, lang, done, onSubmit }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const [before, after] = ex.sentence.split('___');

  const check = (e) => {
    e.preventDefault();
    if (!value.trim() || done) return;
    const v = normalize(value);
    const exact = ex.answers.some((a) => normalize(a) === v);
    const loose = ex.answers.some((a) => stripAccents(normalize(a)) === stripAccents(v));
    if (exact) onSubmit(true);
    else if (loose) onSubmit(true, '⚠️ 拼字正確，但請注意重音符號。');
    else onSubmit(false, `你的答案：${value.trim()}`);
  };

  const insert = (ch) => {
    const el = inputRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    setValue(value.slice(0, start) + ch + value.slice(end));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start + ch.length, start + ch.length);
    });
  };

  return (
    <form onSubmit={check}>
      <p className="mb-1 text-sm text-[var(--muted)]">請填入動詞的正確變位：</p>
      <p className="text-lg leading-loose sm:text-xl">
        {before}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={done}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="填入答案"
          className="mx-1 w-36 border-b-2 border-[var(--accent)] bg-transparent px-1 text-center font-semibold outline-none disabled:opacity-80"
        />
        {after}
        <span className="ml-2 text-base text-[var(--muted)]">({ex.verb})</span>
      </p>
      {!done && (
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
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
            送出答案
          </button>
        </div>
      )}
    </form>
  );
}

function Choice({ ex, done, onSubmit }) {
  const [chosen, setChosen] = useState(null);
  return (
    <div>
      <p className="mb-4 text-lg leading-relaxed sm:text-xl">{ex.prompt}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {ex.options.map((o, j) => {
          let style = 'border-[var(--border)] hover:border-[var(--accent)]';
          if (done && j === ex.answer) style = 'border-[var(--good)] bg-[var(--good-bg)] text-[var(--good)]';
          else if (done && j === chosen) style = 'border-[var(--bad)] bg-[var(--bad-bg)] text-[var(--bad)]';
          else if (done) style = 'border-[var(--border)] opacity-60';
          return (
            <button
              key={j}
              disabled={done}
              onClick={() => {
                setChosen(j);
                onSubmit(j === ex.answer);
              }}
              className={`rounded-lg border px-4 py-2.5 text-left font-medium transition-colors ${style}`}
            >
              <span className="mr-2 text-xs text-[var(--muted)]">{String.fromCharCode(65 + j)}</span>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Reorder({ ex, done, onSubmit }) {
  const bank = useMemo(() => {
    let s = shuffle(ex.words.map((w, i) => ({ w, i })));
    // 避免打亂後剛好是正確順序
    if (s.length > 1 && s.every((t, k) => t.i === k)) s = [...s.slice(1), s[0]];
    return s;
  }, [ex]);
  const [picked, setPicked] = useState([]); // indices into bank

  const sentence = picked.map((k) => bank[k].w);
  const complete = picked.length === bank.length;

  const check = () => onSubmit(normalize(sentence.join(' ')) === normalize(ex.words.join(' ')), `你的答案：${sentence.join(' ')}`);

  return (
    <div>
      <p className="mb-1 text-sm text-[var(--muted)]">點選單字，排出正確的句子：</p>
      <p className="mb-3 font-medium">「{ex.zh}」</p>
      <div
        className={`mb-3 flex min-h-14 flex-wrap items-center gap-2 rounded-xl border-2 border-dashed px-3 py-2 ${
          done ? 'border-[var(--border)]' : 'border-[var(--accent)]/40'
        }`}
      >
        {picked.length === 0 && <span className="text-sm text-[var(--muted)]">在這裡組成句子…</span>}
        {picked.map((k, pos) => (
          <button
            key={k}
            disabled={done}
            onClick={() => setPicked((p) => p.filter((_, x) => x !== pos))}
            className="rounded-lg bg-[var(--accent-soft)] px-3 py-1.5 font-medium text-[var(--accent)]"
          >
            {bank[k].w}
          </button>
        ))}
      </div>
      <div className="flex min-h-11 flex-wrap gap-2">
        {bank.map((t, k) =>
          picked.includes(k) ? (
            <span key={k} className="rounded-lg border border-dashed border-[var(--border)] px-3 py-1.5 text-transparent select-none">
              {t.w}
            </span>
          ) : (
            <button
              key={k}
              disabled={done}
              onClick={() => setPicked((p) => [...p, k])}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-medium hover:border-[var(--accent)]"
            >
              {t.w}
            </button>
          ),
        )}
      </div>
      {!done && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setPicked([])}
            disabled={picked.length === 0}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-40"
          >
            清除
          </button>
          <button
            onClick={check}
            disabled={!complete}
            className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
          >
            送出答案
          </button>
        </div>
      )}
    </div>
  );
}
