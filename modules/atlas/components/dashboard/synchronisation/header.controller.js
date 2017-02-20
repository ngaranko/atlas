(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['store'];

    function HeaderController (store) {
        let vm = this;

        store.subscribe(update);
        update();

        function update () {
            const state = store.getState();

            const IS_DATA_SELECTION = angular.isObject(state.dataSelection);
            const IS_HOMEPAGE = angular.isObject(state.page) && state.page.name === 'home' &&
                !state.map.isFullscreen &&
                !angular.isObject(state.straatbeeld);

            vm.query = state.search && state.search.query;
            vm.hasPrintButton = !IS_DATA_SELECTION && !IS_HOMEPAGE;
        }
    }
})();
