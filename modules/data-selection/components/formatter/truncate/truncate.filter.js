(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('truncate', truncate);

    function truncate () {
        const MAX_LENGTH = 250;
        const ELLIPSES = '...';

        return function (input, maxLength = MAX_LENGTH) {
            if (angular.isString(input)) {
                let truncated = input.replace(/<[^>]+>/gm, '');
                if (truncated.length > maxLength) {
                    truncated = truncated.substr(0, maxLength);
                    let lastSpace = truncated.lastIndexOf(' ');
                    truncated = truncated.substr(0, lastSpace < 0 ? maxLength : lastSpace);
                    truncated += ELLIPSES;
                }
                return truncated;
            } else {
                return input;
            }
        };
    }
})();
