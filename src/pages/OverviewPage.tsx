import { Award, BookMarked, CheckCircle2, Clock, PlayCircle, ShieldCheck } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { MODULES } from '../data/curriculum';

export function OverviewPage() {
  const { progress, completionPercentage, navigateTo } = useCourse();

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Course Overview & Complete Syllabus
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Follow all 11 modules from Cloud Basics to Incident Response, then test your skills in
          the <strong>Secure the Cloud</strong> practical challenge and 15-question Final Quiz.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold sm:text-sm">
          <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">
            Progress: {completionPercentage}%
          </span>
          <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-200">
            Modules: {progress.completedModules.length} / {MODULES.length}
          </span>
          <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-200">
            Points: {progress.earnedPoints} pts
          </span>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MODULES.map((mod) => {
          const isDone = progress.completedModules.includes(mod.id);
          return (
            <article
              key={mod.id}
              className="glass-card flex flex-col justify-between rounded-2xl p-5 transition-colors hover:border-cyan-400/40"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
                    Module {mod.number} • {mod.topicTag}
                  </span>
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Done
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {mod.duration}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-semibold text-white">{mod.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{mod.summary}</p>
                <p className="mt-3 rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                  <strong>Analogy:</strong> {mod.analogy}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigateTo(mod.id)}
                className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/25"
              >
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                <span>{isDone ? 'Review Module' : 'Start Module'}</span>
              </button>
            </article>
          );
        })}
      </div>

      {/* Capstone & Tools */}
      <div className="grid gap-4 md:grid-cols-3">
        <section className="glass-card flex flex-col justify-between rounded-2xl border border-amber-400/30 p-5">
          <div>
            <ShieldCheck className="mb-2 h-7 w-7 text-amber-300" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">Secure the Cloud Challenge</h2>
            <p className="mt-1 text-sm text-slate-300">
              Fix 8 real-world issues in a fictional cloud and watch it transform from ⚠️ to 🛡️.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('final-challenge')}
            className="mt-4 min-h-[42px] rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-amber-300"
          >
            Launch Lab
          </button>
        </section>

        <section className="glass-card flex flex-col justify-between rounded-2xl border border-cyan-400/30 p-5">
          <div>
            <BookMarked className="mb-2 h-7 w-7 text-cyan-300" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">Beginner Glossary</h2>
            <p className="mt-1 text-sm text-slate-300">
              19 everyday cloud security terms explained in one simple sentence each.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('glossary')}
            className="mt-4 min-h-[42px] rounded-xl border border-cyan-400/50 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/25"
          >
            Open Glossary
          </button>
        </section>

        <section className="glass-card flex flex-col justify-between rounded-2xl border border-emerald-400/30 p-5">
          <div>
            <Award className="mb-2 h-7 w-7 text-emerald-300" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">Final Quiz & Certificate</h2>
            <p className="mt-1 text-sm text-slate-300">
              15 beginner questions + your personalized completion certificate.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('final-quiz')}
            className="mt-4 min-h-[42px] rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400"
          >
            Take Final Quiz
          </button>
        </section>
      </div>
    </div>
  );
}
