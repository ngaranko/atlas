'use strict';

const isVisible = require('../../../../e2e/helpers/is-visible');

const dataSelectionHeader = require('./../header/header.page-objects.js');
const availableFilters = require('./../filters/filters.page-objects.js');

module.exports = function (dataSelectionElement) {
    return function () {
        return {
            header: dataSelectionHeader(dataSelectionElement.element(by.css('dp-data-selection-header'))),
            availableFilters: availableFilters(dataSelectionElement.element(by.css('dp-data-selection-filters')))
        };
    };
};
