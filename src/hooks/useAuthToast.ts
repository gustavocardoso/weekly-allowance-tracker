import { useToast } from '@/contexts/ToastContext';

/**
 * Hook for displaying user-friendly authentication error messages
 * Translates Supabase error codes to Portuguese messages
 */
export function useAuthToast() {
  const { showToast } = useToast();

  const showError = (error: any) => {
    let title = 'Erro';
    let description = 'Ocorreu um erro. Por favor, tente novamente.';

    // Extract error message
    const errorMessage = error?.message || error?.toString() || '';

    // Map common Supabase errors to user-friendly messages
    if (errorMessage.includes('Invalid login credentials')) {
      title = 'Credenciais Inválidas';
      description = 'Email ou senha incorretos. Por favor, verifique e tente novamente.';
    } else if (errorMessage.includes('Email not confirmed')) {
      title = 'Email Não Confirmado';
      description = 'Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada.';
    } else if (errorMessage.includes('User already registered')) {
      title = 'Email Já Cadastrado';
      description = 'Este email já está cadastrado. Tente fazer login ou recuperar sua senha.';
    } else if (errorMessage.includes('Password should be at least')) {
      title = 'Senha Muito Curta';
      description = 'A senha deve ter pelo menos 6 caracteres.';
    } else if (errorMessage.includes('Unable to validate email address')) {
      title = 'Email Inválido';
      description = 'Por favor, insira um endereço de email válido.';
    } else if (errorMessage.includes('Email rate limit exceeded')) {
      title = 'Muitas Tentativas';
      description = 'Você excedeu o limite de tentativas. Por favor, aguarde alguns minutos.';
    } else if (errorMessage.includes('Signup disabled')) {
      title = 'Cadastro Desabilitado';
      description = 'O cadastro de novos usuários está temporariamente desabilitado.';
    } else if (errorMessage.includes('Invalid email')) {
      title = 'Email Inválido';
      description = 'Por favor, insira um endereço de email válido.';
    } else if (errorMessage.includes('not authenticated') || errorMessage.includes('Not authenticated')) {
      title = 'Não Autenticado';
      description = 'Você precisa fazer login para acessar esta funcionalidade.';
    } else if (errorMessage.includes('Network request failed') || errorMessage.includes('Failed to fetch')) {
      title = 'Erro de Conexão';
      description = 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
    } else if (errorMessage.includes('popup_closed')) {
      title = 'Login Cancelado';
      description = 'O login foi cancelado. Por favor, tente novamente.';
    } else if (errorMessage.includes('access_denied')) {
      title = 'Acesso Negado';
      description = 'Você negou o acesso. Por favor, autorize o aplicativo para continuar.';
    } else if (errorMessage.includes('Supabase is not configured')) {
      title = 'Configuração Pendente';
      description = 'O aplicativo ainda não foi configurado. Entre em contato com o suporte.';
    } else if (errorMessage) {
      // Generic error with the actual message
      description = errorMessage;
    }

    showToast({
      title,
      description,
      variant: 'error',
      durationMs: 5000,
    });
  };

  const showSuccess = (title: string, description?: string) => {
    showToast({
      title,
      description,
      variant: 'success',
      durationMs: 3000,
    });
  };

  const showInfo = (title: string, description?: string) => {
    showToast({
      title,
      description,
      variant: 'info',
      durationMs: 4000,
    });
  };

  return {
    showError,
    showSuccess,
    showInfo,
  };
}
