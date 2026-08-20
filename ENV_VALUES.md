# 🔑 Variáveis de Ambiente - Valores Prontos

## 📋 Copie e Cole Exatamente

### **1. VITE_SUPABASE_URL**
```
https://szjjenczowoatabwcvjj.supabase.co
```

### **2. VITE_SUPABASE_ANON_KEY**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek
```

### **3. VITE_APP_URL**

**Para Vercel (produção)**:
```
https://SEU-APP.vercel.app
```
(Substitua `SEU-APP` pela URL real que a Vercel gerou)

**Para localhost (desenvolvimento)**:
```
http://localhost:5182
```

---

## 🌐 PARA VERCEL (Produção)

### **Passo 1: Acesse Environment Variables**
```
Vercel Dashboard → Seu Projeto → Settings → Environment Variables
```

### **Passo 2: Adicione as 3 Variáveis**

#### **Variável 1**:
- **Name**: `VITE_SUPABASE_URL`
- **Value**: `https://szjjenczowoatabwcvjj.supabase.co`
- **Environments**: ✅ Production ✅ Preview ✅ Development
- Clique **Add**

#### **Variável 2**:
- **Name**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek`
- **Environments**: ✅ Production ✅ Preview ✅ Development
- Clique **Add**

#### **Variável 3**:
- **Name**: `VITE_APP_URL`
- **Value**: Veja qual URL a Vercel gerou para você (ex: `https://weekly-allowance-tracker.vercel.app`)
- **Environments**: ✅ Production ✅ Preview ✅ Development
- Clique **Add**

### **Passo 3: REDEPLOY**
⚠️ **IMPORTANTE**: Após adicionar as variáveis:
1. Vá em **Deployments**
2. Encontre o deployment mais recente
3. Clique nos **3 pontinhos** (⋯)
4. Clique em **Redeploy**
5. Aguarde 2-3 minutos

---

## 💻 PARA LOCALHOST (Desenvolvimento)

### **Opção 1: Arquivo .env.local (RECOMENDADO)**

1. **Crie o arquivo** `.env.local` na **raiz do projeto**

2. **Cole EXATAMENTE este conteúdo**:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://szjjenczowoatabwcvjj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek

# App Configuration
VITE_APP_URL=http://localhost:5182
```

3. **Salve o arquivo**

4. **REINICIE o dev server**:
```bash
# Pare o servidor (Ctrl+C ou Cmd+C)
npm run dev
```

### **Opção 2: Criar via Terminal**

```bash
cd /Users/gustavocardoso/Development/ai-test/allowance-calculator

cat > .env.local << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=https://szjjenczowoatabwcvjj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek

# App Configuration
VITE_APP_URL=http://localhost:5182
EOF

# Reiniciar dev server
npm run dev
```

---

## ✅ Verificar se Funcionou

### **No console do navegador** (F12):

```javascript
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'OK' : 'MISSING');
console.log('APP:', import.meta.env.VITE_APP_URL);
```

**Resultado esperado**:
```
URL: https://szjjenczowoatabwcvjj.supabase.co
KEY: OK
APP: http://localhost:5182
```

Se mostrar `undefined`, as variáveis não carregaram.

---

## 🔍 Se Não Funcionar

### **Vercel**:
- [ ] Verificou que adicionou as 3 variáveis?
- [ ] Marcou Production, Preview, Development?
- [ ] Fez redeploy após adicionar?
- [ ] Aguardou 2-3 minutos após redeploy?

### **Localhost**:
- [ ] Arquivo `.env.local` está na **raiz** do projeto?
- [ ] Nome do arquivo é EXATAMENTE `.env.local` (com ponto no início)?
- [ ] Reiniciou o dev server após criar o arquivo?
- [ ] Não tem espaços antes ou depois do `=` nas variáveis?

---

## ⚠️ IMPORTANTE

### **ANON KEY é PÚBLICA**
✅ É seguro commitar/expor (é a chave pública)  
✅ RLS (Row Level Security) protege os dados  
❌ NUNCA exponha a SERVICE_ROLE_KEY (diferente, privada)  

### **Formato Correto**
```bash
# ✅ CORRETO (sem aspas, sem espaços)
VITE_SUPABASE_URL=https://szjjenczowoatabwcvjj.supabase.co

# ❌ ERRADO (com aspas ou espaços)
VITE_SUPABASE_URL = "https://szjjenczowoatabwcvjj.supabase.co"
VITE_SUPABASE_URL= https://szjjenczowoatabwcvjj.supabase.co
```

---

## 🎯 Após Configurar

**Teste criar conta**:
1. Vá em `/login`
2. Clique "Create Account"
3. Preencha dados
4. Clique "Create Account"
5. Deve criar e logar com sucesso! ✅

**Teste login com Google**:
1. Vá em `/login`
2. Clique "Continue with Google"
3. Escolha conta
4. Deve logar com sucesso! ✅

---

## 📞 Ainda com Problema?

Se após configurar corretamente o erro persiste:

**Compartilhe**:
1. Resultado do teste do console (com os valores)
2. Onde está testando (Vercel ou localhost)
3. Screenshot do erro

---

**Valores válidos até**: 2050 (a ANON_KEY expira em 2050)  
**Fonte**: https://app.supabase.com/project/szjjenczowoatabwcvjj/settings/api
