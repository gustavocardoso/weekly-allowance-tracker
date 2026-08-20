#!/usr/bin/env node

/**
 * Script para verificar configuração do Supabase via API
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Carrega .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variáveis de ambiente não encontradas!');
  console.error('Verifique se VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão no .env.local');
  process.exit(1);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 VERIFICANDO CONFIGURAÇÃO DO SUPABASE');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

console.log('📋 Credenciais:');
console.log('  URL:', supabaseUrl);
console.log('  Key:', supabaseAnonKey.substring(0, 20) + '...');
console.log('');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🧪 Testando criação de conta...');
console.log('');

// Gera email único para teste
const testEmail = `teste-${Date.now()}@example.com`;
const testPassword = 'teste123456';

console.log('📧 Tentando criar conta:');
console.log('  Email:', testEmail);
console.log('  Password:', testPassword);
console.log('');

try {
  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
  });

  if (error) {
    console.error('❌ ERRO ao criar conta:');
    console.error('  Código:', error.status);
    console.error('  Mensagem:', error.message);
    console.error('');
    
    if (error.message.includes('Email rate limit exceeded')) {
      console.log('⚠️  Rate limit atingido. Aguarde alguns minutos e tente novamente.');
    } else if (error.message.includes('User already registered')) {
      console.log('ℹ️  Usuário já existe (normal em testes repetidos).');
      console.log('');
      console.log('Testando login em vez disso...');
      
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });
      
      if (loginError) {
        console.error('❌ ERRO ao fazer login:', loginError.message);
      } else if (loginData.session) {
        console.log('✅ LOGIN FUNCIONOU!');
        console.log('  Sessão:', loginData.session ? 'ATIVA' : 'INATIVA');
        console.log('  Usuário:', loginData.user?.email);
      }
    }
    
    process.exit(1);
  }

  console.log('✅ CONTA CRIADA COM SUCESSO!');
  console.log('');
  
  console.log('📊 Resultado:');
  console.log('  User ID:', data.user?.id);
  console.log('  Email:', data.user?.email);
  console.log('  Email confirmed:', data.user?.email_confirmed_at ? '✅ SIM' : '❌ NÃO');
  console.log('  Sessão:', data.session ? '✅ ATIVA' : '❌ INATIVA');
  console.log('');

  if (!data.session) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  PROBLEMA IDENTIFICADO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('Sessão está INATIVA após criar conta.');
    console.log('Isso significa que a confirmação de email está HABILITADA.');
    console.log('');
    console.log('🔧 SOLUÇÃO:');
    console.log('');
    console.log('1. Acesse:');
    console.log('   https://app.supabase.com/project/szjjenczowoatabwcvjj/auth/email-templates');
    console.log('');
    console.log('2. Desmarque:');
    console.log('   ☐ Enable email confirmations');
    console.log('');
    console.log('3. Clique em "Save"');
    console.log('');
    console.log('4. Execute este script novamente para verificar');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  } else {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ CONFIGURAÇÃO CORRETA!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('Confirmação de email está DESABILITADA.');
    console.log('Usuários podem fazer login imediatamente após criar conta.');
    console.log('');
    console.log('🎯 Próximos passos:');
    console.log('  1. Testar criar conta no app (http://localhost:5182/login)');
    console.log('  2. Configurar Google OAuth (Site URL)');
    console.log('  3. Testar login com Google');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  // Limpar teste
  console.log('');
  console.log('🧹 Limpando conta de teste...');
  if (data.session) {
    await supabase.auth.signOut();
    console.log('✅ Logout realizado');
  }

} catch (err) {
  console.error('❌ ERRO INESPERADO:');
  console.error(err);
  process.exit(1);
}
