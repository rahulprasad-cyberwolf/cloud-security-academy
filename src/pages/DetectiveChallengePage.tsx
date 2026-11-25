import { ArrowDown, ArrowUp, CheckCircle2, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { useCourse } from '../context/CourseContext';

interface ClueItem {
  id: string;
  label: string;
  correctPos: number;
  detail: string;
}

const INITIAL_CLUES: ClueItem[] = [
  { id: 'c4', label: 'CLUE 4: Permission changed', correctPos: 3, detail: 'Account was upgraded to Admin.' },
  { id: 'c1', label: 'CLUE 1: Failed login', correctPos: 0, detail: 'Wrong password tried repeatedly.' },
  { id: 'c5', label: 'CLUE 5: Large data access', correctPos: 4, detail: 'Many private files were downloaded.' },
  { id: 'c2', label: 'CLUE 2: Unknown location', correctPos: 1, detail: 'Connection came from an unfamiliar place.' },
  { id: 'c3', label: 'CLUE 3: Successful login', correctPos: 2, detail: 'The login finally succeeded at 2:13 AM.' },
];

export function DetectiveChallengePage() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [clues, setClues] = useState<ClueItem[]>(INITIAL_CLUES);
  const [orderChecked, setOrderChecked] = useState(false);
  const [diagnosis, setDiagnosis] = useState<number | null>(null);
  const isTeacher = progress.mode === 'teacher';

  const moveClue = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= clues.length) return;
    const copy = [...clues];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setClues(copy);
    setOrderChecked(false);
  };

  const isOrderCorrect = clues.every((c, idx) => c.correctPos === idx);

  const handleCheckOrder = () => {
    setOrderChecked(true);
    if (isOrderCorrect && diagnosis === 0) {
      recordChallengeSuccess('detective-break-activity', 30, 'lab-detective');
    }
  };

  const handlePickDiagnosis = (idx: number) => {
    setDiagnosis(idx);
    if (isOrderCorrect && idx === 0) {
      recordChallengeSuccess('detective-break-activity', 30, 'lab-detective');
    }
  };

  const handleReset = () => {
    setClues(INITIAL_CLUES);
    setOrderChecked(false);
    setDiagnosis(null);
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-200">
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span>10-Minute Interactive Break Activity</span>
        </div>
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Security Detective Challenge
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          You are investigating a fictional cloud environment. Put the 5 mixed-up clues into the{' '}
          <strong className="text-cyan-300">correct time order</strong>, then explain what happened!
        </p>
      </header>

      <section className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-white">Step 1: Arrange the 5 Clues in Order</h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Shuffle Clues</span>
          </button>
        </div>

        <ol className="space-y-2.5">
          {clues.map((clue, idx) => (
            <li
              key={clue.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700/70 bg-slate-900/75 p-3.5"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-xs font-bold text-cyan-200">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{clue.label}</p>
                  <p className="text-xs text-slate-400">{clue.detail}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => moveClue(idx, -1)}
                  disabled={idx === 0}
                  aria-label={`Move ${clue.label} up`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-200 disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => moveClue(idx, 1)}
                  disabled={idx === clues.length - 1}
                  aria-label={`Move ${clue.label} down`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-200 disabled:opacity-30"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCheckOrder}
            className="min-h-[42px] rounded-xl bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
          >
            Check Clue Order
          </button>
          {orderChecked && (
            <span
              aria-live="polite"
              className={`text-sm font-semibold ${isOrderCorrect ? 'text-emerald-300' : 'text-amber-300'}`}
            >
              {isOrderCorrect
                ? '✅ Perfect order! Failed login → Unknown location → Successful login → Permission changed → Large data access.'
                : 'Not quite yet—hint: look at CLUE 1 through CLUE 5 numbers!'}
            </span>
          )}
        </div>

        {(isTeacher && !isOrderCorrect) && (
          <p className="rounded-xl border border-violet-400/35 bg-violet-950/30 p-3 text-xs text-violet-200">
            <strong>Teacher Key:</strong> Correct order is Clue 1 (Failed login) → Clue 2 (Unknown
            location) → Clue 3 (Successful login) → Clue 4 (Permission changed) → Clue 5 (Large data
            access).
          </p>
        )}
      </section>

      <section className="glass-card rounded-2xl p-6 space-y-3">
        <h2 className="text-lg font-bold text-white">Step 2: What Do You Think Happened?</h2>
        <div className="space-y-2">
          {[
            'An unauthorized user guessed the password from an unknown location, logged in, gave themselves Admin access, and downloaded large data.',
            'A student accidentally changed their screen theme to dark mode.',
            'The cloud provider upgraded the server RAM automatically.',
          ].map((opt, idx) => {
            const selected = diagnosis === idx;
            const teacherKey = isTeacher && idx === 0;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handlePickDiagnosis(idx)}
                aria-pressed={selected}
                className={`w-full rounded-xl border p-3.5 text-left text-sm transition-colors ${
                  teacherKey
                    ? 'border-emerald-400/70 bg-emerald-500/15 text-emerald-100'
                    : selected
                      ? idx === 0
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                        : 'border-rose-400 bg-rose-500/20 text-rose-100'
                      : 'border-slate-700 bg-slate-900/70 text-slate-200 hover:border-cyan-400/50'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {(diagnosis === 0 || isTeacher) && (
          <div className="flex items-start gap-2 rounded-xl border border-emerald-400/40 bg-emerald-950/30 p-4 text-sm text-emerald-100">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
            <div>
              <p className="font-bold">Case Solved! (+30 pts when order + diagnosis are complete)</p>
              <p className="mt-1 text-xs sm:text-sm">
                This is why Logging, Monitoring, Alerts, Least Privilege, and Incident Response all
                work together!
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
