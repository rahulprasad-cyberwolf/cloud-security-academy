import { CheckCircle2, GraduationCap, HelpCircle, XCircle } from 'lucide-react';
import { useId, useState } from 'react';
import { useCourse } from '../context/CourseContext';

interface QuickCheckProps {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  teacherNote?: string;
  points?: number;
}

export function QuickCheck({
  id,
  question,
  options,
  correctIndex,
  explanation,
  teacherNote,
  points = 10,
}: QuickCheckProps) {
  const { progress, recordChallengeSuccess } = useCourse();
  const [selected, setSelected] = useState<number | null>(null);
  const headingId = useId();
  const isTeacher = progress.mode === 'teacher';
  const alreadySolved = Boolean(progress.answeredChallenges[id]);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (idx === correctIndex) {
      recordChallengeSuccess(id, points);
    }
  };

  const showResult = selected !== null || isTeacher;
  const isCorrect = selected === correctIndex;

  return (
    <section
      aria-labelledby={headingId}
      className="glass-card rounded-2xl border border-cyan-500/20 p-5 sm:p-6"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-300">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
          </span>
          <h3 id={headingId} className="text-base font-semibold text-white sm:text-lg">
            Quick Classroom Check
          </h3>
        </div>
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-200">
          {alreadySolved ? `Solved (+${points} pts)` : `+${points} pts`}
        </span>
      </div>

      <p className="mb-4 text-sm font-medium text-slate-100 sm:text-base">{question}</p>

      <div className="grid gap-2.5 sm:grid-cols-2" role="group" aria-labelledby={headingId}>
        {options.map((opt, idx) => {
          const isOptionSelected = selected === idx;
          const isOptionCorrect = idx === correctIndex;

          let style =
            'border-slate-700/70 bg-slate-900/60 text-slate-200 hover:border-cyan-400/50 hover:bg-slate-800/80';

          if (isTeacher && isOptionCorrect) {
            style = 'border-emerald-400/70 bg-emerald-500/15 text-emerald-100';
          } else if (isOptionSelected) {
            style = isOptionCorrect
              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
              : 'border-rose-400 bg-rose-500/20 text-rose-100';
          }

          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(idx)}
              aria-pressed={isOptionSelected}
              className={`flex min-h-[44px] items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${style}`}
            >
              <span>{opt}</span>
              {isOptionSelected &&
                (isOptionCorrect ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                ))}
              {!isOptionSelected && isTeacher && isOptionCorrect && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-4">
        {showResult && (
          <div
            className={`rounded-xl border p-3.5 text-sm ${
              isTeacher && selected === null
                ? 'border-violet-400/40 bg-violet-950/35 text-violet-100'
                : isCorrect
                  ? 'border-emerald-400/40 bg-emerald-950/35 text-emerald-100'
                  : 'border-amber-400/40 bg-amber-950/35 text-amber-100'
            }`}
          >
            {selected !== null && (
              <p className="mb-1 font-semibold">
                {isCorrect ? 'Correct! Great job.' : 'Not quite — try again or review the tip:'}
              </p>
            )}
            {isTeacher && selected === null && (
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-violet-300 uppercase">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Teacher Mode Answer Key
              </p>
            )}
            <p className="leading-relaxed">{explanation}</p>
            {isTeacher && teacherNote && (
              <p className="mt-2 border-t border-violet-400/20 pt-2 text-xs text-violet-200">
                <strong>Teaching Tip:</strong> {teacherNote}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
