import {
    ERROR_TYPES,
    resetGlobalError
} from '../../../../src/shared/ducks/error/error-message';

describe('The api-error component', function () {
    let $compile,
        $timeout,
        $rootScope,
        mockedState,
        subcribeListener,
        dispatch;

    const mockedUser = {
        authenticated: true,
        scopes: [],
        name: '',
        error: false
    };

    beforeEach(function () {
        dispatch = jasmine.createSpy('dispatch');
        angular.mock.module('dpShared', {
            store: {
                dispatch,
                subscribe: (listener) => subcribeListener = listener,
                getState: function () {
                    return angular.copy(mockedState);
                }
            },
            dpPanelDirective: {}
        });

        angular.mock.inject(function (_$compile_, _$rootScope_, _$timeout_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
        });

        mockedState = {
            error: {
                hasErrors: false,
                types: {}
            }
        };
    });

    function getComponent (user = mockedUser) {
        var component,
            element,
            scope;

        element = document.createElement('dp-api-error');
        element.setAttribute('user', 'user');

        scope = $rootScope.$new();
        component = $compile(element)(scope);
        scope.$digest();
        scope.user = user;

        return component;
    }

    it('shows login error message when LOGIN_ERROR is set', function () {
        mockedState = {
            error: {
                hasErrors: true,
                types: {
                    [ERROR_TYPES.LOGIN_ERROR]: true
                }
            }
        };

        const component = getComponent();
        $rootScope.$digest();
        subcribeListener();
        $timeout.flush();
        $rootScope.$digest();

        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(1);
        expect(component.find('.qa-api-general-error').length).toBe(0);
    });

    it('shows a not-found error message when NOT_FOUND_ERROR is set', function () {
        mockedState = {
            error: {
                hasErrors: true,
                types: {
                    [ERROR_TYPES.NOT_FOUND_ERROR]: true
                }
            }
        };

        const component = getComponent();
        $rootScope.$digest();
        subcribeListener();
        $timeout.flush();
        $rootScope.$digest();

        expect(component.find('.qa-api-not-found-error').length).toBe(1);
        expect(component.find('.qa-api-login-error').length).toBe(0);
        expect(component.find('.qa-api-general-error').length).toBe(0);
    });

    it('does nothing on normal store change', function () {
        mockedState = {
            error: {
                hasErrors: false
            }
        };

        const component = getComponent();
        $rootScope.$digest();
        subcribeListener();
        $timeout.flush();
        $rootScope.$digest();

        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(0);
        expect(component.find('.qa-api-general-error').length).toBe(0);
    });

    it('shows the general error message', function () {
        mockedState = {
            error: {
                hasErrors: true,
                types: {
                    [ERROR_TYPES.GENERAL_ERROR]: true
                }
            }
        };

        const component = getComponent();
        $rootScope.$digest();
        subcribeListener();
        $timeout.flush();
        $rootScope.$digest();

        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(0);
        expect(component.find('.qa-api-general-error').length).toBe(1);
    });

    it('shows user login error', function () {
        const user = {...mockedUser};
        const component = getComponent(user);
        $rootScope.$digest();
        user.error = true;
        $rootScope.$digest();

        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(1);
        expect(component.find('.qa-api-general-error').length).toBe(0);
    });

    it('resets errors on hide panel', () => {
        const component = getComponent();
        const controller = component.controller('dpApiError');

        controller.hide();

        expect(component.find('.qa-api-error').attr('close-action')).toBe('vm.hide()');
        expect(dispatch).toHaveBeenCalledWith(resetGlobalError());
    });
});
