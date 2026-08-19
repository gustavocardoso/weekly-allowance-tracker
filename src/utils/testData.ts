import { addDays, subDays } from 'date-fns';

import { createCycleRecord, createProfileAndFirstCycle, validateAppData } from '@/lib/storage';
import type { AppData, Entry, SetupProfileInput, Situation } from '@/types/app';

interface TestDataOptions {
  profile?: SetupProfileInput;
  weeks?: number;
}

const DEFAULT_PROFILE: SetupProfileInput = {
  childName: 'Avery',
  childEmoji: '🦊',
  baseAmountCents: 1200,
};

const isoNow = () => new Date().toISOString();

/**
 * Generates realistic sample data for demos and manual testing.
 */
export function generateTestData(options: TestDataOptions = {}): AppData {
  const profileInput = options.profile ?? DEFAULT_PROFILE;
  const weeks = Math.max(2, options.weeks ?? 4);
  const seed = createProfileAndFirstCycle(profileInput);
  const now = isoNow();

  const situations: Situation[] = [
    ...seed.situations,
    {
      id: crypto.randomUUID(),
      name: 'Finished homework early',
      emoji: '✏️',
      type: 'reward',
      amountCents: 150,
      active: true,
      sortOrder: seed.situations.length,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      name: 'Left bike outside',
      emoji: '🚲',
      type: 'penalty',
      amountCents: 75,
      active: true,
      sortOrder: seed.situations.length + 1,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const closedCycles = Array.from({ length: weeks - 1 }, (_, index) => {
    const referenceDate = subDays(new Date(), (weeks - index - 1) * 7);
    const cycle = createCycleRecord(profileInput.baseAmountCents, referenceDate);
    return {
      ...cycle,
      status: 'closed' as const,
      closedAt: addDays(new Date(cycle.endDate), 1).toISOString(),
      updatedAt: addDays(new Date(cycle.endDate), 1).toISOString(),
    };
  });

  const openCycle = createCycleRecord(profileInput.baseAmountCents, new Date());
  const cycles = [...closedCycles, openCycle];

  const entries: Entry[] = cycles.flatMap((cycle, cycleIndex) => {
    const selected = situations.slice(0, 3 + (cycleIndex % 2));
    return selected.map((situation, entryIndex) => ({
      id: crypto.randomUUID(),
      cycleId: cycle.id,
      situationId: situation.id,
      type: situation.type,
      amountCents: situation.amountCents,
      note: entryIndex % 2 === 0 ? `Sample note for ${situation.name}` : null,
      createdAt: addDays(new Date(cycle.startDate), Math.min(entryIndex + 1, 6)).toISOString(),
    }));
  });

  return validateAppData({
    profile: seed.profile,
    situations,
    cycles,
    entries,
  });
}

export function createTestDataJson(options?: TestDataOptions) {
  return JSON.stringify(generateTestData(options), null, 2);
}
