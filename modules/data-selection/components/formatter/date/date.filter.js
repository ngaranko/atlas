import { dateToString } from '../../../../../src/shared/services/date-formatter/date-formatter';

(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('date', dateFilter);

    function dateFilter () {
        return function (input) {
            if (!input) return '';
            const date = new Date(input);
            return date && dateToString(date);
        };
    }
})();
