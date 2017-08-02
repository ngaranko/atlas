describe('The hr-disclaimer component', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module('dpDetail');

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent () {
        var component,
            element,
            scope;

        element = document.createElement('dp-hr-disclaimer');

        scope = $rootScope.$new();

        component = $compile(element)(scope);

        scope.$apply();

        return component;
    }

    it('is shown in a info panel that can be closed', function () {
        const component = getComponent();

        expect(component.find('dp-panel').length).toBeTruthy();
    });
});
