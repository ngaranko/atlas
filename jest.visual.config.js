module.exports = {
  globalSetup: './test/setup-jest-visual.js',
  globalTeardown: './test/teardown-jest-visual.js',
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/file-mock.js'
  },
  setupFiles: [
    'raf/polyfill',
    './test/setup-jest.js'
  ],
  testMatch: ['**/?(*.)visual.(spec|test).js?(x)'],
  testEnvironment: './test/jest-puppeteer-environment.js',
  testPathIgnorePatterns: [
    '/e2e/',
    '/modules/',
    '/node_modules/'
  ],
  watchPathIgnorePatterns: [
    '/modules/'
  ]
};
