import { ArrowRight, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCourse } from '../context/CourseContext';

const RECAP_STAGES = [
  { name: 'CLOUD', summary: 'Rented servers, storage, and apps accessed over the internet.' },
  { name: 'SECURITY', summary: 'Protecting data and accounts—just like locking a house.' },
  { name: 'IDENTITY', summary: 'Proving who you are (Authentication: "Are you really Rahul?").' },
  { name: 'ACCESS', summary: 'Deciding what you can touch (Authorization + Least Privilege).' },
  { name: 'LOGGING', summary: 'CCTV recording of every login, file open, and setting change.' },
  { name: 'MONITORING', summary: 'Security guard watching logs and system graphs continuously.' },
  { name: 'ALERTS', summary: 'Alarm bell ringing when something suspicious needs attention.' },
  { name: 'SECRETS', summary: 'Keeping API keys & passwords locked in a Secret Manager vault.' },
  { name: 'ASSESSMENT', summary: 'Proactive house inspection to spot misconfigurations early.' },
  { name: 'INVESTIGATION', summary: 'Connecting timeline clues to see what happened.' },
  { name: 'INCIDENT RESPONSE', summary: '5-step calm action: Detect → Investigate → Contain → Recover → Learn.' },
];

export function FinalRecapPage() {
  const { navigateTo } = useCourse();
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => {
        if (prev >= RECAP_STAGES.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => window.clearInterval(timer);
  }, [playing]);

  const current = RECAP_STAGES[activeIdx];

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-200">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>2-Hour Classroom Visual Recap</span>
        </div>
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Final Visual Recap: The Big Picture
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Click <strong>Animate Recap</strong> or click any stage to review the entire 2-hour
          journey from <strong>CLOUD</strong> to <strong>INCIDENT RESPONSE</strong>.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveIdx(0);
              setPlaying(true);
            }}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            <span>Animate Stage by Stage</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setActiveIdx(0);
            }}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </header>

      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center gap-2">
          {RECAP_STAGES.map((st, idx) => {
            const isCurrent = idx === activeIdx;
            const isVisited = idx <= activeIdx;
            return (
              <div key={st.name} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setActiveIdx(idx);
                  }}
                  aria-pressed={isCurrent}
                  className={`min-h-[40px] rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                    isCurrent
                      ? 'border-cyan-300 bg-cyan-400 text-slate-950 scale-105'
                      : isVisited
                        ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200'
                        : 'border-slate-700 bg-slate-900 text-slate-400'
                  }`}
                >
                  {idx + 1}. {st.name}
                </button>
                {idx < RECAP_STAGES.length - 1 && (
                  <span className="text-slate-600" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-6 rounded-2xl border border-cyan-400/40 bg-slate-950/90 p-6">
          <p className="text-xs font-bold tracking-wider text-cyan-300 uppercase">
            Stage {activeIdx + 1} of {RECAP_STAGES.length}
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-white">{current.name}</h2>
          <p className="mt-2 text-base text-slate-200">{current.summary}</p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => navigateTo('final-quiz')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400"
          >
            <span>Take the 15-Question Final Quiz</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
