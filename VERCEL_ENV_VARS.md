# 🚨 Como Adicionar Variáveis de Ambiente na Vercel

## ❌ O Problema

Você tentou fazer redeploy e recebeu este erro:
```
Invalid request: env.VITE_SUPABASE_URL should be string
```

## ✅ A Solução

As variáveis de ambiente **NÃO** podem ser configuradas no `vercel.json`.  
Elas **DEVEM** ser adicionadas manualmente no Dashboard da Vercel.

---

## 📋 Passo-a-Passo (3 minutos)

### 1. Acesse Settings do Seu Projeto

```
Vercel Dashboard → Seu Projeto → Settings → Environment Variables
```

Ou acesse diretamente (substitua SEU-PROJETO):
```
https://vercel.com/SEU-USERNAME/weekly-allowance-tracker/settings/environment-variables
```

---

### 2. Adicione as 3 Variáveis

Para CADA variável abaixo, clique em **Add New**:

#### **Variável 1:**
```
Name: VITE_SUPABASE_URL
Value: https://szjjenczowoatabwcvjj.supabase.co
Environments: ✅ Production  ✅ Preview  ✅ Development
```
Clique em **Save**

#### **Variável 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek
Environments: ✅ Production  ✅ Preview  ✅ Development
```
Clique em **Save**

#### **Variável 3:**
```
Name: VITE_APP_URL
Value: https://weekly-allowance-tracker.vercel.app
Environments: ✅ Production  ✅ Preview  ✅ Development
```
⚠️ **IMPORTANTE**: Substitua com a URL REAL que a Vercel gerou para você.  
Exemplo: `https://weekly-allowance-tracker-abc123.vercel.app`

Clique em **Save**

---

### 3. Faça Redeploy

#### Opção A: Pelo Dashboard
1. Vá em **Deployments**
2. Encontre o último deployment (o que falhou)
3. Clique nos **3 pontinhos** (⋯)
4. Clique em **Redeploy**

#### Opção B: Novo Push (não necessário)
```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

---

## ✅ Como Verificar se Deu Certo

Após o redeploy:

1. **Build passou?** ✅
   - Veja os logs do deployment
   - Deve mostrar "Build Completed"

2. **App abre?** ✅
   - Acesse a URL da Vercel
   - Deve carregar a página de login

3. **Login funciona?** ✅
   - Tente criar uma conta
   - Se der erro de rede, volte ao passo de configurar Supabase URLs

---

## 🔧 Configuração Pós-Deploy

Depois que o app estiver funcionando, configure no Supabase:

### Supabase → URL Configuration
https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/url-configuration

**Site URL:**
```
https://SUA-URL-DA-VERCEL.vercel.app
```

**Redirect URLs (adicione):**
```
https://SUA-URL-DA-VERCEL.vercel.app/**
https://SUA-URL-DA-VERCEL.vercel.app/auth/callback
```

Clique em **Save**

---

## 📸 Screenshot Passo-a-Passo

### 1. Settings → Environment Variables
Procure por "Environment Variables" na sidebar esquerda.

### 2. Clique em "Add New"
Botão azul no canto superior direito.

### 3. Preencha os Campos
- **Name**: Exatamente como mostrado (case-sensitive)
- **Value**: Copie e cole os valores acima
- **Environments**: Marque TODAS as 3 opções

### 4. Save
Clique no botão verde "Save".

### 5. Repita
Faça isso para as 3 variáveis.

---

## 🐛 Troubleshooting

### "Cannot read environment variable"
- Certifique-se que marcou **Production**, **Preview** E **Development**
- Refaça o deploy após adicionar as variáveis

### "Build failed"
- Veja os logs completos em Deployments → [Seu Deploy] → View Function Logs
- Se mencionar variáveis faltando, adicione-as no Dashboard

### "Network Error" no app
- Verifique se `VITE_SUPABASE_URL` está correta (sem / no final)
- Verifique se `VITE_SUPABASE_ANON_KEY` foi copiada completa

---

## ✅ Checklist Final

- [ ] VITE_SUPABASE_URL adicionada no Dashboard
- [ ] VITE_SUPABASE_ANON_KEY adicionada no Dashboard
- [ ] VITE_APP_URL adicionada no Dashboard (com URL real da Vercel)
- [ ] Todas marcadas para Production, Preview, Development
- [ ] Redeploy realizado
- [ ] Build passou ✅
- [ ] App abre sem erro ✅
- [ ] URLs configuradas no Supabase
- [ ] Login testado e funcionando ✅

---

## 📚 Arquivos de Referência

**Valores completos das variáveis:**
```bash
cat ENV_VARS_VERCEL.md
```

**Guia completo de deploy:**
```bash
cat DEPLOY_VERCEL.md
```

---

**Após adicionar as variáveis no Dashboard, o deploy deve funcionar!** 🚀
