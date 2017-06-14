describe('The uri stripper factory', function () {
    var uriStripper;

    beforeEach(function () {
        angular.mock.module('dpShared',
            function ($provide) {
                $provide.factory('sharedConfig', () => {
                    return {
                        API_ROOT: 'https://api.data.amsterdam.nl/'
                    };
                });
            }
        );

        angular.mock.inject(function (_uriStripper_) {
            uriStripper = _uriStripper_;
        });
    });

    it('strips the API root from the URI', () => {
        expect(uriStripper.stripUri(
            'https://api.data.amsterdam.nl/foo'
        )).toBe(
            'foo'
        );
        expect(uriStripper.stripUri(
            'https://api.data.amsterdam.nl/meetbouten/meetbout/1234/'
        )).toBe(
            'meetbouten/meetbout/1234/'
        );
        expect(uriStripper.stripUri(
            'https://api.data.amsterdam.nl/panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
        )).toBe(
            'panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
        );
    });

    it('does not strip none API roots from the URI', () => {
        expect(uriStripper.stripUri(
            'https://foo.amsterdam.nl/foo'
        )).toBe(
            'https://foo.amsterdam.nl/foo'
        );

        expect(uriStripper.stripUri(
            'https://data.amsterdam.nl/foo'
        )).toBe(
            'https://data.amsterdam.nl/foo'
        );
    });
});
