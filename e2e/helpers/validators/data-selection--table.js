'use strict';

const dataSelectionValidator = require('./data-selection');

module.exports = function (page) {
    expect(page.title()).toBe('Tabel Adressen - Atlas');

    expect(page.dashboard().rightColumn().dataSelection().header().title()).toContain('Adressen');

    expect(page.dashboard().rightColumn().dataSelection().availableFilters().categories(0).header()).toBe('Stadsdeel');
    expect(page.dashboard().rightColumn().dataSelection().availableFilters().categories(0).options(0).label()).toBe('Centrum');
    expect(page.dashboard().rightColumn().dataSelection().availableFilters().categories(0).options(1).label()).toBe('Nieuw-West');

    expect(page.dashboard().rightColumn().dataSelection().availableFilters().categories(1).header()).toBe('GGW-gebied');
    expect(page.dashboard().rightColumn().dataSelection().availableFilters().categories(1).options(0).label()).toBe('Bijlmer Centrum');

    dataSelectionValidator(page);
};
