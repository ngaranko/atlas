'use strict';

const dataSelectionPO = require('../../../data-selection/components/data-selection/data-selection.page-objects');
const detailPO = require('../../../detail/components/detail/detail.page-objects');
const layerSelectionPO = require('../../../layer-selection/components/layer-selection/layer-selection.page-objects');
const mapPO = require('../../../map/components/map/map.page-objects');
const pagePO = require('../../../page/components/page/page.page-objects');
const searchResultsPO = require('../../../search-results/components/search-results/search-results.page-objects');
const straatbeeldPO = require('../../../straatbeeld/components/straatbeeld/straatbeeld.page-objects');

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
                dataSelection: dataSelectionPO(column.element(by.css('.qa-data-selection'))),
                detail: detailPO(column.element(by.css('.qa-detail'))),
                layerSelection: layerSelectionPO(column.element(by.css('.qa-layer-selection'))),
                map: mapPO(column.element(by.css('.qa-map'))),
                page: pagePO(column.element(by.css('.qa-page'))),
                searchResults: searchResultsPO(column.element(by.css('.qa-search-results'))),
                straatbeeld: straatbeeldPO(column.element(by.css('.qa-straatbeeld'))),
                columnSize: function () {
                    return column.getAttribute('class').then(
                        className => Number(className.replace(/.*u-col-sm--(\d+).*/, '$1'))
                    );
                }
            };
        };
    }
};
