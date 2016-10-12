(function () {
    'use strict';

    angular
        .module('dpPanorama')
        .factory('marzipanoService', marzipanoService);

    marzipanoService.$inject = ['Marzipano', 'panoramaConfig', 'angleConversion', 'hotspotService'];

    function marzipanoService (Marzipano, panoramaConfig, angleConversion, hotspotService) {
        var viewer;

        return {
            initialize: initialize,
            loadScene: loadScene
        };

        /*
         * @param {Object} domElement - An HtmlNode
         *
         * @returns {Object} - A Marzipano Viewer instance
         */
        function initialize (domElement) {
            viewer = new Marzipano.Viewer(domElement, {
                stageType: null,
                stage: {
                    preserveDrawingBuffer: true
                }
            });
            return viewer;
        }

        function loadScene (image, heading, pitch, fov, hotspots) {
            var source,
                view,
                viewLimiter,
                scene;

            viewLimiter = Marzipano.RectilinearView.limit.traditional(
                panoramaConfig.MAX_RESOLUTION,
                angleConversion.degreesToRadians(panoramaConfig.MAX_FOV)
            );

            source = Marzipano.ImageUrlSource.fromString(image + '{z}/{f}/{y}/{x}.jpg');

            view = new Marzipano.RectilinearView({}, viewLimiter);

            scene = viewer.createScene({
                source: source,
                geometry: new Marzipano.CubeGeometry([
                    { tileSize: 256, size: 256, fallbackOnly: true },
                    { tileSize: 512, size: 512 },
                    { tileSize: 512, size: 1024 },
                    { tileSize: 512, size: 2048 }
                ]),
                view: view,
                pinFirstLevel: true
            });

            hotspots.sort(function (hotspotA, hotspotB) {
                return hotspotB.distance - hotspotA.distance;
            }).forEach(function (hotspot) {
                hotspotService.createHotspotTemplate(hotspot.id, hotspot.distance).then(function (template) {
                    var position = {
                        yaw: angleConversion.degreesToRadians(hotspot.heading),
                        pitch: calculateHotspotPitch(panoramaConfig.CAMERA_HEIGHT, hotspot.distance)
                    };
                    scene.hotspotContainer().createHotspot(
                        template,
                        position
                     );
                 });
            });

            view.setYaw(angleConversion.degreesToRadians(heading));
            view.setPitch(angleConversion.degreesToRadians(pitch));
            view.setFov(angleConversion.degreesToRadians(fov));

            scene.switchTo();

            function calculateHotspotPitch(height, distance) {
                return Math.atan(height/distance);
            }
            
        }
    }
})();

