(function() {
    'use strict';
    angular
        .module('atlasDetail')
        .service('dateConverter', dateConverterService);

    dateConverterService.$inject = ['d3'];
    /* @ngInject */

    function dateConverterService(d3) {
        return {
            ymdToDate: ymdToDate
        };

        /**
         * @param {string} [input] [datum in formaat yyyy-mm-dd]
         *@return {[date object]}    [js date object]
         */
        function ymdToDate(input) {

            var parseDate = d3.time.format('%Y-%m-%d').parse;

            return parseDate(input);

        }
    }
})();
