describe('The dp-hotspot directive', function () {
    var $compile,
        $rootScope,
        store,
        ACTIONS;

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            {
                store: {
                    dispatch: function () {}
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _ACTIONS_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });
    });

    function getComponent (sceneId, distance) {
        var directive,
            element,
            scope;

        element = document.createElement('dp-hotspot');
        element.setAttribute('scene-id', 'sceneId');
        element.setAttribute('distance', 'distance');

        scope = $rootScope.$new();
        scope.sceneId = sceneId;
        scope.distance = distance;

        directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('creates a button with dimensions based on the distance', function () {
        var directive;

        directive = getComponent(1, 5);
        expect(directive.find('button').attr('style')).toContain('width: 55px; height: 55px;');

        directive = getComponent(1, 10);
        expect(directive.find('button').attr('style')).toContain('width: 50px; height: 50px;');
    });

    it('buttons have a minimum size regardless of the distance', function () {
        var directive = getComponent(1, 1000);
        expect(directive.find('button').attr('style')).toContain('width: 30px; height: 30px;');
    });

    it('clicking the hotspot will trigger the FETCH_STRAATBEELD action', function () {
        var directive;

        spyOn(store, 'dispatch');

        directive = getComponent(12589, 20);
        directive.find('button').click();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.FETCH_STRAATBEELD,
            payload: { id: 'ABC', isInitial: false }
        });
    });

    it('has a screen reader fallback text', function () {
        var directive;

        directive = getComponent(1, 5);
        expect(directive.find('button .u-sr-only').text()).toContain('Navigeer naar deze locatie');
    });
});
