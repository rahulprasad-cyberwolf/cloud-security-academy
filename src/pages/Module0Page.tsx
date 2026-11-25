import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

const FLOW_LAYERS = [
  { id: 'user', label: 'USER', desc: 'A student, developer, or visitor trying to use a cloud app.' },
  { id: 'identity', label: 'IDENTITY', desc: 'The user’s digital account (like rahul@example.com).' },
  { id: 'access', label: 'ACCESS CONTROL', desc: 'Checks who you are and what you are allowed to touch.' },
  { id: 'resource', label: 'CLOUD RESOURCE', desc: 'The application, storage folder, or database you want to open.' },
  { id: 'data', label: 'DATA', desc: 'The actual files, student records, or customer information inside.' },
  { id: 'monitoring', label: 'MONITORING', desc: 'Watches activity continuously to spot anything unusual.' },
  { id: 'security', label: 'SECURITY', desc: 'All protections working together so the right people get the right access.' },
];

const PROTECTED_ITEMS = [
  {
    id: 'users',
    label: 'Users',
    what: 'Accounts for students, developers, testers, and admins.',
    why: 'If an attacker steals a user account, they can pretend to be that person.',
    wrong: 'Weak passwords or old unused accounts left active.',
  },
  {
    id: 'apps',
    label: 'Applications',
    what: 'Web portals, mobile backends, and tools running in the cloud.',
    why: 'Apps are the front door users interact with every day.',
    wrong: 'Bugs or exposed keys inside app code.',
  },
  {
    id: 'storage',
    label: 'Storage',
    what: 'Cloud folders holding documents, photos, and backups.',
    why: 'Private files belong only to authorized people.',
    wrong: 'Storage accidentally left Public 🔓 for anyone on the internet.',
  },
  {
    id: 'database',
    label: 'Database',
    what: 'Organized tables of usernames, emails, and records.',
    why: 'Contains sensitive personal or company information.',
    wrong: 'Open database access or too many users having Admin rights.',
  },
  {
    id: 'secrets',
    label: 'Secrets',
    what: 'Passwords, API keys, and access tokens.',
    why: 'Whoever holds a secret holds the key to the cloud.',
    wrong: 'Secrets pasted into public GitHub repositories.',
  },
  {
    id: 'configs',
    label: 'Configurations',
    what: 'Security settings and permission rules for cloud resources.',
    why: 'One wrong switch can undo strong protections.',
    wrong: 'Public access turned ON or logging turned OFF.',
  },
  {
    id: 'logs',
    label: 'Logs',
    what: 'Records of who logged in, what they opened, and what changed.',
    why: 'Logs are your proof and timeline during an investigation.',
    wrong: 'Logging disabled so nobody knows what happened.',
  },
];

export function Module0Page() {
  const { recordChallengeSuccess } = useCourse();
  const [selectedLayer, setSelectedLayer] = useState(FLOW_LAYERS[0]);
  const [selectedItem, setSelectedItem] = useState(PROTECTED_ITEMS[0]);

  const handleSelectItem = (item: (typeof PROTECTED_ITEMS)[number]) => {
    setSelectedItem(item);
    recordChallengeSuccess(`m0-protect-${item.id}`, 3);
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          What is Cloud Security?
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong className="text-cyan-300">
            “Cloud security is about making sure the right people get the right access to the right
            resources, while suspicious activity is detected and investigated.”
          </strong>
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {[
            'Cloud Accounts',
            'Cloud Resources',
            'Applications',
            'Data',
            'Access',
            'Credentials',
            'Configurations',
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

      {/* Large Clickable SVG: USER -> IDENTITY -> ACCESS CONTROL -> CLOUD RESOURCE -> DATA -> MONITORING -> SECURITY */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          How Cloud Security Works (Click Every Component)
        </h2>
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
                <g key={layer.id}>
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
                className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-bold ${
                  selectedLayer.id === layer.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-3 rounded-xl border border-cyan-500/30 bg-slate-900/90 p-3.5 text-sm">
            <strong className="text-cyan-300">{selectedLayer.label}:</strong>{' '}
            <span className="text-white">{selectedLayer.desc}</span>
          </div>
        </div>
      </section>

      {/* What Are We Protecting? Interactive Connected Cloud Environment */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          What Are We Protecting? (Click Any Resource)
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          All 7 resources below are connected inside a cloud environment. Click each one to see why
          it needs protection.
        </p>

        <div className="grid items-center gap-6 rounded-2xl border border-slate-800 bg-slate-950/85 p-5 md:grid-cols-12">
          <div className="md:col-span-6">
            <svg
              role="img"
              aria-label="Connected cloud resources: Users, Applications, Storage, Database, Secrets, Configurations, and Logs"
              viewBox="0 0 360 220"
              className="h-auto w-full"
            >
              <circle cx="180" cy="110" r="36" fill="rgba(16,185,129,0.16)" stroke="#34d399" strokeWidth="2.5" />
              <text x="180" y="108" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">CLOUD</text>
              <text x="180" y="121" textAnchor="middle" fill="#6ee7b7" fontSize="9.5" fontWeight="700">SECURITY</text>

              {PROTECTED_ITEMS.map((item, idx) => {
                const angle = (idx / PROTECTED_ITEMS.length) * Math.PI * 2 - Math.PI / 2;
                const cx = 180 + Math.cos(angle) * 112;
                const cy = 110 + Math.sin(angle) * 82;
                const active = selectedItem.id === item.id;
                return (
                  <g key={item.id}>
                    <line x1="180" y1="110" x2={cx} y2={cy} stroke={active ? '#22d3ee' : '#334155'} strokeWidth="1.8" className="animate-flow" />
                    <rect
                      x={cx - 42}
                      y={cy - 14}
                      width="84"
                      height="28"
                      rx="8"
                      fill={active ? '#0891b2' : '#0f172a'}
                      stroke={active ? '#22d3ee' : '#475569'}
                      strokeWidth="1.5"
                    />
                    <text x={cx} y={cy + 4} textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="700">
                      {item.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="space-y-3 md:col-span-6">
            <div className="flex flex-wrap gap-2">
              {PROTECTED_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectItem(item)}
                  aria-pressed={selectedItem.id === item.id}
                  className={`min-h-[36px] rounded-lg border px-3 py-1 text-xs font-semibold ${
                    selectedItem.id === item.id
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                      : 'border-slate-700 bg-slate-900 text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div aria-live="polite" className="space-y-2 rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-xs sm:text-sm">
              <p className="font-bold text-cyan-300">{selectedItem.label}</p>
              <p className="text-slate-200"><strong>What it is:</strong> {selectedItem.what}</p>
              <p className="text-emerald-200"><strong>Why protect it:</strong> {selectedItem.why}</p>
              <p className="text-rose-200"><strong>What could go wrong:</strong> {selectedItem.wrong}</p>
            </div>
          </div>
        </div>
      </section>

      <ConceptCard
        title="Cloud Security in One Picture"
        whatIsIt="Protecting cloud accounts, resources, apps, data, access, credentials, and configurations."
        whyItMatters="Without security controls, anyone could view private data or change settings."
        simpleExample="Checking who a user is, limiting their permissions, and watching logs for 2 AM logins."
        analogy="A well-protected building with an ID desk, locked rooms, key safe, and security cameras."
        questionToAsk="Which cloud resource would hurt most if left unprotected?"
        expectedAnswer="All of them matter—especially Secrets, Databases, and User Accounts, because losing them affects everything else."
        commonConfusion="Thinking Cloud Security only means setting a password."
      />

      <QuickCheck
        id="m0-q1"
        question="Which statement best describes Cloud Security?"
        options={[
          'Making sure the right people get the right access to the right resources while suspicious activity is detected',
          'Giving everyone Full Admin access to save time',
          'Turning off all logs so nothing is recorded',
          'Putting API keys directly into public code',
        ]}
        correctIndex={0}
        explanation="Cloud security combines right access, protected resources, and active detection."
      />
    </div>
  );
}
