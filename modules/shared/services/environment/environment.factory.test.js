describe('The environment factory', function () {
    let mockedHostname;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                $location: {
                    host: function () {
                        return mockedHostname;
                    }
                }
            }
        );
    });

    describe('returns different configuration based on the hostname', function () {
        it('has support for PRODUCTION', function () {
            mockedHostname = 'atlas.amsterdam.nl';

            angular.mock.inject(function (environment) {
                expect(environment).toEqual({
                    NAME: 'PRODUCTION'
                });
            });
        });

        it('also uses PRODUCTION on data.amsterdam.nl', function () {
            mockedHostname = 'data.amsterdam.nl';

            angular.mock.inject(function (environment) {
                expect(environment).toEqual({
                    NAME: 'PRODUCTION'
                });
            });
        });

        it('and a fallback to development for the rest', function () {
            const hostnames = ['localhost', 'example.com', 'acc.atlas.amsterdam.nl'];

            hostnames.forEach(function (hostname) {
                mockedHostname = hostname;

                angular.mock.inject(function (environment) {
                    expect(environment).toEqual({
                        NAME: 'DEVELOPMENT'
                    });
                });
            });
        });
    });
});
