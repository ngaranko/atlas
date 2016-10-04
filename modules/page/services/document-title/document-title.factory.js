(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('atlasPage')
        .factory('atlasPage.documentTitle', documentTitleFactory);

    function documentTitleFactory () {
        return {
            getTitle: getTitle
        };

        function getTitle (/*pageName*/) {
            return 'Page Name Met Uppercasefirstletter En Spaties In Plaats Van Dashes';
        }
    }
})();