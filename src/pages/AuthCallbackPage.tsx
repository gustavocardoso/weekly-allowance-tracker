import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Wait a moment for Supabase to process the OAuth callback
    const timer = setTimeout(() => {
      if (user) {
        navigate('/', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-purple-600 border-t-transparent mb-4"></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Signing you in...</h2>
        <p className="text-slate-600">Please wait a moment</p>
      </div>
    </div>
  );
}
