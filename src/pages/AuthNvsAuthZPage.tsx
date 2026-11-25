import { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { QuickCheck } from '../components/QuickCheck';
import { useCourse } from '../context/CourseContext';


export function AuthNvsAuthZPage() {
  const { recordChallengeSuccess } = useCourse();
  const [activeTab, setActiveTab] = useState<'authn' | 'authz'>('authn');
  const [rahulStep, setRahulStep] = useState<number>(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const handleRahulSimulation = (step: number) => {
    setRahulStep(step);
    if (step === 2) {
      recordChallengeSuccess('rahul-auth-sim', 15);
    }
  };

  const handleQuiz = (idx: number) => {
    setQuizAnswer(idx);
    if (idx === 0) {
      recordChallengeSuccess('authn-vs-authz-quiz', 20, 'lab-authn-authz');
    }
  };

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Authentication vs. Authorization
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          Beginners frequently confuse these two words! Remember this golden distinction:
          <br />
          <strong className="text-cyan-300">AUTHENTICATION = "WHO ARE YOU?" (Verify Identity)</strong>
          <br />
          <strong className="text-emerald-300">AUTHORIZATION = "WHAT CAN YOU DO?" (Check Permissions)</strong>
        </p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('authn')}
            className={`min-h-[38px] rounded-xl border px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'authn'
                ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                : 'border-slate-700 bg-slate-900 text-slate-400'
            }`}
          >
            🔑 1. Authentication (Who are you?)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('authz')}
            className={`min-h-[38px] rounded-xl border px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'authz'
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                : 'border-slate-700 bg-slate-900 text-slate-400'
            }`}
          >
            📋 2. Authorization (What can you do?)
          </button>
        </div>
      </header>

      {/* Comparison Grid */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className={`glass-card rounded-2xl p-5 border ${activeTab === 'authn' ? 'border-cyan-400 bg-cyan-950/20 ring-1 ring-cyan-400' : 'border-slate-800'}`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪪</span>
            <h2 className="text-base font-bold text-cyan-300">AUTHENTICATION (AuthN)</h2>
          </div>
          <p className="mt-2 text-xs font-semibold text-slate-200">"Are you really the person you claim to be?"</p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
            <li>• Checks username & password</li>
            <li>• Sends an OTP verification code or SMS</li>
            <li>• Scans biometrics (fingerprint / FaceID)</li>
            <li>• Happens <strong>FIRST</strong> before entering the cloud</li>
          </ul>
        </div>

        <div className={`glass-card rounded-2xl p-5 border ${activeTab === 'authz' ? 'border-emerald-400 bg-emerald-950/20 ring-1 ring-emerald-400' : 'border-slate-800'}`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <h2 className="text-base font-bold text-emerald-300">AUTHORIZATION (AuthZ)</h2>
          </div>
          <p className="mt-2 text-xs font-semibold text-slate-200">"What are you allowed to access or do?"</p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
            <li>• Checks role (Developer vs HR vs Admin)</li>
            <li>• Grants Read, Write, Delete, or Manage rights</li>
            <li>• Decides if you can open the Production Database</li>
            <li>• Happens <strong>AFTER</strong> identity is confirmed</li>
          </ul>
        </div>
      </section>

      {/* Visual Simulation: Rahul's Cloud Request */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Interactive Walkthrough: Rahul Signs In</h2>
        <p className="text-xs text-slate-400 mb-4">Follow Rahul step-by-step through Authentication and Authorization.</p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => handleRahulSimulation(0)}
              className={`rounded-xl border p-3 text-left transition-all ${
                rahulStep === 0 ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <p className="text-xs font-bold text-white">STEP 1: Enter Password & MFA</p>
              <p className="mt-1 text-[11px] text-slate-400">Authentication Phase</p>
            </button>
            <button
              type="button"
              onClick={() => handleRahulSimulation(1)}
              className={`rounded-xl border p-3 text-left transition-all ${
                rahulStep === 1 ? 'border-amber-400 bg-amber-950/40 text-amber-200' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <p className="text-xs font-bold text-white">STEP 2: Open Developer Code</p>
              <p className="mt-1 text-[11px] text-slate-400">Authorization Check (Allowed)</p>
            </button>
            <button
              type="button"
              onClick={() => handleRahulSimulation(2)}
              className={`rounded-xl border p-3 text-left transition-all ${
                rahulStep === 2 ? 'border-rose-400 bg-rose-950/40 text-rose-200' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <p className="text-xs font-bold text-white">STEP 3: Try to Drop Production DB</p>
              <p className="mt-1 text-[11px] text-slate-400">Authorization Check (Blocked!)</p>
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/80 p-4">
            {rahulStep === 0 && (
              <div>
                <p className="text-sm font-bold text-cyan-300">✅ Authentication Succeeded</p>
                <p className="mt-1 text-xs text-slate-200">
                  Rahul enters his password and correct 6-digit OTP code. The cloud now knows: <em>"Yes, this is definitely Rahul!"</em>
                </p>
              </div>
            )}
            {rahulStep === 1 && (
              <div>
                <p className="text-sm font-bold text-emerald-300">✅ Authorization Succeeded (Access Granted)</p>
                <p className="mt-1 text-xs text-slate-200">
                  Rahul clicks into the Dev Code Repository. The IAM policy checks his role (Developer) and grants Read/Write access.
                </p>
              </div>
            )}
            {rahulStep === 2 && (
              <div>
                <p className="text-sm font-bold text-rose-400">⛔ Authorization Failed (Access Denied)</p>
                <p className="mt-1 text-xs text-slate-200">
                  Rahul tries to delete the customer Production Database. Even though he is authenticated as Rahul, his Developer role does NOT have permission to delete production databases!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Classroom Scenario Quiz */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">Scenario Check: Which One Is Which?</h2>
        <p className="text-xs text-slate-400 mb-4">
          Scenario: Rahul successfully signs into his company portal with his password, but when he clicks "View Payroll Salaries", he gets a screen saying <em>"Access Denied: You do not have permission to view this page."</em>
        </p>

        <div className="space-y-2">
          {[
            'Authentication succeeded (identity proven), but Authorization failed (permission denied)',
            'Both Authentication and Authorization failed',
            'Authentication failed because he forgot his password',
            'Authorization succeeded because he logged in',
          ].map((option, idx) => {
            const isSelected = quizAnswer === idx;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleQuiz(idx)}
                className={`w-full rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                  isSelected
                    ? idx === 0
                      ? 'border-emerald-500 bg-emerald-950/30 text-emerald-200'
                      : 'border-rose-500 bg-rose-950/30 text-rose-200'
                    : 'border-slate-800 bg-slate-900/60 hover:border-cyan-400'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {quizAnswer !== null && (
          <p className="mt-3 text-xs font-bold">
            {quizAnswer === 0 ? (
              <span className="text-emerald-400">🎉 Correct! Rahul proved who he was (AuthN), but his account lacked the payroll permission (AuthZ).</span>
            ) : (
              <span className="text-rose-400">⚠️ Not quite. Notice that his login succeeded (AuthN), but the payroll page blocked him (AuthZ).</span>
            )}
          </p>
        )}
      </section>

      <ConceptCard
        title="Authentication vs Authorization"
        whatIsIt="AuthN confirms who you are; AuthZ determines what resources and actions you are permitted to take."
        whyItMatters="Being an employee gives you access into the building, but not into the executive payroll safe."
        simpleExample="Flight ticket: your passport authenticates your name; your boarding pass authorizes you to sit in Seat 14B."
        analogy="Passport (Authentication) vs Boarding Pass Seat Assignment (Authorization)."
      />

      <QuickCheck
        id="auth-diff-q1"
        question="Which of the following is an example of AUTHORIZATION?"
        options={[
          'Deciding that Rahul can Read test code, but cannot delete production databases',
          'Rahul entering his 8-character password at the login screen',
          'Receiving an SMS code on his mobile phone',
        ]}
        correctIndex={0}
        explanation="Authorizing specifies the allowed actions (Read/Write/Delete) on specific resources."
      />
    </div>
  );
}
