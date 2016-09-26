fdescribe('The dp-straatbeeld directive', function () {
    var $compile,
        $rootScope,
        $store,
        ACTIONS,
        $q;

    beforeEach(function () {

        angular.mock.module('dpStraatbeeld', {
            store: {
                dispatch: function () { }
            },
            marzipanoService: {
                initialize: function () { }
            },
            orientation: {
                update: function () { }
            },
            straatbeeldApi: {
                getImageDataById: function () {
                    var q = $q.defer();
                    q.resolve({ foo: 'bar' });
                    return q.promise;
                }
            }

        });

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _ACTIONS_, _$q_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $store = _store_;
            ACTIONS = _ACTIONS_;
            $q = _$q_;

        });

        spyOn($store, 'dispatch');

    });

    function getDirective(state, isPrintMode) {
        var el = document.createElement('dp-straatbeeld');
        el.setAttribute('state', 'state');
        el.setAttribute('is-print-mode', 'isPrintMode');

        var scope = $rootScope.$new();

        scope.state = state;
        scope.isPrintMode = isPrintMode;

        var directive = $compile(el)(scope);
        scope.$apply();

        return directive;

    }

    it('Does not call SHOW_STRAATBEELD_INITIAL Or SUBSEQUENT IF State.id is unknown', function () {
        var state = {};

        getDirective(state, false);

        expect($store.dispatch).not.toHaveBeenCalled();

    });
    it('Does call SHOW_STRAATBEELD_INITIAL', function () {
        var state = {
            id: 'ABC',
            isInitial: true
        };
        
        getDirective(state, false);

        expect($store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.SHOW_STRAATBEELD_INITIAL,
            payload: {
                foo: 'bar'
            }
        });
    });

     it('Does call SHOW_STRAATBEELD_SUBSEQUENT', function () {
        var state = {
            id: 'ABC',
            isInitial: false
        };

        getDirective(state, false);

        expect($store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT,
            payload: {
                foo: 'bar'
            }
        });
    });
});
