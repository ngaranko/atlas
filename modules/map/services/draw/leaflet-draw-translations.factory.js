(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('leafletDrawTranslations', leafletDrawTranslationsFactory);

    leafletDrawTranslationsFactory.$inject = ['L'];

    function leafletDrawTranslationsFactory (L, LEAFLET_DRAW_TRANSLATIONS) {
        return {
            initialize
        };

        function initialize () {
            L.drawLocal = LEAFLET_DRAW_TRANSLATIONS;
        }
    }
})();
