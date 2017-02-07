'use strict';

module.exports = function (element, expectedClass) {
    return element.getAttribute('class').then(function (classesString) {
        const classNames = classesString.split(' ');

        return classNames.indexOf(expectedClass) !== -1;
    });
};
