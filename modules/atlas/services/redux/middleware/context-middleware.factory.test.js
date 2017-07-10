describe('The contextMiddleware factory', function () {
    const mockedStore = {
        getState: function () {
            return 'FAKE_STATE';
        }
    };
    const mockedNext = function (action) {
        return action;
    };
    const mockedAction = {};

    let contextMiddleware;
    let ACTIONS;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_contextMiddleware_, _ACTIONS_) {
            contextMiddleware = _contextMiddleware_;
            ACTIONS = _ACTIONS_;
        });

        mockedAction.type = 'FAKE_ACTION';
        mockedAction.payload = {};
    });

    it('calls the next action', function () {
        const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: 'FAKE_ACTION',
            payload: {}
        });
    });

    it('translates MAP_CLICK actions, default in search results', function () {
        mockedAction.type = ACTIONS.MAP_CLICK;

        const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION,
            payload: {}
        });
    });

    it('translates MAP_CLICK actions to straatbeeld updates when a straatbeeld is active', function () {
        mockedAction.type = ACTIONS.MAP_CLICK;
        mockedStore.getState = () => {
            return {
                straatbeeld: {
                    id: 'abc'
                }
            };
        };

        const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: ACTIONS.FETCH_STRAATBEELD_BY_LOCATION,
            payload: {}
        });
    });

    it('translates HIDE_STRAATBEELD action in SHOW_PAGE if there is a page active (but invisible)', () => {
        mockedAction.type = ACTIONS.HIDE_STRAATBEELD;
        mockedStore.getState = () => {
            return {
                page: {
                    name: 'home'
                },
                straatbeeld: {
                    location: [1, 2]
                }
            };
        };

        const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: ACTIONS.SHOW_PAGE,
            payload: {
                name: 'home'
            }
        });
    });

    it('translates HIDE_STRAATBEELD action in search results', function () {
        mockedAction.type = ACTIONS.HIDE_STRAATBEELD;
        mockedStore.getState = () => {
            return {
                straatbeeld: {
                    location: [1, 2]
                }
            };
        };

        const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION,
            payload: [1, 2]
        });
    });

    it('translates HIDE_STRAATBEELD action in fetch detail when details available', function () {
        mockedAction.type = ACTIONS.HIDE_STRAATBEELD;
        mockedStore.getState = () => {
            return {
                detail: {
                    endpoint: 'aap'
                }
            };
        };

        const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: ACTIONS.FETCH_DETAIL,
            payload: 'aap'
        });
    });

    describe('MAP_ZOOM', () => {
        it('adds \'ignore\' flag while drawing', function () {
            mockedAction.type = ACTIONS.MAP_ZOOM;
            mockedStore.getState = () => {
                return {
                    map: {
                        drawingMode: 'draw'
                    }
                };
            };

            const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

            expect(returnValue).toEqual({
                type: {
                    id: 'MAP_ZOOM',
                    replace: true,
                    ignore: true
                },
                payload: {}
            });
        });

        it('adds \'ignore\' flag while editing a drawing', function () {
            mockedAction.type = ACTIONS.MAP_ZOOM;
            mockedStore.getState = () => {
                return {
                    map: {
                        drawingMode: 'edit'
                    }
                };
            };

            const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

            expect(returnValue).toEqual({
                type: {
                    id: 'MAP_ZOOM',
                    replace: true,
                    ignore: true
                },
                payload: {}
            });
        });

        it('does not add \'ignore\' flag while not drawing', function () {
            mockedAction.type = ACTIONS.MAP_ZOOM;
            mockedStore.getState = () => {
                return {
                    map: {
                        drawingMode: 'none'
                    }
                };
            };

            const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

            expect(returnValue).toEqual({
                type: {
                    id: 'MAP_ZOOM',
                    replace: true
                },
                payload: {}
            });

            // With no map state at all
            mockedStore.getState = () => {
                return {
                };
            };

            const returnValueNoState = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

            expect(returnValueNoState).toEqual({
                type: {
                    id: 'MAP_ZOOM',
                    replace: true
                },
                payload: {}
            });
        });
    });

    describe('MAP_PAN', () => {
        it('adds \'ignore\' flag while drawing', function () {
            mockedAction.type = ACTIONS.MAP_PAN;
            mockedStore.getState = () => {
                return {
                    map: {
                        drawingMode: 'draw'
                    }
                };
            };

            const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

            expect(returnValue).toEqual({
                type: {
                    id: 'MAP_PAN',
                    replace: true,
                    ignore: true
                },
                payload: {}
            });
        });

        it('adds \'ignore\' flag while editing a drawing', function () {
            mockedAction.type = ACTIONS.MAP_PAN;
            mockedStore.getState = () => {
                return {
                    map: {
                        drawingMode: 'edit'
                    }
                };
            };

            const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

            expect(returnValue).toEqual({
                type: {
                    id: 'MAP_PAN',
                    replace: true,
                    ignore: true
                },
                payload: {}
            });
        });

        it('does not add \'ignore\' flag while not drawing', function () {
            mockedAction.type = ACTIONS.MAP_PAN;
            mockedStore.getState = () => {
                return {
                    map: {
                        drawingMode: 'none'
                    }
                };
            };

            const returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

            expect(returnValue).toEqual({
                type: {
                    id: 'MAP_PAN',
                    replace: true
                },
                payload: {}
            });

            // With no map state at all
            mockedStore.getState = () => {
                return {
                };
            };

            const returnValueNoState = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

            expect(returnValueNoState).toEqual({
                type: {
                    id: 'MAP_PAN',
                    replace: true
                },
                payload: {}
            });
        });
    });
});
