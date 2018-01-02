import { ERROR_TYPES } from '../../../../src/shared/ducks/error-message.js';

describe('The api-error component', function () {
    let $compile,
        $rootScope,
        currentStatus;
    const httpStatus = {
            NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
            LOGIN_ERROR: 'LOGIN_ERROR',
            getStatus: () => currentStatus,
            registerError: angular.noop
        },
        mockedUser = {
            authenticated: true,
            scopes: [],
            name: '',
            error: false
        };

    beforeEach(function () {
        angular.mock.module('dpShared', {
            httpStatus,
            dpPanelDirective: {}
        });

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
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
        scope.$apply();
        scope.user = user;

        return component;
    }

    it('is shown based on the httpStatus.hasErrors flag', function () {
        currentStatus = {};
        const component = getComponent();
        expect(component.find('.qa-api-error').attr('is-panel-visible')).toBe('vm.httpStatus.hasErrors');
    });

    it('shows a server error message when LOGIN_ERROR is set', function () {
        currentStatus = {
            hasErrors: true,
            LOGIN_ERROR: true,
            NOT_FOUND_ERROR: false
        };

        const component = getComponent();
        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(1);
        expect(component.find('.qa-api-server-error').length).toBe(0);
    });

    it('shows a not-found error message when NOT_FOUND_ERROR is set', function () {
        currentStatus = {
            hasErrors: true,
            NOT_FOUND_ERROR: true
        };

        const component = getComponent();
        expect(component.find('.qa-api-not-found-error').length).toBe(1);
        expect(component.find('.qa-api-login-error').length).toBe(0);
        expect(component.find('.qa-api-server-error').length).toBe(0);
    });

    it('defaults to a server error message without any error flags set', function () {
        currentStatus = {
            hasErrors: true
        };

        const component = getComponent();
        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(0);
        expect(component.find('.qa-api-server-error').length).toBe(1);
    });

    it('defaults to a server error message with an erroneous error flag set', function () {
        currentStatus = {
            hasErrors: true,
            FAULTY_ERROR_TYPE: true
        };

        const component = getComponent();
        expect(component.find('.qa-api-not-found-error').length).toBe(0);
        expect(component.find('.qa-api-login-error').length).toBe(0);
        expect(component.find('.qa-api-server-error').length).toBe(1);
    });

    it('triggers registerError when user error is detected', function () {
        const spy = spyOn(httpStatus, 'registerError');

        const user = {...mockedUser};
        getComponent(user);

        user.error = true;
        $rootScope.$digest();

        expect(spy).toHaveBeenCalledWith(ERROR_TYPES.LOGIN_ERROR);
    });
});
