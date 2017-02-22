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
        return function (oldState, action) {
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

            if (angular.isObject(action) &&
                angular.isObject(action.type) &&
                angular.isFunction(actions[action.type.id])) {
                let newnewnew = actions[action.type.id](oldState, action.payload);

                console.log(action.type.id, newnewnew);

                return newnewnew;
            } else {
                return oldState;
            }
        };
    }
})();
