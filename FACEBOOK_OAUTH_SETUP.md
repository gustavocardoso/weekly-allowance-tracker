# 🔵 Como Configurar Login com Facebook

## 🎯 Problema

Ao tentar login com Facebook, recebe mensagem de "app inválida".

**Causa**: Você precisa criar um Facebook App e configurar as credenciais no Supabase.

---

## 📋 Passo a Passo Completo

### **PARTE 1: Criar Facebook App (Meta Developers)**

#### **PASSO 1: Acessar Meta for Developers**

1. Acesse: https://developers.facebook.com/
2. Faça login com sua conta Facebook
3. Clique em **My Apps** (canto superior direito)
4. Clique no botão verde **Create App**

---

#### **PASSO 2: Escolher Tipo de App**

Na tela "What do you want your app to do?":

1. Selecione: **Consumer** (ou "Allow people to log in with their Facebook account")
2. Clique **Next**

---

#### **PASSO 3: Fornecer Informações Básicas**

Preencha os campos:

- **App name**: `Weekly Allowance Tracker` (ou o nome que preferir)
- **App contact email**: Seu email
- **Business Account**: (opcional) Deixe em branco se não tiver

Clique **Create App**

---

#### **PASSO 4: Verificação de Segurança**

Complete o captcha/verificação de segurança se solicitado.

---

#### **PASSO 5: Dashboard do App**

Você será redirecionado para o dashboard do seu novo app.

**Copie estas informações (precisará delas)**:
- **App ID**: Número na parte superior (ex: 123456789012345)
- **App Secret**: Clique em "Show" ao lado de "App Secret" e copie

⚠️ **IMPORTANTE**: Guarde o App Secret em local seguro!

---

### **PARTE 2: Configurar Facebook Login**

#### **PASSO 6: Adicionar Facebook Login**

1. No dashboard do app, na seção **Add a Product**
2. Encontre **Facebook Login**
3. Clique no botão **Set Up** (ou **Configure**)

---

#### **PASSO 7: Escolher Plataforma**

1. Selecione **Web** (ícone de navegador)
2. No campo "Site URL", deixe em branco por enquanto
3. Clique **Save** e **Continue**

---

#### **PASSO 8: Configurar Valid OAuth Redirect URIs**

1. No menu lateral esquerdo: **Facebook Login** → **Settings**

2. No campo **Valid OAuth Redirect URIs**, adicione:
   ```
   https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
   ```

3. Role para baixo e clique **Save Changes**

---

### **PARTE 3: Configurar Domínios do App**

#### **PASSO 9: App Domains**

1. No menu lateral esquerdo: **Settings** → **Basic**

2. Role até encontrar **App Domains**

3. Adicione estes domínios (um por linha):
   ```
   szjjenczowoatabwcvjj.supabase.co
   seu-app.vercel.app
   ```
   (Substitua `seu-app.vercel.app` pela sua URL real da Vercel)

4. Clique **Save Changes** no final da página

---

### **PARTE 4: Adicionar URLs de Privacidade e Termos**

#### **PASSO 10: Policy URLs (Obrigatório)**

Ainda em **Settings** → **Basic**:

1. **Privacy Policy URL**: 
   ```
   https://seu-app.vercel.app/privacy
   ```

2. **Terms of Service URL**: 
   ```
   https://seu-app.vercel.app/terms
   ```

3. **User Data Deletion Instructions URL**:
   ```
   https://seu-app.vercel.app/data-deletion
   ```

⚠️ **Nota**: Você precisará criar estas páginas no seu app. Por enquanto, pode usar a URL da home: `https://seu-app.vercel.app`

4. Clique **Save Changes**

---

### **PARTE 5: Configurar no Supabase**

#### **PASSO 11: Adicionar Credenciais no Supabase**

1. Acesse: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers

2. Na lista de providers, encontre **Facebook**

3. Clique para expandir

4. **Enable Facebook provider**: Marque como ✅ Enabled

5. Preencha:
   - **Facebook client ID**: Cole o **App ID** do Facebook
   - **Facebook client secret**: Cole o **App Secret** do Facebook

6. **Authorize redirect URL** (já deve estar preenchido):
   ```
   https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
   ```

7. Clique **Save**

---

### **PARTE 6: Colocar App em Produção (Modo Público)**

#### **PASSO 12: App Review (Modo Live)**

⚠️ **IMPORTANTE**: Por padrão, o app está em "Development Mode" e só você pode testar!

**Para usar em produção**:

1. No dashboard do Facebook App
2. No topo da página, você verá um toggle: **Development** / **Live**
3. Clique no toggle para mudar para **Live**
4. Confirme a mudança

**Ou siga este processo**:

1. Menu lateral: **App Review** → **Permissions and Features**

2. Encontre: **public_profile** e **email**
   - Ambos devem estar com status "Approved" (verde)
   - Se não estiverem, são aprovados automaticamente para uso básico

3. Menu superior: Clique no botão toggle de **Development** para **Live**

---

### **PARTE 7: Testar o Login**

#### **PASSO 13: Teste em Desenvolvimento**

Mesmo em Development Mode, você pode testar:

1. Vá para seu app: `https://seu-app.vercel.app/login`
2. Clique em **Continue with Facebook**
3. Faça login com sua conta Facebook (a que criou o app)
4. Autorize o app
5. Deve redirecionar e logar com sucesso ✅

---

#### **PASSO 14: Adicionar Usuários de Teste (Opcional)**

Se quiser que outras pessoas testem ANTES de colocar em Live:

1. Menu lateral: **Roles** → **Test Users**
2. Clique **Add**
3. Adicione emails dos testadores
4. Eles receberão convite para testar o app

---

## 📸 Resumo Visual

### **Informações Necessárias**:

```
Facebook:
  App ID: 123456789012345 (exemplo)
  App Secret: abc123def456ghi789 (exemplo)
  
Supabase:
  Callback URL: https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
```

### **URLs para Configurar no Facebook**:

```
Valid OAuth Redirect URIs:
  https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback

App Domains:
  szjjenczowoatabwcvjj.supabase.co
  seu-app.vercel.app

Privacy Policy URL:
  https://seu-app.vercel.app/privacy

Terms of Service URL:
  https://seu-app.vercel.app/terms
```

---

## 🔍 Troubleshooting

### **Erro: "App Not Setup"**

**Causa**: App ainda em Development Mode ou Facebook Login não configurado

**Solução**:
1. Verifique se adicionou o produto "Facebook Login"
2. Configure Valid OAuth Redirect URIs
3. Coloque app em Live Mode (se quiser uso público)

---

### **Erro: "Redirect URI Mismatch"**

**Causa**: URL de callback incorreta

**Solução**:
1. Facebook App → Facebook Login → Settings
2. Valid OAuth Redirect URIs deve ter EXATAMENTE:
   ```
   https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback
   ```
3. Sem espaços, sem barra extra no final
4. Save Changes

---

### **Erro: "URL Blocked"**

**Causa**: Domínio não está em App Domains

**Solução**:
1. Settings → Basic → App Domains
2. Adicione: `szjjenczowoatabwcvjj.supabase.co`
3. Save Changes

---

### **Erro: "Missing Privacy Policy"**

**Causa**: URLs de privacidade obrigatórias não configuradas

**Solução**:
1. Settings → Basic
2. Adicione Privacy Policy URL, Terms URL, Data Deletion URL
3. Temporariamente, pode usar a URL da home do seu app
4. Depois, crie páginas reais de privacidade

---

### **Só Você Consegue Logar**

**Causa**: App em Development Mode

**Solução**:
- **Opção 1**: Mude para Live Mode (botão toggle no topo)
- **Opção 2**: Adicione usuários de teste (Roles → Test Users)

---

## 📋 Checklist

- [ ] Criei Facebook App em developers.facebook.com
- [ ] Copiei App ID e App Secret
- [ ] Adicionei produto "Facebook Login"
- [ ] Configurei Valid OAuth Redirect URIs (callback do Supabase)
- [ ] Configurei App Domains (Supabase e Vercel)
- [ ] Configurei URLs de Privacy Policy e Terms
- [ ] Adicionei credenciais no Supabase (providers)
- [ ] Habilitei Facebook provider no Supabase
- [ ] Salvei as configurações
- [ ] (Opcional) Mudei app para Live Mode
- [ ] Testei login com Facebook

---

## 🎯 Resultado Final

Após configurar:

- ✅ Botão "Continue with Facebook" funciona
- ✅ Redireciona para autorização do Facebook
- ✅ Após autorizar, retorna para o app logado
- ✅ Dados do perfil (nome, email, foto) carregam
- ✅ Badge "Cloud" aparece no header

---

## 📄 Criar Páginas de Privacidade (Opcional)

Para colocar o app em produção (Live Mode), Facebook exige estas páginas:

### **Criar `/privacy` - Privacy Policy**

Página explicando:
- Quais dados você coleta (nome, email, foto)
- Como usa os dados (autenticação, perfil do usuário)
- Como protege os dados (criptografia, Supabase RLS)
- Como usuário pode deletar dados (botão de deletar conta)

### **Criar `/terms` - Terms of Service**

Página com:
- Termos de uso do app
- Responsabilidades do usuário
- Limitações de responsabilidade

### **Criar `/data-deletion` - Data Deletion Instructions**

Página explicando:
- Como usuário pode deletar sua conta
- O que acontece com os dados após deletar
- Instruções passo a passo

**Exemplo simples**:
```markdown
# Data Deletion

To delete your account and all associated data:

1. Go to Settings
2. Click "Delete Account"
3. Confirm deletion

All your data will be permanently deleted within 30 days.
```

---

## 🔗 Links Úteis

- **Meta for Developers**: https://developers.facebook.com/
- **Facebook App Dashboard**: https://developers.facebook.com/apps/
- **Supabase Auth Providers**: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers
- **Facebook Login Documentation**: https://developers.facebook.com/docs/facebook-login/web

---

## 📞 Ainda com Problema?

Se após seguir todos os passos o erro persistir:

**Compartilhe**:
1. Qual erro exato aparece?
2. Screenshot da configuração Facebook Login → Settings
3. Screenshot dos App Domains
4. O app está em Development ou Live Mode?

---

## ⚡ Resumo Rápido (5 minutos)

```
1. https://developers.facebook.com/ → Create App

2. Tipo: Consumer → Nome: Weekly Allowance Tracker

3. Copie: App ID e App Secret

4. Add Product → Facebook Login → Web

5. Facebook Login → Settings → Valid OAuth Redirect URIs:
   https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback

6. Settings → Basic → App Domains:
   szjjenczowoatabwcvjj.supabase.co
   seu-app.vercel.app

7. Privacy Policy URL: https://seu-app.vercel.app

8. Supabase → Auth → Providers → Facebook:
   - Enable ✅
   - Client ID: (App ID do Facebook)
   - Client Secret: (App Secret do Facebook)
   - Save

9. Teste: seu-app.vercel.app/login → Continue with Facebook

10. (Opcional) Toggle: Development → Live
```

✅ Deve funcionar!
