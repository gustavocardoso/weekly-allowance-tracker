# 🔴 Resolver: Error 400 - redirect_uri_mismatch (Google OAuth)

## ❌ Erro Recebido

```
Access blocked: This app's request is invalid
Error 400: redirect_uri_mismatch
```

**Causa**: A URL de redirect que o Supabase está tentando usar não está autorizada no Google Cloud Console.

---

## ✅ Solução em 3 Passos (5 minutos)

### **PASSO 1: Descobrir a URL Exata que o Supabase Usa**

A URL de redirect do Supabase é sempre:
```
https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```

**⚠️ IMPORTANTE**: 
- Deve terminar com `/auth/v1/callback` (não `/auth/callback`)
- Deve ser EXATAMENTE essa URL (case-sensitive)

---

### **PASSO 2: Ver o Erro Detalhado (Opcional)**

Na tela de erro que você viu, deve haver:
```
Request Details
redirect_uri=https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```

Copie essa URL exata para usar no próximo passo.

---

### **PASSO 3: Adicionar no Google Cloud Console**

#### **3.1 - Acesse o Google Cloud Console**

```
https://console.cloud.google.com/apis/credentials
```

#### **3.2 - Encontre suas Credenciais OAuth**

1. Na lista, procure por "OAuth 2.0 Client IDs"
2. Clique no nome da credencial que você criou (ou crie uma nova se não existe)

#### **3.3 - Adicione as URLs**

**Na seção "Authorized JavaScript origins":**
```
https://szjjenczowoatabwcvjj.supabase.co
```

**Na seção "Authorized redirect URIs":**
```
https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```

⚠️ **ATENÇÃO**: 
- `/auth/v1/callback` (com o `/v1/`)
- Não adicione `/` no final
- Case-sensitive (mantenha minúsculas)

#### **3.4 - Se estiver testando localmente também, adicione:**

**Authorized JavaScript origins:**
```
http://localhost:5173
http://localhost:5182
```

**Authorized redirect URIs:**
```
http://localhost:5173/auth/callback
http://localhost:5182/auth/callback
https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```

#### **3.5 - Salvar**

1. Clique em **Save** no final da página
2. Aguarde alguns segundos para propagação

---

## 🔍 Verificar Configuração Atual

### **No Google Cloud Console:**

1. Vá em: https://console.cloud.google.com/apis/credentials
2. Clique na sua credencial OAuth
3. Verifique se tem EXATAMENTE:

```
Authorized redirect URIs:
  https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback ✅
```

### **No Supabase Dashboard:**

1. Vá em: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers
2. Clique em **Google**
3. Verifique:
   - ✅ Enable Sign in with Google: ON
   - ✅ Client ID: Preenchido
   - ✅ Client Secret: Preenchido
4. Copie a "Callback URL" que aparece ali

---

## 🧪 Testar Novamente

Após salvar no Google Cloud Console:

1. **Aguarde 30-60 segundos** (propagação das mudanças)
2. **Feche todas as abas** do seu app
3. **Abra em janela anônima** (Ctrl+Shift+N)
4. **Tente login com Google novamente**

---

## 📸 Checklist Visual

### **Google Cloud Console deve ter:**

```
Client ID for Web application

Name: Weekly Allowance Tracker (ou outro nome)

Authorized JavaScript origins:
  1. https://szjjenczowoatabwcvjj.supabase.co
  2. http://localhost:5173 (opcional, para dev local)
  3. http://localhost:5182 (opcional, para dev local)

Authorized redirect URIs:
  1. https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback ✅
  2. http://localhost:5173/auth/callback (opcional)
  3. http://localhost:5182/auth/callback (opcional)
```

---

## 🐛 Troubleshooting

### **Erro persiste após adicionar URL**

**Problema**: Cache do Google
**Solução**: 
1. Aguarde 2-3 minutos
2. Limpe cookies do Google: 
   - Chrome: F12 → Application → Cookies → accounts.google.com → Clear
3. Tente em janela anônima

### **Não consigo encontrar as credenciais**

**Solução**: Crie novas
1. Google Cloud Console → APIs & Services → Credentials
2. **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Web application**
4. Adicione as URLs conforme acima
5. Copie Client ID e Client Secret
6. Cole no Supabase: Authentication → Providers → Google

### **URL aparece diferente no erro**

**Exemplo de erro**:
```
redirect_uri=https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback?code=...
```

**Use apenas a parte base**:
```
https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```
(sem os parâmetros `?code=...`)

### **Tenho múltiplos projetos Google Cloud**

**Problema**: Credencial no projeto errado
**Solução**:
1. Verifique qual projeto está selecionado (canto superior)
2. Troque para o projeto correto
3. Verifique/crie credenciais nesse projeto

---

## 📝 Configuração Completa Passo-a-Passo

### **1. Google Cloud Console**

```
URL: https://console.cloud.google.com/apis/credentials

Ações:
1. Criar projeto (se não existe)
2. Habilitar Google+ API
3. Criar OAuth 2.0 Client ID
4. Tipo: Web application
5. JavaScript origins: https://szjjenczowoatabwcvjj.supabase.co
6. Redirect URIs: https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
7. Save
8. Copiar Client ID
9. Copiar Client Secret
```

### **2. Supabase Dashboard**

```
URL: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers

Ações:
1. Scroll até "Google"
2. Expandir
3. Enable Sign in with Google: ON
4. Client ID: colar
5. Client Secret: colar
6. Save
```

### **3. Testar**

```
1. Abrir app em janela anônima
2. Clicar "Continue with Google"
3. Selecionar conta
4. Aceitar permissões
5. Deve redirecionar para app logado ✅
```

---

## ✅ Resultado Esperado

Após configurar corretamente:

1. ✅ Clicar "Continue with Google"
2. ✅ Popup/redirect para tela do Google
3. ✅ Escolher conta
4. ✅ "Quer dar permissão para este app?"
5. ✅ Aceitar
6. ✅ Redirect de volta para app
7. ✅ Login bem-sucedido
8. ✅ Ver SyncDialog (se tiver dados locais)
9. ✅ Ver badge "Cloud" no header

---

## 🔗 Links Rápidos

**Google Cloud Console (Credentials):**
```
https://console.cloud.google.com/apis/credentials
```

**Supabase Auth Providers:**
```
https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers
```

**Guia Completo:**
```
docs/QUICK_OAUTH_SETUP.md
```

**Guia Interativo:**
```bash
node scripts/setup-guide.mjs
```

---

## 📞 Ainda com Problemas?

Se após seguir todos os passos ainda receber o erro:

**Compartilhe**:
1. Screenshot da configuração no Google Cloud (Authorized redirect URIs)
2. Screenshot da configuração no Supabase (Google provider)
3. URL exata do erro que aparece

**Ou tente**:
- Desabilitar e reabilitar o Google provider no Supabase
- Criar novo OAuth Client ID no Google Cloud
- Verificar se não há typo nas URLs

---

**Tempo estimado**: 5 minutos para configurar  
**Causa #1**: Falta adicionar URL no Google Cloud Console  
**Solução**: Adicionar `https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback`
