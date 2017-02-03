'use strict';

const mapSearchResults = require('./map_search-results');

module.exports = function (page) {
    const searchResults = page.dashboard.rightColumn().searchResults();

    expect(page.title).toMatch(/\d+ resultaten met \"Oost\" - Atlas$/);

    expect(searchResults.categories(0).header()).toMatch(/Openbare ruimtes \(\d+\)/);
    expect(searchResults.categories(0).list(0).link().label()).toMatch(/Oost/);
    expect(searchResults.categories(0).list(1).link().label()).toMatch(/Oost/);
    expect(searchResults.categories(0).list(2).link().label()).toMatch(/Oost/);
    expect(searchResults.categories(0).list(9).link().label()).toMatch(/Oost/);

    expect(searchResults.categories(1).header()).toMatch(/Adressen/);
    expect(searchResults.categories(1).list(0).link().label()).toMatch(/Oost/);
    expect(searchResults.categories(1).list(9).link().label()).toMatch(/Oost/);

    expect(searchResults.categories(2).header()).toMatch(/^Vestigingen \(\d+\)$/);
    expect(searchResults.categories(2).list(0).link().label()).toMatch(/Oost/);
    expect(searchResults.categories(2).list(9).link().label()).toMatch(/Oost/);

    expect(searchResults.categories(3).header()).toMatch(/^Maatschappelijke activiteiten \(\d+\)$/);

    expect(searchResults.categories(4).header()).toMatch(/^Kadastrale subjecten \(\d+\)$/);

    mapSearchResults(page);
};
