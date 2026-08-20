# 🚀 Guia de Deploy na Vercel

## ✅ Push Realizado com Sucesso!

Seu código foi enviado para: `https://github.com/gustavocardoso/weekly-allowance-tracker`

---

## 🔧 Configurações Necessárias na Vercel

### **1. Variáveis de Ambiente (CRÍTICO!)**

Na Vercel Dashboard → Settings → Environment Variables, adicione:

```bash
# Supabase Configuration (OBRIGATÓRIO)
VITE_SUPABASE_URL=https://szjjenczowoatabwcvjj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek

# App URL (ATUALIZAR APÓS DEPLOY)
VITE_APP_URL=https://SEU-APP.vercel.app
```

⚠️ **IMPORTANTE**: Após o primeiro deploy, volte e atualize `VITE_APP_URL` com a URL real da Vercel.

---

### **2. Build Settings**

A Vercel detecta automaticamente Vite, mas confirme:

```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

✅ **Já está configurado no package.json**

---

### **3. Node.js Version**

A Vercel usa Node.js 18.x por padrão, que é compatível.

**Opcional**: Se quiser especificar, crie `.nvmrc`:
```bash
echo "20" > .nvmrc
```

---

## 🔐 Configurações Pós-Deploy no Supabase

Depois que a Vercel gerar sua URL (ex: `https://weekly-allowance-tracker.vercel.app`):

### **1. Atualizar URLs no Supabase**

**Dashboard**: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/url-configuration

Adicione em **Redirect URLs**:
```
https://SEU-APP.vercel.app/**
https://SEU-APP.vercel.app/auth/callback
```

Atualize **Site URL**:
```
https://SEU-APP.vercel.app
```

---

### **2. Atualizar OAuth Apps (Se Configurou)**

#### **Google Cloud Console**
https://console.cloud.google.com/apis/credentials

Adicione em **Authorized JavaScript origins**:
```
https://SEU-APP.vercel.app
```

Adicione em **Authorized redirect URIs**:
```
https://SEU-APP.vercel.app/auth/callback
https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```

#### **Facebook Developers**
https://developers.facebook.com/apps/

Adicione em **Valid OAuth Redirect URIs**:
```
https://SEU-APP.vercel.app/auth/callback
https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```

Atualize **Site URL**:
```
https://SEU-APP.vercel.app
```

---

## 📋 Checklist de Deploy

### **Pré-Deploy**
- [x] Código commitado e pushed ✅
- [x] Build passa localmente (`npm run build`) ✅
- [x] .env.local não commitado (está em .gitignore) ✅

### **Durante Deploy na Vercel**
1. [ ] Importar repositório do GitHub
2. [ ] Confirmar build settings (automático)
3. [ ] Adicionar variáveis de ambiente:
   - [ ] `VITE_SUPABASE_URL`
   - [ ] `VITE_SUPABASE_ANON_KEY`
   - [ ] `VITE_APP_URL` (temporário, atualizar depois)
4. [ ] Deploy

### **Pós-Deploy**
1. [ ] Copiar URL da Vercel
2. [ ] Atualizar `VITE_APP_URL` na Vercel
3. [ ] Atualizar Redirect URLs no Supabase
4. [ ] Atualizar Site URL no Supabase
5. [ ] Atualizar OAuth apps (Google, Facebook)
6. [ ] Testar login no app em produção
7. [ ] Testar sync de dados

---

## 🚀 Deploy na Vercel (Passo-a-Passo)

### **1. Acesse a Vercel**
```
https://vercel.com/new
```

### **2. Importe o Repositório**
- Clique em "Import Git Repository"
- Selecione: `gustavocardoso/weekly-allowance-tracker`
- Clique em "Import"

### **3. Configure**
- **Project Name**: `weekly-allowance-tracker` (ou personalize)
- **Framework Preset**: Vite (auto-detectado)
- **Root Directory**: `./` (raiz)
- **Build Command**: `npm run build` (auto-detectado)
- **Output Directory**: `dist` (auto-detectado)

### **4. Adicione Environment Variables**

Clique em "Environment Variables" e adicione:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://szjjenczowoatabwcvjj.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | (sua anon key completa) |
| `VITE_APP_URL` | `https://seu-app.vercel.app` (atualizar depois) |

⚠️ Marque "Production", "Preview", e "Development" para todas.

### **5. Deploy**
- Clique em "Deploy"
- Aguarde ~2-3 minutos
- Vercel mostrará a URL do seu app

### **6. Atualize VITE_APP_URL**
- Copie a URL da Vercel (ex: `https://weekly-allowance-tracker.vercel.app`)
- Vá em Settings → Environment Variables
- Edite `VITE_APP_URL` com a URL real
- Clique em "Save"
- **IMPORTANTE**: Faça um novo deploy (Settings → Deployments → Redeploy)

---

## 🧪 Testar em Produção

Após deploy completo:

```bash
# 1. Abra seu app
https://SEU-APP.vercel.app/login

# 2. Teste criar conta
# 3. Teste login
# 4. Teste criação de situações/ciclos
# 5. Teste OAuth (se configurou)
# 6. Teste sync entre dispositivos
```

---

## 🐛 Troubleshooting

### **"Failed to build"**
- Verifique se todas as variáveis de ambiente estão configuradas
- Verifique se o build passa localmente: `npm run build`

### **"Network Error" ao fazer login**
- Verifique se `VITE_SUPABASE_URL` está correta
- Verifique se `VITE_SUPABASE_ANON_KEY` está correta

### **OAuth não funciona em produção**
- Verifique se adicionou a URL da Vercel nos OAuth apps
- Verifique se adicionou a URL nas Redirect URLs do Supabase

### **Dados não sincronizam**
- Verifique se RLS está ativo nas tabelas
- Verifique no console do navegador (F12) por erros

---

## 📊 Custos

### **Vercel Free Tier**
- ✅ 100GB bandwidth/mês
- ✅ Deploy automático do GitHub
- ✅ SSL automático
- ✅ Suficiente para uso pessoal/teste

### **Supabase Free Tier**
- ✅ 500MB database
- ✅ 50,000 usuários ativos/mês
- ✅ 2GB bandwidth
- ✅ Suficiente para começar

---

## 🎯 Próximos Passos Após Deploy

1. **Domínio Customizado** (Opcional)
   - Vercel: Settings → Domains
   - Adicione seu domínio
   - Atualize URLs no Supabase e OAuth apps

2. **Monitoramento**
   - Vercel Analytics: Settings → Analytics
   - Supabase Logs: Dashboard → Logs

3. **Performance**
   - Lighthouse score
   - Core Web Vitals
   - Considere code-splitting se bundle > 500KB

---

## ✅ Resumo Rápido

```bash
# 1. Deploy na Vercel
https://vercel.com/new → Import GitHub repo

# 2. Adicione env vars:
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_APP_URL

# 3. Deploy

# 4. Atualize URLs:
- VITE_APP_URL na Vercel
- Redirect URLs no Supabase
- OAuth apps (Google, Facebook)

# 5. Teste!
```

**Tempo estimado**: 10-15 minutos para deploy completo

---

## 📞 Suporte

Se encontrar problemas:
- Vercel Logs: Dashboard → Deployments → Logs
- Supabase Logs: Dashboard → Logs
- Browser Console: F12 → Console

---

**Seu app está pronto para produção!** 🎉

URL do Repositório: https://github.com/gustavocardoso/weekly-allowance-tracker
