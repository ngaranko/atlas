describe('The dp-homepage component', () => {
    let $compile,
        $rootScope;

    beforeEach(() => {
        angular.mock.module(
            'dpPage',
            {
                store: {
                    dispatch: angular.noop
                }
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent () {
        let component,
            element,
            scope;

        element = document.createElement('dp-homepage');
        scope = $rootScope.$new();

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('ja man', () => {
        getComponent();

        expect(true).toBe(true);
    });
});
