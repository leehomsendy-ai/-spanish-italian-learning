import { LANGUAGES, LEVELS } from '../data/index.js';
import { Segmented } from './ui.jsx';

export const MODULES = [
  { id: 'dialogues', label: '情境對話', sub: { es: 'Diálogos', it: 'Dialoghi' }, icon: '💬' },
  { id: 'readings', label: '短文閱讀', sub: { es: 'Lecturas', it: 'Letture' }, icon: '📖' },
  { id: 'verbs', label: '動詞表', sub: { es: 'Verbos', it: 'Verbi' }, icon: '📋' },
  { id: 'numbers', label: '數字', sub: { es: 'Números', it: 'Numeri' }, icon: '🔢' },
  { id: 'exercises', label: '互動題庫', sub: { es: 'Ejercicios', it: 'Esercizi' }, icon: '✏️' },
];

export default function Header({ lang, setLang, level, setLevel, module, setModule }) {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              {LANGUAGES[lang].meta.flag}
            </span>
            <div className="leading-tight">
              <h1 className="text-base font-bold">西義雙語學習</h1>
              <p className="text-xs text-[var(--muted)]">Español · Italiano</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Segmented
              label="學習語言"
              value={lang}
              onChange={setLang}
              options={Object.values(LANGUAGES).map((l) => ({
                value: l.meta.code,
                label: `${l.meta.flag} ${l.meta.name}`,
              }))}
            />
            <Segmented
              label="難度"
              value={level}
              onChange={setLevel}
              options={LEVELS.map((l) => ({ value: l.id, label: l.label }))}
            />
          </div>
        </div>
        <nav className="-mx-4 flex gap-0.5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:gap-1 sm:px-0" aria-label="學習模組">
          {MODULES.map((m) => {
            const active = m.id === module;
            return (
              <button
                key={m.id}
                onClick={() => setModule(m.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex-1 shrink-0 border-b-2 px-1.5 pb-2.5 pt-1 text-center transition-colors sm:flex-none sm:px-4 ${
                  active
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                <span className="whitespace-nowrap text-sm font-semibold">
                  <span className="mr-1 hidden min-[420px]:inline" aria-hidden="true">
                    {m.icon}
                  </span>
                  {m.label}
                </span>
                <span className="ml-1 hidden text-xs opacity-70 sm:inline">{m.sub[lang]}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
