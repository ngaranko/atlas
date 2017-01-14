describe('The printReducers factory', function () {
    var printReducers,
        ACTIONS,
        defaultState;

    defaultState = {
        map: {
            baseLayer: 'topografie',
            overlays: [],
            viewCenter: [52.3719, 4.9012],
            zoom: 9,
            showActiveOverlays: false,
            isFullscreen: false,
            isLoading: false
        },
        layerSelection: false,
        search: null,
        page: 'home',
        detail: null,
        straatbeeld: null,
        dataSelection: null,
        isPrintMode: false
    };

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_printReducers_, _ACTIONS_) {
            printReducers = _printReducers_;
            ACTIONS = _ACTIONS_;
        });
    });

    describe('SHOW_PRINT', function () {
        it('sets the isPrintMode variable to true', function () {
            var output = printReducers[ACTIONS.SHOW_PRINT.id](defaultState);

            expect(output.isPrintMode).toBe(true);
        });
    });

    describe('HIDE_PRINT', function () {
        it('sets the isPrintMode variable to false', function () {
            var inputState,
                output;

            inputState = angular.copy(defaultState);
            inputState.isPrintMode = true;

            output = printReducers[ACTIONS.HIDE_PRINT.id](inputState);

            expect(output.isPrintMode).toBe(false);
        });
    });
});
