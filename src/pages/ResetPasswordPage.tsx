import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuthToast } from '@/hooks/useAuthToast';
import Button from '@/components/Button';
import Input from '@/components/Input';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAuthToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Sistema Não Configurado
          </h1>
          <p className="text-slate-600 mb-6">
            O sistema de autenticação ainda não foi configurado.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showError(new Error('Por favor, digite seu email.'));
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setEmailSent(true);
      showSuccess(
        'Email Enviado',
        'Verifique sua caixa de entrada para redefinir sua senha.'
      );
    } catch (error: any) {
      console.error('Password reset error:', error);
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Email Enviado!
              </h1>
              <p className="text-slate-600 text-sm">
                Enviamos um link de redefinição de senha para:
              </p>
              <p className="text-indigo-600 font-semibold mt-2">{email}</p>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-sm text-indigo-800">
                <strong>Próximos passos:</strong>
              </p>
              <ol className="text-sm text-indigo-700 mt-2 space-y-1 list-decimal list-inside">
                <li>Verifique sua caixa de entrada</li>
                <li>Clique no link de redefinição</li>
                <li>Crie uma nova senha</li>
              </ol>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setEmailSent(false)}
                variant="secondary"
                className="w-full"
              >
                Reenviar Email
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Voltar para Login
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Não recebeu o email? Verifique sua pasta de spam.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="text-6xl mb-4">🔑</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Esqueceu a Senha?
            </h1>
            <p className="text-slate-600">
              Sem problemas! Digite seu email e enviaremos um link para redefinir sua senha.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              disabled={isLoading}
              required
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  Enviando...
                </span>
              ) : (
                'Enviar Link de Redefinição'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">ou</span>
            </div>
          </div>

          {/* Back to login */}
          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Voltar para Login
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Lembrou sua senha?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
