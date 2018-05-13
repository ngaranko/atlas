import getStore from './get-store';
(function () {
    angular
        .module('dpShared')
        .factory('store', storeFactory);

    function storeFactory () {
        return getStore();
    }
})();
