describe('The dp-data-selection-link component', () => {
    let $compile,
        $rootScope,
        store;

    beforeEach(() => {
        angular.mock.module(
            'dpDetail',
            {
                store: {
                    dispatch: angular.noop
                }
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_, _store_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
        });

        spyOn(store, 'dispatch');
    });

    function getComponent (activeFilters) {
        const element = document.createElement('dp-data-selection-links');
        element.setAttribute('active-filters', 'activeFilters');

        const scope = $rootScope.$new();
        scope.activeFilters = activeFilters;

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('renders a header for both BAG and HR', () => {
        const component = getComponent({});

        expect(component.find('.qa-bag dp-glossary-header').attr('definition')).toBe('NUMMERAANDUIDING');
        expect(component.find('.qa-bag dp-glossary-header').attr('use-plural')).toBe('true');

        expect(component.find('.qa-hr dp-glossary-header').attr('definition')).toBe('VESTIGING');
        expect(component.find('.qa-hr dp-glossary-header').attr('use-plural')).toBe('true');
    });

    it('has links to the LIST view of data-selection for both BAG and HR', () => {
        const activeFilters = {stadsdeel_naam: 'Noord', buurt_naam: 'Ghetto C'};
        const component = getComponent(activeFilters);

        expect(component.find('dp-link-react').length).toBe(2);
    });
});
