# 🔧 Como Desabilitar Confirmação de Email no Supabase

## ⚠️ Problema

Você recebe erro 401 ao criar conta:
```
GET https://szjjenczowoatabwcvjj.supabase.co/auth/v1/user 401 (Unauthorized)
```

**Causa**: Supabase está configurado para exigir confirmação de email, mas você não configurou um provedor de email e não pode confirmar.

---

## ✅ Solução: Desabilitar Confirmação de Email

### **Passo 1: Acesse as Configurações de Email**

1. Vá para: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/email-templates

2. Ou navegue manualmente:
   - Dashboard do Supabase
   - Seu projeto: `szjjenczowoatabwcvjj`
   - Menu lateral: **Authentication**
   - Submenu: **Email Templates**

---

### **Passo 2: Desabilite a Confirmação**

Na página **Email Templates**, você verá a opção:

```
✅ Enable email confirmations
```

**Desmarque esta opção** ❌

---

### **Passo 3: Salve as Alterações**

Clique em **Save** no canto inferior direito.

---

### **Passo 4: Teste Criar Conta Novamente**

1. Vá para: http://localhost:5182/login
2. Clique em **Create Account**
3. Preencha:
   - Email: teste@example.com
   - Password: teste123
4. Clique em **Create Account**

**Resultado esperado**: ✅ Conta criada e logada imediatamente!

---

## 🔍 Alternativa: Verificar Status Atual

### **Via Supabase Dashboard**

1. Acesse: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/users

2. Veja os usuários criados:
   - **Email confirmed**: ✅ Pode fazer login
   - **Email not confirmed**: ❌ Não pode fazer login (401)

3. **Você pode confirmar manualmente**:
   - Clique no usuário
   - Clique em **Confirm email**
   - Agora esse usuário pode fazer login

---

## 🎯 Configuração Recomendada para Desenvolvimento

### **Para Testes Locais (Desenvolvimento)**:

❌ **Desabilite**:
- Email confirmations
- Phone confirmations
- Secure email change (opcional)

✅ **Habilite**:
- Allow duplicate email (útil para testes)
- Auto confirm users (alternativa)

### **Para Produção**:

✅ **Habilite**:
- Email confirmations (com provider configurado)
- Email templates personalizados
- Rate limiting

---

## 📧 Configurar Provider de Email (Produção)

Se você quiser habilitar confirmação de email em produção:

### **Passo 1: Configure um Provider**

Supabase suporta:
- **SendGrid** (recomendado)
- **AWS SES**
- **Mailgun**
- **Resend**
- **Postmark**

### **Passo 2: Acesse SMTP Settings**

1. Dashboard: https://app.supabase.com/project/szjjenczowoatabwcvjj/settings/auth
2. Seção: **SMTP Settings**
3. Configure:
   - Host
   - Port
   - Username
   - Password
   - Sender email
   - Sender name

### **Passo 3: Teste o Envio**

Clique em **Send test email** para verificar.

### **Passo 4: Personalize os Templates**

1. Vá para: Email Templates
2. Edite os templates:
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

---

## 🚀 Próximos Passos

Após desabilitar confirmação de email:

1. ✅ Criar conta deve funcionar sem 401
2. ✅ Login deve funcionar imediatamente
3. ✅ Você pode testar o fluxo completo
4. ⏳ Google OAuth ainda precisa de configuração (Site URL)

---

## 🔍 Troubleshooting

### **Ainda recebo 401 após desabilitar**

**Verifique**:
1. Salvou as alterações no Supabase?
2. Aguardou 1-2 minutos (cache)?
3. Limpou os cookies do navegador? (F12 → Application → Cookies → Clear)
4. Tentou criar uma NOVA conta (com email diferente)?

**Teste com curl**:
```bash
curl -X POST 'https://szjjenczowoatabwcvjj.supabase.co/auth/v1/signup' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "teste123"
  }'
```

Se retornar `"email_confirmed_at": null`, a confirmação ainda está habilitada.

---

### **Como saber se está desabilitado?**

**Crie uma conta via API e verifique**:

```javascript
// No console do navegador (F12)
const { data, error } = await window.supabase.auth.signUp({
  email: 'teste2@example.com',
  password: 'teste123'
});

console.log('User:', data.user);
console.log('Session:', data.session);

// Se session não for null, está desabilitado ✅
// Se session for null, ainda está habilitado ❌
```

---

## ⚡ Solução Rápida (30 segundos)

```
1. https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/email-templates
2. Desmarque "Enable email confirmations"
3. Clique "Save"
4. Aguarde 1 minuto
5. Tente criar conta novamente
```

---

## 📞 Suporte

Se após desabilitar o erro persistir, compartilhe:

1. Screenshot da página Email Templates (mostrando que está desmarcado)
2. Resultado do teste com curl ou console
3. Email que está tentando usar
4. Se o usuário aparece no Dashboard → Authentication → Users
