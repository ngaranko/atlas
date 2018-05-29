import getStore from '../../../../src/shared/services/redux/get-store';
(function () {
    angular
        .module('dpShared')
        .factory('store', storeFactory);

    function storeFactory () {
        return getStore();
    }
})();
