# 🔑 URLs Prontas para Configuração OAuth

## 📋 Seu Projeto Supabase
- **Project ID**: `szjjenczowoatabwcvjj`
- **URL**: `https://szjjenczowoatabwcvjj.supabase.co`
- **Dashboard**: https://app.supabase.com/project/szjjenczowoatabwcvjj

---

## 🔵 Google OAuth - URLs para Copiar/Colar

### Google Cloud Console
**Link direto**: https://console.cloud.google.com/apis/credentials

### Authorized JavaScript origins:
```
http://localhost:5182
https://szjjenczowoatabwcvjj.supabase.co
```

### Authorized redirect URIs:
```
http://localhost:5182/auth/callback
https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```

### Depois de criar:
1. Copie o **Client ID**
2. Copie o **Client Secret**
3. Cole no Supabase Dashboard em: **Authentication** → **Providers** → **Google**

---

## 🔵 Facebook OAuth - URLs para Copiar/Colar

### Facebook Developers
**Link direto**: https://developers.facebook.com/apps/

### Valid OAuth Redirect URIs:
```
http://localhost:5182/auth/callback
https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```

### Site URL:
```
http://localhost:5182
```

### Depois de criar:
1. Copie o **App ID**
2. Copie o **App Secret** (clique em "Show")
3. **IMPORTANTE**: Mude o app para modo **Live** (Settings → Basic → App Mode)
4. Cole no Supabase Dashboard em: **Authentication** → **Providers** → **Facebook**

---

## ✅ Supabase Dashboard - URL Configuration

**Link direto**: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/url-configuration

### Site URL:
```
http://localhost:5182
```

### Redirect URLs (adicione estas):
```
http://localhost:5182/**
http://localhost:5182/auth/callback
```

---

## 📧 Email Authentication (Mais Simples!)

**Link direto**: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers

### Configuração rápida (2 minutos):
1. Clique em **Email**
2. **Enable Email provider**: ✅ ON
3. **Confirm email**: ❌ OFF (para testes rápidos)
4. Clique em **Save**

✅ **Pronto! Já pode testar login com email/senha**

---

## 🧪 Testar Agora

Depois de habilitar Email Auth:

```bash
# App já está rodando em:
http://localhost:5182/login

# Páginas disponíveis:
http://localhost:5182/login              # Login/Signup
http://localhost:5182/reset-password     # Reset senha
http://localhost:5182/confirm-email      # Confirmar email
http://localhost:5182/update-password    # Nova senha
```

---

## 📝 Ordem Recomendada

1. **✅ COMECE AQUI**: Habilite Email Auth (2 min)
   - https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers
   - Email → Enable
   
2. **Teste Email Auth** no seu app (5 min)
   - Crie uma conta
   - Faça login
   - Teste reset de senha
   
3. **Configure Google OAuth** (5-7 min)
   - Seguir passos acima
   
4. **Configure Facebook OAuth** (5-7 min)
   - Seguir passos acima

---

## 🎯 Status Atual

- ✅ Código completo e funcionando
- ✅ App rodando em http://localhost:5182
- ✅ Tabelas criadas no Supabase
- ✅ RLS policies ativas
- ⏳ Aguardando: Habilitar providers (você está fazendo agora!)

**Tempo estimado**: 15-20 minutos para tudo

---

## 🆘 Precisa de Ajuda?

Se encontrar erros, veja:
- `docs/QUICK_OAUTH_SETUP.md` - Guia passo-a-passo detalhado
- `docs/SUPABASE_SETUP_GUIDE.md` - Guia completo com troubleshooting

Ou rode:
```bash
node scripts/check-supabase.mjs
```
