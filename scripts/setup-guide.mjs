#!/usr/bin/env node

/**
 * Interactive setup guide for Supabase OAuth
 */

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔐 Guia Interativo: Configuração OAuth Supabase');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📋 Informações do Seu Projeto:\n');
console.log('   Project ID: szjjenczowoatabwcvjj');
console.log('   URL: https://szjjenczowoatabwcvjj.supabase.co');
console.log('   App Local: http://localhost:5182\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('✅ PASSO 1: HABILITAR EMAIL AUTH (COMECE AQUI!)\n');
console.log('   Tempo: 2 minutos\n');
console.log('   1️⃣  Abra este link:');
console.log('       👉 https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers\n');
console.log('   2️⃣  Procure por "Email" na lista');
console.log('   3️⃣  Clique para expandir');
console.log('   4️⃣  Ative: "Enable Email provider" ✅');
console.log('   5️⃣  Desative: "Confirm email" ❌ (para testes rápidos)');
console.log('   6️⃣  Clique em "Save"\n');
console.log('   ✨ PRONTO! Já pode testar login com email/senha\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🧪 TESTE AGORA:\n');
console.log('   Abra: http://localhost:5182/login');
console.log('   Crie uma conta com email e senha');
console.log('   Faça login\n');
console.log('   Se funcionar, vá para o Passo 2 (opcional)\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🔵 PASSO 2 (OPCIONAL): GOOGLE OAUTH\n');
console.log('   Tempo: 5-7 minutos\n');
console.log('   📝 COPIE ESTAS URLs PARA USAR NO GOOGLE:\n');
console.log('   Authorized JavaScript origins:');
console.log('   ┌─────────────────────────────────────────────────────────┐');
console.log('   │ http://localhost:5182                                   │');
console.log('   │ https://szjjenczowoatabwcvjj.supabase.co                │');
console.log('   └─────────────────────────────────────────────────────────┘\n');
console.log('   Authorized redirect URIs:');
console.log('   ┌─────────────────────────────────────────────────────────┐');
console.log('   │ http://localhost:5182/auth/callback                     │');
console.log('   │ https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback │');
console.log('   └─────────────────────────────────────────────────────────┘\n');
console.log('   1️⃣  Google Cloud Console:');
console.log('       👉 https://console.cloud.google.com/apis/credentials\n');
console.log('   2️⃣  Create Credentials > OAuth client ID');
console.log('   3️⃣  Application type: Web application');
console.log('   4️⃣  Cole as URLs acima nos campos correspondentes');
console.log('   5️⃣  Copie Client ID e Client Secret\n');
console.log('   6️⃣  Supabase Dashboard:');
console.log('       👉 https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers\n');
console.log('   7️⃣  Procure "Google", ative e cole Client ID e Secret');
console.log('   8️⃣  Save\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🔵 PASSO 3 (OPCIONAL): FACEBOOK OAUTH\n');
console.log('   Tempo: 5-7 minutos\n');
console.log('   📝 COPIE ESTAS URLs PARA USAR NO FACEBOOK:\n');
console.log('   Valid OAuth Redirect URIs:');
console.log('   ┌─────────────────────────────────────────────────────────┐');
console.log('   │ http://localhost:5182/auth/callback                     │');
console.log('   │ https://szjjenczowoatabwcvjj.supabase.co/auth/v1/callback │');
console.log('   └─────────────────────────────────────────────────────────┘\n');
console.log('   Site URL:');
console.log('   ┌─────────────────────────────────────────────────────────┐');
console.log('   │ http://localhost:5182                                   │');
console.log('   └─────────────────────────────────────────────────────────┘\n');
console.log('   1️⃣  Facebook Developers:');
console.log('       👉 https://developers.facebook.com/apps/\n');
console.log('   2️⃣  Create App > Consumer');
console.log('   3️⃣  Configure Facebook Login');
console.log('   4️⃣  Cole as URLs acima nos campos correspondentes');
console.log('   5️⃣  Settings > Basic > Copie App ID e App Secret');
console.log('   6️⃣  ⚠️  IMPORTANTE: Mude para modo "Live" (não Development)\n');
console.log('   7️⃣  Supabase Dashboard:');
console.log('       👉 https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/providers\n');
console.log('   8️⃣  Procure "Facebook", ative e cole App ID e Secret');
console.log('   9️⃣  Save\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📚 Documentação Completa:\n');
console.log('   • docs/OAUTH_URLS_READY.md - URLs prontas para copiar');
console.log('   • docs/QUICK_OAUTH_SETUP.md - Guia passo-a-passo completo');
console.log('   • COMO_TESTAR.md - Como testar a aplicação\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🎯 RECOMENDAÇÃO:\n');
console.log('   1. Comece com Email Auth (Passo 1) - 2 minutos');
console.log('   2. Teste o app completo com email/senha');
console.log('   3. Se quiser, adicione Google e/ou Facebook depois\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('✅ Status Atual:\n');
console.log('   🟢 Código: 100% implementado');
console.log('   🟢 Build: Passing');
console.log('   🟢 Tabelas: Criadas e configuradas');
console.log('   🟢 RLS: Ativo em todas as tabelas');
console.log('   🟢 App: Rodando em http://localhost:5182');
console.log('   🟡 OAuth: Aguardando configuração manual\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('💡 Dica: Copie e cole as URLs diretamente dos boxes acima!\n');
