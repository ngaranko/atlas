'use strict';

/**
 *
 * @description this function returns true when lower is lower than higher
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
