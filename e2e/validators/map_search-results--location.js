'use strict';

const mapSearchResults = require('./map_search-results');

module.exports = function (page) {
    expect(page.title)
        .toMatch(/^Resultaten \(\d+\) met locatie \d+\.\d+, \d+\.\d+ \(\d+\.\d+, \d+\.\d+\) - Dataportaal$/);

    mapSearchResults(page);
};
