# 🚀 Como Testar a Aplicação - Guia Rápido

## ✅ Status Atual
- App rodando em: **http://localhost:5182**
- Build: ✅ Passing
- Supabase: ✅ Tabelas criadas, RLS ativo

---

## 🎯 PASSO 1: Habilite Email Auth (2 minutos)

### Acesse o Supabase Dashboard:
```
https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers
```

### Configure:
1. Procure por **Email** na lista
2. Clique para expandir
3. **Enable Email provider**: ✅ Ative
4. **Confirm email**: ❌ Desative (para testes rápidos)
5. Clique em **Save**

✅ **Pronto! Email auth configurado**

---

## 🧪 PASSO 2: Teste a Aplicação (5 minutos)

### 2.1 - Criar Nova Conta

1. Abra: **http://localhost:5182/login**
2. Clique em **Criar Conta** (ou "Create Account")
3. Preencha:
   - Nome: Seu nome
   - Email: seu-email@example.com
   - Senha: teste123456
4. Clique em **Criar Conta**

✅ Você deve ser redirecionado para o dashboard

### 2.2 - Verificar Storage Mode

No header da aplicação, você deve ver um badge:
- 🟢 **Cloud** - Conectado ao Supabase
- 🔴 **Local** - Usando SQLite local

Se você criou a conta, deve mostrar **Cloud**.

### 2.3 - Testar Funcionalidades

**Dashboard:**
- http://localhost:5182/
- Deve mostrar cards de resumo
- Loading skeletons devem aparecer ao carregar

**Situações:**
- http://localhost:5182/situations
- Crie uma recompensa (reward)
- Crie uma penalidade (penalty)

**Novo Ciclo:**
- http://localhost:5182/cycles/new
- Crie um novo ciclo
- Adicione entradas

**Histórico:**
- http://localhost:5182/history
- Veja os ciclos criados

### 2.4 - Testar Reset de Senha

1. Faça logout
2. Na tela de login, clique em **Esqueceu a senha?**
3. Digite seu email
4. Clique em **Enviar Link**
5. Verifique seu email
6. Clique no link de reset
7. Crie uma nova senha

### 2.5 - Testar Sync (Offline → Online)

**Cenário 1: Criar dados offline e fazer sync**

1. Abra o DevTools (F12)
2. Vá na aba **Application** → **IndexedDB**
3. Limpe o storage (para simular app novo)
4. Desconecte a internet (ou use DevTools → Network → Offline)
5. Use o app normalmente (deve mostrar **Local**)
6. Crie algumas situações e ciclos
7. Reconecte a internet
8. Faça login com email/senha
9. Deve aparecer um **SyncDialog** perguntando:
   - Sincronizar dados locais para a nuvem
   - Começar do zero
   - Manter apenas local

Escolha **Sincronizar** e veja o progresso!

---

## 🔵 PASSO 3 (Opcional): Configure Google OAuth (5 min)

### URLs prontas para você:
Ver arquivo: **`docs/OAUTH_URLS_READY.md`**

### Google Cloud Console:
1. https://console.cloud.google.com/apis/credentials
2. Crie OAuth Client ID
3. Adicione as URLs de redirect
4. Copie Client ID e Secret
5. Cole no Supabase Dashboard

### Depois:
- O botão **Continue with Google** funcionará
- Você será redirecionado para autorização do Google
- Após autorizar, voltará para o app logado

---

## 🔵 PASSO 4 (Opcional): Configure Facebook OAuth (5 min)

### URLs prontas para você:
Ver arquivo: **`docs/OAUTH_URLS_READY.md`**

### Facebook Developers:
1. https://developers.facebook.com/apps/
2. Crie um app
3. Configure Facebook Login
4. Adicione as URLs de redirect
5. **IMPORTANTE**: Mude para modo **Live**
6. Copie App ID e Secret
7. Cole no Supabase Dashboard

### Depois:
- O botão **Continue with Facebook** funcionará

---

## 🐛 Troubleshooting

### "Unsupported provider: provider is not enabled"
✅ Habilite o provider no Supabase Dashboard (Passo 1)

### "Invalid login credentials"
- Verifique se a senha tem pelo menos 6 caracteres
- Certifique-se que o email está correto

### "Network error"
- Verifique se o Supabase está acessível
- Rode: `node scripts/check-supabase.mjs`

### Dados não aparecem após login
- Verifique se escolheu "Sincronizar" no SyncDialog
- Abra o DevTools Console para ver possíveis erros

### Botões Google/Facebook não funcionam
- Verifique se os providers estão habilitados no Supabase
- Verifique se configurou os OAuth apps corretamente
- Veja: `docs/OAUTH_URLS_READY.md`

---

## 📊 Verificar Dados no Supabase

### Table Editor:
```
https://app.supabase.com/project/szjjenczowoatabwcvjj/editor
```

Você deve ver tabelas:
- `profiles` - Perfil do usuário
- `situations` - Recompensas e penalidades
- `cycles` - Ciclos semanais
- `entries` - Entradas em cada ciclo

Cada linha deve ter `user_id` correspondente ao seu usuário (RLS garante isolamento).

---

## ✅ Checklist de Testes

### Autenticação
- [ ] Criar conta com email/senha
- [ ] Fazer login
- [ ] Fazer logout
- [ ] Reset de senha
- [ ] Login com Google (se configurou)
- [ ] Login com Facebook (se configurou)

### Funcionalidades
- [ ] Criar situação (reward)
- [ ] Criar situação (penalty)
- [ ] Criar novo ciclo
- [ ] Adicionar entradas ao ciclo
- [ ] Ver histórico
- [ ] Ver estatísticas
- [ ] Editar situação
- [ ] Deletar situação

### Storage & Sync
- [ ] Indicador mostra "Cloud" quando logado
- [ ] Indicador mostra "Local" quando deslogado
- [ ] Sync dialog aparece ao logar com dados locais
- [ ] Dados sincronizam corretamente
- [ ] App funciona offline

### UI/UX
- [ ] Loading skeletons aparecem ao carregar
- [ ] Mensagens de erro em português
- [ ] Password strength indicator funciona
- [ ] Navegação entre páginas funciona
- [ ] Responsive design funciona

---

## 🎉 Tudo Funcionando?

**Parabéns!** Seu sistema de autenticação híbrido está completo e funcionando!

### Próximos passos:
1. Deploy para produção (Vercel/Netlify)
2. Configure URLs de produção nos OAuth apps
3. Convide usuários para testar
4. Monitore erros no Supabase Dashboard

---

## 📚 Documentação Adicional

- `docs/OAUTH_URLS_READY.md` - URLs prontas para OAuth
- `docs/QUICK_OAUTH_SETUP.md` - Guia passo-a-passo OAuth
- `docs/SUPABASE_SETUP_GUIDE.md` - Guia completo
- `docs/PROGRESS_REPORT.md` - Relatório de progresso

---

**App URL**: http://localhost:5182/login
**Tempo estimado**: 15-20 minutos para completar todos os testes
