import type { AppData, Cycle, Entry, Situation } from '../../types/app';

export const createSituation = (overrides: Partial<Situation> = {}): Situation => ({
  id: overrides.id ?? 'situation-1',
  name: overrides.name ?? 'Helped with dishes',
  emoji: overrides.emoji ?? '🍽️',
  type: overrides.type ?? 'reward',
  amountCents: overrides.amountCents ?? 100,
  active: overrides.active ?? true,
  sortOrder: overrides.sortOrder ?? 0,
  createdAt: overrides.createdAt ?? '2026-08-18T12:00:00.000Z',
  updatedAt: overrides.updatedAt ?? '2026-08-18T12:00:00.000Z',
});

export const createCycle = (overrides: Partial<Cycle> = {}): Cycle => ({
  id: overrides.id ?? 'cycle-1',
  startDate: overrides.startDate ?? '2026-08-17',
  endDate: overrides.endDate ?? '2026-08-23',
  status: overrides.status ?? 'open',
  baseAmountCents: overrides.baseAmountCents ?? 1000,
  closedAt: overrides.closedAt ?? null,
  createdAt: overrides.createdAt ?? '2026-08-17T00:00:00.000Z',
  updatedAt: overrides.updatedAt ?? '2026-08-17T00:00:00.000Z',
});

export const createEntry = (overrides: Partial<Entry> = {}): Entry => ({
  id: overrides.id ?? 'entry-1',
  cycleId: overrides.cycleId ?? 'cycle-1',
  situationId: overrides.situationId ?? 'situation-1',
  type: overrides.type ?? 'reward',
  amountCents: overrides.amountCents ?? 100,
  note: overrides.note ?? null,
  createdAt: overrides.createdAt ?? '2026-08-18T12:00:00.000Z',
});

export const createAppData = (overrides: Partial<AppData> = {}): AppData => ({
  profile: overrides.profile ?? {
    id: 'profile-1',
    childName: 'Avery',
    childEmoji: '🦊',
    baseAmountCents: 1000,
    createdAt: '2026-08-17T00:00:00.000Z',
    updatedAt: '2026-08-17T00:00:00.000Z',
  },
  situations: overrides.situations ?? [createSituation()],
  cycles: overrides.cycles ?? [createCycle()],
  entries: overrides.entries ?? [createEntry()],
});
