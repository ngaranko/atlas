(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = [
        'urlReducers',
        'detailReducers',
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
                             homeReducers,
                             layerSelectionReducers,
                             mapReducers,
                             pageReducers,
                             searchReducers,
                             straatbeeldReducers,
                             dataSelectionReducers,
                             printReducers) {
        let actions;

        return reduce;

        function mergeReducers () {
            return angular.merge(
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
        }

        function reduce (oldState, action) {
            if (angular.isUndefined(actions)) {
                actions = mergeReducers();
            }

            if (angular.isObject(action) &&
                angular.isObject(action.type) &&
                angular.isFunction(actions[action.type.id])) {
                return actions[action.type.id](oldState, action.payload);
            } else {
                return oldState;
            }
        }
    }
})();
