import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';
import { CheckCircle2 } from 'lucide-react';

interface LogTypeInfo {
  id: string;
  name: string;
  icon: string;
  recordsWhat: string;
  realExample: string;
  whyInvestigatorUsesIt: string;
}

const LOG_TYPES_LIST: LogTypeInfo[] = [
  {
    id: 'auth',
    name: 'Authentication Logs',
    icon: '🔑',
    recordsWhat: 'User sign-ins, failed login attempts, MFA challenges, logouts',
    realExample: 'User rahul@example.com logged in successfully from Chennai at 10:42 AM',
    whyInvestigatorUsesIt: 'Identifies brute force password guessing, credential stuffing, and unusual login locations.',
  },
  {
    id: 'audit',
    name: 'Audit Logs',
    icon: '📜',
    recordsWhat: 'Administrative actions, IAM permission updates, policy alterations, new user creations',
    realExample: 'Admin upgraded user account to Master Admin role at 02:14 AM',
    whyInvestigatorUsesIt: 'Proves WHO made high-privilege configuration changes and WHEN.',
  },
  {
    id: 'app',
    name: 'Application Logs',
    icon: '💻',
    recordsWhat: 'Errors inside web apps, user feature clicks, database queries, file downloads',
    realExample: 'Web portal reported 500 Internal Server Error when querying student list',
    whyInvestigatorUsesIt: 'Tracks software vulnerabilities, data injection attempts, and user interactions inside the app.',
  },
  {
    id: 'network',
    name: 'Network Logs (VPC Flow)',
    icon: '🌐',
    recordsWhat: 'IP addresses, ports, protocols, bytes transferred, blocked connections',
    realExample: 'Inbound connection from IP 45.33.32.156 on Port 22 (SSH) accepted (450 KB data transferred)',
    whyInvestigatorUsesIt: 'Detects large data exfiltration, port scanning, and suspicious external IP connections.',
  },
  {
    id: 'system',
    name: 'System Logs',
    icon: '🖥️',
    recordsWhat: 'Operating system events, CPU spikes, server restarts, disk space warnings',
    realExample: 'Virtual server restarted unexpectedly due to out-of-memory kernel panic',
    whyInvestigatorUsesIt: 'Identifies system crashes, malware executing on virtual machines, and hardware stress.',
  },
  {
    id: 'security',
    name: 'Security Logs',
    icon: '🛡️',
    recordsWhat: 'Firewall blocks, intrusion detection triggers, leaked secret alerts',
    realExample: 'Cloud WAF blocked SQL injection attempt on login endpoint',
    whyInvestigatorUsesIt: 'Directly flags known attack patterns and automated threat scanner detections.',
  },
];

interface ExplorerScenario {
  id: string;
  question: string;
  correctLogType: string;
}

const EXPLORER_SCENARIOS: ExplorerScenario[] = [
  { id: 's1', question: 'An attacker guessed passwords 20 times in 2 minutes. Which log captures this?', correctLogType: 'auth' },
  { id: 's2', question: 'An admin account changed storage bucket permissions from Private to Public. Which log records this?', correctLogType: 'audit' },
  { id: 's3', question: '10 Gigabytes of data was sent to an unknown foreign IP address. Which log reveals the IP & bytes transferred?', correctLogType: 'network' },
  { id: 's4', question: 'A web portal threw an unhandled SQL error when a user typed single quotes into search. Which log shows this?', correctLogType: 'app' },
];

export function LogTypesPage() {
  const { recordChallengeSuccess } = useCourse();
  const [selectedType, setSelectedType] = useState<LogTypeInfo>(LOG_TYPES_LIST[0]);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, string>>({});

  const handleScenarioMatch = (scenarioId: string, logTypeId: string) => {
    const updated = { ...scenarioAnswers, [scenarioId]: logTypeId };
    setScenarioAnswers(updated);
    if (Object.keys(updated).length === EXPLORER_SCENARIOS.length) {
      const allCorrect = EXPLORER_SCENARIOS.every((s) => updated[s.id] === s.correctLogType);
      if (allCorrect) {
        recordChallengeSuccess('log-types-matching-lab', 25, 'lab-log-types');
      }
    }
  };

  const answeredCount = Object.keys(scenarioAnswers).length;
  const allCorrect = answeredCount === EXPLORER_SCENARIOS.length && EXPLORER_SCENARIOS.every((s) => scenarioAnswers[s.id] === s.correctLogType);

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Types of Cloud Logs
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Clouds generate different logs for different layers of the technology stack.
          <br />
          Understanding which log to inspect turns an overwhelming investigation into a fast, targeted search.
        </p>
      </header>

      {/* 6 Log Types Cards */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">The 6 Essential Cloud Log Categories</h2>
        <p className="text-xs text-slate-400 mb-4">Click each category to learn what it records and how investigators use it.</p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LOG_TYPES_LIST.map((lt) => {
            const isSelected = selectedType.id === lt.id;
            return (
              <button
                key={lt.id}
                type="button"
                onClick={() => setSelectedType(lt)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{lt.icon}</span>
                  <h3 className="text-sm font-bold text-white">{lt.name}</h3>
                </div>
                <p className="mt-2 text-xs text-slate-300 line-clamp-2">{lt.recordsWhat}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Log Inspector */}
        <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950/90 p-5">
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="text-2xl">{selectedType.icon}</span>
            <h3 className="text-base font-bold text-white">{selectedType.name}</h3>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Records What:</span>
              <p className="mt-1 text-slate-200">{selectedType.recordsWhat}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <span className="text-[10px] font-bold uppercase text-cyan-400 block">Real Log Example:</span>
              <p className="mt-1 font-mono text-cyan-200">{selectedType.realExample}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <span className="text-[10px] font-bold uppercase text-emerald-400 block">Why Investigators Use It:</span>
              <p className="mt-1 text-slate-200">{selectedType.whyInvestigatorUsesIt}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Log Explorer: Match scenario to log type */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Interactive Log Explorer: Match Scenario to Log Type</h2>
            <p className="text-xs text-slate-400">Which log type would you inspect first to investigate each situation?</p>
          </div>
          <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
            Answered: {answeredCount} / {EXPLORER_SCENARIOS.length}
          </span>
        </div>

        <div className="space-y-4">
          {EXPLORER_SCENARIOS.map((scenario) => {
            const currentChoice = scenarioAnswers[scenario.id];
            return (
              <div key={scenario.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-bold text-white">{scenario.question}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {LOG_TYPES_LIST.slice(0, 4).map((lt) => (
                    <button
                      key={lt.id}
                      type="button"
                      onClick={() => handleScenarioMatch(scenario.id, lt.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        currentChoice === lt.id
                          ? lt.id === scenario.correctLogType
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-rose-500 text-white font-bold'
                          : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-cyan-400'
                      }`}
                    >
                      {lt.icon} {lt.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {allCorrect && (
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            Spot on! You matched every scenario to the right log source! (+25 pts)
          </p>
        )}
      </section>

      <ConceptCard
        title="Types of Cloud Logs"
        whatIsIt="Distinct logging streams capturing authentication, administrative changes, application requests, and network packets."
        whyItMatters="Searching the wrong log wastes critical hours during an active cyber security investigation."
        simpleExample="To find who changed permissions, check Audit Logs. To find password attacks, check Authentication Logs."
        analogy="Medical tests: an X-ray checks bones, a blood test checks infection, and an ECG checks heart rhythms."
      />

      <QuickCheck
        id="log-types-q1"
        question="Which log stream contains IP addresses, ports, and bytes transferred across the cloud virtual network?"
        options={[
          'Network Logs (VPC Flow Logs)',
          'Authentication Logs',
          'Application HTML Error Logs',
        ]}
        correctIndex={0}
        explanation="Network logs track the packet flow: source IP, destination IP, port, and transfer volumes."
      />
    </div>
  );
}
