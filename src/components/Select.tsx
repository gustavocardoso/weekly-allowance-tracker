import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes } from 'react';

import { classNames } from '@/utils/classNames';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, error, hint, id, label, options, required, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-2 text-sm font-medium text-slate-800">
      <label htmlFor={selectId} className="flex items-center gap-1">
        <span>{label}</span>
        {required ? <span aria-hidden="true" className="text-penalty-700">*</span> : null}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          className={classNames(
            'min-h-12 w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-base text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            error ? 'border-penalty-500' : 'border-slate-300 focus:border-primary-500',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
          ▾
        </span>
      </div>
      {hint ? <span id={hintId} className="text-xs font-normal text-slate-600">{hint}</span> : null}
      {error ? <span id={errorId} className="text-xs font-semibold text-penalty-700" role="alert">{error}</span> : null}
    </div>
  );
});

export default Select;
