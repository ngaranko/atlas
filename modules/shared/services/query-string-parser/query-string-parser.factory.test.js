describe('The query string parser factory', function () {
    let queryStringParser;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_queryStringParser_) {
            queryStringParser = _queryStringParser_;
        });
    });

    it('turns a query string into an object', () => {
        expect(
            queryStringParser('?a=b&one=1&bool=false')
        ).toEqual({
            a: 'b',
            one: '1',
            bool: 'false'
        });
    });

    it('ignores the first character', () => {
        expect(
            queryStringParser('/a=b&one=1&bool=false')
        ).toEqual({
            a: 'b',
            one: '1',
            bool: 'false'
        });
    });

    it('decodes keys and values', () => {
        expect(
            queryStringParser('?a=b%20c&one%2Ftwo=12')
        ).toEqual({
            a: 'b c',
            'one/two': '12'
        });
    });
});
