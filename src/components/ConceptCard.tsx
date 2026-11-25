import { BookOpen, ChevronDown, GraduationCap, Lightbulb, Sparkles, Terminal } from 'lucide-react';
import { useState } from 'react';
import { useCourse } from '../context/CourseContext';

interface ConceptCardProps {
  title: string;
  whatIsIt: string;
  whyItMatters: string;
  simpleExample: string;
  analogy: string;
  keyPoint?: string;
  questionToAsk?: string;
  expectedAnswer?: string;
  commonConfusion?: string;
  teacherNote?: string;
  discussionQuestion?: string;
}

export function ConceptCard({
  title,
  whatIsIt,
  whyItMatters,
  simpleExample,
  analogy,
  keyPoint,
  questionToAsk,
  expectedAnswer,
  commonConfusion,
  teacherNote,
  discussionQuestion,
}: ConceptCardProps) {
  const { progress } = useCourse();
  const [notesOpen, setNotesOpen] = useState(false);
  const showTeacherPanel = progress.mode === 'teacher' || notesOpen;

  return (
    <section className="glass-card rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-300">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
        </div>

        {progress.mode !== 'teacher' && (
          <button
            type="button"
            onClick={() => setNotesOpen((v) => !v)}
            aria-expanded={notesOpen}
            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-violet-400/35 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200 hover:bg-violet-500/20"
          >
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Teacher Notes</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${notesOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
          <p className="mb-1 text-xs font-semibold tracking-wider text-cyan-300 uppercase">
            Simple Explanation
          </p>
          <p className="text-sm leading-relaxed text-slate-200">{whatIsIt}</p>
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
          <p className="mb-1 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
            Why It Matters
          </p>
          <p className="text-sm leading-relaxed text-slate-200">{whyItMatters}</p>
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-sky-300 uppercase">
            <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
            Simple Example
          </p>
          <p className="text-sm leading-relaxed text-slate-200">{simpleExample}</p>
        </div>

        <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-amber-300 uppercase">
            <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
            Real-World Analogy
          </p>
          <p className="text-sm leading-relaxed text-amber-100/90">{analogy}</p>
        </div>
      </div>

      {showTeacherPanel && (
        <div className="mt-4 space-y-1.5 rounded-xl border border-violet-400/35 bg-violet-950/35 p-4 text-xs sm:text-sm">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-violet-300 uppercase">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            Teacher Mode — Teaching Notes
          </p>
          <p className="text-violet-100">
            <strong>Key Point:</strong> {keyPoint ?? teacherNote ?? whatIsIt}
          </p>
          <p className="text-violet-100">
            <strong>Simple Explanation:</strong> {whatIsIt}
          </p>
          <p className="text-violet-100">
            <strong>Analogy:</strong> {analogy}
          </p>
          <p className="text-violet-100">
            <strong>Example:</strong> {simpleExample}
          </p>
          {(questionToAsk || discussionQuestion) && (
            <p className="flex items-start gap-1.5 text-violet-200">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
              <span>
                <strong>Question to Ask:</strong> {questionToAsk ?? discussionQuestion}
              </span>
            </p>
          )}
          {expectedAnswer && (
            <p className="text-emerald-200">
              <strong>Expected Answer:</strong> {expectedAnswer}
            </p>
          )}
          {commonConfusion && (
            <p className="text-amber-200">
              <strong>Common Student Confusion:</strong> {commonConfusion}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
