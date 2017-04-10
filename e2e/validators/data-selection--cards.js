'use strict';

const dataSelectionValidator = require('./data-selection');

module.exports = function (page) {
    expect(page.title).toMatch(/Datasets - Dataportaal/);

    expect(page.dashboard.rightColumn.dataSelection.availableFilters.visible).toBe(true);

    dataSelectionValidator(page);
};
