# 🔐 Variáveis de Ambiente para Vercel

## ⚠️ COPIE E COLE NA VERCEL

Ao fazer deploy na Vercel, adicione estas variáveis em:
**Settings → Environment Variables**

---

### 1. VITE_SUPABASE_URL

```
https://szjjenczowoatabwcvjj.supabase.co
```

---

### 2. VITE_SUPABASE_ANON_KEY

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek
```

---

### 3. VITE_APP_URL

**Primeira vez (temporário):**
```
https://weekly-allowance-tracker.vercel.app
```

**⚠️ IMPORTANTE**: Após o primeiro deploy:
1. Copie a URL real gerada pela Vercel
2. Volte em Environment Variables
3. Atualize `VITE_APP_URL` com a URL correta
4. Faça **Redeploy** para aplicar

---

## 📋 Como Adicionar na Vercel

### Durante o Deploy:

1. Na tela de configuração, procure por **Environment Variables**
2. Clique em **Add**
3. Para cada variável:
   - **Name**: Cole o nome (ex: `VITE_SUPABASE_URL`)
   - **Value**: Cole o valor correspondente
   - **Environments**: Marque **Production**, **Preview**, e **Development**
   - Clique em **Add**

### Depois do Deploy:

1. Vá em **Settings** → **Environment Variables**
2. Procure `VITE_APP_URL`
3. Clique em **Edit**
4. Atualize com a URL real da Vercel
5. Clique em **Save**
6. Vá em **Deployments**
7. Clique nos 3 pontinhos do último deploy
8. Clique em **Redeploy**

---

## ✅ Checklist

- [ ] VITE_SUPABASE_URL adicionada
- [ ] VITE_SUPABASE_ANON_KEY adicionada
- [ ] VITE_APP_URL adicionada (temporária)
- [ ] Deploy realizado
- [ ] VITE_APP_URL atualizada com URL real
- [ ] Redeploy realizado
- [ ] URLs atualizadas no Supabase
- [ ] OAuth apps atualizados (se configurou)

---

## 🔗 Links Rápidos

**Vercel Deploy:**
https://vercel.com/new

**Supabase URL Configuration:**
https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/url-configuration

**Supabase Auth Providers:**
https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers

---

## 📝 Notas de Segurança

✅ **Anon Key é PÚBLICA** - É seguro commitar e expor
✅ **Service Role Key** - NUNCA exponha (não usamos no frontend)
✅ **RLS está ativo** - Dados protegidos por políticas

---

**Pronto para copiar e colar!** 🚀
