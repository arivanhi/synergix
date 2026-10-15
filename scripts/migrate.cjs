require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
async function main() {
  const prisma = new PrismaClient();
  try {
    const tables = await prisma.$queryRaw`SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE()`;
    const names = tables.map(row => row.TABLE_NAME);
    // Existing installations predate migration history. Baseline only the known legacy schema.
    if (names.includes('Admin') && !names.includes('_prisma_migrations')) {
      const expected = ['Admin', 'Berita', 'Produk', 'Keanggotaan', 'Testimoni', 'PendaftarMagang', 'Layanan'];
      if (!expected.every(name => names.includes(name))) throw new Error('Schema lama tidak lengkap. Periksa database sebelum migrasi.');
      if (names.includes('KontenWebsite') || names.includes('Konsultasi')) throw new Error('Database sudah memiliki tabel CMS tanpa histori migrasi. Periksa baseline secara manual sebelum melanjutkan.');
      run(['migrate', 'resolve', '--applied', '202610080000_baseline']);
    }
    run(['migrate', 'deploy']);
  } finally { await prisma.$disconnect(); }
}
function run(args) {
  const result = spawnSync(process.execPath, [path.resolve('node_modules/prisma/build/index.js'), ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Migrasi gagal; aplikasi tidak dijalankan.');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
