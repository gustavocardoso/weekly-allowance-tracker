# 📧 Templates de Email Customizados para Supabase

Este arquivo contém os templates de email personalizados para o Weekly Allowance Tracker.

## Como Aplicar no Supabase

1. Acesse: https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/templates
2. Selecione cada template abaixo
3. Cole o conteúdo HTML correspondente
4. Clique em "Save"

---

## 1. Confirm Signup (Confirmação de Cadastro)

**Subject**: `Confirme seu email - Weekly Allowance Tracker`

**HTML Body**:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header .emoji {
      font-size: 64px;
      margin-bottom: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1f2937;
      margin-top: 0;
      font-size: 24px;
    }
    .content p {
      color: #6b7280;
      font-size: 16px;
      margin: 16px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white !important;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 24px 0;
      text-align: center;
    }
    .footer {
      background: #f3f4f6;
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #9ca3af;
    }
    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="emoji">💰</div>
      <h1>Weekly Allowance Tracker</h1>
    </div>
    
    <div class="content">
      <h2>Confirme seu email</h2>
      <p>Olá!</p>
      <p>Obrigado por se cadastrar no Weekly Allowance Tracker. Para começar a usar sua conta, por favor confirme seu endereço de email clicando no botão abaixo:</p>
      
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">Confirmar Email</a>
      </div>
      
      <div class="divider"></div>
      
      <p style="font-size: 14px; color: #9ca3af;">
        Se você não criou esta conta, pode ignorar este email com segurança.
      </p>
      
      <p style="font-size: 14px; color: #9ca3af;">
        Ou copie e cole este link no seu navegador:<br>
        <span style="color: #667eea;">{{ .ConfirmationURL }}</span>
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">Weekly Allowance Tracker</p>
      <p style="margin: 8px 0 0;">Gerencie a mesada das crianças de forma simples e divertida</p>
    </div>
  </div>
</body>
</html>
```

---

## 2. Magic Link (Login sem senha)

**Subject**: `Link de acesso - Weekly Allowance Tracker`

**HTML Body**:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header .emoji {
      font-size: 64px;
      margin-bottom: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1f2937;
      margin-top: 0;
      font-size: 24px;
    }
    .content p {
      color: #6b7280;
      font-size: 16px;
      margin: 16px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white !important;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 24px 0;
      text-align: center;
    }
    .footer {
      background: #f3f4f6;
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #9ca3af;
    }
    .warning {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin: 20px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="emoji">🔑</div>
      <h1>Weekly Allowance Tracker</h1>
    </div>
    
    <div class="content">
      <h2>Seu link de acesso</h2>
      <p>Olá!</p>
      <p>Clique no botão abaixo para fazer login no Weekly Allowance Tracker:</p>
      
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">Fazer Login</a>
      </div>
      
      <div class="warning">
        <strong>⏰ Atenção:</strong> Este link expira em 1 hora e só pode ser usado uma vez.
      </div>
      
      <p style="font-size: 14px; color: #9ca3af;">
        Se você não solicitou este link, pode ignorar este email com segurança.
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">Weekly Allowance Tracker</p>
      <p style="margin: 8px 0 0;">Gerencie a mesada das crianças de forma simples e divertida</p>
    </div>
  </div>
</body>
</html>
```

---

## 3. Reset Password (Redefinição de senha)

**Subject**: `Redefina sua senha - Weekly Allowance Tracker`

**HTML Body**:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header .emoji {
      font-size: 64px;
      margin-bottom: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1f2937;
      margin-top: 0;
      font-size: 24px;
    }
    .content p {
      color: #6b7280;
      font-size: 16px;
      margin: 16px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white !important;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 24px 0;
      text-align: center;
    }
    .footer {
      background: #f3f4f6;
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #9ca3af;
    }
    .warning {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .steps {
      background: #f0fdf4;
      border-left: 4px solid #10b981;
      padding: 16px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .steps ol {
      margin: 8px 0;
      padding-left: 20px;
    }
    .steps li {
      color: #065f46;
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="emoji">🔐</div>
      <h1>Weekly Allowance Tracker</h1>
    </div>
    
    <div class="content">
      <h2>Redefinir Senha</h2>
      <p>Olá!</p>
      <p>Você solicitou a redefinição de senha da sua conta no Weekly Allowance Tracker. Clique no botão abaixo para criar uma nova senha:</p>
      
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">Redefinir Senha</a>
      </div>
      
      <div class="steps">
        <strong>Próximos passos:</strong>
        <ol>
          <li>Clique no botão acima</li>
          <li>Você será redirecionado para criar uma nova senha</li>
          <li>Crie uma senha forte (mínimo 6 caracteres)</li>
          <li>Faça login com sua nova senha</li>
        </ol>
      </div>
      
      <div class="warning">
        <strong>⏰ Atenção:</strong> Este link expira em 1 hora.
      </div>
      
      <p style="font-size: 14px; color: #9ca3af;">
        Se você não solicitou a redefinição de senha, ignore este email. Sua senha atual permanecerá inalterada.
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">Weekly Allowance Tracker</p>
      <p style="margin: 8px 0 0;">Gerencie a mesada das crianças de forma simples e divertida</p>
    </div>
  </div>
</body>
</html>
```

---

## 4. Change Email (Mudança de email)

**Subject**: `Confirme a mudança de email - Weekly Allowance Tracker`

**HTML Body**:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header .emoji {
      font-size: 64px;
      margin-bottom: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1f2937;
      margin-top: 0;
      font-size: 24px;
    }
    .content p {
      color: #6b7280;
      font-size: 16px;
      margin: 16px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white !important;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 24px 0;
      text-align: center;
    }
    .footer {
      background: #f3f4f6;
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #9ca3af;
    }
    .info {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 16px;
      margin: 20px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="emoji">📧</div>
      <h1>Weekly Allowance Tracker</h1>
    </div>
    
    <div class="content">
      <h2>Confirme seu novo email</h2>
      <p>Olá!</p>
      <p>Você solicitou a mudança do email da sua conta. Para confirmar seu novo endereço de email, clique no botão abaixo:</p>
      
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">Confirmar Novo Email</a>
      </div>
      
      <div class="info">
        <strong>ℹ️ Informação:</strong> Após a confirmação, você usará este novo email para fazer login.
      </div>
      
      <p style="font-size: 14px; color: #9ca3af;">
        Se você não solicitou esta mudança, entre em contato com o suporte imediatamente.
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">Weekly Allowance Tracker</p>
      <p style="margin: 8px 0 0;">Gerencie a mesada das crianças de forma simples e divertida</p>
    </div>
  </div>
</body>
</html>
```

---

## Como Personalizar Ainda Mais

### Adicionar Logo
1. Faça upload do logo para um serviço de hospedagem de imagens (ex: Imgur, Cloudinary)
2. Adicione no header:
```html
<img src="https://seu-dominio.com/logo.png" alt="Logo" style="max-width: 150px; margin-bottom: 16px;">
```

### Mudar Cores
- **Primária**: Mude `#667eea` e `#764ba2` (roxo/púrpura)
- **Secundária**: Mude `#3b82f6` (azul)
- **Sucesso**: Mude `#10b981` (verde)
- **Aviso**: Mude `#f59e0b` (amarelo/laranja)

### Adicionar Footer com Links
```html
<div class="footer">
  <p><a href="https://seu-dominio.com/privacy" style="color: #667eea;">Política de Privacidade</a> | <a href="https://seu-dominio.com/terms" style="color: #667eea;">Termos de Uso</a></p>
</div>
```

---

## Testar Templates

Depois de aplicar, teste enviando:
1. Email de confirmação de cadastro
2. Email de reset de senha
3. Magic link (se habilitado)

---

**Status**: Templates prontos para aplicação no Supabase Dashboard
**Última atualização**: 2026-08-19
