import { BellRing, Globe, KeyRound, ShieldAlert, Users } from 'lucide-react';
import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';

interface AlertCenterItem {
  id: string;
  level: 'GREEN' | 'YELLOW' | 'RED';
  title: string;
  whatHappened: string;
  whyMatters: string;
  whatToCheck: string;
}

const ALERT_CENTER_ITEMS: AlertCenterItem[] = [
  {
    id: 'a-green',
    level: 'GREEN',
    title: 'Normal: Daily Backup Completed',
    whatHappened: 'Scheduled backup finished at 11:00 PM with zero errors.',
    whyMatters: 'Confirms your data is safely backed up.',
    whatToCheck: 'No urgent action needed—keep monitoring!',
  },
  {
    id: 'a-yellow',
    level: 'YELLOW',
    title: 'Warning: Unusual Login Location',
    whatHappened: 'A user signed in from a new city they do not usually visit.',
    whyMatters: 'Could be the user traveling—or someone else using their password.',
    whatToCheck: 'Verify with the user and check if 2FA was passed.',
  },
  {
    id: 'a-red-1',
    level: 'RED',
    title: 'Critical: 5 Failed Logins + Permission Changed',
    whatHappened: '5 failed logins in 2 minutes, followed by a sudden Admin role change.',
    whyMatters: 'Strong sign of an account break-in attempt.',
    whatToCheck: 'Lock the account, inspect audit logs, and undo unauthorized changes.',
  },
  {
    id: 'a-red-2',
    level: 'RED',
    title: 'Critical: Public Storage Enabled & Secret Detected',
    whatHappened: 'A private folder became public and an API key was found in code.',
    whyMatters: 'Anyone on the internet could read files or steal the API key.',
    whatToCheck: 'Make storage Private immediately and rotate the exposed API key.',
  },
];

export function Module4Page() {
  const { navigateTo, recordChallengeSuccess } = useCourse();
  const [selectedAlert, setSelectedAlert] = useState<AlertCenterItem>(ALERT_CENTER_ITEMS[2]);
  const [dashboardPanel, setDashboardPanel] = useState<
    'score' | 'alerts' | 'failedLogins' | 'incidents' | 'secrets' | 'publicRes' | 'users' | 'events'
  >('failedLogins');

  const handleSelectAlert = (item: AlertCenterItem) => {
    setSelectedAlert(item);
    recordChallengeSuccess(`m4-alert-${item.id}`, 5);
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Module 4: Security Alerts & Cloud Security Dashboard
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          An <strong className="text-rose-300">Alert</strong> is an urgent warning raised when
          monitoring sees something risky—like 5 failed logins, a new admin account, public storage,
          or a leaked secret.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {[
            '5 Failed Logins',
            'New Admin Account',
            'Permission Changed',
            'Public Storage Enabled',
            'Secret Detected',
            'Unusual Location',
            'Large Data Download',
          ].map((ex) => (
            <span
              key={ex}
              className="rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 font-medium text-rose-200"
            >
              {ex}
            </span>
          ))}
        </div>
      </header>

      {/* 10. Animated SVG Alert Center (GREEN / YELLOW / RED) */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          Animated Alert Center: Click Any Alert Level
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Security centers color-code alerts so teams know what needs attention first.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ALERT_CENTER_ITEMS.map((item) => {
            const active = selectedAlert.id === item.id;
            const colorMap =
              item.level === 'GREEN'
                ? 'border-emerald-400/50 bg-emerald-950/30 text-emerald-200'
                : item.level === 'YELLOW'
                  ? 'border-amber-400/50 bg-amber-950/30 text-amber-200'
                  : 'border-rose-400/60 bg-rose-950/35 text-rose-200';
            const dotColor =
              item.level === 'GREEN'
                ? 'bg-emerald-400'
                : item.level === 'YELLOW'
                  ? 'bg-amber-400'
                  : 'bg-rose-400 animate-alert-beacon';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectAlert(item)}
                aria-pressed={active}
                className={`rounded-xl border p-4 text-left transition-all ${colorMap} ${
                  active ? 'ring-2 ring-cyan-400' : 'hover:opacity-95'
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${dotColor}`} aria-hidden="true" />
                  <span className="text-xs font-bold tracking-wider">{item.level}</span>
                </div>
                <p className="text-xs font-semibold text-white">{item.title}</p>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-4 grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/85 p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-bold text-cyan-300 uppercase">What Happened?</p>
            <p className="mt-1 text-sm text-slate-200">{selectedAlert.whatHappened}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-amber-300 uppercase">Why It Matters?</p>
            <p className="mt-1 text-sm text-slate-200">{selectedAlert.whyMatters}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-300 uppercase">What Should We Check?</p>
            <p className="mt-1 text-sm text-slate-200">{selectedAlert.whatToCheck}</p>
          </div>
        </div>
      </section>

      {/* 11. Simulated Cloud Security Dashboard */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white">
          Simulated Cloud Security Dashboard (Click Any Card)
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Click cards like <strong>Failed Logins</strong>, <strong>Public Resources</strong>, or{' '}
          <strong>Protected Secrets</strong> to inspect live simulated findings.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { id: 'score' as const, label: 'Security Score', val: '72 / 100', color: 'text-cyan-300' },
            { id: 'alerts' as const, label: 'Active Alerts', val: '3 Open', color: 'text-rose-300' },
            { id: 'failedLogins' as const, label: 'Failed Logins', val: '5 (2 AM)', color: 'text-rose-300' },
            { id: 'incidents' as const, label: 'Open Incidents', val: '1 Case', color: 'text-amber-300' },
            { id: 'secrets' as const, label: 'Protected Secrets', val: '1 Exposed!', color: 'text-amber-300' },
            { id: 'publicRes' as const, label: 'Public Resources', val: '1 Bucket', color: 'text-rose-300' },
            { id: 'users' as const, label: 'Users', val: '4 Accounts', color: 'text-emerald-300' },
            { id: 'events' as const, label: 'Recent Events', val: '128 Today', color: 'text-sky-300' },
          ].map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setDashboardPanel(card.id)}
              aria-pressed={dashboardPanel === card.id}
              className={`rounded-xl border p-3.5 text-left transition-colors ${
                dashboardPanel === card.id
                  ? 'border-cyan-400 bg-cyan-500/15'
                  : 'border-slate-700/70 bg-slate-900/70 hover:border-cyan-400/50'
              }`}
            >
              <p className="text-xs text-slate-400">{card.label}</p>
              <p className={`mt-1 text-lg font-extrabold ${card.color}`}>{card.val}</p>
            </button>
          ))}
        </div>

        {/* Dynamic Investigation / Action Panel */}
        <div aria-live="polite" className="mt-4 rounded-2xl border border-cyan-500/30 bg-slate-950/90 p-5 text-sm">
          {dashboardPanel === 'failedLogins' && (
            <div className="space-y-2">
              <p className="flex items-center gap-2 font-bold text-rose-300">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                Investigation Panel: 5 Failed Logins Detected
              </p>
              <p className="text-slate-200">
                Between 01:58 AM and 02:05 AM, an unknown IP tried 5 wrong passwords before
                succeeding at 02:13 AM. Open <strong>Module 8</strong> to investigate the full
                timeline!
              </p>
              <button
                type="button"
                onClick={() => navigateTo('module-8')}
                className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950"
              >
                Open Full Investigation
              </button>
            </div>
          )}

          {dashboardPanel === 'publicRes' && (
            <div className="space-y-2">
              <p className="flex items-center gap-2 font-bold text-rose-300">
                <Globe className="h-4 w-4" aria-hidden="true" />
                Misconfiguration Found: Public Storage Bucket
              </p>
              <p className="text-slate-200">
                Folder <code>student-records-bucket</code> is set to <strong>Public Access</strong>.
                Fix it in <strong>Module 6 (Misconfigurations)</strong>!
              </p>
              <button
                type="button"
                onClick={() => navigateTo('module-6')}
                className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950"
              >
                Open Misconfiguration Labs
              </button>
            </div>
          )}

          {dashboardPanel === 'secrets' && (
            <div className="space-y-2">
              <p className="flex items-center gap-2 font-bold text-amber-300">
                <KeyRound className="h-4 w-4" aria-hidden="true" />
                Secret Alert: API Key Found in Code
              </p>
              <p className="text-slate-200">
                A demo API key was spotted in frontend code. Learn how to move it into a Secret
                Manager in <strong>Module 5</strong>!
              </p>
              <button
                type="button"
                onClick={() => navigateTo('module-5')}
                className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950"
              >
                Open Secret Management
              </button>
            </div>
          )}

          {dashboardPanel === 'users' && (
            <div className="space-y-2">
              <p className="flex items-center gap-2 font-bold text-emerald-300">
                <Users className="h-4 w-4" aria-hidden="true" />
                User Summary: 4 Accounts (1 Needs Review)
              </p>
              <p className="text-slate-200">
                <code>OldUser</code> still has Full Admin Access. Review team permissions in{' '}
                <strong>Module 7</strong>.
              </p>
            </div>
          )}

          {(dashboardPanel === 'score' ||
            dashboardPanel === 'alerts' ||
            dashboardPanel === 'incidents' ||
            dashboardPanel === 'events') && (
            <div className="space-y-1.5">
              <p className="flex items-center gap-2 font-bold text-cyan-300">
                <BellRing className="h-4 w-4" aria-hidden="true" />
                Dashboard Overview
              </p>
              <p className="text-slate-200">
                Your simulated cloud currently has a <strong>72/100</strong> security score because
                of 1 public storage bucket, 1 exposed secret, and 5 late-night failed logins.
              </p>
            </div>
          )}
        </div>
      </section>

      <ConceptCard
        title="Why Alerts Matter"
        whatIsIt="An alert is a real-time notification telling the security team that a safety rule was triggered."
        whyItMatters="Alerts turn silent logs into fast action—helping you stop an intruder before data is stolen."
        simpleExample="RED Alert: 5 failed logins + Admin permission changed at 2:14 AM."
        analogy="A burglar alarm ringing at the security desk when a window is forced open."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <QuickCheck
          id="m4-q1"
          question="What does a RED (Critical) alert mean in a cloud security dashboard?"
          options={[
            'Something dangerous needs immediate attention',
            'Everything is normal and no action is needed',
            'The screen brightness is too high',
            'A user logged in normally at 10 AM',
          ]}
          correctIndex={0}
          explanation="RED alerts signal high-priority issues like repeated failed logins, permission changes, or public storage."
        />
        <QuickCheck
          id="m4-q2"
          question="True or False: Turning on alerts helps the security team respond faster."
          options={['True', 'False']}
          correctIndex={0}
          explanation="True! Alerts immediately notify the team so they don't have to stare at logs 24/7."
        />
      </div>
    </div>
  );
}
