import { addDays, endOfWeek, formatISO, parseISO, startOfWeek } from 'date-fns';

import { DatabaseError, ValidationError } from '@/database/errors';
import { databaseService } from '@/database/database';
import type {
  AppData,
  Cycle,
  CycleTotals,
  CycleWithEntries,
  Entry,
  EntryWithSituation,
  Profile,
  SetupProfileInput,
  Situation,
  SituationInput,
  StatsSummary,
} from '@/types/app';

const STORAGE_KEY = 'allowance-tracker-data';
const EXPORT_VERSION = 1;
const DATABASE_MIME_TYPE = 'application/x-sqlite3';

const defaultSituations: SituationInput[] = [
  { name: 'Helped with chores', emoji: '🧹', type: 'reward', amountCents: 100, active: true },
  { name: 'Practiced reading', emoji: '📚', type: 'reward', amountCents: 50, active: true },
  { name: 'Forgot to tidy up', emoji: '🧸', type: 'penalty', amountCents: 25, active: true },
  { name: 'Missed bedtime routine', emoji: '🌙', type: 'penalty', amountCents: 50, active: true },
];

interface ExportMetadata {
  exportedAt: string;
  version: number;
  source: 'weekly-allowance-tracker';
}

export interface ExportPayload {
  metadata: ExportMetadata;
  profile: Profile | null;
  situations: Situation[];
  cycles: Cycle[];
  entries: Entry[];
}

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const isoNow = () => new Date().toISOString();

const createEmptyData = (): AppData => ({
  profile: null,
  situations: [],
  cycles: [],
  entries: [],
});

const isPlainObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

const isIsoDate = (value: unknown) => typeof value === 'string' && !Number.isNaN(Date.parse(value));
const isDateOnly = (value: unknown) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);

const assertNonNegativeInteger = (value: unknown, fieldName: string): number => {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    throw new ValidationError(`${fieldName} must be a non-negative integer amount in cents.`);
  }
  return value;
};

const assertTrimmedString = (value: unknown, fieldName: string) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new ValidationError(`${fieldName} is required.`);
  }
  return value.trim();
};

const assertEntryType = (value: unknown): 'reward' | 'penalty' => {
  if (value !== 'reward' && value !== 'penalty') {
    throw new ValidationError('Entry type must be reward or penalty.');
  }
  return value;
};

const assertCycleStatus = (value: unknown): 'open' | 'closed' => {
  if (value !== 'open' && value !== 'closed') {
    throw new ValidationError('Cycle status must be open or closed.');
  }
  return value;
};

const validateProfileRecord = (value: unknown): Profile | null => {
  if (value == null) {
    return null;
  }
  if (!isPlainObject(value)) {
    throw new ValidationError('Profile must be an object.');
  }

  return {
    id: assertTrimmedString(value.id, 'Profile id'),
    childName: assertTrimmedString(value.childName, 'Child name'),
    childEmoji: assertTrimmedString(value.childEmoji, 'Child emoji'),
    baseAmountCents: assertNonNegativeInteger(value.baseAmountCents, 'Base amount'),
    createdAt: isIsoDate(value.createdAt) ? String(value.createdAt) : (() => { throw new ValidationError('Profile createdAt must be a valid date.'); })(),
    updatedAt: isIsoDate(value.updatedAt) ? String(value.updatedAt) : (() => { throw new ValidationError('Profile updatedAt must be a valid date.'); })(),
  };
};

const validateSituationRecord = (value: unknown): Situation => {
  if (!isPlainObject(value)) {
    throw new ValidationError('Each situation must be an object.');
  }

  return {
    id: assertTrimmedString(value.id, 'Situation id'),
    name: assertTrimmedString(value.name, 'Situation name'),
    emoji: assertTrimmedString(value.emoji, 'Situation emoji'),
    type: assertEntryType(value.type),
    amountCents: assertNonNegativeInteger(value.amountCents, 'Situation amount'),
    active: typeof value.active === 'boolean' ? value.active : (() => { throw new ValidationError('Situation active flag must be true or false.'); })(),
    sortOrder: Number.isInteger(value.sortOrder) && Number(value.sortOrder) >= 0 ? Number(value.sortOrder) : (() => { throw new ValidationError('Situation sort order must be a non-negative integer.'); })(),
    createdAt: isIsoDate(value.createdAt) ? String(value.createdAt) : (() => { throw new ValidationError('Situation createdAt must be a valid date.'); })(),
    updatedAt: isIsoDate(value.updatedAt) ? String(value.updatedAt) : (() => { throw new ValidationError('Situation updatedAt must be a valid date.'); })(),
  };
};

const validateCycleRecord = (value: unknown): Cycle => {
  if (!isPlainObject(value)) {
    throw new ValidationError('Each cycle must be an object.');
  }

  const status = assertCycleStatus(value.status);
  const closedAt = value.closedAt === null ? null : isIsoDate(value.closedAt) ? String(value.closedAt) : (() => { throw new ValidationError('Cycle closedAt must be a valid date or null.'); })();
  const cycle: Cycle = {
    id: assertTrimmedString(value.id, 'Cycle id'),
    startDate: isDateOnly(value.startDate) ? String(value.startDate) : (() => { throw new ValidationError('Cycle startDate must use YYYY-MM-DD format.'); })(),
    endDate: isDateOnly(value.endDate) ? String(value.endDate) : (() => { throw new ValidationError('Cycle endDate must use YYYY-MM-DD format.'); })(),
    status,
    baseAmountCents: assertNonNegativeInteger(value.baseAmountCents, 'Cycle base amount'),
    closedAt,
    createdAt: isIsoDate(value.createdAt) ? String(value.createdAt) : (() => { throw new ValidationError('Cycle createdAt must be a valid date.'); })(),
    updatedAt: isIsoDate(value.updatedAt) ? String(value.updatedAt) : (() => { throw new ValidationError('Cycle updatedAt must be a valid date.'); })(),
  };

  if (cycle.startDate > cycle.endDate) {
    throw new ValidationError(`Cycle ${cycle.id} has an invalid date range.`);
  }
  if (status === 'open' && closedAt !== null) {
    throw new ValidationError(`Open cycle ${cycle.id} cannot have a closedAt timestamp.`);
  }
  if (status === 'closed' && closedAt === null) {
    throw new ValidationError(`Closed cycle ${cycle.id} must include closedAt.`);
  }

  return cycle;
};

const validateEntryRecord = (value: unknown): Entry => {
  if (!isPlainObject(value)) {
    throw new ValidationError('Each entry must be an object.');
  }

  return {
    id: assertTrimmedString(value.id, 'Entry id'),
    cycleId: assertTrimmedString(value.cycleId, 'Entry cycleId'),
    situationId: assertTrimmedString(value.situationId, 'Entry situationId'),
    type: assertEntryType(value.type),
    amountCents: assertNonNegativeInteger(value.amountCents, 'Entry amount'),
    note: value.note == null ? null : typeof value.note === 'string' ? String(value.note) : (() => { throw new ValidationError('Entry note must be a string or null.'); })(),
    createdAt: isIsoDate(value.createdAt) ? String(value.createdAt) : (() => { throw new ValidationError('Entry createdAt must be a valid date.'); })(),
  };
};

/**
 * Validates imported/exported tracker data and enforces core integrity rules.
 */
export const validateAppData = (value: unknown): AppData => {
  if (!isPlainObject(value)) {
    throw new ValidationError('Imported data must be a JSON object.');
  }

  const profile = validateProfileRecord('profile' in value ? value.profile : null);
  const situations = Array.isArray(value.situations) ? value.situations.map(validateSituationRecord) : (() => { throw new ValidationError('Imported data must include a situations array.'); })();
  const cycles = Array.isArray(value.cycles) ? value.cycles.map(validateCycleRecord) : (() => { throw new ValidationError('Imported data must include a cycles array.'); })();
  const entries = Array.isArray(value.entries) ? value.entries.map(validateEntryRecord) : (() => { throw new ValidationError('Imported data must include an entries array.'); })();

  const situationIds = new Set<string>();
  for (const situation of situations) {
    if (situationIds.has(situation.id)) {
      throw new ValidationError(`Duplicate situation id found: ${situation.id}`);
    }
    situationIds.add(situation.id);
  }

  const cycleIds = new Set<string>();
  let openCycleCount = 0;
  for (const cycle of cycles) {
    if (cycleIds.has(cycle.id)) {
      throw new ValidationError(`Duplicate cycle id found: ${cycle.id}`);
    }
    cycleIds.add(cycle.id);
    if (cycle.status === 'open') {
      openCycleCount += 1;
    }
  }

  if (openCycleCount > 1) {
    throw new ValidationError('Imported data cannot contain more than one open cycle.');
  }

  const historicalCycleIds = new Set(cycles.filter((cycle) => cycle.status === 'closed').map((cycle) => cycle.id));
  const entryIds = new Set<string>();
  for (const entry of entries) {
    if (entryIds.has(entry.id)) {
      throw new ValidationError(`Duplicate entry id found: ${entry.id}`);
    }
    entryIds.add(entry.id);
    if (!cycleIds.has(entry.cycleId)) {
      throw new ValidationError(`Entry ${entry.id} references a missing cycle.`);
    }
    if (!situationIds.has(entry.situationId)) {
      throw new ValidationError(`Entry ${entry.id} references a missing situation.`);
    }
    const situation = situations.find((item) => item.id === entry.situationId);
    if (!situation) {
      throw new ValidationError(`Entry ${entry.id} references an unknown situation.`);
    }
    if (entry.type !== situation.type) {
      throw new ValidationError(`Entry ${entry.id} type does not match situation ${situation.id}.`);
    }
    if (entry.amountCents !== situation.amountCents) {
      throw new ValidationError(`Entry ${entry.id} amount does not match situation ${situation.id}. Historical data must stay immutable.`);
    }
    if (historicalCycleIds.has(entry.cycleId)) {
      continue;
    }
  }

  if (profile && cycles.some((cycle) => cycle.baseAmountCents < 0)) {
    throw new ValidationError('Cycle base amounts must not be negative.');
  }

  return { profile, situations, cycles, entries };
};

export const loadAppData = (): AppData => {
  if (typeof window === 'undefined') {
    return createEmptyData();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createEmptyData();
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return validateAppData(parsed);
  } catch (error) {
    console.error('Failed to load app data from localStorage.', error);
    return createEmptyData();
  }
};

export const saveAppData = (data: AppData) => {
  console.log('[storage] saveAppData called with:', data);
  try {
    const validated = validateAppData(data);
    console.log('[storage] Data validated successfully');
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
    console.log('[storage] Data saved to localStorage');
  } catch (error) {
    console.error('[storage] Failed to save app data:', error);
    throw error;
  }
};

/** Returns the Monday-Sunday date boundaries for the supplied date. */
export const getWeekRange = (date = new Date()) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });

  return {
    startDate: formatISO(start, { representation: 'date' }),
    endDate: formatISO(end, { representation: 'date' }),
  };
};

export const createCycleRecord = (baseAmountCents: number, date = new Date()): Cycle => {
  const now = isoNow();
  const { startDate, endDate } = getWeekRange(date);

  return {
    id: createId(),
    startDate,
    endDate,
    status: 'open',
    baseAmountCents,
    closedAt: null,
    createdAt: now,
    updatedAt: now,
  };
};

export const createProfileAndFirstCycle = (input: SetupProfileInput): AppData => {
  console.log('[storage] createProfileAndFirstCycle called with:', input);
  const now = isoNow();
  const profile: Profile = {
    id: createId(),
    childName: input.childName.trim(),
    childEmoji: input.childEmoji,
    baseAmountCents: input.baseAmountCents,
    createdAt: now,
    updatedAt: now,
  };
  console.log('[storage] Created profile:', profile);

  const cycle = createCycleRecord(input.baseAmountCents);
  console.log('[storage] Created cycle:', cycle);
  
  const situations = defaultSituations.map((item, index) => ({
    id: createId(),
    name: item.name,
    emoji: item.emoji,
    type: item.type,
    amountCents: item.amountCents,
    active: item.active ?? true,
    sortOrder: index,
    createdAt: now,
    updatedAt: now,
  }));
  console.log('[storage] Created situations:', situations);

  const appData = {
    profile,
    situations,
    cycles: [cycle],
    entries: [],
  };
  console.log('[storage] Validating app data...');
  const validated = validateAppData(appData);
  console.log('[storage] App data validated successfully');
  return validated;
};

/** Calculates the final weekly total using base allowance plus rewards minus penalties. */
export const calculateCycleTotals = (cycle: Cycle, entries: Entry[]): CycleTotals => {
  const rewardTotalCents = entries.filter((entry) => entry.type === 'reward').reduce((sum, entry) => sum + entry.amountCents, 0);
  const penaltyTotalCents = entries.filter((entry) => entry.type === 'penalty').reduce((sum, entry) => sum + entry.amountCents, 0);
  const netAdjustmentCents = rewardTotalCents - penaltyTotalCents;

  return {
    baseAmountCents: cycle.baseAmountCents,
    rewardTotalCents,
    penaltyTotalCents,
    netAdjustmentCents,
    finalTotalCents: cycle.baseAmountCents + netAdjustmentCents,
  };
};

export const buildCycleWithEntries = (cycle: Cycle, entries: Entry[], situations: Situation[]): CycleWithEntries => {
  const entriesWithSituation: EntryWithSituation[] = [...entries]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((entry) => ({
      ...entry,
      situation: situations.find((situation) => situation.id === entry.situationId) ?? null,
    }));

  return {
    ...cycle,
    entries: entriesWithSituation,
    totals: calculateCycleTotals(cycle, entries),
  };
};

export const buildStatsSummary = (cycles: Cycle[], entries: Entry[], situations: Situation[]): StatsSummary => {
  const closedCycles = cycles
    .filter((cycle) => cycle.status === 'closed')
    .sort((a, b) => b.endDate.localeCompare(a.endDate));

  const rewards = entries.filter((entry) => entry.type === 'reward').reduce((sum, entry) => sum + entry.amountCents, 0);
  const penalties = entries.filter((entry) => entry.type === 'penalty').reduce((sum, entry) => sum + entry.amountCents, 0);

  const cyclesWithEntries = closedCycles.map((cycle) => {
    const cycleEntries = entries.filter((entry) => entry.cycleId === cycle.id);
    return buildCycleWithEntries(cycle, cycleEntries, situations);
  });

  const highestEarningCycle = cyclesWithEntries.reduce<CycleWithEntries | null>((best, cycle) => {
    if (!best || cycle.totals.finalTotalCents > best.totals.finalTotalCents) {
      return cycle;
    }
    return best;
  }, null);

  const usageCounts = entries.reduce<Record<string, number>>((accumulator, entry) => {
    accumulator[entry.situationId] = (accumulator[entry.situationId] ?? 0) + 1;
    return accumulator;
  }, {});

  const [mostUsedSituationId, mostUsedSituationCount] = Object.entries(usageCounts).sort((a, b) => b[1] - a[1])[0] ?? [null, 0];

  const rewardsByCycle = cyclesWithEntries
    .slice()
    .reverse()
    .map((cycle) => ({
      cycleId: cycle.id,
      label: `${formatShortDate(cycle.startDate)}–${formatShortDate(cycle.endDate)}`,
      rewardsCents: cycle.totals.rewardTotalCents,
      penaltiesCents: cycle.totals.penaltyTotalCents,
      totalCents: cycle.totals.finalTotalCents,
    }));

  const totalAllowanceCents = cyclesWithEntries.reduce((sum, cycle) => sum + cycle.totals.finalTotalCents, 0);

  return {
    totalRewardsCents: rewards,
    totalPenaltiesCents: penalties,
    totalAllowanceCents,
    completedCycles: closedCycles.length,
    averageWeeklyAllowanceCents: closedCycles.length > 0 ? Math.round(totalAllowanceCents / closedCycles.length) : 0,
    mostUsedSituation: mostUsedSituationId ? situations.find((situation) => situation.id === mostUsedSituationId) ?? null : null,
    mostUsedSituationCount: mostUsedSituationCount ?? 0,
    highestEarningCycle,
    rewardsByCycle,
  };
};

export const createNextWeekDate = (cycle: Cycle) => addDays(parseISO(cycle.endDate), 1);

export const formatCurrency = (valueInCents: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(valueInCents / 100);

export const formatShortDate = (value: string) =>
  new Intl.DateTimeFormat('en-CA', {
    month: 'short',
    day: 'numeric',
  }).format(parseISO(value));

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parseISO(value));

/** Serializes a portable backup payload including profile, situations, cycles, and entries. */
export const exportAppData = (data: AppData) =>
  JSON.stringify(
    {
      metadata: {
        exportedAt: isoNow(),
        version: EXPORT_VERSION,
        source: 'weekly-allowance-tracker',
      },
      ...validateAppData(data),
    } satisfies ExportPayload,
    null,
    2,
  );

export const createBackupFileName = (date = new Date()) => `allowance-backup-${formatISO(date, { representation: 'date' })}.json`;

export const createDatabaseFileName = (date = new Date()) => `allowance-backup-${formatISO(date, { representation: 'date' })}.sqlite`;

/**
 * Parses an imported JSON backup, validates its shape, and rejects corrupt or inconsistent data.
 */
export const importAppData = (raw: string): AppData => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw) as unknown;
  } catch (error) {
    console.error('Failed to parse imported backup JSON.', error);
    throw new ValidationError('The selected file is not valid JSON. Please choose a backup exported by this app.');
  }

  if (!isPlainObject(parsed)) {
    throw new ValidationError('Imported file must contain a backup object.');
  }

  const candidate = isPlainObject(parsed.metadata) && 'profile' in parsed ? parsed : parsed;
  const data = validateAppData(candidate);
  return data;
};

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  } finally {
    URL.revokeObjectURL(url);
  }
};

export const exportDatabaseFile = async () => {
  try {
    await databaseService.init();
    const bytes = databaseService.export();
    if (bytes.length === 0) {
      throw new DatabaseError('There is no database content available to export yet.');
    }

    downloadBlob(new Blob([new Uint8Array(bytes)], { type: DATABASE_MIME_TYPE }), createDatabaseFileName());
  } catch (error) {
    console.error('Failed to export raw database file.', error);
    throw error instanceof Error ? error : new DatabaseError('Failed to export database file.');
  }
};
