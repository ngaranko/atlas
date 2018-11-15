import { getPageActionEndpoint } from '../../../src/store/redux-first-router';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .filter('detailEndpointAction', detailEndpointAction);

    function detailEndpointAction () {
        return (endpoint) => {
            if (!endpoint) {
                return;
            }
            const action = getPageActionEndpoint(endpoint);
            return action;
        };
    }
})();
