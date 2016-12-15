(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('SHARED_CONFIG', {
            STRAATBEELD_THUMB_URL: 'https://api.datapunt.amsterdam.nl/panorama/thumbnail/',
            RADIUS: 50,
            THUMBNAIL_WIDTH: 240
        });
})();
