import { Link } from 'react-router-dom';

import { EmptyState, SectionCard } from '@/components/ui';
import { useHistory } from '@/hooks/useHistory';
import { formatCurrency, formatShortDate } from '@/lib/storage';

export default function HistoryPage() {
  const { closedCycles } = useHistory();

  if (closedCycles.length === 0) {
    return <EmptyState title="No history yet" description="Close your first week to build a timeline of allowance wins." />;
  }

  return (
    <div className="space-y-4">
      {closedCycles.map((cycle) => {
        const rewardWidth = cycle.totals.rewardTotalCents + cycle.totals.penaltyTotalCents > 0 ? (cycle.totals.rewardTotalCents / (cycle.totals.rewardTotalCents + cycle.totals.penaltyTotalCents)) * 100 : 50;
        return (
          <SectionCard key={cycle.id}>
            <article className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" aria-label={`Week ${formatShortDate(cycle.startDate)} to ${formatShortDate(cycle.endDate)}, final total ${formatCurrency(cycle.totals.finalTotalCents)}`}>
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  {formatShortDate(cycle.startDate)} – {formatShortDate(cycle.endDate)}
                </h2>
                <p className="text-sm text-slate-700">Closed {cycle.closedAt ? new Date(cycle.closedAt).toLocaleDateString('en-CA') : '—'}</p>
              </div>
              <div className="min-w-0 md:min-w-52">
                <div className="flex h-3 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
                  <div className="bg-reward-700" style={{ width: `${rewardWidth}%` }} />
                  <div className="bg-penalty-700" style={{ width: `${100 - rewardWidth}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-700">
                  <span>Rewards {formatCurrency(cycle.totals.rewardTotalCents)}</span>
                  <span>Penalties {formatCurrency(cycle.totals.penaltyTotalCents)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <p className="text-2xl font-black text-slate-950">{formatCurrency(cycle.totals.finalTotalCents)}</p>
                <Link className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-[0.98]" to={`/history/${cycle.id}`}>
                  View details
                </Link>
              </div>
            </article>
          </SectionCard>
        );
      })}
    </div>
  );
}
