'use strict';

const mapSearchResults = require('./map_search-results');

module.exports = function (page) {
    expect(page.title)
        .toMatch(/^Data \(\d+\) met locatie \d+\.\d+, \d+\.\d+ \(\d+\.\d+, \d+\.\d+\) - Atlas$/);

    mapSearchResults(page);
};
