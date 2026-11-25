import { MessageSquare, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useCourse } from '../context/CourseContext';

interface DiscussionPromptProps {
  question: string;
  expectedAnswer: string;
}

export function DiscussionPrompt({ question, expectedAnswer }: DiscussionPromptProps) {
  const { progress } = useCourse();
  const [revealed, setRevealed] = useState(false);
  const showAnswer = progress.mode === 'teacher' || revealed;

  return (
    <aside className="glass-card rounded-2xl border border-amber-400/30 bg-amber-950/15 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold tracking-wider text-amber-300 uppercase">
              Classroom Discussion Prompt
            </p>
            <p className="mt-1 text-base font-bold text-white">“{question}”</p>
          </div>
        </div>

        {progress.mode !== 'teacher' && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-expanded={revealed}
            className="min-h-[36px] rounded-xl border border-amber-400/40 bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-500/25"
          >
            {revealed ? 'Hide Answer' : 'Reveal Discussion Answer'}
          </button>
        )}
      </div>

      {showAnswer && (
        <div aria-live="polite" className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-950/25 p-3 text-xs sm:text-sm text-emerald-100">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
          <p>
            <strong>Expected Answer:</strong> {expectedAnswer}
          </p>
        </div>
      )}
    </aside>
  );
}
