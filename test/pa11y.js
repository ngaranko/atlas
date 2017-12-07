#!/usr/bin/env node

const pa11y = require('pa11y');
const reporter = require('pa11y-reporter-cli');

const { spawn } = require('child_process');
const npmStart = spawn('npm', ['start'], { detached: true });

const urls = require('./pa11y-urls');

let count = 0;

/* eslint-disable no-console, angular/log */
console.log('Testing pa11y...');
/* eslint-enable no-console, angular/log */

npmStart.stdout.on('data', (buffer) => {
    const test = buffer.toString('utf8').includes('Child html-webpack-plugin for "index.html"');

    if (test) {
        count++;
    }

    if (count < 2 || !test) {
        return;
    }

    let index = 0;

    urls.forEach((item) => {
        pa11y(item.url, {
            allowedStandards: ['WCAG2AA'],
            rootElement: item.rootElement
        }).then((results) => {
            /* eslint-disable no-console, angular/log */
            console.log(`Testing pa11y item: ${item.name}`);
            /* eslint-enable no-console, angular/log */

            /* eslint-disable no-console, angular/log */
            console.log(reporter.results(results));
            /* eslint-enable no-console, angular/log */
            if (urls.length === index + 1) {
                process.kill(-npmStart.pid, 'SIGKILL');
                process.exit();
            }

            index++;
        });
    });
});
