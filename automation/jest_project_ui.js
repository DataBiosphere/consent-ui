module.exports = {
  displayName: 'ui',
  moduleFileExtensions: [ 'js', 'json' ],
  rootDir: './',
  testMatch: [ '**/__tests__/web/**/*.spec.js?(x)' ],
  reporters: [ "default", "jest-junit" ],
  globalSetup: '<rootDir>/puppeteerSetup.js',
  globalTeardown: '<rootDir>/puppeteerTeardown.js',
  testEnvironment: '<rootDir>/puppeteerEnvironment.js',
};
