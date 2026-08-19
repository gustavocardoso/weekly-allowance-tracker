import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { classNames } from '@/utils/classNames';

const variantClasses = {
  primary: 'bg-primary-700 text-white shadow-sm hover:bg-primary-800 focus-visible:ring-primary-500',
  secondary:
    'bg-white text-slate-800 ring-1 ring-slate-300 hover:bg-slate-50 focus-visible:ring-primary-500',
  danger: 'bg-penalty-700 text-white shadow-sm hover:bg-penalty-800 focus-visible:ring-penalty-500',
} as const;

const sizeClasses = {
  sm: 'min-h-10 px-4 py-2 text-sm',
  md: 'min-h-12 px-5 py-3 text-sm sm:text-base',
  lg: 'min-h-14 px-6 py-4 text-base',
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={classNames(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:saturate-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
