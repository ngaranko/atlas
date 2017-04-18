describe('The markdown parser', function () {
    let markdownParser;

    beforeEach(function () {
        angular.mock.module('dpShared',
            function ($provide) {
                $provide.constant('marked', (text) => 'marked' + text);
            }
        );

        angular.mock.inject(function (_markdownParser_) {
            markdownParser = _markdownParser_;
        });
    });

    it('uses the marked library to parse markdown text', function () {
        expect(markdownParser.parse('text')).toBe('markedtext');
    });
});
