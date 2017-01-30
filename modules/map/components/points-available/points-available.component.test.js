describe('The dp-points-available component', function () {
    var $compile,
        $rootScope,
        component,
        store,
        scope,
        drawTool;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            {
                store: {
                    dispatch: angular.noop
                },
                drawTool: {
                    initialize: angular.noop,
                    setPolygon: angular.noop,
                    isEnabled: angular.noop,
                    enable: angular.noop,
                    disable: angular.noop,
                    shape: {
                        markers: []
                    }
                }
            }
        );
        scope = {};

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _drawTool_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
        });

        spyOn(store, 'dispatch');
    });

    function getComponent () {
        let result,
            element;

        element = document.createElement('dp-points-available');

        scope = $rootScope.$new();

        scope.drawingMode = false;
        scope.markers = [];
        scope.markersLeft = 10;

        result = $compile(element)(scope);

        scope.$apply();

        return result;
    }

    fdescribe('when active', function () {
        it('shows countdown panel', function () {
            component = getComponent();

            console.log(component);

            expect(component.find('.c-points-available__panel').length).toBe(0);

            scope.drawingMode = true;
            $rootScope.$digest();

            expect(component.find('.c-points-available__panel').length).toBe(1);
        });
    });
});
