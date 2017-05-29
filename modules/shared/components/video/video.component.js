(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpVideo', {
            templateUrl: 'modules/shared/components/video/video.html',
            controller: VideoController,
            controllerAs: 'vm',
            bindings: {
                src: '<',
                width: '<', // TODO: R: set and use
                height: '<'
            }
        });

    VideoController.$inject = ['$element'];

    function VideoController ($element) {
        const vm = this;
        let videoElement;

        vm.mouseOver = () => {
            videoElement.play();
        };

        vm.mouseOut = () => {
            videoElement.pause();
        };

        vm.$onInit = function () {
            videoElement = $element.find('video')[0];
        };
    }
})();
