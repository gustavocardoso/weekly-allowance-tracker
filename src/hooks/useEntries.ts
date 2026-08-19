import { useAppContext } from '@/contexts/AppContext';

export const useEntries = () => {
  const { currentCycle, addEntry, removeEntry, loading, error } = useAppContext();

  return {
    entries: currentCycle?.entries ?? [],
    addEntry,
    removeEntry,
    loading,
    error,
  };
};
