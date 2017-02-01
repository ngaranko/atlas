'use strict';

module.exports = function (linkElement) {
    return function () {
        return {
            label: linkElement.getText
        };
    }
};
