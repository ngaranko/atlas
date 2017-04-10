'use strict';

const searchResults = require('./search-results');

module.exports = function (page) {
    expect(page.title).toMatch(/Resultaten met '\w+' - Dataportaal$/);

    searchResults(page);
};
