(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('modificationDate', modificationDateFilter);

    function modificationDateFilter () {
        return function (input) {
            if (angular.isObject(input)) {
                const modified = input.metadata_modified;

                const last = new Date(modified);
                const now = new Date();

                let ago = now - last;
                const daysToMiliseconds = 1000 * 60 * 60 * 24;

                if (ago >= 2 * length) {
                    ago = Math.ceil(ago / daysToMiliseconds);
                    ago = (ago === 0) ? 'vandaag' : (ago === 1) ? 'gisteren' : `${ago} dagen geleden`;
                } else {
                    return 'in de toekomst';
                }

                return `${ago} gewijzigd`;
            }
        };
    }
})();
