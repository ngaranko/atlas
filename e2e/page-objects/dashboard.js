const mapPageObject = require('./map');

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
                dataSelection: getComponent(column.element(by.css('dp-data-selection'))),
                detail: getComponent(column.element(by.css('dp-detail'))),
                layerSelection: getComponent(column.element(by.css('dp-layer-selection'))),
                map: mapPageObject(column.element(by.css('dp-map'))),
                //map: getComponent(column.element(by.css('dp-map'))),
                page: getComponent(column.element(by.css('dp-page'))),
                searchResults: getComponent(column.element(by.css('dp-search-results'))),
                straatbeeld: getComponent(column.element(by.css('dp-straatbeeld'))),
                columnSize: function () {
                    return column.getAttribute('class').then(function (className) {
                        if (className.match(/u-col-sm--4/) !== null) {
                            return 4;
                        } else if (className.match(/u-col-sm--8/) !== null) {
                            return 8;
                        } else if (className.match(/u-col-sm--12/) !== null) {
                            return 12;
                        } else {
                            return 0;
                        }
                    });
                }
            };

            function getComponent (component) {
                return function () {
                    return {
                        isActive: function () {
                            return component.isPresent()
                        },
                        isVisible: function () {
                            return component.getAttribute('class').then(function (className) {
                                return className.match(/ng-hide/) === null;
                            });
                        }
                    };
                };
            }
        };
    }
};
