describe('The dp-print-state directive', function () {
    var $compile,
        $rootScope,
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

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
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

    it('adds a printmode class to the element when isPrintMode is true', function () {
        var directive;

        mockedState = {atlas: {isPrintMode: true}};

        directive = getDirective();

        expect(directive.hasClass('is-print-mode')).toBe(true);
    });

    it('does not add a class to the element when isPrintMode is false', function () {
        var directive;

        mockedState = {atlas: {isPrintMode: false}};

        directive = getDirective();

        expect(directive.hasClass('is-print-mode')).toBe(false);
    });

    describe('landscape', () => {
        beforeEach(() => {
            mockedState = {
                atlas: {
                    isPrintMode: true
                },
                map: {
                    isFullscreen: false
                }
            };
        });

        it('adds the class when at straatbeeld', () => {
            mockedState.straatbeeld = {};
            const directive = getDirective();
            expect(directive.hasClass('is-print-mode--landscape')).toBe(true);
        });

        it('adds the class when at the map', () => {
            mockedState.map.isFullscreen = true;
            const directive = getDirective();
            expect(directive.hasClass('is-print-mode--landscape')).toBe(true);
        });

        it('adds the class when at data selection in list view', () => {
            mockedState.dataSelection = {
                view: 'LIST'
            };
            const directive = getDirective();
            expect(directive.hasClass('is-print-mode--landscape')).toBe(true);
        });

        it('removes the class when not at straatbeeld, map or data selection', () => {
            const directive = getDirective();
            expect(directive.hasClass('is-print-mode--landscape')).toBe(false);
        });

        it('removes the class when at data selection in another view than list', () => {
            mockedState.dataSelection = {
                view: 'TABLE'
            };
            const directive = getDirective();
            expect(directive.hasClass('is-print-mode--landscape')).toBe(false);
        });
    });
});
