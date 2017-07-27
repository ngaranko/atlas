describe('The uri stripper factory', function () {
    var uriStripper;

    beforeEach(function () {
        angular.mock.module('dpShared',
            function ($provide) {
                $provide.factory('sharedConfig', () => {
                    return {
                        API_ROOT: 'https://api.data.amsterdam.nl/',
                        CATALOGUS_ROOT: 'https://catalogus.data.amsterdam.nl/'
                    };
                });
            }
        );

        angular.mock.inject(function (_uriStripper_) {
            uriStripper = _uriStripper_;
        });
    });

    it('strips the API root from the URI', () => {
        expect(uriStripper.stripDomain(
            'https://api.data.amsterdam.nl/foo'
        )).toEqual({
            root: 'API_ROOT',
            endpoint: 'foo'
        });
        expect(uriStripper.stripDomain(
            'https://api.data.amsterdam.nl/meetbouten/meetbout/1234/'
        )).toEqual({
            root: 'API_ROOT',
            endpoint: 'meetbouten/meetbout/1234/'
        });
        expect(uriStripper.stripDomain(
            'https://api.data.amsterdam.nl/panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
        )).toEqual({
            root: 'API_ROOT',
            endpoint: 'panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
        });
    });

    it('strips the Catalogus root from the URI', () => {
        expect(uriStripper.stripDomain(
            'https://catalogus.data.amsterdam.nl/foo'
        )).toEqual({
            root: 'CATALOGUS_ROOT',
            endpoint: 'foo'
        });
        expect(uriStripper.stripDomain(
            'https://catalogus.data.amsterdam.nl/meetbouten/meetbout/1234/'
        )).toEqual({
            root: 'CATALOGUS_ROOT',
            endpoint: 'meetbouten/meetbout/1234/'
        });
        expect(uriStripper.stripDomain(
            'https://catalogus.data.amsterdam.nl/panorama/thumbnail/TMX1234-000030_pano_0001_000010/' +
                '?width=140&heading=26'
        )).toEqual({
            root: 'CATALOGUS_ROOT',
            endpoint: 'panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
        });
    });

    it('does not strip none API roots from the URI', () => {
        expect(uriStripper.stripDomain(
            'https://foo.amsterdam.nl/foo'
        )).toEqual({
            endpoint: 'https://foo.amsterdam.nl/foo'
        });

        expect(uriStripper.stripDomain(
            'https://data.amsterdam.nl/foo'
        )).toEqual({
            endpoint: 'https://data.amsterdam.nl/foo'
        });

        expect(uriStripper.stripDomain(
            'https://foo.data.amsterdam.nl/foo'
        )).toEqual({
            endpoint: 'https://foo.data.amsterdam.nl/foo'
        });
    });
});
