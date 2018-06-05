import stateUrlConverter from '../../../../src/shared/services/routing/state-url-converter';

describe('The embed factory', function () {
    let embed,
        portSpy,
        $location;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_$location_, _embed_) {
            $location = _$location_;
            embed = _embed_;
        });

        spyOn($location, 'protocol').and.returnValue('https');
        spyOn($location, 'host').and.returnValue('data.amsterdam.nl');
        portSpy = spyOn($location, 'port').and.returnValue('443');
        spyOn(stateUrlConverter, 'state2url').and.returnValue('#foo=1&bar=x');
    });

    it('can create a embed link', function () {
        expect(embed.getLink({})).toBe('https://data.amsterdam.nl/#foo=1&bar=x');
    });

    it('can create a embed html', function () {
        expect(embed.getHtml({})).toBe('<iframe width="500" height="400" ' +
            'src="https://data.amsterdam.nl/#foo=1&bar=x" frameborder="0"></iframe>');
    });

    it('creates a link without port 80', () => {
        portSpy.and.returnValue('80');
        expect(embed.getLink({})).toBe('https://data.amsterdam.nl/#foo=1&bar=x');
    });

    it('adds the port if not standard', () => {
        portSpy.and.returnValue('8080');
        expect(embed.getLink({})).toBe('https://data.amsterdam.nl:8080/#foo=1&bar=x');
    });
});
