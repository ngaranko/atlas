(function () {
    'use strict';

    angular
        .module('atlas', [
            'dpHeader',
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