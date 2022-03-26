/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  rootDir: 'src',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  'preset': 'ts-jest',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    'single-spa-react/parcel': 'single-spa-react/lib/cjs/parcel.cjs',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
}
