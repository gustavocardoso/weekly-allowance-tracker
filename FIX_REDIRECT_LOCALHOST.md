# 🔧 Corrigir Redirect para localhost:3000 após OAuth

## ❌ Problema

Após fazer login com Google, você é redirecionado para:
```
http://localhost:3000/#access_token=...
```

Ao invés da URL correta da sua aplicação.

## ✅ Causa

A **Site URL** no Supabase está configurada como `http://localhost:3000` (configuração padrão).

## 🔧 Solução (2 minutos)

### **Passo 1: Descobrir a URL da Sua Aplicação**

Você está testando em:
- **Produção (Vercel)**: `https://SEU-APP.vercel.app`
- **Local**: `http://localhost:5182`

**Qual está usando agora?** Se está testando na Vercel, use a URL da Vercel.

---

### **Passo 2: Configurar Site URL no Supabase**

1. **Acesse**: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/url-configuration

2. **Na seção "Site URL"**, altere de:
   ```
   http://localhost:3000
   ```
   
   Para a URL correta:
   
   **Se testando na Vercel**:
   ```
   https://SEU-APP.vercel.app
   ```
   
   **Se testando localmente**:
   ```
   http://localhost:5182
   ```

3. **Clique em Save**

---

### **Passo 3: Adicionar Redirect URLs**

Na mesma página, na seção **"Redirect URLs"**, adicione:

**Para Vercel (produção)**:
```
https://SEU-APP.vercel.app/**
https://SEU-APP.vercel.app/auth/callback
```

**Para desenvolvimento local**:
```
http://localhost:5182/**
http://localhost:5182/auth/callback
http://localhost:5173/**
http://localhost:5173/auth/callback
```

**Formato**:
```
Uma URL por linha, assim:

https://weekly-allowance-tracker.vercel.app/**
https://weekly-allowance-tracker.vercel.app/auth/callback
http://localhost:5182/**
http://localhost:5182/auth/callback
```

Clique em **Save**

---

## 🧪 Testar Novamente

1. **Abra janela anônima** (Ctrl+Shift+N)
2. **Acesse sua aplicação** na URL correta
3. **Clique em "Continue with Google"**
4. **Selecione sua conta**
5. **Deve redirecionar corretamente agora!** ✅

---

## 📋 Checklist

### **Antes**:
- ❌ Site URL: `http://localhost:3000`
- ❌ Redirect após OAuth: `http://localhost:3000/#access_token=...`

### **Depois**:
- ✅ Site URL: `https://seu-app.vercel.app` (ou localhost:5182)
- ✅ Redirect após OAuth: Para sua aplicação corretamente
- ✅ Ver SyncDialog (se tiver dados locais)
- ✅ Ver badge "Cloud" no header
- ✅ Login completo funcionando

---

## 🔍 Configuração Recomendada

Se você quer que funcione **tanto em produção quanto localmente**:

### **Site URL** (principal):
```
https://seu-app.vercel.app
```

### **Redirect URLs** (todas permitidas):
```
https://seu-app.vercel.app/**
https://seu-app.vercel.app/auth/callback
http://localhost:5182/**
http://localhost:5182/auth/callback
http://localhost:5173/**
http://localhost:5173/auth/callback
```

Assim funciona em qualquer ambiente!

---

## 🐛 Troubleshooting

### **Ainda redireciona para localhost:3000**

**Causa**: Cache do navegador ou sessão ativa

**Solução**:
1. Limpe cookies do Supabase:
   - F12 → Application → Cookies
   - Delete cookies de `.supabase.co`
2. Feche todas as abas
3. Abra janela anônima
4. Tente novamente

### **Erro "Invalid redirect URL"**

**Causa**: URL não está na lista de Redirect URLs

**Solução**:
1. Verifique se adicionou a URL exata em Redirect URLs
2. Formato deve ser: `https://seu-app.vercel.app/**`
3. Não esqueça o `/**` no final

### **Múltiplos ambientes**

**Problema**: Trabalha em dev local e produção

**Solução**: Adicione TODAS as URLs nas Redirect URLs:
- Produção: `https://seu-app.vercel.app/**`
- Local: `http://localhost:5182/**`
- Ambas funcionarão simultaneamente

---

## 📸 Screenshot Guia

### **URL Configuration Page deve ter**:

```
Site URL:
https://seu-app.vercel.app

Redirect URLs:
https://seu-app.vercel.app/**
https://seu-app.vercel.app/auth/callback
http://localhost:5182/**
http://localhost:5182/auth/callback
```

---

## ✅ Após Corrigir

**Fluxo completo funcionando**:

1. Usuário clica "Continue with Google"
2. Popup do Google → Escolhe conta
3. Aceita permissões
4. Redireciona para: `https://seu-app.vercel.app/#access_token=...`
5. App processa o token
6. Mostra SyncDialog (se tiver dados locais)
7. Usuário vê dashboard com badge "Cloud"
8. Login completo! ✅

---

## 🔗 Links Rápidos

**Supabase URL Configuration**:
```
https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/url-configuration
```

**Supabase Auth Providers**:
```
https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers
```

---

## 📝 Notas Importantes

### **Site URL vs Redirect URLs**

**Site URL**:
- URL principal da aplicação
- Usada como fallback
- Apenas UMA URL

**Redirect URLs**:
- Lista de URLs permitidas para redirect
- Pode ter MÚLTIPLAS URLs
- Wildcard `**` permite sub-rotas

### **Formato Correto**

✅ Correto:
```
https://seu-app.vercel.app
https://seu-app.vercel.app/**
http://localhost:5182
```

❌ Incorreto:
```
https://seu-app.vercel.app/    (com / no final)
http://localhost:5182/         (com / no final)
seu-app.vercel.app             (sem https://)
```

---

## 🎉 Resultado Final

Após configurar corretamente:

✅ **Google OAuth funcionando perfeitamente**  
✅ **Redirect para URL correta**  
✅ **Login completo**  
✅ **Sync de dados local → cloud**  
✅ **Sistema de autenticação operacional**  

---

**Tempo estimado**: 2 minutos  
**Link direto**: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/url-configuration
