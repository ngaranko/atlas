(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpStraatbeeld', dpStraatbeeldDirective);

    dpStraatbeeldDirective.$inject = ['store', 'ACTIONS', 'marzipanoService', 'earthmine', 'orientation'];

    function dpStraatbeeldDirective (store, ACTIONS, marzipanoService, earthmine, orientation) {
        return {
            restrict: 'E',
            scope: {
                state: '='
            },
            templateUrl: 'modules/straatbeeld/components/straatbeeld/straatbeeld.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var container,
                viewer;

            container = element[0].querySelector('.js-marzipano-viewer');
            viewer = marzipanoService.initialize(container);

            scope.updateOrientation = function () {
                orientation.update(viewer, scope.state.car, scope.state.isLoading);
            };

            //Fetch the first scene (always based on location)
            scope.$watchCollection('state.searchLocation', function (location) {
                if (angular.isArray(location)) {
                    earthmine.getImageDataByCoordinates(
                        location[0],
                        location[1]
                    ).then(function (earthmineData) {
                        store.dispatch({
                            type: ACTIONS.SHOW_STRAATBEELD_INITIAL,
                            payload: earthmineData
                        });
                    });
                }
            });

            //Fetch scene #2-n
            scope.$watchCollection('state.id', function (newId, oldId) {
                if (angular.isNumber(newId) && oldId !== null) {
                    earthmine.getImageDataById(newId).then(function (earthmineData) {
                        store.dispatch({
                            type: ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT,
                            payload: earthmineData
                        });
                    });
                }
            });

            //Show new scene
            scope.$watchCollection('state.car.location', function (location) {
                if (angular.isArray(location)) {
                    marzipanoService.loadScene(
                        scope.state.id,
                        scope.state.car,
                        scope.state.camera,
                        scope.state.hotspots
                    );
                }
            });
        }
    }
})();
