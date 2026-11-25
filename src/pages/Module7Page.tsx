import { AlertTriangle, Shield, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { DiscussionPrompt } from '../components/DiscussionPrompt';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

interface AccessRow {
  id: string;
  user: string;
  role: string;
  permission: string;
  status: 'Required' | '🚨 Review';
  unnecessary: boolean;
  explanation: string;
}

const ACCESS_ROWS: AccessRow[] = [
  { id: 'u1', user: 'Rahul', role: 'Developer', permission: 'Read/Write', status: 'Required', unnecessary: false, explanation: 'Rahul is an active Developer who needs Read/Write access.' },
  { id: 'u2', user: 'Arun', role: 'Tester', permission: 'Read', status: 'Required', unnecessary: false, explanation: 'Arun is an active Tester who only needs Read access.' },
  { id: 'u3', user: 'OldUser', role: 'Admin', permission: 'Full Access', status: '🚨 Review', unnecessary: true, explanation: 'OldUser should be reviewed and removed—they no longer need Full Admin Access!' },
];

export function Module7Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<AccessRow | null>(null);
  const [trimmedKeys, setTrimmedKeys] = useState(false);
  const isTeacher = progress.mode === 'teacher';

  const handleToggleFlag = (row: AccessRow) => {
    setFeedback(row);
    const next = { ...flagged, [row.id]: !flagged[row.id] };
    setFlagged(next);
    if (next['u3'] && !next['u1'] && !next['u2']) {
      recordChallengeSuccess('m7-access-review', 20, 'lab-access-review');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Section 4B: Access Control & Least Privilege (7 Minutes)
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Who can access your cloud, and what can they access?{' '}
          <strong className="text-cyan-300">USER → LOGIN → IDENTITY CHECK → PERMISSION CHECK → RESOURCE</strong>.
        </p>
      </header>

      {/* Least Privilege Classroom Analogy + Animated Keys SVG */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">
              Least Privilege: Classroom Analogy
            </h2>
            <p className="text-sm text-slate-300">
              “Give only the access someone actually needs.” A student needs the{' '}
              <strong>classroom door</strong>, NOT the Principal’s office, Server room, or Exam
              database!
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTrimmedKeys((v) => !v)}
            aria-pressed={trimmedKeys}
            className="min-h-[40px] rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
          >
            {trimmedKeys ? 'Show Too Much Access' : 'Apply Least Privilege (Remove Extra Keys)'}
          </button>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label={trimmedKeys ? 'Least privilege: student holds 1 classroom key' : 'Too much access: student holds 4 keys'}
            viewBox="0 0 720 120"
            className="h-auto w-full"
          >
            {[
              { label: '🏫 Classroom Door', needed: true },
              { label: '🏢 Principal Office', needed: false },
              { label: '🖥️ Server Room', needed: false },
              { label: '📝 Exam Database', needed: false },
            ].map((room, idx) => {
              const x = 14 + idx * 178;
              const hidden = trimmedKeys && !room.needed;
              return (
                <g key={room.label} opacity={hidden ? 0.2 : 1}>
                  <rect
                    x={x}
                    y={20}
                    width="160"
                    height="76"
                    rx="12"
                    fill={room.needed ? 'rgba(16,185,129,0.14)' : 'rgba(225,29,72,0.12)'}
                    stroke={room.needed ? '#34d399' : '#fb7185'}
                    strokeWidth="2"
                  />
                  <text x={x + 80} y={50} textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="700">{room.label}</text>
                  <text x={x + 80} y={72} textAnchor="middle" fill={room.needed ? '#6ee7b7' : '#fda4af'} fontSize="11" fontWeight="700">
                    {hidden ? '❌ Key Removed' : '🔑 Key Granted'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Interactive Access Review Activity */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-1 text-lg font-bold text-white">Access Review Activity: Who Should Be Reviewed?</h2>
        <p className="mb-4 text-sm text-slate-400">Click “Review User” on the account that has unnecessary Admin access.</p>

        <div tabIndex={0} role="region" aria-labelledby="access-table-caption" className="table-wrapper rounded-xl border border-slate-800 bg-slate-950/70">
          <table className="responsive-access-table text-left text-sm">
            <caption id="access-table-caption" className="visually-hidden">Employee access review table</caption>
            <thead className="bg-slate-900/95 text-xs tracking-wider text-slate-400 uppercase">
              <tr>
                <th scope="col" className="px-4 py-3">User</th>
                <th scope="col" className="px-4 py-3">Role</th>
                <th scope="col" className="px-4 py-3">Permission</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {ACCESS_ROWS.map((row) => {
                const isFlagged = Boolean(flagged[row.id]);
                const teacherHighlight = isTeacher && row.unnecessary;
                return (
                  <tr key={row.id} className={isFlagged || teacherHighlight ? 'bg-rose-950/25' : 'hover:bg-slate-900/50'}>
                    <th scope="row" className="px-4 py-3.5 font-semibold text-white">{row.user}</th>
                    <td data-label="Role" className="px-4 py-3.5 text-slate-300">{row.role}</td>
                    <td data-label="Permission" className="px-4 py-3.5 font-mono text-xs text-cyan-200">{row.permission}</td>
                    <td data-label="Status" className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${!row.unnecessary ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {!row.unnecessary ? <UserCheck className="h-3.5 w-3.5" aria-hidden="true" /> : <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />}
                        {row.status}
                      </span>
                    </td>
                    <td data-label="Action" className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleFlag(row)}
                        aria-pressed={isFlagged}
                        className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                          isFlagged ? 'border-rose-400 bg-rose-500/20 text-rose-100' : 'border-slate-700 bg-slate-900 text-slate-200'
                        }`}
                      >
                        <UserX className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{isFlagged ? 'Reviewed' : 'Review User'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div aria-live="polite" className="mt-3">
          {feedback && (
            <p className={`rounded-xl border p-3 text-sm ${feedback.unnecessary ? 'border-emerald-400/40 bg-emerald-950/30 text-emerald-200' : 'border-amber-400/40 bg-amber-950/25 text-amber-200'}`}>
              <Shield className="mr-1.5 inline h-4 w-4" aria-hidden="true" />
              {feedback.explanation}
            </p>
          )}
        </div>
      </section>

      <ConceptCard
        title="Access Control & Least Privilege"
        whatIsIt="Authentication checks who you are; Authorization checks what you can do; Least Privilege limits access to only what you need."
        whyItMatters="If everyone has Admin access, one mistake or stolen password can break the whole cloud."
        simpleExample="Arun (Tester) gets Read access; OldUser gets removed."
        analogy="A student only gets the classroom door key, not the principal's master key."
      />

      <DiscussionPrompt
        question="Should every employee have admin access?"
        expectedAnswer="No! Only 1–2 trusted admins need Admin access. Everyone else should follow Least Privilege (Read or Read/Write)."
      />

      <QuickCheck
        id="m7-q1"
        question="Which permission should a Tester (Arun) who only checks reports have?"
        options={['Read', 'Full Admin Access']}
        correctIndex={0}
        explanation="Read access follows Least Privilege—Arun can view reports without risking accidental changes."
      />
    </div>
  );
}
