describe('The apiConfig factory', function () {
    function prepareMocks (environmentName) {
        let apiConfig;

        angular.mock.module(
            'dpShared',
            function ($provide) {
                $provide.value('environment', {
                    NAME: environmentName
                });
            }
        );

        angular.mock.inject(function (_apiConfig_) {
            apiConfig = _apiConfig_;
        });

        return apiConfig;
    }

    describe('returns a combination of global and environment specific configuration', function () {
        it('DEVELOPMENT', function () {
            const apiConfig = prepareMocks('DEVELOPMENT');

            // Global config
            expect(apiConfig.AUTH).toBe('authenticatie/');

            // Environment config
            expect(apiConfig.ROOT).toBe('https://api.datapunt.amsterdam.nl/');
        });

        it('ACCEPTATION', function () {
            const apiConfig = prepareMocks('ACCEPTATION');

            // Global config
            expect(apiConfig.AUTH).toBe('authenticatie/');

            // Environment config
            expect(apiConfig.ROOT).toBe('https://api-acc.datapunt.amsterdam.nl/');
        });

        it('PRODUCTION', function () {
            const apiConfig = prepareMocks('PRODUCTION');

            // Global config
            expect(apiConfig.AUTH).toBe('authenticatie/');

            // Environment config
            expect(apiConfig.ROOT).toBe('https://api.datapunt.amsterdam.nl/');
        });
    });
});
