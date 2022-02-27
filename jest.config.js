const {
  compilerOptions: { paths }
} = require('./tsconfig')

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/consts/**',
    '!**/svg/**',
    '!**/interfaces/**'
  ],
  setupFilesAfterEnv: ['<rootDir>testSetup/setupTests.js', './testSetup/setupTests.js', 'testSetup/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(css|scss)$': 'jest-css-modules-transform'
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src', '<rootDir>', '<rootDir>/node_modules', '<rootDir>/src'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
}
