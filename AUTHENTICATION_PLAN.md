# Plano de Implementação: Autenticação e Multi-usuário

## 📊 Situação Atual

A aplicação usa **SQLite local (sql.js) + IndexedDB** para armazenamento:
- ✅ Totalmente offline
- ✅ Dados persistem no navegador
- ❌ Dados isolados por dispositivo/navegador
- ❌ Sem sincronização entre dispositivos
- ❌ Sem autenticação

## 🎯 Objetivo

Adicionar **login seguro** para acesso de qualquer lugar com **sincronização na nuvem**.

## 🏗️ Arquitetura Proposta

### Opção 1: Supabase (Recomendado) ⭐

**Por que Supabase?**
- 🔐 Autenticação pronta (Email/Password, Google, GitHub, Magic Link)
- 🗄️ PostgreSQL hospedado (RLS - Row Level Security)
- 🔄 Sincronização em tempo real
- 📦 SDK para React bem documentado
- 💰 Free tier generoso (50k MAU, 500MB DB)
- 🚀 Deploy simples

**Mudanças necessárias:**

### 1. Configuração do Supabase

```bash
# Instalar dependências
npm install @supabase/supabase-js

# Variáveis de ambiente (.env.local)
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Migração do Schema

**Tabelas necessárias:**

```sql
-- Profiles (1 por usuário)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  child_name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  base_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Situations
CREATE TABLE situations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  type TEXT CHECK (type IN ('reward', 'penalty')),
  amount DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cycles
CREATE TABLE cycles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  base_amount DECIMAL(10,2) NOT NULL,
  is_closed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Entries
CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cycle_id INTEGER REFERENCES cycles(id) ON DELETE CASCADE,
  situation_id INTEGER REFERENCES situations(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE situations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Policies (usuários só veem seus próprios dados)
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own situations" ON situations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own situations" ON situations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own situations" ON situations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own situations" ON situations
  FOR DELETE USING (auth.uid() = user_id);

-- Repetir para cycles e entries...
```

### 3. Código Frontend

**a) Context de Autenticação (`src/contexts/AuthContext.tsx`):**

```tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

**b) Cliente Supabase (`src/lib/supabase.ts`):**

```tsx
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

**c) Refatorar Services:**

Substituir chamadas locais do SQLite por chamadas ao Supabase:

```tsx
// Exemplo: ProfileService.ts
import { supabase } from '@/lib/supabase';

export class ProfileService {
  static async get() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(profile: Omit<Profile, 'id'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .insert({ ...profile, id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
  
  // ... outros métodos
}
```

**d) Páginas de Login/Signup:**

```tsx
// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border"
            required
          />
          
          {error && <p className="text-red-600 text-sm">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-4 text-sm text-purple-600"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}
```

**e) Protected Routes:**

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

**f) Atualizar App.tsx:**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoginPage from '@/pages/LoginPage';
// ... outras páginas

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/situations" element={<ProtectedRoute><SituationsPage /></ProtectedRoute>} />
          {/* ... outras rotas */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

### 4. Migração de Dados (Opcional)

Para usuários existentes que querem manter seus dados:

```tsx
// src/utils/migrateToSupabase.ts
export async function migrateLocalDataToSupabase() {
  // 1. Ler dados do IndexedDB/SQLite local
  const localDb = await initLocalDatabase();
  const profile = await ProfileService.getLocal();
  const situations = await SituationService.getAllLocal();
  // ... etc

  // 2. Fazer upload para Supabase
  await supabase.from('profiles').insert(profile);
  await supabase.from('situations').insert(situations);
  // ... etc

  // 3. Limpar dados locais (opcional)
  await clearLocalDatabase();
}
```

## 📋 Checklist de Implementação

### Fase 1: Setup do Supabase
- [ ] Criar projeto no Supabase
- [ ] Configurar autenticação (email/password)
- [ ] Criar schema do banco (migrations)
- [ ] Configurar RLS policies
- [ ] Obter credenciais (URL + anon key)

### Fase 2: Frontend
- [ ] Instalar `@supabase/supabase-js`
- [ ] Criar cliente Supabase
- [ ] Implementar AuthContext
- [ ] Criar páginas de Login/Signup
- [ ] Criar ProtectedRoute component
- [ ] Atualizar App.tsx com rotas protegidas

### Fase 3: Refatoração dos Services
- [ ] ProfileService → Supabase
- [ ] SituationService → Supabase
- [ ] CycleService → Supabase
- [ ] EntryService → Supabase
- [ ] Remover código SQLite local (ou manter para fallback)

### Fase 4: Testes e Deploy
- [ ] Testar signup/login
- [ ] Testar criação de dados
- [ ] Testar RLS (usuários não veem dados de outros)
- [ ] Testar em múltiplos dispositivos
- [ ] Deploy na Vercel (variáveis de ambiente)

## ⏱️ Estimativa de Tempo

- **Fase 1 (Setup):** 1-2 horas
- **Fase 2 (Auth UI):** 2-3 horas
- **Fase 3 (Services):** 4-6 horas
- **Fase 4 (Testes):** 2-3 horas

**Total:** ~10-15 horas de desenvolvimento

## 💰 Custos

**Supabase Free Tier:**
- ✅ 50,000 usuários ativos mensais
- ✅ 500 MB de banco de dados
- ✅ 1 GB de armazenamento de arquivos
- ✅ 2 GB de bandwidth

**Quando escalar:**
- Pro: $25/mês (100k MAU, 8GB DB)

## 🔐 Segurança

- ✅ Senha hasheada (bcrypt automático)
- ✅ JWT tokens
- ✅ RLS no PostgreSQL
- ✅ HTTPS por padrão
- ✅ Email confirmation
- ✅ Rate limiting
- ✅ Proteção contra SQL injection

## 🎁 Recursos Extras (Opcionais)

1. **Social Login:** Google, GitHub, Apple
2. **Magic Link:** Login sem senha
3. **2FA:** Autenticação de dois fatores
4. **Password Reset:** Recuperação de senha
5. **Realtime:** Sincronização em tempo real
6. **Offline Mode:** PWA com sync quando voltar online

---

## Opção 2: Firebase (Alternativa)

Muito similar ao Supabase, mas:
- ✅ Firestore (NoSQL)
- ✅ Mais maduro
- ❌ Mais caro
- ❌ Lock-in maior

## Opção 3: Backend Custom

Criar seu próprio backend:
- ✅ Controle total
- ❌ Muito mais trabalho
- ❌ Precisa hospedar servidor
- ❌ Implementar autenticação do zero

---

## 🚀 Próximos Passos

**Se quiser prosseguir com Supabase:**

1. Confirmo se você já tem conta no Supabase
2. Configuramos o projeto juntos
3. Implementamos fase por fase
4. Criamos uma branch separada para não quebrar a versão atual

**Quer que eu comece?** 🎯
