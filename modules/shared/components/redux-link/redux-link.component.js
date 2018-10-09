import toUrl from 'redux-first-router-link/dist/toUrl';
import { selectLocationState } from 'redux-first-router';

// Angular version of https://github.com/faceyspacey/redux-first-router-link
(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpReduxLink', {
            template: require('./redux-link.html'),
            transclude: true,
            bindings: {
                to: '<',
                hoverText: '@'
            },
            controller: DpReduxLinkController,
            controllerAs: 'vm'
        });

    DpReduxLinkController.$inject = ['$scope', 'store'];

    function DpReduxLinkController ($scope, store) {
        const vm = this;
        const location = selectLocationState(store.getState());
        const { routesMap } = location;

        const updateLink = (to) => {
            vm.link = toUrl(to, routesMap);
        };

        this.$onChanges = (changes) => {
            if (changes.to) {
                updateLink(changes.to.currentValue);
            }
        };
    }
})();
