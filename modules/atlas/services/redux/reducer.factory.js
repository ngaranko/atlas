(function () {
    'use strict';

    let totalReducerTime = 0;

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = [
        'urlReducers',
        'detailReducers',
        'freeze',
        'homeReducers',
        'layerSelectionReducers',
        'mapReducers',
        'pageReducers',
        'searchReducers',
        'straatbeeldReducers',
        'dataSelectionReducers',
        'printReducers'
    ];

    function reducerFactory (urlReducers,
                             detailReducers,
                             freeze,
                             homeReducers,
                             layerSelectionReducers,
                             mapReducers,
                             pageReducers,
                             searchReducers,
                             straatbeeldReducers,
                             dataSelectionReducers,
                             printReducers) {
        return function (oldState, action) {
            // TODO: Redux: replace
            // Warning: angular.merge is deprecated
            // -- https://docs.angularjs.org/api/ng/function/angular.merge
            var actions = angular.merge(
                urlReducers,
                detailReducers,
                homeReducers,
                layerSelectionReducers,
                mapReducers,
                pageReducers,
                searchReducers,
                straatbeeldReducers,
                dataSelectionReducers,
                printReducers
            );

            const t1 = performance.now();
            console.time();
            if (angular.isObject(action) &&
                angular.isObject(action.type) &&
                angular.isFunction(actions[action.type.id])) {
                const result = actions[action.type.id](oldState, action.payload);
                freeze.deepFreeze(result);
                const t2 = performance.now();
                const diff = t2 - t1;
                totalReducerTime += diff;
                console.log(`${action.type.id} ${diff} ms,\ttotal: ${totalReducerTime} ms`);
                return result;
            } else {
                // TODO: Redux: throw error
                return oldState;
            }
        };
    }
})();
