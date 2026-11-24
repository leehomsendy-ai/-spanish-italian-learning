import { useEffect, useState } from 'react';
import { Card, EmptyState, LevelBadge, ScenarioGrid, sortByLevel, RateToggle, SpeakButton, SpeechNotice, TopicVocab } from './ui.jsx';
import topicVocab from '../data/topic-vocab.js';

export default function Dialogues({ data, level, speech, rate, setRate }) {
  const list = sortByLevel(data.dialogues);
  const [activeId, setActiveId] = useState(() => (list.find((x) => x.level === level) || list[0])?.id);
  const [showAll, setShowAll] = useState(false);
  const [revealed, setRevealed] = useState({});

  const dialogue = list.find((d) => d.id === activeId) || list[0];
  const lang = data.meta.speechLang;

  useEffect(() => {
    setRevealed({});
    speech.stop();
  }, [dialogue?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!dialogue) return <EmptyState>此程度目前沒有對話，請切換其他難度，或到資料檔新增內容。</EmptyState>;

  const ids = dialogue.lines.map((_, i) => `${dialogue.id}-${i}`);
  const playingAll = speech.speakingId && ids.includes(speech.speakingId);

  const playAll = () => {
    if (playingAll) return speech.stop();
    speech.speakSequence(
      dialogue.lines.map((l, i) => ({ id: ids[i], text: l.text })).filter((x) => x.text),
      lang,
      rate,
    );
  };

  const toggleLine = (i) => setRevealed((r) => ({ ...r, [i]: !r[i] }));

  return (
    <div className="space-y-4">
      <section>
        <h2 className="mb-2 text-sm font-semibold text-[var(--muted)]">
          {list.length} 種情境・目前程度 {level} 以外的項目會淡化顯示，仍可點選
        </h2>
        <ScenarioGrid
          level={level}
          value={dialogue.id}
          onChange={setActiveId}
          items={list.map((x) => ({ id: x.id, level: x.level, tag: x.scene, label: x.titleZh }))}
        />
      </section>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <LevelBadge level={dialogue.level} />
              <span className="text-xs text-[var(--muted)]">情境：{dialogue.scene}</span>
              {dialogue.source && (
                <span className="rounded bg-[var(--surface-2)] px-1.5 py-0.5 text-[11px] text-[var(--muted)]">📄 講義</span>
              )}
            </div>
            <h2 className="text-lg font-bold">{dialogue.title}</h2>
            <p className="text-sm text-[var(--muted)]">{dialogue.titleZh}</p>
          </div>
          <button
            onClick={playAll}
            disabled={!speech.supported}
            className="rounded-lg bg-[var(--accent)] px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {playingAll ? '■ 停止' : '▶ 播放整段'}
          </button>
        </div>

        {dialogue.note && (
          <p className="border-b border-[var(--border)] px-5 py-3 text-sm leading-relaxed text-[var(--muted)]">💡 {dialogue.note}</p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--surface-2)] px-5 py-2.5">
          <RateToggle rate={rate} onChange={setRate} />
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]">
            <input
              type="checkbox"
              checked={showAll}
              onChange={(e) => {
                setShowAll(e.target.checked);
                setRevealed({});
              }}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            顯示全部翻譯
          </label>
        </div>

        <ol className="divide-y divide-[var(--border)]">
          {dialogue.lines.map((line, i) => {
            if (line.stage)
              return (
                <li key={i} className="bg-[var(--surface-2)] px-5 py-2 text-center text-sm italic text-[var(--muted)]">
                  （{line.stage}・{line.zh}）
                </li>
              );
            const visible = showAll || revealed[i];
            const active = speech.speakingId === ids[i];
            return (
              <li
                key={i}
                className={`flex gap-3 px-5 py-3.5 transition-colors ${active ? 'bg-[var(--accent-soft)]' : ''}`}
              >
                <SpeakButton
                  active={active}
                  disabled={!speech.supported}
                  label={`朗讀：${line.text}`}
                  onClick={() => (active ? speech.stop() : speech.speak(ids[i], line.text, lang, rate))}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{line.speaker}</p>
                  <p className="text-[17px] leading-relaxed">{line.text}</p>
                  <button
                    onClick={() => toggleLine(i)}
                    className={`mt-1 w-full rounded-md text-left text-sm transition-colors ${
                      visible
                        ? 'text-[var(--muted)]'
                        : 'bg-[var(--surface-2)] px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                    aria-expanded={visible}
                  >
                    {visible ? line.zh : '點擊顯示翻譯'}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </Card>

      {dialogue.questions && (
        <QA key={dialogue.id} questions={dialogue.questions} speech={speech} lang={lang} rate={rate} />
      )}

      <TopicVocab groups={topicVocab[dialogue.id]} idPrefix={dialogue.id} speech={speech} lang={lang} rate={rate} />

      <SpeechNotice speech={speech} lang={lang} langName={data.meta.nameZh} />
    </div>
  );
}

function QA({ questions, speech, lang, rate }) {
  const [open, setOpen] = useState({});
  const allOpen = questions.every((_, i) => open[i]);
  const toggleAll = () => setOpen(allOpen ? {} : Object.fromEntries(questions.map((_, i) => [i, true])));

  return (
    <Card className="px-5 py-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold">問答練習</h3>
          <p className="text-xs text-[var(--muted)]">先自己用完整句子回答，再點「看解答」對照。</p>
        </div>
        <button onClick={toggleAll} className="shrink-0 text-sm text-[var(--accent)] hover:underline">
          {allOpen ? '全部收起' : '全部展開'}
        </button>
      </div>
      <ol className="space-y-3">
        {questions.map((item, i) => {
          const id = `qa-${i}`;
          const active = speech.speakingId === id;
          return (
            <li key={i} className="rounded-xl border border-[var(--border)] px-4 py-3">
              <p className="font-medium">
                {i + 1}. {item.q}
              </p>
              {open[i] ? (
                <div className="mt-2 flex items-start gap-2 rounded-lg bg-[var(--good-bg)] px-3 py-2">
                  <SpeakButton
                    active={active}
                    disabled={!speech.supported}
                    label={`朗讀：${item.a}`}
                    onClick={() => (active ? speech.stop() : speech.speak(id, item.a, lang, rate))}
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-[var(--good)]">{item.a}</p>
                    <p className="text-sm text-[var(--muted)]">{item.zh}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setOpen((o) => ({ ...o, [i]: true }))}
                  className="mt-2 rounded-md bg-[var(--surface-2)] px-2.5 py-1 text-xs text-[var(--muted)] hover:text-[var(--text)]"
                >
                  看解答
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
