#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TESTE DE VARIÁVEIS DE AMBIENTE NO VITE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verifica se .env.local existe
if [ ! -f .env.local ]; then
  echo "❌ ERRO: .env.local não encontrado!"
  exit 1
fi

echo "✅ .env.local encontrado"
echo ""

# Mostra o conteúdo (sem a chave)
echo "📋 Conteúdo do .env.local:"
cat .env.local | grep -v "ANON_KEY" | grep -E "VITE_"
echo "VITE_SUPABASE_ANON_KEY=****** (oculto)"
echo ""

# Verifica se tem espaços inválidos
echo "🔍 Verificando formato..."
if grep -E "^\s+VITE_" .env.local > /dev/null; then
  echo "❌ ERRO: Encontrados espaços no início das linhas!"
  exit 1
fi

if grep -E "VITE_[^=]+\s+=\s+" .env.local > /dev/null; then
  echo "❌ ERRO: Encontrados espaços ao redor do = !"
  exit 1
fi

echo "✅ Formato correto"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 INSTRUÇÕES PARA REINICIAR O DEV SERVER:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  No terminal onde npm run dev está rodando:"
echo "    Pressione Ctrl+C (ou Cmd+C)"
echo ""
echo "2️⃣  Execute novamente:"
echo "    npm run dev"
echo ""
echo "3️⃣  Aguarde a mensagem:"
echo "    ➜  Local:   http://localhost:5182/"
echo ""
echo "4️⃣  Abra o navegador e teste no console (F12):"
echo "    console.log('URL:', import.meta.env.VITE_SUPABASE_URL);"
echo "    console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'OK' : 'MISSING');"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
