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
    "extends": ["standard", "eslint:recommended", "angular"],
    "rules": {
        "one-var": "off",   // enforce variables to be declared either together or separately in functions
        "eol-last": "off",  // require or disallow newline at the end of files
        "indent": ["off"],  // enforce consistent indentation
        "angular/json-functions": "off",    // use angular.fromJson/toJson instead of JSON.parse and JSON.stringify
        "spaced-comment": "off",    // enforce consistent spacing after the // or /* in a comment
        // The disabled tests are sorted roughly in order of priority to turn them on
        // The --fix option on the command line can automatically fixes some problems
        "no-unused-vars": "error",    // disallow unused variables
        "semi": ["error", "always"],  // require or disallow semicolons instead of ASI
        "comma-dangle": ["error", "never"],  // require or disallow trailing commas
        "angular/document-service": "off",  // prefer the AngularJS wrapper service $document over document object
        "angular/on-watch": "error",  // assign Watch/On methods on the scope to a variable, for a $destroy event handler
        "no-tabs": "error",   // disallow tabs in file
        "angular/no-service-method": "off", // You should prefer the factory() method instead of service()
        "no-multiple-empty-lines": "error",   // disallow multiple empty lines
        "no-trailing-spaces": "error",    // disallow trailing whitespace at the end of lines
        "semi-spacing": "error",  // enforce consistent spacing before and after semicolons
        "comma-spacing": "error", // enforce consistent spacing before and after commas
        "keyword-spacing": "error",   // enforce consistent spacing before and after keywords
        "space-before-function-paren": "error",   // consistent spacing before function definition opening parenthesis
        "operator-linebreak": "error",    // enforce consistent linebreak style for operators
        "padded-blocks": "error", // require or disallow padding within blocks
        "space-before-blocks": "error",   // enforce consistent spacing before blocks
        "space-infix-ops": "error",   // require spacing around infix operators
        "no-multi-spaces": "error",   // disallow multiple spaces
        "space-in-parens": "error",   // enforce consistent spacing inside parentheses
        "space-unary-ops": "error",   // enforce consistent spacing before or after unary operators
        "key-spacing": "off",   // enforce consistent spacing between keys and values in object literal properties
        "brace-style": "off",   // enforce consistent brace style for blocks
        "standard/object-curly-even-spacing": "off",    // enforce consistent spacing inside braces of object literals
        "standard/array-bracket-even-spacing": "off",   // enforces consistent spacing inside array brackets
    },
    "plugins": [
        "standard",
        "angular"
    ]
};