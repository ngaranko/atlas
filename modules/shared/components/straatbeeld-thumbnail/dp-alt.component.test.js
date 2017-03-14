describe('The dp-alt directive', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent () {
        let scope = $rootScope.$new(),
            component = $compile('<img src="srcUrl" dp-alt="altText">')(scope);

        return component;
    }

    it('sets the alt text when the src is loaded', function () {
        const component = getComponent();
        expect(component.attr('alt')).toBeUndefined();
        component.trigger('load');
        expect(component.attr('alt')).toBe('altText');
    });

    it('sets the alt text when the src fails to load', function () {
        const component = getComponent();
        expect(component.attr('alt')).toBeUndefined();
        component.trigger('error');
        expect(component.attr('alt')).toBe('altText');
    });
});
