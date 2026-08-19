import { useEffect, useId, useRef } from 'react';

import Button from '@/components/Button';
import { useFocusTrap } from '@/components/accessibility';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  icon?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  icon = tone === 'danger' ? '⚠️' : '✨',
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const messageId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(isOpen, dialogRef, cancelButtonRef);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full max-w-md rounded-[2rem] border border-white/80 bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] focus:outline-none animate-[dialog-in_220ms_ease-out]"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-confetti px-5 py-5 sm:px-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-white/85 text-3xl shadow-sm">
              <span aria-hidden="true">{icon}</span>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-primary-700">One more check</p>
              <h2 id={titleId} className="text-2xl font-black tracking-tight text-slate-900">
                {title}
              </h2>
              <p id={messageId} className="text-sm leading-6 text-slate-700">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-3 px-5 py-5 sm:flex-row sm:justify-end sm:px-6">
          <Button ref={cancelButtonRef} variant="secondary" onClick={onCancel} className="w-full sm:w-auto">
            {cancelLabel}
          </Button>
          <Button
            variant={tone === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            className="w-full sm:w-auto"
            disabled={isConfirming}
          >
            {isConfirming ? 'Working…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
