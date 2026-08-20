# 🔄 Como Reiniciar o Dev Server

## ⚠️ PROBLEMA

Você vê esta mensagem no console:
```
⚠️ Supabase credentials not found. Using local storage mode.
```

**Causa**: O Vite só lê arquivos `.env*` quando o servidor **inicia**. Se você criou ou modificou o `.env.local` com o servidor já rodando, ele não detecta automaticamente.

---

## ✅ SOLUÇÃO

### **Passo 1: Pare o Dev Server**

No terminal onde `npm run dev` está rodando:

```bash
Ctrl+C    # (ou Cmd+C no Mac)
```

Você deve ver o terminal voltar ao prompt normal.

---

### **Passo 2: Verifique o Arquivo .env.local**

```bash
cat .env.local
```

**Deve mostrar**:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://szjjenczowoatabwcvjj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek

# App Configuration
VITE_APP_URL=http://localhost:5182
```

**❌ Se não mostrar ou estiver vazio**:
```bash
cat > .env.local << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=https://szjjenczowoatabwcvjj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ampqZW5jem93b2F0YWJ3Y3ZqaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM0ODE0Mjk0LCJleHAiOjIwNTAzOTAyOTR9.jv4SN8LN-1m8j28SfCu2wIgE5X1Xq1d-hgbHOYSdLek

# App Configuration
VITE_APP_URL=http://localhost:5182
EOF
```

---

### **Passo 3: Inicie o Dev Server Novamente**

```bash
npm run dev
```

**Aguarde até ver**:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5182/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### **Passo 4: Recarregue o Navegador**

1. Abra/Recarregue: `http://localhost:5182`
2. Abra o Console (F12)

---

### **Passo 5: Verifique se as Variáveis Carregaram**

**No console do navegador**:

```javascript
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'OK' : 'MISSING');
console.log('APP:', import.meta.env.VITE_APP_URL);
```

**✅ Resultado esperado**:
```
URL: https://szjjenczowoatabwcvjj.supabase.co
KEY: OK
APP: http://localhost:5182
```

**❌ Se mostrar `undefined`**:
- Verifique se o arquivo `.env.local` está na **raiz** do projeto
- Verifique se o nome é **exatamente** `.env.local` (com ponto no início)
- Verifique se não tem espaços antes/depois do `=`
- Repita os passos 1-4

---

## 🎯 Resultado Final

Após reiniciar com sucesso:

- ✅ O aviso "⚠️ Supabase credentials not found" **desaparece**
- ✅ Você vê um badge indicando modo **Cloud** no header
- ✅ Você pode **criar conta** e **fazer login**
- ✅ O erro 401 ao criar conta **desaparece**

---

## 🔍 Troubleshooting

### **O aviso ainda aparece após reiniciar**

**Verifique o arquivo**:
```bash
ls -la .env.local
```

**Deve mostrar**:
```
-rw-r--r--  1 user  staff  XXX Aug 20 XX:XX .env.local
```

Se não aparecer, o arquivo não existe ou está em outro lugar.

---

### **Variáveis aparecem como undefined no console**

**Teste com Node.js**:
```bash
node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.VITE_SUPABASE_URL);"
```

Se mostrar a URL, o arquivo está correto. O problema é que o Vite não recarregou.

---

### **Múltiplos terminais rodando npm run dev**

Você pode ter mais de um servidor rodando. Feche TODOS:

```bash
# Encontre processos
ps aux | grep "vite" | grep -v grep

# Mate todos (substitua PID pelos números da coluna 2)
kill <PID>

# Inicie apenas um
npm run dev
```

---

## 📝 Script Automatizado

**Criar e executar**:
```bash
./test-vite-env.sh
```

Este script verifica:
- ✅ Se `.env.local` existe
- ✅ Se o formato está correto
- ✅ Se não tem espaços inválidos
- ✅ Mostra instruções passo-a-passo

---

## 🆘 Ainda com Problema?

**Compartilhe**:
1. Resultado de: `cat .env.local | head -5`
2. Resultado de: `ls -la .env.local`
3. Resultado do teste no console do navegador
4. Screenshot do terminal após `npm run dev`
