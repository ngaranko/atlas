# Atlas

## Requirements
- NPM
- Bower
- Grunt
- Java JRE (needed to run protractor)

## Installation
- Create a local file "grunt/config/credentials.js", use credentials.sample.js as a template. Usernames and passwords
are stored in Rattic. These credentials are used when running E2E tests.
- npm install
- bower install
- grunt
- Open the server at http://localhost:8000/

## Other useful commands
- npm test
- grunt build-release
- npm run clean

## E2E testing
In order to run the E2E tests, the following environment variables should be set:
- `PASSWORD_EMPLOYEE`
- `PASSWORD_EMPLOYEE_PLUS`
- `USERNAME_EMPLOYEE`
- `USERNAME_EMPLOYEE_PLUS`
They can simply be added by using the `export` command from the command line, or by providing the variables as a
prefix to the desired command, e.g. `PASSWORD_EMPLOYEE=password grunt test`.

## Techniques used
- AngularJS
- Redux
- Leaflet
- D3

## Conventions used
- John Papa Angular style guide (https://github.com/johnpapa/angular-styleguide/tree/master/a1)
- EditorConfig (http://editorconfig.org/)
- BEM (http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- BEMIT (http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)
- BEM namespaces (http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
- [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) without tags and a release branch
