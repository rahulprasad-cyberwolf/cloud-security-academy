import {
  Award,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  GraduationCap,
  Home,
  LayoutGrid,
  Menu,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { MODULES, PAGE_ORDER } from '../data/curriculum';
import type { PageId } from '../types/course';

export function ClassroomShell({ children }: { children: React.ReactNode }) {
  const {
    progress,
    completionPercentage,
    navigateTo,
    goNext,
    goBack,
    canGoNext,
    canGoBack,
    setMode,
    toggleProjectorMode,
    toggleAnimations,
    resetAllProgress,
  } = useCourse();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageId) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const currentIdx = PAGE_ORDER.indexOf(progress.currentPage);
  const currentModule = MODULES.find((m) => m.id === progress.currentPage);

  return (
    <div
      className={`min-h-screen bg-[#060b14] bg-cyber-grid text-slate-100 ${
        progress.animationsPaused ? 'animations-paused' : ''
      } ${progress.projectorMode ? 'text-lg' : ''}`}
    >
      <a href="#main-content" className="skip-link visually-hidden">
        Skip to main content
      </a>

      {/* Top Classroom Bar */}
      <header className="no-print sticky top-0 z-40 border-b border-slate-800/80 bg-[#060b14]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            {!progress.projectorMode && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle module navigation"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-900/70 text-slate-200 hover:border-cyan-400/50 lg:hidden"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 rounded-xl text-left transition-opacity hover:opacity-90"
            >
              <svg
                role="img"
                aria-label="CloudSec Classroom"
                viewBox="0 0 40 40"
                className="h-9 w-9 shrink-0"
              >
                <defs>
                  <linearGradient id="brandShield" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 3L6 9v10c0 9.2 6 16.5 14 19 8-2.5 14-9.8 14-19V9L20 3z"
                  fill="rgba(34,211,238,0.12)"
                  stroke="url(#brandShield)"
                  strokeWidth="2.2"
                />
                <path
                  d="M14 21a4 4 0 0 1 3.8-4 5 5 0 0 1 9.4 1.4A3.2 3.2 0 0 1 26.5 24H15a3 3 0 0 1-1-3z"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <span className="block text-sm font-bold tracking-tight text-white sm:text-base">
                  CloudSec Classroom
                </span>
                <span className="hidden text-xs text-slate-400 sm:block">
                  2-Hour Interactive Beginner Cloud Security Lab
                </span>
              </div>
            </button>
          </div>

          {/* Right Classroom Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {!progress.projectorMode && (
              <div className="hidden items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-1.5 md:flex">
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                  <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{progress.earnedPoints} pts</span>
                </div>
                <span className="h-3.5 w-px bg-slate-700" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300">{completionPercentage}%</span>
                  <progress
                    value={completionPercentage}
                    max={100}
                    aria-label="Course completion percentage"
                    className="h-2 w-16 overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-slate-800 [&::-webkit-progress-value]:bg-cyan-400"
                  />
                </div>
              </div>
            )}

            {/* Student / Teacher Mode Switch */}
            <div
              role="group"
              aria-label="Classroom display mode"
              className="flex rounded-xl border border-slate-700/80 bg-slate-900/80 p-0.5"
            >
              <button
                type="button"
                onClick={() => setMode('student')}
                aria-pressed={progress.mode === 'student'}
                className={`flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  progress.mode === 'student'
                    ? 'bg-cyan-500/20 text-cyan-200'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('teacher')}
                aria-pressed={progress.mode === 'teacher'}
                className={`flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  progress.mode === 'teacher'
                    ? 'bg-violet-500/25 text-violet-200'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Teacher</span>
              </button>
            </div>

            {/* Projector Mode Toggle */}
            <button
              type="button"
              onClick={toggleProjectorMode}
              aria-pressed={progress.projectorMode}
              className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
                progress.projectorMode
                  ? 'border-amber-400 bg-amber-500/25 text-amber-200'
                  : 'border-slate-700/80 bg-slate-900/80 text-slate-300 hover:border-amber-400/50'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">
                {progress.projectorMode ? 'Exit Projector' : 'Projector Mode'}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleAnimations}
              aria-label={
                progress.animationsPaused ? 'Play diagram animations' : 'Pause diagram animations'
              }
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-cyan-400/50 hover:text-white"
            >
              {progress.animationsPaused ? (
                <Play className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              )}
              <span className="hidden md:inline">
                {progress.animationsPaused ? 'Play' : 'Pause'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mx-auto flex flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row ${
          progress.projectorMode ? 'max-w-5xl pb-24' : 'max-w-7xl'
        }`}
      >
        {/* Sidebar Navigation (hidden in Projector Mode for clean full-screen teaching) */}
        {!progress.projectorMode && (
          <aside
            className={`no-print lg:w-72 lg:shrink-0 ${
              mobileMenuOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <nav aria-label="Course modules" className="glass-card sticky top-20 rounded-2xl p-3.5">
              <div className="mb-3 flex items-center justify-between px-2">
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  2-Hour Classroom
                </span>
                <span className="text-xs font-medium text-cyan-300">
                  {progress.completedModules.length}/{MODULES.length}
                </span>
              </div>

              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('home')}
                    aria-current={progress.currentPage === 'home' ? 'page' : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                      progress.currentPage === 'home'
                        ? 'bg-cyan-500/20 text-cyan-200'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <Home className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Home & 2-Hr Roadmap</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('overview')}
                    aria-current={progress.currentPage === 'overview' ? 'page' : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                      progress.currentPage === 'overview'
                        ? 'bg-cyan-500/20 text-cyan-200'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Course Overview</span>
                  </button>
                </li>

                <li className="my-2 border-t border-slate-800 pt-2">
                  <span className="px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                    Teaching Modules
                  </span>
                </li>

                {MODULES.map((mod) => {
                  const isActive = progress.currentPage === mod.id;
                  const isDone = progress.completedModules.includes(mod.id);
                  return (
                    <li key={mod.id}>
                      <button
                        type="button"
                        onClick={() => handleNav(mod.id)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-1.5 text-left text-sm transition-colors ${
                          isActive
                            ? 'bg-cyan-500/20 font-semibold text-cyan-100'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 truncate">
                          <span
                            className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                              isActive
                                ? 'bg-cyan-400 text-slate-950'
                                : isDone
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {mod.number}
                          </span>
                          <span className="truncate">{mod.shortTitle}</span>
                        </span>
                        {isDone && (
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 text-emerald-400"
                            aria-label="Completed"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}

                <li className="mt-2 space-y-1 border-t border-slate-800 pt-2">
                  <button
                    type="button"
                    onClick={() => handleNav('detective-challenge')}
                    aria-current={progress.currentPage === 'detective-challenge' ? 'page' : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                      progress.currentPage === 'detective-challenge'
                        ? 'bg-violet-500/20 text-violet-200'
                        : 'text-violet-300 hover:bg-violet-500/10'
                    }`}
                  >
                    <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>10m Detective Challenge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('final-challenge')}
                    aria-current={progress.currentPage === 'final-challenge' ? 'page' : undefined}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                      progress.currentPage === 'final-challenge'
                        ? 'bg-amber-500/20 text-amber-200'
                        : 'text-amber-300/90 hover:bg-amber-500/10'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Secure the Cloud Lab</span>
                    </span>
                    {progress.finalSecurityScore === 100 && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('final-recap')}
                    aria-current={progress.currentPage === 'final-recap' ? 'page' : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                      progress.currentPage === 'final-recap'
                        ? 'bg-cyan-500/20 text-cyan-200'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Visual Final Recap</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('glossary')}
                    aria-current={progress.currentPage === 'glossary' ? 'page' : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                      progress.currentPage === 'glossary'
                        ? 'bg-cyan-500/20 text-cyan-200'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <BookMarked className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Beginner Glossary</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('final-quiz')}
                    aria-current={progress.currentPage === 'final-quiz' ? 'page' : undefined}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                      progress.currentPage === 'final-quiz'
                        ? 'bg-emerald-500/20 text-emerald-200'
                        : 'text-emerald-300/90 hover:bg-emerald-500/10'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Final Quiz & Certificate</span>
                    </span>
                    {progress.finalQuizSubmitted && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    )}
                  </button>
                </li>
              </ul>

              <div className="mt-4 border-t border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={resetAllProgress}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-700/70 px-3 py-2 text-xs font-medium text-slate-400 hover:border-rose-400/40 hover:text-rose-200"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset Classroom Progress</span>
                </button>
              </div>
            </nav>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="min-w-0 flex-1 space-y-6">
          {progress.mode === 'teacher' && (
            <div className="no-print flex items-center gap-2.5 rounded-xl border border-violet-400/35 bg-violet-950/35 px-4 py-2.5 text-xs text-violet-200 sm:text-sm">
              <BookOpen className="h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
              <span>
                <strong>Teacher Mode Active:</strong> Teaching Objectives, Key Points, Expected
                Answers, and Discussion Prompts are visible.
              </span>
            </div>
          )}

          {currentModule && (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>
                {currentModule.topicTag} • {currentModule.title}
              </span>
              <span>Duration: {currentModule.duration}</span>
            </div>
          )}

          {children}

          <nav
            aria-label="Lesson step navigation"
            className="no-print flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-6"
          >
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-slate-400">
              Step {currentIdx + 1} of {PAGE_ORDER.length}
            </span>

            {canGoNext ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-95"
              >
                <span>
                  {progress.currentPage === 'home' ? 'Start 2-Hour Class' : 'Complete & Next'}
                </span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNav('overview')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-400/50 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/25"
              >
                <span>Review Curriculum</span>
              </button>
            )}
          </nav>

          <footer className="no-print border-t border-slate-800/60 pt-4 text-center text-xs text-slate-500">
            CloudSec Classroom — 100% simulated defensive cloud security training environment. Works
            offline; no real cloud accounts or live networks are contacted.
          </footer>
        </main>
      </div>

      {/* Projector Mode Floating Quick-Control Bar */}
      {progress.projectorMode && (
        <div
          role="region"
          aria-label="Projector quick controls"
          className="no-print fixed inset-x-0 bottom-0 z-50 border-t border-amber-400/35 bg-[#060b14]/95 px-4 py-3 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('section')}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-4 py-2 text-sm font-bold text-cyan-200"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>Explain</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('svg')}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-200"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Activity</span>
            </button>

            <button
              type="button"
              onClick={() => setMode(progress.mode === 'teacher' ? 'student' : 'teacher')}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-violet-400/50 bg-violet-500/20 px-4 py-2 text-sm font-bold text-violet-200"
            >
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              <span>{progress.mode === 'teacher' ? 'Hide Answer' : 'Answer'}</span>
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
