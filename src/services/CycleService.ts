import { endOfWeek, formatISO, startOfWeek } from 'date-fns';

import { databaseService } from '@/database/database';
import { BusinessRuleError } from '@/database/errors';
import { execute, getLastInsertRowId, getManyRows, getSingleRow, requireRow, validateIdentifier } from '@/services/helpers';
import type { Cycle, Profile } from '@/types';
import { CycleStatus } from '@/types';

function dateOnly(date: Date): string {
  return formatISO(date, { representation: 'date' });
}

function mapCycle(row: Record<string, unknown>): Cycle {
  return {
    id: Number(row.id),
    profileId: Number(row.profile_id),
    startDate: String(row.start_date),
    endDate: String(row.end_date),
    baseAllowanceCents: Number(row.base_allowance_cents),
    totalAdjustmentCents: Number(row.total_adjustment_cents),
    finalAmountCents: Number(row.final_amount_cents),
    status: String(row.status) as CycleStatus,
    closedAt: row.closed_at ? String(row.closed_at) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export class CycleService {
  private openCycleCache: Cycle | null = null;

  /** Calculate Monday-Sunday week boundaries for a given date. */
  calculateWeekDates(referenceDate: Date = new Date()): { startDate: string; endDate: string } {
    const startDate = startOfWeek(referenceDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(referenceDate, { weekStartsOn: 1 });
    return {
      startDate: dateOnly(startDate),
      endDate: dateOnly(endDate),
    };
  }

  /** Get the currently open cycle, if any. */
  async getOpenCycle(): Promise<Cycle | null> {
    await databaseService.init();
    if (this.openCycleCache) {
      return this.openCycleCache;
    }
    const cycle = getSingleRow('SELECT * FROM cycles WHERE status = ? LIMIT 1;', [CycleStatus.Open], mapCycle);
    this.openCycleCache = cycle;
    return cycle;
  }

  /** Create a new cycle from the profile's current base amount. */
  async createCycle(profile: Profile, referenceDate: Date = new Date()): Promise<Cycle> {
    await databaseService.init();
    const existingOpen = await this.getOpenCycle();
    if (existingOpen) {
      throw new BusinessRuleError('Only one open cycle is allowed at a time.');
    }

    const { startDate, endDate } = this.calculateWeekDates(referenceDate);
    const historical = getSingleRow('SELECT id FROM cycles WHERE start_date = ? AND end_date = ? LIMIT 1;', [startDate, endDate], (row) => Number(row.id));
    if (historical !== null) {
      throw new BusinessRuleError('A cycle already exists for this week. Historical cycles cannot be changed.');
    }

    const now = new Date().toISOString();
    execute(
      'INSERT INTO cycles (profile_id, start_date, end_date, base_allowance_cents, total_adjustment_cents, final_amount_cents, status, closed_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [profile.id, startDate, endDate, profile.baseAllowanceCents, 0, profile.baseAllowanceCents, CycleStatus.Open, null, now, now],
    );
    const id = getLastInsertRowId();
    this.openCycleCache = null;
    await databaseService.persist();
    return requireRow(await this.getById(id), 'Cycle was not created successfully.');
  }

  /** Close the current open cycle and freeze its totals. */
  async closeCycle(cycleId: number): Promise<Cycle> {
    await databaseService.init();
    validateIdentifier(cycleId, 'Cycle id');
    const cycle = requireRow(await this.getById(cycleId), 'Cycle does not exist.');
    if (cycle.status !== CycleStatus.Open) {
      throw new BusinessRuleError('Only open cycles can be closed.');
    }

    const closedAt = new Date().toISOString();
    execute('UPDATE cycles SET status = ?, closed_at = ?, updated_at = ? WHERE id = ?;', [CycleStatus.Closed, closedAt, closedAt, cycleId]);
    this.openCycleCache = null;
    await databaseService.persist();
    return requireRow(await this.getById(cycleId), 'Cycle was not found after closing.');
  }

  /** Get historical closed cycles ordered newest first. */
  async getHistory(limit = 20, offset = 0): Promise<Cycle[]> {
    await databaseService.init();
    if (!Number.isInteger(limit) || limit <= 0 || limit > 500) {
      throw new BusinessRuleError('History limit must be between 1 and 500.');
    }
    if (!Number.isInteger(offset) || offset < 0) {
      throw new BusinessRuleError('History offset must be a non-negative integer.');
    }
    return getManyRows(
      'SELECT * FROM cycles WHERE status = ? ORDER BY start_date DESC LIMIT ? OFFSET ?;',
      [CycleStatus.Closed, limit, offset],
      mapCycle,
    );
  }

  async getById(id: number): Promise<Cycle | null> {
    await databaseService.init();
    validateIdentifier(id, 'Cycle id');
    return getSingleRow('SELECT * FROM cycles WHERE id = ?;', [id], mapCycle);
  }

  invalidateOpenCycleCache(): void {
    this.openCycleCache = null;
  }
}

export const cycleService = new CycleService();
