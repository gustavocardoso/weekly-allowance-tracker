#!/bin/bash

echo "┌─────────────────────────────────────────────────────────┐"
echo "│  Atualizar .env.local com sua Anon Key                 │"
echo "└─────────────────────────────────────────────────────────┘"
echo ""
echo "Cole sua anon key do Supabase aqui (começa com eyJ...):"
read ANON_KEY

cat > .env.local << ENVFILE
# Supabase Configuration
# Get these from: https://app.supabase.com/project/szjjenczowoatabwcvjj/settings/api
VITE_SUPABASE_URL=https://szjjenczowoatabwcvjj.supabase.co
VITE_SUPABASE_ANON_KEY=${ANON_KEY}

# App Configuration
VITE_APP_URL=http://localhost:5173
ENVFILE

echo ""
echo "✅ .env.local atualizado com sucesso!"
echo ""
echo "Próximo passo:"
echo "1. Rodar a migration do banco (ver instruções acima)"
echo "2. npm run dev"
