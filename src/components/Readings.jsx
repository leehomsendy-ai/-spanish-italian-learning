import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Card, EmptyState, Feedback, LevelBadge, ScenarioGrid, sortByLevel, RateToggle, SpeakButton, SpeechNotice } from './ui.jsx';

// 解析 {{顯示文字}} 或 {{顯示文字|vocab鍵值}}
const TOKEN = /\{\{([^}|]+)(?:\|([^}]+))?\}\}/g;

function parse(text) {
  const parts = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) parts.push({ type: 'text', value: text.slice(last, m.index) });
    parts.push({ type: 'word', value: m[1], key: m[2] || m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

const plain = (text) => text.replace(TOKEN, '$1');

export default function Readings({ data, level, speech, rate, setRate }) {
  const list = sortByLevel(data.readings);
  const [activeId, setActiveId] = useState(() => (list.find((x) => x.level === level) || list[0])?.id);
  const reading = list.find((r) => r.id === activeId) || list[0];
  const lang = data.meta.speechLang;

  useEffect(() => speech.stop(), [reading?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!reading) return <EmptyState>此程度目前沒有文章，請切換其他難度，或到資料檔新增內容。</EmptyState>;

  const speakId = `${reading.id}-all`;
  const playing = speech.speakingId === speakId;

  return (
    <div className="space-y-4">
      <section>
        <h2 className="mb-2 text-sm font-semibold text-[var(--muted)]">
          {list.length} 種主題・目前程度 {level} 以外的項目會淡化顯示，仍可點選
        </h2>
        <ScenarioGrid
          level={level}
          value={reading.id}
          onChange={setActiveId}
          items={list.map((x) => ({ id: x.id, level: x.level, tag: x.theme, label: x.titleZh }))}
        />
      </section>

      <Card className="overflow-hidden">
        <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <LevelBadge level={reading.level} />
              <span className="text-xs text-[var(--muted)]">約 {plain(reading.text).split(/\s+/).length} 字</span>
            </div>
            <h2 className="text-lg font-bold">{reading.title}</h2>
            <p className="text-sm text-[var(--muted)]">{reading.titleZh}</p>
          </div>
          <SpeakButton
            active={playing}
            disabled={!speech.supported}
            label={playing ? '停止朗讀' : '朗讀全文'}
            onClick={() => (playing ? speech.stop() : speech.speak(speakId, plain(reading.text), lang, rate))}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[var(--surface-2)] px-5 py-2.5 text-xs text-[var(--muted)]">
          <RateToggle rate={rate} onChange={setRate} />
          <span>💡 將滑鼠移到（或點擊）<mark className="rounded bg-[var(--mark)] px-1 text-[var(--text)]">標示單字</mark> 查看解釋</span>
        </div>
        <Article reading={reading} speech={speech} lang={lang} rate={rate} />
      </Card>

      <Questions key={reading.id} questions={reading.questions} />

      <SpeechNotice speech={speech} lang={lang} langName={data.meta.nameZh} />
    </div>
  );
}

function Article({ reading, speech, lang, rate }) {
  const [open, setOpen] = useState(null); // { idx, key, word, rect }
  const parts = parse(reading.text);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (!e.target.closest?.('[data-vocab]')) setOpen(null);
    };
    const onScroll = () => setOpen(null);
    document.addEventListener('pointerdown', close);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', close);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  const show = (idx, p, el) => setOpen({ idx, key: p.key, word: p.value, rect: el.getBoundingClientRect() });

  return (
    <div className="px-5 py-5 text-[17px] leading-[2] sm:text-lg">
      {parts.map((p, i) =>
        p.type === 'text' ? (
          <span key={i}>{p.value}</span>
        ) : (
          <button
            key={i}
            data-vocab
            type="button"
            onMouseEnter={(e) => window.matchMedia('(hover: hover)').matches && show(i, p, e.currentTarget)}
            onMouseLeave={() => window.matchMedia('(hover: hover)').matches && setOpen(null)}
            onClick={(e) => (open?.idx === i ? setOpen(null) : show(i, p, e.currentTarget))}
            className={`rounded px-0.5 font-medium underline decoration-[var(--accent)] decoration-dotted underline-offset-4 transition-colors ${
              open?.idx === i ? 'bg-[var(--accent-soft)]' : 'bg-[var(--mark)]'
            }`}
          >
            {p.value}
          </button>
        ),
      )}
      {open && reading.vocab[open.key] && (
        <VocabPopover
          word={open.word}
          info={reading.vocab[open.key]}
          rect={open.rect}
          onSpeak={() => speech.speak(`vocab-${open.idx}`, open.word, lang, rate)}
        />
      )}
    </div>
  );
}

function VocabPopover({ word, info, rect, onSpeak }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ left: rect.left, top: rect.top, below: false, ready: false });

  useLayoutEffect(() => {
    const w = ref.current?.offsetWidth || 240;
    const h = ref.current?.offsetHeight || 120;
    const vw = document.documentElement.clientWidth;
    const left = Math.min(Math.max(8, rect.left + rect.width / 2 - w / 2), vw - w - 8);
    const below = rect.top - h - 10 < 64; // 避開頂部固定的導覽列
    const top = below ? rect.bottom + 8 : rect.top - h - 8;
    setPos({ left, top, below, ready: true });
  }, [rect]);

  return (
    <div
      ref={ref}
      data-vocab
      role="tooltip"
      style={{ left: pos.left, top: pos.top, visibility: pos.ready ? 'visible' : 'hidden' }}
      className="fixed z-40 w-60 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm leading-normal shadow-lg"
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-base font-bold text-[var(--accent)]">{word}</span>
        <button
          onClick={onSpeak}
          className="rounded-full p-1 text-[var(--accent)] hover:bg-[var(--accent-soft)]"
          aria-label={`朗讀 ${word}`}
        >
          🔊
        </button>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
        <dt className="text-[var(--muted)]">詞性</dt>
        <dd>{info.pos}</dd>
        <dt className="text-[var(--muted)]">原形</dt>
        <dd className="font-medium">{info.lemma}</dd>
        <dt className="text-[var(--muted)]">中文</dt>
        <dd>{info.zh}</dd>
      </dl>
    </div>
  );
}

function Questions({ questions }) {
  const [answers, setAnswers] = useState({});

  return (
    <Card className="px-5 py-4">
      <h3 className="mb-3 font-bold">閱讀理解</h3>
      <ol className="space-y-5">
        {questions.map((q, i) => {
          const chosen = answers[i];
          const done = chosen !== undefined;
          const opts = q.type === 'tf' ? ['正確 (Verdadero / Vero)', '錯誤 (Falso)'] : q.options;
          const correctIdx = q.type === 'tf' ? (q.answer ? 0 : 1) : q.answer;
          return (
            <li key={i}>
              <p className="font-medium">
                {i + 1}. {q.q}
                <span className="ml-2 rounded bg-[var(--surface-2)] px-1.5 py-0.5 text-[11px] text-[var(--muted)]">
                  {q.type === 'tf' ? '是非題' : '選擇題'}
                </span>
              </p>
              <p className="mb-2 text-sm text-[var(--muted)]">{q.qZh}</p>
              <div className={`grid gap-2 ${q.type === 'tf' ? 'grid-cols-2' : 'sm:grid-cols-3'}`}>
                {opts.map((o, j) => {
                  let style = 'border-[var(--border)] hover:border-[var(--accent)]';
                  if (done && j === correctIdx) style = 'border-[var(--good)] bg-[var(--good-bg)] text-[var(--good)]';
                  else if (done && j === chosen) style = 'border-[var(--bad)] bg-[var(--bad-bg)] text-[var(--bad)]';
                  else if (done) style = 'border-[var(--border)] opacity-60';
                  return (
                    <button
                      key={j}
                      disabled={done}
                      onClick={() => setAnswers((a) => ({ ...a, [i]: j }))}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${style}`}
                    >
                      {q.type === 'tf' ? (j === 0 ? '⭕ 正確' : '❌ 錯誤') : o}
                    </button>
                  );
                })}
              </div>
              {done && <Feedback correct={chosen === correctIdx}>{q.explain}</Feedback>}
            </li>
          );
        })}
      </ol>
      {Object.keys(answers).length > 0 && (
        <button onClick={() => setAnswers({})} className="mt-4 text-sm text-[var(--accent)] hover:underline">
          ↺ 重新作答
        </button>
      )}
    </Card>
  );
}
