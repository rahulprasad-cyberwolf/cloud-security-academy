import { ArrowRight, Eye, GraduationCap, Monitor, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { MAIN_LEARNING_FLOW, MODULES } from '../data/curriculum';

export function HomePage() {
  const { navigateTo, progress, completionPercentage, toggleProjectorMode } = useCourse();

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Cloud Security Interactive Learning Lab • Beginner Friendly</span>
            </div>

            <h1
              id="main-content"
              tabIndex={-1}
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              CLOUD SECURITY —{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                How Do We Protect Cloud Resources?
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Cloud security is about making sure the <strong>right people</strong> get the{' '}
              <strong>right access</strong> to the <strong>right resources</strong>, while
              suspicious activity is detected and investigated.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigateTo('module-0')}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 transition-opacity hover:opacity-95"
              >
                <span>Start Learning Lab</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={toggleProjectorMode}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-amber-400/50 bg-amber-500/15 px-5 py-3 text-sm font-semibold text-amber-200 hover:bg-amber-500/25"
              >
                <Monitor className="h-4 w-4" aria-hidden="true" />
                <span>{progress.projectorMode ? 'Exit Projector Mode' : 'Projector Mode'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-700/60 bg-slate-950/70 p-4">
              <svg
                role="img"
                aria-label="Cloud security shield protecting accounts, resources, data, secrets, and configurations"
                viewBox="0 0 400 260"
                className="h-auto w-full"
              >
                <g className="animate-gentle-pulse">
                  <path
                    d="M200 32 L264 58 v48 c0 44-27 78-64 92 -37-14-64-48-64-92 V58 Z"
                    fill="rgba(34,211,238,0.12)"
                    stroke="#34d399"
                    strokeWidth="3"
                  />
                  <path
                    d="M178 112 l14 14 32-32"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <text x="200" y="220" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700">
                  Right Access • Right Resources • Detection
                </text>
                <text x="200" y="240" textAnchor="middle" fill="#22d3ee" fontSize="11">
                  Interactive Cloud Security Classroom
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Main Cloud Security Learning Flow (Interactive Visual Roadmap) */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white">Main Cloud Security Learning Flow</h2>
        <p className="mb-4 text-sm text-slate-400">
          Click any step in the roadmap to jump straight to that topic.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {MAIN_LEARNING_FLOW.map((item, idx) => {
            const isDone = progress.completedModules.includes(item.page);
            return (
              <div key={item.label} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateTo(item.page)}
                  className={`rounded-xl border px-3.5 py-2 text-left transition-colors ${
                    isDone
                      ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-100'
                      : 'border-slate-700/80 bg-slate-900/75 text-slate-100 hover:border-cyan-400/60'
                  }`}
                >
                  <span className="block text-[10px] font-bold text-cyan-300">
                    STEP {item.step}
                  </span>
                  <span className="text-xs font-bold">{item.label}</span>
                </button>
                {idx < MAIN_LEARNING_FLOW.length - 1 && (
                  <span className="text-slate-500" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Classroom Progress Metrics */}
      <section aria-label="Classroom progress summary" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-slate-400 uppercase">Course Progress</p>
          <p className="mt-1 text-2xl font-extrabold text-cyan-300">{completionPercentage}%</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-slate-400 uppercase">Topics Completed</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-300">
            {progress.completedModules.length} / {MODULES.length}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-slate-400 uppercase">Activities Completed</p>
          <p className="mt-1 text-2xl font-extrabold text-sky-300">{progress.completedLabs.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-slate-400 uppercase">Classroom Points</p>
          <p className="mt-1 text-2xl font-extrabold text-white">{progress.earnedPoints} pts</p>
        </div>
      </section>

      {/* Classroom Features */}
      <section aria-label="How this classroom works" className="grid gap-4 md:grid-cols-3">
        <div className="glass-card rounded-2xl p-5">
          <Eye className="mb-2 h-6 w-6 text-cyan-300" aria-hidden="true" />
          <h2 className="text-base font-bold text-white">Simple & Visual</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
            Every concept uses a Simple Explanation, Real-World Analogy, Visual SVG, Example,
            Activity, and Quick Question.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <Terminal className="mb-2 h-6 w-6 text-emerald-300" aria-hidden="true" />
          <h2 className="text-base font-bold text-white">Practical Security Labs</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
            Inspect Audit Logs, detect hardcoded Secrets, spot Misconfigurations, investigate a
            2 AM event, and Secure the Cloud.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <GraduationCap className="mb-2 h-6 w-6 text-violet-300" aria-hidden="true" />
          <h2 className="text-base font-bold text-white">Teacher & Projector Modes</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
            Toggle Teacher Mode for classroom notes and Projector Mode for full-screen high-contrast
            teaching.
          </p>
        </div>
      </section>

      <section className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-emerald-400" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold text-white">Ready to Begin?</h2>
            <p className="text-sm text-slate-400">
              Start with “What is Cloud Security?” and what we are protecting.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('module-0')}
          className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/25"
        >
          <span>Start Topic 1</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
