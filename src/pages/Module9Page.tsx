import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

const IR_STAGES = [
  { num: 1, title: 'DETECT', desc: 'Alert spots suspicious 2 AM login and rings the alarm.', color: '#fb7185' },
  { num: 2, title: 'INVESTIGATE', desc: 'Check audit logs (Who, What, When, Where, Result).', color: '#fbbf24' },
  { num: 3, title: 'CONTAIN', desc: 'Disable the compromised account to stop further damage.', color: '#38bdf8' },
  { num: 4, title: 'RECOVER', desc: 'Reset passwords, rotate exposed secrets, and restore safe access.', color: '#a78bfa' },
  { num: 5, title: 'LEARN', desc: 'Review what happened and turn on stronger protections.', color: '#34d399' },
];

const ANALYST_DECISIONS = [
  {
    id: 'd1',
    stage: 'Step 1 (Detect)',
    situation: 'Suspicious login detected at 2:13 AM. What should you do first?',
    options: ['Ignore it', 'Investigate logs', 'Delete all data', 'Share password'],
    correctIndex: 1,
    feedback: 'Correct! Always investigate the audit logs first to see what happened.',
  },
  {
    id: 'd2',
    stage: 'Step 2 (Investigate)',
    situation: 'Logs show 3 failed logins, a success, and an Admin permission change. What is happening?',
    options: ['Normal daytime backup', 'Likely unauthorized account takeover', 'A printer jam', 'Scheduled system update'],
    correctIndex: 1,
    feedback: 'Spot on! Someone guessed the password and tried to gain Admin control.',
  },
  {
    id: 'd3',
    stage: 'Step 3 (Contain)',
    situation: 'How do you stop the attacker from doing more harm right now?',
    options: ['Disable the compromised account', 'Turn off all logging', 'Email the attacker', 'Wait until next week'],
    correctIndex: 0,
    feedback: 'Yes! Disabling the compromised account contains the incident immediately.',
  },
  {
    id: 'd4',
    stage: 'Step 4 (Recover)',
    situation: 'You notice an API key was exposed during the incident. What should you do?',
    options: ['Keep using the same key', 'Rotate (revoke and replace) the secret & reset passwords', 'Post the key on GitHub', 'Delete the app'],
    correctIndex: 1,
    feedback: 'Right! Rotate compromised secrets and reset passwords before reopening.',
  },
  {
    id: 'd5',
    stage: 'Step 5 (Learn)',
    situation: 'The incident is fixed. What helps prevent this from happening again?',
    options: ['Enable Two-Factor Authentication (2FA) & review permissions', 'Delete all audit logs', 'Give everyone Admin access', 'Turn off security alerts'],
    correctIndex: 0,
    feedback: 'Great job! 2FA and Least Privilege prevent future account takeovers.',
  },
];

export function Module9Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [activeStage, setActiveStage] = useState(1);
  const [decisions, setDecisions] = useState<Record<string, number>>({});
  const isTeacher = progress.mode === 'teacher';

  const currentStage = IR_STAGES.find((s) => s.num === activeStage) ?? IR_STAGES[0];
  const score = ANALYST_DECISIONS.filter((d) => decisions[d.id] === d.correctIndex).length;

  const handleDecision = (dId: string, idx: number, correctIdx: number) => {
    const next = { ...decisions, [dId]: idx };
    setDecisions(next);
    const allRight = ANALYST_DECISIONS.every((d) => next[d.id] === d.correctIndex);
    if (allRight && idx === correctIdx) {
      recordChallengeSuccess('m9-analyst-sim', 25, 'lab-incident-response');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Module 9: Incident Response & Analyst Simulation
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          An <strong className="text-rose-300">Incident</strong> is a security emergency (like a
          stolen account or exposed secret). <strong className="text-emerald-300">Incident Response</strong>{' '}
          is the calm 5-step plan teams follow to handle it.
        </p>
      </header>

      {/* 20. Huge Animated 5-Step SVG Flow */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">
          5-Step Incident Response Flow (Click Any Stage)
        </h2>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Alert leads to 1 Detect, 2 Investigate, 3 Contain, 4 Recover, 5 Learn"
            viewBox="0 0 820 140"
            className="h-auto w-full"
          >
            <g transform="translate(8, 32)">
              <rect width="92" height="72" rx="12" fill="rgba(225,29,72,0.18)" stroke="#fb7185" strokeWidth="2" />
              <text x="46" y="42" textAnchor="middle" fill="#fda4af" fontSize="11.5" fontWeight="700">🚨 ALERT</text>
            </g>
            <line x1="100" y1="68" x2="122" y2="68" stroke="#fb7185" strokeWidth="2.5" className="animate-flow" />

            {IR_STAGES.map((st, idx) => {
              const x = 122 + idx * 140;
              const active = st.num === activeStage;
              return (
                <g key={st.num}>
                  <rect
                    x={x}
                    y={24}
                    width="116"
                    height="88"
                    rx="12"
                    fill={active ? 'rgba(34,211,238,0.16)' : '#0f172a'}
                    stroke={active ? st.color : 'rgba(148,163,184,0.3)'}
                    strokeWidth={active ? '2.5' : '1.5'}
                  />
                  <text x={x + 58} y={54} textAnchor="middle" fill={st.color} fontSize="12" fontWeight="700">
                    {st.num}. {st.title}
                  </text>
                  <text x={x + 58} y={78} textAnchor="middle" fill="#cbd5e1" fontSize="9.5">
                    Click to inspect
                  </text>
                  {idx < 4 && (
                    <line x1={x + 116} y1={68} x2={x + 140} y2={68} stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {IR_STAGES.map((st) => (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStage(st.num)}
                aria-pressed={activeStage === st.num}
                className={`min-h-[40px] rounded-xl border px-3 py-2 text-xs font-bold ${
                  activeStage === st.num
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                {st.num}. {st.title}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-3 rounded-xl border border-cyan-500/30 bg-slate-900/90 p-3.5 text-sm">
            <strong className="text-cyan-300">
              {currentStage.num}. {currentStage.title}:
            </strong>{' '}
            <span className="text-slate-100">{currentStage.desc}</span>
          </div>
        </div>
      </section>

      {/* 21. "You are the Security Analyst" Simulation */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-300" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">
              Simulation: “You Are the Security Analyst”
            </h2>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            Analyst Score: {score} / {ANALYST_DECISIONS.length}
          </span>
        </div>

        <div className="space-y-4">
          {ANALYST_DECISIONS.map((d) => {
            const picked = decisions[d.id];
            const isCorrect = picked === d.correctIndex;
            return (
              <div key={d.id} className="rounded-xl border border-slate-700/70 bg-slate-900/65 p-4">
                <p className="text-xs font-bold text-cyan-300 uppercase">{d.stage}</p>
                <p className="mt-1 mb-3 text-sm font-semibold text-white">{d.situation}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {d.options.map((opt, idx) => {
                    const selected = picked === idx;
                    const teacherKey = isTeacher && idx === d.correctIndex;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleDecision(d.id, idx, d.correctIndex)}
                        aria-pressed={selected}
                        className={`min-h-[40px] rounded-lg border px-3 py-2 text-left text-xs sm:text-sm ${
                          teacherKey
                            ? 'border-emerald-400/70 bg-emerald-500/15 text-emerald-100'
                            : selected
                              ? idx === d.correctIndex
                                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                                : 'border-rose-400 bg-rose-500/20 text-rose-100'
                              : 'border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-400/50'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {(picked !== undefined || isTeacher) && (
                  <p className={`mt-2 text-xs ${isCorrect || isTeacher ? 'text-emerald-300' : 'text-amber-200'}`}>
                    {isCorrect || isTeacher ? d.feedback : 'Not the safest choice—try another option!'}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {score === ANALYST_DECISIONS.length && (
          <p className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            <span>Incident Handled Like a Pro! (+25 pts)</span>
          </p>
        )}
      </section>

      <ConceptCard
        title="Incident Response = Calm Fire Drill"
        whatIsIt="Detect → Investigate → Contain → Recover → Learn."
        whyItMatters="Following a clear plan keeps teams calm and stops damage quickly."
        simpleExample="Spot alert → Check logs → Lock account → Rotate keys → Turn on 2FA."
        analogy="An emergency fire drill at school."
      />

      <QuickCheck
        id="m9-q1"
        question="What is the final step (Step 5) of Incident Response?"
        options={['LEARN (review and improve security)', 'Delete all logs', 'Share passwords', 'Ignore future alerts']}
        correctIndex={0}
        explanation="Step 5 is LEARN—improving your security so the same incident doesn't happen again."
      />
    </div>
  );
}
