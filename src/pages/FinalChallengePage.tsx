import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useCourse } from '../context/CourseContext';

const FINAL_CHECK_CATEGORIES = [
  { name: 'Identity', note: 'Accounts use strong passwords and 2FA.' },
  { name: 'Access', note: 'Users have only the permissions they need (Least Privilege).' },
  { name: 'Secrets', note: 'API keys and passwords live inside a Secret Manager.' },
  { name: 'Logging', note: 'Authentication and Audit logs are turned ON.' },
  { name: 'Monitoring', note: 'Dashboards watch logins, errors, and traffic.' },
  { name: 'Alerts', note: 'Rules notify the team when something needs attention.' },
  { name: 'Configuration', note: 'Sensitive storage is Private 🔒 and settings are reviewed.' },
  { name: 'Investigation', note: 'Timeline and evidence can be traced quickly.' },
];

const CLOUD_FIXES = [
  { id: 'f1', before: 'PUBLIC STORAGE 🔓', after: 'PRIVATE STORAGE 🔒', action: 'Make Storage Private' },
  { id: 'f2', before: 'ADMIN ACCESS ⚠️', after: 'LIMITED ACCESS 🛡️', action: 'Apply Least Privilege' },
  { id: 'f3', before: 'EXPOSED SECRET 🔑', after: 'PROTECTED SECRET 🏦', action: 'Move to Secret Manager' },
  { id: 'f4', before: 'LOGGING OFF 📵', after: 'LOGGING ON 📜', action: 'Enable Cloud Logging' },
  { id: 'f5', before: 'SUSPICIOUS ACCOUNT 🚨', after: 'UNDER REVIEW 🔎', action: 'Review Suspicious Account' },
];

export function FinalChallengePage() {
  const { setFinalSecurityScore, recordChallengeSuccess, navigateTo } = useCourse();
  const [selectedCategory, setSelectedCategory] = useState(FINAL_CHECK_CATEGORIES[0]);
  const [fixed, setFixed] = useState<Record<string, boolean>>({});

  const fixedCount = CLOUD_FIXES.filter((f) => fixed[f.id]).length;
  const allSecured = fixedCount === CLOUD_FIXES.length;

  const handleFix = (id: string) => {
    const next = { ...fixed, [id]: true };
    setFixed(next);
    const count = CLOUD_FIXES.filter((f) => next[f.id]).length;
    const score = Math.round((count / CLOUD_FIXES.length) * 100);
    setFinalSecurityScore(score);
    if (count === CLOUD_FIXES.length) {
      recordChallengeSuccess('final-secure-cloud', 40, 'lab-secure-cloud');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Final Cloud Security Check & Secure-the-Cloud Lab
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Review the 8 security categories below, then fix all 5 problems in the fictional cloud
          environment!
        </p>
      </header>

      {/* 24. Final Cloud Security Check */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">
          Final Cloud Security Check (Click Each Category)
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {FINAL_CHECK_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory.name === cat.name}
              className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-xs font-bold ${
                selectedCategory.name === cat.name
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                  : 'border-slate-700 bg-slate-900/70 text-slate-200'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-emerald-400">✓</span>
            </button>
          ))}
        </div>
        <p aria-live="polite" className="mt-3 rounded-xl border border-cyan-500/30 bg-slate-950/85 p-3.5 text-sm text-cyan-100">
          <strong>{selectedCategory.name}:</strong> {selectedCategory.note}
        </p>
      </section>

      {/* 25. Final Secure-the-Cloud Activity */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-white">Secure-the-Cloud Activity</h2>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200">
            Fixed: {fixedCount} / {CLOUD_FIXES.length}
          </span>
        </div>

        {/* Live Visual SVG showing all 5 states transforming */}
        <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
          <svg
            role="img"
            aria-label={allSecured ? 'All 5 cloud problems secured' : `${fixedCount} of 5 cloud problems fixed`}
            viewBox="0 0 760 150"
            className="h-auto w-full"
          >
            {CLOUD_FIXES.map((f, idx) => {
              const x = 10 + idx * 150;
              const isFixed = Boolean(fixed[f.id]);
              return (
                <g key={f.id}>
                  <rect
                    x={x}
                    y={24}
                    width="136"
                    height="96"
                    rx="12"
                    fill={isFixed ? 'rgba(16,185,129,0.16)' : 'rgba(225,29,72,0.14)'}
                    stroke={isFixed ? '#34d399' : '#fb7185'}
                    strokeWidth="2"
                  />
                  <text x={x + 68} y={62} textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="700">
                    {isFixed ? f.after : f.before}
                  </text>
                  <text x={x + 68} y={88} textAnchor="middle" fill={isFixed ? '#6ee7b7' : '#fda4af'} fontSize="9">
                    {isFixed ? 'SECURED' : 'NEEDS FIX'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CLOUD_FIXES.map((f) => {
            const isFixed = Boolean(fixed[f.id]);
            return (
              <div
                key={f.id}
                className={`flex flex-col justify-between rounded-xl border p-4 ${
                  isFixed ? 'border-emerald-400/50 bg-emerald-950/20' : 'border-rose-400/40 bg-slate-900/70'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">{isFixed ? f.after : f.before}</span>
                  {isFixed && <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />}
                </div>
                <button
                  type="button"
                  disabled={isFixed}
                  onClick={() => handleFix(f.id)}
                  className={`mt-3 min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-bold ${
                    isFixed ? 'bg-emerald-500/20 text-emerald-300 cursor-default' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                  }`}
                >
                  {isFixed ? 'Secured ✓' : f.action}
                </button>
              </div>
            );
          })}
        </div>

        {allSecured && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-400/40 bg-emerald-500/15 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-emerald-200">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Cloud Environment Secured! (+40 pts)
            </p>
            <button
              type="button"
              onClick={() => navigateTo('final-recap')}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
            >
              Go to Quick Recap
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
