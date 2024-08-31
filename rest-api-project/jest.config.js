module.exports = {
  // The root directory that Jest should scan for tests and modules within
  rootDir: './',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).[tj]s?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // A map from regular expressions to paths to transformers
  transform: {},

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
