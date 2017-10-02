(function () {
    angular
        .module('dpDetail')
        .component('dpDetail', {
            bindings: {
                endpoint: '@',
                reload: '=',
                isLoading: '=',
                user: '<'
            },
            templateUrl: 'modules/detail/components/detail/detail.html',
            controller: DpDetailController,
            controllerAs: 'vm'
        });

    DpDetailController.$inject = [
        '$scope',
        'store',
        'ACTIONS',
        'api',
        'endpointParser',
        'user',
        'geometry',
        'geojson',
        'crsConverter',
        'dataFormatter',
        'nearestDetail'
    ];

    /* eslint-disable max-params */
    function DpDetailController (
            $scope,
            store,
            ACTIONS,
            api,
            endpointParser,
            user,
            geometry,
            geojson,
            crsConverter,
            dataFormatter,
            nearestDetail) {
        /* eslint-enable max-params */
        var vm = this;

        // Reload the data when the reload flag has been set (endpoint has not
        // changed)
        $scope.$watch('vm.reload', reload => {
            if (reload) {
                getData(vm.endpoint);
            }
        });

        // (Re)load the data when the endpoint is set or gets changed
        $scope.$watch('vm.endpoint', getData);

        // (Re)load the data when the user logs in or out or on a change of authorization level
        $scope.$watch(() => user.getUserType() + user.getAuthorizationLevel(), (newValue, oldValue) => {
            if (newValue !== oldValue) {
                getData(vm.endpoint);
            }
        });

        function getData (endpoint) {
            const state = store.getState();

            vm.location = null;

            vm.includeSrc = endpointParser.getTemplateUrl(endpoint);

            vm.geosearchButton = state.map.highlight ? false : nearestDetail.getLocation();

            const [category, subject] = endpointParser.getParts(endpoint);
            if (category === 'brk' && subject === 'subject' && !user.scopes['BRK/RS']) {
                // User is not authorized to view BRK Kadastrale Subjecten so do not fetch data
                vm.isLoading = false;
                delete vm.apiData;
            } else {
                api.getByUrl(endpoint).then(function (data) {
                    data = dataFormatter.formatData(data, subject);

                    vm.apiData = {
                        results: data
                    };

                    vm.filterSelection = {
                        [subject]: vm.apiData.results.naam
                    };

                    geometry.getGeoJSON(endpoint).then(function (geoJSON) {
                        if (geoJSON !== null) {
                            vm.location = crsConverter.rdToWgs84(geojson.getCenter(geoJSON));
                        }

                        store.dispatch({
                            type: ACTIONS.SHOW_DETAIL,
                            payload: {
                                display: data._display,
                                geometry: geoJSON,
                                isFullscreen: subject === 'api' || !geoJSON
                            }
                        });
                    }, errorHandler);
                }, errorHandler);
            }
        }

        function errorHandler () {
            store.dispatch({
                type: ACTIONS.SHOW_DETAIL,
                payload: {}
            });
        }
    }
})();
