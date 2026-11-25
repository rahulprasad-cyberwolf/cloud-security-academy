import { CheckCircle2, Code2, Lock, RefreshCw, ShieldAlert, Unlock, XCircle } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { DiscussionPrompt } from '../components/DiscussionPrompt';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

const CODE_LINES = [
  { num: 1, code: 'username = "rahul"', isSecret: false },
  { num: 2, code: 'theme = "dark"', isSecret: false },
  { num: 3, code: 'API_KEY = "DEMO-SECRET-123"', isSecret: true },
  { num: 4, code: 'timeout = 30', isSecret: false },
];

export function Module5Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [vaultOpened, setVaultOpened] = useState(false);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const isTeacher = progress.mode === 'teacher';

  const handleToggleVault = () => {
    const next = !vaultOpened;
    setVaultOpened(next);
    if (next) {
      recordChallengeSuccess('m5-vault', 15);
    }
  };

  const handleSelectLine = (lineNum: number, isSecret: boolean) => {
    setSelectedLine(lineNum);
    if (isSecret) {
      recordChallengeSuccess('m5-find-secret', 20, 'lab-find-secret');
    }
  };

  const pickedLine = CODE_LINES.find((l) => l.num === selectedLine);

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Section 4: Secret Management (15 Minutes)
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          A <strong className="text-cyan-300">Secret</strong> is a Password, API Key, Access Token,
          or Database Credential. <strong className="text-amber-300">PASSWORD = HOUSE KEY</strong> •{' '}
          <strong className="text-emerald-300">SECRET MANAGER = SECURE KEY LOCKER</strong>.
        </p>
      </header>

      {/* Large SVG Vault */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">Interactive Secret Vault</h2>
            <p className="text-sm text-slate-400">Click the vault to open it and see what belongs inside.</p>
          </div>
          <button
            type="button"
            onClick={handleToggleVault}
            aria-expanded={vaultOpened}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
          >
            {vaultOpened ? <Lock className="h-4 w-4" aria-hidden="true" /> : <Unlock className="h-4 w-4" aria-hidden="true" />}
            <span>{vaultOpened ? 'Lock Vault' : 'Open Secret Vault'}</span>
          </button>
        </div>

        <div className="grid items-center gap-6 rounded-2xl border border-slate-800 bg-slate-950/85 p-5 md:grid-cols-12">
          <div className="md:col-span-6">
            <svg role="img" aria-label={vaultOpened ? 'Secret vault opened' : 'Secret vault locked'} viewBox="0 0 360 190" className="h-auto w-full">
              <rect x="70" y="14" width="220" height="162" rx="20" fill="#0f172a" stroke={vaultOpened ? '#34d399' : '#38bdf8'} strokeWidth="3" />
              <rect x="90" y="32" width="180" height="126" rx="14" fill={vaultOpened ? 'rgba(16,185,129,0.12)' : '#1e293b'} stroke={vaultOpened ? '#34d399' : '#475569'} strokeWidth="2" />
              {vaultOpened ? (
                <g>
                  <text x="180" y="72" textAnchor="middle" fill="#a7f3d0" fontSize="11.5" fontWeight="700">🔑 Passwords & API Keys</text>
                  <text x="180" y="96" textAnchor="middle" fill="#a7f3d0" fontSize="11.5" fontWeight="700">🎟️ Access Tokens</text>
                  <text x="180" y="120" textAnchor="middle" fill="#a7f3d0" fontSize="11.5" fontWeight="700">🗄️ DB Credentials</text>
                </g>
              ) : (
                <g className="animate-gentle-pulse">
                  <circle cx="180" cy="95" r="32" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                  <circle cx="180" cy="95" r="12" fill="#082f49" stroke="#22d3ee" strokeWidth="2" />
                </g>
              )}
            </svg>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm md:col-span-6">
            <p className="flex items-center gap-2 text-rose-200"><XCircle className="h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" /> Never upload secrets to GitHub.</p>
            <p className="flex items-center gap-2 text-rose-200"><XCircle className="h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" /> Never put passwords in frontend code.</p>
            <p className="flex items-center gap-2 text-emerald-200"><RefreshCw className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" /> Rotate compromised secrets immediately.</p>
          </div>
        </div>
      </section>

      {/* BAD vs GOOD SVG */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="glass-card rounded-2xl border border-rose-500/35 p-5">
          <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-rose-300">
            <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            BAD: Exposed on GitHub
          </h2>
          <p className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-rose-200">
            CODE ➔ API KEY ➔ GITHUB ➔ PUBLIC EXPOSURE 🚨
          </p>
        </div>
        <div className="glass-card rounded-2xl border border-emerald-500/35 p-5">
          <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            GOOD: Secret Manager
          </h2>
          <p className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-emerald-200">
            APPLICATION ➔ SECRET MANAGER ➔ SECRET ➔ APPLICATION 🛡️
          </p>
        </div>
      </section>

      {/* Secret Detection Activity */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2.5">
          <Code2 className="h-5 w-5 text-cyan-300" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-bold text-white">Secret Detection Activity</h2>
            <p className="text-sm text-slate-400">Which line should NOT be stored directly in code?</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs sm:text-sm">
          {CODE_LINES.map((line) => {
            const isPicked = selectedLine === line.num;
            const teacherMark = isTeacher && line.isSecret;
            return (
              <button
                key={line.num}
                type="button"
                onClick={() => handleSelectLine(line.num, line.isSecret)}
                aria-pressed={isPicked}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                  isPicked
                    ? line.isSecret
                      ? 'bg-rose-500/20 text-rose-200'
                      : 'bg-slate-800 text-slate-300'
                    : teacherMark
                      ? 'bg-violet-500/20 text-violet-200'
                      : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span className="w-6 shrink-0 text-slate-500">{line.num}</span>
                <span>{line.code}</span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-3">
          {pickedLine && (
            <div className={`rounded-xl border p-4 text-sm ${pickedLine.isSecret ? 'border-emerald-400/50 bg-emerald-950/35 text-emerald-100' : 'border-amber-400/40 bg-amber-950/30 text-amber-100'}`}>
              {pickedLine.isSecret ? (
                <p>
                  <strong>🎯 Correct! Line 3 (<code>API_KEY = "DEMO-SECRET-123"</code>)</strong>{' '}
                  should NEVER be in code. Anyone reading GitHub can steal it. Store it in a Secret
                  Manager instead! (+20 pts)
                </p>
              ) : (
                <p>Line {pickedLine.num} is normal configuration—keep looking for the secret!</p>
              )}
            </div>
          )}
        </div>
      </section>

      <ConceptCard
        title="Secret Management"
        whatIsIt="Keeping passwords, API keys, and tokens locked inside a Secret Manager instead of source code."
        whyItMatters="Bots scan public code repositories in seconds looking for leaked keys."
        simpleExample="Application asks Secret Manager for API_KEY at runtime."
        analogy="Locking your house key inside a secure key locker instead of taping it to the door."
      />

      <DiscussionPrompt
        question="What happens if a secret is exposed?"
        expectedAnswer="Anyone who finds the key can pretend to be your app or account. You must remove it AND rotate (replace) it immediately."
      />

      <QuickCheck
        id="m5-q1"
        question="Where should an application store its API key?"
        options={['Inside a Secret Manager', 'Inside public frontend JavaScript', 'In a GitHub README', 'In a class chat']}
        correctIndex={0}
        explanation="Secret Managers keep keys encrypted and out of your source code."
      />
    </div>
  );
}
