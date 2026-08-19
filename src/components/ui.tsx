import clsx from 'clsx';
import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { LoadingSpinner } from '@/components/LoadingSpinner';

export function AppShell({ children }: { children: ReactNode }) {
  const links = [
    { to: '/', label: 'Home', emoji: '🏠' },
    { to: '/situations', label: 'Situations', emoji: '🎈' },
    { to: '/history', label: 'History', emoji: '🗂️' },
    { to: '/stats', label: 'Stats', emoji: '📈' },
    { to: '/settings', label: 'Settings', emoji: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f1] via-[#f8fbff] to-[#f4f2ff] text-slate-900">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:ring-2 focus:ring-primary-500">
        Skip to main content
      </a>
      <header className="sticky top-0 z-30 border-b border-white/80 bg-white/85 shadow-[0_10px_30px_-22px_rgba(76,29,149,0.5)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.38em] text-primary-700 sm:text-xs">Weekly Allowance Tracker</p>
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">Pocket-money parade</h1>
          </div>
          <nav className="-mx-1 overflow-x-auto pb-1" aria-label="Primary navigation">
            <div className="flex min-w-max gap-2 px-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    clsx(
                      'inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-[0.98]',
                      isActive
                        ? 'bg-slate-900 text-white shadow-lg shadow-primary-900/15'
                        : 'bg-white/95 text-slate-700 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-800 hover:shadow-md',
                    )
                  }
                >
                  <span aria-hidden="true" className="text-base">
                    {link.emoji}
                  </span>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-4 sm:px-5 sm:py-6">{children}</main>
    </div>
  );
}

export function SectionCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={clsx(
        'rounded-4xl border border-white/80 bg-white/92 p-4 shadow-[0_20px_45px_-28px_rgba(76,29,149,0.35)] ring-1 ring-primary-100/70 transition-all duration-200 sm:p-5',
        className,
      )}
    >
      {children}
    </section>
  );
}

export function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <section aria-label={label} className="rounded-3xl border border-white/90 bg-gradient-to-br from-white to-primary-50/50 p-4 shadow-[0_16px_30px_-24px_rgba(91,33,182,0.5)] ring-1 ring-primary-100/80 transition-transform duration-200 hover:-translate-y-0.5">
      <h2 className="text-sm font-bold text-slate-600">{label}</h2>
      <p className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-[1.75rem]">{value}</p>
      {hint ? <p className="mt-1 text-xs font-medium text-slate-500">{hint}</p> : null}
    </section>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <section className="rounded-4xl border border-dashed border-primary-200 bg-white/80 p-6 text-center shadow-sm" aria-live="polite">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-2xl" aria-hidden="true">
        🌤️
      </div>
      <h2 className="mt-4 text-xl font-black">{title}</h2>
      <p className="mt-2 text-slate-600">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </section>
  );
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center" role="status" aria-live="polite">
      <div className="rounded-full border border-white/80 bg-white/90 px-5 py-3 shadow-lg ring-1 ring-primary-100">
        <LoadingSpinner label={label} />
      </div>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  const isDatabaseError = message.toLowerCase().includes('unable to load situations') || 
                         (message.toLowerCase().includes('database') && !message.includes('localStorage mode'));
  
  // Only redirect if it's a fatal database error, not a warning
  if (isDatabaseError && message.includes('Unable to load situations')) {
    // Redirect to force reset page
    window.location.href = '/force-reset.html';
    
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fff8f1] via-[#f8fbff] to-[#f4f2ff] p-4">
        <section className="w-full max-w-lg rounded-4xl border border-penalty-200 bg-white p-8 shadow-xl ring-1 ring-penalty-100" role="alert">
          <div className="text-center">
            <div className="mb-4 text-6xl" role="img" aria-label="Loading">⏳</div>
            <p className="text-lg text-slate-700">Redirecting to reset tool...</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <section className="rounded-4xl border border-penalty-200 bg-white p-5 text-penalty-900 shadow-sm ring-1 ring-penalty-100" role="alert">
      <p className="font-bold">Something went wrong</p>
      <p className="mt-1 text-sm">{message}</p>
    </section>
  );
}
