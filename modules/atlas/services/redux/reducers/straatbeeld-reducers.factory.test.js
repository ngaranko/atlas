describe('Straatbeeld reducers factory', function () {

    var straatbeeldReducers,
        inputState,
        ACTIONS;

    beforeEach(function () {
        angular.mock.module('atlas');
        angular.mock.inject(function (_straatbeeldReducers_, _DEFAULT_STATE_, _ACTIONS_) {
            straatbeeldReducers = _straatbeeldReducers_;
            inputState = angular.copy(_DEFAULT_STATE_);
            ACTIONS = _ACTIONS_;
        });

    });


    fdescribe('FETCH_STRAATBEELD', function () {
        var payload = {
            'panoId': 'ABC',
            'heading': 123,
            'isInitial': true
        };
        it('Set INITIAL panoId, heading, isInitial', function () {
            inputState.straatbeeld = null;
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining(payload));
        });
        it('Sets loading indication', function () {
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld.isLoading).toBe(true);
        });
        it('resets detail information', function () {
            inputState.detail = {
                endpoint: 'bag/verblijfsobject/123/',
                geometry: null,
                isLoading: false
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.detail).toBeNull();
        });
        it('resets search results', function () {
            inputState.search = {
                query: 'linnaeus',
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.search).toBeNull();

        });
    });

    describe('SHOW_STRAATBEELD', function() {
        it('Sets loading to false', function() {

        });
        
    });

     

});