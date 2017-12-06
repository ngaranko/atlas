#!/usr/bin/env node

const pa11y = require('pa11y');
const reporter = require('pa11y-reporter-cli');

const { spawn } = require('child_process');
const npmStart = spawn('npm', ['start']);

const urls = [
    {
        name: 'homepage',
        url: 'http://localhost:8080/#?mpb=topografie&mpz=11&mpv=52.3731081:4.8932945&pgn=home'
    },
    {
        name: 'adressenlijst',
        url: 'http://localhost:8080/#?dsd=bag&dsp=1&dsv=TABLE&mpb=topografie&mpz=11&mpv=52.3731081:4.8932945',
        rootElement: '.c-dashboard__body'
    },
    {
        name: 'straatbeeld',
        url: 'http://localhost:8080/#?mpb=topografie&mpz=11&mpo=pano::T&mpv=52.3730353:4.8932471&pgn=home&sbf=Cu' +
            '&sbh=aS&sbi=TMX7315120208-000073_pano_0005_000449&sbl=ZRWBl:3JJZP',
        rootElement: '.c-dashboard__body'
    }
];

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
                npmStart.kill();
            }

            index++;
        });
    });
});

npmStart.on('exit', () => {
    process.exit();
});
