(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('localization', localizationFactory);

    function localizationFactory () {
        return {
            toLocaleString,
            toLocaleStringSupportsOptions
        };

        /**
         * Localizes string if feature is available in browser
         */
        function toLocaleString (number, locales, options) {
            if (toLocaleStringSupportsOptions()) {
                return number.toLocaleString(locales, options);
            } else {
                return number;
            }
        }

        /**
         * Feature detection to check if .toLocalString supports locales and options arguments
         * @return {bool} true if toLocalString arguments are supported
         */
        function toLocaleStringSupportsOptions () {
            // eslint-disable-next-line max-len
            // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#Checking_for_support_for_locales_and_options_arguments // eslint-disable-line max-len
            return !!(
                typeof Intl == 'object' && // eslint-disable-line eqeqeq
                Intl &&
                typeof Intl.NumberFormat == 'function' // eslint-disable-line eqeqeq
            );
        }
    }
})();
