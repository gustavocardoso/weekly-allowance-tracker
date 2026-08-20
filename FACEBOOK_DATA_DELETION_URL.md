# 🗑️ URL de Deleção de Dados para Facebook App

## ⚠️ Requisito Obrigatório

O Facebook exige que apps que acessam dados de usuários forneçam uma forma de deletar esses dados.

**Mensagem do Facebook**:
> Apps that access user data must provide a way for users to request that their data be deleted.

---

## ✅ Solução Implementada

Criamos uma página de **instruções de deleção** em:

```
https://seu-app.vercel.app/data-deletion
```

---

## 📋 Configurar no Facebook App

### **PASSO 1: Acessar Settings → Basic**

1. Dashboard do app: https://developers.facebook.com/apps/
2. Clique no seu app
3. Menu lateral: **Settings** → **Basic**
4. Role até encontrar: **User Data Deletion**

---

### **PASSO 2: Escolher Tipo de Callback**

Você tem 2 opções:

#### **Opção A: Data Deletion Callback URL (Recomendado para produção)**
- URL que recebe requisições de deleção automaticamente
- Requer implementação de endpoint backend

#### **Opção B: Data Deletion Instructions URL (Recomendado para começar) ✅**
- URL com instruções para o usuário deletar manualmente
- Mais simples, não requer backend adicional
- **Esta é a opção que implementamos!**

---

### **PASSO 3: Adicionar a URL**

No campo **Data Deletion Instructions URL**:

```
https://seu-app.vercel.app/data-deletion
```

⚠️ **IMPORTANTE**: Substitua `seu-app.vercel.app` pela sua URL real da Vercel!

**Exemplo**:
- Se seu app está em: `https://weekly-allowance-tracker.vercel.app`
- Use: `https://weekly-allowance-tracker.vercel.app/data-deletion`

---

### **PASSO 4: Salvar**

1. Cole a URL no campo
2. Role até o final da página
3. Clique em **Save Changes**

---

## 🎯 O Que a Página Faz

A página `/data-deletion` criada mostra:

- ✅ Instruções passo a passo para deletar conta
- ✅ O que será deletado
- ✅ Aviso que é permanente
- ✅ Timeline de deleção
- ✅ Email de contato alternativo
- ✅ Política de retenção de dados

---

## 🚀 Deploy da Página

### **Já está no código!**

A página foi criada em: `src/pages/DataDeletionPage.tsx`

Para que fique disponível em produção:

1. **Commit e push** (já foi feito)
2. **Deploy na Vercel** (automático após push)
3. **Acesse** para verificar: `https://seu-app.vercel.app/data-deletion`

---

## ✅ Verificar se Está Funcionando

1. Acesse: `https://seu-app.vercel.app/data-deletion`
2. Deve aparecer uma página com título **"Data Deletion Instructions"**
3. Se aparecer, a URL está pronta para usar no Facebook!

---

## 🔄 URLs Necessárias no Facebook App

Agora você precisa de **3 URLs** no Settings → Basic:

### **1. Privacy Policy URL**
```
https://seu-app.vercel.app/privacy
```
⏳ **Status**: Precisa criar esta página

### **2. Terms of Service URL** (opcional)
```
https://seu-app.vercel.app/terms
```
⏳ **Status**: Precisa criar esta página (ou pode deixar em branco)

### **3. User Data Deletion**
```
https://seu-app.vercel.app/data-deletion
```
✅ **Status**: Pronto!

---

## 📝 Criar Página de Privacy Policy (Próximo Passo)

### **Opção Rápida (Temporária)**

Para passar a validação do Facebook rapidamente, você pode:

1. Criar uma página simples de Privacy Policy
2. Ou temporariamente usar a URL da home: `https://seu-app.vercel.app`

### **Opção Completa**

Vou criar a página de Privacy Policy para você agora!

---

## 🎯 Para o Facebook: Use Esta URL

**Data Deletion Instructions URL**:
```
https://seu-app.vercel.app/data-deletion
```

**Ou se seu domínio for diferente**:
```
https://[SEU-DOMINIO-VERCEL]/data-deletion
```

---

## 📸 Onde Adicionar no Facebook

```
Settings > Basic
┌─────────────────────────────────────────────────────────┐
│                                                          │
│ Privacy Policy URL                                       │
│ [https://seu-app.vercel.app/privacy          ]         │
│                                                          │
│ Terms of Service URL (Optional)                          │
│ [https://seu-app.vercel.app/terms            ]         │
│                                                          │
│ User Data Deletion                                       │
│ ○ Data Deletion Callback URL                            │
│ ● Data Deletion Instructions URL              ← MARQUE  │
│ [https://seu-app.vercel.app/data-deletion    ]         │
│                                                          │
│                                    [Save Changes]        │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Troubleshooting

### **Erro: "URL is not accessible"**

**Causa**: Facebook não consegue acessar a URL

**Solução**:
1. Verifique se fez deploy (push para GitHub)
2. Aguarde 2-3 minutos após deploy
3. Teste a URL no navegador primeiro
4. Use HTTPS (não HTTP)
5. Não use localhost

---

### **Erro: "URL doesn't contain required content"**

**Causa**: Facebook espera encontrar informações sobre deleção

**Solução**:
- Nossa página já tem o conteúdo necessário
- Certifique-se que a URL está correta
- Verifique se o deploy completou

---

### **Temporariamente Usando a Home**

Se ainda não fez deploy:

1. Temporariamente use: `https://seu-app.vercel.app`
2. Facebook aceita (com aviso)
3. Depois atualize para `/data-deletion` quando estiver pronto

---

## ⚡ Resumo Rápido

```
1. Deploy já foi feito (página criada em src/pages/DataDeletionPage.tsx)

2. Aguarde 2-3 minutos (deploy automático na Vercel)

3. Teste: https://seu-app.vercel.app/data-deletion

4. Facebook → Settings → Basic → User Data Deletion

5. Selecione: Data Deletion Instructions URL

6. Cole: https://seu-app.vercel.app/data-deletion

7. Save Changes

8. ✅ Pronto!
```

---

## 📄 Conteúdo da Página

A página `/data-deletion` inclui:

- Como deletar conta (4 passos simples)
- O que será deletado
- Aviso de permanência
- Timeline (imediato)
- Email alternativo de contato
- Política de retenção
- Link de volta para home

---

## 🆘 Precisa Criar Privacy Policy Também?

Se o Facebook está pedindo Privacy Policy URL, posso criar essa página também!

Avise se precisar.

---

**Sua URL**: `https://seu-app.vercel.app/data-deletion` ✅  
**Status**: Pronta para usar! 🚀
