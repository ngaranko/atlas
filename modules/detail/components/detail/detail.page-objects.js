'use strict';

const isVisible = require('../../../../e2e/helpers/is-visible');

module.exports = function (detailElement) {
    return function () {
        return {
            isVisible: isVisible(detailElement)
        };
    };
};
