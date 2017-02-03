'use strict';

const dataSelectionHeader = dp.require('modules/data-selection/components/header/header.page-objects');
const availableFilters =
    dp.require('modules/data-selection/components/available-filters/available-filters.page-objects');

module.exports = function (dataSelectionElement) {
    return function () {
        return {
            isVisible: dp.isVisible(dataSelectionElement),
            header: dataSelectionHeader(dataSelectionElement.element(by.css('dp-data-selection-header'))),
            availableFilters: availableFilters(
                dataSelectionElement.element(by.css('dp-data-selection-available-filters'))
            )
        };
    };
};
