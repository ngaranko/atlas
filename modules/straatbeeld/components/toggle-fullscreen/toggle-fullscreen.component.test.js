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

        element = document.createElement('dp-straatbeeld-fullscreen');

        element.setAttribute('state', 'state');

        scope = $rootScope.$new();
        scope.state = state;
 
        result = $compile(element)(scope);
        scope.$apply();
 
        return result;
    }

    fdescribe ('The panorama', function () {

        it('can change a window-view straatbeeld to fullscreen', function () {
            
            let directive = getDirective({ isFullscreen: false });
            let toggle = directive.find('.qa-straatbeeld-streetview-map-button');
            
            expect(toggle.attr('class')).toContain('c-straatbeeld__streetview-map-icon--maximize');

            toggle.find('button').click();
            console.log('toggle', toggle);
            $rootScope.$apply();
           
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.STRAATBEELD_FULLSCREEN,
                payload: true
            });
        });
    });
});
