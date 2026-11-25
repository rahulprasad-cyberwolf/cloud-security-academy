import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { DiscussionPrompt } from '../components/DiscussionPrompt';
import { QuickCheck } from '../components/QuickCheck';
import { LogTypeSvg } from '../components/SvgIcons';
import { useCourse } from '../context/CourseContext';

const TIMELINE_EVENTS = [
  { id: 'e1', time: '09:00', label: 'Login', detail: 'Rahul signed into the Cloud Console.' },
  { id: 'e2', time: '09:05', label: 'File opened', detail: 'Rahul opened "project-notes.pdf" from Storage.' },
  { id: 'e3', time: '09:15', label: 'Permission changed', detail: 'Rahul granted Read access to Arun (Tester).' },
  { id: 'e4', time: '09:20', label: 'File downloaded', detail: 'Arun downloaded "test-report.csv".' },
  { id: 'e5', time: '09:30', label: 'Logout', detail: 'Rahul signed out safely.' },
];

const LOG_FIELDS = [
  { key: 'TIME', value: '10:42 AM', desc: 'Exact time when the action happened.' },
  { key: 'USER', value: 'Rahul', desc: 'Who performed the action.' },
  { key: 'ACTION', value: 'Login', desc: 'What happened (Login, Download, Permission Change).' },
  { key: 'LOCATION', value: 'Chennai', desc: 'Where the login request came from.' },
  { key: 'RESULT', value: 'SUCCESS', desc: 'Whether it worked (SUCCESS) or was blocked (FAILED).' },
];

const LOG_TYPES: {
  type: 'auth' | 'audit' | 'app' | 'network' | 'system' | 'security';
  title: string;
  what: string;
  example: string;
  why: string;
}[] = [
  { type: 'auth', title: 'Authentication Logs', what: 'Records logins, logouts, and password checks.', example: 'User Rahul failed login 3 times.', why: 'Spots password-guessing attacks early.' },
  { type: 'audit', title: 'Audit Logs', what: 'Records who changed settings or accessed data.', example: 'Admin changed storage to Public.', why: 'Provides accountability (Who, What, When).' },
  { type: 'app', title: 'Application Logs', what: 'Notes written by software apps.', example: 'Checkout page error: timeout.', why: 'Helps fix bugs and crashes.' },
  { type: 'network', title: 'Network Logs', what: 'Traffic entering and leaving the cloud.', example: 'Blocked connection from unknown IP.', why: 'Detects strange traffic spikes.' },
  { type: 'system', title: 'System Logs', what: 'Health of the underlying cloud server.', example: 'Server restarted after update.', why: 'Explains crashes or slowdowns.' },
  { type: 'security', title: 'Security Logs', what: 'Warnings about suspicious behavior.', example: 'API key detected in code push.', why: 'Triggers security alerts quickly.' },
];

export function Module1Page() {
  const { recordChallengeSuccess } = useCourse();
  const [selectedEvent, setSelectedEvent] = useState(TIMELINE_EVENTS[0]);
  const [selectedField, setSelectedField] = useState(LOG_FIELDS[0]);

  const handleSelectField = (field: (typeof LOG_FIELDS)[number]) => {
    setSelectedField(field);
    recordChallengeSuccess(`m1-field-${field.key}`, 4);
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Section 2: Cloud Logging & Log Types (15 Minutes)
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          What happens when someone logs into a cloud account?{' '}
          <strong className="text-cyan-300">USER → LOGIN → CLOUD → ACTION → LOG ENTRY</strong>. A
          log is like a CCTV recording of everything that happens.
        </p>

        {/* CAMERA -> EVENT -> RECORD -> LOG SVG */}
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Camera watches Event, creates Record, saves as Log"
            viewBox="0 0 720 100"
            className="h-auto w-full"
          >
            {[
              { label: '📹 CAMERA', sub: 'Watching cloud', color: '#38bdf8' },
              { label: '⚡ EVENT', sub: 'User logs in', color: '#a78bfa' },
              { label: '📝 RECORD', sub: 'Writes details', color: '#34d399' },
              { label: '📜 LOG', sub: 'Saved history', color: '#22d3ee' },
            ].map((node, i) => {
              const x = 16 + i * 180;
              return (
                <g key={node.label}>
                  <rect x={x} y={16} width="144" height="66" rx="12" fill="#0f172a" stroke={node.color} strokeWidth="2" />
                  <text x={x + 72} y={44} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{node.label}</text>
                  <text x={x + 72} y={64} textAnchor="middle" fill={node.color} fontSize="10">{node.sub}</text>
                  {i < 3 && (
                    <line x1={x + 144} y1={49} x2={x + 180} y2={49} stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </header>

      {/* Interactive Fake Log Viewer */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          Interactive Log Entry Viewer (Click Any Field)
        </h2>
        <div className="mt-3 flex flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:text-sm">
          {LOG_FIELDS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => handleSelectField(f)}
              aria-pressed={selectedField.key === f.key}
              className={`rounded-xl border px-3.5 py-2 text-left transition-colors ${
                selectedField.key === f.key
                  ? 'border-cyan-400 bg-cyan-500/20 text-white'
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400/50'
              }`}
            >
              <span className="block text-[10px] text-cyan-300 uppercase">{f.key}</span>
              <span className="font-bold">{f.value}</span>
            </button>
          ))}
        </div>
        <div aria-live="polite" className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-950/25 p-3.5 text-sm">
          <strong className="text-emerald-300">{selectedField.key} ({selectedField.value}):</strong>{' '}
          <span className="text-slate-100">{selectedField.desc}</span>
        </div>
      </section>

      {/* Animated 09:00 - 09:30 Timeline */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">
          Interactive Log Timeline (09:00 – 09:30)
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {TIMELINE_EVENTS.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => setSelectedEvent(ev)}
              aria-pressed={selectedEvent.id === ev.id}
              className={`min-h-[44px] rounded-xl border px-3 py-2 text-left text-xs font-semibold ${
                selectedEvent.id === ev.id
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                  : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              <span className="block font-mono text-cyan-300">{ev.time}</span>
              <span>{ev.label}</span>
            </button>
          ))}
        </div>
        <div aria-live="polite" className="mt-3 rounded-xl border border-cyan-500/30 bg-slate-950/85 p-3.5 text-sm">
          <strong className="text-cyan-300">{selectedEvent.time} ({selectedEvent.label}):</strong>{' '}
          <span className="text-white">{selectedEvent.detail}</span>
        </div>
      </section>

      {/* 6 Separate SVG Log Type Cards */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-4 text-lg font-bold text-white">6 Types of Cloud Logs</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LOG_TYPES.map((lt) => (
            <article key={lt.type} className="rounded-2xl border border-slate-700/70 bg-slate-900/65 p-4 space-y-2">
              <div className="flex items-center gap-3">
                <LogTypeSvg type={lt.type} />
                <h3 className="text-base font-bold text-white">{lt.title}</h3>
              </div>
              <p className="text-xs text-slate-200"><strong className="text-cyan-300">Definition:</strong> {lt.what}</p>
              <p className="text-xs text-slate-200"><strong className="text-emerald-300">Why it matters:</strong> {lt.why}</p>
              <p className="rounded-lg bg-slate-950 px-2.5 py-1.5 font-mono text-[11px] text-slate-300">{lt.example}</p>
            </article>
          ))}
        </div>
      </section>

      <ConceptCard
        title="What Is a Log?"
        whatIsIt="A log is a timestamped written record of something that happened in the cloud."
        whyItMatters="Without logs, you have no way to trace who accessed files or changed settings."
        simpleExample="10:42 AM | User: Rahul | Action: Login | Location: Chennai | Result: SUCCESS"
        analogy="CCTV recording inside a building."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <DiscussionPrompt
          question="Why would a company keep logs?"
          expectedAnswer="So they can see who did what, prove what happened during an incident, and spot suspicious behavior."
        />
        <DiscussionPrompt
          question="How would you know someone accessed your cloud account?"
          expectedAnswer="By checking your Authentication & Audit Logs for unfamiliar login times, IP addresses, or locations."
        />
      </div>

      <QuickCheck
        id="m1-q1"
        question="What does a log do?"
        options={['Records activity', 'Deletes data', 'Creates passwords', 'Blocks internet']}
        correctIndex={0}
        explanation="A log records activity in your cloud environment so you can review it anytime."
      />
    </div>
  );
}
