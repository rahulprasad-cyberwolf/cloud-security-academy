import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

const ENV_PROBLEMS = [
  { id: 'p1', label: 'Public storage', desc: 'Private files are open to anyone on the internet.' },
  { id: 'p2', label: 'Too many permissions', desc: 'Users have more access than their job needs.' },
  { id: 'p3', label: 'Logging disabled', desc: 'No record is saved when actions happen.' },
  { id: 'p4', label: 'Old account still active', desc: 'Former team member can still log in.' },
  { id: 'p5', label: 'Exposed secret', desc: 'Password or API key written directly in code.' },
  { id: 'p6', label: 'Unnecessary admin access', desc: 'Developers or guests hold full admin power.' },
];

const SCENARIOS = [
  {
    id: 's1',
    num: 1,
    situation: 'Storage is public (student files bucket has Public Access ON).',
    question: 'What is wrong?',
    choices: ['Anyone on the internet may access sensitive files', 'Files are stored in a folder'],
    correctIndex: 0,
    explanation: 'Public storage exposes private data to a much wider audience.',
    recommendation: 'Switch the storage setting to Private 🔒.',
  },
  {
    id: 's2',
    num: 2,
    situation: 'A developer has full administrator access to all cloud billing and user accounts.',
    question: 'Is this necessary?',
    choices: ['No — they only need development access (Least Privilege)', 'Yes — everyone should be Admin'],
    correctIndex: 0,
    explanation: 'Giving full admin access increases risk if the account is compromised.',
    recommendation: 'Limit the developer to development resources only.',
  },
  {
    id: 's3',
    num: 3,
    situation: 'Cloud Logging is disabled across the environment.',
    question: 'How would investigators know what happened?',
    choices: ['They wouldn’t—there is no record of logins or changes', 'The cloud guesses what happened'],
    correctIndex: 0,
    explanation: 'Without logs, investigators are blind during an incident.',
    recommendation: 'Keep Authentication and Audit Logs enabled.',
  },
  {
    id: 's4',
    num: 4,
    situation: 'An old employee account from last year is still active with Admin access.',
    question: 'Why should this be reviewed?',
    choices: ['Unused accounts are prime targets for unauthorized access', 'Old accounts run faster'],
    correctIndex: 0,
    explanation: 'Nobody monitors old accounts, making them easy for attackers to abuse.',
    recommendation: 'Disable or remove accounts when people leave.',
  },
  {
    id: 's5',
    num: 5,
    situation: 'A secret API key is visible inside public source code.',
    question: 'Why is this dangerous?',
    choices: ['Anyone reading the code can copy and misuse the secret', 'The code looks longer'],
    correctIndex: 0,
    explanation: 'Secrets in source code can be discovered within seconds.',
    recommendation: 'Move secrets to a Secret Manager and rotate the exposed key.',
  },
];

export function Module6Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [selectedProblem, setSelectedProblem] = useState(ENV_PROBLEMS[0]);
  const [storageChoice, setStorageChoice] = useState<'private' | 'public' | null>(null);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({});
  const isTeacher = progress.mode === 'teacher';

  const handleStoragePick = (pick: 'private' | 'public') => {
    setStorageChoice(pick);
    if (pick === 'private') {
      recordChallengeSuccess('m6-public-private', 10);
    }
  };

  const handleScenario = (id: string, idx: number, correctIdx: number) => {
    setScenarioAnswers((prev) => ({ ...prev, [id]: idx }));
    if (idx === correctIdx) {
      recordChallengeSuccess(`m6-${id}`, 10, id);
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Misconfigurations
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong className="text-rose-300">
            “Misconfiguration means a security setting is configured incorrectly.”
          </strong>{' '}
          Click each problem below in our simulated cloud environment to see what went wrong.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {ENV_PROBLEMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedProblem(p)}
              aria-pressed={selectedProblem.id === p.id}
              className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-semibold ${
                selectedProblem.id === p.id
                  ? 'border-rose-400 bg-rose-500/20 text-rose-100'
                  : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-3 rounded-xl border border-rose-400/35 bg-rose-950/25 p-3.5 text-sm">
          <strong className="text-rose-300">{selectedProblem.label}:</strong>{' '}
          <span className="text-slate-100">{selectedProblem.desc}</span>
        </div>
      </header>

      {/* Public vs Private Resource */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          Public vs Private Resource: Which Configuration Is Safer for Sensitive Data?
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => handleStoragePick('private')}
            aria-pressed={storageChoice === 'private'}
            className={`rounded-2xl border p-5 text-left transition-all ${
              storageChoice === 'private' || isTeacher
                ? 'border-emerald-400 bg-emerald-950/30'
                : 'border-slate-700 bg-slate-900/70 hover:border-emerald-400'
            }`}
          >
            <p className="text-base font-bold text-emerald-300">PRIVATE 🔒</p>
            <p className="mt-1 text-sm text-slate-200">Only authorized users can access.</p>
          </button>

          <button
            type="button"
            onClick={() => handleStoragePick('public')}
            aria-pressed={storageChoice === 'public'}
            className={`rounded-2xl border p-5 text-left transition-all ${
              storageChoice === 'public'
                ? 'border-rose-400 bg-rose-950/30'
                : 'border-slate-700 bg-slate-900/70 hover:border-rose-400'
            }`}
          >
            <p className="text-base font-bold text-rose-300">PUBLIC 🔓</p>
            <p className="mt-1 text-sm text-slate-200">Access may be available to a much wider audience.</p>
          </button>
        </div>

        {(storageChoice !== null || isTeacher) && (
          <p aria-live="polite" className="mt-3 rounded-xl border border-emerald-400/35 bg-slate-950/85 p-3 text-sm text-emerald-200">
            <strong>PRIVATE 🔒 is safer!</strong> Sensitive data should never be left Public 🔓.
          </p>
        )}
      </section>

      {/* 5 Misconfiguration Detection Scenarios */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Misconfiguration Detection Scenarios</h2>
        {SCENARIOS.map((sc) => {
          const picked = scenarioAnswers[sc.id];
          const isCorrect = picked === sc.correctIndex;
          return (
            <article key={sc.id} className="glass-card rounded-2xl p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-xs font-bold text-cyan-200">
                  Scenario {sc.num}
                </span>
                {isCorrect && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Solved
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-200">{sc.situation}</p>
              <p className="mt-2 mb-2 text-sm font-bold text-white">{sc.question}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {sc.choices.map((ch, idx) => {
                  const selected = picked === idx;
                  const teacherKey = isTeacher && idx === sc.correctIndex;
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => handleScenario(sc.id, idx, sc.correctIndex)}
                      aria-pressed={selected}
                      className={`rounded-xl border px-3.5 py-2.5 text-left text-xs sm:text-sm ${
                        teacherKey
                          ? 'border-emerald-400/70 bg-emerald-500/15 text-emerald-100'
                          : selected
                            ? idx === sc.correctIndex
                              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                              : 'border-rose-400 bg-rose-500/20 text-rose-100'
                            : 'border-slate-700 bg-slate-900/70 text-slate-200'
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
              {(picked !== undefined || isTeacher) && (
                <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-xs">
                  <p className="text-slate-200"><strong className="text-cyan-300">Answer:</strong> {sc.explanation}</p>
                  <p className="mt-1 text-emerald-300"><strong>Recommendation:</strong> {sc.recommendation}</p>
                </div>
              )}
            </article>
          );
        })}
      </section>

      <ConceptCard
        title="Cloud Misconfiguration"
        whatIsIt="A security setting configured incorrectly by mistake."
        whyItMatters="Most cloud security issues come from accidental settings like public storage or disabled logs."
        simpleExample="Turning Public Access ON for a private student folder."
        analogy="Leaving the front door unlocked by accident."
      />

      <QuickCheck
        id="m6-q1"
        question="What is a cloud misconfiguration?"
        options={['A security setting configured incorrectly', 'A type of hardware cable']}
        correctIndex={0}
        explanation="Misconfigurations are incorrect settings—like public storage, too many permissions, or disabled logging."
      />
    </div>
  );
}
