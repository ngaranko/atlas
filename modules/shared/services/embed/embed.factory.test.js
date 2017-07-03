describe('The embed factory', function () {
    let embed,
        $location;

    beforeEach(function () {
        angular.mock.module('dpShared', {
            stateUrlConverter: {
                state2url: () => {
                    return '/#foo=1&bar=x';
                }
            }
        });

        angular.mock.inject(function (_$location_, _embed_) {
            $location = _$location_;
            embed = _embed_;
        });

        spyOn($location, 'protocol').and.returnValue('https');
        spyOn($location, 'host').and.returnValue('devil.com');
        spyOn($location, 'port').and.returnValue('666');
    });

    it('can create a embed link', function () {
        expect(embed.getLink({})).toBe('https://devil.com:666/#foo=1&bar=x');
    });

    it('can create a embed html', function () {
        expect(embed.getHtml({})).toBe('<iframe width="500" height="400" ' +
            'src="https://devil.com:666/#foo=1&bar=x" frameborder="0"></iframe>');
    });
});
