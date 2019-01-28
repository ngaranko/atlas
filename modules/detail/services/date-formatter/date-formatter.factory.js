import dateFormatter from '../../../../src/detail/services/date-formatter/date-formatter';

(() => {
    'use strict';

    angular
        .module('dpDetail')
        .factory('dateFormatter', dateFormatterFactory);

    function dateFormatterFactory () {
        return dateFormatter;
    }
})();
