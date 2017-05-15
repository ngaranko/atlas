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
        hotspotService.createHotspotTemplate(789, 15, 0.29, 2016).then(function (template) {
            var html = template.outerHTML,
                scope = angular.element(template).scope();

            expect(html).toContain('<dp-hotspot scene-id="sceneId" distance="distance" pitch="pitch" year="year"');
            expect(scope.sceneId).toBe(789);
            expect(scope.distance).toBe(15);
            expect(scope.pitch).toBe(0.29);
            expect(scope.year).toBe(2016);
        });

        $rootScope.$apply();
    });
});
