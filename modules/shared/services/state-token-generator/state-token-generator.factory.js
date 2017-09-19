(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('stateTokenGenerator', stateTokenGeneratorFactory);

    stateTokenGeneratorFactory.$inject = ['$window'];

    function stateTokenGeneratorFactory ($window) {
        return () => {
            // Backwards compatible with msCrypto in IE11
            const crypto = $window.crypto || $window.msCrypto;

            if (!crypto) {
                return '';
            }

            // Create an array of 16 8-bit unsigned integers
            const list = new Uint8Array(16);
            // Populate the array with random values
            crypto.getRandomValues(list);

            // Binary to Ascii (btoa) converts our (character representation
            // of) our binary data to an Ascii string
            return $window.btoa(Array
                .from(list) // convert to normal array
                .map((n) => String.fromCharCode(n)) // convert each integer to a character
                .join('')); // convert to a string of characters
        };
    }
})();
