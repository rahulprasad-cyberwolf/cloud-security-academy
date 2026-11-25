import { CheckCircle2, Home } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

interface HousePart {
  id: string;
  label: string;
  mapsTo: string;
  desc: string;
}

const HOUSE_PARTS: HousePart[] = [
  { id: 'door', label: 'Door', mapsTo: 'Access', desc: 'Controls who can enter your cloud house (like login & firewall rules).' },
  { id: 'window', label: 'Window', mapsTo: 'Monitoring', desc: 'Lets you watch what is happening inside and outside continuously.' },
  { id: 'cctv', label: 'CCTV', mapsTo: 'Logging', desc: 'Records everyone who enters, exits, or opens a room.' },
  { id: 'key', label: 'Key', mapsTo: 'Secrets', desc: 'Passwords & API keys that must stay locked in a vault, not under the mat.' },
  { id: 'guest', label: 'Guest List', mapsTo: 'Permissions', desc: 'Lists who is allowed in which room (Least Privilege).' },
  { id: 'storage', label: 'Storage Room', mapsTo: 'Storage', desc: 'Where private files live—must stay locked unless meant to be public.' },
];

interface MisconfigLab {
  id: string;
  labNum: number;
  title: string;
  situation: string;
  settingText: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  recommendation: string;
}

const LABS: MisconfigLab[] = [
  {
    id: 'lab-1',
    labNum: 1,
    title: 'Public Storage Bucket',
    situation: 'A college app stores student ID card photos in "student-ids-bucket".',
    settingText: 'Public Access: ENABLED (Anyone on Internet)',
    question: 'What is the misconfiguration here?',
    choices: [
      'Private student photos are readable by anyone on the internet',
      'The bucket name uses hyphens',
      'Files are stored in a data center',
    ],
    correctIndex: 0,
    explanation: 'Making private storage public exposes sensitive student files to the entire world.',
    recommendation: 'Set Public Access to OFF (Private) and require login + permission.',
  },
  {
    id: 'lab-2',
    labNum: 2,
    title: 'Unnecessary Admin Permissions',
    situation: 'Every member of a 10-person student team—including testers and viewers—was given Admin.',
    settingText: 'Role for all 10 users: FULL ADMIN',
    question: 'Why is this a misconfiguration?',
    choices: [
      'Too many people have full control; one stolen account compromises everything',
      'Admins cannot log in during the daytime',
      'It makes the website colors look different',
    ],
    correctIndex: 0,
    explanation: 'Giving everyone Admin violates Least Privilege and increases blast radius.',
    recommendation: 'Assign Read or Read/Write based on actual job needs.',
  },
  {
    id: 'lab-3',
    labNum: 3,
    title: 'Logging Disabled',
    situation: 'Someone turned off Audit Logging to keep the dashboard quiet.',
    settingText: 'Cloud Audit Logs: DISABLED',
    question: 'What happens if a break-in occurs?',
    choices: [
      'You have zero record of who entered or what they touched',
      'The cloud automatically locks all hackers out',
      'Passwords become twice as long',
    ],
    correctIndex: 0,
    explanation: 'Without logs, you are blind—like unplugging your CCTV cameras.',
    recommendation: 'Keep Audit & Authentication Logging enabled at all times.',
  },
  {
    id: 'lab-4',
    labNum: 4,
    title: 'Old Employee Account Still Active',
    situation: 'An intern finished their project 6 months ago, but their account is still active.',
    settingText: 'OldIntern | Status: ACTIVE | Role: Admin',
    question: 'What is the risk?',
    choices: [
      'An unused old account with Admin access can be hijacked by attackers',
      'The account will automatically fix bugs',
      'There is no risk if they forgot the password',
    ],
    correctIndex: 0,
    explanation: 'Forgotten accounts are prime targets because nobody watches them.',
    recommendation: 'Run regular Access Reviews and disable accounts when people leave.',
  },
  {
    id: 'lab-5',
    labNum: 5,
    title: 'Secret Visible in Source Code',
    situation: 'A developer wrote API_KEY="DEMO-9988-SECRET" directly in a public webpage script.',
    settingText: 'config.js -> API_KEY = "DEMO-9988-SECRET"',
    question: 'What should you do?',
    choices: [
      'Move the key to a Secret Manager AND rotate (replace) the exposed key',
      'Leave it there and add a comment asking people not to copy it',
      'Change the variable name to MY_TEXT',
    ],
    correctIndex: 0,
    explanation: 'Anyone can view frontend code or GitHub repos and steal hardcoded keys.',
    recommendation: 'Use a Secret Manager and rotate any secret that was ever exposed.',
  },
];

export function Module6Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [selectedHouse, setSelectedHouse] = useState<HousePart>(HOUSE_PARTS[0]);
  const [labAnswers, setLabAnswers] = useState<Record<string, number>>({});
  const isTeacher = progress.mode === 'teacher';

  const handleLabAnswer = (lab: MisconfigLab, idx: number) => {
    setLabAnswers((prev) => ({ ...prev, [lab.id]: idx }));
    if (idx === lab.correctIndex) {
      recordChallengeSuccess(`m6-${lab.id}`, 15, lab.id);
    }
  };

  const solvedLabs = LABS.filter((l) => labAnswers[l.id] === l.correctIndex).length;

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Module 6: Cloud Misconfigurations & 5 Beginner Labs
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong className="text-rose-300">
            “Misconfiguration means a cloud setting is configured incorrectly.”
          </strong>{' '}
          Like accidentally leaving your front door unlocked—even the strongest house isn’t safe if
          the door is left wide open!
        </p>
      </header>

      {/* 14. Giant Interactive "Cloud Security House" SVG */}
      <section className="glass-card rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2">
          <Home className="h-5 w-5 text-cyan-300" aria-hidden="true" />
          <h2 className="text-lg font-bold text-white">
            Interactive Cloud Security House: Click Each Part
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <svg
            role="img"
            aria-label="Cloud Security House diagram mapping Door, Window, CCTV, Key, Guest List, and Storage Room to cloud security controls"
            viewBox="0 0 720 220"
            className="h-auto w-full"
          >
            {/* House outline */}
            <polygon points="360,14 140,86 580,86" fill="rgba(34,211,238,0.10)" stroke="#38bdf8" strokeWidth="2.5" />
            <rect x="165" y="86" width="390" height="120" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            {/* Door */}
            <rect x="332" y="132" width="56" height="74" rx="4" fill={selectedHouse.id === 'door' ? '#22d3ee' : '#1e293b'} stroke="#22d3ee" strokeWidth="2" />
            <text x="360" y="172" textAnchor="middle" fill={selectedHouse.id === 'door' ? '#060b14' : '#e2e8f0'} fontSize="11" fontWeight="700">Door</text>
            {/* Window */}
            <rect x="200" y="112" width="68" height="44" rx="4" fill={selectedHouse.id === 'window' ? '#fbbf24' : '#1e293b'} stroke="#fbbf24" strokeWidth="2" />
            <text x="234" y="138" textAnchor="middle" fill={selectedHouse.id === 'window' ? '#060b14' : '#e2e8f0'} fontSize="11" fontWeight="700">Window</text>
            {/* Storage Room */}
            <rect x="452" y="112" width="80" height="58" rx="4" fill={selectedHouse.id === 'storage' ? '#34d399' : '#1e293b'} stroke="#34d399" strokeWidth="2" />
            <text x="492" y="145" textAnchor="middle" fill={selectedHouse.id === 'storage' ? '#060b14' : '#e2e8f0'} fontSize="10.5" fontWeight="700">Storage</text>
            {/* CCTV */}
            <circle cx="150" cy="78" r="14" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
            <text x="150" y="82" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="700">CCTV</text>
            {/* Key & Guest List badges */}
            <rect x="26" y="110" width="110" height="36" rx="8" fill="#0f172a" stroke="#a78bfa" strokeWidth="1.8" />
            <text x="81" y="132" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="700">🔑 Key (Secrets)</text>
            <rect x="584" y="110" width="116" height="36" rx="8" fill="#0f172a" stroke="#fb7185" strokeWidth="1.8" />
            <text x="642" y="132" textAnchor="middle" fill="#e2e8f0" fontSize="10.5" fontWeight="700">📋 Guest List</text>
          </svg>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {HOUSE_PARTS.map((hp) => (
              <button
                key={hp.id}
                type="button"
                onClick={() => setSelectedHouse(hp)}
                aria-pressed={selectedHouse.id === hp.id}
                className={`min-h-[40px] rounded-xl border px-3 py-2 text-xs font-semibold ${
                  selectedHouse.id === hp.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400/50'
                }`}
              >
                {hp.label} → {hp.mapsTo}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-3 rounded-xl border border-cyan-500/30 bg-slate-900/90 p-3.5 text-sm">
            <strong className="text-cyan-300">
              {selectedHouse.label} = {selectedHouse.mapsTo}:
            </strong>{' '}
            <span className="text-slate-100">{selectedHouse.desc}</span>
          </div>
        </div>
      </section>

      {/* 15. 5 Beginner "Spot the Misconfiguration" Labs */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-white">
            5 “Spot the Misconfiguration” Beginner Labs
          </h2>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            Labs Solved: {solvedLabs} / {LABS.length}
          </span>
        </div>

        {LABS.map((lab) => {
          const picked = labAnswers[lab.id];
          const isCorrect = picked === lab.correctIndex;
          const showResult = picked !== undefined || isTeacher;

          return (
            <article key={lab.id} className="glass-card rounded-2xl p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-bold text-cyan-200">
                  LAB {lab.labNum}: {lab.title}
                </span>
                {isCorrect && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Solved
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-200">{lab.situation}</p>
              <div className="my-3 rounded-xl border border-amber-400/30 bg-slate-950 px-3.5 py-2.5 font-mono text-xs text-amber-200">
                Simulated Config: {lab.settingText}
              </div>

              <p className="mb-2 text-sm font-semibold text-white">{lab.question}</p>
              <div className="space-y-2">
                {lab.choices.map((ch, idx) => {
                  const selected = picked === idx;
                  const teacherKey = isTeacher && idx === lab.correctIndex;
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => handleLabAnswer(lab, idx)}
                      aria-pressed={selected}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-left text-xs sm:text-sm transition-colors ${
                        teacherKey
                          ? 'border-emerald-400/70 bg-emerald-500/15 text-emerald-100'
                          : selected
                            ? idx === lab.correctIndex
                              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                              : 'border-rose-400 bg-rose-500/20 text-rose-100'
                            : 'border-slate-700 bg-slate-900/70 text-slate-200 hover:border-cyan-400/50'
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-xs leading-relaxed">
                  <p className="text-slate-200">
                    <strong className="text-cyan-300">Explanation:</strong> {lab.explanation}
                  </p>
                  <p className="mt-1 text-emerald-300">
                    <strong>Security Recommendation:</strong> {lab.recommendation}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </section>

      <ConceptCard
        title="Remember: Misconfigurations Are Preventable"
        whatIsIt="A misconfiguration is simply a setting left open or too weak."
        whyItMatters="Most cloud leaks happen from simple setup mistakes, not advanced hacking."
        simpleExample="Public storage bucket, logging turned off, or old employee account still active."
        analogy="Locking the front door but leaving the backyard gate wide open."
      />

      <QuickCheck
        id="m6-q1"
        question="In our Cloud Security House, what does the CCTV camera represent?"
        options={['Logging', 'Storage', 'Compute', 'Passwords']}
        correctIndex={0}
        explanation="CCTV represents Logging—recording everything that happens."
      />
    </div>
  );
}
