import type { Profile } from '@/types';

import { databaseService } from '@/database/database';
import { requireRow, execute, getSingleRow, sanitizeText, validateNonNegativeInteger } from '@/services/helpers';

interface CreateProfileInput {
  childName: string;
  childEmoji: string;
  baseAllowanceCents: number;
  currency: string;
}

const PROFILE_ID = 1;

function mapProfile(row: Record<string, unknown>): Profile {
  return {
    id: Number(row.id),
    childName: String(row.child_name),
    childEmoji: String(row.child_emoji),
    baseAllowanceCents: Number(row.base_allowance_cents),
    currency: String(row.currency),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export class ProfileService {
  /** Get the current profile, if one exists. */
  async getProfile(): Promise<Profile | null> {
    await databaseService.init();
    return getSingleRow('SELECT * FROM profile WHERE id = ?;', [PROFILE_ID], mapProfile);
  }

  /** Create the initial singleton profile. */
  async createInitialProfile(input: CreateProfileInput): Promise<Profile> {
    await databaseService.init();
    const existing = await this.getProfile();
    if (existing) {
      return existing;
    }

    const childName = sanitizeText(input.childName, 'Child name', 120);
    const childEmoji = sanitizeText(input.childEmoji, 'Child emoji', 16);
    const currency = sanitizeText(input.currency.toUpperCase(), 'Currency', 8);
    const baseAllowanceCents = validateNonNegativeInteger(input.baseAllowanceCents, 'Base allowance');
    const now = new Date().toISOString();

    execute(
      'INSERT INTO profile (id, child_name, child_emoji, base_allowance_cents, currency, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?);',
      [PROFILE_ID, childName, childEmoji, baseAllowanceCents, currency, now, now],
    );
    await databaseService.persist();
    return requireRow(await this.getProfile(), 'Profile was not created successfully.');
  }

  /** Update the current profile. */
  async updateProfile(input: CreateProfileInput): Promise<Profile> {
    await databaseService.init();
    requireRow(await this.getProfile(), 'Profile does not exist.');

    const childName = sanitizeText(input.childName, 'Child name', 120);
    const childEmoji = sanitizeText(input.childEmoji, 'Child emoji', 16);
    const currency = sanitizeText(input.currency.toUpperCase(), 'Currency', 8);
    const baseAllowanceCents = validateNonNegativeInteger(input.baseAllowanceCents, 'Base allowance');

    execute(
      'UPDATE profile SET child_name = ?, child_emoji = ?, base_allowance_cents = ?, currency = ?, updated_at = ? WHERE id = ?;',
      [childName, childEmoji, baseAllowanceCents, currency, new Date().toISOString(), PROFILE_ID],
    );
    await databaseService.persist();
    return requireRow(await this.getProfile(), 'Profile was not found after update.');
  }
}

export const profileService = new ProfileService();
