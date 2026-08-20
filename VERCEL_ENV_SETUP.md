# 🚀 Como Configurar Variáveis de Ambiente na Vercel

## ⚠️ Problema

Erro 401 ao tentar criar conta **em produção (Vercel)**:
```
GET https://szjjenczowoatabwcvjj.supabase.co/auth/v1/user 401 (Unauthorized)
```

**Causa**: Variáveis de ambiente não estão configuradas na Vercel.

---

## 🔧 Solução Completa

### **PASSO 1: Acesse o Dashboard da Vercel**

1. Vá para: https://vercel.com/dashboard

2. Faça login se necessário

3. Encontre e clique no projeto: **weekly-allowance-tracker**

---

### **PASSO 2: Acesse Environment Variables**

1. No projeto, clique em **Settings** (menu superior)

2. No menu lateral esquerdo, clique em **Environment Variables**

3. Você verá uma lista de variáveis (pode estar vazia)

---

### **PASSO 3: Adicione as 3 Variáveis**

#### **Variável 1: VITE_SUPABASE_URL**

1. Clique no botão **Add New** (ou **Add Environment Variable**)

2. Preencha:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: `https://szjjenczowoatabwcvjj.supabase.co`
   - **Environments**: Marque as 3 opções:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

3. Clique **Save** (ou **Add**)

---

#### **Variável 2: VITE_SUPABASE_ANON_KEY**

1. Clique em **Add New** novamente

2. Preencha:
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: 
     ```
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek
     ```
   - **Environments**: Marque as 3 opções:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

3. Clique **Save**

---

#### **Variável 3: VITE_APP_URL**

1. Clique em **Add New** mais uma vez

2. Preencha:
   - **Name**: `VITE_APP_URL`
   - **Value**: A URL do seu app na Vercel
     - **Como encontrar**: No dashboard do projeto, você vê algo como:
       - `https://weekly-allowance-tracker.vercel.app`
       - `https://weekly-allowance-tracker-gustavocardoso.vercel.app`
     - Use essa URL completa (com https://)
   - **Environments**: Marque as 3 opções:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

3. Clique **Save**

---

### **PASSO 4: Verificar se as Variáveis Foram Adicionadas**

Na página **Environment Variables**, você deve ver:

```
VITE_SUPABASE_URL           Production, Preview, Development
VITE_SUPABASE_ANON_KEY      Production, Preview, Development  
VITE_APP_URL                Production, Preview, Development
```

---

### **PASSO 5: REDEPLOY (OBRIGATÓRIO)**

⚠️ **IMPORTANTE**: As variáveis só são carregadas após um novo deployment!

#### **Como Fazer Redeploy:**

1. Volte para o dashboard do projeto (clique no logo da Vercel ou no nome do projeto)

2. Clique na aba **Deployments** (menu superior)

3. Você verá uma lista de deployments. Encontre o **mais recente** (primeiro da lista)

4. Clique nos **3 pontinhos** (⋯) no canto direito do deployment

5. No menu que aparece, clique em **Redeploy**

6. Confirme clicando em **Redeploy** novamente no modal

7. Aguarde o deployment completar (2-3 minutos)
   - Status muda de "Building..." para "Ready"

---

### **PASSO 6: Verificar se Funcionou**

#### **Teste 1: Verificar Variáveis no Console**

1. Acesse seu app na Vercel (a URL que você usou no VITE_APP_URL)

2. Abra o Console do navegador (F12 ou Cmd+Option+I)

3. Digite e pressione Enter:
   ```javascript
   console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
   console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'OK' : 'MISSING');
   console.log('APP:', import.meta.env.VITE_APP_URL);
   ```

4. **Resultado esperado**:
   ```
   URL: https://szjjenczowoatabwcvjj.supabase.co
   KEY: OK
   APP: https://seu-app.vercel.app
   ```

5. **Se mostrar `undefined`**:
   - Verifique se o redeploy terminou
   - Force refresh: Cmd+Shift+R (Mac) ou Ctrl+Shift+R (Windows)
   - Limpe o cache do navegador
   - Aguarde 2-3 minutos e tente novamente

---

#### **Teste 2: Criar Conta**

1. Vá para `/login` no seu app

2. Clique em **Create Account**

3. Preencha:
   - Email: `teste@example.com`
   - Password: `teste123`

4. Clique em **Create Account**

5. **Se ainda der erro 401**:
   - Verifique se você desabilitou a confirmação de email (Passo 7 abaixo)

---

### **PASSO 7: Desabilitar Confirmação de Email (Se Necessário)**

Se após configurar as variáveis ainda der erro 401:

1. Acesse: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/email-templates

2. Desmarque: **☐ Enable email confirmations**

3. Clique em **Save**

4. Aguarde 1 minuto (cache)

5. Tente criar conta novamente

---

## 📸 Visual Reference

### **Environment Variables Page:**

```
┌─────────────────────────────────────────────────────────┐
│ Environment Variables                                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  + Add New                                      │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  VITE_SUPABASE_URL                                      │
│  Production, Preview, Development                        │
│  ⋯                                                       │
│                                                          │
│  VITE_SUPABASE_ANON_KEY                                 │
│  Production, Preview, Development                        │
│  ⋯                                                       │
│                                                          │
│  VITE_APP_URL                                           │
│  Production, Preview, Development                        │
│  ⋯                                                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Troubleshooting

### **Variáveis aparecem como `undefined` após redeploy**

**Verifique**:
1. Redeploy terminou? (status "Ready")
2. Aguardou 2-3 minutos?
3. Fez force refresh? (Cmd+Shift+R)
4. Limpou o cache do navegador?

**Solução**:
- Aguarde mais alguns minutos
- Tente abrir em aba anônima (Cmd+Shift+N)
- Verifique se as variáveis estão marcadas em "Production"

---

### **Erro persiste mesmo com variáveis configuradas**

**Verifique**:
1. A ANON_KEY está completa? (deve ter 208 caracteres)
2. Não tem espaços extras antes/depois?
3. Desabilitou a confirmação de email?

**Teste com curl**:
```bash
curl -X POST 'https://szjjenczowoatabwcvjj.supabase.co/auth/v1/signup' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste-vercel@example.com",
    "password": "teste123"
  }'
```

Se retornar sessão não-null, está configurado corretamente.

---

### **Como deletar variáveis erradas**

1. Na página Environment Variables
2. Encontre a variável
3. Clique nos **3 pontinhos** (⋯)
4. Clique em **Delete**
5. Confirme
6. Adicione novamente com o valor correto
7. **Redeploy** após corrigir

---

## ✅ Checklist Final

Antes de testar em produção:

- [ ] Adicionei VITE_SUPABASE_URL na Vercel
- [ ] Adicionei VITE_SUPABASE_ANON_KEY na Vercel
- [ ] Adicionei VITE_APP_URL na Vercel (com a URL correta)
- [ ] Marquei Production, Preview, Development nas 3 variáveis
- [ ] Fiz Redeploy
- [ ] Aguardei o deployment completar (status "Ready")
- [ ] Desabilitei confirmação de email no Supabase
- [ ] Testei no console do navegador (variáveis aparecem?)
- [ ] Testei criar conta (funciona sem 401?)

---

## 🎯 Resultado Final

Após configurar corretamente:

- ✅ Sem erro 401
- ✅ Sem aviso "Supabase credentials not found"
- ✅ Badge "Cloud" aparece no header
- ✅ Conta criada e logada imediatamente
- ✅ Dados salvos na nuvem (Supabase)

---

## 📞 Ainda com Problema?

Se após seguir todos os passos o erro persistir, compartilhe:

1. Screenshot da página Environment Variables (mostrando as 3 variáveis)
2. Screenshot do console do navegador (com o teste das variáveis)
3. URL do seu app na Vercel
4. Mensagem de erro exata que aparece

---

## 🔗 Links Úteis

- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Auth Settings: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/email-templates
- ENV_VALUES.md (valores prontos para copiar)
- DISABLE_EMAIL_CONFIRMATION.md (guia completo)
