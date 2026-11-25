import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

type GraphMetric = 'loginAttempts' | 'failedLogins' | 'securityEvents' | 'networkActivity' | 'alerts';

const GRAPHS: Record<GraphMetric, { label: string; current: string; points: number[]; color: string; meaning: string }> = {
  loginAttempts: { label: 'Login Attempts', current: '28/hr', points: [6, 8, 7, 5, 28, 9, 7], color: '#22d3ee', meaning: 'Shows how many users are trying to sign in. Sudden spikes need a closer look.' },
  failedLogins: { label: 'Failed Logins', current: '5 spikes', points: [0, 1, 0, 5, 1, 0, 1], color: '#fb7185', meaning: 'Tracks wrong passwords. Multiple failures in a row may mean password guessing.' },
  securityEvents: { label: 'Security Events', current: '3 events', points: [1, 0, 1, 3, 2, 1, 1], color: '#fbbf24', meaning: 'Counts important events like permission changes or new admin accounts.' },
  networkActivity: { label: 'Network Activity', current: '22 MB/s', points: [10, 12, 14, 22, 16, 15, 13], color: '#38bdf8', meaning: 'Watches traffic moving in and out of your cloud resources.' },
  alerts: { label: 'Alerts', current: '2 active', points: [0, 0, 1, 2, 1, 0, 1], color: '#a78bfa', meaning: 'Shows how many monitoring rules triggered notifications.' },
};

export function Module3Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [selectedGraph, setSelectedGraph] = useState<GraphMetric>('failedLogins');
  const [pickedScene, setPickedScene] = useState<'normal' | 'suspicious' | null>(null);
  const graph = GRAPHS[selectedGraph];
  const isTeacher = progress.mode === 'teacher';

  const handlePickScene = (pick: 'normal' | 'suspicious') => {
    setPickedScene(pick);
    if (pick === 'suspicious') {
      recordChallengeSuccess('m3-context-scene', 15);
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Logging vs Monitoring vs Alerting
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong className="text-emerald-300">LOGGING = Record what happened (CCTV)</strong> •{' '}
          <strong className="text-amber-300">MONITORING = Watch what is happening (Security Guard)</strong> •{' '}
          <strong className="text-rose-300">ALERTING = Tell us when something needs attention (Alarm)</strong>.
        </p>

        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Animated flow: Event to Log to Monitor to Rule to Alert"
            viewBox="0 0 760 110"
            className="h-auto w-full"
          >
            {[
              { label: 'EVENT', sub: 'Action occurs', color: '#38bdf8' },
              { label: 'LOG', sub: 'CCTV records', color: '#34d399' },
              { label: 'MONITOR', sub: 'Guard watches', color: '#fbbf24' },
              { label: 'RULE', sub: 'Checks pattern', color: '#a78bfa' },
              { label: 'ALERT', sub: 'Alarm notifies', color: '#fb7185' },
            ].map((node, i) => {
              const x = 14 + i * 150;
              return (
                <g key={node.label}>
                  <rect x={x} y={18} width="120" height="72" rx="12" fill="#0f172a" stroke={node.color} strokeWidth="2" />
                  <text x={x + 60} y={48} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{node.label}</text>
                  <text x={x + 60} y={68} textAnchor="middle" fill={node.color} fontSize="10">{node.sub}</text>
                  {i < 4 && (
                    <line x1={x + 120} y1={54} x2={x + 150} y2={54} stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </header>

      {/* Simulated Cloud Security Monitoring Dashboard */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">Cloud Security Monitoring Dashboard</h2>
            <p className="text-sm text-slate-400">Click each graph metric to see what it means.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(GRAPHS) as GraphMetric[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setSelectedGraph(k)}
                aria-pressed={selectedGraph === k}
                className={`min-h-[36px] rounded-xl border px-3 py-1 text-xs font-semibold ${
                  selectedGraph === k ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100' : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                {GRAPHS[k].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid items-center gap-6 rounded-2xl border border-slate-800 bg-slate-950/85 p-5 md:grid-cols-12">
          <div className="md:col-span-7">
            <svg role="img" aria-label={`${graph.label} monitoring graph`} viewBox="0 0 420 160" className="h-auto w-full">
              {graph.points.map((val, idx) => {
                const maxVal = Math.max(...graph.points, 1);
                const barH = Math.max(12, Math.round((val / maxVal) * 100));
                const x = 34 + idx * 52;
                const y = 130 - barH;
                return (
                  <g key={idx}>
                    <rect x={x} y={y} width="30" height={barH} rx="6" fill={graph.color} opacity="0.88" />
                    <text x={x + 15} y={150} textAnchor="middle" fill="#94a3b8" fontSize="10">T-{6 - idx}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div aria-live="polite" className="space-y-3 md:col-span-5">
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-xs text-slate-400 uppercase">{graph.label}</p>
              <p className="mt-1 text-2xl font-extrabold" style={{ color: graph.color }}>{graph.current}</p>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">{graph.meaning}</p>
          </div>
        </div>
      </section>

      {/* Normal vs Suspicious Activity (Context Matters) */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          Normal vs Suspicious: Which Activity Should the Security Team Investigate?
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Note: Not every unusual event is automatically an attack—context matters!
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => handlePickScene('normal')}
            aria-pressed={pickedScene === 'normal'}
            className="rounded-2xl border border-emerald-400/35 bg-slate-900/70 p-5 text-left hover:border-emerald-400"
          >
            <p className="text-sm font-bold text-emerald-300">NORMAL</p>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate-200">
              <li>• Known user</li>
              <li>• Expected location</li>
              <li>• Normal activity</li>
            </ul>
          </button>

          <button
            type="button"
            onClick={() => handlePickScene('suspicious')}
            aria-pressed={pickedScene === 'suspicious'}
            className={`rounded-2xl border p-5 text-left ${
              pickedScene === 'suspicious' || isTeacher
                ? 'border-rose-400 bg-rose-950/30'
                : 'border-rose-400/35 bg-slate-900/70 hover:border-rose-400'
            }`}
          >
            <p className="text-sm font-bold text-rose-300">SUSPICIOUS</p>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate-200">
              <li>• Unknown location</li>
              <li>• Multiple failed logins</li>
              <li>• Unexpected permission change</li>
            </ul>
          </button>
        </div>

        {(pickedScene !== null || isTeacher) && (
          <p aria-live="polite" className="mt-3 rounded-xl border border-cyan-400/35 bg-slate-950/85 p-3.5 text-sm text-slate-100">
            <strong className="text-rose-300">Investigate the SUSPICIOUS scenario!</strong>{' '}
            Remember: context matters—sometimes an unusual login is just a user traveling, so the
            team checks logs to be sure instead of assuming every alert is an attack.
          </p>
        )}
      </section>

      <ConceptCard
        title="Cloud Monitoring"
        whatIsIt="Watching login activity, failed logins, permission changes, network activity, errors, and unusual events."
        whyItMatters="Helps spot problems quickly instead of discovering them weeks later."
        simpleExample="Monitoring notices 5 failed logins followed by a permission change."
        analogy="Security guard watching CCTV screens."
        commonConfusion="Assuming every unusual event is automatically a full-scale attack—context always matters."
      />

      <QuickCheck
        id="m3-q1"
        question="What does Monitoring do?"
        options={['Watches what is happening continuously', 'Deletes all logs', 'Replaces passwords with API keys']}
        correctIndex={0}
        explanation="Monitoring watches activity and logs so rules can trigger alerts when needed."
      />
    </div>
  );
}
