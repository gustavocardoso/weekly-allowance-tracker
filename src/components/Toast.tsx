import { useEffect } from 'react';

import { classNames } from '@/utils/classNames';

const toastVariants = {
  success: 'border-reward-200 bg-reward-50 text-reward-700',
  error: 'border-penalty-200 bg-penalty-50 text-penalty-700',
} as const;

export interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: keyof typeof toastVariants;
  duration?: number;
  onClose: () => void;
}

export function Toast({ isVisible, message, type = 'success', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const timeoutId = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timeoutId);
  }, [duration, isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex justify-center sm:left-auto sm:right-4 sm:inset-x-auto">
      <div
        role="status"
        aria-live="polite"
        className={classNames(
          'min-h-12 rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg transition-transform duration-200',
          toastVariants[type],
        )}
      >
        {message}
      </div>
    </div>
  );
}

export default Toast;
