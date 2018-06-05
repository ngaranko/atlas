import applicationState from '../../../../src/shared/services/redux/application-state';
(function () {
    angular
        .module('dpShared')
        .factory('store', storeFactory);

    function storeFactory () {
        return applicationState.getStore();
    }
})();
