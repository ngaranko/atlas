import { ERROR_TYPES } from '../../../../src/shared/ducks/error-message.js';

describe('The api-error component', function () {
    let $compile,
        $timeout,
        $rootScope,
        mockedState,
        subcribeListener;

    const mockedUser = {
        authenticated: true,
        scopes: [],
        name: '',
        error: false
    };

    beforeEach(function () {
        angular.mock.module('dpShared', {
            store: {
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

    it('is shown based on the vm.hasErrors flag', function () {
        const component = getComponent();
        expect(component.find('.qa-api-error').attr('is-panel-visible')).toBe('vm.hasErrors');
    });

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
        $rootScope.$digest();

        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(1);
        expect(component.find('.qa-api-server-error').length).toBe(0);
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
        $rootScope.$digest();

        expect(component.find('.qa-api-not-found-error').length).toBe(1);
        expect(component.find('.qa-api-login-error').length).toBe(0);
        expect(component.find('.qa-api-server-error').length).toBe(0);
    });

    it('defaults to a server error message without any error flags set', function () {
        mockedState = {
            error: {
                hasErrors: true,
                types: {}
            }
        };

        const component = getComponent();
        $rootScope.$digest();
        subcribeListener();
        $timeout.flush();
        $rootScope.$digest();
        $rootScope.$digest();

        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(0);
        expect(component.find('.qa-api-server-error').length).toBe(1);
    });

    it('shows user login error', function () {
        mockedState = {
            error: {
                hasErrors: false,
                types: {}
            }
        };

        const user = {...mockedUser};
        const component = getComponent(user);
        $rootScope.$digest();
        user.error = true;
        $rootScope.$digest();

        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(1);
        expect(component.find('.qa-api-server-error').length).toBe(0);
    });
});
