(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('marzipanoService', marzipanoService);

    marzipanoService.$inject = ['Marzipano', 'straatbeeldConfig', 'angleConversion', 'hotspotService'];

    function marzipanoService (Marzipano, straatbeeldConfig, angleConversion, hotspotService) {
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
            var view,
                viewLimiter,
                scene;

             
            viewLimiter = Marzipano.RectilinearView.limit.traditional(
                straatbeeldConfig.MAX_RESOLUTION,
                angleConversion.degreesToRadians(straatbeeldConfig.MAX_FOV)
            );
            var source = Marzipano.ImageUrlSource.fromString(image);

           
            view = new Marzipano.RectilinearView({}, viewLimiter);

            scene = viewer.createScene({
                source: source,
                geometry: new Marzipano.EquirectGeometry([{ width: 8000 }]),
                view: view,
                pinFirstLevel: true
            });

            hotspots.sort(function (hotspotA, hotspotB) {
                return hotspotB.distance - hotspotA.distance;
            }).forEach(function (hotspot) {
                hotspotService.createHotspotTemplate(hotspot.pano_id, 
                hotspot.distance, 
                hotspot.heading, 
                hotspot.pitch).then(function (template) {
                    var position = {
                        yaw: angleConversion.degreesToRadians(hotspot.heading),
                        //losse functie corrected pithc gront level ipv cametra hoogte + inverten
                        pitch: Math.atan(1 / hotspot.distance) - angleConversion.degreesToRadians(hotspot.pitch)
                    };
                    scene.hotspotContainer().createHotspot(
                        template,
                         position
                     );
                 });
            });

            view.setYaw(angleConversion.degreesToRadians(heading));
            view.setPitch(angleConversion.degreesToRadians(pitch));
            //view.setFov(straatbeeldConfig.DEFAULT_FOV);
            scene.switchTo();
        }
    }
})();

