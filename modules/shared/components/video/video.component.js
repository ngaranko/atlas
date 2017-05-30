(function () {
    'use strict';

    /**
     * The dpVideo component for mp4 video.
     * The video playback is governed by the play variable set from outside this component
     * width and height bindings are required so the browser can reserve spacing before video load.
     * A poster image (splash image) is set on Safari to prevent nothing being displayed.
     */

    angular
        .module('dpShared')
        .component('dpVideo', {
            templateUrl: 'modules/shared/components/video/video.html',
            controller: VideoController,
            controllerAs: 'vm',
            bindings: {
                src: '<',
                width: '<',
                height: '<',
                play: '<'
            }
        });

    VideoController.$inject = ['$element'];

    function VideoController ($element) {
        const vm = this;
        let videoElement;

        vm.$onInit = () => {
            videoElement = $element.find('video')[0];

            // Detect safari: https://stackoverflow.com/a/31732310/2583290
            const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent && !navigator.userAgent.match('CriOS');

            if (isSafari) {
                videoElement.setAttribute('poster', vm.src + '.jpg');
            }
        };

        vm.$onChanges = (changes) => {
            if (changes.play && videoElement) {
                if (changes.play.currentValue) {
                    videoElement.play();
                } else {
                    videoElement.pause();
                    videoElement.currentTime = 0;
                }
            }
        };
    }
})();
