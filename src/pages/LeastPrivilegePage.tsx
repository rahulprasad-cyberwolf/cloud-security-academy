import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';
import { CheckCircle2 } from 'lucide-react';

interface KeyPermission {
  id: number;
  label: string;
  role: string;
  isNecessary: boolean;
  explanation: string;
}

const DEV_KEYRING: KeyPermission[] = [
  { id: 1, label: 'Read Dev Code', role: 'Developer', isNecessary: true, explanation: 'Necessary: Developers must be able to read and inspect code.' },
  { id: 2, label: 'Write Dev Branch', role: 'Developer', isNecessary: true, explanation: 'Necessary: Developers need to push features and fixes to dev branches.' },
  { id: 3, label: 'View App Logs', role: 'Developer', isNecessary: true, explanation: 'Necessary: Needed to debug errors and test features.' },
  { id: 4, label: 'Cloud Billing Admin', role: 'Admin', isNecessary: false, explanation: 'Excessive! A developer should not have power to change company payment cards.' },
  { id: 5, label: 'Delete All Storage Buckets', role: 'Admin', isNecessary: false, explanation: 'Dangerous! If compromised, an attacker could wipe all company backups.' },
  { id: 6, label: 'Master IAM Admin', role: 'Admin', isNecessary: false, explanation: 'Excessive! Master Admin grants power to create arbitrary user accounts.' },
];

export function LeastPrivilegePage() {
  const { recordChallengeSuccess } = useCourse();
  const [removedKeys, setRemovedKeys] = useState<Record<number, boolean>>({});

  const handleToggleKey = (key: KeyPermission) => {
    const updated = { ...removedKeys, [key.id]: !removedKeys[key.id] };
    setRemovedKeys(updated);

    const keysLeft = DEV_KEYRING.filter((k) => !updated[k.id]);
    const onlyNecessaryLeft = keysLeft.length === 3 && keysLeft.every((k) => k.isNecessary);
    if (onlyNecessaryLeft) {
      recordChallengeSuccess('least-privilege-keyring', 25, 'lab-least-privilege');
    }
  };

  const unnecessaryRemovedCount = DEV_KEYRING.filter((k) => !k.isNecessary && removedKeys[k.id]).length;
  const wrongKeysRemoved = DEV_KEYRING.filter((k) => k.isNecessary && removedKeys[k.id]).length;
  const isComplete = unnecessaryRemovedCount === 3 && wrongKeysRemoved === 0;

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          The Principle of Least Privilege
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong className="text-cyan-300">
            “Give only the minimum permissions required to perform the job — nothing more, nothing less.”
          </strong>
          <br />
          If every employee is given master administrator privileges, one stolen account can compromise the entire organization!
        </p>
      </header>

      {/* Visual Analogy: Minimal Keyring */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">The Keyring Analogy</h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-5">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 mb-3">
                <p className="text-xs font-bold text-rose-300">⚠️ OVER-PRIVILEGED (Massive Ring of 50 Keys)</p>
                <p className="mt-1 text-xs text-slate-200">
                  You give a junior developer keys to the front door, the developer desk, the financial safe, the CEO office, and the server room. If they drop their keyring on the bus, the finder can rob the whole company!
                </p>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <p className="text-xs font-bold text-emerald-300">🛡️ LEAST PRIVILEGE (Just 2 Specific Keys)</p>
                <p className="mt-1 text-xs text-slate-200">
                  You give the developer only the key to the front door and their desk. If their keyring is lost or stolen, the damage is strictly confined.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <svg role="img" aria-label="Keyring showing 3 necessary keys versus extra keys" viewBox="0 0 340 180" className="w-full max-w-xs">
                <circle cx="170" cy="50" r="34" fill="none" stroke="#22d3ee" strokeWidth="4" />
                <path d="M150 78 L120 150" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                <path d="M170 84 L170 160" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                <path d="M190 78 L220 150" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                <text x="170" y="55" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">RING</text>
                <text x="170" y="174" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700">3 Specific Keys Only</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Activity: Remove Unnecessary Keys (6 down to 3) */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Interactive Activity: Clean the Developer's Keyring</h2>
            <p className="text-xs text-slate-400">
              Rahul is a software developer. Currently he has <strong>6 keys</strong> on his keyring. Click to remove the <strong>3 unnecessary admin keys</strong>.
            </p>
          </div>
          <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
            Unnecessary Keys Removed: {unnecessaryRemovedCount} / 3
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEV_KEYRING.map((key) => {
            const isRemoved = Boolean(removedKeys[key.id]);
            return (
              <div
                key={key.id}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-all ${
                  isRemoved
                    ? key.isNecessary
                      ? 'border-rose-500/50 bg-rose-950/20'
                      : 'border-slate-800 bg-slate-950/60 opacity-60'
                    : 'border-slate-700 bg-slate-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🔑</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        key.isNecessary ? 'bg-cyan-500/20 text-cyan-300' : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {key.role}
                    </span>
                  </div>
                  <h3 className={`text-sm font-bold mt-2 ${isRemoved ? 'line-through text-slate-500' : 'text-white'}`}>
                    {key.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">{key.explanation}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleKey(key)}
                  className={`mt-4 rounded-lg py-1.5 text-xs font-bold transition-all ${
                    isRemoved
                      ? 'border border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                      : 'border border-slate-700 bg-slate-800 text-slate-200 hover:border-rose-400 hover:text-rose-200'
                  }`}
                >
                  {isRemoved ? 'Undo / Restore Key' : 'Remove Key ❌'}
                </button>
              </div>
            );
          })}
        </div>

        {wrongKeysRemoved > 0 && (
          <p className="mt-4 text-xs font-bold text-rose-400">
            ⚠️ Wait! You removed a necessary development key ({DEV_KEYRING.find((k) => k.isNecessary && removedKeys[k.id])?.label}). Developers need this to do their job!
          </p>
        )}

        {isComplete && (
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            Perfect! You stripped away the 3 risky administrator permissions and retained only the 3 required development keys! (+25 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Principle of Least Privilege"
        whatIsIt="Granting users and services only the specific minimum permissions necessary for legitimate duties."
        whyItMatters="Limits blast radius: if an account is compromised, the attacker cannot access or destroy other systems."
        simpleExample="A hotel valet gets a valet key that starts the car, but cannot open the glove compartment or trunk."
        analogy="Valet Key vs Master Car Key."
      />

      <QuickCheck
        id="least-priv-q1"
        question="What is the direct security benefit of applying Least Privilege to user accounts?"
        options={[
          'If an account is compromised, the attacker only gets minimal access rather than full control over everything',
          'Users no longer need to remember their passwords',
          'It allows all users to share the same single username',
        ]}
        correctIndex={0}
        explanation="Least privilege radically shrinks the 'blast radius' of any security incident."
      />
    </div>
  );
}
