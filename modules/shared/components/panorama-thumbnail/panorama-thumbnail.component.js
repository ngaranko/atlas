import { getDetailLocation, toPanorama } from '../../../../src/store/redux-first-router';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpPanoramaThumbnail', {
            bindings: {
                panorama: '<',
                isLoading: '<'
            },
            templateUrl: 'modules/shared/components/panorama-thumbnail/panorama-thumbnail.html',
            controller: DpPanoramaThumbnailController,
            controllerAs: 'vm'
        });

    DpPanoramaThumbnailController.$inject = ['sharedConfig', 'store'];

    function DpPanoramaThumbnailController (sharedConfig, store) {
        const vm = this;
        const state = store.getState();

        const reference = getDetailLocation(state);
        vm.radius = sharedConfig.RADIUS;

        function setLinkTo (panorama) {
            if (panorama) {
                vm.linkTo = toPanorama(
                    panorama.id,
                    panorama.heading,
                    reference
                );
            }
        }

        this.$onInit = function () {
            setLinkTo(vm.panorama);
        };

        this.$onChanges = function () {
            setLinkTo(vm.panorama);
        };
    }
})();
