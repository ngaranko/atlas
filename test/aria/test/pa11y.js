/*
 * pa11y.js tests all the URLs in the config file.
 * All URL tests need to succeed for the entire test to succeed.
 */
import fs from 'fs'
import chalk from 'chalk'
import pa11y from 'pa11y'
import pAll from 'p-all'
import path from 'path'
import reporter from 'pa11y-reporter-cli'
import options from './pa11y-options'
import tests from './pa11y-tests'

const DEBUG = true
const CONCURRENT_TESTS = 1
const CAPTURE_DIR = path.join(__dirname, 'screen-captures')

console.log('Pa11y test script started')
if (!fs.existsSync(CAPTURE_DIR)) {
  fs.mkdirSync(CAPTURE_DIR)
}
const exitProcess = (code, error) => {
  if (code === 0) {
    console.log(chalk.green('Pa11y: No error, exit code 0'))
  } else {
    console.error('Pa11y: Errors found exit code !== 0. Error: ', error)
  }
  process.exit(code)
}

console.log('Pa11y: checking configuration')
const checkTestsActions = allTests => {
  // flatten actions
  const actions = allTests.reduce(
    (acc, next) => (next.actions ? [...acc, ...next.actions] : acc),
    [],
  )
  const invalidActions = actions.filter(value => pa11y.isValidAction(value) === false)
  if (invalidActions.length > 0) {
    console.error('invalid actions encountered:')
    invalidActions.forEach(console.error)
    exitProcess(1)
  }
}
checkTestsActions(tests)

console.log('Pa11y: running tests...')
const actions = tests.map((test, idx) => () => {
  let url = test.url
  if (process.env.BASE_URL) {
    url = url.replace('http://localhost:8080', process.env.BASE_URL)
  }

  const allOptions = {
    ...options,
    screenCapture: path.join(CAPTURE_DIR, `${idx}.png`),
    ...test,
  }

  if (DEBUG) {
    allOptions.log = {
      debug: console.log,
      error: console.error,
      info: console.info,
    }
  }

  return pa11y(url, allOptions)
})

pAll(actions, {
  concurrency: CONCURRENT_TESTS,
})
  .then(results => {
    const total = {
      errors: 0,
      warnings: 0,
      notices: 0,
    }

    results.forEach(
      result => {
        if (result.documentTitle) {
          console.log(`Pa11y: results for "${result.documentTitle}"`)

          console.log(reporter.results(result))

          total.errors += result.issues.reduce(
            (accumulator, issue) => (issue.type === 'error' ? accumulator + 1 : accumulator),
            0,
          )
          total.warnings += result.issues.reduce(
            (accumulator, issue) => (issue.type === 'warning' ? accumulator + 1 : accumulator),
            0,
          )
          total.notices += result.issues.reduce(
            (accumulator, issue) => (issue.type === 'notice' ? accumulator + 1 : accumulator),
            0,
          )
        }
      },
      reason => {
        exitProcess(1, reason)
      },
    )

    console.log('Pa11y: TOTALS found', total.errors + total.warnings + total.notices)

    if (total.errors) {
      console.log(chalk.red('Pa11y: total errors', total.errors))
    }
    if (total.warnings) {
      console.log(chalk.yellow('Pa11y: total warnings', total.warnings))
    }
    if (total.notices) {
      console.log(chalk.cyan('Pa11y: total notices', total.notices))
    }

    if (total.errors) {
      exitProcess(1, 'error > 0')
    }
    exitProcess(0)
  })
  .catch(error => {
    exitProcess(1, error)
  })
