import { useAppContext } from '@/contexts/AppContext';

export const useProfile = () => {
  const { profile, setupProfile, updateProfile, loading, error } = useAppContext();

  return {
    profile,
    hasProfile: Boolean(profile),
    setupProfile,
    updateProfile,
    loading,
    error,
  };
};
