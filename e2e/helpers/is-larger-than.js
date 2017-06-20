'use strict';

/**
 *
 * @description this function returns true when lower is lower than higher
 */
module.exports = function (lower, higher) {
    var deferred = protractor.promise.defer();

    if (lower && higher) {
        lower.then(function(lowerValue) {
            higher.then(function(higherValue) {
                lowerValue = parseFloat(lowerValue.replace('.', '').replace(',', '.'));
                higherValue = parseFloat(higherValue.replace('.', '').replace(',', '.'));

                if (!isNaN(lowerValue) && !isNaN(higherValue)) {
                    deferred.fulfill(lowerValue < higherValue);
                } else {
                    deferred.reject();
                }
            });
        });
    } else {
        deferred.reject();
    }

    return deferred.promise;
};
