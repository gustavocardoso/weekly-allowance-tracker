import { useAppContext } from '@/contexts/AppContext';

export const useStats = () => {
  const { stats, loading, error } = useAppContext();

  return {
    stats,
    loading,
    error,
  };
};
