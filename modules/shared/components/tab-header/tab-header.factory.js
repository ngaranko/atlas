import TabHeader from '../../../../src/shared/services/tab-header/tab-header';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('TabHeader', tabHeaderFactory);

    tabHeaderFactory.$inject = [];

    function tabHeaderFactory () {
        return TabHeader;
    }
})();
