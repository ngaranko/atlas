'use strict';

const mapSearchResults = require('./map_search-results');

module.exports = function (page) {
    expect(page.title()).toMatch(/^\d+ resultaten met \"Linnaeusstraat 2\" - Atlas$/);

    expect(page.dashboard().rightColumn().searchResults().categories(0).header()).toMatch(/Adressen \(\d+\)/);
    expect(page.dashboard().rightColumn().searchResults().categories(0).list(0).link().label()).toBe('Linnaeusstraat 2');
    expect(page.dashboard().rightColumn().searchResults().categories(0).list(1).link().label()).toBe('Linnaeusstraat 2A');
    expect(page.dashboard().rightColumn().searchResults().categories(0).list(2).link().label()).toBe('Linnaeusstraat 2B');

    expect(page.dashboard().rightColumn().searchResults().categories(1).header()).toMatch(/^Kadastrale subjecten \(\d+\)$/);

    mapSearchResults(page);
};
