import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { classNames } from '@/utils/classNames';

export interface ContainerProps<T extends ElementType = 'div'> {
  as?: T;
  children: ReactNode;
  className?: string;
}

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as ?? 'div';

  return (
    <Component className={classNames('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </Component>
  );
}

export default Container;
