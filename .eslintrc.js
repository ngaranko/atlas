module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "script",
    },
    "env": {
        "browser": true,
        "es6": true,
        "jasmine": true
    },
    "extends": ["standard", "angular"],
    "rules": {
        "no-unused-vars": "off",
        "operator-linebreak": "off",
        "no-tabs": "off",
        "semi": "off",
        "indent": "off",
        "spaced-comment": "off",
        "no-trailing-spaces": "off",
        "no-multiple-empty-lines": "off",
        "padded-blocks": "off",
        "eol-last": "off",
        "one-var": "off",
        "comma-dangle": "off",
        "semi-spacing": "off",
        "comma-spacing": "off",
        "keyword-spacing": "off",
        "space-before-blocks": "off",
        "space-infix-ops": "off",
        "no-multi-spaces": "off",
        "space-in-parens": "off",
        "space-unary-ops": "off",
        "key-spacing": "off",
        "brace-style": "off",
        "standard/object-curly-even-spacing": "off",
        "standard/array-bracket-even-spacing": "off",
        "space-before-function-paren": "off",
        "angular/document-service": "off",
        "angular/no-service-method": "off",
        "angular/json-functions": "off",
        "angular/on-watch": "off"
    },
    "plugins": [
        "standard",
        "angular"
    ]
};