(function () {
    'use strict';

    angular
        .module('atlas', [
            'atlasHeader',
            'dpPage',
            'dpDetail',
            'atlasSearchResults',
            'atlasLayerSelection',
            'dpMap',
            'dpStraatbeeld',
            'dpDataSelection',

            'dpShared'
        ]);
})();