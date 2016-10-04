(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpLayerSelection')
        .factory('dpLayerSelection.documentTitle', documentTitleFactory);

    function documentTitleFactory () {
        return {
            getTitle: getTitle
        };

        function getTitle () {
            return 'Een harde string';
        }
    }
})();