describe('The dp-menu component', () => {
    let $compile,
        $rootScope,
        store,
        user,
        mockedActions;

    beforeEach(() => {
        mockedActions = {
            SHOW_PAGE: {
                id: 'SHOW_PAGE'
            }
        };

        angular.mock.module(
            'dpHeader',
            {
                store: {
                    dispatch: angular.noop
                }
            },
            $provide => {
                $provide.constant('ACTIONS', mockedActions);
                $provide.factory('dpMenuDropdownDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_, _store_, _user_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            user = _user_;
        });

        spyOn(store, 'dispatch');
    });

    function getComponent (size) {
        const element = document.createElement('dp-menu');
        element.setAttribute('size', 'size');
        element.setAttribute('has-print-button', true);

        const scope = $rootScope.$new();
        scope.size = size;

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    describe('not logged in', () => {
        let component;

        beforeEach(() => {
            spyOn(user, 'getStatus').and.returnValue({isLoggedIn: false});
            component = getComponent('tall');
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
            spyOn(user, 'getStatus').and.returnValue({isLoggedIn: true});
            component = getComponent('tall');
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
            spyOn(user, 'getStatus').and.returnValue({isLoggedIn: false});
            component = getComponent('tall');
        });

        it('dispatches the SHOW_PAGE action with the login page', () => {
            component.find('.qa-menu__login').click();
            expect(store.dispatch).toHaveBeenCalledWith({
                type: mockedActions.SHOW_PAGE,
                payload: jasmine.objectContaining({
                    name: 'login'
                })
            });
        });
    });

    describe('size tall', () => {
        let component;

        beforeEach(() => {
            component = getComponent('tall');
        });

        it('has the tall modifier on the root element', () => {
            expect(component.find('.qa-menu').prop('class')).not.toContain('c-menu--short');
            expect(component.find('.qa-menu').prop('class')).toContain('c-menu--tall');
        });
    });

    describe('size short', () => {
        let component;

        beforeEach(() => {
            component = getComponent('short');
        });

        it('has the short modifier on the root element', () => {
            expect(component.find('.qa-menu').prop('class')).toContain('c-menu--short');
            expect(component.find('.qa-menu').prop('class')).not.toContain('c-menu--tall');
        });
    });
});
