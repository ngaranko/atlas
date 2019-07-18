module.exports = {
  extends: ['airbnb', '../../../.eslintrc'],
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress'],
  root: true,
  rules: {
    'newline-per-chained-call': 'off',
  },
}
