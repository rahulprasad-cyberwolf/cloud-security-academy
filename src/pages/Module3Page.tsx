import { Activity, AlertTriangle, CheckCircle2, Cpu, HardDrive, Network, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { DiscussionPrompt } from '../components/DiscussionPrompt';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

type ChartMetric = 'cpu' | 'memory' | 'network' | 'logins' | 'errors' | 'storage' | 'security';

const METRICS: Record<
  ChartMetric,
  { label: string; current: string; status: string; points: number[]; color: string; note: string }
> = {
  cpu: { label: 'CPU', current: '42%', status: 'Healthy', points: [28, 34, 31, 45, 39, 42, 38], color: '#22d3ee', note: 'Shows how hard the cloud server processor is working.' },
  memory: { label: 'Memory', current: '58%', status: 'Healthy', points: [52, 54, 55, 57, 56, 59, 58], color: '#34d399', note: 'Shows how much RAM running apps are using.' },
  network: { label: 'Network', current: '18 MB/s', status: 'Normal', points: [12, 15, 14, 19, 17, 18, 16], color: '#38bdf8', note: 'Monitors data flowing in and out of your cloud network.' },
  logins: { label: 'Login Attempts', current: '24/hr', status: 'Spike at 2 AM', points: [4, 6, 5, 3, 24, 8, 6], color: '#fb7185', note: 'A sudden spike at 2 AM may mean someone is guessing passwords!' },
  errors: { label: 'Errors', current: '2/min', status: 'Low', points: [1, 0, 2, 1, 3, 2, 2], color: '#fbbf24', note: 'Tracks failed requests so teams can fix bugs fast.' },
  storage: { label: 'Storage', current: '64%', status: 'Healthy', points: [55, 57, 58, 60, 61, 63, 64], color: '#a78bfa', note: 'Watches how much disk space your files are using.' },
  security: { label: 'Security Events', current: '3 Alerts', status: 'Needs Review', points: [0, 1, 0, 0, 3, 2, 1], color: '#fb7185', note: 'Counts blocked logins, permission changes, and policy warnings.' },
};

export function Module3Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [selectedMetric, setSelectedMetric] = useState<ChartMetric>('logins');
  const [sceneGuess, setSceneGuess] = useState<'normal' | 'suspicious' | null>(null);
  const metric = METRICS[selectedMetric];
  const isTeacher = progress.mode === 'teacher';

  const handleSceneGuess = (pick: 'normal' | 'suspicious') => {
    setSceneGuess(pick);
    if (pick === 'suspicious') {
      recordChallengeSuccess('m3-scene-pick', 15);
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Section 3: Monitoring & Normal vs Suspicious (15 Minutes)
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong className="text-emerald-300">LOGGING = RECORD</strong> (CCTV camera) •{' '}
          <strong className="text-amber-300">MONITORING = WATCH</strong> (Security guard) •{' '}
          <strong className="text-rose-300">ALERT = NOTIFY</strong> (Alarm).
        </p>

        {/* EVENT -> LOG -> MONITOR -> RULE -> ALERT SVG */}
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Data flow: Event to Log to Monitor to Rule to Alert"
            viewBox="0 0 760 120"
            className="h-auto w-full"
          >
            {[
              { label: 'EVENT', sub: 'User action', color: '#38bdf8' },
              { label: 'LOG', sub: 'Camera records', color: '#34d399' },
              { label: 'MONITOR', sub: 'Guard watches', color: '#fbbf24' },
              { label: 'RULE', sub: '5 fails = risk', color: '#a78bfa' },
              { label: 'ALERT', sub: 'Alarm rings', color: '#fb7185' },
            ].map((node, i) => {
              const x = 14 + i * 150;
              return (
                <g key={node.label}>
                  <rect x={x} y={20} width="120" height="76" rx="12" fill="#0f172a" stroke={node.color} strokeWidth="2" />
                  <text x={x + 60} y={50} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{node.label}</text>
                  <text x={x + 60} y={70} textAnchor="middle" fill={node.color} fontSize="10">{node.sub}</text>
                  {i < 4 && (
                    <line x1={x + 120} y1={58} x2={x + 150} y2={58} stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </header>

      {/* Monitoring Dashboard */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">Simulated Cloud Monitoring Dashboard</h2>
            <p className="text-sm text-slate-400">Click any metric to inspect its animated graph.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(METRICS) as ChartMetric[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setSelectedMetric(k)}
                aria-pressed={selectedMetric === k}
                className={`min-h-[36px] rounded-xl border px-3 py-1 text-xs font-semibold ${
                  selectedMetric === k
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                {METRICS[k].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid items-center gap-6 rounded-2xl border border-slate-800 bg-slate-950/85 p-5 md:grid-cols-12">
          <div className="md:col-span-7">
            <svg role="img" aria-label={`${metric.label} chart`} viewBox="0 0 420 165" className="h-auto w-full">
              {metric.points.map((val, idx) => {
                const maxVal = Math.max(...metric.points, 1);
                const barH = Math.max(12, Math.round((val / maxVal) * 100));
                const x = 34 + idx * 52;
                const y = 132 - barH;
                return (
                  <g key={idx}>
                    <rect x={x} y={y} width="30" height={barH} rx="6" fill={metric.color} opacity="0.85" />
                    <text x={x + 15} y={152} textAnchor="middle" fill="#94a3b8" fontSize="10">T-{6 - idx}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div aria-live="polite" className="space-y-3 md:col-span-5">
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-xs text-slate-400 uppercase">{metric.label}</p>
              <p className="mt-1 text-3xl font-extrabold" style={{ color: metric.color }}>{metric.current}</p>
              <p className="mt-1 text-xs font-semibold text-slate-200">Status: {metric.status}</p>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">{metric.note}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {[
            { icon: Cpu, label: 'CPU' },
            { icon: Activity, label: 'Memory' },
            { icon: Network, label: 'Network' },
            { icon: ShieldAlert, label: 'Logins' },
            { icon: AlertTriangle, label: 'Errors' },
            { icon: HardDrive, label: 'Storage' },
            { icon: CheckCircle2, label: 'Security' },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs font-medium text-slate-200">
                <Icon className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                <span>{m.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two Interactive SVG Scenes: Normal vs Suspicious */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          Normal vs Suspicious: Which One Needs Investigation?
        </h2>
        <p className="mb-4 text-sm text-slate-400">Click the scene that needs investigation.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSceneGuess('normal')}
            aria-pressed={sceneGuess === 'normal'}
            className={`rounded-2xl border p-5 text-left transition-all ${
              sceneGuess === 'normal'
                ? 'border-amber-400 bg-amber-950/25'
                : 'border-emerald-400/35 bg-slate-900/70 hover:border-emerald-400'
            }`}
          >
            <p className="text-sm font-bold text-emerald-300">Scene A — 9:30 AM</p>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate-200">
              <li>• Known user (rahul@example.com)</li>
              <li>• Known location (Chennai)</li>
              <li>• Normal file access</li>
            </ul>
          </button>

          <button
            type="button"
            onClick={() => handleSceneGuess('suspicious')}
            aria-pressed={sceneGuess === 'suspicious'}
            className={`rounded-2xl border p-5 text-left transition-all ${
              sceneGuess === 'suspicious' || isTeacher
                ? 'border-rose-400 bg-rose-950/30'
                : 'border-rose-400/35 bg-slate-900/70 hover:border-rose-400'
            }`}
          >
            <p className="text-sm font-bold text-rose-300">Scene B — 2:13 AM</p>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate-200">
              <li>• Unknown location</li>
              <li>• 5 failed logins before success</li>
              <li>• Permission changed to Admin</li>
            </ul>
          </button>
        </div>

        <div aria-live="polite" className="mt-3">
          {(sceneGuess !== null || isTeacher) && (
            <p className="rounded-xl border border-cyan-400/35 bg-slate-950/85 p-3.5 text-sm text-slate-100">
              <strong className="text-rose-300">Answer: Scene B!</strong> 2:13 AM + Unknown location
              + 5 failed logins + Permission changed needs immediate investigation (+15 pts).
            </p>
          )}
        </div>
      </section>

      <ConceptCard
        title="Monitoring = Watching Continuously"
        whatIsIt="Monitoring watches logs and system graphs in real time so nothing slips past."
        whyItMatters="Catches login spikes, errors, and suspicious activity right away."
        simpleExample="Login graph spikes to 24 attempts at 2 AM."
        analogy="Security guard watching CCTV screens."
      />

      <DiscussionPrompt
        question="Is every alert an attack?"
        expectedAnswer="No! An alert means 'something needs attention.' Sometimes a teammate logged in while traveling—investigating confirms whether it is safe or risky."
      />

      <QuickCheck
        id="m3-q1"
        question="True or False: A monitoring system can help detect unusual activity."
        options={['True', 'False']}
        correctIndex={0}
        explanation="True! Monitoring spots unusual spikes, late-night logins, and errors."
      />
    </div>
  );
}
