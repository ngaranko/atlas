'use strict';

module.exports = function (pageElement) {
    return {
        get isVisible () {
            return dp.isVisible(pageElement);
        }
    };
};
