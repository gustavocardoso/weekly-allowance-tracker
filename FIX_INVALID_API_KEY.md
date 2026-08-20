# 🔧 Corrigir Erro "Invalid API Key" na Vercel

## ⚠️ Erro

```
POST https://szjjenczowoatabwcvjj.supabase.co/auth/v1/signup 401 (Unauthorized)
AuthApiError: Invalid API key
```

**Causa**: A `VITE_SUPABASE_ANON_KEY` está incorreta, truncada, ou não foi configurada na Vercel.

---

## ✅ Solução Rápida (5 minutos)

### **PASSO 1: Obter a Chave Correta**

A chave ANON_KEY correta é:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek
```

**Características**:
- **Tamanho**: 208 caracteres
- **Início**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- **Fim**: `jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek`
- **Formato**: JWT com 3 partes separadas por `.`

---

### **PASSO 2: Verificar/Atualizar na Vercel**

#### **Opção A: Se a variável JÁ existe**

1. Acesse: https://vercel.com/dashboard
2. Projeto: **weekly-allowance-tracker**
3. **Settings** → **Environment Variables**
4. Encontre: `VITE_SUPABASE_ANON_KEY`
5. Clique nos **3 pontinhos (⋯)** ao lado dela
6. Clique **Edit**
7. **Cole a chave completa** (208 caracteres):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek
   ```
8. Verifique que está em: ✅ Production ✅ Preview ✅ Development
9. Clique **Save**

#### **Opção B: Se a variável NÃO existe**

1. Acesse: https://vercel.com/dashboard
2. Projeto: **weekly-allowance-tracker**
3. **Settings** → **Environment Variables**
4. Clique **Add New**
5. Preencha:
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Cole a chave completa (208 caracteres)
   - **Environments**: ✅ Production ✅ Preview ✅ Development
6. Clique **Save**

---

### **PASSO 3: Redeploy (OBRIGATÓRIO)**

⚠️ **Variáveis editadas NÃO afetam deployments existentes!**

1. Vá em: **Deployments**
2. Deployment mais recente → **⋯** (3 pontinhos)
3. Clique **Redeploy**
4. Aguarde até status "Ready" (2-3 minutos)

---

### **PASSO 4: Verificar se Corrigiu**

#### **Teste 1: Console do Navegador**

1. Abra seu app na Vercel
2. Pressione **F12** (Console)
3. Digite:
   ```javascript
   console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
   console.log('Tamanho:', import.meta.env.VITE_SUPABASE_ANON_KEY?.length);
   ```

4. **Resultado esperado**:
   ```
   KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek
   Tamanho: 208
   ```

5. **Se mostrar `undefined` ou tamanho diferente**:
   - Force refresh: **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows)
   - Limpe o cache do navegador
   - Abra em aba anônima
   - Aguarde mais 2 minutos

---

#### **Teste 2: Criar Conta**

1. Vá para `/login`
2. Clique **Create Account**
3. Email: `teste@example.com`
4. Password: `teste123`
5. Clique **Create Account**

**Resultado esperado**:
- ✅ Sem erro "Invalid API key"
- ✅ Conta criada ou outro erro (confirmação de email)

---

## 🔍 Problemas Comuns

### **1. Chave Truncada**

**Sintoma**: Tamanho diferente de 208 caracteres

**Causa**: Ao copiar/colar, parte da chave foi perdida

**Solução**:
- Delete a variável na Vercel
- Adicione novamente com a chave COMPLETA
- Verifique que tem **exatamente 208 caracteres**

---

### **2. Chave com Espaços**

**Sintoma**: Erro "Invalid API key" mesmo com 208 caracteres

**Causa**: Espaços no início ou fim da chave

**Solução**:
- Cole a chave em um editor de texto
- Remova espaços antes/depois
- Copie novamente (sem espaços)
- Cole na Vercel

---

### **3. Deployment Antigo**

**Sintoma**: Variável correta mas erro persiste

**Causa**: Não fez redeploy após editar a variável

**Solução**:
- Force redeploy (Passo 3 acima)
- Aguarde completar
- Force refresh no navegador

---

### **4. Variável em Ambiente Errado**

**Sintoma**: Funciona em Preview mas não em Production

**Causa**: Variável não marcada em "Production"

**Solução**:
- Edite a variável na Vercel
- Marque: ✅ Production ✅ Preview ✅ Development
- Redeploy

---

## 🧪 Teste Local da Chave

Para verificar se a chave está correta:

```bash
# No terminal (raiz do projeto)
./test-anon-key.sh
```

**Resultado esperado**:
```
✅ CHAVE VÁLIDA!

A chave funciona corretamente.
Use esta chave EXATA na Vercel:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek
```

---

## 📋 Checklist

Antes de testar novamente:

- [ ] Copiei a chave COMPLETA (208 caracteres)
- [ ] Editei/Adicionei `VITE_SUPABASE_ANON_KEY` na Vercel
- [ ] Marquei Production, Preview, Development
- [ ] Salvei a variável
- [ ] Fiz Redeploy
- [ ] Aguardei deployment completar (status "Ready")
- [ ] Fiz force refresh no navegador (Cmd+Shift+R)
- [ ] Testei no console (chave aparece completa?)
- [ ] Testei criar conta (erro mudou?)

---

## 🎯 Próximo Erro (Esperado)

Após corrigir a API key, você pode receber:

```
Email confirmations are required
```

**Isso é NORMAL!** Significa que:
- ✅ A API key está correta
- ✅ O Supabase está funcionando
- ⏳ Precisa desabilitar confirmação de email

**Solução**:
1. https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/email-templates
2. Desmarque: ☐ Enable email confirmations
3. Clique Save
4. Tente criar conta novamente

---

## 🔗 Links Úteis

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase API Settings**: https://app.supabase.com/project/szjjenczowoatabwcvjj/settings/api
- **VERCEL_ENV_SETUP.md**: Guia completo de configuração
- **test-anon-key.sh**: Script para testar chave localmente

---

## 📞 Ainda com Erro?

Se após seguir todos os passos o erro "Invalid API key" persistir:

**Verifique**:
1. A chave tem **exatamente 208 caracteres**?
2. A chave começa com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`?
3. A chave termina com `jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek`?
4. Você fez redeploy APÓS salvar a variável?
5. O deployment completou (status "Ready")?
6. Você fez force refresh no navegador?

**Compartilhe**:
1. Screenshot da página Environment Variables (mostrando VITE_SUPABASE_ANON_KEY)
2. Resultado do teste no console (tamanho da chave)
3. Mensagem de erro completa

---

## ⚡ Resumo Rápido (1 minuto)

```bash
1. Copie a chave: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek

2. Vercel → Settings → Environment Variables

3. Edite VITE_SUPABASE_ANON_KEY (ou adicione se não existir)

4. Cole a chave COMPLETA

5. Save → Deployments → Redeploy

6. Aguarde 2-3 minutos

7. Force refresh no navegador

8. Teste criar conta
```

✅ Deve funcionar!
