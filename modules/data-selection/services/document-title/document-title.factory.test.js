describe('The dpDataSelectionDocumentTitle factory', function () {
    let dpDataSelectionDocumentTitle,
        mockedBagState,
        mockedHrState,
        mockedCardsState;

    beforeEach(function () {
        angular.mock.module(
            'dpDataSelection',
            function ($provide) {
                $provide.constant('DATA_SELECTION_CONFIG', {
                    datasets: {
                        bag: {
                            TITLE: 'Adressen',
                            FILTERS: [
                                {
                                    slug: 'stadsdeel_naam',
                                    label: 'Stadsdeel'
                                },
                                {
                                    slug: 'buurt_naam',
                                    label: 'Buurt'
                                }
                            ]
                        },
                        hr: {
                            TITLE: 'Handelsregister',
                            FILTERS: []
                        },
                        catalogus: {
                            TITLE: 'Catalogus',
                            FILTERS: [
                                {
                                    slug: 'groups',
                                    label: 'Thema\'s'
                                }
                            ]
                        }
                    }
                });
            }
        );

        angular.mock.inject(function (_dpDataSelectionDocumentTitle_) {
            dpDataSelectionDocumentTitle = _dpDataSelectionDocumentTitle_;
        });

        mockedBagState = {
            dataset: 'bag',
            view: 'TABLE',
            filters: {}
        };

        mockedHrState = {
            dataset: 'hr',
            view: 'TABLE',
            filters: {}
        };

        mockedCardsState = {
            dataset: 'catalogus',
            view: 'CARDS',
            query: 'my query',
            filters: {}
        };
    });

    it('shows a different title based on the active view', function () {
        expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState)).toMatch(/^Tabel/);

        mockedBagState.view = 'LIST';
        expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState)).toMatch(/^Lijst/);
    });

    it('shows a special title when showing all datasets', function () {
        delete mockedCardsState.query;
        expect(dpDataSelectionDocumentTitle.getTitle(mockedCardsState)).toBe('Alle datasets');
    });

    it('shows a the datasets query for text search in datasets', function () {
        expect(dpDataSelectionDocumentTitle.getTitle(mockedCardsState)).toBe('Datasets met \'my query\'');
    });

    it('shows both the query and the active filter', function () {
        mockedCardsState.filters.groups = 'bestuur-en-organisatie';
        expect(dpDataSelectionDocumentTitle.getTitle(mockedCardsState))
            .toBe('Dataset Catalogus met \'my query\', bestuur-en-organisatie');
    });

    it('shows the title of the current dataset', function () {
        expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState)).toBe('Tabel Adressen');

        expect(dpDataSelectionDocumentTitle.getTitle(mockedHrState)).toBe('Tabel Handelsregister');
    });

    it('optionally lists the (selected values of the) active filters', function () {
        // One active filter
        mockedBagState.filters.stadsdeel_naam = 'Oost';
        expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState)).toBe('Tabel Adressen met Oost');

        // Two active filters (comma-separated_
        mockedBagState.filters.buurt_naam = 'Flevopark';
        expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState)).toBe('Tabel Adressen met Oost, Flevopark');
    });

    it('respects the filter order from DATA_SELECTION_CONFIG', function () {
        mockedBagState.filters = {
            stadsdeel_naam: 'Oost',
            buurt_naam: 'Flevopark'
        };

        expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState)).toBe('Tabel Adressen met Oost, Flevopark');
    });
});
