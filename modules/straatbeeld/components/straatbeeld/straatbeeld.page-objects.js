'use strict';

module.exports = function (pageElement) {
    return function () {
        return {
            isVisible: dp.isVisible(pageElement)
        };
    };
};
