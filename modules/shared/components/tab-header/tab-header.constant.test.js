describe('The TAB_HEADER_CONFIG', function () {
    let TAB_HEADER_CONFIG;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_TAB_HEADER_CONFIG_) {
            TAB_HEADER_CONFIG = _TAB_HEADER_CONFIG_;
        });
    });

    it('contains a configuration for the data-datasets tab header', function () {
        expect(Object.keys(TAB_HEADER_CONFIG['data-datasets'])).toEqual(['data', 'datasets']);
    });

    it('the data-datasets tab header configuration provides for a getPayload method for each tab', function () {
        expect(TAB_HEADER_CONFIG['data-datasets'].data.getPayload('payload')).toBe('payload');
        expect(TAB_HEADER_CONFIG['data-datasets'].datasets.getPayload('payload')).toEqual({
            dataset: 'catalogus',
            view: 'CARDS',
            query: 'payload',
            filters: {},
            page: 1
        });
    });

    it('allows for searching on an empty string', function () {
        expect(TAB_HEADER_CONFIG['data-datasets'].data.getPayload('')).toBe('""');
    });
});
