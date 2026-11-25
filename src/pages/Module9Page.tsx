import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

const IR_LIFECYCLE_STAGES = [
  {
    id: 'IDENTIFY',
    number: 1,
    title: '1. IDENTIFY',
    desc: 'Notice and confirm the suspicious activity.',
    flow: ['Alert Fired', 'Security Alert Dashboard', 'Analyst Confirms Issue'],
    color: '#fb7185',
  },
  {
    id: 'CONTAIN',
    number: 2,
    title: '2. CONTAIN',
    desc: 'Stop the attacker from spreading or causing further damage.',
    flow: ['Revoke Sessions', 'Lock Compromised Account', 'Isolate Resource'],
    color: '#fbbf24',
  },
  {
    id: 'INVESTIGATE',
    number: 3,
    title: '3. INVESTIGATE',
    desc: 'Examine audit logs, timestamps, IP addresses, and data accessed.',
    flow: ['Auth Logs', 'Audit Trail', 'Timeline Analysis', 'Determine Impact'],
    color: '#38bdf8',
  },
  {
    id: 'REMEDIATE',
    number: 4,
    title: '4. REMEDIATE',
    desc: 'Fix the root vulnerability and eliminate the attacker presence.',
    flow: ['Rotate Leaked Keys', 'Close Public Buckets', 'Enforce MFA'],
    color: '#a78bfa',
  },
  {
    id: 'RECOVER',
    number: 5,
    title: '5. RECOVER',
    desc: 'Restore systems to normal, verified secure operational state.',
    flow: ['Verify Backups', 'Restore Clean Config', 'Resume Normal Traffic'],
    color: '#34d399',
  },
  {
    id: 'REVIEW',
    number: 6,
    title: '6. REVIEW (LESSONS LEARNED)',
    desc: 'Document what happened and strengthen defenses to prevent recurrence.',
    flow: ['Post-Incident Report', 'Update Policies', 'Automate New Alerts'],
    color: '#22d3ee',
  },
];

const DECISION_POINTS = [
  {
    id: 'dp1',
    scenario: 'Situation: An alert fires indicating rahul@example.com logged in from a foreign country at 02:13 AM and immediately created a new Admin account. What should you do FIRST?',
    options: [
      'Ignore it until Monday morning',
      'Contain: Immediately revoke active sessions and suspend the compromised account to stop unauthorized actions',
      'Email the hacker asking them to stop',
      'Format and delete all company servers',
    ],
    correctIndex: 1,
    explanation: 'Speed is critical. Containing the compromised account immediately halts further damage while the investigation proceeds.',
  },
  {
    id: 'dp2',
    scenario: 'Situation: The account is now contained. During INVESTIGATE, you discover that a database password was stolen from public code. What is the necessary REMEDIATION?',
    options: [
      'Rotate the database password immediately, move it to a Secret Manager, and make sure MFA is turned on',
      'Change the color of the website navbar',
      'Leave the old password as is because it was already leaked',
      'Post the new password in a Slack channel',
    ],
    correctIndex: 0,
    explanation: 'Remediation means fixing the root cause: rotating compromised secrets and moving them to secure vaults.',
  },
  {
    id: 'dp3',
    scenario: 'Situation: The breach is closed and operations are restored. What happens during REVIEW (Lessons Learned)?',
    options: [
      'Blame the intern and delete the incident logs',
      'Conduct a blameless post-mortem, update IAM policies, and configure automated alerts for midnight admin logins',
      'Pretend the incident never happened',
      'Disable audit logging so alerts do not trigger in the future',
    ],
    correctIndex: 1,
    explanation: 'Post-incident review turns painful security events into permanent structural defense improvements.',
  },
];

export function Module9Page() {
  const { recordChallengeSuccess } = useCourse();
  const [activeStage, setActiveStage] = useState(IR_LIFECYCLE_STAGES[0]);
  const [decisionAnswers, setDecisionAnswers] = useState<Record<string, number>>({});

  const handleDecision = (dpId: string, choiceIdx: number) => {
    const updated = { ...decisionAnswers, [dpId]: choiceIdx };
    setDecisionAnswers(updated);
    if (Object.keys(updated).length === DECISION_POINTS.length) {
      const allCorrect = DECISION_POINTS.every((dp) => updated[dp.id] === dp.correctIndex);
      if (allCorrect) {
        recordChallengeSuccess('ir-decision-game-complete', 30, 'lab-ir-game');
      }
    }
  };

  const answeredDecisions = Object.keys(decisionAnswers).length;
  const allDecisionsCorrect = answeredDecisions === DECISION_POINTS.length && DECISION_POINTS.every((dp) => decisionAnswers[dp.id] === dp.correctIndex);

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Incident Response Lifecycle
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          What happens when a security breach occurs? A panic-free security team follows the 6-stage lifecycle:
          <br />
          <strong className="text-cyan-300">
            IDENTIFY ➔ CONTAIN ➔ INVESTIGATE ➔ REMEDIATE ➔ RECOVER ➔ REVIEW
          </strong>
        </p>
      </header>

      {/* 6 Lifecycle Stages with Dedicated SVGs */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Click Each Incident Response Stage</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
          {IR_LIFECYCLE_STAGES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setActiveStage(st)}
              className={`rounded-xl border p-2.5 text-xs font-bold transition-all text-center ${
                activeStage.id === st.id
                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              {st.title}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">{activeStage.title}</h3>
            <span className="text-xs font-bold text-cyan-300">Stage {activeStage.number} of 6</span>
          </div>
          <p className="mt-1 text-xs text-slate-300 mb-4">{activeStage.desc}</p>

          {/* Dedicated SVG for Current Stage */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <svg
              role="img"
              aria-label={`${activeStage.title} workflow`}
              viewBox="0 0 720 90"
              className="h-auto w-full"
            >
              {activeStage.flow.map((node, idx) => {
                const stepW = Math.floor(660 / activeStage.flow.length);
                const x = 20 + idx * stepW;
                return (
                  <g key={node}>
                    <rect
                      x={x}
                      y={16}
                      width={stepW - 24}
                      height="58"
                      rx="10"
                      fill="#0f172a"
                      stroke={activeStage.color}
                      strokeWidth="2"
                    />
                    <text
                      x={x + (stepW - 24) / 2}
                      y={48}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="11"
                      fontWeight="700"
                    >
                      {node}
                    </text>
                    {idx < activeStage.flow.length - 1 && (
                      <line
                        x1={x + stepW - 24}
                        y1={45}
                        x2={x + stepW}
                        y2={45}
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
        </div>
      </section>

      {/* Incident Response Decision Game */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Incident Response Decision Game</h2>
            <p className="text-xs text-slate-400">Make the right tactical moves during an active cyber security incident.</p>
          </div>
          <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
            Decisions: {answeredDecisions} / {DECISION_POINTS.length}
          </span>
        </div>

        <div className="space-y-4">
          {DECISION_POINTS.map((dp, qIdx) => {
            const currentChoice = decisionAnswers[dp.id];
            const isAnswered = currentChoice !== undefined;
            const isCorrect = currentChoice === dp.correctIndex;

            return (
              <div key={dp.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-bold text-cyan-300 mb-1">Decision Point {qIdx + 1}</p>
                <p className="text-xs text-white leading-relaxed font-semibold">{dp.scenario}</p>

                <div className="mt-3 space-y-2">
                  {dp.options.map((opt, optIdx) => {
                    const isSelected = currentChoice === optIdx;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleDecision(dp.id, optIdx)}
                        className={`w-full rounded-xl border p-2.5 text-left text-xs font-semibold transition-all ${
                          isSelected
                            ? optIdx === dp.correctIndex
                              ? 'border-emerald-500 bg-emerald-950/30 text-emerald-200'
                              : 'border-rose-500 bg-rose-950/30 text-rose-200'
                            : 'border-slate-800 bg-slate-900/80 hover:border-cyan-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <p className="mt-3 text-xs text-slate-300 border-t border-slate-800 pt-2">
                    {isCorrect ? '✅ ' : '❌ '} {dp.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {allDecisionsCorrect && (
          <p className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            Flawless execution! You guided the company safely through the incident response lifecycle! (+30 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Incident Response"
        whatIsIt="An organized approach to addressing and managing the aftermath of a security breach or cyberattack."
        whyItMatters="Without a structured plan, teams take chaotic actions (like deleting valid evidence or alerting the hacker)."
        simpleExample="Fire drill in a building: sound alarm (Identify), close fire doors (Contain), check rooms (Investigate), put out fire (Remediate), repair damage (Recover), safety review (Review)."
        analogy="Emergency Fire Drill Protocol."
      />

      <QuickCheck
        id="m9-q1"
        question="Why is CONTAINMENT performed before in-depth investigation during an active cloud intrusion?"
        options={[
          'To instantly stop the intruder from downloading more data or wiping servers while investigators work',
          'Because containment deletes all evidence',
          'Because containment is the final stage of incident response',
        ]}
        correctIndex={0}
        explanation="Stopping the bleeding (containment) prevents an attacker from spreading further while you analyze the situation."
      />
    </div>
  );
}
