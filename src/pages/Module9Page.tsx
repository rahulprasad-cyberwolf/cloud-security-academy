import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

const STAGES = [
  {
    id: 'DETECT',
    title: '1. DETECT',
    desc: 'Notice suspicious activity.',
    flow: ['Alert', 'Analyst'],
    color: '#fb7185',
  },
  {
    id: 'INVESTIGATE',
    title: '2. INVESTIGATE',
    desc: 'Check logs and evidence.',
    flow: ['Analyst', 'Logs', 'Timeline', 'Evidence'],
    color: '#fbbf24',
  },
  {
    id: 'CONTAIN',
    title: '3. CONTAIN',
    desc: 'Stop suspicious access from continuing.',
    flow: ['Suspicious Account', 'Access Restricted', 'Resource Protected'],
    color: '#38bdf8',
  },
  {
    id: 'RECOVER',
    title: '4. RECOVER',
    desc: 'Return the environment to a secure state.',
    flow: ['Incident', 'Fix', 'Secure Config', 'Normal Operation'],
    color: '#a78bfa',
  },
  {
    id: 'LEARN',
    title: '5. LEARN',
    desc: 'Understand what caused the issue and improve security.',
    flow: ['Incident', 'Review', 'Lesson', 'Improvement'],
    color: '#34d399',
  },
];

const GAME_QUESTIONS = [
  {
    id: 'g1',
    prompt: 'Suspicious login detected. What should you do first?',
    options: ['A. Ignore it', 'B. Check logs', 'C. Delete everything', 'D. Share credentials'],
    correctIndex: 1,
    why: 'Checking logs first gives you the facts before making changes.',
  },
  {
    id: 'g2',
    prompt: 'Logs confirm an unknown user changed permissions. What is CONTAIN?',
    options: ['Restrict suspicious account access', 'Give everyone Admin access', 'Turn off alerts', 'Do nothing'],
    correctIndex: 0,
    why: 'Containment stops suspicious access from continuing.',
  },
  {
    id: 'g3',
    prompt: 'During RECOVER, what helps return the cloud to a secure state?',
    options: ['Fix misconfigurations & rotate exposed secrets', 'Delete all backups', 'Leave storage public', 'Skip verification'],
    correctIndex: 0,
    why: 'Fixing the root cause and rotating secrets restores safe operation.',
  },
];

export function Module9Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [activeStage, setActiveStage] = useState(STAGES[0]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const isTeacher = progress.mode === 'teacher';

  const handleGame = (id: string, idx: number, correctIdx: number) => {
    const next = { ...answers, [id]: idx };
    setAnswers(next);
    if (GAME_QUESTIONS.every((q) => next[q.id] === q.correctIndex) && idx === correctIdx) {
      recordChallengeSuccess('m9-ir-game', 20, 'lab-ir-game');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Incident Response
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          What should a security team do after detecting suspicious activity? Follow the 5 simple
          steps: <strong className="text-cyan-300">DETECT → INVESTIGATE → CONTAIN → RECOVER → LEARN</strong>.
        </p>
      </header>

      {/* Interactive 5 Stages with Dedicated SVG for Each Stage */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">Click Each Incident Response Stage</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {STAGES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setActiveStage(st)}
              aria-pressed={activeStage.id === st.id}
              className={`min-h-[42px] rounded-xl border px-3 py-2 text-xs font-bold ${
                activeStage.id === st.id
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                  : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              {st.title}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/85 p-5">
          <p className="text-base font-bold text-white">{activeStage.title}</p>
          <p className="mt-1 mb-4 text-sm text-slate-300">{activeStage.desc}</p>

          <svg
            role="img"
            aria-label={`${activeStage.title} workflow: ${activeStage.flow.join(' to ')}`}
            viewBox="0 0 720 100"
            className="h-auto w-full"
          >
            {activeStage.flow.map((node, idx) => {
              const stepW = Math.floor(680 / activeStage.flow.length);
              const x = 16 + idx * stepW;
              return (
                <g key={node}>
                  <rect
                    x={x}
                    y={18}
                    width={stepW - 26}
                    height="60"
                    rx="12"
                    fill="#0f172a"
                    stroke={activeStage.color}
                    strokeWidth="2"
                  />
                  <text
                    x={x + (stepW - 26) / 2}
                    y={52}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="11.5"
                    fontWeight="700"
                  >
                    {node}
                  </text>
                  {idx < activeStage.flow.length - 1 && (
                    <line
                      x1={x + stepW - 26}
                      y1={48}
                      x2={x + stepW}
                      y2={48}
                      stroke={activeStage.color}
                      strokeWidth="2.5"
                      className="animate-flow"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Incident Response Decision Game */}
      <section className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Incident Response Decision Game</h2>
        {GAME_QUESTIONS.map((q) => {
          const picked = answers[q.id];
          const isCorrect = picked === q.correctIndex;
          return (
            <div key={q.id} className="rounded-xl border border-slate-700/70 bg-slate-900/65 p-4">
              <p className="mb-3 text-sm font-semibold text-white">{q.prompt}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, idx) => {
                  const selected = picked === idx;
                  const teacherKey = isTeacher && idx === q.correctIndex;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleGame(q.id, idx, q.correctIndex)}
                      aria-pressed={selected}
                      className={`min-h-[40px] rounded-lg border px-3 py-2 text-left text-xs sm:text-sm ${
                        teacherKey
                          ? 'border-emerald-400/70 bg-emerald-500/15 text-emerald-100'
                          : selected
                            ? idx === q.correctIndex
                              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                              : 'border-rose-400 bg-rose-500/20 text-rose-100'
                            : 'border-slate-700 bg-slate-950 text-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {(picked !== undefined || isTeacher) && (
                <p className={`mt-2 text-xs ${isCorrect || isTeacher ? 'text-emerald-300' : 'text-amber-200'}`}>
                  {isCorrect || isTeacher ? q.why : 'Try again—think about what a calm security analyst does.'}
                </p>
              )}
            </div>
          );
        })}

        {GAME_QUESTIONS.every((q) => answers[q.id] === q.correctIndex) && (
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            All Incident Response decisions mastered! (+20 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Incident Response"
        whatIsIt="The 5-step process: Detect → Investigate → Contain → Recover → Learn."
        whyItMatters="Helps teams stop suspicious access quickly and prevent repeat incidents."
        simpleExample="Detect alert → Check logs → Restrict account → Fix setting → Review lesson."
        analogy="A calm emergency response drill."
      />

      <QuickCheck
        id="m9-q1"
        question="What does CONTAIN mean in Incident Response?"
        options={['Stopping suspicious access from continuing', 'Deleting all company files']}
        correctIndex={0}
        explanation="Containment restricts suspicious access so the resource stays protected."
      />
    </div>
  );
}
