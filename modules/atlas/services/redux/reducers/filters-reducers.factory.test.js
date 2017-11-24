describe('The filtersReducers factory', function () {
    var filtersReducers,
        ACTIONS,
        defaultState,
        mockFilters;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_filtersReducers_, _ACTIONS_) {
            filtersReducers = _filtersReducers_;
            ACTIONS = _ACTIONS_;
        });

        defaultState = {
            map: {
                baseLayer: 'topografie',
                overlays: [],
                viewCenter: [52.3719, 4.9012],
                zoom: 9,
                isFullscreen: false,
                isLoading: false
            },
            filters: {},
            layerSelection: {
                isEnabled: false
            },
            search: null,
            page: {
                name: 'home'
            },
            detail: null,
            straatbeeld: null,
            dataSelection: null,
            atlas: {
                isPrintMode: false,
                isEmbedPreview: false
            }
        };

        mockFilters = {
            groups: 'economie-haven'
        };
    });

    describe('APPLY_FILTERS', function () {
        it('saves the current filters', function () {
            var output = filtersReducers[ACTIONS.APPLY_FILTERS.id](defaultState, mockFilters);

            expect(output.filters).toEqual(mockFilters);
        });
    });

    describe('EMPTY_FILTERS', function () {
        it('saves the current filters', function () {
            defaultState.filters = angular.copy(mockFilters);

            var output = filtersReducers[ACTIONS.EMPTY_FILTERS.id](defaultState);

            expect(output.filters).toEqual({});
        });
    });
});
