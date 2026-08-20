import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuthToast } from '@/hooks/useAuthToast';
import Button from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function UpdatePasswordPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAuthToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    // Validations
    if (!password || !confirmPassword) {
      showError(new Error('Por favor, preencha todos os campos.'));
      return;
    }

    if (password.length < 6) {
      showError(new Error('A senha deve ter pelo menos 6 caracteres.'));
      return;
    }

    if (password !== confirmPassword) {
      showError(new Error('As senhas não coincidem.'));
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      showSuccess(
        'Senha Atualizada!',
        'Sua senha foi atualizada com sucesso. Faça login com sua nova senha.'
      );

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Password update error:', error);
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (pwd: string): { label: string; color: string; percentage: number } => {
    if (pwd.length === 0) return { label: '', color: 'bg-slate-200', percentage: 0 };
    if (pwd.length < 6) return { label: 'Fraca', color: 'bg-red-500', percentage: 33 };
    if (pwd.length < 10) return { label: 'Média', color: 'bg-yellow-500', percentage: 66 };
    if (pwd.length >= 12 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      return { label: 'Muito Forte', color: 'bg-green-600', percentage: 100 };
    }
    return { label: 'Forte', color: 'bg-green-500', percentage: 85 };
  };

  const strength = passwordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Nova Senha
            </h1>
            <p className="text-slate-600">
              Crie uma senha forte para proteger sua conta.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Nova Senha
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-indigo-600 hover:text-indigo-700"
                >
                  {showPassword ? '🙈 Ocultar' : '👁️ Mostrar'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                disabled={isLoading}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              
              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-600">Força da senha:</span>
                    <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${strength.color}`}
                      style={{ width: `${strength.percentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirmar Senha
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digite novamente sua senha"
                disabled={isLoading}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              
              {/* Match indicator */}
              {confirmPassword && (
                <p className={`text-xs mt-1 ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                  {password === confirmPassword ? '✓ Senhas coincidem' : '✗ Senhas não coincidem'}
                </p>
              )}
            </div>

            {/* Requirements */}
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-medium text-slate-700 mb-2">
                Requisitos da senha:
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li className={password.length >= 6 ? 'text-green-600' : ''}>
                  {password.length >= 6 ? '✓' : '○'} Mínimo 6 caracteres
                </li>
                <li className={password.length >= 10 ? 'text-green-600' : ''}>
                  {password.length >= 10 ? '✓' : '○'} 10+ caracteres (recomendado)
                </li>
                <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                  {/[A-Z]/.test(password) ? '✓' : '○'} Letra maiúscula
                </li>
                <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                  {/[0-9]/.test(password) ? '✓' : '○'} Número
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              disabled={isLoading || password !== confirmPassword || password.length < 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  Atualizando...
                </span>
              ) : (
                'Atualizar Senha'
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Após atualizar, você será redirecionado para a página de login.
        </p>
      </div>
    </div>
  );
}
