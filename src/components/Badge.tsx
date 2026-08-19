import type { ReactNode } from 'react';

import { classNames } from '@/utils/classNames';

const badgeVariants = {
  primary: 'bg-primary-50 text-primary-700 ring-primary-200',
  reward: 'bg-reward-50 text-reward-700 ring-reward-200',
  penalty: 'bg-penalty-50 text-penalty-700 ring-penalty-200',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
} as const;

export interface BadgeProps {
  children: ReactNode;
  variant?: keyof typeof badgeVariants;
}

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return (
    <span className={classNames('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1', badgeVariants[variant])}>
      {children}
    </span>
  );
}

export default Badge;
