import applicationState from '../../../../src/shared/services/redux/application-state';

(function () {
    angular
        .module('dpShared')
        .factory('applicationState', applicationStateFactory);

    function applicationStateFactory () {
        return applicationState;
    }
})();
