'use strict';

const isVisible = require('../../../../e2e/helpers/is-visible');

const dataSelectionHeader = require('./../header/header.page-objects');
const availableFilters = require('./../available-filters/available-filters.page-objects');

module.exports = function (dataSelectionElement) {
    return function () {
        return {
            isVisible: isVisible(dataSelectionElement),
            header: dataSelectionHeader(dataSelectionElement.element(by.css('dp-data-selection-header'))),
            availableFilters: availableFilters(
                dataSelectionElement.element(by.css('dp-data-selection-available-filters'))
            )
        };
    };
};
