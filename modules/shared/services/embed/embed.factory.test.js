describe('The embed factory', function () {
    let embed,
        $location;

    beforeEach(function () {
        angular.mock.module('dpShared', {
            stateUrlConverter: {
                state2url: () => {
                    return '#foo=1&bar=x';
                }
            }
        });

        angular.mock.inject(function (_$location_) {
            $location = _$location_;
        });

        spyOn($location, 'protocol').and.returnValue('https');
        spyOn($location, 'host').and.returnValue('data.amsterdam.nl');
        spyOn($location, 'port').and.returnValue('443');

        angular.mock.inject(function (_embed_) {
            embed = _embed_;
        });
    });

    it('can create a embed link', function () {
        expect(embed.getLink({})).toBe('https://data.amsterdam.nl/#foo=1&bar=x');
    });

    it('can create a embed html', function () {
        expect(embed.getHtml({})).toBe('<iframe width="500" height="400" ' +
            'src="https://data.amsterdam.nl/#foo=1&bar=x" frameborder="0"></iframe>');
    });

    it('creates a link without port 80', () => {
        $location.port.and.returnValue('80');
        expect(embed.getLink({})).toBe('https://data.amsterdam.nl/#foo=1&bar=x');
    });

    it('adds the port if not standard', () => {
        $location.port.and.returnValue('8080');
        expect(embed.getLink({})).toBe('https://data.amsterdam.nl:8080/#foo=1&bar=x');
    });
});
