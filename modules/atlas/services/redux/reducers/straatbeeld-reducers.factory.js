(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('straatbeeldReducers', straatbeeldReducersFactory);

    straatbeeldReducersFactory.$inject = ['ACTIONS'];

    function straatbeeldReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.FETCH_STRAATBEELD] = fetchStraatbeeldReducer;
        reducers[ACTIONS.SHOW_STRAATBEELD_INITIAL] = showStraatbeeldReducer;
        reducers[ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT] = showStraatbeeldReducer;
        reducers[ACTIONS.STRAATBEELD_SET_ORIENTATION] = setOrientationReducer;

        return reducers;

        /**
         * @description If the oldState had an active panorama it will remember the heading, pitch and fov. Otherwise
         * it'll use the car's orientation for the heading and pitch and a default FOV.
         *
         * @param {Object} oldState
         * @param {Number|Array} payload - A panorama ID (Number) or a location (Array)
         *
         * @returns {Object} newState
         */
        function fetchStraatbeeldReducer (oldState, payload) {
            console.log(payload);
            var newState = angular.copy(oldState);


            newState.straatbeeld = newState.straatbeeld || {};
            newState.straatbeeld.id = payload.id;
            newState.straatbeeld.heading = payload.heading;
            newState.straatbeeld.isInitial = payload.isInitial;


            newState.straatbeeld.date = null;
 
            newState.straatbeeld.hotspots = [];
            newState.straatbeeld.isLoading = true;

            newState.map.highlight = null;
            newState.map.isLoading = true;
            newState.search = null;
            newState.page = null;
            newState.detail = null;
            newState.dataSelection = null;
            console.log('newState in fetch', newState);
            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Array} payload - formatted data from Earthmine
         *
         * @returns {Object} newState
         */
        function showStraatbeeldReducer (oldState, payload) {
            
            var newState = angular.copy(oldState);
            
            //Straatbeeld can be null if another action gets triggered between FETCH_STRAATBEELD and SHOW_STRAATBEELD
            if (angular.isObject(newState.straatbeeld)) {
                newState.straatbeeld.id = payload['pano_id'];
               
                newState.straatbeeld.searchLocation = null;
                newState.straatbeeld.date = payload.date;

                newState.straatbeeld.hotspots = payload.hotspots;
                newState.straatbeeld.isLoading = false;
                newState.straatbeeld.geometry = [ payload.geometrie.coordinates[1], payload.geometrie.coordinates[0] ];

                newState.map.isLoading = false;
            }
            

            return newState;
        }

        function setOrientationReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.straatbeeld.camera = payload;

            return newState;
        }
    }
})();
