module.exports = {
  extends: ['ts-react-important-stuff', 'plugin:prettier/recommended'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
  },
  parser: '@babel/eslint-parser',
}
