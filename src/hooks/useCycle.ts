import { useAppContext } from '@/contexts/AppContext';

export const useCycle = () => {
  const { currentCycle, closeCurrentCycle, loading, error } = useAppContext();

  return {
    currentCycle,
    closeCurrentCycle,
    loading,
    error,
  };
};
