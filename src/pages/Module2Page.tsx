import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

interface AccessUser {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Former Employee' | 'Developer';
  permission: string;
  lastActive: string;
  shouldInvestigate: boolean;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
  actionRequired: string;
}

const DASHBOARD_USERS: AccessUser[] = [
  {
    id: 'user_a',
    name: 'User A (Priya)',
    role: 'Active Developer',
    status: 'Active',
    permission: 'Developer (Read/Write Dev Code)',
    lastActive: 'Today at 10:15 AM',
    shouldInvestigate: false,
    priority: 'Low',
    reason: 'Normal: Active employee with appropriate developer permissions.',
    actionRequired: 'No action needed. Keep current access.',
  },
  {
    id: 'user_b',
    name: 'User B (Arun)',
    role: 'Former Employee',
    status: 'Former Employee',
    permission: 'Master Admin Access',
    lastActive: 'Left company 3 months ago; Login yesterday at 11:45 PM',
    shouldInvestigate: true,
    priority: 'High',
    reason: 'CRITICAL! Left the company 3 months ago but still holds full Admin rights and shows recent activity!',
    actionRequired: 'Immediately revoke credentials and investigate all activity logs.',
  },
  {
    id: 'user_c',
    name: 'User C (Deepak)',
    role: 'Junior Frontend Dev',
    status: 'Developer',
    permission: 'Full Cloud Admin + Production DB Write',
    lastActive: 'Active today',
    shouldInvestigate: true,
    priority: 'High',
    reason: 'VIOLATION! A junior frontend developer has Full Admin and Production DB Write privileges.',
    actionRequired: 'Downgrade to Developer role and strip Production Admin rights.',
  },
];

export function Module2Page() {
  const { recordChallengeSuccess } = useCourse();
  const [selectedUser, setSelectedUser] = useState<AccessUser>(DASHBOARD_USERS[1]);
  const [reviewedUsers, setReviewedUsers] = useState<Record<string, boolean>>({});
  const [firstInvestigateChoice, setFirstInvestigateChoice] = useState<string | null>(null);

  const handleSelectFirstInvestigate = (userId: string) => {
    setFirstInvestigateChoice(userId);
    if (userId === 'user_b') {
      recordChallengeSuccess('access-review-first-choice', 25, 'lab-access-review');
    }
  };

  const handleAction = (userId: string) => {
    setReviewedUsers((prev) => ({ ...prev, [userId]: true }));
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Access Review
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Over time, permissions accumulate. Employees switch teams, contractors leave, and unused admin accounts linger.
          <br />
          An <strong className="text-cyan-300">Access Review</strong> is a scheduled audit to answer: <em>"Does this person still need this access today?"</em>
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-cyan-400/30 bg-slate-900/60 p-3">
            <p className="text-xs font-bold text-cyan-300">RULE 1</p>
            <p className="mt-1 text-xs text-slate-200">Remove access immediately when employees leave.</p>
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-slate-900/60 p-3">
            <p className="text-xs font-bold text-amber-300">RULE 2</p>
            <p className="mt-1 text-xs text-slate-200">Adjust roles when someone switches teams or projects.</p>
          </div>
          <div className="rounded-xl border border-rose-400/30 bg-slate-900/60 p-3">
            <p className="text-xs font-bold text-rose-300">RULE 3</p>
            <p className="mt-1 text-xs text-slate-200">Strip excessive Admin rights from developers & guests.</p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-950/20 p-3">
            <p className="text-xs font-bold text-emerald-300">RULE 4</p>
            <p className="mt-1 text-xs text-slate-200">Run periodic audits (e.g. monthly or quarterly).</p>
          </div>
        </div>
      </header>

      {/* Access Review Dashboard */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Live Access Review Dashboard</h2>
            <p className="text-xs text-slate-400">Review the three accounts below. Click on any account to inspect details.</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {DASHBOARD_USERS.map((user) => {
            const isSelected = selectedUser.id === user.id;
            const isResolved = reviewedUsers[user.id];
            return (
              <button
                key={user.id}
                type="button"
                onClick={() => setSelectedUser(user)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{user.name}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      user.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-cyan-200">{user.permission}</p>
                <p className="mt-1 text-[11px] text-slate-400">Last active: {user.lastActive}</p>
                {isResolved && (
                  <p className="mt-2 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Remediated
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected User Detail Card */}
        <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950/90 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white">{selectedUser.name} — Full Details</h3>
              <p className="text-xs text-cyan-300">{selectedUser.role} • Permission: {selectedUser.permission}</p>
            </div>
            {selectedUser.shouldInvestigate && (
              <button
                type="button"
                onClick={() => handleAction(selectedUser.id)}
                className="rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs px-4 py-2 transition-all"
              >
                {reviewedUsers[selectedUser.id] ? 'Access Revoked ✓' : 'Revoke & Fix Access Now'}
              </button>
            )}
          </div>

          <div className="mt-3 rounded-xl bg-slate-900/80 p-3 text-xs space-y-1">
            <p className="text-slate-200"><strong>Assessment:</strong> {selectedUser.reason}</p>
            <p className="text-amber-300"><strong>Action Required:</strong> {selectedUser.actionRequired}</p>
          </div>
        </div>
      </section>

      {/* Interactive Question: Which account should be investigated first? */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Classroom Decision: Which Account Should Be Investigated First?</h2>
        <p className="text-xs text-slate-400 mb-4">Select the account posing the highest and most immediate security danger.</p>

        <div className="space-y-2">
          {DASHBOARD_USERS.map((user) => {
            const isPicked = firstInvestigateChoice === user.id;
            return (
              <button
                key={user.id}
                type="button"
                onClick={() => handleSelectFirstInvestigate(user.id)}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  isPicked
                    ? user.id === 'user_b'
                      ? 'border-emerald-500 bg-emerald-950/30 text-emerald-200'
                      : 'border-rose-500 bg-rose-950/30 text-rose-200'
                    : 'border-slate-800 bg-slate-900/60 hover:border-cyan-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white">{user.name} ({user.status})</p>
                  <span className="text-[11px] text-slate-400">{user.permission}</span>
                </div>
                <p className="mt-1 text-xs text-slate-300">{user.reason}</p>
              </button>
            );
          })}
        </div>

        {firstInvestigateChoice !== null && (
          <p className="mt-4 text-xs font-bold">
            {firstInvestigateChoice === 'user_b' ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Spot on! User B left the company 3 months ago. A login from a former employee with Master Admin rights at 11:45 PM is an emergency! (+25 pts)
              </span>
            ) : (
              <span className="text-rose-400">
                ⚠️ While User C has excessive permissions, User B is a former employee actively logging into Master Admin from outside the company—that requires immediate emergency containment first!
              </span>
            )}
          </p>
        )}
      </section>

      <ConceptCard
        title="Access Review"
        whatIsIt="A recurring security audit inspecting who has what access in the cloud environment."
        whyItMatters="Without access reviews, old accounts and unneeded admin rights remain open forever."
        simpleExample="Checking the office key register and disabling badges of employees who no longer work here."
        analogy="Auditing a hotel master key register: retrieving keys from guests who checked out last week."
      />

      <QuickCheck
        id="access-rev-q1"
        question="What should happen to an employee's cloud credentials when they depart the company?"
        options={[
          'Revoke and disable all accounts immediately on their last day',
          'Leave the account active in case they want to log in next year',
          'Upgrade their account to Master Administrator',
        ]}
        correctIndex={0}
        explanation="Forgotten active accounts of former employees are one of the most common causes of serious cloud breaches."
      />
    </div>
  );
}
