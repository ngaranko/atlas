describe('The dp-data-selection-pagination-link component', function () {
    var $compile,
        $rootScope,
        store;

    beforeEach(function () {
        angular.mock.module(
            'dpDataSelection',
            {
                store: {
                    dispatch: function () {}
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
        });

        spyOn(store, 'dispatch');
    });

    function getComponent (link) {
        var component,
            element,
            scope;

        element = document.createElement('dp-data-selection-pagination-link');
        element.setAttribute('link', 'link');

        scope = $rootScope.$new();
        scope.link = link;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('shows a button for each enabled link', function () {
        var component = getComponent({
            label: 'Ik ben een knopske',
            action: { type: 'SOME_ACTION' },
            enabled: true
        });

        expect(component.find('button').length).toBe(1);
        expect(component.find('button').text()).toContain('Ik ben een knopske');

        // The direct descendant selector is needed because Angular adds others <span>'s when transcluding dp-link.
        expect(component.find('> span').length).toBe(0);
    });

    it('hides the button if the link is disabled', function () {
        var component = getComponent({
            label: 'Ik ben een knopske',
            action: { type: 'SOME_ACTION' },
            enabled: false
        });

        expect(component.find('button').length).toBe(0);
    });
});
