(function () {
    angular
        .module('dpDetail')
        .component('dpDetail', {
            bindings: {
                endpoint: '@',
                isLoading: '='
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
        'crsConverter'
    ];

    function DpDetailController (
        $scope,
        store,
        ACTIONS,
        api,
        endpointParser,
        user,
        geometry,
        geojson,
        crsConverter) {
        var vm = this;

        // the actual user status
        vm.userStatus = user.getStatus();

        const getData = endpoint => {
            vm.location = null;

            api.getByUrl(endpoint).then(function (data) {
                vm.apiData = {
                    results: data
                };

                // Derive whether more info is available if the user would login
                vm.isMoreInfoAvailable = vm.apiData.results.is_natuurlijk_persoon && !vm.userStatus.isLoggedIn;

                vm.includeSrc = endpointParser.getTemplateUrl(endpoint);

                geometry.getGeoJSON(endpoint).then(function (geoJSON) {
                    if (geoJSON !== null) {
                        vm.location = crsConverter.rdToWgs84(geojson.getCenter(geoJSON));
                    }

                    store.dispatch({
                        type: ACTIONS.SHOW_DETAIL,
                        payload: {
                            display: data._display,
                            geometry: geoJSON
                        }
                    });
                });
            });
        };

        $scope.$watch('vm.endpoint', getData);

        $scope.$watch('vm.userStatus.isLoggedIn', (newValue, oldValue) => {
            if (newValue !== oldValue) {
                getData(vm.endpoint);
            }
        });
    }
})();
