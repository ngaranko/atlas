import {
    isDataSelectionPage,
    isHomepage} from '../../../src/store/redux-first-router/selectors';
import { getViewMode, isMapActive, VIEW_MODE } from '../../../src/shared/ducks/ui/ui';

(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['store'];

    function HeaderController (store) {
        const vm = this;

        store.subscribe(update);
        update();

        function update () {
            const state = store.getState();

            vm.hasPrintButton = (!isDataSelectionPage(state) ||
                getViewMode(state) === VIEW_MODE.SPLIT) && !isHomepage(state);
            vm.hasEmbedButton = isMapActive(state);
        }
    }
})();
