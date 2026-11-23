import { useEffect, useState } from 'react';
import { Card, EmptyState, LevelBadge, PillTabs, RateToggle, SpeakButton, SpeechNotice } from './ui.jsx';

export default function Dialogues({ data, level, speech, rate, setRate }) {
  const list = data.dialogues.filter((d) => d.level === level);
  const [activeId, setActiveId] = useState(list[0]?.id);
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
      dialogue.lines.map((l, i) => ({ id: ids[i], text: l.text })),
      lang,
      rate,
    );
  };

  const toggleLine = (i) => setRevealed((r) => ({ ...r, [i]: !r[i] }));

  return (
    <div className="space-y-4">
      <PillTabs
        items={list.map((d) => ({ id: d.id, label: `${d.scene}｜${d.titleZh}` }))}
        value={dialogue.id}
        onChange={setActiveId}
      />

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <LevelBadge level={dialogue.level} />
              <span className="text-xs text-[var(--muted)]">情境：{dialogue.scene}</span>
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

      <SpeechNotice speech={speech} lang={lang} langName={data.meta.nameZh} />
    </div>
  );
}
