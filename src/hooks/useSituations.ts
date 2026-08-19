import { useAppContext } from '@/contexts/AppContext';

export const useSituations = () => {
  const { situations, addSituation, updateSituation, deleteSituation, loading, error } = useAppContext();

  return {
    situations,
    addSituation,
    updateSituation,
    deleteSituation,
    loading,
    error,
  };
};
