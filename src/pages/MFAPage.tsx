import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';
import { CheckCircle2 } from 'lucide-react';

export function MFAPage() {
  const { recordChallengeSuccess } = useCourse();
  const [selectedFactor, setSelectedFactor] = useState<number>(0);
  const [comparisonChoice, setComparisonChoice] = useState<'password_only' | 'password_plus_mfa' | null>(null);

  const FACTORS = [
    {
      num: 1,
      title: 'SOMETHING YOU KNOW',
      desc: 'Knowledge Factor',
      example: 'Password, PIN code, security question',
      risk: 'Can be guessed, phished, or leaked in data breaches.',
      icon: '🧠',
    },
    {
      num: 2,
      title: 'SOMETHING YOU HAVE',
      desc: 'Possession Factor',
      example: 'Mobile phone (SMS/Authenticator App OTP), Security Key (YubiKey)',
      risk: 'Even if an attacker knows your password, they do not hold your physical phone.',
      icon: '📱',
    },
    {
      num: 3,
      title: 'SOMETHING YOU ARE',
      desc: 'Inherence Factor',
      example: 'Fingerprint, FaceID, Retina scan',
      risk: 'Unique to your physical body; almost impossible for a remote attacker to fake.',
      icon: '👁️',
    },
  ];

  const handleComparison = (choice: 'password_only' | 'password_plus_mfa') => {
    setComparisonChoice(choice);
    if (choice === 'password_plus_mfa') {
      recordChallengeSuccess('mfa-comparison-lab', 20, 'lab-mfa');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Multi-Factor Authentication (MFA)
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Why is a password alone NOT enough to protect cloud accounts?
          <br />
          If an attacker guesses or steals an employee’s password, <strong className="text-rose-400">they can sign right in</strong>.
          MFA adds a critical second barrier: <strong className="text-emerald-300">Password + Extra Proof = Secure Access</strong>.
        </p>
      </header>

      {/* The 3 Authentication Factors */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">The 3 Factors of Authentication</h2>
        <p className="text-xs text-slate-400 mb-4">MFA requires at least TWO different factors from this list.</p>

        <div className="grid gap-3 sm:grid-cols-3">
          {FACTORS.map((f, idx) => (
            <button
              key={f.num}
              type="button"
              onClick={() => setSelectedFactor(idx)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                selectedFactor === idx
                  ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="text-3xl">{f.icon}</div>
              <p className="mt-2 text-xs font-bold text-cyan-300 uppercase">{f.desc}</p>
              <h3 className="text-sm font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-xs text-slate-300"><strong>Examples:</strong> {f.example}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-cyan-500/30 bg-slate-950/85 p-4 text-xs sm:text-sm">
          <p className="font-bold text-cyan-200">Security Significance:</p>
          <p className="mt-1 text-slate-200">{FACTORS[selectedFactor].risk}</p>
        </div>
      </section>

      {/* Visual SVG: Password -> MFA Check -> Cloud Access */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">How MFA Stops Remote Attackers</h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Password entry checked, followed by MFA check, resulting in Cloud Access"
            viewBox="0 0 760 120"
            className="h-auto w-full"
          >
            {[
              { label: 'ENTER PASSWORD', sub: 'Factor 1 (Knowledge)', color: '#38bdf8' },
              { label: 'MFA CHECK', sub: 'Factor 2 (OTP on Phone)', color: '#fbbf24' },
              { label: 'IDENTITY VERIFIED', sub: 'Both factors pass', color: '#34d399' },
              { label: 'CLOUD ACCESS', sub: 'Granted securely', color: '#22d3ee' },
            ].map((node, i) => {
              const x = 20 + i * 185;
              return (
                <g key={node.label}>
                  <rect x={x} y={20} width="160" height="76" rx="12" fill="#0f172a" stroke={node.color} strokeWidth="2" />
                  <text x={x + 80} y={52} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                    {node.label}
                  </text>
                  <text x={x + 80} y={72} textAnchor="middle" fill={node.color} fontSize="9">
                    {node.sub}
                  </text>
                  {i < 3 && (
                    <line x1={x + 160} y1={58} x2={x + 185} y2={58} stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>
          <p className="mt-3 text-xs text-slate-300">
            Even if a hacker in another country steals your password, they fail the <strong>MFA Check</strong> because they do not have your physical phone!
          </p>
        </div>
      </section>

      {/* Interactive Activity: Which Login is Stronger? */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Interactive Activity: Which Login is Stronger?</h2>
        <p className="text-xs text-slate-400 mb-4">Click each login approach to evaluate its security posture.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => handleComparison('password_only')}
            className={`rounded-2xl border p-5 text-left transition-all ${
              comparisonChoice === 'password_only'
                ? 'border-rose-400 bg-rose-950/30'
                : 'border-slate-800 bg-slate-900/60 hover:border-rose-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-300 uppercase">Option A</span>
              <span className="text-xs bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded-full">High Risk</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">Password Alone ("Admin1234")</h3>
            <p className="mt-2 text-xs text-slate-300">
              User enters only a password to log into the cloud management console.
            </p>
            {comparisonChoice === 'password_only' && (
              <div className="mt-3 border-t border-rose-900/50 pt-2 text-xs text-rose-300">
                ⚠️ Weak! If the password is leaked or guessed via brute force, the account is immediately taken over.
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleComparison('password_plus_mfa')}
            className={`rounded-2xl border p-5 text-left transition-all ${
              comparisonChoice === 'password_plus_mfa'
                ? 'border-emerald-400 bg-emerald-950/30'
                : 'border-slate-800 bg-slate-900/60 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase">Option B</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-full">Recommended</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">Password + Authenticator OTP (MFA)</h3>
            <p className="mt-2 text-xs text-slate-300">
              User enters password AND a time-sensitive 6-digit code generated on their phone.
            </p>
            {comparisonChoice === 'password_plus_mfa' && (
              <div className="mt-3 border-t border-emerald-900/50 pt-2 text-xs text-emerald-300">
                ✅ Strong! Even with a stolen password, the attacker cannot complete login without the physical device.
              </div>
            )}
          </button>
        </div>

        {comparisonChoice === 'password_plus_mfa' && (
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            Correct! Multi-Factor Authentication blocks over 99% of automated account takeover attacks. (+20 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Multi-Factor Authentication (MFA)"
        whatIsIt="Requiring two or more independent factors (knowledge, possession, inherence) before access is granted."
        whyItMatters="Passwords are leaked and stolen every day; MFA prevents stolen credentials from succeeding."
        simpleExample="ATM card (something you have) + 4-digit PIN (something you know)."
        analogy="Withdrawing money at an ATM: having the card alone or the PIN alone is useless without both."
      />

      <QuickCheck
        id="mfa-q1"
        question="Why does having MFA on cloud administrator accounts matter so much?"
        options={[
          'Admins control the entire cloud environment; MFA stops attackers even if they compromise the password',
          'MFA makes the cloud servers run faster',
          'Cloud providers turn off admin accounts unless they pay extra fees',
        ]}
        correctIndex={0}
        explanation="Admin accounts have full control; protecting them with MFA is the single most important cloud security baseline."
      />
    </div>
  );
}
