import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useCourse } from '../context/CourseContext';

const RECAP_ITEMS = [
  { term: 'Identity', question: 'Who are you?' },
  { term: 'Authentication', question: 'Prove who you are.' },
  { term: 'Authorization', question: 'What can you access?' },
  { term: 'Logging', question: 'What happened?' },
  { term: 'Monitoring', question: 'What is happening?' },
  { term: 'Alert', question: 'What needs attention?' },
  { term: 'Secrets', question: 'What must stay protected?' },
  { term: 'Misconfiguration', question: 'What is configured incorrectly?' },
  { term: 'Investigation', question: 'What happened?' },
  { term: 'Incident Response', question: 'What should we do?' },
  { term: 'Assessment', question: 'Is the cloud environment secure?' },
];

export function FinalRecapPage() {
  const { navigateTo } = useCourse();
  const [selected, setSelected] = useState(RECAP_ITEMS[0]);

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-200">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Visual Quick Recap</span>
        </div>
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Quick Recap: Every Concept in One Question
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Click any item below to review the core question it answers.
        </p>
      </header>

      <section className="glass-card rounded-2xl p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RECAP_ITEMS.map((item) => {
            const active = selected.term === item.term;
            return (
              <button
                key={item.term}
                type="button"
                onClick={() => setSelected(item)}
                aria-pressed={active}
                className={`rounded-xl border p-4 text-left transition-all ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/20'
                    : 'border-slate-700/70 bg-slate-900/70 hover:border-cyan-400/40'
                }`}
              >
                <p className="text-sm font-bold text-white">{item.term}</p>
                <p className="mt-1 text-xs font-medium text-cyan-300">→ {item.question}</p>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-5 rounded-2xl border border-cyan-400/35 bg-slate-950/90 p-5 text-center">
          <p className="text-lg font-extrabold text-white">{selected.term}</p>
          <p className="mt-1 text-base font-semibold text-emerald-300">→ {selected.question}</p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => navigateTo('final-quiz')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400"
          >
            <span>Take the Final Quiz</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
