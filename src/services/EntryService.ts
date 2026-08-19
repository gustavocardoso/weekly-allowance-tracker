import { BusinessRuleError } from '@/database/errors';
import { databaseService } from '@/database/database';
import { cycleService } from '@/services/CycleService';
import { execute, getLastInsertRowId, getManyRows, getSingleRow, requireRow, sanitizeOptionalText, validateIdentifier } from '@/services/helpers';
import type { Entry, Situation } from '@/types';
import { CycleStatus, SituationType } from '@/types';

interface AddEntryInput {
  cycleId: number;
  situation: Situation;
  note?: string | null;
}

function mapEntry(row: Record<string, unknown>): Entry {
  return {
    id: Number(row.id),
    cycleId: Number(row.cycle_id),
    situationId: Number(row.situation_id),
    note: row.note ? String(row.note) : null,
    amountCents: Number(row.amount_cents),
    createdAt: String(row.created_at),
  };
}

export class EntryService {
  /** Add an entry to the open cycle and update cached totals. */
  async addEntry(input: AddEntryInput): Promise<Entry> {
    await databaseService.init();
    validateIdentifier(input.cycleId, 'Cycle id');
    validateIdentifier(input.situation.id, 'Situation id');

    const cycle = requireRow(await cycleService.getById(input.cycleId), 'Cycle does not exist.');
    if (cycle.status !== CycleStatus.Open) {
      throw new BusinessRuleError('Entries can only be added to an open cycle.');
    }
    if (!input.situation.isActive) {
      throw new BusinessRuleError('Entries can only use active situations.');
    }

    const adjustment = input.situation.type === SituationType.Penalty ? -input.situation.amountCents : input.situation.amountCents;
    const now = new Date().toISOString();

    execute('BEGIN;');
    try {
      execute(
        'INSERT INTO entries (cycle_id, situation_id, note, amount_cents, created_at) VALUES (?, ?, ?, ?, ?);',
        [input.cycleId, input.situation.id, sanitizeOptionalText(input.note, 'Entry note', 500), input.situation.amountCents, now],
      );
      execute(
        'UPDATE cycles SET total_adjustment_cents = total_adjustment_cents + ?, final_amount_cents = base_allowance_cents + total_adjustment_cents + ?, updated_at = ? WHERE id = ?;',
        [adjustment, adjustment, now, input.cycleId],
      );
      execute('COMMIT;');
    } catch (error) {
      try {
        execute('ROLLBACK;');
      } catch {
        // ignore rollback failure
      }
      throw error;
    }

    const id = getLastInsertRowId();
    cycleService.invalidateOpenCycleCache();
    await databaseService.persist();
    return requireRow(await this.getById(id), 'Entry was not created successfully.');
  }

  /** Remove a specific entry from an open cycle and reverse its effect. */
  async removeEntry(entryId: number): Promise<void> {
    await databaseService.init();
    validateIdentifier(entryId, 'Entry id');
    const entryWithType = getSingleRow(
      `SELECT e.id, e.cycle_id, e.amount_cents, s.type
       FROM entries e
       INNER JOIN situations s ON s.id = e.situation_id
       WHERE e.id = ?;`,
      [entryId],
      (row) => ({
        id: Number(row.id),
        cycleId: Number(row.cycle_id),
        amountCents: Number(row.amount_cents),
        type: String(row.type) as SituationType,
      }),
    );
    const entry = requireRow(entryWithType, 'Entry does not exist.');
    const cycle = requireRow(await cycleService.getById(entry.cycleId), 'Cycle does not exist.');
    if (cycle.status !== CycleStatus.Open) {
      throw new BusinessRuleError('Entries can only be removed from an open cycle.');
    }

    const adjustment = entry.type === SituationType.Penalty ? entry.amountCents : -entry.amountCents;
    const now = new Date().toISOString();

    execute('BEGIN;');
    try {
      execute('DELETE FROM entries WHERE id = ?;', [entryId]);
      execute(
        'UPDATE cycles SET total_adjustment_cents = total_adjustment_cents + ?, final_amount_cents = base_allowance_cents + total_adjustment_cents + ?, updated_at = ? WHERE id = ?;',
        [adjustment, adjustment, now, entry.cycleId],
      );
      execute('COMMIT;');
    } catch (error) {
      try {
        execute('ROLLBACK;');
      } catch {
        // ignore rollback failure
      }
      throw error;
    }

    cycleService.invalidateOpenCycleCache();
    await databaseService.persist();
  }

  /** Get entries for a cycle ordered newest first. */
  async getEntriesForCycle(cycleId: number): Promise<Entry[]> {
    await databaseService.init();
    validateIdentifier(cycleId, 'Cycle id');
    return getManyRows('SELECT * FROM entries WHERE cycle_id = ? ORDER BY created_at DESC, id DESC;', [cycleId], mapEntry);
  }

  /** Undo the most recent entry in an open cycle. */
  async undoLastEntry(cycleId: number): Promise<void> {
    await databaseService.init();
    validateIdentifier(cycleId, 'Cycle id');
    const cycle = requireRow(await cycleService.getById(cycleId), 'Cycle does not exist.');
    if (cycle.status !== CycleStatus.Open) {
      throw new BusinessRuleError('Only open cycles support undo.');
    }
    const lastEntry = getSingleRow('SELECT id FROM entries WHERE cycle_id = ? ORDER BY created_at DESC, id DESC LIMIT 1;', [cycleId], (row) => Number(row.id));
    const entryId = requireRow(lastEntry, 'There are no entries to undo for this cycle.');
    await this.removeEntry(entryId);
  }

  async getById(id: number): Promise<Entry | null> {
    await databaseService.init();
    validateIdentifier(id, 'Entry id');
    return getSingleRow('SELECT * FROM entries WHERE id = ?;', [id], mapEntry);
  }
}

export const entryService = new EntryService();
