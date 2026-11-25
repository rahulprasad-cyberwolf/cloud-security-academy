export function LogTypeSvg({ type }: { type: 'auth' | 'audit' | 'app' | 'network' | 'system' | 'security' }) {
  switch (type) {
    case 'auth':
      return (
        <svg role="img" aria-label="Authentication log icon" viewBox="0 0 64 64" className="h-12 w-12">
          <rect x="8" y="10" width="48" height="44" rx="10" fill="#082f49" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="32" cy="26" r="7" fill="none" stroke="#38bdf8" strokeWidth="2.2" />
          <path d="M20 44c2-6 22-6 24 0" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="48" cy="18" r="5" fill="#34d399" />
        </svg>
      );
    case 'audit':
      return (
        <svg role="img" aria-label="Audit log icon" viewBox="0 0 64 64" className="h-12 w-12">
          <rect x="12" y="8" width="40" height="48" rx="8" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
          <line x1="20" y1="20" x2="44" y2="20" stroke="#34d399" strokeWidth="2.2" />
          <line x1="20" y1="30" x2="40" y2="30" stroke="#94a3b8" strokeWidth="2.2" />
          <line x1="20" y1="40" x2="34" y2="40" stroke="#94a3b8" strokeWidth="2.2" />
          <circle cx="44" cy="44" r="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
          <path d="M41 44l2 2 4-4" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'app':
      return (
        <svg role="img" aria-label="Application log icon" viewBox="0 0 64 64" className="h-12 w-12">
          <rect x="8" y="12" width="48" height="40" rx="8" fill="#0f172a" stroke="#a78bfa" strokeWidth="2" />
          <line x1="8" y1="22" x2="56" y2="22" stroke="#a78bfa" strokeWidth="1.5" />
          <path d="M22 33l-6 5 6 5M42 33l6 5-6 5M34 31l-4 14" fill="none" stroke="#c4b5fd" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'network':
      return (
        <svg role="img" aria-label="Network log icon" viewBox="0 0 64 64" className="h-12 w-12">
          <circle cx="16" cy="32" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="48" cy="18" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="48" cy="46" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <line x1="23" y1="30" x2="41" y2="20" stroke="#22d3ee" strokeWidth="2" className="animate-flow" />
          <line x1="23" y1="34" x2="41" y2="44" stroke="#22d3ee" strokeWidth="2" className="animate-flow" />
        </svg>
      );
    case 'system':
      return (
        <svg role="img" aria-label="System log icon" viewBox="0 0 64 64" className="h-12 w-12">
          <rect x="12" y="12" width="40" height="16" rx="4" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
          <rect x="12" y="36" width="40" height="16" rx="4" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="20" cy="20" r="2.5" fill="#34d399" />
          <circle cx="20" cy="44" r="2.5" fill="#fbbf24" />
        </svg>
      );
    case 'security':
      return (
        <svg role="img" aria-label="Security log icon" viewBox="0 0 64 64" className="h-12 w-12">
          <path d="M32 8L50 15v14c0 12-7.5 21-18 26C21.5 50 14 41 14 29V15z" fill="#0f172a" stroke="#fb7185" strokeWidth="2.2" />
          <path d="M32 23v10m0 6h.01" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
}

export function CloudPartSvg({ part }: { part: 'server' | 'datacenter' | 'storage' | 'database' | 'compute' | 'network' | 'shield' | 'analyst' }) {
  switch (part) {
    case 'server':
      return (
        <svg role="img" aria-label="Cloud server" viewBox="0 0 64 64" className="h-11 w-11">
          <rect x="14" y="10" width="36" height="12" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <rect x="14" y="26" width="36" height="12" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <rect x="14" y="42" width="36" height="12" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="21" cy="16" r="2" fill="#34d399" />
          <circle cx="21" cy="32" r="2" fill="#34d399" />
          <circle cx="21" cy="48" r="2" fill="#22d3ee" />
        </svg>
      );
    case 'datacenter':
      return (
        <svg role="img" aria-label="Data center building" viewBox="0 0 64 64" className="h-11 w-11">
          <rect x="10" y="14" width="44" height="40" rx="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
          <rect x="16" y="22" width="12" height="24" rx="2" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="36" y="22" width="12" height="24" rx="2" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="18" y1="28" x2="26" y2="28" stroke="#34d399" strokeWidth="2" />
          <line x1="38" y1="28" x2="46" y2="28" stroke="#34d399" strokeWidth="2" />
        </svg>
      );
    case 'storage':
      return (
        <svg role="img" aria-label="Cloud storage" viewBox="0 0 64 64" className="h-11 w-11">
          <path d="M16 20h32l4 28H12z" fill="#082f49" stroke="#34d399" strokeWidth="2" />
          <path d="M18 14h28" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'database':
      return (
        <svg role="img" aria-label="Cloud database" viewBox="0 0 64 64" className="h-11 w-11">
          <ellipse cx="32" cy="16" rx="18" ry="6" fill="#082f49" stroke="#a78bfa" strokeWidth="2" />
          <path d="M14 16v30c0 3.3 8 6 18 6s18-2.7 18-6V16" fill="none" stroke="#a78bfa" strokeWidth="2" />
          <path d="M14 31c0 3.3 8 6 18 6s18-2.7 18-6" fill="none" stroke="#a78bfa" strokeWidth="2" />
        </svg>
      );
    case 'compute':
      return (
        <svg role="img" aria-label="Cloud compute" viewBox="0 0 64 64" className="h-11 w-11">
          <rect x="18" y="18" width="28" height="28" rx="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
          <rect x="25" y="25" width="14" height="14" rx="2" fill="#22d3ee" opacity="0.3" />
          <path d="M24 10v8M40 10v8M24 46v8M40 46v8M10 24h8M10 40h8M46 24h8M46 40h8" stroke="#22d3ee" strokeWidth="2" />
        </svg>
      );
    case 'network':
      return (
        <svg role="img" aria-label="Cloud network" viewBox="0 0 64 64" className="h-11 w-11">
          <circle cx="32" cy="32" r="20" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <ellipse cx="32" cy="32" rx="9" ry="20" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="12" y1="32" x2="52" y2="32" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>
      );
    case 'shield':
      return (
        <svg role="img" aria-label="Security shield" viewBox="0 0 64 64" className="h-11 w-11">
          <path d="M32 8L52 16v14c0 13-8.5 22-20 26C20.5 52 12 43 12 30V16z" fill="#064e3b" stroke="#34d399" strokeWidth="2.2" />
          <path d="M24 32l6 6 11-12" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'analyst':
      return (
        <svg role="img" aria-label="Security analyst" viewBox="0 0 64 64" className="h-11 w-11">
          <circle cx="32" cy="22" r="9" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
          <path d="M16 50c2-10 30-10 32 0" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="46" cy="42" r="6" fill="#082f49" stroke="#34d399" strokeWidth="2" />
          <line x1="50" y1="46" x2="56" y2="52" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}
