import type { Situation } from '@/types';
import { SituationType } from '@/types';

import { databaseService } from '@/database/database';
import { requireRow, execute, getLastInsertRowId, getManyRows, getSingleRow, mapBoolean, sanitizeText, validateIdentifier, validateNonNegativeInteger } from '@/services/helpers';
import { ValidationError } from '@/database/errors';

interface CreateSituationInput {
  name: string;
  emoji: string;
  amountCents: number;
  type: SituationType;
  sortOrder?: number;
  isActive?: boolean;
}

interface UpdateSituationInput extends CreateSituationInput {}

function validateSituationType(type: SituationType): SituationType {
  if (type !== SituationType.Reward && type !== SituationType.Penalty) {
    throw new ValidationError('Situation type must be reward or penalty.');
  }
  return type;
}

function mapSituation(row: Record<string, unknown>): Situation {
  return {
    id: Number(row.id),
    profileId: Number(row.profile_id),
    name: String(row.name),
    emoji: String(row.emoji),
    amountCents: Number(row.amount_cents),
    type: String(row.type) as SituationType,
    isActive: mapBoolean(row.is_active),
    sortOrder: Number(row.sort_order),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export class SituationService {
  /** Create a new situation for the singleton profile. */
  async create(input: CreateSituationInput): Promise<Situation> {
    await databaseService.init();
    const now = new Date().toISOString();
    const nextSortOrder =
      input.sortOrder ?? getSingleRow('SELECT COALESCE(MAX(sort_order), -1) + 1 AS value FROM situations WHERE profile_id = ?;', [1], (row) => Number(row.value)) ?? 0;
    execute(
      'INSERT INTO situations (profile_id, name, emoji, amount_cents, type, is_active, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [
        1,
        sanitizeText(input.name, 'Situation name', 120),
        sanitizeText(input.emoji, 'Situation emoji', 16),
        validateNonNegativeInteger(input.amountCents, 'Situation amount'),
        validateSituationType(input.type),
        input.isActive === false ? 0 : 1,
        validateNonNegativeInteger(nextSortOrder, 'Situation sort order'),
        now,
        now,
      ],
    );
    const id = getLastInsertRowId();
    await databaseService.persist();
    return requireRow(await this.getById(id), 'Situation was not created successfully.');
  }

  /** Get all situations. */
  async getAll(): Promise<Situation[]> {
    await databaseService.init();
    return getManyRows('SELECT * FROM situations ORDER BY sort_order ASC, id ASC;', undefined, mapSituation);
  }

  /** Get active situations only. */
  async getActive(): Promise<Situation[]> {
    await databaseService.init();
    return getManyRows('SELECT * FROM situations WHERE is_active = ? ORDER BY sort_order ASC, id ASC;', [1], mapSituation);
  }

  /** Update an existing situation. */
  async update(id: number, input: UpdateSituationInput): Promise<Situation> {
    await databaseService.init();
    validateIdentifier(id, 'Situation id');
    requireRow(await this.getById(id), 'Situation does not exist.');
    const nextSortOrder =
      typeof input.sortOrder === 'number'
        ? validateNonNegativeInteger(input.sortOrder, 'Situation sort order')
        : requireRow(await this.getById(id), 'Situation does not exist.').sortOrder;
    execute(
      'UPDATE situations SET name = ?, emoji = ?, amount_cents = ?, type = ?, is_active = ?, sort_order = ?, updated_at = ? WHERE id = ?;',
      [
        sanitizeText(input.name, 'Situation name', 120),
        sanitizeText(input.emoji, 'Situation emoji', 16),
        validateNonNegativeInteger(input.amountCents, 'Situation amount'),
        validateSituationType(input.type),
        input.isActive === false ? 0 : 1,
        nextSortOrder,
        new Date().toISOString(),
        id,
      ],
    );
    await databaseService.persist();
    return requireRow(await this.getById(id), 'Situation was not found after update.');
  }

  /** Delete a situation that has never been used in an entry. */
  async remove(id: number): Promise<void> {
    await databaseService.init();
    validateIdentifier(id, 'Situation id');
    requireRow(await this.getById(id), 'Situation does not exist.');
    execute('DELETE FROM situations WHERE id = ?;', [id]);
    await databaseService.persist();
  }

  async reorder(idsInOrder: number[]): Promise<Situation[]> {
    await databaseService.init();
    if (idsInOrder.length === 0) {
      return [];
    }
    execute('BEGIN;');
    try {
      idsInOrder.forEach((id, index) => {
        validateIdentifier(id, 'Situation id');
        execute('UPDATE situations SET sort_order = ?, updated_at = ? WHERE id = ?;', [index, new Date().toISOString(), id]);
      });
      execute('COMMIT;');
    } catch (error) {
      try {
        execute('ROLLBACK;');
      } catch {
        // ignore rollback failure
      }
      throw error;
    }
    await databaseService.persist();
    return this.getAll();
  }

  /** Mark a situation as active. */
  async activate(id: number): Promise<Situation> {
    return await this.setActiveState(id, true);
  }

  /** Mark a situation as inactive. */
  async deactivate(id: number): Promise<Situation> {
    return await this.setActiveState(id, false);
  }

  async getById(id: number): Promise<Situation | null> {
    await databaseService.init();
    validateIdentifier(id, 'Situation id');
    return getSingleRow('SELECT * FROM situations WHERE id = ?;', [id], mapSituation);
  }

  private async setActiveState(id: number, isActive: boolean): Promise<Situation> {
    await databaseService.init();
    validateIdentifier(id, 'Situation id');
    requireRow(await this.getById(id), 'Situation does not exist.');
    execute('UPDATE situations SET is_active = ?, updated_at = ? WHERE id = ?;', [isActive ? 1 : 0, new Date().toISOString(), id]);
    await databaseService.persist();
    return requireRow(await this.getById(id), 'Situation was not found after state update.');
  }
}

export const situationService = new SituationService();
