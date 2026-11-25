import { AlertTriangle, CheckCircle2, Clock, Search } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

interface InvestigationEvent {
  id: string;
  time: string;
  title: string;
  clueLabel: string;
  noticePrompt: string;
  clueText: string;
  severity: 'warn' | 'danger' | 'alert';
}

const EVENTS: InvestigationEvent[] = [
  {
    id: 'e1',
    time: '01:58',
    title: 'Failed login',
    clueLabel: 'CLUE 1',
    noticePrompt: 'Why is a failed login at 1:58 AM worth noting?',
    clueText: 'CLUE 1: Someone tried to sign in at 1:58 AM from an unfamiliar IP address.',
    severity: 'warn',
  },
  {
    id: 'e2',
    time: '02:01',
    title: 'Failed login',
    clueLabel: 'CLUE 1',
    noticePrompt: 'It happened again 3 minutes later!',
    clueText: 'CLUE 1 (Continued): A second failed password attempt—this is not a single typo.',
    severity: 'warn',
  },
  {
    id: 'e3',
    time: '02:05',
    title: 'Failed login',
    clueLabel: 'CLUE 1',
    noticePrompt: 'Three failures in 7 minutes.',
    clueText: 'CLUE 1 (Pattern): Multiple failed logins show someone is actively guessing passwords.',
    severity: 'warn',
  },
  {
    id: 'e4',
    time: '02:13',
    title: 'Successful login',
    clueLabel: 'CLUE 2',
    noticePrompt: 'What do you notice at 02:13 AM?',
    clueText: 'CLUE 2: After 3 failures, the login suddenly SUCCEEDED at 2:13 AM!',
    severity: 'danger',
  },
  {
    id: 'e5',
    time: '02:14',
    title: 'Permission changed',
    clueLabel: 'CLUE 3',
    noticePrompt: 'Why did permissions change 1 minute after login?',
    clueText: 'CLUE 3: The account upgraded its own permissions to Admin to gain full control!',
    severity: 'danger',
  },
  {
    id: 'e6',
    time: '02:15',
    title: 'Security alert',
    clueLabel: 'CLUE 3',
    noticePrompt: 'How did the cloud react?',
    clueText: 'Alert Generated! Monitoring caught the failed logins + permission change.',
    severity: 'alert',
  },
  {
    id: 'e7',
    time: '02:18',
    title: 'Large data access',
    clueLabel: 'CLUE 4',
    noticePrompt: 'What happened 3 minutes later at 02:18 AM?',
    clueText: 'CLUE 4: Using the new Admin access, a large batch of private files was accessed!',
    severity: 'danger',
  },
];

export function Module8Page() {
  const { progress, recordChallengeSuccess } = useCourse();
  const [selectedId, setSelectedId] = useState<string>('e1');
  const [inspected, setInspected] = useState<Record<string, boolean>>({ e1: true });
  const [conclusionOpen, setConclusionOpen] = useState(false);

  const selected = EVENTS.find((e) => e.id === selectedId) ?? EVENTS[0];
  const isTeacher = progress.mode === 'teacher';

  const handleSelectEvent = (id: string) => {
    setSelectedId(id);
    const next = { ...inspected, [id]: true };
    setInspected(next);
    if (EVENTS.every((e) => next[e.id])) {
      recordChallengeSuccess('m8-investigation', 25, 'lab-investigation');
    }
  };

  const inspectedCount = EVENTS.filter((e) => inspected[e.id]).length;

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200">
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Simulated Security Investigation</span>
        </div>
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Module 8: Security Event Investigation Simulation
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong>Scenario:</strong> “Suspicious cloud activity detected.” Click every event in the
          7-step timeline below to uncover <strong>Clues 1–4</strong> and solve the case.
        </p>
      </header>

      <section className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-white">
            Interactive 7-Event Investigation Timeline
          </h2>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
            Clues Inspected: {inspectedCount} / {EVENTS.length}
          </span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS.map((ev) => {
            const active = ev.id === selectedId;
            const style =
              ev.severity === 'alert'
                ? 'border-rose-400/60 bg-rose-950/35'
                : ev.severity === 'danger'
                  ? 'border-amber-400/60 bg-amber-950/30'
                  : 'border-slate-700 bg-slate-900/70';

            return (
              <button
                key={ev.id}
                type="button"
                onClick={() => handleSelectEvent(ev.id)}
                aria-pressed={active}
                className={`rounded-xl border p-3.5 text-left transition-all ${style} ${
                  active ? 'ring-2 ring-cyan-400' : 'hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1 font-mono font-bold">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {ev.time}
                  </span>
                  <span className="rounded bg-slate-950/80 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">
                    {ev.clueLabel}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-bold text-white">{ev.title}</p>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-4 rounded-2xl border border-cyan-500/30 bg-slate-950/85 p-5">
          <p className="text-xs font-bold tracking-wider text-amber-300 uppercase">
            What do you notice? ({selected.time} — {selected.title})
          </p>
          <p className="mt-1 text-sm text-slate-300">{selected.noticePrompt}</p>
          <p className="mt-2 rounded-xl border border-cyan-400/30 bg-cyan-950/30 p-3 text-sm font-semibold text-cyan-100">
            {selected.clueText}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setConclusionOpen((v) => !v)}
            className="min-h-[42px] rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
          >
            {conclusionOpen ? 'Hide Investigation Conclusion' : 'Reveal Investigation Conclusion'}
          </button>
          {inspectedCount === EVENTS.length && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              All 7 events investigated! (+25 pts)
            </span>
          )}
        </div>

        {(conclusionOpen || isTeacher) && (
          <div className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-950/30 p-4 text-sm text-emerald-100">
            <p className="flex items-center gap-2 font-bold text-white">
              <AlertTriangle className="h-4 w-4 text-amber-300" aria-hidden="true" />
              Investigation Conclusion
            </p>
            <p className="mt-1 leading-relaxed">
              An attacker guessed passwords 3 times (01:58–02:05), logged in at 02:13, upgraded
              permissions at 02:14, triggered a security alert at 02:15, and accessed large data at
              02:18. Because logs and alerts recorded every step, the security team can contain the
              account and recover safely!
            </p>
          </div>
        )}
      </section>

      <ConceptCard
        title="How Investigators Read a Timeline"
        whatIsIt="Putting log events in time order to connect the dots between clues."
        whyItMatters="One failed login looks harmless; 3 failed logins + success + permission change + large data access tells the whole story."
        simpleExample="01:58 Failed → 02:13 Success → 02:14 Admin Added → 02:18 Data Accessed."
        analogy="A detective lining up security camera clips in order from 1:58 AM to 2:18 AM."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <QuickCheck
          id="m8-q1"
          question="In the 01:58–02:18 timeline, why did the attacker change permissions at 02:14?"
          options={[
            'To give themselves Admin access before accessing large data',
            'To fix a typo in the footer',
            'To turn off the monitor screen',
            'To log out faster',
          ]}
          correctIndex={0}
          explanation="Attackers often upgrade permissions right after logging in so they can reach sensitive data."
        />
        <QuickCheck
          id="m8-q2"
          question="True or False: Reviewing events in chronological order helps uncover the root cause."
          options={['True', 'False']}
          correctIndex={0}
          explanation="True! Timelines show how each step led to the next."
        />
      </div>
    </div>
  );
}
