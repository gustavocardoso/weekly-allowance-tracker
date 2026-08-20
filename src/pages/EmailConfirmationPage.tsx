import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import Button from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function EmailConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      if (!isSupabaseConfigured) {
        setStatus('error');
        setMessage('Sistema de autenticação não configurado.');
        return;
      }

      // Check if there's a token in the URL
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (type === 'signup' && token) {
        // Email confirmation via magic link
        setStatus('success');
        setMessage('Email confirmado com sucesso! Você já pode fazer login.');
        
        // Auto redirect after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else if (type === 'recovery') {
        // Password recovery - redirect to update password page
        navigate('/update-password');
      } else {
        // Manual confirmation page - allow resending
        setStatus('success');
        setMessage('Verifique seu email para confirmar sua conta.');
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  const handleResendConfirmation = async () => {
    if (!email) {
      setMessage('Por favor, digite seu email.');
      return;
    }

    setStatus('loading');
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      setStatus('success');
      setMessage('Email de confirmação reenviado! Verifique sua caixa de entrada.');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Erro ao reenviar email de confirmação.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            {status === 'loading' && (
              <LoadingSpinner size="lg" />
            )}
            {status === 'success' && (
              <div className="text-6xl">✅</div>
            )}
            {status === 'error' && (
              <div className="text-6xl">❌</div>
            )}
            {status === 'expired' && (
              <div className="text-6xl">⏰</div>
            )}
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {status === 'loading' && 'Confirmando Email...'}
              {status === 'success' && 'Email Confirmado!'}
              {status === 'error' && 'Erro na Confirmação'}
              {status === 'expired' && 'Link Expirado'}
            </h1>
            <p className="text-slate-600 text-sm">
              {message}
            </p>
          </div>

          {/* Resend form */}
          {(status === 'error' || status === 'expired') && (
            <div className="space-y-4 pt-4 border-t">
              <p className="text-sm text-slate-600 text-center">
                Não recebeu o email? Reenvie a confirmação:
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Button
                onClick={handleResendConfirmation}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Reenviar Email de Confirmação
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {status === 'success' && (
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Ir para Login
              </Button>
            )}
            
            <Button
              onClick={() => navigate('/')}
              variant="secondary"
              className="w-full"
            >
              Voltar para Home
            </Button>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Problemas? Entre em contato com o suporte.
        </p>
      </div>
    </div>
  );
}
