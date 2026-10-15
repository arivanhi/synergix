const { spawnSync, spawn } = require('node:child_process');
const path = require('node:path');
if (!process.env.DATABASE_URL) {
  if (!process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD || !process.env.MYSQL_DATABASE) throw new Error('Konfigurasi database belum lengkap.');
  process.env.DATABASE_URL = `mysql://${encodeURIComponent(process.env.MYSQL_USER)}:${encodeURIComponent(process.env.MYSQL_PASSWORD)}@db:3306/${encodeURIComponent(process.env.MYSQL_DATABASE)}`;
}
if (!process.env.NEXTAUTH_SECRET || !process.env.NEXTAUTH_URL) throw new Error('NEXTAUTH_SECRET dan NEXTAUTH_URL wajib diisi.');
for (const args of [['scripts/migrate.cjs'], [path.resolve('node_modules/tsx/dist/cli.mjs'), 'scripts/bootstrap.ts']]) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
process.env.HOSTNAME = '0.0.0.0';
const server = spawn(process.execPath, ['.next/standalone/server.js'], { stdio: 'inherit' });
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.kill(signal));
server.on('exit', code => process.exit(code || 0));
