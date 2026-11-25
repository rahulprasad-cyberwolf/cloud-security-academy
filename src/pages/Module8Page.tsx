import { CheckCircle2, Clock, Search } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

const TIMELINE = [
  { id: 't1', time: '01:58 AM', title: 'Failed Login', evidence: 'Wrong password attempt from unfamiliar foreign IP address.' },
  { id: 't2', time: '02:01 AM', title: 'Failed Login', evidence: 'Second failed password attempt 3 minutes later.' },
  { id: 't3', time: '02:05 AM', title: 'Failed Login', evidence: 'Third failed password attempt—brute-force password guessing.' },
  { id: 't4', time: '02:13 AM', title: 'Successful Login', evidence: 'Login succeeded on the 4th attempt at 02:13 AM.' },
  { id: 't5', time: '02:14 AM', title: 'Permission Changed', evidence: '1 minute later, the account role was upgraded to Master Admin!' },
  { id: 't6', time: '02:18 AM', title: 'Large Data Access', evidence: 'Massive batch of 2.4 GB confidential files downloaded from storage.' },
];

interface BoardCard {
  id: string;
  order: number;
  label: string;
  category: string;
  detail: string;
}

const EVIDENCE_CARDS: BoardCard[] = [
  { id: 'c1', order: 1, label: 'Unusual Login Attempts', category: 'Authentication Log', detail: '3 failed attempts followed by 02:13 AM success from unfamiliar IP' },
  { id: 'c2', order: 2, label: 'Privilege Escalation', category: 'Audit Log', detail: 'Account role upgraded to Master Admin at 02:14 AM' },
  { id: 'c3', order: 3, label: 'Resource Access', category: 'Application Log', detail: 'Opened sensitive customer backup storage' },
  { id: 'c4', order: 4, label: 'Abnormal Traffic Spike', category: 'Network Log', detail: '2.4 GB transferred out to foreign IP address at 02:18 AM' },
  { id: 'c5', order: 5, label: 'High-Priority Alert', category: 'Security Alert', detail: 'Alert: "Admin Role Granted Outside Business Hours"' },
];

export function Module8Page() {
  const { recordChallengeSuccess } = useCourse();
  const [selectedEvent, setSelectedEvent] = useState(TIMELINE[0]);
  const [visited, setVisited] = useState<Record<string, boolean>>({ t1: true });
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [conclusionReached, setConclusionReached] = useState(false);

  const handleSelectEvent = (ev: (typeof TIMELINE)[number]) => {
    setSelectedEvent(ev);
    const next = { ...visited, [ev.id]: true };
    setVisited(next);
  };

  const handleCardClick = (id: string) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((c) => c !== id));
    } else {
      const next = [...selectedCards, id];
      setSelectedCards(next);
      if (next.length === EVIDENCE_CARDS.length) {
        setConclusionReached(true);
        recordChallengeSuccess('m8-evidence-board', 30, 'lab-evidence-board');
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200">
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Practical Cyber Investigation Lab</span>
        </div>
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Security Event Investigation
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          <strong>Incident Scenario:</strong> An unusual cloud account activity was detected in the middle of the night.
          <br />
          Click every timeline event to gather clues, then arrange the cards on the <strong>Investigation Evidence Board</strong> to form the final conclusion.
        </p>
      </header>

      {/* Interactive Timeline */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-3 text-lg font-bold text-white">Event Timeline: 01:58 AM to 02:18 AM</h2>
        <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {TIMELINE.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => handleSelectEvent(ev)}
              aria-pressed={selectedEvent.id === ev.id}
              className={`rounded-xl border p-3 text-left transition-all ${
                selectedEvent.id === ev.id
                  ? 'border-cyan-400 bg-cyan-500/20'
                  : 'border-slate-700 bg-slate-900/70 hover:border-cyan-400/50'
              }`}
            >
              <span className="flex items-center gap-1 font-mono text-xs text-cyan-300">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {ev.time}
              </span>
              <span className="mt-1 block text-xs font-bold text-white">{ev.title}</span>
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-4 rounded-xl border border-cyan-500/30 bg-slate-950/85 p-4 text-sm">
          <p className="font-bold text-cyan-300">
            Evidence at {selectedEvent.time} — {selectedEvent.title}
          </p>
          <p className="mt-1 text-slate-100">{selectedEvent.evidence}</p>
        </div>
      </section>

      {/* Investigation Evidence Board with 5 Cards */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Investigation Evidence Board (Click to Connect Clues)</h2>
            <p className="text-xs text-slate-400">Click and connect all 5 evidence cards to synthesize the attack path.</p>
          </div>
          <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
            Connected: {selectedCards.length} / {EVIDENCE_CARDS.length}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {EVIDENCE_CARDS.map((card) => {
            const isConnected = selectedCards.includes(card.id);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(card.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isConnected
                    ? 'border-emerald-400 bg-emerald-950/30 ring-1 ring-emerald-400'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                    {card.category}
                  </span>
                  <h3 className="text-xs font-bold text-white mt-1">{card.label}</h3>
                  <p className="mt-2 text-[11px] text-slate-300">{card.detail}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Clue #{card.order}</span>
                  <span className={isConnected ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {isConnected ? 'Linked ✓' : 'Click to Link'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {conclusionReached && (
          <div className="mt-5 rounded-2xl border border-emerald-400/40 bg-emerald-950/30 p-5">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Final Investigation Conclusion
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-200">
              <strong>Forensic Verdict:</strong> An external adversary conducted repeated password guessing between 01:58 and 02:05 AM, succeeded at 02:13 AM, escalated their privileges to Master Admin at 02:14 AM, and exfiltrated 2.4 GB of private storage data at 02:18 AM.
              <br />
              <strong>Immediate Action Required:</strong> Initiate Incident Response (Revoke compromised credentials, terminate active sessions, rotate keys, and seal storage buckets).
            </p>
          </div>
        )}
      </section>

      <ConceptCard
        title="Security Event Investigation"
        whatIsIt="Analyzing timelines, correlation rules, and multiple log sources to reconstruct the complete story of a cyber incident."
        whyItMatters="Without connecting clues across logs, isolated events look harmless (e.g. one failed login)."
        simpleExample="Connecting a failed login + new admin role + large data download reveals an active account takeover."
        analogy="Detective assembling puzzle pieces on a case board to identify the perpetrator's moves."
      />

      <QuickCheck
        id="m8-q1"
        question="Why is seeing a permission change to Admin ONE MINUTE after an unusual 02:13 AM login so critical?"
        options={[
          'It signals that the intruder is escalating privileges to seize full control of cloud resources',
          'It means the user is updating their profile photo',
          'It indicates the cloud servers need more RAM',
        ]}
        correctIndex={0}
        explanation="Privilege escalation right after an unusual login is a classic signature of account takeover."
      />
    </div>
  );
}
