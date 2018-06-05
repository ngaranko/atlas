import stateUrlConverter from '../../../../../src/shared/services/routing/state-url-converter';

describe('The urlReducers factory', function () {
    var urlReducers;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_urlReducers_) {
            urlReducers = _urlReducers_;
        });

        spyOn(stateUrlConverter, 'params2state').and.
            callFake((oldState, payload) => angular.merge({}, oldState, payload));
    });

    describe('The URL_CHANGE reducer', function () {
        it('transforms an url into a state', function () {
            var output = urlReducers.URL_CHANGE({some: 'object'}, {someOther: 'object'});
            expect(output).toEqual(stateUrlConverter.params2state({some: 'object'}, {someOther: 'object'}));
        });
    });
});
