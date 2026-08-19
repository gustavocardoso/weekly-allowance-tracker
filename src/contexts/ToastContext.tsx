import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import Button from '@/components/Button';
import type { ToastItem } from '@/types/app';

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Record<string, number>>({});

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timersRef.current[id];
    if (timer) {
      window.clearTimeout(timer);
      delete timersRef.current[id];
    }
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = createId();
      const nextToast: ToastItem = { ...toast, id };
      setToasts((current) => [...current, nextToast]);

      const duration = toast.durationMs ?? 4000;
      timersRef.current[id] = window.setTimeout(() => {
        dismissToast(id);
      }, duration);

      return id;
    },
    [dismissToast],
  );

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      dismissToast,
    }),
    [dismissToast, showToast, toasts],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 mx-auto flex max-w-md flex-col gap-3 px-4" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <section
            key={toast.id}
            className={`pointer-events-auto rounded-3xl border px-4 py-3 shadow-lg transition ${
              toast.variant === 'success'
                ? 'border-reward-300 bg-white text-slate-900'
                : toast.variant === 'error'
                  ? 'border-penalty-300 bg-white text-slate-900'
                  : 'border-primary-300 bg-white text-slate-900'
            }`}
            role={toast.variant === 'error' ? 'alert' : 'status'}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{toast.title}</p>
                {toast.description ? <p className="text-sm text-slate-700">{toast.description}</p> : null}
                {toast.action ? (
                  <Button className="mt-2" size="sm" variant="secondary" onClick={toast.action.onClick}>
                    {toast.action.label}
                  </Button>
                ) : null}
              </div>
              <button
                className="rounded-md p-1 text-sm text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss toast"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
          </section>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
