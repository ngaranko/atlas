(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionCards', {
            bindings: {
                content: '<'
            },
            controller: DpDataSelectionCardsController,
            templateUrl: 'modules/data-selection/components/cards/cards.html',
            controllerAs: 'vm'
        });

    DpDataSelectionCardsController.$inject = ['store', 'ACTIONS'];

    function DpDataSelectionCardsController (store, ACTIONS) {
        let vm = this;

        vm.fetch_detail = function (currentPage) {
            store.dispatch({
                type: ACTIONS.FETCH_DETAIL,
                payload: currentPage
            });
        };
    }
})();
