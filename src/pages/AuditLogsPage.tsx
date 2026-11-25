import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';
import { CheckCircle2 } from 'lucide-react';

interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  resource: string;
  timestamp: string;
  sourceIp: string;
  result: 'SUCCESS' | 'FAILED';
  isSuspicious: boolean;
  explanation: string;
}

const AUDIT_LOG_QUIZ_ENTRIES: AuditLogEntry[] = [
  {
    id: 'log1',
    actor: 'rahul@example.com',
    action: 'Login',
    resource: 'Cloud Console',
    timestamp: '10:42 AM',
    sourceIp: '103.21.244.2 (Chennai, India)',
    result: 'SUCCESS',
    isSuspicious: false,
    explanation: 'Normal: Rahul logging in during regular business hours from his usual city.',
  },
  {
    id: 'log2',
    actor: 'priya@example.com',
    action: 'Read Dev Code',
    resource: 'frontend-app-repo',
    timestamp: '11:15 AM',
    sourceIp: '103.21.244.8 (Chennai, India)',
    result: 'SUCCESS',
    isSuspicious: false,
    explanation: 'Normal: A software developer inspecting source code.',
  },
  {
    id: 'log3',
    actor: 'alex@example.com',
    action: 'Delete Storage Bucket',
    resource: 'production-customer-backups-2026',
    timestamp: '02:30 AM',
    sourceIp: '198.51.100.45 (Unknown / Tor Exit Node)',
    result: 'SUCCESS',
    isSuspicious: true,
    explanation: '🚨 DANGEROUS! Deleting production backup storage at 02:30 AM from an unknown IP location is highly suspicious!',
  },
  {
    id: 'log4',
    actor: 'kavita@example.com',
    action: 'Download Document',
    resource: 'hr-training-slides.pdf',
    timestamp: '02:15 PM',
    sourceIp: '103.21.244.15 (Chennai, India)',
    result: 'SUCCESS',
    isSuspicious: false,
    explanation: 'Normal: HR manager downloading training material during normal work hours.',
  },
  {
    id: 'log5',
    actor: 'sanjay@example.com',
    action: 'View Billing Invoice',
    resource: 'monthly-invoice-nov.pdf',
    timestamp: '04:00 PM',
    sourceIp: '103.21.244.2 (Chennai, India)',
    result: 'SUCCESS',
    isSuspicious: false,
    explanation: 'Normal: Cloud administrator checking the monthly infrastructure bill.',
  },
];

export function AuditLogsPage() {
  const { recordChallengeSuccess } = useCourse();
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [highlightField, setHighlightField] = useState<'actor' | 'action' | 'resource' | 'timestamp' | 'sourceIp' | 'result'>('action');

  const handleSelectSuspicious = (entry: AuditLogEntry) => {
    setSelectedLogId(entry.id);
    if (entry.isSuspicious) {
      recordChallengeSuccess('audit-logs-find-suspicious', 25, 'lab-audit-logs');
    }
  };

  const selectedEntry = AUDIT_LOG_QUIZ_ENTRIES.find((l) => l.id === selectedLogId);

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Audit Logs — The Cloud's Black Box Recorder
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          An <strong className="text-cyan-300">Audit Log</strong> records every administrative change and resource access in the cloud.
          <br />
          Every audit log answers 6 fundamental forensic questions:
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-6 text-center">
          <div className="rounded-xl border border-cyan-400/30 bg-slate-900/60 p-2.5">
            <span className="text-[10px] text-cyan-300 font-bold uppercase block">WHO</span>
            <span className="text-xs text-white font-semibold">Actor / User</span>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-slate-900/60 p-2.5">
            <span className="text-[10px] text-emerald-300 font-bold uppercase block">DID WHAT</span>
            <span className="text-xs text-white font-semibold">Action Taken</span>
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-slate-900/60 p-2.5">
            <span className="text-[10px] text-amber-300 font-bold uppercase block">TO WHAT</span>
            <span className="text-xs text-white font-semibold">Resource</span>
          </div>
          <div className="rounded-xl border border-sky-400/30 bg-slate-900/60 p-2.5">
            <span className="text-[10px] text-sky-300 font-bold uppercase block">WHEN</span>
            <span className="text-xs text-white font-semibold">Timestamp</span>
          </div>
          <div className="rounded-xl border border-violet-400/30 bg-slate-900/60 p-2.5">
            <span className="text-[10px] text-violet-300 font-bold uppercase block">FROM WHERE</span>
            <span className="text-xs text-white font-semibold">Source IP / City</span>
          </div>
          <div className="rounded-xl border border-rose-400/30 bg-slate-900/60 p-2.5">
            <span className="text-[10px] text-rose-300 font-bold uppercase block">OUTCOME</span>
            <span className="text-xs text-white font-semibold">Success / Failed</span>
          </div>
        </div>
      </header>

      {/* Featured Example: alex@example.com deleting a storage object */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Featured Audit Log Breakdown: Alex Deletes Storage</h2>
        <p className="text-xs text-slate-400 mb-4">Click any field in this real audit record to see why it matters to an investigator.</p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs">
          <div className="grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => setHighlightField('actor')}
              className={`p-3 rounded-xl border text-left transition-all ${
                highlightField === 'actor' ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <span className="text-slate-400 block text-[10px]">ACTOR (WHO):</span>
              <span className="font-bold text-white text-xs">alex@example.com</span>
            </button>

            <button
              type="button"
              onClick={() => setHighlightField('action')}
              className={`p-3 rounded-xl border text-left transition-all ${
                highlightField === 'action' ? 'border-rose-400 bg-rose-950/40 text-rose-200' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <span className="text-slate-400 block text-[10px]">ACTION (WHAT):</span>
              <span className="font-bold text-rose-300 text-xs">DeleteObject (Storage)</span>
            </button>

            <button
              type="button"
              onClick={() => setHighlightField('resource')}
              className={`p-3 rounded-xl border text-left transition-all ${
                highlightField === 'resource' ? 'border-amber-400 bg-amber-950/40 text-amber-200' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <span className="text-slate-400 block text-[10px]">RESOURCE (TARGET):</span>
              <span className="font-bold text-white text-xs">backup-db-archive.tar.gz</span>
            </button>

            <button
              type="button"
              onClick={() => setHighlightField('timestamp')}
              className={`p-3 rounded-xl border text-left transition-all ${
                highlightField === 'timestamp' ? 'border-sky-400 bg-sky-950/40 text-sky-200' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <span className="text-slate-400 block text-[10px]">TIMESTAMP (WHEN):</span>
              <span className="font-bold text-white text-xs">02:30:14 AM UTC</span>
            </button>

            <button
              type="button"
              onClick={() => setHighlightField('sourceIp')}
              className={`p-3 rounded-xl border text-left transition-all ${
                highlightField === 'sourceIp' ? 'border-violet-400 bg-violet-950/40 text-violet-200' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <span className="text-slate-400 block text-[10px]">SOURCE IP (FROM WHERE):</span>
              <span className="font-bold text-white text-xs">198.51.100.45 (Tor Relay)</span>
            </button>

            <button
              type="button"
              onClick={() => setHighlightField('result')}
              className={`p-3 rounded-xl border text-left transition-all ${
                highlightField === 'result' ? 'border-emerald-400 bg-emerald-950/40 text-emerald-200' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <span className="text-slate-400 block text-[10px]">RESULT (STATUS):</span>
              <span className="font-bold text-emerald-400 text-xs">SUCCESS (200 OK)</span>
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/90 p-4 font-sans text-xs">
            {highlightField === 'actor' && <p><strong>Actor:</strong> Tells investigators exactly which account credential was used. Alex's account may be compromised!</p>}
            {highlightField === 'action' && <p><strong>Action:</strong> Critical destructive action (DeleteObject). Normal devs do not delete production backups!</p>}
            {highlightField === 'resource' && <p><strong>Resource:</strong> Shows the exact file affected. Knowing it was the main database backup escalates severity to Critical.</p>}
            {highlightField === 'timestamp' && <p><strong>Timestamp:</strong> 02:30 AM is outside normal company working hours. Unscheduled nocturnal activity is a red flag.</p>}
            {highlightField === 'sourceIp' && <p><strong>Source IP:</strong> Traces the network address. A Tor relay or unfamiliar country points to an external adversary.</p>}
            {highlightField === 'result' && <p><strong>Result:</strong> Confirms the deletion succeeded, meaning the backup file is now gone and immediate containment is required.</p>}
          </div>
        </div>
      </section>

      {/* Interactive Activity: Find the Suspicious Event (5-entry log quiz) */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Interactive Activity: Find the Suspicious Event</h2>
        <p className="text-xs text-slate-400 mb-4">Click on the single log entry below that represents an urgent security risk.</p>

        <div className="space-y-2.5">
          {AUDIT_LOG_QUIZ_ENTRIES.map((log) => {
            const isSelected = selectedLogId === log.id;
            return (
              <button
                key={log.id}
                type="button"
                onClick={() => handleSelectSuspicious(log)}
                className={`w-full rounded-xl border p-4 text-left transition-all font-mono text-xs ${
                  isSelected
                    ? log.isSuspicious
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-rose-500 bg-rose-950/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-cyan-400'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-sans">
                  <span className="font-bold text-white">{log.actor}</span>
                  <span className="text-[11px] text-slate-400">{log.timestamp} • {log.sourceIp}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.action.includes('Delete') ? 'bg-rose-500/20 text-rose-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                    ACTION: {log.action}
                  </span>
                  <span className="text-slate-300 text-[11px]">TARGET: {log.resource}</span>
                  <span className="text-emerald-400 text-[11px] font-bold">[{log.result}]</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedEntry && (
          <div className="mt-4 rounded-xl border p-4 text-xs font-sans">
            {selectedEntry.isSuspicious ? (
              <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                {selectedEntry.explanation} (+25 pts)
              </p>
            ) : (
              <p className="text-slate-300">
                {selectedEntry.explanation} (Look for destructive actions at odd hours from unknown locations!)
              </p>
            )}
          </div>
        )}
      </section>

      <ConceptCard
        title="Audit Logs"
        whatIsIt="Immutable security logs detailing administrative actions, permissions changes, and resource modifications."
        whyItMatters="Without audit logs, investigators have zero evidence to determine who broke in or what they stole."
        simpleExample="A hotel register: records every visitor who checked in, the room key they received, and the timestamp."
        analogy="Airplane Flight Data Recorder (Black Box)."
      />

      <QuickCheck
        id="audit-logs-q1"
        question="Why should audit logs never be stored on the same cloud server that users have write access to?"
        options={[
          'If an attacker compromises the server, they could delete the audit logs to erase their tracks',
          'Audit logs take up too much RAM memory',
          'Cloud providers charge extra if logs stay in the same folder',
        ]}
        correctIndex={0}
        explanation="Security logs must be shipped to dedicated, tamper-proof storage so adversaries cannot tamper with evidence."
      />
    </div>
  );
}
