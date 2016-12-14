describe('The clusteredMarkersConfig factory', function () {
    let clusteredMarkersConfig,
        mockedCluster;

    beforeEach(function () {
        angular.mock.module('dpMap');

        angular.mock.inject(function (_clusteredMarkersConfig_) {
            clusteredMarkersConfig = _clusteredMarkersConfig_;
        });

        mockedCluster = {
            getChildCount: function () {
                return 123;
            }
        };
    });

    it('has an iconCreateFunction that returns a Leaflet icon with custom HTML', function () {
        const icon = clusteredMarkersConfig.iconCreateFunction(mockedCluster);

        expect(icon.options.className).toBe('o-highlight-cluster');
        expect(icon.options.html).toBe('<div class="o-highlight-cluster__text">123</div>');
    });
});
