import ReactDOM from 'react-dom';
import { FETCH_STRAATBEELD_BY_ID } from '../../../../src/shared/ducks/straatbeeld/straatbeeld';

describe('The dp-homepage component', () => {
    let $compile,
        $rootScope,
        store,
        $window,
        $timeout,
        originalWindow;

    beforeEach(() => {
        angular.mock.module(
            'dpPage',
            {
                store: {
                    dispatch: angular.noop
                }
            },
            function ($provide) {
                $provide.constant('HOMEPAGE_CONFIG', {
                    PANORAMA: {
                        id: 'abc789',
                        heading: 45
                    }
                });
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_, _store_, _$window_, _$timeout_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            $window = _$window_;
            $timeout = _$timeout_;
        });

        originalWindow = $window;

        spyOn(store, 'dispatch');
    });

    afterEach(() => {
        $window = originalWindow;
    });

    function getComponent () {
        const element = document.createElement('dp-homepage');
        const scope = $rootScope.$new();

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    describe('setting search component', () => {
        // if we don't use this fakeCandidate, the test will fail:
        // TypeError: undefined is not a constructor (evaluating 'candidate.getAttribute(name)') thrown
        const fakeCandidate = {
            getAttribute: angular.noop
        };
        beforeEach(() => {
            // mock all the React element creation methods
            $window.render = angular.noop;
            $window.HomepageAddressBlockWrapper = 'fakeWrapper';
            $window.React = {
                createElement: () => 'fakeReactElement'
            };
            ReactDOM.unmountComponentAtNode = () => angular.noop();
        });

        it('does the react createElement call', () => {
            // if we don't use this fakeCandidate, the test will fail:
            // TypeError: undefined is not a constructor (evaluating 'candidate.getAttribute(name)') thrown
            spyOn($window.document, 'querySelector').and.returnValue(fakeCandidate);
            spyOn($window, 'render').and.callThrough();
            getComponent();

            $timeout.flush();
            expect($window.render).toHaveBeenCalledWith('fakeReactElement', fakeCandidate);
        });

        it('does not do the react createElement call', () => {
            spyOn($window.document, 'querySelector').and.returnValue(undefined);
            spyOn($window, 'render').and.callThrough();

            getComponent();

            $timeout.flush();
            expect($window.render).not.toHaveBeenCalledWith('fakeReactElement', fakeCandidate);
        });
    });
});
