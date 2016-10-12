describe('The dp-print-state directive', function () {
    var $compile,
        $rootScope,
        store,
        mockedState;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            {
                store: {
                    subscribe: function (callbackFn) {
                        callbackFn();
                    },
                    getState: function () {
                        return mockedState;
                    }
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
        });
    });

    function getDirective () {
        var directive,
            element,
            scope;

        element = document.createElement('div');
        element.setAttribute('dp-print-state', '');

        scope = $rootScope.$new();

        directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('adds a class to the element when isPrintMode is true', function () {
        var directive;

        mockedState = {isPrintMode: true};

        directive = getDirective();

        expect(directive.hasClass('is-print-mode')).toBe(true);
    });

    it('does not add a class to the element when isPrintMode is false', function () {
        var directive;

        mockedState = {isPrintMode: false};

        directive = getDirective();

        expect(directive.hasClass('is-print-mode')).toBe(false);
    });
});
