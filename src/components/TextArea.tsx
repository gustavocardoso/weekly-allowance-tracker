import { forwardRef, useId } from 'react';
import type { TextareaHTMLAttributes } from 'react';

import { classNames } from '@/utils/classNames';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { className, error, hint, id, label, rows = 4, required, ...props },
  ref,
) {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;
  const hintId = hint ? `${textAreaId}-hint` : undefined;
  const errorId = error ? `${textAreaId}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-2 text-sm font-medium text-slate-800">
      <label htmlFor={textAreaId} className="flex items-center gap-1">
        <span>{label}</span>
        {required ? <span aria-hidden="true" className="text-penalty-700">*</span> : null}
      </label>
      <textarea
        ref={ref}
        id={textAreaId}
        rows={rows}
        required={required}
        className={classNames(
          'rounded-xl border bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
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

export default TextArea;
