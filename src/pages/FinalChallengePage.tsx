import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useCourse } from '../context/CourseContext';

interface CloudWeakness {
  id: string;
  name: string;
  beforeState: string;
  afterState: string;
  description: string;
  actionText: string;
}

const CLOUD_WEAKNESSES: CloudWeakness[] = [
  {
    id: 'w1',
    name: 'Storage Access',
    beforeState: 'PUBLIC STORAGE 🔓',
    afterState: 'PRIVATE STORAGE 🔒',
    description: 'Sensitive student records bucket is currently exposed to the open internet.',
    actionText: 'Make Storage Private',
  },
  {
    id: 'w2',
    name: 'Administrator Authentication',
    beforeState: 'MFA DISABLED ⚠️',
    afterState: 'MFA ENFORCED 🛡️',
    description: 'Admin account has no second factor; protected only by a password.',
    actionText: 'Enforce MFA on Admin',
  },
  {
    id: 'w3',
    name: 'Hardcoded Secret',
    beforeState: 'EXPOSED SECRET IN CODE 🔑',
    afterState: 'SECRET IN VAULT 🏦',
    description: 'API_KEY = "DEMO_KEY" is written directly in public code repository.',
    actionText: 'Migrate to Secret Manager',
  },
  {
    id: 'w4',
    name: 'Cloud Activity Visibility',
    beforeState: 'LOGGING DISABLED 📵',
    afterState: 'AUDIT LOGGING ON 📜',
    description: 'No audit records are being collected for logins or configuration changes.',
    actionText: 'Enable Cloud Logging',
  },
  {
    id: 'w5',
    name: 'Developer Permissions',
    beforeState: 'EXCESSIVE ADMIN ACCESS ⚠️',
    afterState: 'LEAST PRIVILEGE ROLE 🛡️',
    description: 'Junior developer holds full Master Admin access across all production services.',
    actionText: 'Apply Least Privilege',
  },
  {
    id: 'w6',
    name: 'Former Employee Account',
    beforeState: 'INACTIVE ACCOUNT ACTIVE 🚨',
    afterState: 'CREDENTIALS REVOKED 🚫',
    description: 'User who left 3 months ago still has an active login profile.',
    actionText: 'Revoke Inactive Account',
  },
];

export function FinalChallengePage() {
  const { setFinalSecurityScore, recordChallengeSuccess, navigateTo } = useCourse();
  const [fixedWeaknesses, setFixedWeaknesses] = useState<Record<string, boolean>>({});

  const fixedCount = CLOUD_WEAKNESSES.filter((w) => fixedWeaknesses[w.id]).length;
  const isFullySecured = fixedCount === CLOUD_WEAKNESSES.length;
  const securityScore = Math.round((fixedCount / CLOUD_WEAKNESSES.length) * 100);

  const handleFixWeakness = (id: string) => {
    const updated = { ...fixedWeaknesses, [id]: true };
    setFixedWeaknesses(updated);
    const count = CLOUD_WEAKNESSES.filter((w) => updated[w.id]).length;
    const score = Math.round((count / CLOUD_WEAKNESSES.length) * 100);
    setFinalSecurityScore(score);
    if (count === CLOUD_WEAKNESSES.length) {
      recordChallengeSuccess('final-secure-the-cloud', 40, 'lab-secure-cloud');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Secure the Cloud — Interactive Remediation Lab
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          This fictional cloud environment has <strong className="text-rose-400">6 critical security weaknesses</strong>.
          <br />
          Click each remediation button to fix the flaws and watch the environment visually transform from{' '}
          <span className="text-rose-400 font-bold">Vulnerable</span> into{' '}
          <span className="text-emerald-300 font-bold">Secured Cloud</span>!
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">
            Fixed: {fixedCount} / {CLOUD_WEAKNESSES.length}
          </span>
          <span className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-emerald-200">
            Cloud Security Score: {securityScore}%
          </span>
        </div>
      </header>

      {/* Visual Transformation SVG */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Cloud Infrastructure Status Overview</h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
          <svg
            role="img"
            aria-label={isFullySecured ? 'All 6 cloud weaknesses secured' : `${fixedCount} of 6 weaknesses fixed`}
            viewBox="0 0 780 150"
            className="h-auto w-full"
          >
            {CLOUD_WEAKNESSES.map((w, idx) => {
              const x = 12 + idx * 128;
              const isFixed = Boolean(fixedWeaknesses[w.id]);
              return (
                <g key={w.id}>
                  <rect
                    x={x}
                    y={22}
                    width="116"
                    height="102"
                    rx="12"
                    fill={isFixed ? 'rgba(16,185,129,0.18)' : 'rgba(225,29,72,0.14)'}
                    stroke={isFixed ? '#34d399' : '#fb7185'}
                    strokeWidth="2"
                  />
                  <text x={x + 58} y={56} textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="700">
                    {w.name}
                  </text>
                  <text
                    x={x + 58}
                    y={82}
                    textAnchor="middle"
                    fill={isFixed ? '#34d399' : '#fb7185'}
                    fontSize="9.5"
                    fontWeight="800"
                  >
                    {isFixed ? 'SECURED ✓' : 'VULNERABLE'}
                  </text>
                  <text x={x + 58} y={104} textAnchor="middle" fill="#94a3b8" fontSize="8">
                    {isFixed ? 'Hardened' : 'Needs Fix'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* 6 Actionable Cards */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Fix the 6 Cloud Weaknesses</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CLOUD_WEAKNESSES.map((w) => {
            const isFixed = Boolean(fixedWeaknesses[w.id]);
            return (
              <div
                key={w.id}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-all ${
                  isFixed ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-rose-500/40 bg-slate-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{w.name}</span>
                    {isFixed && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                  </div>
                  <p className="mt-1 text-[11px] font-bold" style={{ color: isFixed ? '#34d399' : '#fb7185' }}>
                    {isFixed ? w.afterState : w.beforeState}
                  </p>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">{w.description}</p>
                </div>

                <button
                  type="button"
                  disabled={isFixed}
                  onClick={() => handleFixWeakness(w.id)}
                  className={`mt-4 min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    isFixed
                      ? 'bg-emerald-500/20 text-emerald-300 cursor-default'
                      : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                  }`}
                >
                  {isFixed ? 'Secured ✓' : w.actionText}
                </button>
              </div>
            );
          })}
        </div>

        {isFullySecured && (
          <div className="mt-6 rounded-2xl border border-emerald-400/50 bg-emerald-950/40 p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-emerald-200 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-emerald-400" /> Cloud Environment 100% Secured!
              </h3>
              <p className="mt-1 text-xs text-slate-200">
                You successfully applied Least Privilege, closed public buckets, enforced MFA, enabled logging, secured secrets, and revoked old accounts! (+40 pts)
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('final-recap')}
              className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 transition-all"
            >
              Continue to Final Visual Recap ➔
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
