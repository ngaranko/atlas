'use strict';

/**
 *
 * @description this function checks whether or not something is shown with the ng-show directive
 */
module.exports = function (mainComponent) {
    return mainComponent.getAttribute('class').then(function (className) {
        return className.match(/ng-hide/) === null;
    });
};
