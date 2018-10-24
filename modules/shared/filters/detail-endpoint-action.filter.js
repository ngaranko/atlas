import { getPageActionEndpoint } from '../../../src/app/routes';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .filter('detailEndpointAction', detailEndpointAction);
    function detailEndpointAction () {
        return (endpoint) => {
            // console.log(endpoint);
            const action = getPageActionEndpoint(endpoint);
            // console.log(action);
            return action;
        };
    }
})();
