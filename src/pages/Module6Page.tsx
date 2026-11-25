import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';
import { CheckCircle2 } from 'lucide-react';

interface StorageConfig {
  id: string;
  name: string;
  contents: string;
  config: 'Public 🔓' | 'Private 🔒';
  isSafe: boolean;
  explanation: string;
}

const STORAGE_CONFIGS: StorageConfig[] = [
  {
    id: 'c1',
    name: 'Student Medical Records Bucket',
    contents: 'Health records, medical histories, student emergency contacts',
    config: 'Public 🔓',
    isSafe: false,
    explanation: 'DANGEROUS! Medical records are highly confidential and must never be Public 🔓.',
  },
  {
    id: 'c2',
    name: 'College Mascot & Public Logo Bucket',
    contents: 'University logos, marketing banners, public event flyers',
    config: 'Public 🔓',
    isSafe: true,
    explanation: 'SAFE: Public website assets and logos are intended for open viewing by anyone on the internet.',
  },
  {
    id: 'c3',
    name: 'Financial Billing & Credit Card Archive',
    contents: 'Tuition transaction receipts, bank statements, invoices',
    config: 'Private 🔒',
    isSafe: true,
    explanation: 'SAFE: Financial records are strictly locked down to authorized finance staff only.',
  },
  {
    id: 'c4',
    name: 'Database Daily Backup Snapshots',
    contents: 'SQL database dumps containing all usernames and passwords',
    config: 'Public 🔓',
    isSafe: false,
    explanation: 'CATASTROPHIC! Database dumps left public allows any internet user to download all user data.',
  },
];

interface MisconfigFinding {
  id: string;
  component: string;
  status: string;
  issue: string;
  severity: 'CRITICAL' | 'WARNING' | 'SECURE';
  isRisky: boolean;
  fix: string;
}

const SCAN_FINDINGS: MisconfigFinding[] = [
  { id: 'f1', component: 'Storage Bucket (Student Files)', status: 'Public Access ON 🔓', issue: 'Sensitive student records accessible over open web', severity: 'CRITICAL', isRisky: true, fix: 'Switch bucket policy to Private 🔒' },
  { id: 'f2', component: 'Admin Account (admin@company.com)', status: 'MFA Disabled ⚠️', issue: 'Admin account protected only by password', severity: 'CRITICAL', isRisky: true, fix: 'Enforce Multi-Factor Authentication immediately' },
  { id: 'f3', component: 'Database Logging', status: 'Audit Logging ON 📜', issue: 'All queries and admin connections logged', severity: 'SECURE', isRisky: false, fix: 'Configuration is optimal' },
  { id: 'f4', component: 'Developer Account (rahul@example.com)', status: 'Master Admin Access ⚠️', issue: 'Junior developer has full root privileges', severity: 'CRITICAL', isRisky: true, fix: 'Apply Least Privilege: downgrade to Developer role' },
  { id: 'f5', component: 'Backup Storage Bucket', status: 'Private Access 🔒', issue: 'Encrypted and restricted to backup service', severity: 'SECURE', isRisky: false, fix: 'Configuration is optimal' },
];

export function Module6Page() {
  const { recordChallengeSuccess } = useCourse();
  const [storageDecisions, setStorageDecisions] = useState<Record<string, 'Safe' | 'Risky'>>({});
  const [flaggedFindings, setFlaggedFindings] = useState<Record<string, boolean>>({});

  const handleStorageEval = (id: string, evaluation: 'Safe' | 'Risky') => {
    const updated = { ...storageDecisions, [id]: evaluation };
    setStorageDecisions(updated);
    if (Object.keys(updated).length === STORAGE_CONFIGS.length) {
      const allCorrect = STORAGE_CONFIGS.every(
        (c) => (evaluation === 'Safe' && c.isSafe) || (evaluation === 'Risky' && !c.isSafe)
      );
      if (allCorrect) {
        recordChallengeSuccess('m6-storage-eval', 20, 'lab-storage-eval');
      }
    }
  };

  const handleToggleFinding = (id: string) => {
    const updated = { ...flaggedFindings, [id]: !flaggedFindings[id] };
    setFlaggedFindings(updated);

    const riskyFindings = SCAN_FINDINGS.filter((f) => f.isRisky);
    const allRiskyFlagged = riskyFindings.every((f) => updated[f.id]);
    const noSecureFlagged = SCAN_FINDINGS.filter((f) => !f.isRisky).every((f) => !updated[f.id]);

    if (allRiskyFlagged && noSecureFlagged) {
      recordChallengeSuccess('m6-misconfig-detector', 25, 'lab-misconfig-detector');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Misconfigurations
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong className="text-rose-300">
            “Misconfiguration means a cloud security setting is configured incorrectly by mistake.”
          </strong>
          <br />
          In the cloud, attackers rarely 'hack' through advanced cryptography; instead, they simply walk through doors accidentally left wide open!
        </p>
      </header>

      {/* SVG: Secure Config -> Config Mistake -> Security Risk */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">How a Misconfiguration Creates Risk</h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Secure Config leads to Config Mistake which results in Security Risk"
            viewBox="0 0 760 110"
            className="h-auto w-full"
          >
            {[
              { label: 'SECURE CONFIG', sub: 'Private 🔒 & Least Privilege', color: '#34d399' },
              { label: 'CONFIG MISTAKE', sub: 'Accidental Public Click', color: '#fbbf24' },
              { label: 'SECURITY RISK', sub: 'Open to Entire Internet 🚨', color: '#fb7185' },
              { label: 'ATTACKER EXPLOITATION', sub: 'Automated Scraping / Breach', color: '#f43f5e' },
            ].map((node, i) => {
              const x = 20 + i * 185;
              return (
                <g key={node.label}>
                  <rect x={x} y={18} width="160" height="74" rx="12" fill="#0f172a" stroke={node.color} strokeWidth="2" />
                  <text x={x + 80} y={50} textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="700">
                    {node.label}
                  </text>
                  <text x={x + 80} y={70} textAnchor="middle" fill={node.color} fontSize="9">
                    {node.sub}
                  </text>
                  {i < 3 && (
                    <line x1={x + 160} y1={55} x2={x + 185} y2={55} stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Public vs Private Resource Activity: 4 Storage Configs */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Activity 1: Public vs Private Resource (Evaluate 4 Configs)</h2>
        <p className="text-xs text-slate-400 mb-4">Evaluate whether each storage bucket configuration is SAFE or RISKY for the data it holds.</p>

        <div className="grid gap-3 sm:grid-cols-2">
          {STORAGE_CONFIGS.map((item) => {
            const currentChoice = storageDecisions[item.id];
            const isAnswered = currentChoice !== undefined;
            const isCorrect = (currentChoice === 'Safe' && item.isSafe) || (currentChoice === 'Risky' && !item.isSafe);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-4 flex flex-col justify-between transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : 'border-rose-500/50 bg-rose-950/20'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.config.includes('Public') ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                      {item.config}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-300"><strong>Data Inside:</strong> {item.contents}</p>
                  {isAnswered && (
                    <p className="mt-2 text-[11px] text-cyan-200 border-t border-slate-800 pt-2">
                      💡 {item.explanation}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStorageEval(item.id, 'Safe')}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                      currentChoice === 'Safe'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-400'
                    }`}
                  >
                    🛡️ Safe
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStorageEval(item.id, 'Risky')}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                      currentChoice === 'Risky'
                        ? 'bg-rose-500 text-white'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-rose-400'
                    }`}
                  >
                    ⚠️ Risky
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Misconfiguration Detection Dashboard (5 items) */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Activity 2: Misconfiguration Detection Dashboard</h2>
            <p className="text-xs text-slate-400">Identify and flag the <strong>3 dangerous misconfigurations</strong> in this cloud dashboard.</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {SCAN_FINDINGS.map((finding) => {
            const isFlagged = Boolean(flaggedFindings[finding.id]);
            return (
              <div
                key={finding.id}
                className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 transition-all ${
                  isFlagged
                    ? finding.isRisky
                      ? 'border-rose-500 bg-rose-950/30'
                      : 'border-amber-500 bg-amber-950/30'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{finding.component}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${finding.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                      {finding.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">{finding.issue}</p>
                  {isFlagged && (
                    <p className="mt-1.5 text-[11px] text-cyan-300">
                      🔧 <strong>Remediation:</strong> {finding.fix}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleFinding(finding.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    isFlagged
                      ? 'bg-rose-500 text-white'
                      : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-cyan-400'
                  }`}
                >
                  {isFlagged ? 'Flagged as Misconfig 🚩' : 'Inspect & Flag'}
                </button>
              </div>
            );
          })}
        </div>

        {SCAN_FINDINGS.filter((f) => f.isRisky).every((f) => flaggedFindings[f.id]) && (
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            Excellent! You caught all 3 critical misconfigurations and left the 2 secure configurations alone! (+25 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Cloud Misconfigurations"
        whatIsIt="Incorrect security settings that leave cloud data or privileges exposed to unauthorized parties."
        whyItMatters="Misconfigurations represent over 80% of real-world cloud security breaches."
        simpleExample="Leaving your front door unlocked or leaving your house window wide open while you go to sleep."
        analogy="Leaving the safe door open at a bank."
      />

      <QuickCheck
        id="m6-q1"
        question="Why are automated scanners used to detect cloud misconfigurations?"
        options={[
          'Human administrators easily overlook a single checkbox or setting among thousands of cloud resources',
          'Automated scanners delete the database automatically',
          'Scanners make the internet bandwidth 10 times faster',
        ]}
        correctIndex={0}
        explanation="Clouds contain thousands of settings; automated policy scanners continuously flag mistakes before adversaries find them."
      />
    </div>
  );
}
