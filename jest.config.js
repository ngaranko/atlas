module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'html',
    'text'
  ],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/file-mock.js'
  },
  setupFiles: [
    'raf/polyfill',
    './test/setup-jest.js'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  testEnvironment: './test/jest-environment.js',
  testMatch: [
    '**/__tests__/**/!(*visual.test).js?(x)',
    '**/*.spec.js'
  ],
  testPathIgnorePatterns: [
    '/e2e/',
    '/modules/',
    '/node_modules/'
  ],
  watchPathIgnorePatterns: [
    '/modules/'
  ]
};
