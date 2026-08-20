# 🔍 Como Encontrar Client ID e Secret no Facebook App

## 📍 Localização: Settings → Basic

### **PASSO 1: Acessar o Dashboard do App**

1. Acesse: https://developers.facebook.com/apps/
2. Você verá uma lista dos seus apps
3. **Clique no nome do seu app** (Weekly Allowance Tracker)

---

### **PASSO 2: Ir para Settings → Basic**

No dashboard do app:

1. **Menu lateral esquerdo**: Procure por **Settings** (ícone de engrenagem ⚙️)
2. Clique em **Settings**
3. No submenu que aparece, clique em **Basic**

Ou acesse diretamente:
```
https://developers.facebook.com/apps/SEU_APP_ID/settings/basic/
```

---

### **PASSO 3: Encontrar App ID e App Secret**

Na página **Settings → Basic**, você verá:

```
┌─────────────────────────────────────────────────────────┐
│ Basic Settings                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ App ID                                                   │
│ 1234567890123456                    [Copy]              │
│ ↑                                                        │
│ ESTE É O CLIENT ID! ✅                                   │
│                                                          │
│ App Secret                                               │
│ ••••••••••••••••••••••••••••    [Show]  [Reset]        │
│ ↑                                                        │
│ CLIQUE EM "Show" PARA VER! ✅                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔑 Detalhes das Credenciais

### **App ID (Client ID)**

- **Localização**: Logo no topo da página Basic Settings
- **Formato**: Número de 15-16 dígitos (ex: `1234567890123456`)
- **Visível**: Sempre visível, não precisa clicar em nada
- **Copiar**: Botão [Copy] ao lado

**Exemplo**:
```
App ID
1234567890123456
```

---

### **App Secret (Client Secret)**

- **Localização**: Logo abaixo do App ID
- **Formato**: String alfanumérica (ex: `abc123def456ghi789jkl012mno345pqr678`)
- **Visível**: Oculto por padrão (••••••••)
- **Como ver**: Clique no botão **[Show]**
- **Verificação**: Pode pedir sua senha do Facebook
- **Copiar**: Após clicar em Show, aparece botão [Copy]

**Exemplo**:
```
App Secret
abc123def456ghi789jkl012mno345pqr678
```

---

## 🎯 Se NÃO Aparecer

### **Problema 1: Página Vazia ou Carregando**

**Solução**:
1. Atualize a página (F5 ou Cmd+R)
2. Limpe o cache do navegador
3. Tente em aba anônima
4. Tente outro navegador

---

### **Problema 2: "App Secret" Não Aparece**

**Causa**: App pode não estar completamente criado

**Solução**:
1. Verifique se o app foi criado com sucesso
2. Complete o processo de criação se ficou incompleto
3. Pode precisar adicionar um produto primeiro (Facebook Login)

---

### **Problema 3: Botão "Show" Não Funciona**

**Solução**:
1. Clique em **[Show]** ao lado de "App Secret"
2. Pode aparecer popup pedindo sua senha do Facebook
3. Digite sua senha
4. O App Secret aparecerá visível
5. Clique em **[Copy]** para copiar

---

### **Problema 4: Não Tem Menu "Settings"**

**Possíveis causas**:
- Você não é admin do app
- O app está em estado pendente
- Interface do Facebook mudou

**Solução**:
1. Verifique se você é o criador/admin do app
2. Tente o link direto: `https://developers.facebook.com/apps/`
3. Na lista de apps, clique no **nome** do app (não em um botão)
4. Deve abrir o dashboard completo

---

## 📸 Navegação Visual

### **Caminho Completo**:

```
developers.facebook.com
  └─> My Apps
      └─> [Nome do seu app]
          └─> Settings (menu lateral esquerdo)
              └─> Basic
                  └─> App ID (visível)
                  └─> App Secret (clique em "Show")
```

---

## 🔄 Caminho Alternativo

Se não encontrar no menu lateral:

1. No **topo da página** do dashboard do app
2. Procure por um **menu dropdown** ou **ícone de 3 linhas** (☰)
3. Clique e procure por **Settings** ou **Basic Settings**

---

## 📋 Checklist de Verificação

Antes de procurar as credenciais:

- [ ] Estou logado no Facebook?
- [ ] Acessei https://developers.facebook.com/apps/?
- [ ] Vejo meu app na lista?
- [ ] Cliquei NO NOME do app (não em um botão)?
- [ ] Estou na página do dashboard do app?
- [ ] Vejo menu lateral esquerdo com opções?
- [ ] Encontrei "Settings" no menu lateral?
- [ ] Cliquei em Settings → Basic?

---

## 🆘 Se AINDA Não Encontrar

### **Opção 1: URL Direta**

Se você sabe o App ID (aparece na URL ou na lista de apps):

```
https://developers.facebook.com/apps/SEU_APP_ID/settings/basic/
```

Substitua `SEU_APP_ID` pelo número do seu app.

---

### **Opção 2: Criar Novo App**

Se o app atual está com problema:

1. Volte para: https://developers.facebook.com/apps/
2. Clique em **Create App** novamente
3. Siga o processo normalmente
4. Após criar, deve ver o App ID imediatamente

---

### **Opção 3: Ajuda Visual**

**O que você vê atualmente?**

**Cenário A - Lista de Apps**:
```
My Apps
┌─────────────────────────────────┐
│ Weekly Allowance Tracker        │ ← CLIQUE AQUI
│ Created: Today                   │
└─────────────────────────────────┘
```

**Cenário B - Dashboard do App**:
```
Weekly Allowance Tracker
┌──────────────┬──────────────────┐
│ Dashboard    │ [Conteúdo]       │
│ Settings  ←  │                  │ CLIQUE EM SETTINGS
│ Roles        │                  │
└──────────────┴──────────────────┘
```

**Cenário C - Settings → Basic**:
```
Settings > Basic
┌─────────────────────────────────┐
│ App ID                          │
│ 1234567890123456     [Copy]    │ ← COPIE ESTE
│                                 │
│ App Secret                      │
│ ••••••••••    [Show]  [Reset]  │ ← CLIQUE "Show"
└─────────────────────────────────┘
```

---

## 💡 Dica Rápida

**Se você acabou de criar o app**:

O App ID aparece **imediatamente** após criar. Geralmente:

1. Na confirmação de criação
2. No topo da página do dashboard
3. Na barra de endereço (parte da URL)

**Exemplo de URL**:
```
https://developers.facebook.com/apps/1234567890123456/dashboard/
                                      ^^^^^^^^^^^^^^^^
                                      Este é o App ID!
```

---

## 🎯 Valores para o Supabase

Quando encontrar, use assim no Supabase:

```
Facebook Provider Settings
┌─────────────────────────────────────────────────┐
│ Facebook client ID                              │
│ [1234567890123456]                     ← App ID │
│                                                  │
│ Facebook client secret                          │
│ [abc123def456...]                  ← App Secret │
└─────────────────────────────────────────────────┘
```

---

## 📞 Ainda com Dúvida?

**Compartilhe**:
1. Screenshot da página que você está vendo
2. URL da página atual
3. O que você vê no menu lateral esquerdo?

**Links úteis**:
- Lista de Apps: https://developers.facebook.com/apps/
- Documentação: https://developers.facebook.com/docs/development/create-an-app/

---

## ⚡ Resumo Rápido

```
1. https://developers.facebook.com/apps/
2. Clique no NOME do seu app
3. Menu lateral → Settings → Basic
4. App ID: Copie o número visível
5. App Secret: Clique em "Show", digite senha, copie
6. Cole no Supabase (Auth → Providers → Facebook)
```

✅ Pronto!
