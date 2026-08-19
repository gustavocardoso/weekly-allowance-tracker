import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

import { classNames } from '@/utils/classNames';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, hint, id, label, required, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-2 text-sm font-medium text-slate-800">
      <label htmlFor={inputId} className="flex items-center gap-1">
        <span>{label}</span>
        {required ? <span aria-hidden="true" className="text-penalty-700">*</span> : null}
      </label>
      <input
        ref={ref}
        id={inputId}
        required={required}
        className={classNames(
          'min-h-12 rounded-xl border bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          error ? 'border-penalty-500' : 'border-slate-300 focus:border-primary-500',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        {...props}
      />
      {hint ? <span id={hintId} className="text-xs font-normal text-slate-600">{hint}</span> : null}
      {error ? (
        <span id={errorId} className="text-xs font-semibold text-penalty-700" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
});

export default Input;
