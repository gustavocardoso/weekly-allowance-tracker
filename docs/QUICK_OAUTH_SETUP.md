# 🚀 Guia Rápido: Habilitar Google e Facebook OAuth

## ⚠️ Erro Atual
```json
{
  "code": 400,
  "error_code": "validation_failed",
  "msg": "Unsupported provider: provider is not enabled"
}
```

## ✅ Solução: Habilitar Providers no Supabase

---

## 🔵 PARTE 1: Habilitar Google OAuth (5 minutos)

### **Passo 1: Google Cloud Console**

1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. No menu lateral, vá em **APIs & Services** → **Credentials**
4. Clique em **+ CREATE CREDENTIALS** → **OAuth client ID**
5. Se aparecer aviso sobre OAuth consent screen:
   - Clique em **CONFIGURE CONSENT SCREEN**
   - Escolha **External**
   - Preencha:
     - App name: `Weekly Allowance Tracker`
     - User support email: seu email
     - Developer contact: seu email
   - Clique em **SAVE AND CONTINUE**
   - Em Scopes, clique **SAVE AND CONTINUE** (pode deixar vazio)
   - Em Test users, adicione seu email
   - Clique em **SAVE AND CONTINUE**

6. Volte para **Credentials** → **+ CREATE CREDENTIALS** → **OAuth client ID**
7. Application type: **Web application**
8. Name: `Weekly Allowance Tracker`
9. **Authorized JavaScript origins:**
   ```
   http://localhost:5173
   https://SEU-PROJETO.supabase.co
   ```
10. **Authorized redirect URIs:**
    ```
    http://localhost:5173/auth/callback
    https://SEU-PROJETO.supabase.co/auth/v1/callback
    ```
    ⚠️ **IMPORTANTE**: Substitua `SEU-PROJETO` pelo ID do seu projeto Supabase
    
11. Clique em **CREATE**
12. **COPIE** o Client ID e Client Secret (vamos usar no próximo passo)

### **Passo 2: Supabase Dashboard**

1. Acesse: https://app.supabase.com/
2. Selecione seu projeto
3. Vá em **Authentication** → **Providers**
4. Procure por **Google** e clique para expandir
5. Configure:
   - **Enable Sign in with Google**: ✅ Ativar
   - **Client ID (for OAuth)**: Cole o Client ID do Google
   - **Client Secret (for OAuth)**: Cole o Client Secret do Google
   - **Authorized Client IDs**: Deixe vazio (opcional)
6. Clique em **Save**

✅ **Google OAuth configurado!**

---

## 🔵 PARTE 2: Habilitar Facebook OAuth (5 minutos)

### **Passo 1: Facebook Developers**

1. Acesse: https://developers.facebook.com/
2. Clique em **My Apps** (canto superior direito)
3. Clique em **Create App**
4. Escolha tipo: **Consumer** ou **None**
5. Clique em **Next**
6. Preencha:
   - App name: `Weekly Allowance Tracker`
   - App contact email: seu email
7. Clique em **Create App**
8. No Dashboard do app, procure **Facebook Login** e clique em **Set Up**
9. Escolha plataforma: **Web**
10. Site URL: `http://localhost:5173`
11. Clique em **Save** e depois **Continue**
12. No menu lateral, vá em **Facebook Login** → **Settings**
13. Em **Valid OAuth Redirect URIs**, adicione:
    ```
    http://localhost:5173/auth/callback
    https://SEU-PROJETO.supabase.co/auth/v1/callback
    ```
    ⚠️ **IMPORTANTE**: Substitua `SEU-PROJETO` pelo ID do seu projeto Supabase
    
14. Clique em **Save Changes**
15. No menu lateral, vá em **Settings** → **Basic**
16. **COPIE** o App ID e App Secret (clique em Show para ver o Secret)
17. ⚠️ **IMPORTANTE**: Role até o final e mude o **App Mode** de Development para **Live**
    - Clique em **Switch Mode** → **Switch to Live Mode**

### **Passo 2: Supabase Dashboard**

1. Acesse: https://app.supabase.com/
2. Selecione seu projeto
3. Vá em **Authentication** → **Providers**
4. Procure por **Facebook** e clique para expandir
5. Configure:
   - **Enable Sign in with Facebook**: ✅ Ativar
   - **Facebook client ID**: Cole o App ID do Facebook
   - **Facebook client secret**: Cole o App Secret do Facebook
6. Clique em **Save**

✅ **Facebook OAuth configurado!**

---

## 🔵 PARTE 3: Verificar URLs (Importante!)

### **No Supabase Dashboard:**

1. Vá em **Authentication** → **URL Configuration**
2. Verifique se estão configuradas:
   ```
   Site URL: http://localhost:5173
   
   Redirect URLs:
   http://localhost:5173/**
   http://localhost:5173/auth/callback
   ```

---

## ✅ Testar Configuração

1. Recarregue a página do seu app: http://localhost:5173/login
2. Clique em **Continue with Google** ou **Continue with Facebook**
3. Você será redirecionado para a tela de autorização
4. Após autorizar, será redirecionado de volta para o app
5. O SyncDialog deve aparecer (se você tiver dados locais)

---

## 🐛 Troubleshooting

### **"redirect_uri_mismatch" (Google)**
- Verifique se a URL de redirect no Google Cloud Console está EXATA
- Deve terminar com `/auth/v1/callback` (não `/auth/callback`)

### **"URL Blocked: This redirect failed" (Facebook)**
- Verifique se adicionou a URL em Valid OAuth Redirect URIs
- Certifique-se que o app está em modo **Live** (não Development)

### **"Invalid credentials" (Supabase)**
- Verifique se copiou Client ID e Secret corretamente
- Não deve ter espaços em branco no início ou fim

### **"Popup bloqueado"**
- Permita popups para localhost no seu navegador
- Ou tente em uma janela anônima

---

## 📝 Checklist Rápido

**Google OAuth:**
- [ ] Projeto criado no Google Cloud Console
- [ ] OAuth consent screen configurado
- [ ] OAuth Client ID criado
- [ ] Redirect URIs adicionadas
- [ ] Client ID e Secret copiados
- [ ] Configurado no Supabase Dashboard

**Facebook OAuth:**
- [ ] App criado no Facebook Developers
- [ ] Facebook Login configurado
- [ ] Valid OAuth Redirect URIs adicionadas
- [ ] App em modo Live (não Development)
- [ ] App ID e Secret copiados
- [ ] Configurado no Supabase Dashboard

**Supabase:**
- [ ] Site URL configurada
- [ ] Redirect URLs configuradas
- [ ] Google provider habilitado
- [ ] Facebook provider habilitado

---

## 🎉 Depois de Configurar

Seus botões de login social funcionarão e você poderá:
1. Login com Google → Sync de dados
2. Login com Facebook → Sync de dados
3. Ver indicador "Cloud" no header
4. Dados sincronizados entre dispositivos

**Tempo estimado**: 10-15 minutos total

---

## 📚 Referências

- Google OAuth: https://console.cloud.google.com/
- Facebook Developers: https://developers.facebook.com/
- Supabase Docs: https://supabase.com/docs/guides/auth/social-login
