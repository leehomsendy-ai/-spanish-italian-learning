// 共用的小型 UI 元件

export function Segmented({ options, value, onChange, size = 'md', label }) {
  const pad = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-0.5"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`${pad} rounded-md font-medium whitespace-nowrap transition-colors ${
              active
                ? 'bg-[var(--surface)] text-[var(--accent)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] ${className}`}>{children}</div>
  );
}

export function LevelBadge({ level }) {
  return (
    <span className="rounded-md bg-[var(--accent-soft)] px-1.5 py-0.5 text-[11px] font-semibold tracking-wide text-[var(--accent)]">
      {level}
    </span>
  );
}

export function EmptyState({ children }) {
  return (
    <Card className="p-8 text-center text-sm text-[var(--muted)]">
      <div className="mb-2 text-3xl">🗂️</div>
      {children}
    </Card>
  );
}

export function SpeakerIcon({ active, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" fillOpacity="0.15" />
      {active ? (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 5a10 10 0 0 1 0 14" />
        </>
      ) : (
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      )}
    </svg>
  );
}

export function SpeakButton({ onClick, active, label = '朗讀', disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors disabled:opacity-40 ${
        active
          ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
          : 'border-[var(--border)] text-[var(--accent)] hover:bg-[var(--accent-soft)]'
      }`}
    >
      <SpeakerIcon active={active} />
    </button>
  );
}

export function RateToggle({ rate, onChange }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
      <span>語速</span>
      <Segmented
        size="sm"
        label="語速"
        value={rate}
        onChange={onChange}
        options={[
          { value: 0.7, label: '0.7x 慢速' },
          { value: 1, label: '1.0x 正常' },
        ]}
      />
    </div>
  );
}

export function SpeechNotice({ speech, lang, langName }) {
  if (!speech.supported)
    return <Notice>此瀏覽器不支援語音朗讀（Web Speech API），建議使用 Chrome、Edge 或 Safari。</Notice>;
  if (!speech.hasVoiceFor(lang))
    return <Notice>此裝置未安裝{langName}語音，朗讀時會使用系統預設語音，發音可能不準確。</Notice>;
  return null;
}

function Notice({ children }) {
  return (
    <p className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-xs text-[var(--muted)]">
      {children}
    </p>
  );
}

export function Feedback({ correct, children }) {
  return (
    <div
      className={`mt-4 rounded-xl px-4 py-3 text-sm leading-relaxed ${
        correct ? 'bg-[var(--good-bg)]' : 'bg-[var(--bad-bg)]'
      }`}
      role="status"
    >
      <p className={`mb-1 font-semibold ${correct ? 'text-[var(--good)]' : 'text-[var(--bad)]'}`}>
        {correct ? '✓ 答對了！' : '✗ 答錯了'}
      </p>
      <div className="text-[var(--text)]">{children}</div>
    </div>
  );
}

export function PillTabs({ items, value, onChange }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {items.map((it) => {
        const active = it.id === value;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              active
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

const LEVEL_ORDER = { A1: 0, A2: 1, B1: 2 };
export const sortByLevel = (items) => [...items].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);

/** 情境／主題清單：列出所有項目，目前難度的項目正常顯示，其餘淡化 */
export function ScenarioGrid({ items, value, onChange, level }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {items.map((it) => {
        const active = it.id === value;
        const other = it.level !== level;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            aria-pressed={active}
            className={`min-w-0 rounded-xl border px-3 py-2.5 text-left transition-colors ${
              active
                ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]'
            } ${other && !active ? 'opacity-55 hover:opacity-100' : ''}`}
          >
            <span className="flex items-center gap-1.5">
              <LevelBadge level={it.level} />
              <span className={`text-xs font-semibold ${active ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`}>
                {it.tag}
              </span>
            </span>
            <span className="mt-1 block truncate text-sm font-medium">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** 主題字彙・常用句型卡片（資料：src/data/topic-vocab.js） */
export function TopicVocab({ groups, idPrefix, speech, lang, rate }) {
  if (!groups?.length) return null;
  return (
    <Card className="px-5 py-4">
      <h3 className="mb-3 font-bold">主題字彙・常用句型</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map(([title, items], gi) => (
          <section key={gi} className="min-w-0">
            <h4 className="mb-1.5 text-xs font-semibold tracking-wide text-[var(--accent)]">{title}</h4>
            <ul className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)]">
              {items.map(([word, zh], k) => {
                const id = `${idPrefix}-v${gi}-${k}`;
                const active = speech.speakingId === id;
                return (
                  <li key={k} className={`flex items-center gap-3 px-3 py-2 ${active ? 'bg-[var(--accent-soft)]' : ''}`}>
                    <SpeakButton
                      active={active}
                      disabled={!speech.supported}
                      label={`朗讀：${word}`}
                      onClick={() =>
                        active ? speech.stop() : speech.speak(id, word.replace(/\s[/—]\s/g, ', ').replace(/[()…]/g, ' '), lang, rate)
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium">{word}</p>
                      <p className="text-sm text-[var(--muted)]">{zh}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Card>
  );
}
