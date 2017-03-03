describe('The event component', function () {
    let $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module('dpPage');

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent (date) {
        var component,
            element,
            scope;

        element = document.createElement('dp-event');
        element.setAttribute('date', 'date');

        scope = $rootScope.$new();
        scope.date = date;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('shows the day and month', function () {
        let component = getComponent(new Date(2020, 0, 1));

        expect(component.find('.qa-event__day').text()).toBe('1');
        expect(component.find('.qa-event__month').text()).toBe('jan');
    });
});
