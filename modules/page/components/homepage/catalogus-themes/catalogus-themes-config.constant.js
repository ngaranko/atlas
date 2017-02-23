(function () {
    'use strict';

    angular
        .module('dpPage')
        .constant('CATALOGUS_THEMES_CONFIG', [
            {
                name: 'Verkeer en infrastructuur',
                slug: 'verkeer-infrastructuur',
                icon: 'thema-parkeren-beheer'
            }, {
                name: 'Toerisme en cultuur',
                slug: 'toerisme-cultuur',
                icon: 'thema-toerisme'
            }, {
                name: 'Geografie',
                slug: 'geografie',
                icon: 'thema-kaart'
            }, {
                name: 'Bevolking',
                slug: 'bevolking',
                icon: 'thema-bevolking'
            }, {
                name: 'Openbare ruimte en groen',
                slug: 'openbare-ruimte-groen',
                icon: 'thema-openbare-ruimte'
            }, {
                name: 'Stedelijke ontwikkeling',
                slug: 'stedelijke-ontwikkeling',
                icon: 'thema-stedelijke-ontwikkeling'
            }, {
                name: 'Zorg en welzijn',
                slug: 'zorg-welzijn',
                icon: 'thema-gezondheid-zorg-welzijn'
            }, {
                name: 'Energie',
                slug: 'energie',
                icon: 'thema-energie'
            }, {
                name: 'Wonen en leefomgeving',
                slug: 'wonen-leefomgeving',
                icon: 'thema-wonen-leefomgeving'
            }, {
                name: 'Werk en inkomen',
                slug: 'werk-inkomen',
                icon: 'thema-werk en inkomen'
            }
        ]);
})();
