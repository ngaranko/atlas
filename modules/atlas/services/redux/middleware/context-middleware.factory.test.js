describe('The contextMiddleware factory', function () {
    var contextMiddleware,
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
        var returnValue;

        returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: 'FAKE_ACTION',
            payload: {}
        });
    });

    it('translates MAP_CLICK actions, default ot search results', function () {
        var returnValue;

        mockedAction.type = ACTIONS.MAP_CLICK;

        returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION,
            payload: {}
        });
    });

    it('translates MAP_CLICK actions to straatbeeld updates when a straatbeeld is active', function () {
        var returnValue;

        mockedAction.type = ACTIONS.MAP_CLICK;
        mockedStore.getState = () => {
            return {
                straatbeeld: {
                    id: 'abc'
                }
            };
        };

        returnValue = contextMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: ACTIONS.FETCH_STRAATBEELD_BY_LOCATION,
            payload: {}
        });
    });
});
