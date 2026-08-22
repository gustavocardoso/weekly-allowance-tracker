import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ConfirmDialog from '@/components/ConfirmDialog';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import { useToast } from '@/contexts/ToastContext';
import { useCycle } from '@/hooks/useCycle';
import { useEntries } from '@/hooks/useEntries';
import { useProfile } from '@/hooks/useProfile';
import { useSituations } from '@/hooks/useSituations';
import { formatCurrency, formatShortDate } from '@/lib/storage';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { profile, loading: profileLoading } = useProfile();
  const { currentCycle, closeCurrentCycle } = useCycle();
  const { addEntry, removeEntry } = useEntries();
  const { situations } = useSituations();
  const { showToast } = useToast();
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);

  if (profileLoading) {
    return <DashboardSkeleton />;
  }

  if (!profile || !currentCycle) {
    return null;
  }

  const activeSituations = situations.filter((situation) => situation.active);

  const handleQuickEntry = (situationId: string) => {
    const situation = activeSituations.find((item) => item.id === situationId);
    const entry = addEntry(situationId);
    showToast({
      title: 'Entry added',
      description: situation ? `${situation.name} recorded. Totals updated right away.` : 'Totals updated right away.',
      variant: 'success',
      durationMs: 5000,
      action: {
        label: 'Undo',
        onClick: () => {
          removeEntry(entry.id);
        },
      },
    });
  };

  const handleCloseCycle = () => {
    closeCurrentCycle();
    setIsCloseDialogOpen(false);
    showToast({
      title: 'Week closed',
      description: 'A fresh cycle has been opened for the next week.',
      variant: 'info',
    });
  };

  const formatEntryTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = format(date, 'EEEE');
    const time = format(date, 'h:mm a');
    return `${dayName} • ${time}`;
  };

  return (
    <>
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 rounded-3xl border border-black/5 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <CardContent className="p-8 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
              Active Cycle
            </span>
            <h1 className="text-4xl font-extrabold tracking-tighter text-balance">
              {profile.childName}'s Progress
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {formatShortDate(currentCycle.startDate)} — {formatShortDate(currentCycle.endDate)}
            </p>

            <div className="flex items-end justify-between mt-12">
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Current Balance</span>
                <div className="text-5xl font-extrabold tracking-tighter">{formatCurrency(currentCycle.totals.finalTotalCents)}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full ring-2 ring-white shadow-sm bg-primary/10 flex items-center justify-center text-2xl">
                  {profile.childEmoji}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-foreground">{profile.childName}</p>
                  <p className="text-xs text-muted-foreground">This week's earner</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Close Week Dark Panel */}
        <Card className="bg-foreground text-background rounded-3xl border-0 shadow-sm flex flex-col justify-between">
          <CardContent className="p-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Ready to settle?</h3>
              <p className="text-background/60 text-sm mt-2 leading-relaxed">
                Lock this week's entries and transfer the total to the digital vault.
              </p>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-white/10 rounded-2xl p-4">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block">
                  Final Payout
                </span>
                <span className="text-2xl font-bold">{formatCurrency(currentCycle.totals.finalTotalCents)}</span>
              </div>
              <Button 
                className="w-full bg-background text-foreground hover:bg-background/90 font-bold py-6 rounded-2xl"
                onClick={() => setIsCloseDialogOpen(true)}
              >
                Close Cycle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="rounded-2xl border border-black/5 shadow-sm">
          <CardContent className="p-5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Base
            </span>
            <div className="text-xl font-bold mt-1">{formatCurrency(currentCycle.totals.baseAmountCents)}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-black/5 shadow-sm">
          <CardContent className="p-5">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
              Rewards
            </span>
            <div className="text-xl font-bold mt-1 text-accent">{formatCurrency(currentCycle.totals.rewardTotalCents)}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-black/5 shadow-sm">
          <CardContent className="p-5">
            <span className="text-[10px] font-bold text-destructive uppercase tracking-wider">
              Penalties
            </span>
            <div className="text-xl font-bold mt-1 text-destructive">{formatCurrency(currentCycle.totals.penaltyTotalCents)}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-black/5 shadow-sm">
          <CardContent className="p-5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Net
            </span>
            <div className="text-xl font-bold mt-1">{formatCurrency(currentCycle.totals.netAdjustmentCents)}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-black/5 shadow-sm col-span-2 md:col-span-1">
          <CardContent className="p-5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Total
            </span>
            <div className="text-xl font-bold mt-1">{formatCurrency(currentCycle.totals.finalTotalCents)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Entry */}
        <Card className="rounded-3xl border border-black/5 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg tracking-tight">Quick Entry</h3>
              <Button size="icon" className="size-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                <Plus className="size-4" />
              </Button>
            </div>
            
            {activeSituations.length === 0 ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="size-16 bg-muted rounded-2xl border border-black/5 mb-4 grid place-items-center">
                  <Wallet className="size-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm max-w-[200px]">
                  Tap the plus to add a reward or a chore entry for today.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {activeSituations.map((situation) => (
                  <button
                    key={situation.id}
                    onClick={() => handleQuickEntry(situation.id)}
                    className={`group relative flex items-center gap-3 rounded-2xl p-4 text-left transition-all hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] ${
                      situation.type === 'reward'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-destructive text-destructive-foreground'
                    }`}
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl bg-white/20">
                      {situation.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{situation.name}</p>
                      <p className="text-xs font-bold opacity-90">
                        {situation.type === 'reward' ? '+' : '-'}{formatCurrency(situation.amountCents)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Entries List */}
        <Card className="rounded-3xl border border-black/5 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg tracking-tight">Weekly Log</h3>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Newest First
              </span>
            </div>
            <div className="space-y-4">
              {currentCycle.entries.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-12">
                  No entries yet. Start with a quick tap above.
                </p>
              ) : (
                currentCycle.entries.map((entry, index) => (
                  <div 
                    key={entry.id} 
                    className={`flex items-center justify-between py-3 ${
                      index < currentCycle.entries.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`size-10 rounded-xl flex items-center justify-center ${
                        entry.type === 'reward' 
                          ? 'bg-accent/10 text-accent' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {entry.type === 'reward' ? <TrendingUp className="size-5" /> : <TrendingDown className="size-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm">
                          {entry.situation?.name || 'Entry'}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase">
                          {formatEntryTimestamp(entry.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      entry.type === 'reward' ? 'text-accent' : 'text-destructive'
                    }`}>
                      {entry.type === 'reward' ? '+' : '-'}{formatCurrency(entry.amountCents)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Close Cycle Dialog */}
      <ConfirmDialog
        isOpen={isCloseDialogOpen}
        onCancel={() => setIsCloseDialogOpen(false)}
        onConfirm={handleCloseCycle}
        title="Close this week's cycle?"
        message="This will lock all entries and start a fresh week. The final payout will be recorded."
        confirmLabel="Close Cycle"
        tone="default"
      />
    </>
  );
}
