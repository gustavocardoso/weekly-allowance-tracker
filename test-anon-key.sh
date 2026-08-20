#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TESTE DA ANON_KEY DO SUPABASE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Extrai a chave do .env.local
ANON_KEY=$(grep "VITE_SUPABASE_ANON_KEY=" .env.local | cut -d'=' -f2)

if [ -z "$ANON_KEY" ]; then
  echo "❌ ANON_KEY não encontrada no .env.local"
  exit 1
fi

echo "📋 Informações da chave:"
echo "  Tamanho: ${#ANON_KEY} caracteres"
echo "  Início: ${ANON_KEY:0:30}..."
echo "  Fim: ...${ANON_KEY: -30}"
echo ""

echo "🧪 Testando chave com Supabase..."
echo ""

# Testa a chave fazendo uma chamada de signup
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  'https://szjjenczowoatabwcvjj.supabase.co/auth/v1/signup' \
  -H "apikey: $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"teste-$(date +%s)@example.com\",
    \"password\": \"teste123456\"
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "📊 Resultado:"
echo "  HTTP Status: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ CHAVE VÁLIDA!"
  echo ""
  echo "A chave funciona corretamente."
  echo "Use esta chave EXATA na Vercel:"
  echo ""
  echo "$ANON_KEY"
  echo ""
elif [ "$HTTP_CODE" = "401" ]; then
  echo "❌ CHAVE INVÁLIDA!"
  echo ""
  echo "Resposta:"
  echo "$BODY" | head -5
  echo ""
  echo "Possíveis causas:"
  echo "  1. A chave está incorreta"
  echo "  2. A chave expirou"
  echo "  3. O projeto Supabase mudou"
  echo ""
  echo "Onde obter a chave correta:"
  echo "  https://app.supabase.com/project/szjjenczowoatabwcvjj/settings/api"
elif [ "$HTTP_CODE" = "400" ]; then
  echo "⚠️  CHAVE VÁLIDA mas há outro problema"
  echo ""
  echo "Resposta:"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  echo ""
  echo "A chave está correta!"
  echo "O erro 400 é do formato da requisição (normal neste teste)."
  echo ""
  echo "Use esta chave na Vercel:"
  echo ""
  echo "$ANON_KEY"
else
  echo "⚠️  Status inesperado: $HTTP_CODE"
  echo ""
  echo "Resposta:"
  echo "$BODY" | head -10
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
