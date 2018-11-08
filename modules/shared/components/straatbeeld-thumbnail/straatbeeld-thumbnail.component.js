import { toPanorama } from '../../../../src/app/routes';

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

        function setLinkTo(panorama) {
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

        // if (vm.panorama) {
        //     // Received information from parent, a.k.a dumb component
        //     vm.isLoading = false;
        //     vm.radius = sharedConfig.RADIUS;
        //     vm.imageUrl = vm.panorama.url;
        //     vm.hasThumbnail = true;
        //     vm.linkTo = toPanorama(vm.panoram.id, vm.panoram.heading);
        // } else {
        //     // DEPRECATED flow getting panorama ourselves.
        //     // TODO: refactor, remove this flow? Doesn't seem to be used
        //     console.error('Getting panorama preview the old way!'); // TODO: refactor, remove
        //     $scope.$watchCollection('vm.location', loc => {
        //         if (angular.isArray(loc)) {
        //             loadThumbnail();
        //         }
        //     });
        // }
        //
        // function loadThumbnail () {
        //     imageUrl = sharedConfig.API_ROOT +
        //         sharedConfig.STRAATBEELD_THUMB_URL +
        //         '?lat=' + vm.location[0] +
        //         '&lon=' + vm.location[1] +
        //         '&width=' + sharedConfig.THUMBNAIL_WIDTH +
        //         '&radius=' + sharedConfig.RADIUS;
        //
        //     vm.isLoading = true;
        //     vm.radius = sharedConfig.RADIUS;
        //
        //     api.getByUrl(imageUrl).then(function (thumbnailData) {
        //         heading = thumbnailData.heading;
        //         id = thumbnailData.pano_id;
        //
        //         if (!angular.isArray(thumbnailData)) {
        //             vm.imageUrl = thumbnailData.url;
        //             vm.hasThumbnail = true;
        //             vm.linkTo = toPanorama(id, heading);
        //         } else {
        //             vm.hasThumbnail = false;
        //         }
        //     }, (rejection) => {
        //         if (rejection.status === 404) {
        //             rejection.errorHandled = true;
        //         }
        //
        //         vm.hasThumbnail = false;
        //     }).finally(() => {
        //         vm.isLoading = false;
        //     });
        // }
    }
})();
