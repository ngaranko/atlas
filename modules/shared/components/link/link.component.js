(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLink', {
            template: require('./link.html'),
            transclude: true,
            bindings: {
                className: '@',
                inline: '@',
                hoverText: '@',
                type: '@',
                payload: '<',
                query: '<'
            },
            controller: DpLinkController,
            controllerAs: 'vm'
        });

    DpLinkController.$inject = ['$scope', 'store', '$location', '$window'];

    function DpLinkController ($scope, store, $location, $window) {
        const vm = this;
        vm.activeUrl = $location.url();

        vm.className = vm.className || 'o-btn o-btn--link';
        vm.inline = vm.inline || false;

        vm.dispatch = function () {
            store.dispatch(getAction(vm.type, vm.payload, vm.query));
        };

        function getAction (type, payload, query) {
            const action = {
                type
            };
            if (angular.isDefined(payload)) {
                action.payload = payload;
            }

            if (angular.isDefined(query)) {
                action.meta = {};
                action.meta.query = query;
            }
            return action;
        }
    }
})();
