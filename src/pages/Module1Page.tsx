import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { LogTypeSvg } from '../components/SvgIcons';
import { useCourse } from '../context/CourseContext';

const AUDIT_EXAMPLES = {
  normal: {
    label: 'Example 1: Normal Login',
    USER: 'Rahul',
    ACTION: 'Login',
    TIME: '10:42 AM',
    LOCATION: 'Chennai',
    RESULT: 'SUCCESS',
  },
  suspicious: {
    label: 'Example 2: Suspicious Change',
    USER: 'UnknownUser',
    ACTION: 'Permission Change',
    TIME: '02:14 AM',
    LOCATION: 'Unknown',
    RESULT: 'SUCCESS',
  },
};

const FIELD_HELP: Record<'USER' | 'TIME' | 'ACTION' | 'LOCATION' | 'RESULT', string> = {
  USER: 'Who performed the action (e.g., Rahul or UnknownUser).',
  TIME: 'When the action happened (10:42 AM vs 02:14 AM).',
  ACTION: 'What happened (Login, File Download, Permission Change).',
  LOCATION: 'Where the request came from (Chennai vs Unknown).',
  RESULT: 'Whether the action succeeded or failed (SUCCESS or FAILED).',
};

const LOG_TYPES: {
  type: 'auth' | 'audit' | 'app' | 'network' | 'security';
  title: string;
  records: string;
  example: string;
  why: string;
}[] = [
  { type: 'auth', title: 'Authentication Logs', records: 'Logins, failed logins, and logouts.', example: 'Rahul logged in at 10:42 AM.', why: 'Spots password guessing or unusual sign-ins.' },
  { type: 'audit', title: 'Audit Logs', records: 'Account creations, permission & config changes.', example: 'UnknownUser changed permissions at 02:14 AM.', why: 'Shows who changed important security settings.' },
  { type: 'app', title: 'Application Logs', records: 'App requests, file access, and errors.', example: 'File download error on portal.', why: 'Helps find bugs or unusual app usage.' },
  { type: 'network', title: 'Network Logs', records: 'Connections entering and leaving cloud.', example: 'Blocked traffic from unknown IP.', why: 'Detects unexpected network connections.' },
  { type: 'security', title: 'Security Logs', records: 'Blocked actions and policy alerts.', example: 'Exposed API key warning.', why: 'Highlights events that need fast security review.' },
];

export function Module1Page() {
  const { recordChallengeSuccess } = useCourse();
  const [auditMode, setAuditMode] = useState<'normal' | 'suspicious'>('suspicious');
  const [selectedField, setSelectedField] = useState<'USER' | 'TIME' | 'ACTION' | 'LOCATION' | 'RESULT'>('USER');

  const currentAudit = AUDIT_EXAMPLES[auditMode];

  const handleFieldClick = (f: 'USER' | 'TIME' | 'ACTION' | 'LOCATION' | 'RESULT') => {
    setSelectedField(f);
    recordChallengeSuccess(`m1-audit-${f}`, 4);
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Logging & Audit Logs
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          What happens when someone performs an action in the cloud? A <strong className="text-cyan-300">Log</strong>{' '}
          records what happened—like a CCTV recording for your cloud environment.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {[
            'Login',
            'Failed Login',
            'File Access',
            'File Download',
            'Permission Change',
            'Account Creation',
            'Configuration Change',
          ].map((ex) => (
            <span key={ex} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-medium text-cyan-200">
              {ex}
            </span>
          ))}
        </div>

        {/* USER ACTION -> EVENT -> LOG -> STORED RECORD -> INVESTIGATION SVG */}
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="User Action creates Event, written to Log, saved as Stored Record for Investigation"
            viewBox="0 0 760 110"
            className="h-auto w-full"
          >
            {[
              { label: 'USER ACTION', sub: 'Click / Login', color: '#38bdf8' },
              { label: 'EVENT', sub: 'Happens in cloud', color: '#a78bfa' },
              { label: 'LOG', sub: 'CCTV recording', color: '#34d399' },
              { label: 'STORED RECORD', sub: 'Saved safely', color: '#22d3ee' },
              { label: 'INVESTIGATION', sub: 'Review later', color: '#fbbf24' },
            ].map((node, i) => {
              const x = 10 + i * 150;
              return (
                <g key={node.label}>
                  <rect x={x} y={18} width="126" height="72" rx="12" fill="#0f172a" stroke={node.color} strokeWidth="2" />
                  <text x={x + 63} y={48} textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="700">{node.label}</text>
                  <text x={x + 63} y={68} textAnchor="middle" fill={node.color} fontSize="9.5">{node.sub}</text>
                  {i < 4 && (
                    <line x1={x + 126} y1={54} x2={x + 150} y2={54} stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </header>

      {/* Interactive SVG Audit Log Viewer */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">Interactive Audit Log Viewer</h2>
            <p className="text-sm text-slate-400">Switch examples and click USER, TIME, ACTION, LOCATION, or RESULT.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAuditMode('normal')}
              aria-pressed={auditMode === 'normal'}
              className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-bold ${
                auditMode === 'normal' ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200' : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              Rahul (10:42 AM)
            </button>
            <button
              type="button"
              onClick={() => setAuditMode('suspicious')}
              aria-pressed={auditMode === 'suspicious'}
              className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-bold ${
                auditMode === 'suspicious' ? 'border-rose-400 bg-rose-500/20 text-rose-200' : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              UnknownUser (02:14 AM)
            </button>
          </div>
        </div>

        <div className="grid gap-2.5 rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:grid-cols-5">
          {(['USER', 'ACTION', 'TIME', 'LOCATION', 'RESULT'] as const).map((field) => {
            const active = selectedField === field;
            return (
              <button
                key={field}
                type="button"
                onClick={() => handleFieldClick(field)}
                aria-pressed={active}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/20 text-white'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400/50'
                }`}
              >
                <span className="block text-[10px] text-cyan-300">{field}</span>
                <span className="mt-0.5 block font-bold">{currentAudit[field]}</span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-950/25 p-3.5 text-sm">
          <strong className="text-emerald-300">{selectedField}:</strong>{' '}
          <span className="text-slate-100">{FIELD_HELP[selectedField]}</span>
        </div>
      </section>

      {/* 5 Logging Type SVG Cards */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-4 text-lg font-bold text-white">5 Logging Types</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LOG_TYPES.map((lt) => (
            <article key={lt.type} className="rounded-2xl border border-slate-700/70 bg-slate-900/65 p-4 space-y-2">
              <div className="flex items-center gap-3">
                <LogTypeSvg type={lt.type} />
                <h3 className="text-base font-bold text-white">{lt.title}</h3>
              </div>
              <p className="text-xs text-slate-200"><strong className="text-cyan-300">Records:</strong> {lt.records}</p>
              <p className="text-xs text-slate-200"><strong className="text-emerald-300">Why teams care:</strong> {lt.why}</p>
              <p className="rounded-lg bg-slate-950 px-2.5 py-1.5 font-mono text-[11px] text-slate-300">{lt.example}</p>
            </article>
          ))}
        </div>
      </section>

      <ConceptCard
        title="Audit Logs"
        whatIsIt="A record of important cloud actions showing Who, What, When, Where, and Result."
        whyItMatters="Lets security teams trace suspicious permission changes or logins."
        simpleExample="UnknownUser | Permission Change | 02:14 AM | Unknown | SUCCESS"
        analogy="CCTV recording + visitor logbook."
        questionToAsk="Why is UnknownUser changing permissions at 02:14 AM important?"
        expectedAnswer="Because an unknown user gaining new permissions in the middle of the night could take over the environment."
      />

      <QuickCheck
        id="m1-q1"
        question="What does a cloud log record?"
        options={['What happened (e.g., logins, file access, permission changes)', 'User passwords in plain text', 'Website color themes only']}
        correctIndex={0}
        explanation="Logs record events and actions so teams can investigate what happened."
      />
    </div>
  );
}
