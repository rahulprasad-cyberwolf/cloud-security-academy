import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useCourse } from '../context/CourseContext';

interface ChainLink {
  step: number;
  term: string;
  question: string;
  takeaway: string;
}

const RECAP_CHAIN: ChainLink[] = [
  { step: 1, term: 'IDENTITY', question: 'Who are you?', takeaway: 'Digital profile representing users and services (rahul@example.com).' },
  { step: 2, term: 'ACCESS', question: 'What can you do?', takeaway: 'Roles and permissions strictly granting Least Privilege.' },
  { step: 3, term: 'DATA', question: 'What are we protecting?', takeaway: 'Customer data, database records, and private storage files.' },
  { step: 4, term: 'LOGGING', question: 'What happened?', takeaway: 'Immutable audit logs and authentication records (CCTV).' },
  { step: 5, term: 'MONITORING', question: 'What is happening now?', takeaway: 'Continuous dashboard metrics watching for abnormal spikes (Security Guard).' },
  { step: 6, term: 'ALERTING', question: 'What needs attention?', takeaway: 'Automated notification when a security rule triggers (Alarm Bell).' },
  { step: 7, term: 'ASSESSMENT', question: 'Is the cloud secure?', takeaway: 'Scheduled checklist and scanner audits finding misconfigurations early.' },
  { step: 8, term: 'INVESTIGATION', question: 'How did it happen?', takeaway: 'Connecting evidence cards across the timeline into a forensic conclusion.' },
  { step: 9, term: 'RESPONSE', question: 'What should we do?', takeaway: 'Structured Incident Response: Contain, Remediate, Recover, and Review.' },
];

export function FinalRecapPage() {
  const { navigateTo } = useCourse();
  const [selectedLink, setSelectedLink] = useState<ChainLink>(RECAP_CHAIN[0]);

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-200">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Final Visual Recap</span>
        </div>
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          The 9-Link Cloud Security Defense Chain
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Security is an unbroken chain. Click each link below to review its core question and takeaway.
        </p>
      </header>

      {/* Visual Chain SVG */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Visual Security Chain</h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="9-link security chain from Identity to Response"
            viewBox="0 0 900 100"
            className="h-auto w-full"
          >
            {RECAP_CHAIN.map((link, idx) => {
              const x = 10 + idx * 98;
              const isSelected = selectedLink.term === link.term;
              return (
                <g key={link.term} className="cursor-pointer" onClick={() => setSelectedLink(link)}>
                  <rect
                    x={x}
                    y={18}
                    width="88"
                    height="64"
                    rx="10"
                    fill={isSelected ? 'rgba(34,211,238,0.2)' : '#0f172a'}
                    stroke={isSelected ? '#22d3ee' : '#334155'}
                    strokeWidth={isSelected ? '2' : '1.5'}
                  />
                  <text x={x + 44} y={46} textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="700">
                    {link.term}
                  </text>
                  <text x={x + 44} y={64} textAnchor="middle" fill="#38bdf8" fontSize="7.5">
                    Step {link.step}
                  </text>
                  {idx < RECAP_CHAIN.length - 1 && (
                    <line x1={x + 88} y1={50} x2={x + 98} y2={50} stroke="#22d3ee" strokeWidth="2" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Grid of 9 Cards */}
      <section className="glass-card rounded-2xl p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {RECAP_CHAIN.map((link) => {
            const isSelected = selectedLink.term === link.term;
            return (
              <button
                key={link.term}
                type="button"
                onClick={() => setSelectedLink(link)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Step {link.step}</span>
                  <span className="text-xs font-bold text-white">{link.term}</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-emerald-300">→ {link.question}</p>
                <p className="mt-1 text-[11px] text-slate-300">{link.takeaway}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigateTo('final-quiz')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all"
          >
            <span>Proceed to Final Knowledge Check</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
