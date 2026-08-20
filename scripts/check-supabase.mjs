#!/usr/bin/env node

/**
 * Script to check Supabase configuration and guide setup
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

console.log('\n🔍 Verificando Configuração do Supabase...\n');

// Check environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.log('❌ Variáveis de ambiente não configuradas');
  console.log('\n📝 Próximos passos:');
  console.log('1. Crie um arquivo .env.local na raiz do projeto');
  console.log('2. Adicione:');
  console.log('   VITE_SUPABASE_URL=https://seu-projeto.supabase.co');
  console.log('   VITE_SUPABASE_ANON_KEY=sua-anon-key');
  console.log('\n📖 Ver: docs/SUPABASE_SETUP_GUIDE.md\n');
  process.exit(1);
}

console.log('✅ Variáveis de ambiente configuradas');
console.log(`   URL: ${SUPABASE_URL}`);
console.log(`   Key: ${SUPABASE_ANON_KEY.substring(0, 20)}...`);

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkConfiguration() {
  console.log('\n📊 Verificando tabelas...');
  
  const tables = ['profiles', 'situations', 'cycles', 'entries'];
  const tableStatus = {};
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('id').limit(1);
      
      if (error) {
        if (error.message.includes('permission denied') || error.message.includes('JWT')) {
          tableStatus[table] = '⚠️  Existe (RLS ativo)';
        } else {
          tableStatus[table] = `❌ Erro: ${error.message}`;
        }
      } else {
        tableStatus[table] = '✅ Configurada';
      }
    } catch (err) {
      tableStatus[table] = `❌ Erro: ${err.message}`;
    }
  }
  
  Object.entries(tableStatus).forEach(([table, status]) => {
    console.log(`   ${status.padEnd(30)} ${table}`);
  });
  
  console.log('\n🔐 Verificando autenticação...');
  
  // Try to sign up (will fail but gives us provider info)
  try {
    const { error } = await supabase.auth.signUp({
      email: 'test@test.com',
      password: 'test123',
    });
    
    if (error) {
      if (error.message.includes('Email signups are disabled')) {
        console.log('   ❌ Email provider desabilitado');
        console.log('      → Habilite em: Authentication → Providers → Email');
      } else if (error.message.includes('already registered')) {
        console.log('   ✅ Email provider habilitado');
      } else if (error.message.includes('Signup disabled')) {
        console.log('   ⚠️  Signups desabilitados');
        console.log('      → Habilite em: Authentication → Providers');
      } else {
        console.log(`   ℹ️  ${error.message}`);
      }
    } else {
      console.log('   ✅ Email provider habilitado');
    }
  } catch (err) {
    console.log(`   ❌ Erro: ${err.message}`);
  }
  
  console.log('\n📱 Próximos passos:\n');
  
  // Check what needs to be done
  const hasErrors = Object.values(tableStatus).some(status => status.startsWith('❌'));
  
  if (hasErrors) {
    console.log('1. ❌ Criar/corrigir tabelas no Supabase');
    console.log('   → Rode: node scripts/run-migration.mjs');
  } else {
    console.log('1. ✅ Tabelas configuradas');
  }
  
  console.log('2. 🔧 Configurar providers de autenticação:');
  console.log('   → Email: https://app.supabase.com/project/' + SUPABASE_URL.split('.')[0].split('//')[1] + '/auth/providers');
  console.log('   → Google OAuth: docs/QUICK_OAUTH_SETUP.md');
  console.log('   → Facebook OAuth: docs/QUICK_OAUTH_SETUP.md');
  
  console.log('3. 📧 Customizar templates de email:');
  console.log('   → Ver: docs/EMAIL_TEMPLATES.md');
  
  console.log('4. 🧪 Testar aplicação:');
  console.log('   → npm run dev');
  console.log('   → http://localhost:5173/login');
  
  console.log('\n✨ Status Geral:\n');
  
  const allTablesOk = !hasErrors;
  const percentage = allTablesOk ? 70 : 30;
  
  console.log(`   Configuração: ${percentage}% completa`);
  console.log('   Pendente: OAuth providers (Google, Facebook)');
  console.log('   Pronto para: Testes com email/senha\n');
}

checkConfiguration().catch(err => {
  console.error('\n❌ Erro ao verificar configuração:', err.message);
  process.exit(1);
});
