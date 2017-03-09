describe('The dp-menu component', () => {
    let $compile,
        $rootScope,
        authenticator,
        user;

    beforeEach(() => {
        angular.mock.module(
            'dpHeader',
            {
                store: {
                    dispatch: angular.noop
                }
            },
            function ($provide) {
                $provide.factory('dpMenuDropdownDirective', function () {
                    return {};
                });
			}
        );

        angular.mock.inject((_$compile_, _$rootScope_, _authenticator_, _user_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            authenticator = _authenticator_;
            user = _user_;
        });

        spyOn(authenticator, 'login');
    });

    function getComponent (isToolbar) {
        let component,
            element,
            scope;

        element = document.createElement('dp-menu');
        element.setAttribute('is-toolbar', 'isToolbar');
        element.setAttribute('has-print-button', true);

        scope = $rootScope.$new();
        scope.isToolbar = Boolean(isToolbar);

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    describe('not logged in', () => {
        let component;

        beforeEach(() => {
            spyOn(user, 'getUserType').and.returnValue('ANONYMOUS');
            component = getComponent();
        });

        it('shows the login button', () => {
            expect(component.find('.qa-menu__login').length).toBe(1);
        });

        it('doesn\'t show the user menu', () => {
            expect(component.find('.qa-menu__user-menu').length).toBe(0);
        });
    });

    describe('logged in', () => {
        let component;

        beforeEach(() => {
            spyOn(user, 'getUserType').and.returnValue('AUTHENTICATED');
            component = getComponent();
        });

        it('doesn\'t show the login button', () => {
            expect(component.find('.qa-menu__login').length).toBe(0);
        });

        it('shows the user menu', () => {
            expect(component.find('.qa-menu__user-menu').length).toBe(1);
        });
    });

    describe('the login button', () => {
        let component;

        beforeEach(() => {
            spyOn(user, 'getUserType').and.returnValue('ANONYMOUS');
            component = getComponent();
        });

        it('calls user.login on click', () => {
            component.find('.qa-menu__login').click();
            expect(authenticator.login).toHaveBeenCalledWith();
        });
    });

    describe('when not displayed in a toolbar', () => {
        let component;

        beforeEach(() => {
            component = getComponent(false);
        });

        it('doesn\'t have a modifier on the root element', () => {
            expect(component.find('.qa-menu').prop('class')).not.toContain('c-menu--toolbar');
        });

        it('doesn\'t have a modifier on the login button', () => {
            expect(component.find('.qa-menu__login').prop('class')).not.toContain('c-menu__item--toolbar');
        });

        it('doesn\'t have a modifier on the other menu items', () => {
            component.find('.qa-menu__item').each((index, item) => {
                expect(item.getAttribute('class')).not.toContain('c-menu__item--toolbar');
            });
        });
    });

    describe('when displayed in a toolbar', () => {
        let component;

        beforeEach(() => {
            component = getComponent(true);
        });

        it('has a modifier on the root element', () => {
            expect(component.find('.qa-menu').prop('class')).toContain('c-menu--toolbar');
        });

        it('has a modifier on the login button', () => {
            expect(component.find('.qa-menu__login').prop('class')).toContain('c-menu__item--toolbar');
        });

        it('has a modifier on the other menu items', () => {
            component.find('.qa-menu__item').each((index, item) => {
                expect(item.getAttribute('class')).toContain('c-menu__item--toolbar');
            });
        });
    });
});
