import { AlertTriangle, CheckCircle2, Clock, FileSearch, MapPin, ShieldCheck, User } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  time: string;
  location: string;
  result: 'SUCCESS' | 'FAILED';
  suspicious: boolean;
  reason: string;
}

const SIMULATED_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    user: 'rahul@example.com',
    action: 'Login',
    time: '10:42 AM',
    location: 'Chennai',
    result: 'SUCCESS',
    suspicious: false,
    reason: 'Normal daytime login from Rahul’s usual city (Chennai).',
  },
  {
    id: 'log-2',
    user: 'arun@example.com',
    action: 'View Test Report',
    time: '11:15 AM',
    location: 'Bengaluru',
    result: 'SUCCESS',
    suspicious: false,
    reason: 'Routine work by a tester during office hours.',
  },
  {
    id: 'log-3',
    user: 'unknown-user',
    action: 'Failed Login',
    time: '02:13 AM',
    location: 'Unknown',
    result: 'FAILED',
    suspicious: true,
    reason: 'Suspicious! Unknown user trying to log in at 2:13 AM from an unknown location.',
  },
  {
    id: 'log-4',
    user: 'priya@example.com',
    action: 'Upload Assignment PDF',
    time: '02:30 PM',
    location: 'Hyderabad',
    result: 'SUCCESS',
    suspicious: false,
    reason: 'Normal student/developer file upload during the afternoon.',
  },
  {
    id: 'log-5',
    user: 'unknown-user',
    action: 'Download All Student Passwords',
    time: '02:16 AM',
    location: 'Unknown',
    result: 'SUCCESS',
    suspicious: true,
    reason: 'Very dangerous! An unknown user succeeded in downloading sensitive data at 2:16 AM.',
  },
  {
    id: 'log-6',
    user: 'rahul@example.com',
    action: 'Change Storage to Public',
    time: '02:18 AM',
    location: 'Unknown',
    result: 'SUCCESS',
    suspicious: true,
    reason: 'Suspicious! Rahul normally logs in from Chennai at 10 AM—this is 2:18 AM from an unknown place changing security settings.',
  },
];

export function Module2Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [clickedIds, setClickedIds] = useState<string[]>([]);
  const [lastFeedback, setLastFeedback] = useState<AuditLogEntry | null>(null);

  const suspiciousLogs = SIMULATED_LOGS.filter((l) => l.suspicious);
  const foundSuspiciousCount = clickedIds.filter((id) =>
    suspiciousLogs.some((s) => s.id === id)
  ).length;

  const handleLogClick = (entry: AuditLogEntry) => {
    setLastFeedback(entry);
    if (!clickedIds.includes(entry.id)) {
      const nextClicked = [...clickedIds, entry.id];
      setClickedIds(nextClicked);

      const nextFound = nextClicked.filter((id) =>
        suspiciousLogs.some((s) => s.id === id)
      ).length;
      if (nextFound === suspiciousLogs.length) {
        recordChallengeSuccess('m2-audit-game', 20);
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Module 2: Audit Logs
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          An <strong className="text-cyan-300">Audit Log</strong> is a special security log that
          answers 5 simple questions about every important action in your cloud account.
        </p>

        {/* 5 Questions Strip with Custom SVG */}
        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          {[
            { icon: User, q: 'WHO?', a: 'Which user or account' },
            { icon: FileSearch, q: 'WHAT?', a: 'What action happened' },
            { icon: Clock, q: 'WHEN?', a: 'Exact date and time' },
            { icon: MapPin, q: 'WHERE?', a: 'City or IP location' },
            { icon: ShieldCheck, q: 'RESULT?', a: 'Success or Failed' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-3.5 text-center"
              >
                <Icon className="mx-auto mb-1.5 h-5 w-5 text-cyan-300" aria-hidden="true" />
                <p className="text-xs font-bold tracking-wider text-white">{item.q}</p>
                <p className="mt-0.5 text-xs text-slate-400">{item.a}</p>
              </div>
            );
          })}
        </div>
      </header>

      <ConceptCard
        title="What is an Audit Log?"
        whatIsIt="An audit log is a chronological record of important actions happening inside a cloud system—who did what, when, from where, and whether it worked."
        whyItMatters="If something goes wrong or data disappears, audit logs let you trace the exact timeline instead of guessing."
        simpleExample="USER: rahul@example.com | ACTION: Login | TIME: 10:42 AM | LOCATION: Chennai | RESULT: SUCCESS"
        analogy="It is like a CCTV recording + visitor sign-in book for your cloud environment."
        teacherNote="Compare the two logs from the prompt: Rahul at 10:42 AM in Chennai vs unknown-user at 02:13 AM in Unknown."
        discussionQuestion="If an audit log shows 'RESULT: FAILED', why is it still important to keep it?"
      />

      {/* Interactive Fake Cloud Audit-Log Dashboard + Mini-Game */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">
              Mini-Game: Find the Suspicious Activity
            </h2>
            <p className="text-sm text-slate-300">
              Click the <strong>3 suspicious log entries</strong> in this simulated cloud audit-log
              dashboard.
            </p>
          </div>
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-200">
            Found: {foundSuspiciousCount} / {suspiciousLogs.length} suspicious logs
          </div>
        </div>

        <div className="space-y-2.5">
          {SIMULATED_LOGS.map((entry) => {
            const wasClicked = clickedIds.includes(entry.id);
            const showTeacherHighlight = progress.mode === 'teacher' && entry.suspicious;

            let rowStyle =
              'border-slate-700/70 bg-slate-900/70 hover:border-cyan-400/50 hover:bg-slate-800/80';
            if (wasClicked) {
              rowStyle = entry.suspicious
                ? 'border-rose-400/70 bg-rose-950/35'
                : 'border-emerald-400/50 bg-emerald-950/25';
            } else if (showTeacherHighlight) {
              rowStyle = 'border-violet-400/70 bg-violet-950/30';
            }

            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => handleLogClick(entry)}
                className={`w-full rounded-xl border p-4 text-left transition-colors ${rowStyle}`}
              >
                <div className="grid items-center gap-2 text-xs sm:grid-cols-5 sm:text-sm">
                  <div>
                    <span className="block text-[10px] tracking-wider text-slate-400 uppercase">
                      USER
                    </span>
                    <span className="font-mono font-semibold text-white">{entry.user}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-wider text-slate-400 uppercase">
                      ACTION
                    </span>
                    <span className="text-slate-200">{entry.action}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-wider text-slate-400 uppercase">
                      TIME
                    </span>
                    <span className="font-mono text-slate-200">{entry.time}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-wider text-slate-400 uppercase">
                      LOCATION
                    </span>
                    <span className="text-slate-200">{entry.location}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 sm:justify-end">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        entry.result === 'SUCCESS'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {entry.result}
                    </span>
                    {wasClicked &&
                      (entry.suspicious ? (
                        <AlertTriangle className="h-4 w-4 text-rose-400" aria-hidden="true" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                      ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-4">
          {lastFeedback && (
            <div
              className={`rounded-xl border p-4 text-sm ${
                lastFeedback.suspicious
                  ? 'border-rose-400/50 bg-rose-950/35 text-rose-100'
                  : 'border-emerald-400/40 bg-emerald-950/30 text-emerald-100'
              }`}
            >
              <p className="font-bold">
                {lastFeedback.suspicious ? '🚨 Suspicious Activity Found!' : '✅ Normal Activity'}
              </p>
              <p className="mt-1">{lastFeedback.reason}</p>
            </div>
          )}

          {foundSuspiciousCount === suspiciousLogs.length && (
            <p className="mt-3 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-200">
              🎉 Great detective work! You spotted all 3 suspicious audit log entries (+20 pts).
            </p>
          )}
        </div>
      </section>

      <QuickCheck
        id="m2-check"
        question="Which of these audit log entries looks MOST suspicious?"
        options={[
          'USER: unknown-user | ACTION: Failed Login | TIME: 02:13 AM | LOCATION: Unknown',
          'USER: rahul@example.com | ACTION: Login | TIME: 10:42 AM | LOCATION: Chennai',
        ]}
        correctIndex={0}
        explanation="An unknown user failing to log in at 2:13 AM from an unknown location is a classic warning sign."
      />
    </div>
  );
}
