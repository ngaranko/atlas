describe('The dp-dcatd-button component', function () {
    let $compile;
    let $rootScope;
    let $window;
    // let origAuth;

    beforeEach(function () {
        angular.mock.module('dpDcatdButton');

        angular.mock.inject(function (_$compile_, _$rootScope_, _$window_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $window = _$window_;
        });

        // origAuth = $window.auth;
        // $window.auth = {
        //     logout: angular.noop
        // };
    });

    afterEach(() => {
        // $window.auth = origAuth;
    });

    function getComponent () {
        var component,
            element,
            scope;

        element = document.createElement('dp-dcatd-button');

        scope = $rootScope.$new();
        component = $compile(element)(scope);
        scope.$digest();

        return component;
    }

    it('logs the user out when clicking the button', function () {
        var component;

        // spyOn($window.auth, 'logout');

        component = getComponent();
        component.find('button').click();

        // expect($window.auth.logout).toHaveBeenCalled();
    });
});
