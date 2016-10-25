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

        // save the login status of the user on initial loading of the component
        vm.userIsLoggedIn = vm.userStatus.isLoggedIn;

        const getData = endpoint => {
            vm.location = null;

            api.getByUrl(endpoint).then(function (data) {
                vm.apiData = {
                    results: data
                };

                // Derive whether more info is available if the user would login
                vm.isMoreInfoAvailable = vm.apiData.results.is_natuurlijk_persoon && !vm.userIsLoggedIn;

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

        $scope.$watch('vm.userStatus.isLoggedIn', () => {
            // Trigger a reload of the data if the login state of the user at the time of loading the data
            // is no longer equal to the actual login state of the user
            if (vm.userIsLoggedIn !== vm.userStatus.isLoggedIn) {
                vm.userIsLoggedIn = vm.userStatus.isLoggedIn;
                getData(vm.endpoint);
            }
        });
    }
})();
