import { Link, useParams } from 'react-router-dom';

import { EmptyState, SectionCard, StatTile } from '@/components/ui';
import { useHistory } from '@/hooks/useHistory';
import { formatCurrency, formatDateTime, formatShortDate } from '@/lib/storage';

export default function CycleDetailPage() {
  const { id } = useParams();
  const { closedCycles } = useHistory();

  const cycle = closedCycles.find((item) => item.id === id);

  if (!cycle) {
    return <EmptyState title="Cycle not found" description="The week you are looking for is not available anymore." action={<Link to="/history" className="inline-flex min-h-11 items-center rounded-full bg-slate-900 px-4 py-2 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">Return to history</Link>} />;
  }

  return (
    <div className="space-y-6">
      <SectionCard>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary-700">Historical cycle</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">
              {formatShortDate(cycle.startDate)} – {formatShortDate(cycle.endDate)}
            </h2>
          </div>
          <Link className="inline-flex min-h-11 items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" to="/history">
            Return to history
          </Link>
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-5">
        <StatTile label="Base" value={formatCurrency(cycle.totals.baseAmountCents)} />
        <StatTile label="Rewards" value={formatCurrency(cycle.totals.rewardTotalCents)} />
        <StatTile label="Penalties" value={formatCurrency(cycle.totals.penaltyTotalCents)} />
        <StatTile label="Net" value={formatCurrency(cycle.totals.netAdjustmentCents)} />
        <StatTile label="Final" value={formatCurrency(cycle.totals.finalTotalCents)} />
      </div>

      <SectionCard>
        <h3 className="text-2xl font-bold text-slate-950">All entries</h3>
        <div className="mt-4 space-y-3 overflow-x-auto">
          {cycle.entries.map((entry) => (
            <article key={entry.id} className="min-w-[260px] rounded-3xl bg-slate-50 px-4 py-3">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-slate-950">
                    {entry.situation?.emoji ?? '✨'} {entry.situation?.name ?? 'Entry'}
                  </p>
                  <p className="text-sm text-slate-700">{formatDateTime(entry.createdAt)}</p>
                  {entry.note ? <p className="mt-1 text-sm text-slate-700">{entry.note}</p> : null}
                </div>
                <p className="font-bold text-slate-950">{entry.type === 'reward' ? '+' : '-'}{formatCurrency(entry.amountCents)}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
