(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('ICON_CONFIG', {
            // @TODO tg-3432 replace icon-search.png -> search.svg
            search: {
                iconUrl: 'assets/icons/icon-search.png',
                iconRetinaUrl: 'assets/icons/icon-search-retina.png',
                iconSize: [30, 48],
                iconAnchor: [15, 51]
            },
            detail: {
                iconUrl: 'assets/images/map/detail.svg',
                iconSize: [21, 21],
                iconAnchor: [10, 10]
            },
            // @TODO tg-3432 replace icon-straatbeeld-orientation.png -> straatbeeld-orientation.svg
            straatbeeld_orientation: {
                iconUrl: 'assets/icons/icon-straatbeeld-orientation.png',
                iconRetinaUrl: 'assets/icons/icon-straatbeeld-orientation-retina.png',
                iconSize: [62, 62],
                iconAnchor: [31, 31]
            },
            // @TODO tg-3432 replace icon-straatbeeld-person.png -> straatbeeld-person.svg
            straatbeeld_person: {
                iconUrl: 'assets/icons/icon-straatbeeld-person.png',
                iconRetinaUrl: 'assets/icons/icon-straatbeeld-person-retina.png',
                iconSize: [18, 31],
                iconAnchor: [9, 22]
            }
        });
})();
