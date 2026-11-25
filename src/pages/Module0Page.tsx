import { AlertTriangle, Building2, Cloud, Server, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { DiscussionPrompt } from '../components/DiscussionPrompt';
import { QuickCheck } from '../components/QuickCheck';
import { CloudPartSvg } from '../components/SvgIcons';
import { useCourse } from '../context/CourseContext';

interface CloudComponent {
  id: 'compute' | 'storage' | 'database' | 'application';
  label: string;
  explanation: string;
  example: string;
}

const CLOUD_COMPONENTS: CloudComponent[] = [
  { id: 'compute', label: 'COMPUTE', explanation: 'Runs applications and processes.', example: 'Like the engine of a car running your website code.' },
  { id: 'storage', label: 'STORAGE', explanation: 'Stores files and objects.', example: 'Saving photos, PDFs, assignments, and backups.' },
  { id: 'database', label: 'DATABASE', explanation: 'Stores application data.', example: 'A neat table of student names, emails, and quiz scores.' },
  { id: 'application', label: 'APPLICATION', explanation: 'Software users interact with.', example: 'Your college portal, email app, or video streaming site.' },
];

const SECURITY_LAYERS = [
  { id: 'user', label: 'USER', desc: 'A person (like Rahul) opening their laptop or phone.' },
  { id: 'identity', label: 'IDENTITY', desc: 'Your digital profile (e.g., rahul@example.com).' },
  { id: 'authn', label: 'AUTHENTICATION', desc: '“Are you really Rahul?” — Checking your password & 2FA.' },
  { id: 'authz', label: 'AUTHORIZATION', desc: '“What is Rahul allowed to access?” — Checking your permissions.' },
  { id: 'resource', label: 'CLOUD RESOURCE', desc: 'The server, folder, or app you asked to open.' },
  { id: 'data', label: 'DATA', desc: 'The actual files, grades, or records safely stored inside.' },
];

export function Module0Page() {
  const { recordChallengeSuccess } = useCourse();
  const [selectedPart, setSelectedPart] = useState<CloudComponent>(CLOUD_COMPONENTS[0]);
  const [compareSide, setCompareSide] = useState<'local' | 'cloud'>('cloud');
  const [houseMode, setHouseMode] = useState<'secure' | 'unsecured'>('secure');
  const [selectedLayer, setSelectedLayer] = useState(SECURITY_LAYERS[2]);
  const [aptPart, setAptPart] = useState<'provider' | 'customer'>('customer');

  const handleSelectCloudPart = (comp: CloudComponent) => {
    setSelectedPart(comp);
    recordChallengeSuccess(`m0-part-${comp.id}`, 5);
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Section 1: Cloud Security Basics (15 Minutes)
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Let’s start from zero: <strong className="text-cyan-300">MY COMPUTER</strong> = one
          computer at home. <strong className="text-emerald-300">CLOUD</strong> = a large collection
          of computers managed by a provider over the internet.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4">
            <CloudPartSvg part="server" />
            <h2 className="mt-2 text-sm font-bold text-white">What is a Server?</h2>
            <p className="mt-1 text-xs text-slate-300">A powerful computer that stays on 24/7 to serve apps and files.</p>
          </div>
          <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4">
            <CloudPartSvg part="datacenter" />
            <h2 className="mt-2 text-sm font-bold text-white">What is a Data Center?</h2>
            <p className="mt-1 text-xs text-slate-300">A giant, secure building filled with thousands of servers.</p>
          </div>
          <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4">
            <Cloud className="mb-2 h-10 w-10 text-cyan-300" aria-hidden="true" />
            <h2 className="text-sm font-bold text-white">Why Use Cloud?</h2>
            <p className="mt-1 text-xs text-slate-300">Fast to start, works anywhere, and grows when more users join.</p>
          </div>
          <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4">
            <Server className="mb-2 h-10 w-10 text-emerald-300" aria-hidden="true" />
            <h2 className="text-sm font-bold text-white">Where Does Data Live?</h2>
            <p className="mt-1 text-xs text-slate-300">On real physical hard drives inside a provider’s data center.</p>
          </div>
        </div>
      </header>

      {/* SVG 1: Cloud Anatomy + Interactive 4 Components */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          SVG 1 — Cloud Anatomy (Click Any Cloud Component)
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Laptop & Mobile connect through the Internet and Firewall into the Cloud.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Cloud anatomy: User laptop and mobile phone connect through Internet and Firewall to Cloud Compute, Storage, Database, and Application"
            viewBox="0 0 760 220"
            className="h-auto w-full"
          >
            {/* Devices */}
            <rect x="14" y="34" width="110" height="60" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <text x="69" y="62" textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="700">💻 Laptop</text>
            <text x="69" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9.5">User</text>

            <rect x="14" y="122" width="110" height="60" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <text x="69" y="150" textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="700">📱 Mobile</text>
            <text x="69" y="166" textAnchor="middle" fill="#94a3b8" fontSize="9.5">User</text>

            <line x1="124" y1="64" x2="178" y2="104" stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />
            <line x1="124" y1="152" x2="178" y2="112" stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />

            {/* Internet */}
            <rect x="178" y="76" width="102" height="64" rx="12" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
            <text x="229" y="106" textAnchor="middle" fill="#22d3ee" fontSize="11.5" fontWeight="700">INTERNET</text>
            <text x="229" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Data in transit</text>

            <line x1="280" y1="108" x2="314" y2="108" stroke="#fbbf24" strokeWidth="2.5" className="animate-flow" />

            {/* Firewall */}
            <rect x="314" y="76" width="94" height="64" rx="12" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
            <text x="361" y="105" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">FIREWALL</text>
            <text x="361" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Traffic gate</text>

            <line x1="408" y1="108" x2="442" y2="108" stroke="#34d399" strokeWidth="2.5" className="animate-flow" />

            {/* Cloud Box */}
            <rect x="442" y="18" width="304" height="184" rx="18" fill="rgba(16,185,129,0.07)" stroke="#34d399" strokeWidth="2" />
            <text x="462" y="42" fill="#6ee7b7" fontSize="12" fontWeight="700">CLOUD (Servers & Services)</text>

            {CLOUD_COMPONENTS.map((comp, idx) => {
              const y = 54 + idx * 34;
              const active = selectedPart.id === comp.id;
              return (
                <g key={comp.id} transform={`translate(460, ${y})`}>
                  <rect
                    width="268"
                    height="27"
                    rx="7"
                    fill={active ? 'rgba(34,211,238,0.22)' : '#0f172a'}
                    stroke={active ? '#22d3ee' : '#334155'}
                    strokeWidth={active ? '2' : '1'}
                  />
                  <text x="12" y="18" fill="#fff" fontSize="11" fontWeight="700">{comp.label}</text>
                  <text x="108" y="18" fill="#94a3b8" fontSize="10">{comp.explanation}</text>
                </g>
              );
            })}
          </svg>

          <div className="mt-3 flex flex-wrap gap-2">
            {CLOUD_COMPONENTS.map((comp) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => handleSelectCloudPart(comp)}
                aria-pressed={selectedPart.id === comp.id}
                className={`min-h-[40px] rounded-xl border px-3.5 py-1.5 text-xs font-bold ${
                  selectedPart.id === comp.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                {comp.label}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-3 rounded-xl border border-cyan-500/30 bg-slate-900/90 p-3.5 text-sm">
            <strong className="text-cyan-300">{selectedPart.label}:</strong>{' '}
            <span className="text-white">{selectedPart.explanation}</span>{' '}
            <span className="text-slate-300">({selectedPart.example})</span>
          </div>
        </div>
      </section>

      {/* SVG 2: Cloud vs Local Computer */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">
          SVG 2 — My Computer vs Cloud (Click Either Side)
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setCompareSide('local')}
            aria-pressed={compareSide === 'local'}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              compareSide === 'local' ? 'border-amber-400 bg-amber-950/25' : 'border-slate-700 bg-slate-900/60'
            }`}
          >
            <p className="text-base font-bold text-amber-300">💻 My Computer (Local)</p>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate-200">
              <li>• One laptop at home</li>
              <li>• Local files & local storage</li>
              <li>• Limited CPU & memory</li>
            </ul>
          </button>

          <button
            type="button"
            onClick={() => setCompareSide('cloud')}
            aria-pressed={compareSide === 'cloud'}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              compareSide === 'cloud' ? 'border-emerald-400 bg-emerald-950/25' : 'border-slate-700 bg-slate-900/60'
            }`}
          >
            <p className="text-base font-bold text-emerald-300">☁️ Cloud (Provider)</p>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate-200">
              <li>• Many connected servers</li>
              <li>• Remote access from anywhere</li>
              <li>• Scalable storage via internet</li>
            </ul>
          </button>
        </div>
      </section>

      {/* Part 2: Secure House vs Unsecured House */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">Why Cloud Security? (House Analogy)</h2>
            <p className="text-sm text-slate-400">“If the door is open, anyone may enter.”</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setHouseMode('secure')}
              aria-pressed={houseMode === 'secure'}
              className={`min-h-[38px] rounded-xl border px-3.5 py-1.5 text-xs font-bold ${
                houseMode === 'secure' ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200' : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              🛡️ SECURE HOUSE
            </button>
            <button
              type="button"
              onClick={() => setHouseMode('unsecured')}
              aria-pressed={houseMode === 'unsecured'}
              className={`min-h-[38px] rounded-xl border px-3.5 py-1.5 text-xs font-bold ${
                houseMode === 'unsecured' ? 'border-rose-400 bg-rose-500/20 text-rose-200' : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              🚨 UNSECURED HOUSE
            </button>
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/85 p-4 sm:grid-cols-5">
          {[
            { house: 'Door', cloud: 'Authentication' },
            { house: 'Lock', cloud: 'Access Control' },
            { house: 'Keys', cloud: 'Secrets' },
            { house: 'CCTV', cloud: 'Monitoring & Logs' },
            { house: 'Guest List', cloud: 'Audit Logs' },
          ].map((pair) => (
            <div key={pair.house} className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-center">
              <p className="text-xs font-bold text-amber-300">🏠 {pair.house}</p>
              <p className="my-1 text-xs text-slate-500">=</p>
              <p className="text-xs font-bold text-cyan-300">☁️ {pair.cloud}</p>
            </div>
          ))}
        </div>

        <div aria-live="polite" className="mt-3 flex items-center gap-2 text-sm">
          {houseMode === 'secure' ? (
            <>
              <ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" />
              <span className="text-emerald-200">
                <strong>SECURE HOUSE 🛡️:</strong> Door locked, keys safe, CCTV recording, and guest
                list checked—your cloud data stays safe!
              </span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 text-rose-400" aria-hidden="true" />
              <span className="text-rose-200">
                <strong>UNSECURED HOUSE 🚨:</strong> Door left unlocked, keys under the mat, no
                CCTV—anyone can walk in and take data!
              </span>
            </>
          )}
        </div>
      </section>

      {/* Part 3: 6-Layer Basic Cloud Security SVG */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">
          Basic Cloud Security Layers (Click Each Layer)
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {SECURITY_LAYERS.map((layer, idx) => (
            <div key={layer.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedLayer(layer)}
                aria-pressed={selectedLayer.id === layer.id}
                className={`min-h-[40px] rounded-xl border px-3 py-1.5 text-xs font-bold ${
                  selectedLayer.id === layer.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                {layer.label}
              </button>
              {idx < SECURITY_LAYERS.length - 1 && <span className="text-slate-600" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
        <div aria-live="polite" className="mt-3 rounded-xl border border-cyan-500/30 bg-slate-950/85 p-3.5 text-sm">
          <strong className="text-cyan-300">{selectedLayer.label}:</strong>{' '}
          <span className="text-white">{selectedLayer.desc}</span>
        </div>
      </section>

      {/* Part 4: Shared Responsibility Apartment Building */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">Shared Responsibility (Apartment Building)</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAptPart('provider')}
              aria-pressed={aptPart === 'provider'}
              className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-bold ${
                aptPart === 'provider' ? 'border-sky-400 bg-sky-500/20 text-sky-200' : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              Cloud Provider
            </button>
            <button
              type="button"
              onClick={() => setAptPart('customer')}
              aria-pressed={aptPart === 'customer'}
              className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-bold ${
                aptPart === 'customer' ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200' : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              Customer (You)
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div className={`rounded-xl border p-4 ${aptPart === 'provider' ? 'border-sky-400 bg-sky-950/30' : 'border-slate-800 bg-slate-900/60'}`}>
            <p className="font-bold text-sky-300">🏢 Cloud Provider</p>
            <p className="mt-1 text-xs text-slate-300">Building, Electricity, Main Infrastructure</p>
          </div>
          <div className={`rounded-xl border p-4 ${aptPart === 'customer' ? 'border-emerald-400 bg-emerald-950/30' : 'border-slate-800 bg-slate-900/60'}`}>
            <p className="font-bold text-emerald-300">🔑 Customer (You)</p>
            <p className="mt-1 text-xs text-slate-300">Room Lock, Personal Belongings, Who Gets the Key</p>
          </div>
        </div>
      </section>

      <ConceptCard
        title="Cloud Basics Recap"
        whatIsIt="The cloud is a shared pool of servers, storage, and apps accessed over the internet."
        whyItMatters="Both the provider and the customer must do their part to keep data safe."
        simpleExample="You lock your account with a strong password; the provider guards the data center."
        analogy="Renting an apartment: landlord maintains the building; you lock your own room."
      />

      <DiscussionPrompt
        question="What happens if someone gets your password?"
        expectedAnswer="They can log in pretending to be you, read your private data, or change your cloud settings—just like someone copying your house key."
      />

      <QuickCheck
        id="m0-q1"
        question="Which cloud component runs applications and processes?"
        options={['Compute', 'Storage', 'Database', 'Door']}
        correctIndex={0}
        explanation="Compute provides the processing power to run applications."
      />
    </div>
  );
}
