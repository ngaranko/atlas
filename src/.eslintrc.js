module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:jsx-a11y/strict', 'prettier/react', '../.eslintrc.js'],
  env: {
    jest: true,
  },
  plugins: ['jsx-a11y'],
  root: true,
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['a'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'react/prop-types': [0],
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
}
