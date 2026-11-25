import { Award, CheckCircle2, Printer, RotateCcw, XCircle } from 'lucide-react';
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
          Final Knowledge Check (12 Questions) & Certificate
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Comprehensive beginner-level assessment covering all 12 core Cloud Security domains with detailed explanations.
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
              Cloud Security Classroom Academy
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

      {/* Quiz Questions List */}
      <section className="space-y-4">
        {FINAL_QUIZ_QUESTIONS.map((q, idx) => {
          const selected = progress.finalQuizAnswers[q.id];
          const isCorrect = selected === q.correctIndex;
          const showAnswer = progress.finalQuizSubmitted || isTeacher;

          return (
            <div
              key={q.id}
              className={`glass-card rounded-2xl p-5 transition-colors ${
                progress.finalQuizSubmitted
                  ? isCorrect
                    ? 'border-emerald-400/40 bg-emerald-950/15'
                    : 'border-rose-400/40 bg-rose-950/15'
                  : 'hover:border-cyan-400/40'
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-200">
                  Question {idx + 1} • {q.topic}
                </span>
                {progress.finalQuizSubmitted && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      isCorrect ? 'text-emerald-300' : 'text-rose-300'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        <span>Correct</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" aria-hidden="true" />
                        <span>Incorrect</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-white sm:text-base">{q.question}</p>

              <div className="mt-3 grid gap-2">
                {q.options.map((opt, optIdx) => {
                  const isOptSelected = selected === optIdx;
                  const isOptCorrect = optIdx === q.correctIndex;

                  let optClass = 'border-slate-700 bg-slate-900/70 text-slate-200';
                  if (showAnswer) {
                    if (isOptCorrect) {
                      optClass = 'border-emerald-400 bg-emerald-500/20 text-emerald-100 font-bold';
                    } else if (isOptSelected) {
                      optClass = 'border-rose-400 bg-rose-500/20 text-rose-100';
                    }
                  } else if (isOptSelected) {
                    optClass = 'border-cyan-400 bg-cyan-500/20 text-cyan-100 font-bold';
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={progress.finalQuizSubmitted}
                      onClick={() => setFinalQuizAnswer(q.id, optIdx)}
                      className={`min-h-[44px] rounded-xl border p-3 text-left text-xs font-medium transition-all sm:text-sm ${optClass} ${
                        !progress.finalQuizSubmitted ? 'hover:border-cyan-400/60' : ''
                      }`}
                    >
                      <span className="mr-2 font-bold text-slate-400">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showAnswer && (
                <div className="mt-3 rounded-xl border border-slate-700/60 bg-slate-900/70 p-3 text-xs text-slate-300">
                  <p>
                    <strong className="text-emerald-300">Explanation:</strong> {q.explanation}
                  </p>
                  {isTeacher && (
                    <p className="mt-1 text-amber-200">
                      <strong>Teacher Note:</strong> {q.teacherNote}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {!progress.finalQuizSubmitted && (
          <div className="glass-card flex flex-wrap items-center justify-between gap-3 rounded-2xl p-5">
            <p className="text-xs text-slate-300 sm:text-sm">
              You answered <strong>{answeredCount}</strong> of <strong>{totalQuestions}</strong>{' '}
              questions.
            </p>
            <button
              type="button"
              disabled={answeredCount === 0}
              onClick={submitFinalQuiz}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Submit Final Quiz</span>
              <Award className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
