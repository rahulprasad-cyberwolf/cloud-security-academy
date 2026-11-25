import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';
import { CheckCircle2 } from 'lucide-react';

const FLOW_LAYERS = [
  { id: 'user', label: 'USER', desc: 'A student, developer, or visitor trying to use a cloud app.' },
  { id: 'identity', label: 'IDENTITY', desc: 'The user’s digital account (like rahul@example.com).' },
  { id: 'access', label: 'ACCESS CONTROL', desc: 'Checks who you are and what you are allowed to touch.' },
  { id: 'resource', label: 'CLOUD RESOURCE', desc: 'The application, storage folder, or database you want to open.' },
  { id: 'data', label: 'DATA', desc: 'The actual files, student records, or customer information inside.' },
  { id: 'monitoring', label: 'MONITORING', desc: 'Watches activity continuously to spot anything unusual.' },
  { id: 'security', label: 'SECURITY', desc: 'All protections working together so the right people get the right access.' },
];

const SECURITY_MINDSET = [
  { step: 'IDENTIFY', title: '1. IDENTIFY', desc: 'Know all your cloud users, databases, files, and secrets.', icon: '🔍', color: '#38bdf8' },
  { step: 'PROTECT', title: '2. PROTECT', desc: 'Lock doors with strong passwords, MFA, and Least Privilege.', icon: '🛡️', color: '#34d399' },
  { step: 'DETECT', title: '3. DETECT', desc: 'Watch logs and alerts continuously for unusual activity.', icon: '👁️', color: '#fbbf24' },
  { step: 'RESPOND', title: '4. RESPOND', desc: 'Contain suspicious accounts and stop dangerous access fast.', icon: '🚨', color: '#fb7185' },
  { step: 'RECOVER', title: '5. RECOVER', desc: 'Fix misconfigurations, rotate keys, and restore safe operations.', icon: '🔄', color: '#a78bfa' },
];

interface ProtectionCard {
  id: string;
  name: string;
  desc: string;
  requiresProtection: boolean;
  explanation: string;
}

const PROTECTION_CARDS: ProtectionCard[] = [
  { id: 'account', name: 'User Account', desc: 'Login profiles for employees, devs, and students', requiresProtection: true, explanation: 'Compromised accounts allow attackers to pose as valid users.' },
  { id: 'database', name: 'Database', desc: 'Customer data, financial records, student grades', requiresProtection: true, explanation: 'Contains sensitive private records that need encryption and strict access.' },
  { id: 'storage', name: 'Storage Bucket', desc: 'Cloud storage folders with invoices and backups', requiresProtection: true, explanation: 'Must remain Private 🔒 so unauthorized internet visitors cannot download files.' },
  { id: 'api', name: 'API Endpoints', desc: 'Interfaces connecting mobile apps to backend services', requiresProtection: true, explanation: 'Unprotected APIs can be abused to extract massive amounts of data.' },
  { id: 'password', name: 'Passwords', desc: 'User credentials used during authentication', requiresProtection: true, explanation: 'Must be strong, hashed, salted, and backed with MFA.' },
  { id: 'secret', name: 'Secret Keys / Tokens', desc: 'API keys, database passwords, private tokens', requiresProtection: true, explanation: 'Whoever holds a secret holds the master key to your cloud resources.' },
  { id: 'logs', name: 'Audit Logs', desc: 'Activity records of who did what and when', requiresProtection: true, explanation: 'Logs must be tamper-proof and protected so attackers cannot delete their trail.' },
];

export function Module0Page() {
  const { recordChallengeSuccess } = useCourse();
  const [selectedLayer, setSelectedLayer] = useState(FLOW_LAYERS[0]);
  const [selectedMindset, setSelectedMindset] = useState(SECURITY_MINDSET[0]);
  const [decisions, setDecisions] = useState<Record<string, boolean>>({});

  const handleDecision = (id: string, userChoiceNeedsProtection: boolean) => {
    setDecisions((prev) => ({ ...prev, [id]: userChoiceNeedsProtection }));
    if (Object.keys({ ...decisions, [id]: userChoiceNeedsProtection }).length === PROTECTION_CARDS.length) {
      recordChallengeSuccess('m0-protection-cards', 25, 'lab-choose-protection');
    }
  };

  const answeredCount = Object.keys(decisions).length;

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Security — Introduction
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong className="text-cyan-300">
            “Cloud security is about making sure the right people get the right access to the right
            resources, while suspicious activity is detected and investigated.”
          </strong>
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {[
            'Identity',
            'Access',
            'Data',
            'Cloud Resources',
            'Secrets',
            'Configurations',
            'Logs',
            'Applications',
            'APIs',
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-200"
            >
              Protects: {tag}
            </span>
          ))}
        </div>
      </header>

      {/* What Changes When Moving to Cloud */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">What Changes in Cloud Security?</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-500/30 bg-slate-900/70 p-4">
            <p className="font-bold text-cyan-300 text-sm">Everywhere Access</p>
            <p className="mt-1 text-xs text-slate-300">Resources are accessible over the internet from any device, not just an office desk.</p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-slate-900/70 p-4">
            <p className="font-bold text-amber-300 text-sm">Identity is the New Perimeter</p>
            <p className="mt-1 text-xs text-slate-300">Instead of office walls and physical gates, digital identity and permissions guard everything.</p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-slate-900/70 p-4">
            <p className="font-bold text-emerald-300 text-sm">Rapid Software Changes</p>
            <p className="mt-1 text-xs text-slate-300">Resources spin up and change in seconds, making automated monitoring and audit logs vital.</p>
          </div>
        </div>
      </section>

      {/* Large Clickable SVG: USER -> IDENTITY -> ACCESS CONTROL -> CLOUD RESOURCE -> DATA -> MONITORING -> SECURITY */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          How Cloud Security Works (Click Every Component)
        </h2>
        <p className="mt-1 text-xs text-slate-400">Click any block to see how requests flow securely through each protective layer.</p>
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Cloud Security flow: User to Identity to Access Control to Cloud Resource to Data to Monitoring to Security"
            viewBox="0 0 840 120"
            className="h-auto w-full"
          >
            {FLOW_LAYERS.map((layer, idx) => {
              const x = 8 + idx * 120;
              const active = selectedLayer.id === layer.id;
              return (
                <g key={layer.id} className="cursor-pointer" onClick={() => setSelectedLayer(layer)}>
                  <rect
                    x={x}
                    y={24}
                    width="102"
                    height="68"
                    rx="10"
                    fill={active ? 'rgba(34,211,238,0.2)' : '#0f172a'}
                    stroke={active ? '#22d3ee' : '#334155'}
                    strokeWidth={active ? '2.5' : '1.5'}
                  />
                  <text x={x + 51} y={62} textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="700">
                    {layer.label}
                  </text>
                  {idx < FLOW_LAYERS.length - 1 && (
                    <line
                      x1={x + 102}
                      y1={58}
                      x2={x + 120}
                      y2={58}
                      stroke="#22d3ee"
                      strokeWidth="2.5"
                      className="animate-flow"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="mt-3 flex flex-wrap gap-2">
            {FLOW_LAYERS.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setSelectedLayer(layer)}
                aria-pressed={selectedLayer.id === layer.id}
                className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-semibold ${
                  selectedLayer.id === layer.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="mt-3 text-sm text-cyan-200">
            <strong>{selectedLayer.label}:</strong> {selectedLayer.desc}
          </p>
        </div>
      </section>

      {/* Security Mindset: IDENTIFY -> PROTECT -> DETECT -> RESPOND -> RECOVER */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">The 5 Core Cloud Security Mindset Steps</h2>
        <p className="mt-1 text-xs text-slate-400">Click each step to understand the complete security cycle.</p>
        
        <div className="mt-4 grid gap-2 sm:grid-cols-5">
          {SECURITY_MINDSET.map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setSelectedMindset(s)}
              className={`rounded-xl border p-3 text-left transition-all ${
                selectedMindset.step === s.step ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400' : 'border-slate-700/70 bg-slate-900/60'
              }`}
            >
              <span className="text-xl">{s.icon}</span>
              <p className="mt-1 text-xs font-bold text-white">{s.title}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-cyan-400/30 bg-slate-950/90 p-4">
          <p className="text-base font-bold text-white">{selectedMindset.title}</p>
          <p className="mt-1 text-sm text-slate-200">{selectedMindset.desc}</p>
        </div>
      </section>

      {/* Fictional Scenario */}
      <section className="glass-card rounded-2xl border border-rose-500/30 p-6">
        <h2 className="text-lg font-bold text-rose-300">Fictional Real-World Attack Scenario</h2>
        <div className="mt-3 rounded-xl bg-slate-950/80 p-4 text-xs sm:text-sm text-slate-200 space-y-2">
          <p>🏢 <strong>Scenario:</strong> A company hosts its student portal and database in the cloud.</p>
          <p>⚠️ <strong>The Threat:</strong> An employee account password is leaked on the dark web. An attacker uses it to sign into the cloud at 02:14 AM from another country.</p>
          <p>🛡️ <strong>How Cloud Security Works:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>PROTECT (MFA):</strong> An OTP code is required, stopping the attacker even if they know the password.</li>
            <li><strong>DETECT (Logging & Alerting):</strong> If MFA was missing, the abnormal login time and location instantly trigger a <em>CRITICAL ALERT</em>.</li>
            <li><strong>RESPOND (Containment):</strong> Security analysts immediately revoke the session and lock the account.</li>
            <li><strong>RECOVER:</strong> The employee changes credentials, MFA is enforced, and audit logs are analyzed to ensure no data was touched.</li>
          </ul>
        </div>
      </section>

      {/* Interactive Activity: Choose what needs protection */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">Interactive Activity: Choose What Needs Protection</h2>
            <p className="text-xs text-slate-400">Does each component require security protection in the cloud? Make your choice for each item.</p>
          </div>
          <span className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
            Completed: {answeredCount} / {PROTECTION_CARDS.length}
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROTECTION_CARDS.map((card) => {
            const hasChosen = decisions[card.id] !== undefined;
            const userChoice = decisions[card.id];
            const isCorrect = userChoice === card.requiresProtection;
            return (
              <div
                key={card.id}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-all ${
                  hasChosen
                    ? isCorrect
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : 'border-rose-500/50 bg-rose-950/20'
                    : 'border-slate-700 bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-white">{card.name}</p>
                    {hasChosen && (
                      <span className="text-xs font-bold text-emerald-400">
                        {isCorrect ? '✅ Requires Protection' : '⚠️ Must be protected!'}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-300">{card.desc}</p>
                  {hasChosen && (
                    <p className="mt-2 text-[11px] text-cyan-200 border-t border-slate-800 pt-2">
                      💡 {card.explanation}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecision(card.id, true)}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                      userChoice === true
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-slate-700 bg-slate-800 text-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    🛡️ Needs Protection
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecision(card.id, false)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                      userChoice === false
                        ? 'bg-rose-500 text-white'
                        : 'border border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {answeredCount === PROTECTION_CARDS.length && (
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            Great job! You identified that ALL these core cloud components require security protection. (+25 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Cloud Security"
        whatIsIt="Securing accounts, applications, data, secrets, and configurations running in cloud environments."
        whyItMatters="Without security, cloud resources can be accessed, altered, or leaked publicly on the internet."
        simpleExample="Enforcing MFA and setting sensitive storage folders to Private 🔒 instead of Public 🔓."
        analogy="A high-tech building where keycards, biometric locks, CCTV, and guards work in tandem."
      />

      <QuickCheck
        id="m0-q1"
        question="Which statement best describes the goal of Cloud Security?"
        options={[
          'Ensuring the right people have the right access to the right resources, while detecting suspicious activity',
          'Turning off audit logs to save storage space',
          'Giving every student full administrator permissions to everything',
        ]}
        correctIndex={0}
        explanation="Cloud security balances enabling legitimate access with strict access control and real-time threat detection."
      />
    </div>
  );
}
