module.exports = {
  "extends": [
    "airbnb",
    "plugin:jsx-a11y/strict"
  ],
  "env": {
    "browser": true,
    "jest": true,
    "node": true
  },
  "plugins": [
    "jsx-a11y"
  ],
  "root": true,
  "rules": {
    "arrow-parens": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "no-nested-ternary": "off",
    "no-unused-vars": 0,
    "no-multiple-empty-lines": "error",
    "no-underscore-dangle": ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", "_embedded", "_links"] }],

    "jsx-a11y/alt-text": "error"
  }
}
