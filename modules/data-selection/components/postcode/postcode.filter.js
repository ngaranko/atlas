(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('postcode', postcodeFilter);

    function postcodeFilter () {
        return function (input) {
            if (input && input.match(/^[1-9][0-9]{3}[a-zA-Z]{2}$/)){
                return input.substr(0, 4) + ' ' + input.substr(4, 2).toUpperCase();
            } else {
                return input;
            }
        };
    }
})();
