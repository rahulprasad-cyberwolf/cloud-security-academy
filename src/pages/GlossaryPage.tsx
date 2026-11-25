import { BookMarked, Search } from 'lucide-react';
import { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';

export function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(GLOSSARY_TERMS[0]);

  const filtered = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(query.toLowerCase()) ||
      t.definition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="glass-card rounded-2xl p-6">
        <div className="mb-2 flex items-center gap-2 text-cyan-300">
          <BookMarked className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-bold tracking-wider uppercase">Beginner Reference</span>
        </div>
        <h1 id="main-content" tabIndex={-1} className="text-2xl font-bold text-white sm:text-3xl">
          Cloud Security Beginner Glossary
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Click any term below for a plain-English, one-line explanation and real-world analogy.
        </p>

        <div className="relative mt-4 max-w-md">
          <label htmlFor="glossary-search" className="visually-hidden">
            Search glossary terms
          </label>
          <Search className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-slate-400" aria-hidden="true" />
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a term (e.g., Audit Log, Secret)..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pr-4 pl-9 text-sm text-white placeholder:text-slate-500"
          />
        </div>
      </header>

      {/* Active Term Spotlight */}
      <section aria-live="polite" className="glass-card rounded-2xl border border-cyan-400/35 p-5">
        <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-xs font-semibold text-cyan-200">
          {selectedTerm.category}
        </span>
        <h2 className="mt-2 text-xl font-bold text-white">{selectedTerm.term}</h2>
        <p className="mt-1 text-sm text-slate-200">{selectedTerm.definition}</p>
        <p className="mt-2 text-xs font-medium text-amber-200">
          <strong>Analogy:</strong> {selectedTerm.analogy}
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const active = selectedTerm.term === item.term;
          return (
            <button
              key={item.term}
              type="button"
              onClick={() => setSelectedTerm(item)}
              aria-pressed={active}
              className={`rounded-xl border p-4 text-left transition-colors ${
                active
                  ? 'border-cyan-400 bg-cyan-500/15'
                  : 'border-slate-700/70 bg-slate-900/65 hover:border-cyan-400/40'
              }`}
            >
              <p className="text-sm font-bold text-white">{item.term}</p>
              <p className="mt-1 text-xs text-slate-400">{item.analogy}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
