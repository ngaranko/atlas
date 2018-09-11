import BaseCoder from './base-coder';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('dpBaseCoder', dpBaseCoder);

    /**
     * The dpBaseCode factory
     * Returns only one method; getCoderforBase, that returns a baseCoder instance for the specified base
     * @returns {{getCoderForBase: function(number): BaseCoder}}}
     */
    function dpBaseCoder () {
        return {
            getCoderForBase,
            toPrecision: BaseCoder.toPrecision
        };

        /**
         * Returns an instance of the BaseCode class for the specified base.
         * @param {number} base
         * @returns {BaseCoder}
         */
        function getCoderForBase (base) {
            return new BaseCoder(base);
        }
    }
})();
