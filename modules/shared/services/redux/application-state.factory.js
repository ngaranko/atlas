import applicationState from './application-state';

(function () {
    angular
        .module('dpShared')
        .factory('applicationState', applicationStateFactory);

    function applicationStateFactory () {
        return applicationState;
    }
})();
