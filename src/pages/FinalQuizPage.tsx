import { Award, CheckCircle2, GraduationCap, Printer, RotateCcw, XCircle } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { FINAL_QUIZ_QUESTIONS, MODULES } from '../data/curriculum';

export function FinalQuizPage() {
  const {
    progress,
    completionPercentage,
    setFinalQuizAnswer,
    submitFinalQuiz,
    resetFinalQuiz,
    setStudentName,
  } = useCourse();

  const isTeacher = progress.mode === 'teacher';
  const totalQuestions = FINAL_QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(progress.finalQuizAnswers).length;

  const correctCount = FINAL_QUIZ_QUESTIONS.filter(
    (q) => progress.finalQuizAnswers[q.id] === q.correctIndex
  ).length;
  const wrongCount = totalQuestions - correctCount;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  const missedTopics = Array.from(
    new Set(
      FINAL_QUIZ_QUESTIONS.filter(
        (q) => progress.finalQuizAnswers[q.id] !== q.correctIndex
      ).map((q) => q.topic)
    )
  );

  return (
    <div className="space-y-6">
      <header className="glass-card no-print rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Final Assessment (15 Questions) & Certificate
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Includes <strong>5 Multiple Choice</strong>, <strong>5 True/False</strong>, and{' '}
          <strong>5 Scenario-Based</strong> questions across all topics.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold">
          <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">
            Answered: {answeredCount} / {totalQuestions}
          </span>
          <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-200">
            Course Completion: {completionPercentage}%
          </span>
        </div>
      </header>

      {progress.finalQuizSubmitted && (
        <section aria-live="polite" className="space-y-6">
          <div className="glass-card no-print rounded-2xl border border-emerald-400/40 p-6">
            <h2 className="text-xl font-bold text-white">Your Final Assessment Results</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400 uppercase">Score</p>
                <p className="mt-1 text-2xl font-extrabold text-cyan-300">{scorePercent}%</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400 uppercase">Correct</p>
                <p className="mt-1 text-2xl font-extrabold text-emerald-300">{correctCount}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400 uppercase">Wrong</p>
                <p className="mt-1 text-2xl font-extrabold text-rose-300">{wrongCount}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400 uppercase">Completion %</p>
                <p className="mt-1 text-2xl font-extrabold text-amber-300">{completionPercentage}%</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-700/70 bg-slate-900/60 p-4 text-sm">
              <p className="font-semibold text-white">Topics to Revise:</p>
              {missedTopics.length === 0 ? (
                <p className="mt-1 text-emerald-300">
                  None! You answered every single topic correctly!
                </p>
              ) : (
                <ul className="mt-1.5 flex flex-wrap gap-2">
                  {missedTopics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-200"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="glass-card rounded-3xl border-2 border-cyan-400/40 bg-gradient-to-br from-slate-900/95 via-[#071324] to-emerald-950/40 p-6 text-center sm:p-10">
            <Award className="mx-auto mb-3 h-14 w-14 text-amber-300" aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-300 uppercase">
              Cloud Security Foundations Completed
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              2-Hour Beginner Cloud Security Classroom
            </h2>
            <p className="mt-3 text-sm text-slate-300">Presented to</p>

            <div className="mx-auto mt-3 max-w-md">
              <label htmlFor="student-name-input" className="visually-hidden">
                Student Name for Certificate
              </label>
              <input
                id="student-name-input"
                type="text"
                value={progress.studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Type your name here..."
                className="w-full rounded-xl border border-cyan-400/40 bg-slate-950/70 px-4 py-2.5 text-center text-lg font-bold text-cyan-200 placeholder:text-slate-500"
              />
            </div>

            <div className="mx-auto mt-5 grid max-w-2xl gap-3 text-xs sm:grid-cols-3">
              <div className="rounded-xl border border-slate-700/70 bg-slate-950/60 p-3">
                <span className="block text-slate-400">Modules Completed</span>
                <strong className="text-sm text-white">
                  {progress.completedModules.length} / {MODULES.length}
                </strong>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-950/60 p-3">
                <span className="block text-slate-400">Quiz Score</span>
                <strong className="text-sm text-emerald-300">
                  {correctCount}/{totalQuestions} ({scorePercent}%)
                </strong>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-950/60 p-3">
                <span className="block text-slate-400">Security Assessment</span>
                <strong className="text-sm text-cyan-300">{progress.assessmentScore}%</strong>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Classroom learning completion summary (educational simulation — not an official
              industry certification).
            </p>

            <div className="no-print mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                <span>Print / Save Certificate</span>
              </button>
              <button
                type="button"
                onClick={resetFinalQuiz}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-400/50"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Retake Final Quiz</span>
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="no-print space-y-4">
        {FINAL_QUIZ_QUESTIONS.map((q, qIdx) => {
          const picked = progress.finalQuizAnswers[q.id];
          const isCorrect = picked === q.correctIndex;
          const typeBadge =
            q.type === 'mcq' ? 'Multiple Choice' : q.type === 'tf' ? 'True / False' : 'Scenario';

          return (
            <article key={q.id} className="glass-card rounded-2xl p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
                  Q{qIdx + 1} • {typeBadge} • {q.topic}
                </span>
                {progress.finalQuizSubmitted && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" aria-hidden="true" />
                        Review Topic
                      </>
                    )}
                  </span>
                )}
              </div>

              <h3 className="mb-3 text-base font-semibold text-white">{q.question}</h3>

              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, idx) => {
                  const selected = picked === idx;
                  const showTeacherKey = isTeacher && idx === q.correctIndex;

                  let style =
                    'border-slate-700/70 bg-slate-900/70 text-slate-200 hover:border-cyan-400/50';
                  if (progress.finalQuizSubmitted) {
                    if (idx === q.correctIndex) {
                      style = 'border-emerald-400 bg-emerald-500/20 text-emerald-100';
                    } else if (selected) {
                      style = 'border-rose-400 bg-rose-500/20 text-rose-100';
                    }
                  } else if (selected) {
                    style = 'border-cyan-400 bg-cyan-500/20 text-cyan-100';
                  } else if (showTeacherKey) {
                    style = 'border-violet-400/70 bg-violet-950/35 text-violet-100';
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={progress.finalQuizSubmitted}
                      onClick={() => setFinalQuizAnswer(q.id, idx)}
                      aria-pressed={selected}
                      className={`min-h-[44px] rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors disabled:cursor-default ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {(progress.finalQuizSubmitted || isTeacher) && (
                <div className="mt-3 rounded-xl border border-slate-700/70 bg-slate-950/70 p-3 text-xs leading-relaxed text-slate-200">
                  <p>
                    <strong className="text-cyan-300">Explanation:</strong> {q.explanation}
                  </p>
                  {isTeacher && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-violet-300">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        <strong>Teacher Note:</strong> {q.teacherNote}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}

        {!progress.finalQuizSubmitted && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-300">
              {answeredCount < totalQuestions
                ? `You have answered ${answeredCount} of ${totalQuestions} questions.`
                : 'All 15 questions answered! Ready to see your score and certificate?'}
            </p>
            <button
              type="button"
              onClick={submitFinalQuiz}
              className="min-h-[46px] rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-2.5 text-sm font-bold text-slate-950 hover:opacity-95"
            >
              Submit Final Assessment
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
