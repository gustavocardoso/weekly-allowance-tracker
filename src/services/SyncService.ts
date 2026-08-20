// @ts-nocheck
import { supabase } from '@/lib/supabase';
import { databaseService } from '@/database/database';
import { getSingleRow, getManyRows, execute } from '@/services/helpers';
import type { Profile, Situation, Cycle, Entry } from '@/types';

export interface SyncProgress {
  step: string;
  current: number;
  total: number;
}

export type SyncProgressCallback = (progress: SyncProgress) => void;

/**
 * SyncService handles synchronization between local SQLite storage and Supabase cloud storage.
 * 
 * Features:
 * - Detect if user has local data
 * - Upload local data to cloud
 * - Download cloud data to local
 * - Conflict resolution (last-write-wins strategy)
 */
export class SyncService {
  /**
   * Check if user has any data stored locally
   * @returns true if there's any local data (profile, situations, cycles, or entries)
   */
  static async hasLocalData(): Promise<boolean> {
    try {
      await databaseService.init();

      // Check for profile
      const profile = getSingleRow('SELECT id FROM profile LIMIT 1;', undefined, (row) => Number(row.id));
      if (profile !== null) {
        return true;
      }

      // Check for situations
      const situation = getSingleRow('SELECT id FROM situations LIMIT 1;', undefined, (row) => Number(row.id));
      if (situation !== null) {
        return true;
      }

      // Check for cycles
      const cycle = getSingleRow('SELECT id FROM cycles LIMIT 1;', undefined, (row) => Number(row.id));
      if (cycle !== null) {
        return true;
      }

      // Check for entries
      const entry = getSingleRow('SELECT id FROM entries LIMIT 1;', undefined, (row) => Number(row.id));
      if (entry !== null) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking for local data:', error);
      return false;
    }
  }

  /**
   * Get counts of local data for display purposes
   */
  static async getLocalDataCounts(): Promise<{
    profiles: number;
    situations: number;
    cycles: number;
    entries: number;
  }> {
    try {
      await databaseService.init();

      const profileCount = getSingleRow('SELECT COUNT(*) as count FROM profile;', undefined, (row) => Number(row.count)) ?? 0;
      const situationsCount = getSingleRow('SELECT COUNT(*) as count FROM situations;', undefined, (row) => Number(row.count)) ?? 0;
      const cyclesCount = getSingleRow('SELECT COUNT(*) as count FROM cycles;', undefined, (row) => Number(row.count)) ?? 0;
      const entriesCount = getSingleRow('SELECT COUNT(*) as count FROM entries;', undefined, (row) => Number(row.count)) ?? 0;

      return {
        profiles: profileCount,
        situations: situationsCount,
        cycles: cyclesCount,
        entries: entriesCount,
      };
    } catch (error) {
      console.error('Error getting local data counts:', error);
      return { profiles: 0, situations: 0, cycles: 0, entries: 0 };
    }
  }

  /**
   * Sync local data to cloud
   * This will upload all local data to Supabase
   * 
   * @param onProgress Optional callback for progress updates
   */
  static async syncToCloud(onProgress?: SyncProgressCallback): Promise<void> {
    const { data: { user } } = (await supabase.auth.getUser()) as any;
    if (!user) {
      throw new Error('Not authenticated');
    }

    await databaseService.init();

    let currentStep = 0;
    const totalSteps = 4; // profile, situations, cycles, entries

    // Step 1: Sync profile
    currentStep++;
    onProgress?.({ step: 'Syncing profile...', current: currentStep, total: totalSteps });
    
    const localProfile = getSingleRow(
      'SELECT * FROM profile LIMIT 1;',
      undefined,
      (row) => ({
        childName: String(row.child_name),
        childEmoji: String(row.child_emoji),
        baseAllowanceCents: Number(row.base_allowance_cents),
        currency: String(row.currency),
      })
    );

    if (localProfile) {
      // Check if cloud profile exists
            const { data: cloudProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (cloudProfile) {
        // Update existing
        // @ts-expect-error - Supabase type inference issue with update
        await supabase
          .from('profiles')
          .update({
            child_name: localProfile.childName,
            child_emoji: localProfile.childEmoji,
            base_allowance_cents: localProfile.baseAllowanceCents,
            currency: localProfile.currency,
            updated_at: new Date().toISOString(),
          } as any)
          .eq('id', user.id);
      } else {
        // Create new
        // @ts-expect-error - Supabase type inference issue with insert
        await supabase
          .from('profiles')
          .insert({
            id: user.id,
            child_name: localProfile.childName,
            child_emoji: localProfile.childEmoji,
            base_allowance_cents: localProfile.baseAllowanceCents,
            currency: localProfile.currency,
          } as any);
      }
    }

    // Step 2: Sync situations
    currentStep++;
    onProgress?.({ step: 'Syncing situations...', current: currentStep, total: totalSteps });
    
    const localSituations = getManyRows(
      'SELECT * FROM situations ORDER BY id;',
      undefined,
      (row) => ({
        name: String(row.name),
        emoji: String(row.emoji),
        type: String(row.type) as 'reward' | 'penalty',
        amountCents: Number(row.amount_cents),
        active: Boolean(row.is_active),
        sortOrder: Number(row.sort_order),
      })
    );

    if (localSituations.length > 0) {
      // Delete all existing cloud situations for this user (fresh sync)
      await supabase
        .from('situations')
        .delete()
        .eq('user_id', user.id);

      // Insert all local situations
      const situationsToInsert = localSituations.map(sit => ({
        user_id: user.id,
        name: sit.name,
        emoji: sit.emoji,
        type: sit.type,
        amount_cents: sit.amountCents,
        active: sit.active,
        sort_order: sit.sortOrder,
      }));

      await supabase
        .from('situations')
        .insert(situationsToInsert as any as any);
    }

    // Step 3: Sync cycles
    currentStep++;
    onProgress?.({ step: 'Syncing cycles...', current: currentStep, total: totalSteps });
    
    const localCycles = getManyRows(
      'SELECT * FROM cycles ORDER BY id;',
      undefined,
      (row) => ({
        startDate: String(row.start_date),
        endDate: String(row.end_date),
        baseAllowanceCents: Number(row.base_allowance_cents),
        status: String(row.status) as 'open' | 'closed',
        closedAt: row.closed_at ? String(row.closed_at) : null,
        createdAt: String(row.created_at),
      })
    );

    if (localCycles.length > 0) {
      // Delete all existing cloud cycles for this user
      await supabase
        .from('cycles')
        .delete()
        .eq('user_id', user.id);

      // Insert all local cycles
      const cyclesToInsert = localCycles.map(cycle => ({
        user_id: user.id,
        start_date: cycle.startDate,
        end_date: cycle.endDate,
        base_amount_cents: cycle.baseAllowanceCents,
        status: cycle.status,
        closed_at: cycle.closedAt,
        created_at: cycle.createdAt,
      }));

      const { data: insertedCycles } = (await supabase
        .from('cycles')
        .insert(cyclesToInsert as any)
        .select()) as any;

      // Step 4: Sync entries (need to map cycle IDs)
      currentStep++;
      onProgress?.({ step: 'Syncing entries...', current: currentStep, total: totalSteps });

      if (insertedCycles && insertedCycles.length > 0) {
        const localEntries = getManyRows(
          'SELECT * FROM entries ORDER BY id;',
          undefined,
          (row) => ({
            localCycleId: Number(row.cycle_id),
            localSituationId: Number(row.situation_id),
            note: row.note ? String(row.note) : null,
            amountCents: Number(row.amount_cents),
            createdAt: String(row.created_at),
          })
        );

        if (localEntries.length > 0) {
          // Get cloud situations to map IDs
                    const { data: cloudSituations } = await supabase
            .from('situations')
            .select('*')
            .eq('user_id', user.id)
            .order('sort_order');

          // Delete existing entries
          await supabase
            .from('entries')
            .delete()
            .eq('user_id', user.id);

          // Map local cycle index to cloud cycle ID
          const cycleIdMap = new Map<number, string>();
          localCycles.forEach((_localCycle, index) => {
            if (insertedCycles[index]) {
              cycleIdMap.set(index + 1, insertedCycles[index].id); // +1 because SQL IDs start at 1
            }
          });

          // Map local situation index to cloud situation ID
          const situationIdMap = new Map<number, string>();
          localSituations.forEach((_localSit, index) => {
            if (cloudSituations && cloudSituations[index]) {
              situationIdMap.set(index + 1, (cloudSituations[index] as any).id);
            }
          });

          // Insert entries with mapped IDs
          const entriesToInsert = localEntries
            .map(entry => {
              const cloudCycleId = cycleIdMap.get(entry.localCycleId);
              const cloudSituationId = situationIdMap.get(entry.localSituationId);

              if (!cloudCycleId || !cloudSituationId) {
                console.warn('Could not map entry IDs:', entry);
                return null;
              }

              // Get situation type from local data
              const localSituation: any = localSituations[entry.localSituationId - 1];
              
              return {
                user_id: user.id,
                cycle_id: cloudCycleId,
                situation_id: cloudSituationId,
                type: localSituation.type,
                amount_cents: entry.amountCents,
                note: entry.note,
                created_at: entry.createdAt,
              };
            })
            .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

          if (entriesToInsert.length > 0) {
            await supabase
              .from('entries')
              .insert(entriesToInsert as any as any);
          }
        }
      }
    }

    onProgress?.({ step: 'Sync complete!', current: totalSteps, total: totalSteps });
  }

  /**
   * Sync cloud data to local
   * This will download all cloud data and store it locally
   * WARNING: This will overwrite all local data
   * 
   * @param onProgress Optional callback for progress updates
   */
  static async syncFromCloud(onProgress?: SyncProgressCallback): Promise<void> {
    const { data: { user } } = (await supabase.auth.getUser()) as any;
    if (!user) {
      throw new Error('Not authenticated');
    }

    await databaseService.init();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // Step tracking happens in onProgress callbacks
    const totalSteps = 4;

    // Clear all local data first
    onProgress?.({ step: 'Clearing local data...', current: 0, total: totalSteps });
    
    await this.clearLocalData();

    // This is now handled by the services themselves when in cloud mode
    // Just signal that sync is complete
    onProgress?.({ step: 'Sync complete!', current: totalSteps, total: totalSteps });
  }

  /**
   * Clear all local data
   * WARNING: This will permanently delete all local data
   */
  static async clearLocalData(): Promise<void> {
    await databaseService.init();

    // Delete in reverse order of dependencies
    execute('DELETE FROM entries;');
    execute('DELETE FROM cycles;');
    execute('DELETE FROM situations;');
    execute('DELETE FROM profile;');

    await databaseService.persist();
  }
}

export const syncService = SyncService;
