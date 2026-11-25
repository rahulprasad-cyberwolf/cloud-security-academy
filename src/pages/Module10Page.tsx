import { CheckCircle2, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

interface AssessmentDomain {
  id: string;
  name: string;
  check: string;
  risk: string;
  example: string;
  recommendation: string;
}

const DOMAINS: AssessmentDomain[] = [
  { id: 'd1', name: 'Identity', check: 'Are accounts protected with strong passwords & 2FA?', risk: 'Weak passwords let attackers guess their way in.', example: 'Admin account with password "123456".', recommendation: 'Require strong passwords and 2FA for everyone.' },
  { id: 'd2', name: 'Access', check: 'Do users follow Least Privilege?', risk: 'Too many Admins increases damage if an account is stolen.', example: 'Intern has Full Admin access.', recommendation: 'Review access monthly and remove extra permissions.' },
  { id: 'd3', name: 'Storage', check: 'Are private storage buckets locked?', risk: 'Public buckets leak student or customer files.', example: 'student-grades-bucket set to Public.', recommendation: 'Keep storage Private unless files are meant to be public.' },
  { id: 'd4', name: 'Secrets', check: 'Are API keys & passwords stored in a Secret Manager?', risk: 'Hardcoded keys on GitHub get stolen by bots in seconds.', example: 'API_KEY="DEMO-123" in frontend code.', recommendation: 'Use a Secret Manager and rotate leaked keys.' },
  { id: 'd5', name: 'Logging', check: 'Are Audit & Authentication logs enabled?', risk: 'Without logs, you cannot investigate break-ins.', example: 'Audit logging turned OFF.', recommendation: 'Enable logging across all cloud services.' },
  { id: 'd6', name: 'Monitoring', check: 'Are CPU, logins, and errors watched continuously?', risk: 'Unusual 2 AM login spikes go unnoticed.', example: 'Nobody checks login graphs.', recommendation: 'Set up continuous monitoring dashboards.' },
  { id: 'd7', name: 'Alerts', check: 'Do alerts fire for failed logins & permission changes?', risk: 'Teams find out about incidents days too late.', example: '5 failed logins trigger zero alerts.', recommendation: 'Configure Red/Yellow alerts for risky events.' },
  { id: 'd8', name: 'Configuration', check: 'Are cloud settings checked for open doors?', risk: 'Misconfigurations leave databases open to the world.', example: 'Firewall set to 0.0.0.0/0.', recommendation: 'Run regular configuration checks.' },
  { id: 'd9', name: 'Incident Response', check: 'Does the team have a 5-step response plan?', risk: 'Teams panic or delete logs during an incident.', example: 'No contact list or containment steps.', recommendation: 'Practice Detect → Investigate → Contain → Recover → Learn.' },
];

const FINAL_CHECKLIST = [
  'Are strong passwords used?',
  'Are unnecessary accounts removed?',
  'Are permissions reviewed?',
  'Are secrets protected?',
  'Is logging enabled?',
  'Are alerts configured?',
  'Is suspicious activity monitored?',
  'Is storage private where appropriate?',
  'Are incidents documented?',
];

export function Module10Page() {
  const { setAssessmentScore, recordChallengeSuccess } = useCourse();
  const [checkedDomains, setCheckedDomains] = useState<Record<string, boolean>>({});
  const [activeDomain, setActiveDomain] = useState<AssessmentDomain>(DOMAINS[0]);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});

  const completedDomains = DOMAINS.filter((d) => checkedDomains[d.id]).length;
  const overallScore = Math.round(40 + (completedDomains / DOMAINS.length) * 60);

  const toggleDomain = (domain: AssessmentDomain) => {
    setActiveDomain(domain);
    const next = { ...checkedDomains, [domain.id]: !checkedDomains[domain.id] };
    setCheckedDomains(next);
    const count = DOMAINS.filter((d) => next[d.id]).length;
    const nextScore = Math.round(40 + (count / DOMAINS.length) * 60);
    setAssessmentScore(nextScore);
    if (count === DOMAINS.length) {
      recordChallengeSuccess('m10-assessment', 20, 'lab-assessment');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Module 10: Cloud Security Assessment & Security Score
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          A <strong className="text-emerald-300">Security Assessment</strong> is a complete
          checkup of your cloud before trouble happens—just like checking locks, doors, and cameras
          before opening a shop.
        </p>
      </header>

      {/* 22 & 23. 9-Domain Interactive Assessment + Animated SVG Security Meter */}
      <section className="glass-card rounded-2xl p-6">
        <div className="grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-950/85 p-5">
            <svg
              role="img"
              aria-label={`Overall Cloud Security Score: ${overallScore}%`}
              viewBox="0 0 180 120"
              className="h-36 w-52"
            >
              <path d="M20 100 A70 70 0 0 1 160 100" fill="none" stroke="#1e293b" strokeWidth="14" strokeLinecap="round" />
              <path
                d="M20 100 A70 70 0 0 1 160 100"
                fill="none"
                stroke={overallScore >= 85 ? '#34d399' : overallScore >= 65 ? '#22d3ee' : '#fbbf24'}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray="220"
                strokeDashoffset={220 - Math.round((overallScore / 100) * 220)}
              />
              <text x="90" y="88" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="800">
                {overallScore}%
              </text>
              <text x="90" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Overall Security Score
              </text>
            </svg>

            <div className="mt-3 w-full space-y-2 text-xs">
              {[
                { label: 'Identity', val: checkedDomains['d1'] ? 100 : 80 },
                { label: 'Storage', val: checkedDomains['d3'] ? 100 : 50 },
                { label: 'Secrets', val: checkedDomains['d4'] ? 100 : 40 },
                { label: 'Logging', val: checkedDomains['d5'] ? 100 : 90 },
                { label: 'Monitoring', val: checkedDomains['d6'] ? 100 : 70 },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-slate-300">
                    <span>{bar.label}</span>
                    <span>{bar.val}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                    <div
                      className="h-1.5 rounded-full bg-cyan-400 transition-all"
                      style={{ width: `${bar.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-lg font-bold text-white">
              Click Each Domain to Inspect & Complete Check ({completedDomains}/9)
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {DOMAINS.map((d) => {
                const done = Boolean(checkedDomains[d.id]);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDomain(d)}
                    aria-pressed={done}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold ${
                      done
                        ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-100'
                        : 'border-slate-700 bg-slate-900/70 text-slate-200 hover:border-cyan-400/50'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 ${done ? 'text-emerald-400' : 'text-slate-600'}`}
                      aria-hidden="true"
                    />
                    <span>{d.name}</span>
                  </button>
                );
              })}
            </div>

            <div aria-live="polite" className="rounded-xl border border-cyan-500/30 bg-slate-950/85 p-4 text-xs sm:text-sm space-y-1.5">
              <p className="font-bold text-cyan-300">{activeDomain.name} Assessment</p>
              <p className="text-slate-200"><strong>CHECK:</strong> {activeDomain.check}</p>
              <p className="text-rose-200"><strong>RISK:</strong> {activeDomain.risk}</p>
              <p className="text-amber-200"><strong>EXAMPLE:</strong> {activeDomain.example}</p>
              <p className="text-emerald-200"><strong>RECOMMENDATION:</strong> {activeDomain.recommendation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 24. Final Beginner Cloud Security Checklist */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
          <h2 className="text-lg font-bold text-white">Final Beginner Cloud Security Checklist</h2>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {FINAL_CHECKLIST.map((item, idx) => {
            const checked = Boolean(checklist[idx]);
            return (
              <label
                key={item}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 text-xs sm:text-sm ${
                  checked
                    ? 'border-emerald-400/60 bg-emerald-950/30 text-emerald-100'
                    : 'border-slate-700/70 bg-slate-900/60 text-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecklist((p) => ({ ...p, [idx]: !p[idx] }))}
                  className="h-4 w-4 accent-emerald-400"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </section>

      <ConceptCard
        title="Security Assessment Recap"
        whatIsIt="Checking Identity, Access, Storage, Secrets, Logging, Monitoring, Alerts, Configuration, and Incident Response."
        whyItMatters="Regular checkups catch small mistakes before they become big incidents."
        simpleExample="Raising your simulated Security Score from 40% to 100% by fixing Storage and Secrets."
        analogy="A pilot's pre-flight safety checklist before takeoff."
      />

      <QuickCheck
        id="m10-q1"
        question="Which of these improves your Cloud Security Score?"
        options={[
          'Protecting secrets in a Secret Manager and making private storage Private',
          'Disabling all logs',
          'Keeping old employee Admin accounts active',
          'Hardcoding passwords in frontend code',
        ]}
        correctIndex={0}
        explanation="Protecting secrets and locking down private storage directly strengthen your security posture."
      />
    </div>
  );
}
