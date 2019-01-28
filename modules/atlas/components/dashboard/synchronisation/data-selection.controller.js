(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('DataSelectionController', DataSelectionController);

    DataSelectionController.$inject = ['store'];

    function DataSelectionController (store) {
        var vm = this;

        store.subscribe(update);
        update();

        function update () {
            var state = store.getState();

            vm.boundingBox = state.map.boundingBox;
            vm.catalogFilters = state.catalogFilters;
            vm.dataSelectionState = state.dataSelection;
            vm.filters = state.filters;
            vm.zoomLevel = state.map.zoom;
        }
    }
})();
