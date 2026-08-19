import type { ReactNode } from 'react';

import Card from '@/components/Card';

export interface StatCardProps {
  label: string;
  value: ReactNode;
  emoji: string;
  helperText?: string;
}

export function StatCard({ label, value, emoji, helperText }: StatCardProps) {
  return (
    <Card className="flex h-full flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <div className="mt-2 text-2xl font-black text-slate-900">{value}</div>
        </div>
        <span className="text-4xl" aria-hidden="true">
          {emoji}
        </span>
      </div>
      {helperText ? <p className="text-sm text-slate-500">{helperText}</p> : null}
    </Card>
  );
}

export default StatCard;
