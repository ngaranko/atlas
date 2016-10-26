describe('The api-error component', function () {
    let $compile,
        $rootScope,
        httpStatus;

    beforeEach(function () {
        angular.mock.module('dpShared', {
            'httpStatus': {
                status: {
                    hasErrors: false
                }
            }
        });

        angular.mock.inject(function (_$compile_, _$rootScope_, _httpStatus_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            httpStatus = _httpStatus_;
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

    it('shows an error message when there are any http errors', function () {
        httpStatus.status.hasErrors = true;

        let component = getComponent();
        expect(component.find('.qa-api-error').length).toBe(1);
    });

    it('shows nothing when there are no http errors', function () {
        httpStatus.status.hasErrors = false;

        let component = getComponent();
        expect(component.find('.qa-api-error').length).toBe(0);
    });
});
