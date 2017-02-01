'use strict';

const dataSelectionPageObject = require('../../../data-selection/components/data-selection/data-selection.page-objects');
const detailPageObject = require('../../../detail/components/detail/detail.page-objects');
const layerSelectionPageObject = require('../../../layer-selection/components/layer-selection/layer-selection.page-objects');
const mapPageObject = require('../../../map/components/map/map.page-objects');
const pagePageObject = require('../../../page/components/page/page.page-objects');
const searchResultsPageObject = require('../../../search-results/components/search-results/search-results.page-objects');
const straatbeeldPageObject = require('../../../straatbeeld/components/straatbeeld/straatbeeld.page-objects');

module.exports = function (dashboardElement) {
    return {
        leftColumn: getColumn('left'),
        middleColumn: getColumn('middle'),
        rightColumn: getColumn('right')
    };

    function getColumn (position) {
        const column = dashboardElement.element(by.css('.qa-dashboard__column--' + position));

        return function () {
            return {
                dataSelection: dataSelectionPageObject(column.element(by.css('.qa-data-selection'))),
                detail: detailPageObject(column.element(by.css('.qa-detail'))),
                layerSelection: layerSelectionPageObject(column.element(by.css('.qa-layer-selection'))),
                map: mapPageObject(column.element(by.css('.qa-map'))),
                page: pagePageObject(column.element(by.css('.qa-page'))),
                searchResults: searchResultsPageObject(column.element(by.css('.qa-search-results'))),
                straatbeeld: straatbeeldPageObject(column.element(by.css('.qa-straatbeeld'))),
                columnSize: function () {
                    return column.getAttribute('class').then(
                        className => Number(className.replace(/.*u-col-sm--(\d+).*/, '$1'))
                    );
                }
            };
        };
    }
};
