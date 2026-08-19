import type { ReactNode } from 'react';

import Container from '@/components/Container';
import { classNames } from '@/utils/classNames';

export interface PageProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Page({ children, className, containerClassName }: PageProps) {
  return (
    <main className={classNames('min-h-screen bg-gradient-to-br from-primary-100 via-white to-reward-100 py-6 sm:py-8', className)}>
      <Container className={classNames('flex flex-col gap-6', containerClassName)}>{children}</Container>
    </main>
  );
}

export default Page;
