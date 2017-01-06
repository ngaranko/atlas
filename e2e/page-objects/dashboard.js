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
        };
    }
};
