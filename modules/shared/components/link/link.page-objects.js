'use strict';

module.exports = function (linkElement) {
    return {
        get label () {
            return linkElement.getText();
        }
    };
};
