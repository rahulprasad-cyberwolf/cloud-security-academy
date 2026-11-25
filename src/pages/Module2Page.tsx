import { AlertTriangle, Shield, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

interface AccessRow {
  id: string;
  user: string;
  role: string;
  permission: string;
  status: 'Required' | 'Review';
  unnecessary: boolean;
  resource: string;
  explanation: string;
}

const ACCESS_ROWS: AccessRow[] = [
  {
    id: 'u1',
    user: 'Rahul',
    role: 'Developer',
    permission: 'Read + Write',
    status: 'Required',
    unnecessary: false,
    resource: 'Dev App',
    explanation: 'Rahul is an active Developer who needs Read + Write on Dev App.',
  },
  {
    id: 'u2',
    user: 'Arun',
    role: 'Tester',
    permission: 'Read',
    status: 'Required',
    unnecessary: false,
    resource: 'Test Reports',
    explanation: 'Arun is an active Tester who only needs Read access.',
  },
  {
    id: 'u3',
    user: 'OldUser',
    role: 'Admin',
    permission: 'Full Access',
    status: 'Review',
    unnecessary: true,
    resource: 'All Cloud Resources',
    explanation: 'Unnecessary Admin access! OldUser should be reviewed and removed.',
  },
  {
    id: 'u4',
    user: 'GuestUser',
    role: 'Admin',
    permission: 'Full Access',
    status: 'Review',
    unnecessary: true,
    resource: 'All Cloud Resources',
    explanation: 'Dangerous! A GuestUser should NEVER have Admin Full Access.',
  },
];

export function Module2Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<AccessRow | null>(null);
  const isTeacher = progress.mode === 'teacher';

  const targets = ACCESS_ROWS.filter((r) => r.unnecessary);
  const foundCount = targets.filter((t) => flagged[t.id]).length;

  const handleToggleFlag = (row: AccessRow) => {
    setFeedback(row);
    const next = { ...flagged, [row.id]: !flagged[row.id] };
    setFlagged(next);
    if (next['u3'] && next['u4'] && !next['u1'] && !next['u2']) {
      recordChallengeSuccess('m2-access-review', 20, 'lab-access-review');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Access Review
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          An <strong className="text-cyan-300">Access Review</strong> checks who has access to
          cloud resources—especially spotting who should NOT have Admin access.
        </p>
      </header>

      {/* SVG showing users connected to different cloud resources */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">
          Users Connected to Cloud Resources
        </h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Diagram showing Rahul connected to Dev App, Arun connected to Test Reports, and OldUser and GuestUser connected to All Cloud Resources"
            viewBox="0 0 720 180"
            className="h-auto w-full"
          >
            {ACCESS_ROWS.map((r, idx) => {
              const y = 16 + idx * 40;
              const stroke = r.unnecessary ? '#fb7185' : '#34d399';
              return (
                <g key={r.id}>
                  <rect x="20" y={y} width="160" height="30" rx="8" fill="#0f172a" stroke={stroke} strokeWidth="1.8" />
                  <text x="100" y={y + 19} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                    {r.user} ({r.role})
                  </text>
                  <line x1="180" y1={y + 15} x2="460" y2={y + 15} stroke={stroke} strokeWidth="2" className="animate-flow" />
                  <rect x="460" y={y} width="230" height="30" rx="8" fill="#0f172a" stroke={stroke} strokeWidth="1.8" />
                  <text x="575" y={y + 19} textAnchor="middle" fill={r.unnecessary ? '#fda4af' : '#6ee7b7'} fontSize="11" fontWeight="700">
                    {r.resource} ({r.permission})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Fictional Access-Control Dashboard */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">
              Access Review Activity: Identify Who Needs Review
            </h2>
            <p className="text-sm text-slate-400">
              Click <strong>“Flag for Review”</strong> on the 2 accounts that should NOT have Admin
              access.
            </p>
          </div>
          <span className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200">
            Found: {foundCount} / {targets.length}
          </span>
        </div>

        <div tabIndex={0} role="region" aria-labelledby="access-review-caption" className="table-wrapper rounded-xl border border-slate-800 bg-slate-950/70">
          <table className="responsive-access-table text-left text-sm">
            <caption id="access-review-caption" className="visually-hidden">Access review dashboard</caption>
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
                        <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
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
        title="Why Regular Access Reviews Matter"
        whatIsIt="Checking user roles and permissions periodically to remove unnecessary or old Admin access."
        whyItMatters="Unused old accounts and guest Admin accounts are easy targets for attackers."
        simpleExample="Flagging OldUser and GuestUser while keeping Rahul (Developer) and Arun (Tester)."
        analogy="Checking the building guest list and taking back keys from people who no longer work there."
        expectedAnswer="OldUser and GuestUser should be reviewed and removed from Admin."
      />

      <QuickCheck
        id="m2-q1"
        question="Which accounts in our Access Review table should NOT have Admin Full Access?"
        options={['OldUser and GuestUser', 'Rahul and Arun']}
        correctIndex={0}
        explanation="OldUser and GuestUser have Full Admin Access that is not required."
      />
    </div>
  );
}
