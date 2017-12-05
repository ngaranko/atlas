import { spawn } from 'child_process';

const httpServer = spawn('http-server', ['./dist']);

httpServer.stdout.on('data', (buffer) => {
  if (!buffer.toString('utf8').includes('Available on:')) {
    return;
  }
  const cypress = spawn('cypress', ['run'], { env: { ...process.env, FORCE_COLOR: true } });
  cypress.stdout.on('data', (buffer) => console.log(buffer.toString('utf8')));
  cypress.stderr.on('data', (buffer) => console.log(buffer.toString('utf8')));
  cypress.on('close', () => {
    httpServer.stdin.end();
    process.exit();
  });
});
