(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLink', {
            templateUrl: 'modules/shared/components/link/link.html',
            transclude: true,
            bindings: {
                className: '@',
                hoverText: '@',
                type: '@',
                payload: '<'
            },
            controller: DpLinkController,
            controllerAs: 'vm'
        });

    DpLinkController.$inject = ['$location', 'store', 'ACTIONS', 'applicationState'];

    function DpLinkController ($location, store, ACTIONS, applicationState) {
        let vm = this;

        const BUTTON = 'button',
            LINK = 'a';

        vm.className = vm.className || 'o-btn o-btn--link';
        vm.tagName = getTagName(vm.type, vm.payload);

        vm.dispatch = function () {
            store.dispatch(getAction(vm.type, vm.payload));
        };

        function getAction (type, payload) {
            let action = {
                type: ACTIONS[type]
            };
            if (angular.isDefined(payload)) {
                action.payload = payload;
            }
            return action;
        }

        function getTagName (type, payload) {
            if (ACTIONS[vm.type].isButton) {
                return BUTTON;
            } else {
                let currentPath = '#' + decodeURIComponent($location.url()),
                    href = getHref(type, payload);

                if (currentPath === href) {
                    // Link to itself gets a button to force a page refresh
                    return BUTTON;
                } else {
                    vm.href = href;
                    vm.followLink = function (event) {
                        // The href attribute is ignored when left-clicking
                        // It's only a fallback for middle and right mouse button
                        event.preventDefault();
                        vm.dispatch();
                    };
                    return LINK;
                }
            }
        }

        function getHref (type, payload) {
            const reducer = applicationState.getReducer(),
                stateToUrl = applicationState.getStateToUrl(),
                oldState = applicationState.getStore().getState(),
                targetState = reducer(oldState, getAction(type, payload));

            return stateToUrl.create(targetState);
        }
    }
})();
