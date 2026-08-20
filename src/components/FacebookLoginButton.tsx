import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function FacebookLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signInWithFacebook } = useAuth();

  const handleClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signInWithFacebook();
    } catch (err: any) {
      console.error('Facebook login error:', err);
      
      if (err.message?.includes('popup_closed')) {
        setError('Login cancelled. Please try again.');
      } else if (err.message?.includes('access_denied')) {
        setError('Permission denied. Please allow access to continue.');
      } else {
        setError(err.message || 'Failed to sign in with Facebook');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        )}
        <span className="font-medium">
          {isLoading ? 'Signing in...' : 'Continue with Facebook'}
        </span>
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
