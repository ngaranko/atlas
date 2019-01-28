import * as stateUrlConverter from '../../../../src/shared/services/routing/state-url-converter';

describe('The stateToUrl factory', function () {
    var $location,
        stateToUrl,
        mockedState;

    beforeEach(function () {
        angular.mock.module('atlas');

        const state2params = jasmine.createSpy('state2params');
        state2params.and.returnValue('state2params mock');
        stateUrlConverter.default = {
            state2params
        };

        angular.mock.inject(function (_$location_, _stateToUrl_) {
            $location = _$location_;
            stateToUrl = _stateToUrl_;
            mockedState = {
                aap: 'noot',
                mies: 'teun'
            };
        });

        spyOn($location, 'replace');
        spyOn($location, 'search').and.returnValue({query: 'search', result: '%20space'});
    });

    describe('can update the url to reflect the state', function () {
        it('by calling $location.search', function () {
            stateToUrl.update(mockedState);
            expect($location.search).toHaveBeenCalledWith('state2params mock');
        });

        it('has the option to replace the URL by setting useReplace flag to true', function () {
            // regular call
            stateToUrl.update(mockedState);
            expect($location.replace).not.toHaveBeenCalled();
            expect($location.search).toHaveBeenCalled();

            $location.replace.calls.reset();
            $location.search.calls.reset();

            // call with useReplace flag set
            stateToUrl.update(mockedState, true);
            expect($location.replace).toHaveBeenCalled();
            expect($location.search).toHaveBeenCalled();
        });
    });
});
