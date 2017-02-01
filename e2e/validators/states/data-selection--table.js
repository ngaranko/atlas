'use strict';

const dataSelectionValidator = require('./data-selection');

module.exports = function (page) {
    const dataSelection = page.dashboard().rightColumn().dataSelection();
    expect(page.title()).toBe('Tabel Adressen - Atlas');

    expect(dataSelection.header().title()).toContain('Adressen');

    expect(dataSelection.availableFilters().isPresent()).toBe(true);
    expect(dataSelection.availableFilters().categories(0).header()).toBe('Stadsdeel');
    expect(dataSelection.availableFilters().categories(0).options(0).label()).toBe('Centrum');
    expect(dataSelection.availableFilters().categories(0).options(1).label()).toBe('Nieuw-West');

    expect(dataSelection.availableFilters().categories(1).header()).toBe('GGW-gebied');
    expect(dataSelection.availableFilters().categories(1).options(0).label()).toBe('Bijlmer Centrum');

    dataSelectionValidator(page);
};
