describe('The dp-toggle-straatbeeld-fullscreen component', function () {
    var $compile,
        $rootScope,
        store,
        scope,
        ACTIONS;

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            {
                store: {
                    dispatch: function () { }
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _ACTIONS_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        spyOn(store, 'dispatch');
    });

    function getDirective (state) {
        var result,
            element;

        element = document.createElement('dp-toggle-straatbeeld-fullscreen');

        element.setAttribute('state', 'state');

        scope = $rootScope.$new();
        scope.state = state;

        result = $compile(element)(scope);
        scope.$apply();

        return result;
    }

    describe ('The fullscreen button for panorama', function () {
        it('can change a window-view straatbeeld to fullscreen', function () {
            let directive = getDirective({ isFullscreen: false });
            let toggle = directive.find('.qa-toggle-straatbeeld-fullscreen');

            expect(toggle.attr('class')).toContain('toggle-straatbeeld-fullscreen--maximize');

            toggle.click();
            $rootScope.$apply();

            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.STRAATBEELD_FULLSCREEN,
                payload: true
            });

            scope.state.isFullscreen = true;

            toggle.click();
            $rootScope.$apply();

            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.STRAATBEELD_FULLSCREEN,
                payload: false
            });
        });

        it('can change a fullscreen straatbeeld to window-view', function () {
            let directive = getDirective({ isFullscreen: true });
            let toggle = directive.find('.qa-toggle-straatbeeld-fullscreen');

            toggle.click();
            $rootScope.$apply();

            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.STRAATBEELD_FULLSCREEN,
                payload: false
            });
        });
    });
});
