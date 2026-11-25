import { CheckCircle2, ShieldCheck, ShieldOff } from 'lucide-react';
import { useState } from 'react';
import { useCourse } from '../context/CourseContext';

interface RemediationTask {
  id: string;
  label: string;
  issue: string;
  fixAction: string;
}

const TASKS: RemediationTask[] = [
  { id: 't1', label: '1. Review users', issue: 'OldUser account from 6 months ago is still active.', fixAction: 'Disable OldUser' },
  { id: 't2', label: '2. Fix unnecessary permissions', issue: 'Intern has Full Admin Access.', fixAction: 'Set to Read Only' },
  { id: 't3', label: '3. Check storage', issue: 'student-grades bucket is Public.', fixAction: 'Make Bucket Private' },
  { id: 't4', label: '4. Protect secrets', issue: 'API_KEY="DEMO-123" is inside code.', fixAction: 'Move to Secret Manager' },
  { id: 't5', label: '5. Enable logging', issue: 'Cloud Audit Logs are OFF.', fixAction: 'Turn Logging ON' },
  { id: 't6', label: '6. Configure monitoring', issue: 'Login spike monitoring is disabled.', fixAction: 'Enable Monitoring' },
  { id: 't7', label: '7. Review alerts', issue: '3 Red alerts are unacknowledged.', fixAction: 'Acknowledge & Triage' },
  { id: 't8', label: '8. Investigate suspicious activity', issue: '2:13 AM unknown login needs review.', fixAction: 'Complete Investigation' },
];

export function FinalChallengePage() {
  const { setFinalSecurityScore, recordChallengeSuccess, navigateTo } = useCourse();
  const [fixed, setFixed] = useState<Record<string, boolean>>({});

  const fixedCount = TASKS.filter((t) => fixed[t.id]).length;
  const score = Math.round((fixedCount / TASKS.length) * 100);
  const allSecured = fixedCount === TASKS.length;

  const handleFix = (id: string) => {
    const next = { ...fixed, [id]: true };
    setFixed(next);
    const count = TASKS.filter((t) => next[t.id]).length;
    const nextScore = Math.round((count / TASKS.length) * 100);
    setFinalSecurityScore(nextScore);
    if (count === TASKS.length) {
      recordChallengeSuccess('final-challenge-secure-cloud', 40, 'lab-secure-cloud');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Final Practical Challenge: “Secure the Cloud”
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          You have been handed a fictional cloud environment with 8 security problems. Complete
          all 8 fixes below and watch your cloud transform from{' '}
          <strong className="text-rose-300">UNSECURED ⚠️</strong> to{' '}
          <strong className="text-emerald-300">SECURED 🛡️</strong>!
        </p>
      </header>

      {/* Live Visual Cloud State SVG */}
      <section className="glass-card rounded-2xl p-6">
        <div className="grid items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <svg
              role="img"
              aria-label={allSecured ? 'Secured Cloud with 3 shields' : `Unsecured Cloud: ${score}% secured`}
              viewBox="0 0 380 200"
              className="h-auto w-full rounded-2xl border border-slate-800 bg-slate-950/90 p-3"
            >
              <path
                d="M95 120a36 36 0 0 1 30-35 50 50 0 0 1 98 14 34 34 0 0 1 6 65H100a30 30 0 0 1-5-44z"
                fill={allSecured ? 'rgba(16,185,129,0.18)' : 'rgba(225,29,72,0.15)'}
                stroke={allSecured ? '#34d399' : '#fb7185'}
                strokeWidth="2.5"
              />
              <text x="190" y="118" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800">
                {allSecured ? 'SECURED CLOUD 🛡️🛡️🛡️' : 'UNSECURED CLOUD ⚠️⚠️⚠️'}
              </text>
              <text x="190" y="142" textAnchor="middle" fill={allSecured ? '#6ee7b7' : '#fda4af'} fontSize="12" fontWeight="700">
                Security Score: {score}% ({fixedCount}/{TASKS.length} Fixed)
              </text>
            </svg>
          </div>

          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              {allSecured ? (
                <ShieldCheck className="h-7 w-7 text-emerald-400" aria-hidden="true" />
              ) : (
                <ShieldOff className="h-7 w-7 text-rose-400" aria-hidden="true" />
              )}
              <h2 className="text-xl font-bold text-white">
                {allSecured ? 'Environment 100% Secured!' : '8 Security Tasks Remaining'}
              </h2>
            </div>
            <p className="text-sm text-slate-300">
              {allSecured
                ? 'Amazing work! Every user, permission, bucket, secret, log, monitor, alert, and suspicious event has been handled.'
                : 'Click the fix button on each task card below to harden this simulated cloud.'}
            </p>
            {allSecured && (
              <button
                type="button"
                onClick={() => navigateTo('final-quiz')}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400"
              >
                Proceed to Final Quiz & Certificate
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 8 Remediation Tasks */}
      <section className="grid gap-3 sm:grid-cols-2">
        {TASKS.map((task) => {
          const isFixed = Boolean(fixed[task.id]);
          return (
            <article
              key={task.id}
              className={`glass-card flex flex-col justify-between rounded-2xl border p-4 ${
                isFixed ? 'border-emerald-400/50 bg-emerald-950/20' : 'border-rose-400/35'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">{task.label}</h3>
                  {isFixed && <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />}
                </div>
                <p className="mt-1 text-xs text-slate-300">{task.issue}</p>
              </div>
              <button
                type="button"
                disabled={isFixed}
                onClick={() => handleFix(task.id)}
                className={`mt-3 min-h-[38px] rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                  isFixed
                    ? 'bg-emerald-500/20 text-emerald-300 cursor-default'
                    : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                }`}
              >
                {isFixed ? 'Fixed ✓' : task.fixAction}
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}
