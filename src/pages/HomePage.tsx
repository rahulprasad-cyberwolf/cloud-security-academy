import { ArrowRight, Clock, Eye, GraduationCap, Monitor, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { MODULES, TWO_HOUR_ROADMAP } from '../data/curriculum';

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
              <span>120-Minute Interactive Classroom • Zero Jargon • 100% Simulated</span>
            </div>

            <h1
              id="main-content"
              tabIndex={-1}
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              2-Hour Cloud Security{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Interactive Classroom
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Designed for beginner college students and live projector teaching. Learn what the
              cloud is, how logs and alerts work, how to protect secrets, spot misconfigurations,
              and respond to incidents—all with visual SVGs and hands-on labs.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigateTo('module-0')}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 transition-opacity hover:opacity-95"
              >
                <span>Start Section 1 (15 min)</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={toggleProjectorMode}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-amber-400/50 bg-amber-500/15 px-5 py-3 text-sm font-semibold text-amber-200 hover:bg-amber-500/25"
              >
                <Monitor className="h-4 w-4" aria-hidden="true" />
                <span>{progress.projectorMode ? 'Exit Projector Mode' : 'Launch Projector Mode'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-700/60 bg-slate-950/70 p-4">
              <svg
                role="img"
                aria-label="Cloud security classroom illustration showing a protected cloud server, security shield, CCTV log monitor, and alert beacon"
                viewBox="0 0 400 280"
                className="h-auto w-full"
              >
                <path
                  d="M115 140a42 42 0 0 1 34-41 58 58 0 0 1 112 16 38 38 0 0 1 6 75H122a34 34 0 0 1-7-50z"
                  fill="rgba(34,211,238,0.14)"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <g className="animate-gentle-pulse">
                  <path
                    d="M200 66 L240 84 v34 c0 26-17 46-40 54 -23-8-40-28-40-54 V84 Z"
                    fill="#0f172a"
                    stroke="#34d399"
                    strokeWidth="3"
                  />
                  <path d="M186 118 l9 9 20-20" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                </g>
                <text x="200" y="218" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700">
                  120-Minute Interactive Classroom
                </text>
                <text x="200" y="238" textAnchor="middle" fill="#22d3ee" fontSize="11">
                  Visuals • Analogies • Live Labs • Projector Ready
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Hour (120-Minute) Interactive Learning Roadmap */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white">
              2-Hour Classroom Roadmap (Total: 120 Minutes)
            </h2>
            <p className="text-sm text-slate-400">
              Click any section below to jump straight to that part of the workshop.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-200">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            120 Minutes Total
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TWO_HOUR_ROADMAP.map((item) => (
            <button
              key={item.section}
              type="button"
              onClick={() => navigateTo(item.page)}
              className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4 text-left transition-colors hover:border-cyan-400/60 hover:bg-slate-800/80"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-300">{item.section}</span>
                <span className="rounded-full bg-slate-950 px-2 py-0.5 font-semibold text-amber-300">
                  {item.minutes} min
                </span>
              </div>
              <p className="mt-1.5 text-sm font-bold text-white">{item.title}</p>
              <p className="mt-1 text-xs text-slate-400">{item.summary}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Classroom Progress Metrics */}
      <section aria-label="Classroom progress summary" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-slate-400 uppercase">Course Progress</p>
          <p className="mt-1 text-2xl font-extrabold text-cyan-300">{completionPercentage}%</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-slate-400 uppercase">Modules Completed</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-300">
            {progress.completedModules.length} / {MODULES.length}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-slate-400 uppercase">Labs & Sims</p>
          <p className="mt-1 text-2xl font-extrabold text-sky-300">{progress.completedLabs.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-slate-400 uppercase">Assessment Score</p>
          <p className="mt-1 text-2xl font-extrabold text-amber-300">{progress.assessmentScore}%</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-slate-400 uppercase">Classroom Points</p>
          <p className="mt-1 text-2xl font-extrabold text-white">{progress.earnedPoints} pts</p>
        </div>
      </section>

      {/* Three Classroom Pillars */}
      <section aria-label="How this classroom works" className="grid gap-4 md:grid-cols-3">
        <div className="glass-card rounded-2xl p-5">
          <Eye className="mb-2 h-6 w-6 text-cyan-300" aria-hidden="true" />
          <h2 className="text-base font-bold text-white">Visual-First Teaching</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
            Every concept follows: What is it → Analogy → Visual SVG → Simple Example → Activity →
            Quick Question.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <Terminal className="mb-2 h-6 w-6 text-emerald-300" aria-hidden="true" />
          <h2 className="text-base font-bold text-white">Hands-On Labs & Break Game</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
            Includes a 10-minute Security Detective Challenge, 5 Misconfiguration Labs, and Secure
            the Cloud.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <GraduationCap className="mb-2 h-6 w-6 text-violet-300" aria-hidden="true" />
          <h2 className="text-base font-bold text-white">Teacher & Projector Modes</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
            Enable Projector Mode for large text and quick Previous / Next / Explain / Activity /
            Answer buttons.
          </p>
        </div>
      </section>

      <section className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-emerald-400" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold text-white">Ready to Teach or Learn?</h2>
            <p className="text-sm text-slate-400">
              Start Section 1 or open the full Course Overview.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('module-0')}
          className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/25"
        >
          <span>Begin Section 1</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
