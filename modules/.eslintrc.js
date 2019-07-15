module.exports = {
  parserOptions: {
    ecmaVersion: 9, // specify the version of ECMAScript syntax you want to use
    sourceType: 'module', // set to "script" (default) or "module" if your code is in ECMAScript modules
  },
  root: true,
  env: {
    es6: true, // enable all ECMAScript 6 features except for modules, ecmaVersion parser option to 6
    jasmine: true, // adds all of the Jasmine testing global variables for version 1.3 and 2.0,
  },
  extends: [
    'eslint:recommended', // enables rules that report common problems
    'standard', // Shareable config for JavaScript Standard Style
    'angular', // // Linting rules to adhere to the John Papa's Angular Styleguide
    'prettier/standard',
    '../.eslintrc.js',
  ],
  rules: {
    // For further info see http://eslint.org/docs/rules/
    // To run eslint from the command line use .\node_modules\.bin\eslint modules
    // The --fix option on the command line can automatically fixes some problems

    // The following options might be set to error in the future...
    // "one-var": "off",            // enforce variables to be declared either together or separately in functions
    // "strict": "off",             // enforce consistent linebreak style
    // "linebreak-style": "off",    // enforce consistent linebreak style
    'angular/window-service': 'off', // prefer the AngularJS wrapper service $document over document object
    'angular/document-service': 'off', // prefer the AngularJS wrapper service $document over document object
    'angular/on-watch': 'error', // assign Watch/On methods on the scope to a variable, for $destroy handler
    'angular/no-service-method': 'error', // You should prefer the factory() method instead of service()
    'angular/module-getter': 'off', // When using a module, avoid variable, use chaining with the getter syntax
    'angular/json-functions': 'error', // use angular.fromJson/toJson instead of JSON.parse and JSON.stringify
    'jasmine/no-focused-tests': 'error', // disallow fdescribe, fit
    'jasmine/no-disabled-tests': 'off', // allow xdescribe, xit
  },
  plugins: [
    'standard',
    'angular', // Linting rules to adhere to the John Papa's Angular Styleguide
    'jasmine',
  ],
}
