#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = 'https://szjjenczowoatabwcvjj.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.argv[2];

if (!serviceRoleKey) {
  console.log('');
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│  ❌ Executar Migration via Script                      │');
  console.log('└─────────────────────────────────────────────────────────┘');
  console.log('');
  console.log('Opção 1 - SCRIPT (precisa service_role key):');
  console.log('1. Vá para: https://app.supabase.com/project/szjjenczowoatabwcvjj/settings/api');
  console.log('2. Clique em "Reveal" ao lado de "service_role"');
  console.log('3. Execute: node scripts/run-migration.mjs [SERVICE_ROLE_KEY]');
  console.log('');
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│  ✅ Executar Migration Manualmente (RECOMENDADO)       │');
  console.log('└─────────────────────────────────────────────────────────┘');
  console.log('');
  console.log('1. Abra: https://app.supabase.com/project/szjjenczowoatabwcvjj/sql/new');
  console.log('2. Copie TODO o conteúdo do arquivo: supabase-migration.sql');
  console.log('3. Cole no SQL Editor');
  console.log('4. Clique em RUN (ou Cmd+Enter)');
  console.log('5. Deve aparecer: "Success. No rows returned"');
  console.log('');
  process.exit(0);
}

console.log('🚀 Executando migration...');

try {
  const migrationSQL = readFileSync(join(__dirname, '..', 'supabase-migration.sql'), 'utf-8');
  
  // Split SQL by statement for better error handling
  const statements = migrationSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  console.log(`📊 ${statements.length} statements para executar`);
  
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i] + ';';
    console.log(`   ${i + 1}/${statements.length}...`);
    
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ sql: stmt })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Statement ${i + 1} failed: ${error}`);
    }
  }
  
  console.log('✅ Migration concluída!');
  console.log('');
  console.log('Acesse: http://localhost:5179/login');
  
} catch (err) {
  console.error('❌ Erro:', err.message);
  console.log('');
  console.log('Execute manualmente no SQL Editor (mais confiável):');
  console.log('https://app.supabase.com/project/szjjenczowoatabwcvjj/sql/new');
  process.exit(1);
}
