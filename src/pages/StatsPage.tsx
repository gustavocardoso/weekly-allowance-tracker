import StatsSkeleton from '@/components/StatsSkeleton';
import { SectionCard, StatTile } from '@/components/ui';
import { useStats } from '@/hooks/useStats';
import { formatCurrency } from '@/lib/storage';

export default function StatsPage() {
  const { stats, loading } = useStats();

  if (loading) {
    return <StatsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <StatTile label="Total rewards" value={formatCurrency(stats.totalRewardsCents)} />
        <StatTile label="Total penalties" value={formatCurrency(stats.totalPenaltiesCents)} />
        <StatTile label="Allowance received" value={formatCurrency(stats.totalAllowanceCents)} />
        <StatTile label="Cycles completed" value={String(stats.completedCycles)} />
        <StatTile label="Average weekly" value={formatCurrency(stats.averageWeeklyAllowanceCents)} />
        <StatTile label="Most used situation" value={stats.mostUsedSituation ? `${stats.mostUsedSituation.emoji} ${stats.mostUsedSituation.name}` : '—'} hint={stats.mostUsedSituation ? `${stats.mostUsedSituationCount} uses` : undefined} />
        <StatTile label="Highest earning week" value={stats.highestEarningCycle ? formatCurrency(stats.highestEarningCycle.totals.finalTotalCents) : '—'} />
      </div>

      <SectionCard>
        <h2 className="text-2xl font-bold text-slate-950">Weekly trend</h2>
        <div className="mt-6 space-y-4">
          {stats.rewardsByCycle.length === 0 ? (
            <p className="text-sm text-slate-700">Close a few weeks to unlock charts and trends.</p>
          ) : (
            stats.rewardsByCycle.map((item) => {
              const max = Math.max(...stats.rewardsByCycle.map((value) => value.totalCents), 1);
              const width = Math.max((item.totalCents / max) * 100, 8);
              return (
                <section key={item.cycleId} aria-label={`${item.label} total ${formatCurrency(item.totalCents)}`}>
                  <div className="flex justify-between text-sm font-semibold text-slate-700">
                    <span>{item.label}</span>
                    <span>{formatCurrency(item.totalCents)}</span>
                  </div>
                  <div className="mt-2 h-4 rounded-full bg-slate-200" aria-hidden="true">
                    <div className="h-4 rounded-full bg-gradient-to-r from-primary-700 to-reward-700" style={{ width: `${width}%` }} />
                  </div>
                </section>
              );
            })
          )}
        </div>
      </SectionCard>
    </div>
  );
}
