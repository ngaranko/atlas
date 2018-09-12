(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLink', {
            templateUrl: 'modules/shared/components/link/link.html',
            transclude: true,
            bindings: {
                className: '@',
                inline: '@',
                hoverText: '@',
                type: '@',
                payload: '<'
            },
            controller: DpLinkController,
            controllerAs: 'vm'
        });

    DpLinkController.$inject = ['$scope', 'store', 'ACTIONS', 'applicationState', '$location'];

    function DpLinkController ($scope, store, ACTIONS, applicationState, $location) {
        const vm = this;
        vm.activeUrl = $location.url();

        vm.className = vm.className || 'o-btn o-btn--link';
        vm.inline = vm.inline || false;

        $scope.$watch('vm.payload', function () {
            vm.href = getHref(vm.type, vm.payload);
            // Do not catch a click event and handle the state change
            // internally, this prevents users from CTRL/CMD clicking!
        });

        vm.dispatch = function () {
            store.dispatch(getAction(vm.type, vm.payload));
        };

        applicationState.getStore().subscribe(() => {
            // exclude the zoom level (mpz) and the location (mpv) from the tests
            var regex = /mpz=\d*&mpv=\d*.\d*:\d*.\d*/gi;
            const currentUrl = $location.url();
            if (currentUrl.replace(regex, '') !== vm.activeUrl.replace(regex, '')) {
                vm.href = getHref(vm.type, vm.payload);
                vm.activeUrl = currentUrl;
            }
        });

        function getAction (type, payload) {
            const action = {
                type: ACTIONS[type] || type
            };
            if (angular.isDefined(payload)) {
                action.payload = payload;
            }
            return action;
        }

        function getHref (type, payload) {
            // Remove state properties that do not relate to the url
            // by converting the state to a url and back
            // This prevents deep copying of large state objects in the reducer (eg dataSelection.markers)
            const reducer = applicationState.getReducer(),
                state = applicationState.getStore().getState(),
                params = applicationState.getStateUrlConverter().state2params(state),
                sourceState = applicationState.getStateUrlConverter().params2state({}, params),
                targetState = reducer(sourceState, getAction(type, payload));
            return applicationState.getStateUrlConverter().state2url(targetState);
        }
    }
})();
