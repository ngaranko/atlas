describe('The dp-site-header component', () => {
    let $compile,
        $rootScope,
        $window,
        mockedUser,
        $timeout,
        originalWindow;

    beforeEach(() => {
        angular.mock.module(
            'dpHeader',
            {
                store: {
                    dispatch: angular.noop
                }
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_, _$window_, _$timeout_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $window = _$window_;
            $timeout = _$timeout_;
        });

        originalWindow = $window;

        $window.auth = {
            login: angular.noop
        };

        mockedUser = {
            authenticated: false,
            scopes: [],
            name: ''
        };
    });

    afterEach(() => {
        $window = originalWindow;
    });

    function getComponent (query, size) {
        const element = document.createElement('dp-site-header');
        element.setAttribute('query', query);
        element.setAttribute('has-print-button', true);
        element.setAttribute('has-embed-button', true);
        element.setAttribute('size', 'size');
        element.setAttribute('user', 'user');

        const scope = $rootScope.$new();
        scope.size = size;
        scope.user = mockedUser;

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    describe('setting search component', () => {
        beforeEach(() => {
            // mock all the React element creation methods
            $window.render = angular.noop;
            $window.SearchWrapper = 'fakeWrapper';
            $window.React = {
                createElement: angular.noop
            };
        });

        it('does the react createElement call', () => {
            // if we don't use this fakeCandidate, the test will fail:
            // TypeError: undefined is not a constructor (evaluating 'candidate.getAttribute(name)') thrown
            const fakeCandidate = {
                getAttribute: angular.noop
            };
            spyOn($window.document, 'querySelector').and.returnValue(fakeCandidate);
            spyOn($window, 'render').and.callThrough();
            getComponent('', 'short');

            $timeout.flush();
            expect($window.render).toHaveBeenCalled();
        });

        it('does not do the react createElement call', () => {
            spyOn($window.document, 'querySelector').and.returnValue(undefined);
            spyOn($window, 'render').and.callThrough();
            getComponent('', 'short');

            $timeout.flush();
            expect($window.render).not.toHaveBeenCalled();
        });
    });

    describe('the short version', () => {
        let component;

        beforeEach(() => {
            component = getComponent('', 'short');
        });

        it('has the short modifier on the header', () => {
            expect(component.find('.qa-site-header')[0].getAttribute('class'))
                .toContain('c-site-header--short');
            expect(component.find('.qa-site-header')[0].getAttribute('class'))
                .not.toContain('c-site-header--tall');
        });

        it('displays the right search bar', () => {
            expect(component.find('.c-site-header__search-tall').length).toBe(0);
            expect(component.find('.c-site-header__search-short').length).toBe(1);
        });

        it('doesn\'t have a toolbar', () => {
            expect(component.find('.qa-site-header__toolbar').length).toBe(0);
        });

        it('defines search only once, without modifier', () => {
            expect(component.find('.qa-site-header__search').length).toBe(1);
        });

        it('defines the menu only once, 4 wide, without modifier', () => {
            expect(component.find('.qa-site-header__menu-col').length).toBe(1);
            expect(component.find('.qa-site-header__menu').length).toBe(1);
            expect(component.find('.qa-site-header__menu-col')[0].getAttribute('class'))
                .toContain('u-col-sm--4');
        });

        it('doesn\'t have a contact link', () => {
            expect(component.find('.qa-site-header__contact').length).toBe(0);
        });
    });

    describe('the tall version', () => {
        let component;

        beforeEach(() => {
            component = getComponent('', 'tall');
        });

        it('has the tall modifier on the header', () => {
            expect(component.find('.qa-site-header')[0].getAttribute('class'))
                .not.toContain('c-site-header--short');
            expect(component.find('.qa-site-header')[0].getAttribute('class'))
                .toContain('c-site-header--tall');
        });

        it('displays the right search bar', () => {
            expect(component.find('.c-site-header__search-tall').length).toBe(1);
            expect(component.find('.c-site-header__search-short').length).toBe(0);
        });

        it('has a toolbar', () => {
            expect(component.find('.qa-site-header__toolbar').length).toBe(1);
        });

        it('defines search only once, with a modifier', () => {
            expect(component.find('.qa-site-header__search').length).toBe(1);
        });

        it('defines the menu only once, 6 wide, with a modifier', () => {
            expect(component.find('.qa-site-header__menu-col').length).toBe(1);
            expect(component.find('.qa-site-header__menu').length).toBe(1);
            expect(component.find('.qa-site-header__menu-col')[0].getAttribute('class'))
                .toContain('u-col-sm--6');
        });

        it('has a contact link', () => {
            expect(component.find('.qa-site-header__contact').length).toBe(1);
        });
    });
});
