'use strict';

const searchResults = require('./search-results');

module.exports = function (page) {
    expect(page.title).toMatch(/\d+ adressen met \'\w+\' - Atlas$/);

    searchResults(page);
};
