describe('The contextMiddleware factory', function () {
    let contextMiddleware,
        mockedStore = {
            getState: function () {
                return 'FAKE_STATE';
            }
        },
        mockedNext = function (action) {
            return action;
        },
        mockedAction = {
            type: 'FAKE_ACTION',
            payload: {}
        },
        ACTIONS = {
            MAP_CLICK: 'MAP_CLICK',
            FETCH_STRAATBEELD_BY_LOCATION: 'FETCH_STRAATBEELD_BY_LOCATION',
            FETCH_SEARCH_RESULTS_BY_LOCATION: 'FETCH_SEARCH_RESULTS_BY_LOCATION'
        };

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_contextMiddleware_, _ACTIONS_) {
            contextMiddleware = _contextMiddleware_;
            ACTIONS = _ACTIONS_;
        });
    });

    it('calls the next action', function () {
        let returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: 'FAKE_ACTION',
            payload: {}
        });
    });

    it('translates MAP_CLICK actions, default in search results', function () {
        mockedAction.type = ACTIONS.MAP_CLICK;

        let returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

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

        let returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: ACTIONS.FETCH_STRAATBEELD_BY_LOCATION,
            payload: {}
        });
    });

    it('translates CLOSE_STRAATBEELD action in search results', function () {
        mockedAction.type = ACTIONS.CLOSE_STRAATBEELD;
        mockedStore.getState = () => {
            return {
                straatbeeld: {
                    location: [1, 2]
                }
            };
        };

        let returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION,
            payload: [1, 2]
        });
    });
});
