module.exports = {
  displayName: 'unit',
  rootDir: '../',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/*.constant.js',
    '!**/*.config.js',
    '!**/*.mock.js',
    "!**/index.js",
    "!src/*.js",
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 43.2,
      functions: 44.2,
      lines: 51.6
    }
  },
  coverageReporters: process.env.CI ? [
    'html',
    'text'
  ] : ['lcov'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/file-mock.js',
    '\\.(svg)$': '<rootDir>/test/file-svg-mock.js'
  },
  setupFiles: [
    'raf/polyfill',
    './test/setup-jest.js'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  testMatch: [
    '**/!(*.visual|*.integration).test.js?(x)',
    // Do match:
    // foo.test.jsx
    // barService.test.js
    // Do not match:
    // fooService.jsx
    // foo.visual.test.jsx
    // foo.integration.test.jsx
  ],
  testEnvironment: 'jest-environment-jsdom-global',
  testPathIgnorePatterns: [
    '/e2e/',
    '/modules/',
    '/node_modules/'
  ],
  watchPathIgnorePatterns: [
    '/modules/'
  ]
};
