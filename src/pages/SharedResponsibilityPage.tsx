import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';
import { CheckCircle2 } from 'lucide-react';

interface ResponsibilityItem {
  id: string;
  category: string;
  task: string;
  owner: 'provider' | 'customer';
  explanation: string;
}

const RESPONSIBILITY_ITEMS: ResponsibilityItem[] = [
  { id: 'dc', category: 'Physical Security', task: 'Guarding physical data centers, biometric doors, and power backup', owner: 'provider', explanation: 'The cloud provider owns the physical buildings and server hardware.' },
  { id: 'passwords', category: 'Identity & Access', task: 'Choosing strong passwords, turning on MFA, and setting user roles', owner: 'customer', explanation: 'Customers are 100% responsible for managing their own user accounts and passwords.' },
  { id: 'hardware', category: 'Hardware Maintenance', task: 'Replacing broken server disks, CPUs, and physical network cables', owner: 'provider', explanation: 'Physical hardware repair and replacement is completely handled by the cloud provider.' },
  { id: 'data_bucket', category: 'Data & Storage', task: 'Configuring whether cloud storage buckets are Public 🔓 or Private 🔒', owner: 'customer', explanation: 'The customer decides the permissions and public/private access rules for their files.' },
  { id: 'infra_patch', category: 'Host Infrastructure', task: 'Patching the underlying virtualization hypervisors and physical network switches', owner: 'provider', explanation: 'Cloud providers maintain and patch their underlying core cloud infrastructure.' },
  { id: 'app_secrets', category: 'Secret Management', task: 'Keeping API keys and database passwords out of public source code', owner: 'customer', explanation: 'Protecting your application credentials and code is entirely the customer’s duty.' },
];

export function SharedResponsibilityPage() {
  const { recordChallengeSuccess } = useCourse();
  const [activeSide, setActiveSide] = useState<'provider' | 'customer'>('provider');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, 'provider' | 'customer'>>({});

  const handleQuiz = (id: string, choice: 'provider' | 'customer') => {
    const updated = { ...quizAnswers, [id]: choice };
    setQuizAnswers(updated);
    if (Object.keys(updated).length === RESPONSIBILITY_ITEMS.length) {
      const allCorrect = RESPONSIBILITY_ITEMS.every((item) => updated[item.id] === item.owner);
      if (allCorrect) {
        recordChallengeSuccess('shared-responsibility-quiz', 25, 'lab-shared-responsibility');
      }
    }
  };

  const answeredCount = Object.keys(quizAnswers).length;
  const correctCount = RESPONSIBILITY_ITEMS.filter((i) => quizAnswers[i.id] === i.owner).length;

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Shared Responsibility Model
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong className="text-cyan-300">
            “Security OF the Cloud vs. Security IN the Cloud”
          </strong>
          <br />
          The cloud provider secures the underlying infrastructure, but <strong>YOU</strong> are responsible for who has access, how storage is configured, and keeping your data safe.
        </p>
      </header>

      {/* Split Interactive SVG: Cloud Provider vs Customer */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="text-lg font-bold text-white">Visual Responsibility Split</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveSide('provider')}
              className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                activeSide === 'provider'
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                  : 'border-slate-700 bg-slate-900 text-slate-400'
              }`}
            >
              ☁️ Cloud Provider Responsibilities
            </button>
            <button
              type="button"
              onClick={() => setActiveSide('customer')}
              className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                activeSide === 'customer'
                  ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                  : 'border-slate-700 bg-slate-900 text-slate-400'
              }`}
            >
              🛡️ Customer (YOU) Responsibilities
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Shared Responsibility diagram: Provider side on left, Customer side on right"
            viewBox="0 0 760 160"
            className="h-auto w-full"
          >
            {/* Provider Half */}
            <rect
              x="20"
              y="20"
              width="350"
              height="120"
              rx="14"
              fill={activeSide === 'provider' ? 'rgba(34,211,238,0.15)' : '#0f172a'}
              stroke={activeSide === 'provider' ? '#22d3ee' : '#334155'}
              strokeWidth={activeSide === 'provider' ? '2.5' : '1.5'}
            />
            <text x="195" y="52" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="800">
              CLOUD PROVIDER
            </text>
            <text x="195" y="74" textAnchor="middle" fill="#94a3b8" fontSize="11">
              "Security OF the Cloud"
            </text>
            <text x="195" y="98" textAnchor="middle" fill="#e2e8f0" fontSize="10">
              • Physical Buildings & Data Centers
            </text>
            <text x="195" y="118" textAnchor="middle" fill="#e2e8f0" fontSize="10">
              • Server Hardware, Hypervisors, Cables
            </text>

            {/* Customer Half */}
            <rect
              x="390"
              y="20"
              width="350"
              height="120"
              rx="14"
              fill={activeSide === 'customer' ? 'rgba(16,185,129,0.15)' : '#0f172a'}
              stroke={activeSide === 'customer' ? '#10b981' : '#334155'}
              strokeWidth={activeSide === 'customer' ? '2.5' : '1.5'}
            />
            <text x="565" y="52" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="800">
              CUSTOMER (YOUR TEAM)
            </text>
            <text x="565" y="74" textAnchor="middle" fill="#94a3b8" fontSize="11">
              "Security IN the Cloud"
            </text>
            <text x="565" y="98" textAnchor="middle" fill="#e2e8f0" fontSize="10">
              • User Accounts, MFA, Passwords
            </text>
            <text x="565" y="118" textAnchor="middle" fill="#e2e8f0" fontSize="10">
              • Storage Access, API Keys, Audit Logs
            </text>
          </svg>

          <p aria-live="polite" className="mt-3 text-sm text-cyan-200">
            {activeSide === 'provider' ? (
              <span><strong>Cloud Provider:</strong> Ensures physical facilities are guarded, hardware runs smoothly, and base infrastructure is operational. They DO NOT configure your passwords or inspect your private files.</span>
            ) : (
              <span><strong>Customer (You):</strong> You configure IAM permissions, secure database passwords, keep secrets out of GitHub, and monitor audit logs. If a bucket is left public, that is the customer’s mistake!</span>
            )}
          </p>
        </div>
      </section>

      {/* Interactive Activity: Who is Responsible? */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Interactive Activity: Who is Responsible?</h2>
            <p className="text-xs text-slate-400">Classify who is responsible for each security duty: Cloud Provider or Customer.</p>
          </div>
          <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
            Progress: {answeredCount} / {RESPONSIBILITY_ITEMS.length}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESPONSIBILITY_ITEMS.map((item) => {
            const currentChoice = quizAnswers[item.id];
            const isAnswered = currentChoice !== undefined;
            const isCorrect = currentChoice === item.owner;

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : 'border-rose-500/50 bg-rose-950/20'
                    : 'border-slate-700 bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                    {isAnswered && (
                      <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs font-bold text-white leading-relaxed">{item.task}</p>
                  {isAnswered && (
                    <p className="mt-2 text-[11px] text-slate-300 border-t border-slate-800 pt-2">
                      💡 {item.explanation}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuiz(item.id, 'provider')}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                      currentChoice === 'provider'
                        ? 'bg-cyan-500 text-slate-950'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-cyan-400'
                    }`}
                  >
                    ☁️ Cloud Provider
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuiz(item.id, 'customer')}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                      currentChoice === 'customer'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-400'
                    }`}
                  >
                    🛡️ Customer (You)
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {answeredCount === RESPONSIBILITY_ITEMS.length && correctCount === RESPONSIBILITY_ITEMS.length && (
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            Perfect! You mastered the Shared Responsibility Model! (+25 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Shared Responsibility Model"
        whatIsIt="A division of security duties between the cloud vendor and the customer."
        whyItMatters="Assuming the cloud provider handles everything leads to disastrous data leaks and exposed storage."
        simpleExample="The apartment landlord locks the building front door; you must lock your apartment door."
        analogy="Renting an apartment: the landlord maintains the roof and gates, but you choose who enters your room."
      />

      <QuickCheck
        id="shared-resp-q1"
        question="If an employee leaves a cloud storage bucket configured as 'Public 🔓', who is responsible for the mistake?"
        options={[
          'The customer (company), because they configured the access settings',
          'The cloud provider, because they own the physical disks',
          'Nobody, cloud files are always meant to be public',
        ]}
        correctIndex={0}
        explanation="The cloud provider gives you the tools, but the customer configures access controls and bucket permissions."
      />
    </div>
  );
}
