import { degreesToRadians } from '../../../../src/shared/services/angle-conversion/angle-conversion';

(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('marzipanoService', marzipanoService);

    marzipanoService.$inject = ['Marzipano', 'STRAATBEELD_CONFIG', 'hotspotService'];

    function marzipanoService (Marzipano, STRAATBEELD_CONFIG, hotspotService) {
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

            source = Marzipano.ImageUrlSource.fromString(
                image.pattern,
                {
                    cubeMapPreviewUrl: image.preview
                }
            );

            viewLimiter = Marzipano.RectilinearView.limit.traditional(
                STRAATBEELD_CONFIG.MAX_RESOLUTION,
                degreesToRadians(STRAATBEELD_CONFIG.MAX_FOV)
            );

            view = new Marzipano.RectilinearView({}, viewLimiter);

            scene = viewer.createScene({
                source: source,
                geometry: new Marzipano.CubeGeometry(STRAATBEELD_CONFIG.LEVEL_PROPERTIES_LIST),
                view: view,
                pinFirstLevel: true
            });

            angular.copy(hotspots) // Do not mutate someone else's data collection!
                .sort(function (hotspotA, hotspotB) {
                    return hotspotB.distance - hotspotA.distance;
                })
                .forEach(function (hotspot) {
                    const hotspotPitch = calculateHotspotPitch(STRAATBEELD_CONFIG.CAMERA_HEIGHT, hotspot.distance);

                    hotspotService.createHotspotTemplate(hotspot.id, hotspot.distance, hotspotPitch, hotspot.year)
                        .then(function (template) {
                            var position = {
                                yaw: degreesToRadians(hotspot.heading),
                                pitch: hotspotPitch
                            };

                            scene.hotspotContainer().createHotspot(
                                template,
                                position
                            );
                        });
                });

            view.setYaw(degreesToRadians(heading));
            view.setPitch(degreesToRadians(pitch));
            view.setFov(degreesToRadians(fov));

            scene.switchTo();

            function calculateHotspotPitch (height, distance) {
                return Math.atan(height / distance);
            }
        }
    }
})();
