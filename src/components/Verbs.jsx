import { useState } from 'react';
import { Card, EmptyState, LevelBadge, ScenarioGrid, SpeakButton, SpeechNotice, sortByLevel } from './ui.jsx';

// 會被朗讀的欄位（依表頭判斷）：西／義文人稱變化、副動詞、例句、反身形式
const SPOKEN = /^(yo|tú|él|nosotros|vosotros|ellos|io|tu|lui|noi|voi|loro|副動詞|對話例句|例句|動詞變化|反身$)/;
const HAS_CJK = /[\u3400-\u9fff]/;

/** 動詞表：依資料中的 verbs 陣列顯示變化表，點動詞原型可朗讀整列 */
export default function Verbs({ data, level, speech, rate }) {
  const list = sortByLevel(data.verbs || []);
  const [activeId, setActiveId] = useState(() => (list.find((x) => x.level === level) || list[0])?.id);
  const lang = data.meta.speechLang;

  if (!list.length)
    return <EmptyState>{data.meta.nameZh}目前還沒有動詞表，可以在資料檔的 verbs 陣列新增。</EmptyState>;

  const topic = list.find((x) => x.id === activeId) || list[0];

  return (
    <div className="space-y-4">
      <section>
        <h2 className="mb-2 text-sm font-semibold text-[var(--muted)]">{list.length} 個主題</h2>
        <ScenarioGrid
          level={level}
          value={topic.id}
          onChange={setActiveId}
          items={list.map((x) => ({ id: x.id, level: x.level, tag: x.title, label: x.titleZh }))}
        />
      </section>

      <Card className="px-5 py-4">
        <div className="mb-1 flex items-center gap-2">
          <LevelBadge level={topic.level} />
          {topic.source && <span className="text-xs text-[var(--muted)]">📄 {topic.source}</span>}
        </div>
        <h2 className="text-lg font-bold">{topic.title}</h2>
        <p className="text-sm text-[var(--muted)]">{topic.titleZh}</p>
        {topic.intro && <p className="mt-3 text-sm leading-relaxed">{topic.intro}</p>}
      </Card>

      {topic.tables.map((t, ti) => (
        <Card key={`${topic.id}-${ti}`} className="overflow-hidden">
          <h3 className="border-b border-[var(--border)] px-5 py-3 font-bold">{t.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-sm">
              <thead className="bg-[var(--surface-2)] text-left text-xs text-[var(--muted)]">
                <tr>
                  {t.headers.map((h) => (
                    <th key={h} className="whitespace-nowrap px-3 py-2 font-semibold first:pl-5 last:pr-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {t.rows.map((row, ri) => {
                  const id = `${topic.id}-${ti}-${ri}`;
                  const active = speech.speakingId === id;
                  // 朗讀：第一欄＋人稱變化／副動詞／例句欄（略過中文說明與「—」）
                  const spoken = row.filter((c, ci) => (ci === 0 || SPOKEN.test(t.headers[ci])) && c !== '—' && !HAS_CJK.test(c));
                  return (
                    <tr key={ri} className={active ? 'bg-[var(--accent-soft)]' : ''}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`whitespace-nowrap px-3 py-2 first:pl-5 last:pr-5 ${
                            ci === 0 ? 'font-semibold text-[var(--accent)]' : ci === 1 ? 'text-[var(--muted)]' : ''
                          }`}
                        >
                          {ci === 0 ? (
                            <span className="flex items-center gap-2">
                              <SpeakButton
                                active={active}
                                disabled={!speech.supported}
                                label={`朗讀 ${cell}`}
                                onClick={() => (active ? speech.stop() : speech.speak(id, spoken.join(', '), lang, rate))}
                              />
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {t.note && (
            <p className="border-t border-[var(--border)] bg-[var(--surface-2)] px-5 py-3 text-sm leading-relaxed">💡 {t.note}</p>
          )}
        </Card>
      ))}

      <p className="text-xs text-[var(--muted)]">表格在手機上可以左右滑動；點 🔊 會依序朗讀整列變化。</p>
      <SpeechNotice speech={speech} lang={lang} langName={data.meta.nameZh} />
    </div>
  );
}
