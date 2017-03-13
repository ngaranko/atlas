describe('The dp-header component', () => {
    let $compile,
        $rootScope;

    beforeEach(() => {
        angular.mock.module(
            'dpHeader',
            {
                store: {
                    dispatch: angular.noop
                }
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent (query, isTall) {
        let component,
            element,
            scope;

        element = document.createElement('dp-header');
        element.setAttribute('query', query);
        element.setAttribute('has-print-button', 'hasPrintButton');
        element.setAttribute('is-tall', 'isTall');

        scope = $rootScope.$new();
        scope.hasPrintButton = true;
        scope.isTall = isTall;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('inserts the dp-search component and passes down a query string', () => {
        let component;

        // Without a query
        component = getComponent('', false);
        expect(component.find('dp-search')[0].getAttribute('query')).toBe('');

        // With a query
        component = getComponent('I_AM_A_FAKE_QUERY', false);
        expect(component.find('dp-search')[0].getAttribute('query')).toBe('I_AM_A_FAKE_QUERY');

        // Tall version
        // Without a query
        component = getComponent('', true);
        expect(component.find('dp-search')[0].getAttribute('query')).toBe('');

        // With a query
        component = getComponent('I_AM_A_FAKE_QUERY', true);
        expect(component.find('dp-search')[0].getAttribute('query')).toBe('I_AM_A_FAKE_QUERY');
    });

    describe('the short version', () => {
        let component;

        beforeEach(() => {
            component = getComponent('', false);
        });

        it('doesn\'t have a modifier on the header', () => {
            expect(component.find('.qa-site-header')[0].getAttribute('class'))
                .not.toContain('c-site-header--tall');
        });

        it('has the logo 3 wide', () => {
            expect(component.find('.qa-site-header__logo-col')[0].getAttribute('class'))
                .toContain('u-col-sm--3');
        });

        it('doesn\'t have a modifier on the logo', () => {
            expect(component.find('.qa-site-header__logo')[0].getAttribute('class'))
                .not.toContain('c-site-header__logo--tall');
        });

        it('doesn\'t have a toolbar', () => {
            expect(component.find('.qa-site-header__toolbar').length).toBe(0);
        });

        it('defines search only once, without modifier', () => {
            expect(component.find('.qa-site-header__search').length).toBe(1);
            expect(component.find('.qa-site-header__search')[0].getAttribute('class'))
                .not.toContain('c-site-header__search--toolbar');
        });

        it('defines the menu only once, 3 wide, without modifier', () => {
            expect(component.find('.qa-site-header__menu-col').length).toBe(1);
            expect(component.find('.qa-site-header__menu').length).toBe(1);
            expect(component.find('.qa-site-header__menu-col')[0].getAttribute('class'))
                .toContain('u-col-sm--3');
            expect(component.find('.qa-site-header__menu')[0].getAttribute('class'))
                .not.toContain('c-site-header__menu--toolbar');
        });

        it('doesn\'t have a contact link', () => {
            expect(component.find('.qa-site-header__contact').length).toBe(0);
        });
    });

    describe('the tall version', () => {
        let component;

        beforeEach(() => {
            component = getComponent('', true);
        });

        it('has a modifier on the header', () => {
            expect(component.find('.qa-site-header')[0].getAttribute('class'))
                .toContain('c-site-header--tall');
        });

        it('has the logo 6 wide', () => {
            expect(component.find('.qa-site-header__logo-col')[0].getAttribute('class'))
                .toContain('u-col-sm--6');
        });

        it('has a modifier on the logo', () => {
            expect(component.find('.qa-site-header__logo')[0].getAttribute('class'))
                .toContain('c-site-header__logo--tall');
        });

        it('has a toolbar', () => {
            expect(component.find('.qa-site-header__toolbar').length).toBe(1);
        });

        it('defines search only once, with a modifier', () => {
            expect(component.find('.qa-site-header__search').length).toBe(1);
            expect(component.find('.qa-site-header__search')[0].getAttribute('class'))
                .toContain('c-site-header__search--toolbar');
        });

        it('defines the menu only once, 6 wide, with a modifier', () => {
            expect(component.find('.qa-site-header__menu-col').length).toBe(1);
            expect(component.find('.qa-site-header__menu').length).toBe(1);
            expect(component.find('.qa-site-header__menu-col')[0].getAttribute('class'))
                .toContain('u-col-sm--6');
            expect(component.find('.qa-site-header__menu')[0].getAttribute('class'))
                .toContain('c-site-header__menu--toolbar');
        });

        it('has a contact link', () => {
            expect(component.find('.qa-site-header__contact').length).toBe(1);
        });
    });
});
