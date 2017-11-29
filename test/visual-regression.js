import { spawn } from 'child_process';

const storybook = spawn('npm', ['run', 'storybook']);

storybook.stdout.on('data', (buffer) => {
  if (!buffer.toString('utf8').includes('Storybook started')) {
    return;
  }
  const jest = spawn('npm', ['run', 'test-jest'], { env: { ...process.env, FORCE_COLOR: true } });
  jest.stdout.on('data', (buffer) => console.log(buffer.toString('utf8')));
  jest.stderr.on('data', (buffer) => console.log(buffer.toString('utf8')));
  jest.on('close', () => {
    storybook.stdin.end();
    process.exit();
  });
});
