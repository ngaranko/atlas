#!/usr/bin/env node

const pa11y = require('pa11y');
const reporter = require('pa11y-reporter-cli');

const { spawn } = require('child_process');
const npmStart = spawn('npm', ['start']);

const urls = [
    // homepage
    'http://localhost:8080/#?mpb=topografie&mpz=11&mpv=52.3731081:4.8932945&pgn=home',

    // adressenlijst
    'http://localhost:8080/#?dsd=bag&dsp=1&dsv=TABLE&mpb=topografie&mpz=11&mpv=52.3731081:4.8932945',

    // straatbeeld
    'http://localhost:8080/#?mpb=topografie&mpz=11&mpo=pano::T&mpv=52.3730353:4.8932471&pgn=home&sbf=Cu' +
        '&sbh=aS&sbi=TMX7315120208-000073_pano_0005_000449&sbl=ZRWBl:3JJZP'
];

/* eslint-disable no-console, angular/log */
console.log('Testing pa11y...');
/* eslint-enable no-console, angular/log */

npmStart.stdout.on('data', (buffer) => {
    if (!buffer.toString('utf8').includes('Child html-webpack-plugin for "index.html":')) {
        return;
    }
    urls.forEach((url, index) => {
        pa11y(url, {
            allowedStandards: ['WCAG2AA']
        }).then((results) => {
            /* eslint-disable no-console, angular/log */
            console.log(reporter.results(results));
            /* eslint-enable no-console, angular/log */

            if (urls.length === index + 1) {
                process.exit();
            }
        });

    });
});
