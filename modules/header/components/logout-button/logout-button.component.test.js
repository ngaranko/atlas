describe('The dp-logout-button component', function () {
    var $compile,
        $rootScope,
        user;

    beforeEach(function () {
        angular.mock.module('dpHeader');

        angular.mock.inject(function (_$compile_, _$rootScope_, _user_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            user = _user_;
        });
    });

    function getComponent () {
        var component,
            element,
            scope;

        element = document.createElement('dp-logout-button');

        scope = $rootScope.$new();
        component = $compile(element)(scope);
        scope.$digest();

        return component;
    }

    it('logs the user out when clicking the button', function () {
        var component;

        spyOn(user, 'logout');

        component = getComponent();
        component.find('button').click();

        expect(user.logout).toHaveBeenCalled();
    });
});
