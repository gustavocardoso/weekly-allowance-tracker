export type EntryType = 'reward' | 'penalty';
export type CycleStatus = 'open' | 'closed';

export interface Profile {
  id: string;
  childName: string;
  childEmoji: string;
  baseAmountCents: number;
  createdAt: string;
  updatedAt: string;
}

export interface Situation {
  id: string;
  name: string;
  emoji: string;
  type: EntryType;
  amountCents: number;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Entry {
  id: string;
  cycleId: string;
  situationId: string;
  type: EntryType;
  amountCents: number;
  note: string | null;
  createdAt: string;
}

export interface Cycle {
  id: string;
  startDate: string;
  endDate: string;
  status: CycleStatus;
  baseAmountCents: number;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AppData {
  profile: Profile | null;
  situations: Situation[];
  cycles: Cycle[];
  entries: Entry[];
}

export interface CycleTotals {
  baseAmountCents: number;
  rewardTotalCents: number;
  penaltyTotalCents: number;
  netAdjustmentCents: number;
  finalTotalCents: number;
}

export interface EntryWithSituation extends Entry {
  situation: Situation | null;
}

export interface CycleWithEntries extends Cycle {
  entries: EntryWithSituation[];
  totals: CycleTotals;
}

export interface StatsSummary {
  totalRewardsCents: number;
  totalPenaltiesCents: number;
  totalAllowanceCents: number;
  completedCycles: number;
  averageWeeklyAllowanceCents: number;
  mostUsedSituation: Situation | null;
  mostUsedSituationCount: number;
  highestEarningCycle: CycleWithEntries | null;
  rewardsByCycle: Array<{ cycleId: string; label: string; rewardsCents: number; penaltiesCents: number; totalCents: number }>;
}

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: 'success' | 'error' | 'info';
  durationMs?: number;
  action?: ToastAction;
}

export interface SetupProfileInput {
  childName: string;
  childEmoji: string;
  baseAmountCents: number;
}

export interface SituationInput {
  name: string;
  emoji: string;
  type: EntryType;
  amountCents: number;
  active?: boolean;
}
