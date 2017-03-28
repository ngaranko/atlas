describe('The dp-max-width-class directive', () => {
    let $compile,
        $rootScope,
        dashboardColumns,
        callbackFn;

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
                    hasLimitedWidth: angular.noop
                }
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_, _dashboardColumns_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            dashboardColumns = _dashboardColumns_;
        });

        spyOn(dashboardColumns, 'hasLimitedWidth').and.returnValue(false);
    });

    function getDirective (className) {
        const element = document.createElement('div');
        element.setAttribute('dp-max-width-class', className);

        const scope = $rootScope.$new();
        const directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('determines if the dashboard columns have a limited width', () => {
        getDirective('test-class');

        expect(dashboardColumns.hasLimitedWidth).toHaveBeenCalledWith('mockedState');
    });

    it('adds the specified css class to the element when the app has limited width', () => {
        dashboardColumns.hasLimitedWidth.and.returnValue(true);

        const directive = getDirective('test-class');

        expect(directive.hasClass('test-class')).toBe(true);
    });

    it('removes the specified css class from the element when the app has unlimited width', () => {
        const directive = getDirective('test-class');

        expect(directive.hasClass('test-class')).toBe(false);

        dashboardColumns.hasLimitedWidth.and.returnValue(true);
        callbackFn();
        $rootScope.$apply();
        expect(directive.hasClass('test-class')).toBe(true);

        dashboardColumns.hasLimitedWidth.and.returnValue(false);
        callbackFn();
        $rootScope.$apply();
        expect(directive.hasClass('test-class')).toBe(false);
    });
});
