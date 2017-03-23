describe('The dp-max-width-class directive', () => {
    let $compile,
        $rootScope,
        dashboardColumns,
        callbackFn,
        visibility;

    beforeEach(() => {
        angular.mock.module(
            'atlas',
            {
                store: {
                    subscribe: (fn) => {
                        callbackFn = fn;
                        callbackFn();
                    },
                    getState: () => {
                        return 'mockedState';
                    }
                },
                dashboardColumns: {
                    determineVisibility: () => visibility
                }
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_, _dashboardColumns_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            dashboardColumns = _dashboardColumns_;
        });

        visibility = {
            page: false
        };

        spyOn(dashboardColumns, 'determineVisibility').and.callThrough();
    });

    function getDirective (className) {
        const element = document.createElement('div');
        element.setAttribute('dp-max-width-class', className);

        const scope = $rootScope.$new();
        const directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('calls dashboardColumns.determineVisibility with the state', () => {
        getDirective('test-class');

        expect(dashboardColumns.determineVisibility).toHaveBeenCalledWith('mockedState');
    });

    it('adds u-background-color__secondary--gray10 class to the element when a page is visible', () => {
        visibility.page = true;

        const directive = getDirective('test-class');

        expect(directive.hasClass('test-class')).toBe(true);
    });

    it('removes u-background-color__secondary--gray10 class from the element when a page is not visible', () => {
        const directive = getDirective('test-class');

        expect(directive.hasClass('test-class')).toBe(false);

        visibility.page = true;
        callbackFn();
        $rootScope.$apply();
        expect(directive.hasClass('test-class')).toBe(true);

        visibility.page = false;
        callbackFn();
        $rootScope.$apply();
        expect(directive.hasClass('test-class')).toBe(false);
    });
});
