import { classNames } from '@/utils/classNames';

export interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
} as const;

export function LoadingSpinner({ label = 'Loading', size = 'md' }: LoadingSpinnerProps) {
  return (
    <div className="inline-flex items-center gap-3 text-slate-600" role="status" aria-live="polite">
      <span
        className={classNames(
          'inline-block animate-spin rounded-full border-primary-200 border-t-primary-500',
          sizeClasses[size],
        )}
        aria-hidden="true"
      />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
