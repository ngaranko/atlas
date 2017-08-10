/* globals Marzipano */

import Marzipano from 'marzipano/marzipano';

(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .config(configuration);

    configuration.$inject = ['$provide'];

    function configuration ($provide) {
        $provide.constant('Marzipano', Marzipano);
    }
})();
