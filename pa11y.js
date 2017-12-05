#!/usr/bin/env node

const pa11y = require('pa11y');
const reporter = require('pa11y-reporter-cli');

const urls = [
    // homepage
    'http://localhost:8080/#?mpb=topografie&mpz=11&mpv=52.3731081:4.8932945&pgn=home',

    // adressenlijst
    'http://localhost:8080/#?dsd=bag&dsp=1&dsv=TABLE&mpb=topografie&mpz=11&mpv=52.3731081:4.8932945',

    // straatbeeld
    'http://localhost:8080/#?mpb=topografie&mpz=11&mpo=pano::T&mpv=52.3730353:4.8932471&pgn=home&sbf=Cu&sbh=aS&sbi=TMX7315120208-000073_pano_0005_000449&sbl=ZRWBl:3JJZP'
];

// console.log('reporter', urls[0], reporter);
urls.forEach(url => {
    pa11y(url, {
        allowedStandards: ['WCAG2AA']
    }).then((results) => {
        const cliResults = reporter.results(results);
        console.log(cliResults);
    });
});
