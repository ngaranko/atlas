import { toPanorama } from '../../../../src/store/redux-first-router';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpStraatbeeldThumbnail', {
            bindings: {
                panorama: '<',
                isLoading: '<'
            },
            templateUrl: 'modules/shared/components/straatbeeld-thumbnail/straatbeeld-thumbnail.html',
            controller: DpStraatbeeldThumbnailController,
            controllerAs: 'vm'
        });

    DpStraatbeeldThumbnailController.$inject = ['sharedConfig'];

    function DpStraatbeeldThumbnailController (sharedConfig) {
        const vm = this;
        vm.radius = sharedConfig.RADIUS;

        function setLinkTo (panorama) {
            if (panorama) {
                vm.linkTo = toPanorama(panorama.id, panorama.heading);
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
