import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  buildCycleWithEntries,
  buildStatsSummary,
  createCycleRecord,
  createNextWeekDate,
  createProfileAndFirstCycle,
  exportAppData,
  exportDatabaseFile,
  importAppData,
  loadAppData,
  saveAppData,
} from '@/lib/storage';
import { SituationType } from '@/types';
import { situationService } from '@/services/SituationService';
import { profileService } from '@/services/ProfileService';
import type { AppData, Cycle, CycleWithEntries, Entry, Profile, SetupProfileInput, Situation, SituationInput, StatsSummary } from '@/types/app';

interface AppContextValue {
  profile: Profile | null;
  situations: Situation[];
  currentCycle: CycleWithEntries | null;
  closedCycles: CycleWithEntries[];
  loading: boolean;
  error: string | null;
  stats: StatsSummary;
  refresh: () => void;
  setupProfile: (input: SetupProfileInput) => void;
  updateProfile: (updates: SetupProfileInput) => void;
  addSituation: (input: SituationInput) => Promise<void>;
  updateSituation: (id: string, updates: Partial<SituationInput> & { sortOrder?: number; active?: boolean }) => Promise<void>;
  deleteSituation: (id: string) => Promise<void>;
  addEntry: (situationId: string, note?: string | null) => Entry;
  removeEntry: (entryId: string) => void;
  closeCurrentCycle: () => Cycle;
  exportData: () => string;
  exportDatabase: () => Promise<void>;
  importDataFile: (raw: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const mapDbSituation = (situation: import('@/types').Situation): Situation => ({
  id: String(situation.id),
  name: situation.name,
  emoji: situation.emoji,
  type: situation.type,
  amountCents: situation.amountCents,
  active: situation.isActive,
  sortOrder: situation.sortOrder,
  createdAt: situation.createdAt,
  updatedAt: situation.updatedAt,
});

const syncSituationCache = async (current: AppData) => {
  const situations = (await situationService.getAll()).map(mapDbSituation);
  const next = { ...current, situations };
  saveAppData(next);
  return next;
};

const humanizeSituationError = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return fallback;
};

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadAppData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        console.log('[AppContext] Starting initialization...');
        const cached = loadAppData();
        console.log('[AppContext] Loaded cached data');
        
        // Try to initialize database, but don't fail if it doesn't work
        let situations = cached.situations || [];
        
        try {
          console.log('[AppContext] Attempting to initialize database...');
          
          // Check if profile exists in database
          let dbProfile = await profileService.getProfile();
          
          if (!dbProfile && cached.profile) {
            console.log('[AppContext] Creating profile in database...');
            dbProfile = await profileService.createInitialProfile({
              childName: cached.profile.childName,
              childEmoji: cached.profile.childEmoji,
              baseAllowanceCents: cached.profile.baseAmountCents,
              currency: 'CAD',
            });
          }
          
          // Load situations from database
          const dbSituations = await situationService.getAll();
          situations = dbSituations.map(mapDbSituation);
          console.log('[AppContext] Successfully loaded from database');
        } catch (dbError) {
          console.warn('[AppContext] Database initialization failed, using localStorage only:', dbError);
          // Continue with localStorage-only mode
          // This allows the app to work even if database has issues
        }
        
        const finalData = { ...cached, situations };
        setData(finalData);
        saveAppData(finalData);
        setError(null);
        console.log('[AppContext] Initialization complete (localStorage mode)');
      } catch (caughtError) {
        console.error('[AppContext] Fatal initialization error:', caughtError);
        
        // Last resort: try to load whatever we can
        try {
          const cached = loadAppData();
          setData(cached);
          setError(null);
        } catch {
          setError('Unable to load app data. Please clear your browser cache and try again.');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const refresh = useCallback(() => {
    void (async () => {
      try {
        setLoading(true);
        const next = await syncSituationCache(loadAppData());
        setData(next);
        setError(null);
      } catch (caughtError) {
        console.error('Failed to refresh app data.', caughtError);
        setError(caughtError instanceof Error ? caughtError.message : 'Unable to refresh data.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback((updater: (current: AppData) => AppData) => {
    setData((current) => {
      try {
        const next = updater(current);
        saveAppData(next);
        setError(null);
        return next;
      } catch (caughtError) {
        console.error('Failed to persist tracker data.', caughtError);
        setError(caughtError instanceof Error ? caughtError.message : 'Unable to save your changes.');
        throw caughtError;
      }
    });
  }, []);

  const setupProfile = useCallback(
    (input: SetupProfileInput) => {
      console.log('[AppContext] setupProfile called with:', input);
      
      try {
        persist(() => {
          console.log('[AppContext] Creating profile and first cycle...');
          const newData = createProfileAndFirstCycle(input);
          console.log('[AppContext] Created data:', newData);
          return newData;
        });
        console.log('[AppContext] Profile persisted to localStorage');
      } catch (error) {
        console.error('[AppContext] Failed to persist profile:', error);
        throw error;
      }
      
      // Also create profile in database for situations FK
      void (async () => {
        try {
          console.log('[AppContext] Creating profile in database...');
          await profileService.createInitialProfile({
            childName: input.childName,
            childEmoji: input.childEmoji,
            baseAllowanceCents: input.baseAmountCents,
            currency: 'CAD',
          });
          console.log('[AppContext] Profile created in database successfully');
        } catch (error) {
          console.error('[AppContext] Failed to create profile in database:', error);
        }
      })();
    },
    [persist],
  );

  const updateProfile = useCallback(
    (updates: SetupProfileInput) => {
      persist((current) => {
        if (!current.profile) {
          throw new Error('Profile not found.');
        }

        return {
          ...current,
          profile: {
            ...current.profile,
            childName: updates.childName.trim(),
            childEmoji: updates.childEmoji,
            baseAmountCents: updates.baseAmountCents,
            updatedAt: new Date().toISOString(),
          },
        };
      });
    },
    [persist],
  );

  const addSituation = useCallback(
    async (input: SituationInput) => {
      console.log('[AppContext] addSituation called with:', input);
      try {
        // Try to create in database first
        let created: any;
        try {
          created = await situationService.create({
            name: input.name.trim(),
            emoji: input.emoji,
            amountCents: input.amountCents,
            type: input.type === 'reward' ? SituationType.Reward : SituationType.Penalty,
          });
          console.log('[AppContext] Situation created in database:', created);
        } catch (dbError) {
          console.warn('[AppContext] Failed to create in database, using localStorage only:', dbError);
          // Create with localStorage only
          created = {
            id: Date.now(),
            profileId: 1,
            name: input.name.trim(),
            emoji: input.emoji,
            amountCents: input.amountCents,
            type: input.type === 'reward' ? SituationType.Reward : SituationType.Penalty,
            isActive: true,
            sortOrder: data.situations.length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }
        
        // Refresh from database to get ALL situations
        console.log('[AppContext] Refreshing all situations from database...');
        const allSituations = (await situationService.getAll()).map(mapDbSituation);
        console.log('[AppContext] Retrieved situations from database:', allSituations.length);
        
        setData((current) => {
          const next = { 
            ...current, 
            situations: allSituations.sort((a, b) => a.sortOrder - b.sortOrder) 
          };
          saveAppData(next);
          console.log('[AppContext] Updated state with all situations');
          return next;
        });
        setError(null);
      } catch (caughtError) {
        console.error('Failed to create situation.', caughtError);
        const message = humanizeSituationError(caughtError, 'Could not create the situation. Please try again.');
        setError(message);
        throw new Error(message);
      }
    },
    [data.situations],
  );

  const updateSituation = useCallback(
    async (id: string, updates: Partial<SituationInput> & { sortOrder?: number; active?: boolean }) => {
      console.log('[AppContext] updateSituation called:', { id, updates });
      try {
        const current = loadAppData();
        const existing = current.situations.find((situation) => situation.id === id);
        if (!existing) {
          throw new Error('Situation not found.');
        }

        // Convert string ID to number and validate it
        const numericId = Number(id);
        if (!Number.isInteger(numericId) || numericId <= 0) {
          throw new Error('Invalid situation ID.');
        }

        let ordered = current.situations.slice().sort((a, b) => a.sortOrder - b.sortOrder);
        if (typeof updates.sortOrder === 'number') {
          console.log('[AppContext] Reordering situation...');
          const fromIndex = ordered.findIndex((s) => s.id === id);
          const toIndex = Math.max(0, Math.min(updates.sortOrder, ordered.length - 1));
          const [item] = ordered.splice(fromIndex, 1);
          if (!item) {
            throw new Error('Situation not found.');
          }
          ordered.splice(toIndex, 0, item);
          ordered = ordered.map((situation, index) => ({ ...situation, sortOrder: index }));
          await situationService.reorder(ordered.map((situation) => Number(situation.id)));
          console.log('[AppContext] Reorder complete');
        }

        const target = ordered.find((situation) => situation.id === id) ?? existing;
        const updated = await situationService.update(numericId, {
          name: (updates.name ?? target.name).trim(),
          emoji: updates.emoji ?? target.emoji,
          amountCents: updates.amountCents ?? target.amountCents,
          type: (updates.type ?? target.type) === 'reward' ? SituationType.Reward : SituationType.Penalty,
          isActive: updates.active ?? target.active,
          sortOrder: target.sortOrder,
        });
        console.log('[AppContext] Situation updated in database:', updated);

        // Refresh from database to get ALL situations with correct order
        console.log('[AppContext] Refreshing all situations from database...');
        const allSituations = (await situationService.getAll()).map(mapDbSituation);
        console.log('[AppContext] Retrieved situations from database:', allSituations.length);

        setData((state) => {
          const next = {
            ...state,
            situations: allSituations.sort((a, b) => a.sortOrder - b.sortOrder),
          };
          saveAppData(next);
          console.log('[AppContext] Updated state with all situations');
          return next;
        });
        setError(null);
      } catch (caughtError) {
        console.error('Failed to update situation.', caughtError);
        const message = humanizeSituationError(caughtError, 'Could not update the situation. Please try again.');
        setError(message);
        throw new Error(message);
      }
    },
    [],
  );

  const deleteSituation = useCallback(
    async (id: string) => {
      console.log('[AppContext] deleteSituation called:', id);
      try {
        // Convert string ID to number and validate it
        const numericId = Number(id);
        if (!Number.isInteger(numericId) || numericId <= 0) {
          throw new Error('Invalid situation ID.');
        }
        
        await situationService.remove(numericId);
        console.log('[AppContext] Situation deleted from database');
        
        // Refresh from database to get ALL remaining situations
        console.log('[AppContext] Refreshing all situations from database...');
        const allSituations = (await situationService.getAll()).map(mapDbSituation);
        console.log('[AppContext] Retrieved situations from database:', allSituations.length);
        
        setData((current) => {
          const next = { 
            ...current, 
            situations: allSituations.sort((a, b) => a.sortOrder - b.sortOrder) 
          };
          saveAppData(next);
          console.log('[AppContext] Updated state after delete');
          return next;
        });
        setError(null);
      } catch (caughtError) {
        console.error('Failed to delete situation.', caughtError);
        const message = humanizeSituationError(caughtError, 'Could not delete the situation.');
        setError(message);
        throw new Error(message);
      }
    },
    [],
  );

  const addEntry = useCallback(
    (situationId: string, note?: string | null) => {
      let nextEntry!: Entry;
      persist((current) => {
        const openCycles = current.cycles.filter((cycle) => cycle.status === 'open');
        if (openCycles.length !== 1) {
          throw new Error('There must be exactly one open cycle.');
        }

        const cycle = openCycles[0]!;
        const situation = current.situations.find((item) => item.id === situationId);
        if (!situation) {
          throw new Error('Situation not found.');
        }

        nextEntry = {
          id: createId(),
          cycleId: cycle.id,
          situationId,
          type: situation.type,
          amountCents: situation.amountCents,
          note: note ?? null,
          createdAt: new Date().toISOString(),
        };

        return {
          ...current,
          entries: [nextEntry, ...current.entries],
        };
      });

      return nextEntry;
    },
    [persist],
  );

  const removeEntry = useCallback(
    (entryId: string) => {
      persist((current) => {
        const entry = current.entries.find((item) => item.id === entryId);
        if (!entry) {
          throw new Error('Entry not found.');
        }
        const cycle = current.cycles.find((item) => item.id === entry.cycleId);
        if (!cycle || cycle.status !== 'open') {
          throw new Error('Only entries from the open cycle can be removed.');
        }

        return {
          ...current,
          entries: current.entries.filter((item) => item.id !== entryId),
        };
      });
    },
    [persist],
  );

  const closeCurrentCycle = useCallback(() => {
    let nextCycle!: Cycle;

    persist((current) => {
      const openCycles = current.cycles.filter((cycle) => cycle.status === 'open');
      if (openCycles.length !== 1) {
        throw new Error('There must be exactly one open cycle.');
      }

      const currentCycle = openCycles[0]!;
      const now = new Date().toISOString();
      const closedCycle: Cycle = {
        ...currentCycle,
        status: 'closed',
        closedAt: now,
        updatedAt: now,
      };

      nextCycle = createCycleRecord(current.profile?.baseAmountCents ?? currentCycle.baseAmountCents, createNextWeekDate(currentCycle));

      return {
        ...current,
        cycles: current.cycles.map((cycle) => (cycle.id === currentCycle.id ? closedCycle : cycle)).concat(nextCycle),
      };
    });

    return nextCycle;
  }, [persist]);

  const exportData = useCallback(() => exportAppData(data), [data]);

  const exportDatabase = useCallback(async () => {
    try {
      await exportDatabaseFile();
      setError(null);
    } catch (caughtError) {
      console.error('Failed to export database backup.', caughtError);
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to export the database file.');
      throw caughtError;
    }
  }, []);

  const importDataFile = useCallback(
    (raw: string) => {
      try {
        const imported = importAppData(raw);
        saveAppData(imported);
        setData(imported);
        setError(null);
      } catch (caughtError) {
        console.error('Failed to import tracker data.', caughtError);
        setError(caughtError instanceof Error ? caughtError.message : 'Unable to import the selected file.');
        throw caughtError;
      }
    },
    [],
  );

  const resetAllData = useCallback(() => {
    try {
      // Clear localStorage
      localStorage.removeItem('allowance-tracker-data');
      
      // Reset state to initial empty data
      const emptyData: AppData = {
        profile: null,
        situations: [],
        cycles: [],
        entries: [],
      };
      
      setData(emptyData);
      setError(null);
      
      console.log('[AppContext] All data cleared successfully');
    } catch (caughtError) {
      console.error('Failed to reset data.', caughtError);
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to reset data.');
      throw caughtError;
    }
  }, []);

  const currentCycle = useMemo(() => {
    const openCycle = data.cycles.find((cycle) => cycle.status === 'open');
    if (!openCycle) {
      return null;
    }
    const entries = data.entries.filter((entry) => entry.cycleId === openCycle.id);
    return buildCycleWithEntries(openCycle, entries, data.situations);
  }, [data.cycles, data.entries, data.situations]);

  const closedCycles = useMemo(
    () =>
      data.cycles
        .filter((cycle) => cycle.status === 'closed')
        .sort((a, b) => (b.closedAt ?? '').localeCompare(a.closedAt ?? ''))
        .map((cycle) => buildCycleWithEntries(cycle, data.entries.filter((entry) => entry.cycleId === cycle.id), data.situations)),
    [data.cycles, data.entries, data.situations],
  );

  const stats = useMemo(() => buildStatsSummary(data.cycles, data.entries, data.situations), [data.cycles, data.entries, data.situations]);

  const value = useMemo(
    () => ({
      profile: data.profile,
      situations: data.situations.slice().sort((a, b) => a.sortOrder - b.sortOrder),
      currentCycle,
      closedCycles,
      loading,
      error,
      stats,
      refresh,
      setupProfile,
      updateProfile,
      addSituation,
      updateSituation,
      deleteSituation,
      addEntry,
      removeEntry,
      closeCurrentCycle,
      exportData,
      exportDatabase,
      importDataFile,
      resetAllData,
    }),
    [
      addEntry,
      addSituation,
      closeCurrentCycle,
      closedCycles,
      currentCycle,
      data.profile,
      data.situations,
      deleteSituation,
      error,
      exportData,
      exportDatabase,
      importDataFile,
      loading,
      refresh,
      removeEntry,
      resetAllData,
      setupProfile,
      stats,
      updateProfile,
      updateSituation,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
