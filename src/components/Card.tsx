import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { classNames } from '@/utils/classNames';

export interface CardProps<T extends ElementType = 'div'> {
  as?: T;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card<T extends ElementType = 'div'>({
  as,
  children,
  className,
  padded = true,
  ...props
}: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
  const Component = as ?? 'div';

  return (
    <Component
      className={classNames(
        'rounded-3xl border border-white/80 bg-white/95 shadow-[0_18px_35px_-26px_rgba(76,29,149,0.4)] ring-1 ring-primary-100/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-24px_rgba(76,29,149,0.45)]',
        padded && 'p-4 sm:p-6',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
