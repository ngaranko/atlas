describe('The embedReducers factory', function () {
    var embedReducers,
        ACTIONS,
        DRAW_TOOL_CONFIG,
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

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_embedReducers_, _ACTIONS_, _DRAW_TOOL_CONFIG_) {
            embedReducers = _embedReducers_;
            ACTIONS = _ACTIONS_;
            DRAW_TOOL_CONFIG = _DRAW_TOOL_CONFIG_;
        });
    });

    describe('SHOW_EMBED_PREVIEW', function () {
        it('sets the isEmbedPreview variable to true', function () {
            var output = embedReducers[ACTIONS.SHOW_EMBED_PREVIEW.id](defaultState);

            expect(output.atlas.isEmbedPreview).toBe(true);
        });

        it('should reset drawing mode', function () {
            var output = embedReducers[ACTIONS.SHOW_EMBED_PREVIEW.id](defaultState);
            expect(output.map.drawingMode).toEqual(DRAW_TOOL_CONFIG.DRAWING_MODE.NONE);
        });
    });

    describe('HIDE_EMBED_PREVIEW', function () {
        it('sets the isEmbedPreview variable to false', function () {
            var inputState,
                output;

            inputState = angular.copy(defaultState);
            inputState.atlas.isEmbedMode = true;

            output = embedReducers[ACTIONS.HIDE_EMBED_PREVIEW.id](inputState);

            expect(output.atlas.isEmbedPreview).toBe(false);
        });

        it('should reset drawing mode', function () {
            var output = embedReducers[ACTIONS.HIDE_EMBED_PREVIEW.id](defaultState);
            expect(output.map.drawingMode).toEqual(DRAW_TOOL_CONFIG.DRAWING_MODE.NONE);
        });
    });
});
