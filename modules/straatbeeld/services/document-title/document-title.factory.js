(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpStraatbeeld')
        .factory('dpStraatbeeld.documentTitle', documentTitleFactory);

    function documentTitleFactory () {
        return {
            getTitle: getTitle
        };

        function getTitle (/*location*/) {
            return 'Een paar woorden met een geformatteerde locatie';
        }
    }
})();