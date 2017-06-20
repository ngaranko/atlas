'use strict';

/**
 *
 * @description this function receives a promise with a text value and returns a promise with a number value
 */
module.exports = function (text) {
    var deferred = protractor.promise.defer();

    if (text) {
        text.then(function(value) {
            value = parseFloat(value.replace('.', '').replace(',', '.'));

            if (!isNaN(value)) {
                deferred.fulfill(value);
            } else {
                deferred.reject();
            }
        });
    } else {
        deferred.reject();
    }

    return deferred.promise;
};
