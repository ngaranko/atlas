'use strict';

const mapSearchResults = require('./map_search-results');

module.exports = function (page) {
    const searchResults = page.dashboard().rightColumn().searchResults();

    expect(page.title()).toMatch(/^\d+ resultaten met \"Linnaeusstraat 2\" - Atlas$/);

    expect(searchResults.categories(0).header()).toMatch(/Adressen \(\d+\)/);
    expect(searchResults.categories(0).list(0).link().label()).toBe('Linnaeusstraat 2');
    expect(searchResults.categories(0).list(1).link().label()).toBe('Linnaeusstraat 2A');
    expect(searchResults.categories(0).list(2).link().label()).toBe('Linnaeusstraat 2B');

    expect(searchResults.categories(1).header()).toMatch(/^Kadastrale subjecten \(\d+\)$/);

    mapSearchResults(page);
};
