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
        // To run eslint from the command line use .\node_modules\.bin\eslint modules
        // The --fix option on the command line can automatically fixes some problems

        // "one-var": "off",   // enforce variables to be declared either together or separately in functions
        // "eol-last": "off",  // require or disallow newline at the end of files
        // "strict": "off",
        // "linebreak-style": "off",

        "no-shadow": "error",
        "angular/json-functions": "error",    // use angular.fromJson/toJson instead of JSON.parse and JSON.stringify
        "spaced-comment": "error",    // enforce consistent spacing after the // or /* in a comment
        "indent": [ // enforce consistent indentation
            "error",
            4,
            {
                "SwitchCase": 1
                // Case statements should be indented:
                // switch(a){
                // case "a":
                //     break;
                // case "b":
                //     break;
                // }
            }
        ],
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
        "key-spacing": "error",   // enforce consistent spacing between keys and values in object literal properties
        "brace-style": "error",   // enforce consistent brace style for blocks
        "standard/object-curly-even-spacing": "error",    // enforce consistent spacing inside braces of object literals
        "standard/array-bracket-even-spacing": "error",   // enforces consistent spacing inside array brackets
        // Checks copied from existing jshint
        "no-bitwise": "error",
        "camelcase": "error",
        "curly": "error",
        "eqeqeq": "error",
        "guard-for-in": "error",
        "no-extend-native": "error",
        "wrap-iife": [
            "error",
            "any"
        ],
        "max-params": [
            "error",
            10
        ],
        "max-depth": [
            "error",
            5
        ],
        "max-statements": [
            "error",
            40
        ],
        "complexity": [
            "error",
            8
        ],
        "max-len": [
            "error",
            {
                "code": 120,
                "ignoreComments": false
            }
        ],
        "no-use-before-define": [
            "error",
            {
                "functions": false
            }
        ],
        "new-cap": "error",
        "no-caller": "error",
        "no-empty": "error",
        "no-irregular-whitespace": "error",
        "no-new": "error",
        "quotes": [
            2,
            "single"
        ],
        "no-undef": "error",
        "no-cond-assign": "error",
        "no-debugger": "error",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-unused-expressions": "error",
        "block-scoped-var": "error",
        "no-iterator": "error",
        "no-loop-func": "error",
        "no-multi-str": "error",
        "valid-typeof": "error",
        "no-proto": "error",
        "no-script-url": "error",
        "dot-notation": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-invalid-this": "error",
        "require-yield": "error"
    },
    "plugins": [
        "standard",
        "angular"
    ]
};