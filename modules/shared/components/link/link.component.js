(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLink', {
            templateUrl: 'modules/shared/components/link/link.html',
            transclude: true,
            controller: DpLinkController,
            controllerAs: 'vm',
            bindings: {
                className: '@',
                hoverText: '@',
                type: '@',
                payload: '='
            }
        });

    DpLinkController.$inject = ['store', 'ACTIONS', 'reducer', 'stateToUrl'];

    function DpLinkController (store, ACTIONS, reducer, stateToUrl) {
        const vm = this;

        vm.className = vm.className || 'o-btn o-btn--link';

        store.subscribe(update);
        update();

        function update () {
            const oldState = store.getState(),
                action = {
                    type: ACTIONS[vm.type],
                    payload: vm.payload
                },
                newState = reducer(oldState, action),
                url = stateToUrl.create(newState);

            vm.url = url;
        }
    }
})();
