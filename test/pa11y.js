#!/usr/bin/env node

const pa11y = require('pa11y');
const reporter = require('pa11y-reporter-cli');
const chalk = require('chalk');

const { spawn } = require('child_process');
const npmStart = spawn('npm', ['start'], { detached: true });

const urls = require('./pa11y-urls');

let count = 0;

const allTests = [];

/* eslint-disable no-console, angular/log */
console.log('Pa11y testing...');
console.log('Pa11y: starting npm...');
/* eslint-enable no-console, angular/log */

npmStart.stdout.on('data', (buffer) => {
    const test = buffer.toString('utf8').includes('Child html-webpack-plugin for "index.html"');

    if (test) {
        count++;
    }

    if (count < 2 || !test) {
        return;
    }

    urls.forEach((item) => {
        allTests.push(pa11y(item.url, {
            allowedStandards: ['WCAG2AA'],
            rootElement: item.rootElement
        }));
    });

    /* eslint-disable no-console, angular/log */
    console.log('Pa11y: running tests...');
    /* eslint-enable no-console, angular/log */

    Promise.all(allTests).then(results => {
        const total = {
            errors: 0,
            warnings: 0,
            notices: 0
        };

        results.forEach(result => {
            if (result.documentTitle) {
                /* eslint-disable no-console, angular/log */
                console.log(`Pa11y: testing item: ${result.documentTitle}`);
                /* eslint-enable no-console, angular/log */

                /* eslint-disable no-console, angular/log */
                console.log(reporter.results(result));
                /* eslint-enable no-console, angular/log */

                total.errors += result.issues.reduce((acc, issue) => (issue.type === 'error') * 1 + acc, 0);
                total.warnings += result.issues.reduce((acc, issue) => (issue.type === 'warning') * 1 + acc, 0);
                total.notices += result.issues.reduce((acc, issue) => (issue.type === 'notice') * 1 + acc, 0);
            }
        });

        /* eslint-disable no-console, angular/log */
        console.log('Pa11y: TOTALS');
        /* eslint-enable no-console, angular/log */

        if (total.errors) {
            /* eslint-disable no-console, angular/log */
            console.log(chalk.red('Pa11y: total errors', total.errors));
            /* eslint-enable no-console, angular/log */
        }
        if (total.warnings) {
            /* eslint-disable no-console, angular/log */
            console.log(chalk.yellow('Pa11y: total warnings', total.warnings));
            /* eslint-enable no-console, angular/log */
        }
        if (total.notices) {
            /* eslint-disable no-console, angular/log */
            console.log(chalk.cyan('Pa11y: total notices', total.notices));
            /* eslint-enable no-console, angular/log */
        }

        process.kill(-npmStart.pid, 'SIGKILL');
        process.exit();
    });
});
