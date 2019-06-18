// Based on: https://github.com/cypress-io/cypress/issues/416#issuecomment-337400871
// Runs Cypress runner per integration test. Mitigates memory hogging issues.
// Once a Cypress version is released that clears renderer
// between tests this hack (entire file) can be removed.

const cypress = require('cypress')
const Promise = require('bluebird')

const glob = Promise.promisify(require('glob'))

const started = new Date()
let numFailed = 0
const summary = []

const SCRIPTS_FOLDER =  process.env.SCRIPTS_FOLDER || 'cypress/integration';

return glob(SCRIPTS_FOLDER + '/**/*', {
  nodir: true,
  realpath: true,
})
.tap((specs) => {
  console.log('Found ', specs.length, ' specs:\n\n', specs)
})
.each((spec) => {
  console.log('\nRunning spec:', spec)

  return cypress.run({
    spec: spec,
    config: {
      integrationFolder: SCRIPTS_FOLDER
    },
    env: {
      API_ROOT: process.env.API_ROOT,
      USERNAME_EMPLOYEE: process.env.USERNAME_EMPLOYEE,
      USERNAME_EMPLOYEE_PLUS: process.env.USERNAME_EMPLOYEE_PLUS,
      PASSWORD_EMPLOYEE: process.env.PASSWORD_EMPLOYEE,
      PASSWORD_EMPLOYEE_PLUS: process.env.PASSWORD_EMPLOYEE_PLUS
    }
  })
  .then((results) => {
    numFailed += results.totalFailed;
    summary.push({
      name: spec.split("/")[spec.split("/").length - 1 ],
      totalDuration: results.totalDuration,
      totalSuites: results.totalSuites,
      totalTests: results.totalTests,
      totalFailed: results.totalFailed,
      totalPassed: results.totalPassed,
      totalPending: results.totalPending,
      totalSkipped: results.totalSkipped
    })
  })
})
.then(() => {
  console.log('\n-----------------------------\n')
  console.log(`Cypress end to end tests summary:`)
  summary.forEach((item) => {
    console.log(`${item.name}\n
  - Total Suites: ${item.totalSuites}\n
  - Total Tests: ${item.totalTests}\n
  - Total Failed: ${item.totalFailed}\n
  - Total Passed: ${item.totalPassed}\n
  - Total Pending: ${item.totalPending}\n
  - Total Screenshots: ${item.totalScreenshots}\n
  - Total Duration: ${item.totalDuration/1000} seconds\n
  `)
  })
  console.log('\n-----------------------------\n')

  const duration = new Date() - started

  console.log('\n--All Done--\n')
  console.log('Total duration:', duration) // format this however you like
  console.log('Exiting with final code:', numFailed)

  process.exit(numFailed)
})
.catch((err) => {
  console.error(err)
  throw err
})
