# Plano: Login Social (Google & Facebook)

## 📊 Visão Geral

Implementação de **Social Login** com Google e Facebook, além do login tradicional com email/senha.

### Métodos de Autenticação Propostos

1. ✉️ **Email/Senha** (tradicional)
2. 🔵 **Google OAuth** (recomendado - mais usado)
3. 🔷 **Facebook OAuth**

---

## 🎯 Por que Login Social?

### Vantagens
- ✅ **UX melhor**: 1 clique vs formulário
- ✅ **Conversão maior**: ~30-40% mais signups
- ✅ **Sem senha**: Usuário não precisa lembrar
- ✅ **Dados confiáveis**: Email já verificado
- ✅ **Segurança**: OAuth 2.0 padrão da indústria
- ✅ **Mobile-friendly**: Especialmente bom em dispositivos

### Desvantagens
- ⚠️ **Configuração**: Setup inicial mais complexo
- ⚠️ **Dependência**: Se Google/FB caírem, usuários não entram
- ⚠️ **Privacidade**: Alguns usuários preferem não conectar
- ⚠️ **Revogação**: Usuário pode revogar acesso externamente

---

## 🔧 Implementação com Supabase

Supabase **já tem suporte nativo** para Google e Facebook! 🎉

### Comparação de Dificuldade

| Método | Setup Externo | Código Frontend | Dificuldade |
|--------|---------------|-----------------|-------------|
| Email/Senha | ❌ Nenhum | Formulário simples | ⭐ Fácil |
| Google | ✅ Google Cloud Console | 1 linha de código | ⭐⭐ Médio |
| Facebook | ✅ Meta for Developers | 1 linha de código | ⭐⭐⭐ Médio-Alto |

---

## 🔵 Google OAuth - Setup Completo

### 1. Configuração no Google Cloud Console

**Tempo estimado:** 10-15 minutos

**Passos:**

1. **Acessar Google Cloud Console:**
   - URL: https://console.cloud.google.com/

2. **Criar Projeto (se ainda não tem):**
   - Clique em "Select a project" → "New Project"
   - Nome: `Weekly Allowance Tracker`
   - Clique em "Create"

3. **Habilitar Google+ API:**
   - Menu → "APIs & Services" → "Library"
   - Buscar: "Google+ API"
   - Clique em "Enable"

4. **Configurar OAuth Consent Screen:**
   - Menu → "APIs & Services" → "OAuth consent screen"
   - User Type: **External** (se não tem Google Workspace)
   - App name: `Weekly Allowance Tracker`
   - User support email: seu email
   - Developer contact: seu email
   - Scopes: Deixar padrão (email, profile)
   - Test users: Adicionar seu email (para testar)
   - Clique em "Save and Continue"

5. **Criar OAuth 2.0 Credentials:**
   - Menu → "APIs & Services" → "Credentials"
   - "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `Supabase Auth`
   - **Authorized JavaScript origins:**
     ```
     https://weekly-allowance-tracker.vercel.app
     http://localhost:5173
     ```
   - **Authorized redirect URIs:**
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     http://localhost:54321/auth/v1/callback
     ```
   - Clique em "Create"

6. **Copiar Credenciais:**
   - **Client ID**: algo como `123456789-abcdefg.apps.googleusercontent.com`
   - **Client Secret**: algo como `GOCSPX-abcdefghijklmnop`

### 2. Configuração no Supabase Dashboard

1. **Acessar Supabase Dashboard:**
   - https://app.supabase.com/

2. **Ir para Authentication:**
   - Seu projeto → "Authentication" → "Providers"

3. **Habilitar Google:**
   - Procurar "Google"
   - Toggle: **Enabled** ✅
   - Client ID: colar o Client ID do Google
   - Client Secret: colar o Client Secret do Google
   - Clique em "Save"

### 3. Código Frontend (React)

**a) Botão de Login com Google:**

```tsx
// src/components/GoogleLoginButton.tsx
import { supabase } from '@/lib/supabase';

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span className="font-medium text-slate-700">Continue with Google</span>
    </button>
  );
}
```

**b) Atualizar LoginPage:**

```tsx
// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import FacebookLoginButton from '@/components/FacebookLoginButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        await signUp(email, password);
        alert('Check your email for confirmation!');
      } else {
        await signIn(email, password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-600">
            {isSignUp ? 'Start tracking your allowance' : 'Sign in to continue'}
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <GoogleLoginButton />
          <FacebookLoginButton />
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">Or continue with email</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
```

**c) Callback Page (para redirecionar após OAuth):**

```tsx
// src/pages/AuthCallbackPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase automaticamente lida com o token na URL
    // Apenas redirecionar para home após 1 segundo
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mb-4"></div>
        <p className="text-lg text-slate-600">Signing you in...</p>
      </div>
    </div>
  );
}
```

**d) Adicionar rota no App.tsx:**

```tsx
<Route path="/auth/callback" element={<AuthCallbackPage />} />
```

---

## 🔷 Facebook OAuth - Setup Completo

### 1. Configuração no Meta for Developers

**Tempo estimado:** 15-20 minutos

**Passos:**

1. **Acessar Meta for Developers:**
   - URL: https://developers.facebook.com/

2. **Criar App:**
   - "My Apps" → "Create App"
   - Use case: **Authenticate and request data from users**
   - App type: **Consumer**
   - App name: `Weekly Allowance Tracker`
   - App contact email: seu email
   - Clique em "Create App"

3. **Adicionar Facebook Login:**
   - Dashboard do App → "Add Product"
   - Procurar "Facebook Login" → "Set Up"
   - Platform: **Web**
   - Site URL: `https://weekly-allowance-tracker.vercel.app`
   - Clique em "Save"

4. **Configurar Facebook Login Settings:**
   - Menu lateral → "Facebook Login" → "Settings"
   - **Valid OAuth Redirect URIs:**
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     http://localhost:54321/auth/v1/callback
     ```
   - Clique em "Save Changes"

5. **Obter Credenciais:**
   - Menu lateral → "Settings" → "Basic"
   - **App ID**: algo como `1234567890123456`
   - **App Secret**: Clique em "Show" → algo como `abcdef1234567890abcdef1234567890`

6. **Tornar App Público (importante!):**
   - No topo da página, tem um toggle "App Mode"
   - Mude de "Development" para "Live"
   - Preencher Privacy Policy URL (pode usar um gerador online)
   - Submit for review (se necessário)

### 2. Configuração no Supabase Dashboard

1. **Ir para Authentication:**
   - Supabase Dashboard → "Authentication" → "Providers"

2. **Habilitar Facebook:**
   - Procurar "Facebook"
   - Toggle: **Enabled** ✅
   - Facebook client ID: colar o App ID do Facebook
   - Facebook secret: colar o App Secret do Facebook
   - Clique em "Save"

### 3. Código Frontend

**FacebookLoginButton.tsx:**

```tsx
// src/components/FacebookLoginButton.tsx
import { supabase } from '@/lib/supabase';

export default function FacebookLoginButton() {
  const handleFacebookLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error logging in with Facebook:', error.message);
    }
  };

  return (
    <button
      onClick={handleFacebookLogin}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg transition-colors"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
      <span className="font-medium">Continue with Facebook</span>
    </button>
  );
}
```

---

## 🎨 UX/UI Recomendações

### 1. Ordem dos Botões (por popularidade)

```tsx
<GoogleLoginButton />      {/* #1 mais usado */}
<FacebookLoginButton />    {/* #2 */}
<EmailLoginForm />         {/* Tradicional */}
```

### 2. Tratamento de Erros Específicos

```tsx
const handleSocialLogin = async (provider: 'google' | 'facebook') => {
  const { error } = await supabase.auth.signInWithOAuth({ provider });

  if (error) {
    // Erros comuns
    if (error.message.includes('popup_closed')) {
      setError('Login cancelled. Please try again.');
    } else if (error.message.includes('access_denied')) {
      setError('Permission denied. Please allow access to continue.');
    } else {
      setError('Something went wrong. Please try again.');
    }
  }
};
```

### 3. Loading States

```tsx
const [isLoading, setIsLoading] = useState<'google' | 'facebook' | null>(null);

const handleGoogleLogin = async () => {
  setIsLoading('google');
  try {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  } finally {
    setIsLoading(null);
  }
};

// No botão:
<button disabled={isLoading === 'google'}>
  {isLoading === 'google' ? 'Loading...' : 'Continue with Google'}
</button>
```

### 4. First-time Setup Flow

Quando usuário faz login social pela primeira vez:

```tsx
// src/hooks/useProfileSetup.ts
export function useProfileSetup() {
  const { user } = useAuth();

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return;

      const profile = await ProfileService.get();
      
      if (!profile) {
        // Redirecionar para setup inicial
        navigate('/setup');
      }
    };

    checkProfile();
  }, [user]);
}
```

---

## 🔒 Segurança e Privacidade

### 1. Dados Obtidos de Cada Provider

**Google:**
- ✅ Email (verificado)
- ✅ Nome completo
- ✅ Foto de perfil
- ✅ Google ID (único)

**Facebook:**
- ✅ Email (pode não estar verificado!)
- ✅ Nome completo
- ✅ Foto de perfil
- ✅ Facebook ID (único)

### 2. GDPR Compliance

```tsx
// Adicionar checkbox no signup
<label className="flex items-start gap-2">
  <input type="checkbox" required />
  <span className="text-sm text-slate-600">
    I agree to the{' '}
    <a href="/privacy" className="text-purple-600">Privacy Policy</a>
    {' '}and{' '}
    <a href="/terms" className="text-purple-600">Terms of Service</a>
  </span>
</label>
```

### 3. Revogar Acesso

Usuários podem revogar acesso em:
- Google: https://myaccount.google.com/permissions
- Facebook: Settings → Apps and Websites

---

## 📋 Checklist Completo

### Google OAuth
- [ ] Criar projeto no Google Cloud Console
- [ ] Habilitar Google+ API
- [ ] Configurar OAuth Consent Screen
- [ ] Criar OAuth 2.0 Credentials
- [ ] Adicionar redirect URIs corretas
- [ ] Copiar Client ID e Secret
- [ ] Configurar no Supabase Dashboard
- [ ] Implementar GoogleLoginButton
- [ ] Testar em produção
- [ ] Testar em desenvolvimento

### Facebook OAuth
- [ ] Criar app no Meta for Developers
- [ ] Adicionar Facebook Login product
- [ ] Configurar Valid OAuth Redirect URIs
- [ ] Copiar App ID e Secret
- [ ] Configurar no Supabase Dashboard
- [ ] Implementar FacebookLoginButton
- [ ] Tornar app público/live
- [ ] Adicionar Privacy Policy URL
- [ ] Testar em produção
- [ ] Testar em desenvolvimento

### Frontend
- [ ] Criar GoogleLoginButton component
- [ ] Criar FacebookLoginButton component
- [ ] Atualizar LoginPage com social buttons
- [ ] Criar AuthCallbackPage
- [ ] Adicionar rota /auth/callback
- [ ] Implementar loading states
- [ ] Implementar error handling
- [ ] Testar fluxo completo
- [ ] Testar em mobile
- [ ] Adicionar analytics (opcional)

### Produção
- [ ] Atualizar Authorized Origins no Google
- [ ] Atualizar Redirect URIs no Google
- [ ] Atualizar Redirect URIs no Facebook
- [ ] Configurar variáveis de ambiente na Vercel
- [ ] Testar com usuários reais
- [ ] Monitorar erros (Sentry/LogRocket)

---

## ⏱️ Estimativa de Tempo

| Tarefa | Tempo |
|--------|-------|
| Setup Google OAuth | 15 min |
| Setup Facebook OAuth | 20 min |
| Implementar componentes | 1h |
| Testes e ajustes | 30 min |
| **TOTAL** | **~2h** |

---

## 💡 Recomendações Finais

### ✅ Deve Implementar

1. **Google OAuth** - Essencial, mais usado
2. **Email/Senha** - Fallback importante
3. **Error handling** - UX crítica

### 🤔 Considere Implementar

4. **Facebook OAuth** - Se público-alvo usa muito
5. **Magic Link** - Login sem senha por email
6. **Remember me** - Persistir sessão

### ⏭️ Pode Adiar

7. **Apple Sign In** - Obrigatório só para iOS apps
8. **GitHub OAuth** - Público tech
9. **2FA** - Segurança extra (overkill para allowance tracker)

---

## 🎯 Priorização Sugerida

**Fase 1 (Essencial):**
- ✅ Email/Senha
- ✅ Google OAuth

**Fase 2 (Recomendado):**
- ✅ Facebook OAuth
- ✅ Profile setup flow

**Fase 3 (Nice to have):**
- ⭐ Magic Link
- ⭐ Password reset

---

## 🚀 Próximos Passos

**Quer que eu implemente?**

1. **Implementar tudo junto** (Google + Facebook + Email)
2. **Começar com Google** (mais simples, testar fluxo)
3. **Apenas criar os componentes** (você configura os providers)

O que prefere? Posso começar agora! 🎯
