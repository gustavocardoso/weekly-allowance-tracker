import clsx from 'clsx';
import { useState } from 'react';

import Button from '@/components/Button';
import ConfirmDialog from '@/components/ConfirmDialog';
import { SectionCard, StatTile } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';
import { useCycle } from '@/hooks/useCycle';
import { useEntries } from '@/hooks/useEntries';
import { useProfile } from '@/hooks/useProfile';
import { useSituations } from '@/hooks/useSituations';
import { formatCurrency, formatDateTime, formatShortDate } from '@/lib/storage';

export default function DashboardPage() {
  const { profile } = useProfile();
  const { currentCycle, closeCurrentCycle } = useCycle();
  const { addEntry, removeEntry } = useEntries();
  const { situations } = useSituations();
  const { showToast } = useToast();
  const [pendingUndoId, setPendingUndoId] = useState<string | null>(null);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);

  if (!profile || !currentCycle) {
    return null;
  }

  const activeSituations = situations.filter((situation) => situation.active);
  const totalAnnouncement = `Current total is ${formatCurrency(currentCycle.totals.finalTotalCents)}`;

  const handleQuickEntry = (situationId: string) => {
    const situation = activeSituations.find((item) => item.id === situationId);
    const entry = addEntry(situationId);
    setPendingUndoId(entry.id);
    showToast({
      title: 'Entry added',
      description: situation ? `${situation.name} recorded. Totals updated right away.` : 'Totals updated right away.',
      variant: 'success',
      durationMs: 5000,
      action: {
        label: 'Undo',
        onClick: () => {
          removeEntry(entry.id);
          setPendingUndoId(null);
        },
      },
    });
  };

  const handleCloseCycle = () => {
    closeCurrentCycle();
    setPendingUndoId(null);
    setIsCloseDialogOpen(false);
    showToast({
      title: 'Week closed',
      description: 'A fresh cycle has been opened for the next week.',
      variant: 'info',
    });
  };

  return (
    <div className="space-y-6">
      <SectionCard className="bg-confetti">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary-700">Current cycle</p>
            <h2 className="mt-2 text-4xl font-black text-slate-950">
              {profile.childName} {profile.childEmoji}
            </h2>
            <p className="mt-2 text-slate-800">
              {formatShortDate(currentCycle.startDate)} – {formatShortDate(currentCycle.endDate)}
            </p>
          </div>
          <div className="rounded-3xl bg-white/90 px-6 py-4 text-center shadow-lg" aria-live="polite" aria-atomic="true">
            <p className="text-sm font-semibold text-slate-700">Current total</p>
            <p className="text-4xl font-black text-primary-800">{formatCurrency(currentCycle.totals.finalTotalCents)}</p>
            <span className="sr-only">{totalAnnouncement}</span>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-5">
        <StatTile label="Base" value={formatCurrency(currentCycle.totals.baseAmountCents)} />
        <StatTile label="Rewards" value={formatCurrency(currentCycle.totals.rewardTotalCents)} />
        <StatTile label="Penalties" value={formatCurrency(currentCycle.totals.penaltyTotalCents)} />
        <StatTile label="Net" value={formatCurrency(currentCycle.totals.netAdjustmentCents)} />
        <StatTile label="Total" value={formatCurrency(currentCycle.totals.finalTotalCents)} />
      </div>

      <SectionCard>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold text-slate-950">Quick entry</h3>
            <p className="text-sm text-slate-700">Tap to record instantly</p>
          </div>
          {pendingUndoId ? <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-800">Undo ready</span> : null}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {activeSituations.map((situation) => (
            <button
              key={situation.id}
              onClick={() => handleQuickEntry(situation.id)}
              className={clsx(
                'group relative flex items-center gap-3 rounded-2xl p-3 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-[0.98]',
                situation.type === 'reward' 
                  ? 'bg-reward-600 text-white hover:bg-reward-700' 
                  : 'bg-penalty-600 text-white hover:bg-penalty-700',
              )}
              aria-label={`Record ${situation.type} ${situation.name} for ${formatCurrency(situation.amountCents)}`}
            >
              <span 
                className={clsx(
                  'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm transition-transform group-hover:scale-110',
                  situation.type === 'reward' ? 'bg-white/20' : 'bg-white/20'
                )}
                aria-hidden="true"
              >
                {situation.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight truncate">{situation.name}</p>
                <p className="mt-0.5 text-xs font-bold text-white/90">
                  {situation.type === 'reward' ? '+' : '-'}{formatCurrency(situation.amountCents)}
                </p>
              </div>
              <span 
                className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white"
              >
                {situation.type === 'reward' ? '+' : '−'}
              </span>
            </button>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_auto] lg:items-start">
        <SectionCard>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl font-bold text-slate-950">This week&apos;s entries</h3>
            <span className="text-sm text-slate-700">Newest first</span>
          </div>
          <div className="mt-4 space-y-3" aria-live="polite">
            {currentCycle.entries.length === 0 ? (
              <p className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">No entries yet. Start with a quick tap above.</p>
            ) : (
              currentCycle.entries.map((entry) => (
                <article key={entry.id} className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-semibold text-slate-950">
                      {entry.situation?.emoji ?? '✨'} {entry.situation?.name ?? 'Entry'}
                    </p>
                    <p className="text-sm text-slate-700">{formatDateTime(entry.createdAt)}</p>
                  </div>
                  <p className={clsx('font-bold', entry.type === 'reward' ? 'text-reward-800' : 'text-penalty-800')}>
                    {entry.type === 'reward' ? '+' : '-'}
                    {formatCurrency(entry.amountCents)}
                  </p>
                </article>
              ))
            )}
          </div>
        </SectionCard>

        <SectionCard className="bg-slate-950 text-white lg:w-80">
          <h3 className="text-2xl font-bold">Close this week</h3>
          <p className="mt-2 text-sm text-slate-200">Lock this cycle and start a fresh week</p>
          <div className="mt-5 rounded-3xl bg-white/10 p-4">
            <p className="text-sm text-slate-200">Final payout</p>
            <p className="mt-2 text-4xl font-black">{formatCurrency(currentCycle.totals.finalTotalCents)}</p>
          </div>
          <Button className="mt-5 w-full" variant="secondary" onClick={() => setIsCloseDialogOpen(true)}>
            Close week
          </Button>
        </SectionCard>
      </div>

      <ConfirmDialog
        isOpen={isCloseDialogOpen}
        title="Close this week?"
        message={`Close this week for ${formatCurrency(currentCycle.totals.finalTotalCents)}? A new Monday-to-Sunday cycle will be created automatically.`}
        confirmLabel="Close week"
        cancelLabel="Keep editing"
        onConfirm={handleCloseCycle}
        onCancel={() => setIsCloseDialogOpen(false)}
      />
    </div>
  );
}
