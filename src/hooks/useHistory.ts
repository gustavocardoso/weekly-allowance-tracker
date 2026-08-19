import { useAppContext } from '@/contexts/AppContext';

export const useHistory = () => {
  const { closedCycles, loading, error } = useAppContext();

  return {
    closedCycles,
    loading,
    error,
  };
};
