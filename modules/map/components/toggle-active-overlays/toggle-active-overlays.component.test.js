describe('The dp-toggle-active-overlays component', function () {
    var $compile,
        $rootScope,
        store,
        ACTIONS;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            {
                store: {
                    dispatch: function () {}
                }
            },
            function ($provide) {
                $provide.constant('OVERLAYS', {
                    SOURCES: {
                        overlay_a: {
                            minZoom: 8,
                            maxZoom: 16
                        },
                        overlay_b: {
                            minZoom: 10,
                            maxZoom: 14
                        }
                    }
                });
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

    function getComponent (overlays, showActiveOverlays) {
        var component,
            element,
            scope;

        element = document.createElement('dp-toggle-active-overlays');
        element.setAttribute('overlays', 'overlays');
        element.setAttribute('show-active-overlays', 'showActiveOverlays');

        scope = $rootScope.$new();
        scope.overlays = overlays;
        scope.showActiveOverlays = showActiveOverlays;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('doesn\'t show anything if there are no active overlays', function () {
        var component;

        // Without any overlays
        component = getComponent([], true);
        expect(component.find('.c-toggle-active-overlays').length).toBe(0);

        // With overlays
        component = getComponent([{id: 'overlay_a', isVisible: true}], true);
        expect(component.find('.c-toggle-active-overlays').length).toBe(1);
    });

    it('toggles between SHOW_MAP_ACTIVE_OVERLAYS and HIDE_MAP_ACTIVE_OVERLAYS', function () {
        var component;

        // With showActiveOverlays is false
        component = getComponent([{id: 'overlay_a', isVisible: true}], false);
        component.find('.c-toggle-active-overlays').click();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.SHOW_MAP_ACTIVE_OVERLAYS
        });

        // With showActiveOverlays is true
        component = getComponent([{id: 'overlay_a', isVisible: true}], true);
        component.find('.c-toggle-active-overlays').click();
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.HIDE_MAP_ACTIVE_OVERLAYS
        });
    });

    it('the toggle button has a variable title attribute value depending on the state', function () {
        var component;

        // When closed
        component = getComponent(
            [{id: 'overlay_a', isVisible: true}, {id: 'overlay_b', isVisible: true}],
            false
        );
        expect(component.find('.c-toggle-active-overlays').attr('title'))
            .toBe('Toon legenda van geselecteerde kaartlagen');

        // When opened
        component = getComponent(
            [{id: 'overlay_a', isVisible: true}, {id: 'overlay_b', isVisible: true}],
            true
        );
        expect(component.find('.c-toggle-active-overlays').attr('title'))
            .toBe('Sluit legenda van geselecteerde kaartlagen');
    });
});
