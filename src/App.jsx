import { useEffect, useState } from 'react';
import { LANGUAGES } from './data/index.js';
import { useSpeech } from './hooks/useSpeech.js';
import { load, save } from './storage.js';
import Header from './components/Header.jsx';
import Dialogues from './components/Dialogues.jsx';
import Readings from './components/Readings.jsx';
import Exercises from './components/Exercises.jsx';
import Verbs from './components/Verbs.jsx';

const PREFS_KEY = 'sil-prefs';
const DEFAULT_PREFS = { lang: 'es', level: 'A1', module: 'dialogues', rate: 1 };

export default function App() {
  const [prefs, setPrefs] = useState(() => {
    const p = load(PREFS_KEY, DEFAULT_PREFS);
    return LANGUAGES[p.lang] ? p : DEFAULT_PREFS;
  });
  const speech = useSpeech();
  const set = (k) => (v) => setPrefs((p) => ({ ...p, [k]: v }));

  useEffect(() => save(PREFS_KEY, prefs), [prefs]);
  useEffect(() => {
    document.documentElement.dataset.lang = prefs.lang;
  }, [prefs.lang]);
  useEffect(() => speech.stop(), [prefs.lang, prefs.level, prefs.module]); // eslint-disable-line react-hooks/exhaustive-deps

  const data = LANGUAGES[prefs.lang];
  const common = { data, level: prefs.level, speech, rate: prefs.rate, setRate: set('rate') };
  const viewKey = `${prefs.lang}-${prefs.level}`;

  return (
    <div className="min-h-screen">
      <Header
        lang={prefs.lang}
        setLang={set('lang')}
        level={prefs.level}
        setLevel={set('level')}
        module={prefs.module}
        setModule={set('module')}
      />
      <main className="mx-auto max-w-4xl px-4 py-5 pb-16">
        {prefs.module === 'dialogues' && <Dialogues key={viewKey} {...common} />}
        {prefs.module === 'readings' && <Readings key={viewKey} {...common} />}
        {prefs.module === 'verbs' && <Verbs key={viewKey} {...common} />}
        {prefs.module === 'exercises' && <Exercises key={viewKey} data={data} level={prefs.level} />}
      </main>
      <footer className="pb-8 text-center text-xs text-[var(--muted)]">
        資料檔位於 <code>src/data/</code>，可自行擴充對話、文章與題庫。
        <br />
        版本：{__BUILD__}
      </footer>
    </div>
  );
}
