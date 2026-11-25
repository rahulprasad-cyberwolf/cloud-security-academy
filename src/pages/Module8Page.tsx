import { CheckCircle2, Clock, Search } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

const TIMELINE = [
  { id: 't1', time: '01:58', title: 'Failed Login', evidence: 'Wrong password entered from an unfamiliar location.' },
  { id: 't2', time: '02:01', title: 'Failed Login', evidence: 'Second failed password attempt 3 minutes later.' },
  { id: 't3', time: '02:05', title: 'Failed Login', evidence: 'Third failed attempt—shows repeated password guessing.' },
  { id: 't4', time: '02:13', title: 'Successful Login', evidence: 'Login finally succeeded at 02:13 AM.' },
  { id: 't5', time: '02:14', title: 'Permission Changed', evidence: 'Account permissions upgraded to Admin 1 minute after login!' },
  { id: 't6', time: '02:18', title: 'Large Data Access', evidence: 'Large batch of files accessed from Storage.' },
];

const BOARD_NODES = [
  { id: 'User', info: 'Account: Rahul (compromised or targeted)' },
  { id: 'Login', info: '3 Failed Logins followed by 02:13 AM Successful Login' },
  { id: 'Location', info: 'Unfamiliar / Unknown location' },
  { id: 'Permission', info: 'Changed to Admin at 02:14 AM' },
  { id: 'Resource', info: 'Sensitive Storage Bucket' },
  { id: 'Data Access', info: 'Large Data Access at 02:18 AM' },
];

export function Module8Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [selectedEvent, setSelectedEvent] = useState(TIMELINE[0]);
  const [visited, setVisited] = useState<Record<string, boolean>>({ t1: true });
  const [selectedNode, setSelectedNode] = useState(BOARD_NODES[0]);
  const isTeacher = progress.mode === 'teacher';

  const handleSelectEvent = (ev: (typeof TIMELINE)[number]) => {
    setSelectedEvent(ev);
    const next = { ...visited, [ev.id]: true };
    setVisited(next);
    if (TIMELINE.every((t) => next[t.id])) {
      recordChallengeSuccess('m8-investigation', 25, 'lab-investigation');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200">
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Practical Investigation Lab</span>
        </div>
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Security Event Investigation
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong>Scenario:</strong> “An unusual cloud account activity has been detected.” Click
          every event on the timeline and trace how evidence connects on the Investigation Board.
        </p>
      </header>

      {/* Interactive Timeline */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">Interactive Event Timeline</h2>
        <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {TIMELINE.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => handleSelectEvent(ev)}
              aria-pressed={selectedEvent.id === ev.id}
              className={`rounded-xl border p-3 text-left transition-all ${
                selectedEvent.id === ev.id
                  ? 'border-cyan-400 bg-cyan-500/20'
                  : 'border-slate-700 bg-slate-900/70 hover:border-cyan-400/50'
              }`}
            >
              <span className="flex items-center gap-1 font-mono text-xs text-cyan-300">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {ev.time}
              </span>
              <span className="mt-1 block text-xs font-bold text-white">{ev.title}</span>
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-4 rounded-xl border border-cyan-500/30 bg-slate-950/85 p-4 text-sm">
          <p className="font-bold text-cyan-300">
            Evidence at {selectedEvent.time} — {selectedEvent.title}
          </p>
          <p className="mt-1 text-slate-100">{selectedEvent.evidence}</p>
        </div>

        {TIMELINE.every((t) => visited[t.id]) && (
          <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            All timeline events investigated! (+25 pts)
          </p>
        )}
      </section>

      {/* Investigation Board SVG connecting User -> Login -> Location -> Permission -> Resource -> Data Access */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">
          Investigation Board: How the Evidence Connects
        </h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Investigation board connecting User, Login, Location, Permission, Resource, and Data Access"
            viewBox="0 0 780 110"
            className="h-auto w-full"
          >
            {BOARD_NODES.map((n, idx) => {
              const x = 10 + idx * 130;
              const active = selectedNode.id === n.id;
              return (
                <g key={n.id}>
                  <rect
                    x={x}
                    y={24}
                    width="110"
                    height="60"
                    rx="10"
                    fill={active ? 'rgba(34,211,238,0.2)' : '#0f172a'}
                    stroke={active ? '#22d3ee' : '#fb7185'}
                    strokeWidth="2"
                  />
                  <text x={x + 55} y={58} textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="700">
                    {n.id}
                  </text>
                  {idx < BOARD_NODES.length - 1 && (
                    <line x1={x + 110} y1={54} x2={x + 130} y2={54} stroke="#fb7185" strokeWidth="2.5" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="mt-3 flex flex-wrap gap-2">
            {BOARD_NODES.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNode(n)}
                aria-pressed={selectedNode.id === n.id}
                className={`min-h-[36px] rounded-lg border px-3 py-1 text-xs font-semibold ${
                  selectedNode.id === n.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                    : 'border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                {n.id}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="mt-3 text-sm text-cyan-200">
            <strong>{selectedNode.id}:</strong> {selectedNode.info}
          </p>
        </div>

        {(isTeacher || TIMELINE.every((t) => visited[t.id])) && (
          <div className="mt-4 rounded-xl border border-emerald-400/35 bg-emerald-950/25 p-4 text-xs sm:text-sm text-emerald-100 space-y-1">
            <p><strong>What happened?</strong> 3 failed logins led to a 02:13 AM login, permission change at 02:14, and large data access at 02:18.</p>
            <p><strong>What should we investigate?</strong> Who logged in, why permissions changed, and which files were accessed.</p>
          </div>
        )}
      </section>

      <ConceptCard
        title="Security Event Investigation"
        whatIsIt="Connecting logs, locations, permissions, and data access to understand an incident."
        whyItMatters="Shows exactly what happened so the team can respond accurately."
        simpleExample="Tracing 01:58 Failed Logins → 02:13 Login → 02:14 Permission Change → 02:18 Data Access."
        analogy="A detective connecting clues on an investigation board."
      />

      <QuickCheck
        id="m8-q1"
        question="What should we check during a suspicious-login investigation?"
        options={['User, Login time, Location, Permission changes, and Resource/Data access', 'Only the server wallpaper']}
        correctIndex={0}
        explanation="Investigators connect User, Login, Location, Permission, Resource, and Data Access."
      />
    </div>
  );
}
