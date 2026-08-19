export enum SituationType {
  Reward = 'reward',
  Penalty = 'penalty',
}

export enum CycleStatus {
  Open = 'open',
  Closed = 'closed',
}

export interface Profile {
  id: number;
  childName: string;
  childEmoji: string;
  baseAllowanceCents: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Situation {
  id: number;
  profileId: number;
  name: string;
  emoji: string;
  amountCents: number;
  type: SituationType;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cycle {
  id: number;
  profileId: number;
  startDate: string;
  endDate: string;
  baseAllowanceCents: number;
  totalAdjustmentCents: number;
  finalAmountCents: number;
  status: CycleStatus;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Entry {
  id: number;
  cycleId: number;
  situationId: number;
  note: string | null;
  amountCents: number;
  createdAt: string;
}
