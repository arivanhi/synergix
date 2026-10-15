const { spawnSync } = require('node:child_process');
const net = require('node:net');
function docker(args) {
  const result = spawnSync('docker', args, { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || 'Docker tidak tersedia.');
  return result.stdout;
}
async function main() {
  const config = JSON.parse(docker(['compose', 'config', '--format', 'json']));
  const running = docker(['ps', '--format', '{{json .}}']).trim().split('\n').filter(Boolean).map(row => JSON.parse(row));
  const chosen = new Set();
  for (const service of Object.values(config.services)) {
    for (const mapping of service.ports || []) {
      const port = Number(mapping.published);
      if (chosen.has(port)) throw new Error(`Port ${port} digunakan oleh dua layanan Synergix.`);
      chosen.add(port);
      const owners = running.filter(container => new RegExp(`:${port}->`).test(container.Ports));
      if (owners.some(container => container.Names !== service.container_name)) throw new Error(`Port ${port} sudah dipakai container lain. Ubah SYNERGIX_*_PORT pada .env.`);
      if (!owners.length) await new Promise((resolve, reject) => {
        const server = net.createServer();
        server.once('error', () => reject(new Error(`Port ${port} sudah dipakai proses lain. Ubah SYNERGIX_*_PORT pada .env.`)));
        server.listen(port, '0.0.0.0', () => server.close(resolve));
      });
    }
  }
  console.log(`Port tersedia: ${[...chosen].join(', ')}.`);
  if (process.argv.includes('--check')) return;
  const result = spawnSync('docker', ['compose', 'up', '-d', '--build'], { stdio: 'inherit' });
  process.exitCode = result.status || 0;
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
