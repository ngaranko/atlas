describe('The embedReducers factory', function () {
    var embedReducers,
        ACTIONS,
        defaultState;

    defaultState = {
        map: {
            baseLayer: 'topografie',
            overlays: [],
            viewCenter: [52.3719, 4.9012],
            zoom: 9,
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

        angular.mock.inject(function (_embedReducers_, _ACTIONS_) {
            embedReducers = _embedReducers_;
            ACTIONS = _ACTIONS_;
        });
    });

    describe('SHOW_EMBED_PREVIEW', function () {
        it('sets the isEmbedPreview variable to true', function () {
            var output = embedReducers[ACTIONS.SHOW_EMBED_PREVIEW.id](defaultState);

            expect(output.atlas.isEmbedPreview).toBe(true);
        });

        it('when atlas is not an object', function () {
            const inputState = angular.copy(defaultState);
            inputState.atlas = null;

            const output = embedReducers[ACTIONS.SHOW_EMBED_PREVIEW.id](inputState);
            expect(output.atlas).toBeNull();
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

        it('when atlas is not an object', function () {
            const inputState = angular.copy(defaultState);
            inputState.atlas = null;

            const output = embedReducers[ACTIONS.HIDE_EMBED_PREVIEW.id](inputState);
            expect(output.atlas).toBeNull();
        });
    });
});
