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

    it('the data-datasets tab header configuration provides for a title, action and payload for each tab', function () {
        expect(TAB_HEADER_CONFIG['data-datasets'].data.title).toBe('Data');
        expect(TAB_HEADER_CONFIG['data-datasets'].data.action).toBe('FETCH_SEARCH_RESULTS_BY_QUERY');
        expect(TAB_HEADER_CONFIG['data-datasets'].data.setPayload('payload')).toBe('payload');

        expect(TAB_HEADER_CONFIG['data-datasets'].datasets.title).toBe('Datasets');
        expect(TAB_HEADER_CONFIG['data-datasets'].datasets.action).toBe('FETCH_DATA_SELECTION');
        expect(TAB_HEADER_CONFIG['data-datasets'].datasets.setPayload('payload')).toEqual({
            dataset: 'catalogus',
            view: 'CARDS',
            query: 'payload',
            filters: {},
            page: 1
        });
    });

    it('allows for searching on an empty string', function () {
        expect(TAB_HEADER_CONFIG['data-datasets'].data.setPayload('')).toBe('""');
    });
});
