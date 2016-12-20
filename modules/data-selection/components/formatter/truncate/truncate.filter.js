(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('truncate', truncate);

    function truncate () {
        return function (input) {
            let html = input.replace(/<[^>]+>/gm, '');
            return html.length > 250 ? html.substring(0, 250) + '...' : html;
        };
    }
})();
