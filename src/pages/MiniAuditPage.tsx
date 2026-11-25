import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';
import { CheckCircle2 } from 'lucide-react';

interface AuditItem {
  id: string;
  category: string;
  title: string;
  detail: string;
  correctClassification: 'Secure' | 'Warning' | 'Risk';
  remediation: string;
}

const MINI_AUDIT_ITEMS: AuditItem[] = [
  {
    id: 'a1',
    category: 'Storage',
    title: 'Customer Receipts Storage Bucket',
    detail: 'Storage bucket permissions configured as "Public Access: ON 🔓"',
    correctClassification: 'Risk',
    remediation: 'Immediately switch storage bucket permission to Private 🔒.',
  },
  {
    id: 'a2',
    category: 'Identity',
    title: 'Cloud Administrator Accounts',
    detail: 'All 3 cloud admin accounts have Multi-Factor Authentication (MFA) enabled with hardware security keys',
    correctClassification: 'Secure',
    remediation: 'Complies with best practices. Maintain regular review.',
  },
  {
    id: 'a3',
    category: 'Access',
    title: 'Junior Developer Permissions',
    detail: 'Junior developer assigned "Developer Role" with Read/Write on Dev branch, but NO admin access',
    correctClassification: 'Secure',
    remediation: 'Strict adherence to Principle of Least Privilege.',
  },
  {
    id: 'a4',
    category: 'Secrets',
    title: 'Backend API Keys',
    detail: 'Production database password hardcoded in Python script on GitHub repository',
    correctClassification: 'Risk',
    remediation: 'Rotate leaked password immediately and migrate keys to Secret Manager.',
  },
  {
    id: 'a5',
    category: 'Accounts',
    title: 'Contractor Account',
    detail: 'Contractor finished their project 60 days ago; account is still active with developer access',
    correctClassification: 'Warning',
    remediation: 'Revoke and disable inactive contractor credentials during Access Review.',
  },
  {
    id: 'a6',
    category: 'Logging',
    title: 'Audit Logging Status',
    detail: 'Audit logs are turned ON and stored in an isolated, tamper-proof security bucket',
    correctClassification: 'Secure',
    remediation: 'Ideal configuration for forensics and investigations.',
  },
];

export function MiniAuditPage() {
  const { recordChallengeSuccess } = useCourse();
  const [classifications, setClassifications] = useState<Record<string, 'Secure' | 'Warning' | 'Risk'>>({});

  const handleClassify = (id: string, choice: 'Secure' | 'Warning' | 'Risk') => {
    const updated = { ...classifications, [id]: choice };
    setClassifications(updated);
    if (Object.keys(updated).length === MINI_AUDIT_ITEMS.length) {
      const allCorrect = MINI_AUDIT_ITEMS.every((item) => updated[item.id] === item.correctClassification);
      if (allCorrect) {
        recordChallengeSuccess('mini-audit-complete', 30, 'lab-mini-audit');
      }
    }
  };

  const answeredCount = Object.keys(classifications).length;
  const correctCount = MINI_AUDIT_ITEMS.filter((i) => classifications[i.id] === i.correctClassification).length;
  const auditScore = Math.round((correctCount / MINI_AUDIT_ITEMS.length) * 100);

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Security Mini Audit
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Act as a Lead Cloud Security Auditor!
          <br />
          Inspect the 6 findings from a simulated company cloud audit and classify each finding as:
          <br />
          <span className="text-emerald-300 font-bold">🟢 SECURE</span> •{' '}
          <span className="text-amber-300 font-bold">🟡 WARNING</span> •{' '}
          <span className="text-rose-400 font-bold">🔴 RISK</span>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">
            Classified: {answeredCount} / {MINI_AUDIT_ITEMS.length}
          </span>
          <span className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-emerald-200">
            Audit Accuracy Score: {answeredCount > 0 ? `${auditScore}%` : 'Pending'}
          </span>
        </div>
      </header>

      {/* Mini Audit Table / Cards */}
      <section className="glass-card rounded-2xl p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {MINI_AUDIT_ITEMS.map((item) => {
            const userChoice = classifications[item.id];
            const isAnswered = userChoice !== undefined;
            const isCorrect = userChoice === item.correctClassification;

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : 'border-rose-500/50 bg-rose-950/20'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{item.category}</span>
                    {isAnswered && (
                      <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isCorrect ? '✅ Correct Classification' : `❌ Correct: ${item.correctClassification}`}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1">{item.title}</h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                    {item.detail}
                  </p>
                  {isAnswered && (
                    <p className="mt-2 text-[11px] text-slate-300 border-t border-slate-800 pt-2">
                      💡 <strong>Remediation:</strong> {item.remediation}
                    </p>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleClassify(item.id, 'Secure')}
                    className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                      userChoice === 'Secure'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-400'
                    }`}
                  >
                    🟢 Secure
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClassify(item.id, 'Warning')}
                    className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                      userChoice === 'Warning'
                        ? 'bg-amber-400 text-slate-950'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-amber-400'
                    }`}
                  >
                    🟡 Warning
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClassify(item.id, 'Risk')}
                    className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                      userChoice === 'Risk'
                        ? 'bg-rose-500 text-white'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-rose-400'
                    }`}
                  >
                    🔴 Risk
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {answeredCount === MINI_AUDIT_ITEMS.length && correctCount === MINI_AUDIT_ITEMS.length && (
          <p className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            100% Score! You accurately audited all 6 cloud security findings! (+30 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Cloud Security Mini Audit"
        whatIsIt="A rapid assessment categorizing security findings by severity (Secure, Warning, Risk) to prioritize fixes."
        whyItMatters="Security teams cannot fix 1,000 issues at once; risk scoring directs immediate attention to high-risk exposures."
        simpleExample="Public storage and leaked secrets are immediate Risks; inactive accounts are Warnings."
        analogy="Triage in a hospital emergency room: treat life-threatening injuries before minor sprains."
      />

      <QuickCheck
        id="mini-audit-q1"
        question="Why is an exposed database password in a GitHub repository categorized as a Critical RISK rather than a Warning?"
        options={[
          'Automated bots scan GitHub continuously and can abuse leaked passwords within seconds',
          'Because passwords make the GitHub repository files too large',
          'Because GitHub deletes accounts that have passwords',
        ]}
        correctIndex={0}
        explanation="Public secrets can be weaponized almost instantaneously by automated malicious scrapers."
      />
    </div>
  );
}
