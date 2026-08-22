import clsx from 'clsx';
import { type ReactNode } from 'react';

import { Header } from '@/components/Header';
import { MobileNav } from '@/components/MobileNav';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:ring-2 focus:ring-ring">
        Skip to main content
      </a>
      
      <Header />
      
      <main id="main-content" tabIndex={-1} className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-slide-up">
        {children}
      </main>
      
      <MobileNav />
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
