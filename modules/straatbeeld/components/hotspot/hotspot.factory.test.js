describe('The hotspotService', function () {
    var $rootScope,
        hotspotService;

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            function ($provide) {
                $provide.factory('dpHotspotDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject(function (_$rootScope_, _hotspotService_) {
            $rootScope = _$rootScope_;
            hotspotService = _hotspotService_;
        });
    });

    it('creates hotspot HTML', function () {
        hotspotService.createHotspotTemplate(789, 15).then(function (template) {
            var html = template.outerHTML,
                scope = angular.element(template).scope();

            expect(html).toContain('<dp-hotspot scene-id="sceneId" distance="distance"');
            expect(scope.sceneId).toBe(789);
            expect(scope.distance).toBe(15);
        });

        $rootScope.$apply();
    });

    it('calculates the location of the hotspot', function () {
        var absolutePosition,
            camera,
            hotspot;

        camera = {
            heading: 2,
            pitch: 0.5
        };

        hotspot = {
            relativeLocation: {
                yaw: 0.5,
                pitch: 0.1
            }
        };

        absolutePosition = hotspotService.calculateHotspotPosition(camera, hotspot);

        expect(absolutePosition.yaw).toBe(-1.5);
        expect(absolutePosition.pitch).toBe(0.6);
    });
});
