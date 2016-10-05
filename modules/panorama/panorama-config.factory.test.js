describe('The panoramaConfig factory', function () {
    
    function prepareMocks (environmentName) {
        var panoramaConfig;

        angular.mock.module(
            'dpPanorama',
            function ($provide) {
                $provide.value('environment', {
                    NAME: environmentName
                });
            }
        );

        angular.mock.inject(function (_panoramaConfig_) {
            panoramaConfig = _panoramaConfig_;
        });

        return panoramaConfig;
    }

    describe('returns environment specific configuration', function () {
        it('development', function () {
            var panoramaConfig = prepareMocks('DEVELOPMENT');

            expect(panoramaConfig.PANORAMA_ENDPOINT)
                .toBe('https://api-acc.datapunt.amsterdam.nl/panorama/opnamelocatie/');
        });

        it('production', function () {
            var panoramaConfig = prepareMocks('PRODUCTION');

            expect(panoramaConfig.PANORAMA_ENDPOINT)
                .toBe('https://api.datapunt.amsterdam.nl/panorama/opnamelocatie/');
        });
    });
});