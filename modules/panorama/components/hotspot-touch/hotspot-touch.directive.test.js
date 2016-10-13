describe('Mobile click directive', function () {
    var $compile,
        $rootScope,
        mockedFunctions;

    beforeEach(function () {
        mockedFunctions = {
            callClick: function () { }
        };
        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        spyOn(mockedFunctions, 'callClick');
    });

    function getComponent () {
        var component,
            element,
            scope;

        element = document.createElement('button');
        element.setAttribute('dp-click', 'callClick()');

        scope = $rootScope.$new();
        scope.callClick = mockedFunctions.callClick;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    fit('checks for response on element on click and touch events', function () {
        var directive;

        directive = getComponent();
        console.log('x');
        directive.find('button').click();
        expect(mockedFunctions.callClick).toHaveBeenCalled();
        $rootScope.$apply();
        // directive.find('button').triggerHandler('touchstart');
        // expect(mockedFunctions.callClick).toHaveBeenCalledTimes(2);
    });
});
