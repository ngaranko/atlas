describe('The dataSelectionConfig factory', function () {
    function prepareMocks (environmentName) {
        let dataSelectionConfig;

        angular.mock.module(
            'dpDataSelection',
            function ($provide) {
                $provide.value('environment', {
                    NAME: environmentName
                });
            }
        );

        angular.mock.inject(function (_dataSelectionConfig_) {
            dataSelectionConfig = _dataSelectionConfig_;
        });

        return dataSelectionConfig;
    }

    describe('returns a combination of global and environment specific configuration', function () {
        it('PRODUCTION', function () {
            const dataSelectionConfig = prepareMocks('PRODUCTION');

            // Global config
            expect(dataSelectionConfig.options.MAX_NUMBER_OF_CLUSTERED_MARKERS).toBe(10000);
            expect(dataSelectionConfig.datasets.bag.ENDPOINT_ROOT).not.toBeDefined();

            // Environment config
            expect(dataSelectionConfig.datasets.catalogus.ENDPOINT_ROOT)
                .toBe('https://catalogus.data.amsterdam.nl/');
        });

        it('PRE_PRODUCTION', function () {
            const dataSelectionConfig = prepareMocks('PRE_PRODUCTION');

            // Global config
            expect(dataSelectionConfig.options.MAX_NUMBER_OF_CLUSTERED_MARKERS).toBe(10000);
            expect(dataSelectionConfig.datasets.bag.ENDPOINT_ROOT).not.toBeDefined();

            // Environment config
            expect(dataSelectionConfig.datasets.catalogus.ENDPOINT_ROOT)
                .toBe('https://catalogus.data.amsterdam.nl/');
        });

        it('ACCEPTATION', function () {
            const dataSelectionConfig = prepareMocks('ACCEPTATION');

            // Global config
            expect(dataSelectionConfig.options.MAX_NUMBER_OF_CLUSTERED_MARKERS).toBe(10000);
            expect(dataSelectionConfig.datasets.hr.ENDPOINT_ROOT).not.toBeDefined();

            // Environment config
            expect(dataSelectionConfig.datasets.catalogus.ENDPOINT_ROOT)
                .toBe('https://acc.catalogus.data.amsterdam.nl/');
        });

        it('DEVELOPMENT', function () {
            const dataSelectionConfig = prepareMocks('DEVELOPMENT');

            // Global config
            expect(dataSelectionConfig.options.MAX_NUMBER_OF_CLUSTERED_MARKERS).toBe(10000);
            expect(dataSelectionConfig.datasets.hr.ENDPOINT_ROOT).not.toBeDefined();

            // Environment config
            expect(dataSelectionConfig.datasets.catalogus.ENDPOINT_ROOT)
                .toBe('https://acc.catalogus.data.amsterdam.nl/');
        });
    });
});
