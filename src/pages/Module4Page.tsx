import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

interface AlertItem {
  id: string;
  title: string;
  severity: 'WARNING' | 'CRITICAL';
  whatHappened: string;
  whyMatters: string;
  whatToCheck: string;
}

const ALERTS: AlertItem[] = [
  { id: 'al-1', title: 'Multiple failed logins', severity: 'CRITICAL', whatHappened: '5 wrong password attempts in 2 minutes.', whyMatters: 'Someone may be trying to guess a user password.', whatToCheck: 'Check the IP/location and whether a login succeeded afterward.' },
  { id: 'al-2', title: 'Unexpected login', severity: 'WARNING', whatHappened: 'User signed in from an unfamiliar city at 2:13 AM.', whyMatters: 'Could be a stolen password—or the user traveling.', whatToCheck: 'Confirm with the user and check recent activity.' },
  { id: 'al-3', title: 'Permission changed', severity: 'CRITICAL', whatHappened: 'A regular user account was upgraded to Admin.', whyMatters: 'Admin access controls the entire cloud environment.', whatToCheck: 'Verify who approved the change in Audit Logs.' },
  { id: 'al-4', title: 'New privileged account', severity: 'CRITICAL', whatHappened: 'A brand-new Admin account was created.', whyMatters: 'Attackers sometimes create backup Admin accounts.', whatToCheck: 'Confirm if IT/Admin created it intentionally.' },
  { id: 'al-5', title: 'Public resource', severity: 'CRITICAL', whatHappened: 'A private storage bucket became Public 🔓.', whyMatters: 'Anyone on the internet could read private files.', whatToCheck: 'Switch storage back to Private 🔒 immediately.' },
  { id: 'al-6', title: 'Exposed secret', severity: 'CRITICAL', whatHappened: 'An API key was detected in public code.', whyMatters: 'Bots can copy and misuse exposed keys.', whatToCheck: 'Remove from code and rotate (replace) the key.' },
];

export function Module4Page() {
  const { recordChallengeSuccess } = useCourse();
  const [selected, setSelected] = useState<AlertItem>(ALERTS[0]);

  const handleSelect = (item: AlertItem) => {
    setSelected(item);
    recordChallengeSuccess(`m4-alert-${item.id}`, 4);
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Security Alerts
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          An <strong className="text-rose-300">Alert</strong> means something needs attention. Click
          any alert on the animated dashboard below to see what happened and what to check.
        </p>
      </header>

      <section className="glass-card rounded-2xl p-6">
        <h2 className="mb-4 text-lg font-bold text-white">
          Animated Security Alert Dashboard
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALERTS.map((item) => {
            const active = selected.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                aria-pressed={active}
                className={`rounded-xl border p-4 text-left transition-all ${
                  item.severity === 'CRITICAL'
                    ? 'border-rose-400/50 bg-rose-950/30'
                    : 'border-amber-400/50 bg-amber-950/25'
                } ${active ? 'ring-2 ring-cyan-400' : 'hover:opacity-95'}`}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      item.severity === 'CRITICAL' ? 'bg-rose-400 animate-alert-beacon' : 'bg-amber-400'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-bold tracking-wider text-slate-200">{item.severity}</span>
                </div>
                <p className="text-sm font-bold text-white">{item.title}</p>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-4 grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/85 p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-bold text-cyan-300 uppercase">What Happened?</p>
            <p className="mt-1 text-sm text-slate-200">{selected.whatHappened}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-amber-300 uppercase">Why Does It Matter?</p>
            <p className="mt-1 text-sm text-slate-200">{selected.whyMatters}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-300 uppercase">What Should We Check?</p>
            <p className="mt-1 text-sm text-slate-200">{selected.whatToCheck}</p>
          </div>
        </div>
      </section>

      <ConceptCard
        title="Security Alerts"
        whatIsIt="Automatic notifications telling the team that a security rule was triggered."
        whyItMatters="Alerts help teams investigate quickly before small issues grow."
        simpleExample="Permission changed to Admin → Alert generated."
        analogy="Alarm bell ringing when a sensor trips."
      />

      <QuickCheck
        id="m4-q1"
        question="Is every alert automatically an attack?"
        options={['No — an alert means something needs attention and should be checked in context', 'Yes — every alert means data is destroyed']}
        correctIndex={0}
        explanation="An alert tells you to check; investigating the logs confirms whether it is harmless or risky."
      />
    </div>
  );
}
