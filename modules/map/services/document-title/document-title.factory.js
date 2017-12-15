(function () {
    'use strict';

    // This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpMap')
        .factory('dpMapDocumentTitle', dpMapDocumentTitleFactory);

    dpMapDocumentTitleFactory.$inject = ['activeOverlays', '$rootScope', '$q'];

    function dpMapDocumentTitleFactory (activeOverlays, $rootScope, $q) {
        return {
            getTitle: getTitle
        };

        function getTitle () {
            const q = $q.defer();

            $rootScope.$applyAsync(function () {
                /*
                 Wait for the next digest cycle (making this function asynchronous), the variables should be
                 rendered inside the template before returning the HTML.
                 */
                const layers = activeOverlays.getOverlaysLabels();
                const result = (layers ? `${layers} op ` : '') + 'Grote kaart';
                q.resolve(result);
            });

            return q.promise;
        }
    }
})();
