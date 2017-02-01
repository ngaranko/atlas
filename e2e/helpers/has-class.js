'use strict';

module.exports = function (element, expectedClass) {
    return function () {
        return element.getAttribute('class').then(function (classesString) {
            const classNames = classesString.split(' ');

            return classNames.includes(expectedClass);
        });
    };
};
