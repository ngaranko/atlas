describe('The dp-homepage component', () => {
    let $compile,
        $rootScope,
        store,
        ACTIONS;

    beforeEach(() => {
        angular.mock.module(
            'dpPage',
            {
                store: {
                    dispatch: angular.noop
                }
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_, _store_, _ACTIONS_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        spyOn(store, 'dispatch');
    });

    function getComponent () {
        let component,
            element,
            scope;

        element = document.createElement('dp-homepage');
        scope = $rootScope.$new();

        component = $compile(element)(scope);
        $rootScope.$apply();

        return component;
    }

    it('clicking on straatbeeld will dispatch FETCH_STRAATBEELD_BY_ID', () => {
        const component = getComponent();
        component.find('.qa-straatbeeld-link button').click();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.FETCH_STRAATBEELD_BY_ID,
            payload: jasmine.objectContaining({
                id: jasmine.any(String),
                heading: jasmine.any(Number),
                isInitial: true, // isInitial has to be true to make sure a new history entry is added
                isFullscreen: false
            })
        });
    });
});
