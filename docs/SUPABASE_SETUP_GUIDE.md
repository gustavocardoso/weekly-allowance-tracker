# Guia de Configuração: Autenticação Supabase

Este guia detalha como configurar Email, Google e Facebook authentication no seu projeto Supabase.

## ✅ Pré-requisitos

- [x] Projeto Supabase criado
- [x] Variáveis de ambiente configuradas (.env.local)
- [x] Tabelas e RLS policies criadas

## 🔐 Fase 1: Configurar Email Authentication

### 1.1 Habilitar Provider de Email

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Navegue para **Authentication** → **Providers**
4. Localize **Email** na lista
5. Clique para expandir as configurações
6. Configure:
   - **Enable Email provider**: ✅ Habilitado
   - **Confirm email**: ✅ Habilitado
   - **Secure email change**: ✅ Habilitado (recomendado)
   - **Double confirm email changes**: ⬜ Opcional
7. Clique em **Save**

### 1.2 Configurar URLs

1. Vá para **Authentication** → **URL Configuration**
2. Configure:
   ```
   Site URL: http://localhost:5173
   
   Redirect URLs:
   - http://localhost:5173/auth/callback
   - http://localhost:5173/**
   ```
3. Para produção, adicione também:
   ```
   - https://seu-dominio.com
   - https://seu-dominio.com/auth/callback
   - https://seu-dominio.com/**
   ```

### 1.3 Customizar Email Templates (Opcional)

1. Vá para **Authentication** → **Email Templates**
2. Você pode customizar:
   - **Confirm signup** - Email de confirmação
   - **Invite user** - Convite de usuário
   - **Magic Link** - Login sem senha
   - **Change Email Address** - Mudança de email
   - **Reset Password** - Recuperação de senha

**Exemplo de customização para "Confirm signup":**

```html
<h2>Confirme seu email</h2>

<p>Olá!</p>

<p>Clique no botão abaixo para confirmar seu email e ativar sua conta:</p>

<p>
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #8b5cf6; color: white; padding: 12px 24px; 
            text-decoration: none; border-radius: 8px; display: inline-block;">
    Confirmar Email
  </a>
</p>

<p>Ou copie e cole este link no seu navegador:</p>
<p>{{ .ConfirmationURL }}</p>

<p>Se você não criou uma conta, pode ignorar este email.</p>

<p>Obrigado,<br>Equipe Allowance Tracker</p>
```

### 1.4 Testar Email Authentication

```bash
# No terminal do projeto
npm run dev
```

1. Acesse http://localhost:5173/login
2. Clique em "Sign up"
3. Preencha email e senha
4. Você deve ver mensagem: "Check your email to confirm your account"
5. Verifique sua caixa de entrada
6. Clique no link de confirmação
7. Faça login com as credenciais

---

## 🔵 Fase 2: Configurar Google OAuth

### 2.1 Criar OAuth App no Google Cloud

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione existente
3. No menu lateral, vá para **APIs & Services** → **Credentials**
4. Clique em **+ CREATE CREDENTIALS** → **OAuth client ID**
5. Se for a primeira vez, configure a **OAuth consent screen**:
   - User Type: **External**
   - App name: **Allowance Tracker**
   - User support email: seu email
   - Developer contact: seu email
   - Clique em **Save and Continue**
   - Scopes: pode pular esta etapa
   - Test users: adicione seu email (enquanto app está em testing)
   - Clique em **Save and Continue**

6. Volte para **Credentials** → **+ CREATE CREDENTIALS** → **OAuth client ID**
7. Configure:
   - Application type: **Web application**
   - Name: **Allowance Tracker - Supabase Auth**
   
8. **Authorized JavaScript origins:**
   ```
   https://szjjenczowoatabwcvjj.supabase.co
   http://localhost:5173
   ```

9. **Authorized redirect URIs:**
   ```
   https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
   ```

10. Clique em **CREATE**
11. **Copie o Client ID e Client Secret** (você vai precisar)

### 2.2 Configurar Google Provider no Supabase

1. Acesse Supabase Dashboard
2. Vá para **Authentication** → **Providers**
3. Localize **Google** e clique para expandir
4. Configure:
   - **Enable Google provider**: ✅ Habilitado
   - **Client ID**: cole o Client ID do Google
   - **Client Secret**: cole o Client Secret do Google
   - **Skip nonce check**: ⬜ Desabilitado (mais seguro)
5. Clique em **Save**

### 2.3 Testar Google Login

1. Acesse http://localhost:5173/login
2. Clique em **Continue with Google**
3. Selecione sua conta Google
4. Autorize o acesso
5. Você deve ser redirecionado para `/auth/callback` e então para a página principal

**Troubleshooting:**
- Se der erro "redirect_uri_mismatch", verifique se a URI no Google Console está exatamente igual à URI do Supabase
- Se der erro "access_denied", verifique se seu email está nos test users (modo testing)
- Para publicar o app (sair do modo testing), volte ao OAuth consent screen e clique em "Publish App"

---

## 📘 Fase 3: Configurar Facebook OAuth

### 3.1 Criar Facebook App

1. Acesse [Facebook for Developers](https://developers.facebook.com)
2. Clique em **My Apps** → **Create App**
3. Selecione tipo: **Consumer** ou **Business** (recomendado: Consumer)
4. Preencha:
   - App Display Name: **Allowance Tracker**
   - App Contact Email: seu email
   - Clique em **Create App**

### 3.2 Adicionar Facebook Login

1. No dashboard do app, clique em **Add Product**
2. Localize **Facebook Login** e clique em **Set Up**
3. Escolha **Web** como plataforma
4. Configure:
   - Site URL: `http://localhost:5173`
   - Clique em **Save** e **Continue**

### 3.3 Configurar OAuth Redirect URIs

1. No menu lateral, vá para **Facebook Login** → **Settings**
2. Em **Valid OAuth Redirect URIs**, adicione:
   ```
   https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
   ```
3. Em **Allowed Domains for the JavaScript SDK**, adicione:
   ```
   localhost
   szjjenczowoatabwcvjj.supabase.co
   ```
4. Clique em **Save Changes**

### 3.4 Obter App ID e App Secret

1. No menu lateral, vá para **Settings** → **Basic**
2. **Copie o App ID**
3. Clique em **Show** no App Secret e copie (você vai precisar)

### 3.5 Configurar Facebook Provider no Supabase

1. Acesse Supabase Dashboard
2. Vá para **Authentication** → **Providers**
3. Localize **Facebook** e clique para expandir
4. Configure:
   - **Enable Facebook provider**: ✅ Habilitado
   - **Facebook client ID**: cole o App ID
   - **Facebook secret**: cole o App Secret
5. Clique em **Save**

### 3.6 Publicar Facebook App

⚠️ **IMPORTANTE:** Enquanto o app estiver em modo Development, apenas você e test users poderão fazer login.

Para publicar:
1. No menu lateral, vá para **App Review** → **Permissions and Features**
2. Solicite permissões necessárias (para login básico, não precisa de review)
3. Vá para **Settings** → **Basic**
4. Preencha:
   - Privacy Policy URL (obrigatório)
   - Terms of Service URL (opcional)
   - App Icon (1024x1024 px)
   - Category (escolha apropriada)
5. No topo da página, mude o toggle de **Development** para **Live**

**Modo Development (para testes):**
- Adicione test users em **Roles** → **Test Users**
- Ou use sua própria conta (que já é admin)

### 3.7 Testar Facebook Login

1. Acesse http://localhost:5173/login
2. Clique em **Continue with Facebook**
3. Faça login no Facebook (se necessário)
4. Autorize o acesso
5. Você deve ser redirecionado para a aplicação

**Troubleshooting:**
- Se der erro "URL Blocked", verifique as Valid OAuth Redirect URIs
- Se der erro "App Not Set Up", verifique se Facebook Login foi adicionado
- Se só você consegue logar, o app está em modo Development (esperado para testes)

---

## 🚀 Fase 4: Configuração de Produção

### 4.1 Atualizar URLs no Supabase

Quando fizer deploy para produção (ex: Vercel):

1. **Authentication** → **URL Configuration**
2. Adicione:
   ```
   Site URL: https://seu-dominio.com
   
   Redirect URLs:
   - https://seu-dominio.com/auth/callback
   - https://seu-dominio.com/**
   ```

### 4.2 Atualizar Google OAuth

1. No Google Cloud Console
2. Vá para o OAuth client ID criado
3. Adicione em **Authorized JavaScript origins**:
   ```
   https://seu-dominio.com
   ```
4. A redirect URI do Supabase continua a mesma
5. Clique em **Save**

### 4.3 Atualizar Facebook OAuth

1. No Facebook App
2. Vá para **Facebook Login** → **Settings**
3. Adicione em **Valid OAuth Redirect URIs**:
   ```
   (a URI do Supabase continua a mesma)
   ```
4. Adicione em **Allowed Domains**:
   ```
   seu-dominio.com
   ```
5. Atualize **Site URL** para: `https://seu-dominio.com`
6. Clique em **Save Changes**

### 4.4 Configurar Variáveis de Ambiente no Host

No Vercel (ou outro):

```bash
VITE_SUPABASE_URL=https://szjjenczowoatabwcvjj.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
VITE_APP_URL=https://seu-dominio.com
```

---

## ✅ Checklist Final

### Email Authentication
- [ ] Provider habilitado no Supabase
- [ ] Confirm email habilitado
- [ ] URLs de redirect configuradas
- [ ] Templates de email customizados (opcional)
- [ ] Testado signup + confirmation + login

### Google OAuth
- [ ] OAuth Client ID criado no Google Cloud
- [ ] Redirect URIs configuradas no Google
- [ ] Client ID e Secret adicionados no Supabase
- [ ] Testado login com Google

### Facebook OAuth
- [ ] Facebook App criado
- [ ] Facebook Login configurado
- [ ] Redirect URIs configuradas no Facebook
- [ ] App ID e Secret adicionados no Supabase
- [ ] App publicado (ou test users configurados)
- [ ] Testado login com Facebook

### Produção
- [ ] URLs de produção adicionadas no Supabase
- [ ] Google OAuth atualizado com domínio de produção
- [ ] Facebook OAuth atualizado com domínio de produção
- [ ] Variáveis de ambiente configuradas no host
- [ ] Testado em produção

---

## 📚 Recursos

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Facebook Login Docs](https://developers.facebook.com/docs/facebook-login/web)
- [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs no Supabase: **Authentication** → **Logs**
2. Verifique o console do navegador para erros JavaScript
3. Confirme que todas as URLs estão corretas (sem barras extras, http vs https)
4. Para Google/Facebook, verifique que o app está aprovado/publicado
