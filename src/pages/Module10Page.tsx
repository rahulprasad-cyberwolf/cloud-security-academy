import { Play, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

const CHECKLIST_ITEMS = [
  { id: 'IDENTITY', check: 'Are accounts using strong passwords & 2FA?', why: 'Protects user sign-ins from guessing.', issue: 'Weak or reused passwords.', rec: 'Enable 2FA on all accounts.' },
  { id: 'ACCESS', check: 'Do users follow Least Privilege?', why: 'Limits damage if an account is stolen.', issue: 'OldUser or GuestUser with Admin.', rec: 'Review access and remove extra Admin roles.' },
  { id: 'STORAGE', check: 'Are sensitive storage buckets Private 🔒?', why: 'Prevents public data exposure.', issue: 'Bucket left Public 🔓.', rec: 'Set sensitive storage to Private.' },
  { id: 'SECRETS', check: 'Are secrets stored in a Secret Manager?', why: 'Keeps keys out of public code.', issue: 'API_KEY hardcoded in source code.', rec: 'Move to Secret Manager & rotate leaked keys.' },
  { id: 'LOGGING', check: 'Are Audit & Auth logs enabled?', why: 'Provides a record for investigations.', issue: 'Logging turned OFF.', rec: 'Enable logging across all cloud resources.' },
  { id: 'MONITORING', check: 'Is unusual activity monitored?', why: 'Spots failed login spikes early.', issue: 'Nobody watching login graphs.', rec: 'Use continuous monitoring dashboards.' },
  { id: 'ALERTS', check: 'Do alerts fire on risky changes?', why: 'Notifies the team right away.', issue: 'Permission changes go unnoticed.', rec: 'Configure alerts for failed logins & Admin changes.' },
  { id: 'CONFIGURATION', check: 'Are settings checked for misconfigurations?', why: 'Finds open doors before incidents happen.', issue: 'Default or open settings left unchanged.', rec: 'Run regular Cloud Security Assessments.' },
];

const SCAN_TARGETS = [
  { target: 'Users', result: 'WARNING', note: 'OldUser & GuestUser need Access Review' },
  { target: 'Permissions', result: 'REVIEW REQUIRED', note: 'Developer has unnecessary Admin access' },
  { target: 'Storage', result: 'REVIEW REQUIRED', note: '1 storage resource is Public 🔓' },
  { target: 'Secrets', result: 'WARNING', note: '1 demo key found in source code' },
  { target: 'Logs', result: 'PASS', note: 'Audit logs are recording events' },
  { target: 'Monitoring', result: 'PASS', note: 'Monitoring dashboard is active' },
];

export function Module10Page() {
  const { setAssessmentScore, recordChallengeSuccess } = useCourse();
  const [selectedItem, setSelectedItem] = useState(CHECKLIST_ITEMS[0]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [scanningIdx, setScanningIdx] = useState<number>(-1);
  const [scanDone, setScanDone] = useState(false);

  useEffect(() => {
    if (scanningIdx < 0) return;
    if (scanningIdx >= SCAN_TARGETS.length) {
      setScanDone(true);
      setScanningIdx(-1);
      recordChallengeSuccess('m10-scanner', 15, 'lab-scanner');
      return;
    }
    const timer = window.setTimeout(() => setScanningIdx((i) => i + 1), 650);
    return () => window.clearTimeout(timer);
  }, [scanningIdx, recordChallengeSuccess]);

  const handleSelectItem = (item: (typeof CHECKLIST_ITEMS)[number]) => {
    setSelectedItem(item);
    const next = { ...checked, [item.id]: true };
    setChecked(next);
    const count = CHECKLIST_ITEMS.filter((c) => next[c.id]).length;
    setAssessmentScore(Math.round((count / CHECKLIST_ITEMS.length) * 100));
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Security Assessment
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          A <strong className="text-emerald-300">Cloud Security Assessment</strong> is a structured
          security check across your cloud environment.
        </p>
      </header>

      {/* Visual Checklist */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">
          8-Domain Security Assessment Checklist (Click Each Item)
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CHECKLIST_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectItem(item)}
              aria-pressed={selectedItem.id === item.id}
              className={`min-h-[42px] rounded-xl border px-3 py-2 text-xs font-bold ${
                selectedItem.id === item.id
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                  : checked[item.id]
                    ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              {item.id}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-4 grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/85 p-4 text-xs sm:grid-cols-2 sm:text-sm">
          <p className="text-slate-200"><strong className="text-cyan-300">What to check:</strong> {selectedItem.check}</p>
          <p className="text-slate-200"><strong className="text-emerald-300">Why it matters:</strong> {selectedItem.why}</p>
          <p className="text-slate-200"><strong className="text-rose-300">Common issue:</strong> {selectedItem.issue}</p>
          <p className="text-slate-200"><strong className="text-amber-300">Basic recommendation:</strong> {selectedItem.rec}</p>
        </div>
      </section>

      {/* Fictional Animated Cloud Security Scanner */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">
              Simulated Cloud Security Scanner (Classroom Demo)
            </h2>
            <p className="text-sm text-slate-400">
              Watch the scanner check Users, Permissions, Storage, Secrets, Logs, and Monitoring.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setScanDone(false);
              setScanningIdx(0);
            }}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            <span>Run Simulated Scan</span>
          </button>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {SCAN_TARGETS.map((item, idx) => {
            const isScanning = scanningIdx === idx;
            const isRevealed = scanDone || (scanningIdx > idx && scanningIdx !== -1);
            const badgeStyle =
              item.result === 'PASS'
                ? 'bg-emerald-500/20 text-emerald-300'
                : item.result === 'WARNING'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-rose-500/20 text-rose-300';

            return (
              <div
                key={item.target}
                className={`rounded-xl border p-4 transition-all ${
                  isScanning ? 'border-cyan-400 bg-cyan-950/35 ring-2 ring-cyan-400' : 'border-slate-700/70 bg-slate-900/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{item.target}</span>
                  {isRevealed ? (
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeStyle}`}>
                      {item.result}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">{isScanning ? 'Scanning...' : 'Pending'}</span>
                  )}
                </div>
                {isRevealed && <p className="mt-1.5 text-xs text-slate-300">{item.note}</p>}
              </div>
            );
          })}
        </div>

        {scanDone && (
          <p aria-live="polite" className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Simulated scan complete! Proceed to “Secure the Cloud” to fix these findings.
          </p>
        )}
      </section>

      <ConceptCard
        title="Cloud Security Assessment"
        whatIsIt="A structured security check of Identity, Access, Storage, Secrets, Logging, Monitoring, Alerts, and Configuration."
        whyItMatters="Finds weak spots proactively before an incident occurs."
        simpleExample="Running an assessment flags 1 public bucket and 2 old admin accounts."
        analogy="A regular safety inspection of a building."
      />

      <QuickCheck
        id="m10-q1"
        question="What is the purpose of a Cloud Security Assessment?"
        options={['To perform a structured check and find security gaps early', 'To delete all user logs']}
        correctIndex={0}
        explanation="Assessments check each security area systematically so issues can be fixed."
      />
    </div>
  );
}
