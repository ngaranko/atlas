(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpStraatbeeldThumbnail', {
            bindings: {
                location: '='
            },
            templateUrl: 'modules/shared/components/straatbeeld-thumbnail/straatbeeld-thumbnail.html',
            controller: AtlasStraatbeeldThumbnailController,
            controllerAs: 'vm'
        });

    AtlasStraatbeeldThumbnailController.$inject = ['detailConfig', 'api', 'store', 'ACTIONS' ];

    function AtlasStraatbeeldThumbnailController(detailConfig, api, store, ACTIONS) {
        var vm = this,
            imageUrl,
            heading,
            panoId;

        imageUrl = detailConfig.STRAATBEELD_THUMB_URL +
            '?lat=' + vm.location[0] +
            '&lon=' + vm.location[1] +
            '&width=240' +
            '&radius=100';

           
        api.getByUrl(imageUrl).then(function (thumbnailData) {
            heading = thumbnailData.heading;
            panoId = thumbnailData['pano_id'];
            
            if (angular.isObject(thumbnailData)) {
                vm.imageUrl = thumbnailData.url;

            }
        });

        vm.openStraatbeeld = function () {
            store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD,
                payload: { id: panoId, heading: heading, isInitial: true } 
            });
        };
    }
})();