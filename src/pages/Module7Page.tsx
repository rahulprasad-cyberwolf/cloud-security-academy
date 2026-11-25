import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';
import { CheckCircle2 } from 'lucide-react';

interface RoleAssignment {
  name: string;
  job: string;
  avatar: string;
  correctRole: string;
  allowedResources: string[];
}

const EMPLOYEES: RoleAssignment[] = [
  { name: 'Priya', job: 'Developer', avatar: '👩‍💻', correctRole: 'Developer', allowedResources: ['Dev Code Repo', 'Test Database', 'Application Logs'] },
  { name: 'Kavita', job: 'HR Manager', avatar: '👩‍💼', correctRole: 'HR Manager', allowedResources: ['Employee Records', 'Payroll Docs'] },
  { name: 'Sanjay', job: 'Cloud Admin', avatar: '👨‍💼', correctRole: 'Admin', allowedResources: ['IAM User Management', 'Cloud Billing', 'Master Security Policies'] },
];

const ROLES = ['Developer', 'HR Manager', 'Admin'];

export function Module7Page() {
  const { recordChallengeSuccess } = useCourse();
  const [assignedRoles, setAssignedRoles] = useState<Record<string, string>>({});

  const handleAssignRole = (empName: string, role: string) => {
    const updated = { ...assignedRoles, [empName]: role };
    setAssignedRoles(updated);
    if (Object.keys(updated).length === EMPLOYEES.length) {
      const allCorrect = EMPLOYEES.every((e) => updated[e.name] === e.correctRole);
      if (allCorrect) {
        recordChallengeSuccess('m7-role-assignment', 25, 'lab-roles');
      }
    }
  };

  const allAssignedCorrect = EMPLOYEES.every((e) => assignedRoles[e.name] === e.correctRole);

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Identity & Access Management (IAM)
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Who can access the cloud? What can they access? What actions can they take?
          <br />
          <strong className="text-cyan-300">USER ➔ LOGIN ➔ IDENTITY ➔ ROLE ➔ PERMISSION ➔ RESOURCE</strong>
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-950/20 p-3.5">
            <p className="text-xs font-bold text-cyan-300">1. IDENTITY</p>
            <p className="mt-1 text-xs text-slate-200">The digital identity (e.g. priya@company.com).</p>
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-amber-950/20 p-3.5">
            <p className="text-xs font-bold text-amber-300">2. ROLE</p>
            <p className="mt-1 text-xs text-slate-200">Job position grouping permissions (Developer, HR, Admin).</p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-950/20 p-3.5">
            <p className="text-xs font-bold text-emerald-300">3. PERMISSIONS</p>
            <p className="mt-1 text-xs text-slate-200">Specific rights granted (Read code, Write data, Manage users).</p>
          </div>
        </div>
      </header>

      {/* Large SVG: USER -> LOGIN -> IDENTITY -> ROLE -> PERMISSION -> RESOURCE */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">The Complete IAM Flow</h2>
        <p className="text-xs text-slate-400 mb-4">Every cloud request passes through these 6 distinct security gates.</p>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="IAM Flow: User to Login to Identity to Role to Permission to Resource"
            viewBox="0 0 780 110"
            className="h-auto w-full"
          >
            {[
              { label: 'USER', sub: 'Employee / Dev', color: '#38bdf8' },
              { label: 'LOGIN', sub: 'Submits Credentials', color: '#818cf8' },
              { label: 'IDENTITY', sub: 'Verified Account', color: '#34d399' },
              { label: 'ROLE', sub: 'Job Function', color: '#fbbf24' },
              { label: 'PERMISSION', sub: 'Read / Write', color: '#fb7185' },
              { label: 'RESOURCE', sub: 'Dev App / DB', color: '#22d3ee' },
            ].map((node, idx) => {
              const x = 12 + idx * 128;
              return (
                <g key={node.label}>
                  <rect x={x} y={18} width="108" height="74" rx="12" fill="#0f172a" stroke={node.color} strokeWidth="2" />
                  <text x={x + 54} y={50} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                    {node.label}
                  </text>
                  <text x={x + 54} y={70} textAnchor="middle" fill={node.color} fontSize="9">
                    {node.sub}
                  </text>
                  {idx < 5 && (
                    <line x1={x + 108} y1={55} x2={x + 128} y2={55} stroke="#22d3ee" strokeWidth="2.5" className="animate-flow" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Interactive Activity: Give the Correct Access */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Interactive Activity: Give the Correct Access</h2>
            <p className="text-xs text-slate-400">Assign the appropriate Role to each employee so they get only the resources they need.</p>
          </div>
          <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
            Assigned: {Object.keys(assignedRoles).length} / {EMPLOYEES.length}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {EMPLOYEES.map((emp) => {
            const currentRole = assignedRoles[emp.name];
            const isCorrect = currentRole === emp.correctRole;
            return (
              <div
                key={emp.name}
                className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  currentRole
                    ? isCorrect
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : 'border-rose-500/50 bg-rose-950/20'
                    : 'border-slate-700 bg-slate-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{emp.avatar}</span>
                    <div>
                      <h3 className="text-base font-bold text-white">{emp.name}</h3>
                      <p className="text-xs text-cyan-300 font-semibold">{emp.job}</p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl bg-slate-950/70 p-3 text-xs">
                    <p className="text-slate-400 uppercase font-bold text-[10px]">Needed Resources:</p>
                    <ul className="mt-1 space-y-0.5 text-slate-200">
                      {emp.allowedResources.map((res) => (
                        <li key={res}>• {res}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase mb-1.5">Select Role:</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {ROLES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleAssignRole(emp.name, r)}
                        className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                          currentRole === r
                            ? r === emp.correctRole
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-rose-500 text-white'
                            : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-cyan-400'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  {currentRole && (
                    <p className="mt-2 text-[11px] text-center font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-400">✅ Correct Role Assigned</span>
                      ) : (
                        <span className="text-rose-400">⚠️ Wrong Role! Check Least Privilege</span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allAssignedCorrect && (
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            Awesome! You assigned the exact right roles without granting excessive permissions. (+25 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Identity & Access Management (IAM)"
        whatIsIt="The cloud control plane managing identities, roles, and resource access policies."
        whyItMatters="Without IAM, anyone with a valid link could alter databases, delete files, or read employee information."
        simpleExample="Assigning Priya a Developer role instead of giving her root administrator keys."
        analogy="A corporate badge system: an engineer's badge opens the server room and labs, but not the executive vault."
      />

      <QuickCheck
        id="m7-q1"
        question="Why should a Developer NOT be assigned the Full Admin role?"
        options={[
          'To follow Least Privilege: if their account is compromised, the attacker cannot delete the entire cloud environment',
          'Because developers do not know how to write code',
          'Because cloud providers charge 10x more for admin accounts',
        ]}
        correctIndex={0}
        explanation="Limiting permissions protects the entire organization against stolen credentials and accidental mistakes."
      />
    </div>
  );
}
