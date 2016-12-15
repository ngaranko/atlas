(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpStraatbeeldFullscreen', dpStraatbeeldFullscreenDirective); 

    dpStraatbeeldFullscreenDirective.$inject = [
        '$rootScope',
        'store',
        'ACTIONS'
    ];

    function dpStraatbeeldFullscreenDirective (
        $rootScope,
        store,
        ACTIONS) {
        return {
            restrict: 'E',
            scope: {
                state: '='
            },
            templateUrl: 'modules/straatbeeld/components/toggle-fullscreen/toggle-fullscreen.html',
            link: linkFunction
        };

        function linkFunction (scope) {
            scope.toggleFullscreen = function () {
                // Dispatch an action to change the pano
                let isFullscreen = !scope.state.isFullscreen;
                console.log('is fs', isFullscreen);
                // Save the new state of the straatbeeld as a user setting
                //userSettings.fullscreenStraatbeeld.value = isFullscreen.toString();

                store.dispatch({
                    type: ACTIONS.STRAATBEELD_FULLSCREEN,
                    payload: isFullscreen
                });
            };
        }
    }
})();

