describe('The dp-shape-summary component', function () {
    var $compile,
        $rootScope,
        scope,
        drawTool;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            {
                drawTool: {
                    isEnabled: angular.noop,
                    shape: {
                        markers: [],
                        distanceTxt: 'distance',
                        areaTxt: 'area'
                    }
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _drawTool_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            drawTool = _drawTool_;
        });
    });

    function getComponent () {
        let element = document.createElement('dp-shape-summary');

        scope = $rootScope.$new();
        let result = $compile(element)(scope);

        scope.$apply();

        return result;
    }

    describe('When the draw tool is enabled', function () {
        beforeEach(function () {
            spyOn(drawTool, 'isEnabled').and.returnValue(true);
        });

        it('shows nothing', function () {
            drawTool.shape.markers = [1, 2, 3];
            let component = getComponent();
            expect(component.find('.qa-summary-available').length).toBe(0);
        });
    });

    describe('When the draw tool is disabled', function () {
        beforeEach(function () {
            spyOn(drawTool, 'isEnabled').and.returnValue(false);
        });

        it('shows a summary', function () {
            drawTool.shape.markers = [1, 2, 3];
            let component = getComponent();
            expect(component.find('.qa-summary-available').length).toBe(1);
        });
    });
});
