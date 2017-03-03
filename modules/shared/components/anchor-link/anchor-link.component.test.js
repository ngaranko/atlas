describe('The anchorLink component', function () {
    let $compile,
        $rootScope,
        anchor;

    beforeEach(function () {
        anchor = null;

        angular.mock.module('dpShared',
            $provide => {
                $provide.constant('$anchorScroll', value => anchor = value);
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent (link, className) {
        let component,
            element,
            scope;

        element = document.createElement('dp-anchor-link');
        element.setAttribute('link', link);
        element.setAttribute('class-name', className);

        scope = $rootScope.$new();

        element.innerText = 'Transcluded text';

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('accepts an optional classname', function () {
        let component = getComponent('', 'some className');
        expect(component.find('button').attr('class')).toContain('some className');
    });

    it('transcludes content', function () {
        let component = getComponent('a link', 'some className');
        expect(component.find('button').text()).toBe('Transcluded text');
    });

    it('can scroll to the specified link (bookmark)', function () {
        let component = getComponent('a link');
        component.find('button').click();
        expect(anchor).toBe('a link');
    });
});
