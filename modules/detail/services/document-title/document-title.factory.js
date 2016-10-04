(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpDetail')
        .factory('dpDetail.documentTitle', documentTitleFactory);

    function documentTitleFactory () {
        return {
            getTitle: getTitle
        };

        function getTitle (/*endpoint, apiData*/) {
            return 'STELSELPEDIA[iets].label_singular: apiData._display';
        }
    }
})();