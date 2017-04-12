describe('The search title factory', function () {
    var searchTitle;

    beforeEach(function () {
        angular.mock.module(
            'dpSearchResults',
            function ($provide) {
                $provide.constant('SEARCH_CONFIG', {
                    QUERY_ENDPOINTS: [
                        {
                            slug: 'openbare_ruimte',
                            label_singular: 'Openbare ruimte',
                            label_plural: 'Openbare ruimtes',
                            uri: 'path/to/openbare_ruimte/'
                        }, {
                            slug: 'adres',
                            label_singular: 'Adres',
                            label_plural: 'Adressen',
                            uri: 'path/to/adres/'
                        }
                    ]
                });

                $provide.value('coordinatesFilter', function (input) {
                    return 'X, Y (' + input.join(', ') + ')';
                });
            }
        );

        angular.mock.inject(function (_searchTitle_) {
            searchTitle = _searchTitle_;
        });
    });

    it('can show the number of search results when searching with a query', function () {
        var titleData = searchTitle.getTitleData(45, 'westerpark', null, null);

        expect(titleData.title).toBe('Data (45)');
        expect(titleData.subTitle).toContain('\'westerpark\'');
    });

    it('returns an empty title and empty subtitle on a negative search result', function () {
        var titleData = searchTitle.getTitleData(-1, 'westerpark', null, null);

        expect(titleData.title).toBe('');
        expect(titleData.subTitle).toBe('');
    });

    it('returns an empty title and subtitle when no query or location is specified', function () {
        var titleData = searchTitle.getTitleData(-1, null, null, null);

        expect(titleData.title).toBe('');
        expect(titleData.subTitle).toBe('');
    });

    it('can show the number of search results when searching by location', function () {
        var titleData = searchTitle.getTitleData(46, null, [52.123, 4.789], null);

        expect(titleData.title).toBe('Data (46)');
        expect(titleData.subTitle).toContain('X, Y (52.123, 4.789)');
    });

    it('shows only the query in the title', function () {
        var titleData = searchTitle.getTitleData(47, 'westerpark', null, 'adres');

        // The category name will be converted to lowercase
        expect(titleData.title).toBe('Adressen met \'westerpark\'');
        expect(titleData.subTitle).toBeUndefined();
    });

    it('shows a message when no results have been found', function () {
        var titleData;

        // When searching by query
        titleData = searchTitle.getTitleData(0, 'westerpark', null, null);
        expect(titleData.title).toBe('Geen resultaten gevonden');
        expect(titleData.subTitle).toContain('\'westerpark\'');

        // When searching by location
        titleData = searchTitle.getTitleData(0, null, [52.123, 4.789], null);
        expect(titleData.title).toBe('Geen resultaten gevonden');
        expect(titleData.subTitle).toContain('X, Y (52.123, 4.789)');
    });
});
