import { spawn } from 'child_process';

const storybook = spawn('npm', ['run', 'storybook']);

storybook.stderr.on('data', (buffer) => {
  if (!buffer.toString('utf8').includes('Storybook started')) {
    return;
  }
  const jest = spawn('jest', ['--config=jest.visual.config.js', '--runInBand'], { env: { ...process.env, FORCE_COLOR: true } });
  jest.stdout.on('data', (buffer) => console.log(buffer.toString('utf8'))); // eslint-disable-line  no-console, no-shadow
  jest.stderr.on('data', (buffer) => console.log(buffer.toString('utf8'))); // eslint-disable-line  no-console, no-shadow
  jest.on('close', (code) => {
    storybook.kill();
    process.exit(code);
  });
});
