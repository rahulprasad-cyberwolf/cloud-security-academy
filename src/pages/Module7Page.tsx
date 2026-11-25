import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

export function Module7Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [accessPath, setAccessPath] = useState<'granted' | 'denied'>('granted');
  const [removedKeys, setRemovedKeys] = useState<Record<number, boolean>>({});
  const isTeacher = progress.mode === 'teacher';

  const keys = [
    { id: 1, label: 'Dev App Key', required: true },
    { id: 2, label: 'Dev Logs Key', required: true },
    { id: 3, label: 'Billing Admin Key', required: false },
    { id: 4, label: 'All-Users Delete Key', required: false },
    { id: 5, label: 'Master Admin Key', required: false },
  ];

  const handleToggleKey = (id: number, required: boolean) => {
    if (required) return;
    const next = { ...removedKeys, [id]: !removedKeys[id] };
    setRemovedKeys(next);
    if (next[3] && next[4] && next[5]) {
      recordChallengeSuccess('m7-least-privilege-keys', 20, 'lab-least-privilege');
    }
  };

  const extraKeysLeft = keys.filter((k) => !k.required && !removedKeys[k.id]).length;

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Identity, Access & Least Privilege
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Who can access the cloud? What can they access? What can they do?
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-950/20 p-3.5">
            <p className="text-xs font-bold text-cyan-300">AUTHENTICATION</p>
            <p className="mt-1 text-xs text-slate-200">“Are you really the person you claim to be?”</p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-950/20 p-3.5">
            <p className="text-xs font-bold text-emerald-300">AUTHORIZATION</p>
            <p className="mt-1 text-xs text-slate-200">“What are you allowed to access?”</p>
          </div>
          <div className="rounded-xl border border-sky-400/30 bg-sky-950/20 p-3.5">
            <p className="text-xs font-bold text-sky-300">PERMISSIONS</p>
            <p className="mt-1 text-xs text-slate-200">Specific actions allowed (Read, Write, Admin).</p>
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-amber-950/20 p-3.5">
            <p className="text-xs font-bold text-amber-300">ROLES</p>
            <p className="mt-1 text-xs text-slate-200">Job-based bundle (Developer, Tester, Admin).</p>
          </div>
        </div>
      </header>

      {/* Large SVG: USER -> LOGIN -> AUTHENTICATION -> AUTHORIZATION -> RESOURCE -> ACCESS GRANTED / DENIED */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-white">
            Identity & Access Flow (Animated Paths)
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAccessPath('granted')}
              aria-pressed={accessPath === 'granted'}
              className={`min-h-[38px] rounded-xl border px-3.5 py-1.5 text-xs font-bold ${
                accessPath === 'granted' ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200' : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              ✅ ACCESS GRANTED
            </button>
            <button
              type="button"
              onClick={() => setAccessPath('denied')}
              aria-pressed={accessPath === 'denied'}
              className={`min-h-[38px] rounded-xl border px-3.5 py-1.5 text-xs font-bold ${
                accessPath === 'denied' ? 'border-rose-400 bg-rose-500/20 text-rose-200' : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              ⛔ ACCESS DENIED
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label={`Access flow showing ${accessPath === 'granted' ? 'Access Granted' : 'Access Denied'}`}
            viewBox="0 0 800 130"
            className="h-auto w-full"
          >
            {['USER', 'LOGIN', 'AUTHENTICATION', 'AUTHORIZATION', 'RESOURCE', accessPath === 'granted' ? 'ACCESS GRANTED' : 'ACCESS DENIED'].map(
              (label, idx) => {
                const x = 10 + idx * 132;
                const isLast = idx === 5;
                const stroke = isLast
                  ? accessPath === 'granted'
                    ? '#34d399'
                    : '#fb7185'
                  : accessPath === 'granted'
                    ? '#22d3ee'
                    : idx >= 3
                      ? '#fb7185'
                      : '#22d3ee';
                return (
                  <g key={label}>
                    <rect x={x} y={28} width="112" height="68" rx="10" fill="#0f172a" stroke={stroke} strokeWidth="2" />
                    <text x={x + 56} y={66} textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="700">
                      {label}
                    </text>
                    {idx < 5 && (
                      <line x1={x + 112} y1={62} x2={x + 132} y2={62} stroke={stroke} strokeWidth="2.5" className="animate-flow" />
                    )}
                  </g>
                );
              }
            )}
          </svg>
          <p aria-live="polite" className="mt-3 text-sm text-slate-200">
            {accessPath === 'granted'
              ? '✅ Identity verified (Authentication) AND permission approved (Authorization) → ACCESS GRANTED.'
              : '⛔ Either identity failed OR the user lacked permission for this resource → ACCESS DENIED.'}
          </p>
        </div>
      </section>

      {/* Least Privilege Interactive Keys SVG */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          Least Privilege Activity: Remove the Unnecessary Keys
        </h2>
        <p className="mt-1 mb-4 text-sm text-slate-300">
          “Give only the permissions required for the job.” A developer needs development access—not
          full administrator keys! Click the <strong>3 unnecessary keys</strong> below to remove them.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
            <span className="text-rose-300">FULL ACCESS: 🔑 🔑 🔑 🔑 🔑</span>
            <span className="text-emerald-300">REQUIRED ACCESS: 🔑 🔑</span>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-5">
            {keys.map((k) => {
              const isRemoved = Boolean(removedKeys[k.id]);
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => handleToggleKey(k.id, k.required)}
                  disabled={k.required}
                  aria-pressed={isRemoved}
                  className={`min-h-[64px] rounded-xl border p-3 text-center text-xs font-bold transition-all ${
                    k.required
                      ? 'border-emerald-400/60 bg-emerald-950/30 text-emerald-200 cursor-default'
                      : isRemoved
                        ? 'border-slate-800 bg-slate-950 text-slate-600 opacity-40'
                        : isTeacher
                          ? 'border-rose-400 bg-rose-950/35 text-rose-200'
                          : 'border-amber-400/60 bg-amber-950/25 text-amber-200 hover:border-rose-400'
                  }`}
                >
                  <span className="block text-lg" aria-hidden="true">
                    {isRemoved ? '✖️' : '🔑'}
                  </span>
                  <span>{k.label}</span>
                  <span className="mt-1 block text-[10px] opacity-80">
                    {k.required ? 'Required' : isRemoved ? 'Removed' : 'Click to remove'}
                  </span>
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="mt-3 text-sm font-semibold text-emerald-300">
            {extraKeysLeft === 0
              ? '🎉 Least Privilege applied! Only the 2 required development keys remain (+20 pts).'
              : `${extraKeysLeft} unnecessary keys still active — too much access increases risk!`}
          </p>
        </div>
      </section>

      <ConceptCard
        title="Least Privilege"
        whatIsIt="Giving each user only the permissions required for their job."
        whyItMatters="Too much access increases risk if an account is hacked or makes a mistake."
        simpleExample="A developer gets Dev App Key + Dev Logs Key, not Master Admin Key."
        analogy="Giving a delivery driver the porch key instead of every key in your house."
        expectedAnswer="Removing extra keys limits damage if an account is compromised."
        commonConfusion="Thinking developers automatically need Full Administrator access."
      />

      <QuickCheck
        id="m7-q1"
        question="What is the difference between Authentication and Authorization?"
        options={[
          'Authentication proves who you are; Authorization decides what you are allowed to access',
          'Authentication is only for logs; Authorization is only for secrets',
        ]}
        correctIndex={0}
        explanation="Authentication = 'Are you really Rahul?' Authorization = 'What is Rahul allowed to access?'"
      />
    </div>
  );
}
