module.exports = {
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/packages/test-harness'
  ],
  maxWorkers: 2,
  testEnvironmentOptions: {
    testURL: 'http://webserver/'
  },
  testPathIgnorePatterns: ['<rootDir>/__tests__/assets/'],
  testTimeout: 15000 // Even in normal situation, it may take 7-9 seconds to complete the test.
};
