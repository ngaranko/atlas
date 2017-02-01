'use strict';

const isVisible = require('../../../../e2e/helpers/is-visible');

module.exports = function (pageElement) {
    return function () {
        return {
            isVisible: isVisible(pageElement)
        };
    };
};
