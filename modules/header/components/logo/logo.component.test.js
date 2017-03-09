describe('The dp-logo component', () => {
    let $compile,
        $rootScope;

    beforeEach(() => {
        angular.mock.module(
            'dpHeader',
            {
                store: {
                    dispatch: function () {}
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent (isTall) {
        var component,
            element,
            scope;

        element = document.createElement('dp-logo');
        element.setAttribute('is-tall', 'isTall');

        scope = $rootScope.$new();
        scope.isTall = isTall;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    describe('the short version', () => {
        let component;

        beforeEach(() => {
            component = getComponent(false);
        });

        it('doesn\'t have a modifier on the root element', () => {
            expect(component.find('.qa-logo')[0].getAttribute('class')).not.toContain('c-logo--tall');
        });

        it('has the logo 4 wide', () => {
            expect(component.find('.qa-logo__image-col')[0].getAttribute('class')).toContain('u-col-sm--4');
        });

        it('has the title 8 wide', () => {
            expect(component.find('.qa-logo__title-col')[0].getAttribute('class')).toContain('u-col-sm--8');
        });

        it('shows the short logo image', () => {
            expect(component.find('.qa-logo__image')[0].getAttribute('src')).toContain('logo-small.');
        });
    });

    describe('the tall version', () => {
        let component;

        beforeEach(() => {
            component = getComponent(true);
        });

        it('has a modifier on the root element', () => {
            expect(component.find('.qa-logo')[0].getAttribute('class')).toContain('c-logo--tall');
        });

        it('has the logo 2 wide', () => {
            expect(component.find('.qa-logo__image-col')[0].getAttribute('class')).toContain('u-col-sm--2');
        });

        it('has the title 10 wide', () => {
            expect(component.find('.qa-logo__title-col')[0].getAttribute('class')).toContain('u-col-sm--10');
        });

        it('shows the tall logo image', () => {
            expect(component.find('.qa-logo__image')[0].getAttribute('src')).toContain('logo.');
        });
    });
});
