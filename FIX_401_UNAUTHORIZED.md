# 🔴 Resolver Erro 401 Unauthorized

## ❌ Erro

```
GET https://szjjenczowoatabwcvjj.supabase.co/auth/v1/user 401 (Unauthorized)
```

Esse erro aparece ao tentar criar conta ou fazer login.

## ✅ O Que Está Acontecendo

Esse erro é **NORMAL e ESPERADO** em certos cenários:

### **Cenário 1: Primeira carga da página (SEM estar logado)**

Quando o app carrega, o AuthContext tenta verificar se há uma sessão ativa chamando `supabase.auth.getUser()`. 

Se você **não está logado**, esse endpoint retorna 401, o que é esperado.

**Isso NÃO é um erro real** - é apenas o Supabase dizendo "não há ninguém logado".

### **Cenário 2: Após OAuth redirect**

Depois do redirect do Google, se o token não foi processado corretamente, você pode ver esse erro.

---

## 🔍 Diagnóstico

### **Se o erro aparece MAS o login funciona:**
✅ **Ignorar** - É só uma verificação inicial que falha (normal)

### **Se o erro aparece E o login NÃO funciona:**
❌ **Problema real** - Precisa investigar

---

## 🔧 Soluções Possíveis

### **Solução 1: Verificar Environment Variables (Vercel)**

Se você está testando na **Vercel**, verifique se as variáveis estão configuradas:

1. Vercel Dashboard → Settings → Environment Variables
2. Deve ter:
   - `VITE_SUPABASE_URL`: `https://szjjenczowoatabwcvjj.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: (sua anon key)
   - `VITE_APP_URL`: (URL da Vercel)

3. Se faltarem, adicione e faça **Redeploy**

### **Solução 2: Limpar Storage do Navegador**

Às vezes tokens antigos/inválidos ficam no storage:

1. **Abra DevTools** (F12)
2. **Application tab** → **Storage**
3. **Clear site data** (botão)
4. **Recarregue** a página (Ctrl+R)
5. **Tente login novamente**

### **Solução 3: Verificar se ANON_KEY está correta**

A ANON_KEY no Supabase pode ter mudado:

1. **Acesse**: https://app.supabase.com/project/szjjenczowoatabwcvjj/settings/api
2. **Copie** a "anon public" key
3. **Compare** com a que está em `.env.local` (local) ou Vercel (produção)
4. Se diferente, atualize

### **Solução 4: Teste com Console**

Abra o console do navegador (F12) e rode:

```javascript
console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'MISSING');
```

**Resultado esperado**:
```
SUPABASE_URL: https://szjjenczowoatabwcvjj.supabase.co
ANON_KEY: SET
```

Se aparecer `undefined` ou `MISSING`, as variáveis não estão carregando.

---

## 🧪 Testes para Confirmar o Problema

### **Teste 1: Criar Nova Conta**

1. Vá em `/login`
2. Clique em "Create Account"
3. Preencha nome, email, senha
4. Clique em "Create Account"

**Resultado esperado**:
- ✅ Redirect para dashboard
- ✅ Ver badge "Cloud" no header
- ✅ Sem erro 401 repetido

**Se der erro**:
- ❌ Volta para login
- ❌ Erro 401 continua aparecendo
- ❌ Não cria conta

### **Teste 2: Login com Email**

1. Vá em `/login`
2. Digite email e senha válidos
3. Clique em "Sign In"

**Resultado esperado**:
- ✅ Redirect para dashboard
- ✅ Ver seus dados
- ✅ Badge "Cloud"

**Se der erro**:
- ❌ "Invalid credentials"
- ❌ Erro 401
- ❌ Não loga

### **Teste 3: Login com Google**

1. Vá em `/login`
2. Clique "Continue with Google"
3. Escolha conta
4. Aceite permissões

**Resultado esperado**:
- ✅ Redirect para app (após configurar Site URL)
- ✅ Ver SyncDialog
- ✅ Login completo

---

## 📊 Checklist de Diagnóstico

### **Ambiente Local (localhost)**

- [ ] Arquivo `.env.local` existe
- [ ] VITE_SUPABASE_URL está preenchida
- [ ] VITE_SUPABASE_ANON_KEY está preenchida
- [ ] Dev server foi reiniciado após criar/editar .env.local
- [ ] Console mostra as variáveis carregadas

### **Ambiente Vercel (produção)**

- [ ] Environment Variables configuradas no dashboard
- [ ] 3 variáveis presentes (URL, ANON_KEY, APP_URL)
- [ ] Marcadas para Production, Preview, Development
- [ ] Fez redeploy após adicionar variáveis
- [ ] Build passou sem erros

### **Supabase**

- [ ] Anon key está correta (copiada do dashboard)
- [ ] URL do projeto está correta
- [ ] Auth providers habilitados (Email, Google)
- [ ] RLS está ativo nas tabelas

---

## 🐛 Troubleshooting Específico

### **Erro aparece SEMPRE na primeira carga**

**Normal!** O AuthContext verifica se há sessão. Se não houver, retorna 401.

**Solução**: Ignorar esse erro específico. O importante é se o login funciona.

### **Erro aparece E impede login**

**Problema real!** 

**Debug**:
1. Abra Network tab (F12)
2. Tente fazer login
3. Veja a request para `/auth/v1/token` ou `/auth/v1/signup`
4. Se falhar, veja o erro detalhado
5. Compartilhe a mensagem de erro

### **"Invalid API key"**

**Causa**: ANON_KEY incorreta ou não carregada

**Solução**:
1. Verifique `.env.local` (local) ou Vercel vars (produção)
2. Re-copie a anon key do Supabase Dashboard
3. Reinicie dev server (local) ou redeploy (Vercel)

### **"CORS error"**

**Causa**: Request bloqueada por CORS (raro com Supabase)

**Solução**:
1. Verifique se está usando HTTPS em produção
2. Verifique Allowed origins no Supabase

---

## ✅ Após Resolver

**Login com email deve**:
1. Criar conta com sucesso
2. Fazer login com sucesso
3. Redirect para dashboard
4. Mostrar dados do usuário
5. Badge "Cloud" visível

**Login com Google deve**:
1. Popup do Google
2. Escolher conta
3. Redirect para app
4. Ver SyncDialog
5. Login completo

---

## 🎯 Ação Imediata

**Para PRODUCTION (Vercel)**:

1. Verifique Environment Variables:
   ```
   Vercel Dashboard → Settings → Environment Variables
   ```

2. Confirme que tem:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY  
   - VITE_APP_URL

3. Se falta alguma, adicione e **Redeploy**

**Para DEVELOPMENT (local)**:

1. Verifique `.env.local` existe
2. Reinicie dev server:
   ```bash
   # Pare o servidor (Ctrl+C)
   npm run dev
   ```

3. Verifique console:
   ```
   Não deve mostrar "Supabase credentials not found"
   ```

---

## 📞 Ainda com Problema?

Se após todas as verificações o erro persiste:

**Compartilhe**:
1. Screenshot do erro no console (com detalhes)
2. Screenshot da Network tab (request que falhou)
3. Onde está testando (local ou Vercel)
4. O que acontece quando tenta login/signup

---

**Em 90% dos casos**: Erro 401 inicial é normal e pode ser ignorado se login funciona.

**Se login NÃO funciona**: Problema com environment variables (mais comum).
