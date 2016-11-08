describe('The api-error component', function () {
    let $compile,
        $rootScope,
        currentStatus,
        httpStatus = {
            getStatus: () => currentStatus
        };

    beforeEach(function () {
        angular.mock.module('dpShared', { httpStatus });

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent () {
        var component,
            element,
            scope;

        element = document.createElement('dp-api-error');
        scope = $rootScope.$new();
        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('shows a server error message when the error type is set to SERVER', function () {
        currentStatus = {
            hasErrors: true,
            errorType: 'SERVER'
        };

        let component = getComponent();
        expect(component.find('.qa-api-server-error').length).toBe(1);
        expect(component.find('.qa-api-not-found-error').length).toBe(0);
    });

    it('shows a not-found error message when the error type is set to NOT_FOUND', function () {
        currentStatus = {
            hasErrors: true,
            errorType: 'NOT_FOUND'
        };

        let component = getComponent();
        expect(component.find('.qa-api-server-error').length).toBe(0);
        expect(component.find('.qa-api-not-found-error').length).toBe(1);
    });

    it('shows nothing without an error type', function () {
        currentStatus = {
            hasErrors: true
        };

        let component = getComponent();
        expect(component.find('.qa-api-server-error').length).toBe(0);
        expect(component.find('.qa-api-not-found-error').length).toBe(0);
    });

    it('shows nothing with an erroneous error type', function () {
        currentStatus = {
            hasErrors: true,
            errorType: 'FAULTY_ERROR_TYPE'
        };

        let component = getComponent();
        expect(component.find('.qa-api-server-error').length).toBe(0);
        expect(component.find('.qa-api-not-found-error').length).toBe(0);
    });

    it('shows nothing when there are no http errors', function () {
        currentStatus = {
            hasErrors: false
        };

        let component = getComponent();
        expect(component.find('.qa-api-server-error').length).toBe(0);
        expect(component.find('.qa-api-not-found-error').length).toBe(0);
    });
});
