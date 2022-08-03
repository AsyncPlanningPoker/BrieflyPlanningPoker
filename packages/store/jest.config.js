/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.test.ts$',
  globalSetup:'./tests/setup.ts',
  globalTeardown:'./tests/teardown.ts',
  coveragePathIgnorePatterns: [
    "knexfile.ts"
  ],
};
