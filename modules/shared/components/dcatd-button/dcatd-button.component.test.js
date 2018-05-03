describe('The dp-dcatd-button component', () => {
    let $compile;
    let $rootScope;
    let $window;
    let origSessionStorage;

    beforeEach(() => {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_$compile_, _$rootScope_, _$window_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $window = _$window_;
        });

        origSessionStorage = $window.sessionStorage;
        $window.sessionStorage = {
            setItem: angular.noop
        };

        spyOn($window.location, 'assign');
    });

    afterEach(() => {
        $window.sessionStorage = origSessionStorage;
    });

    function getComponent (transcluded, type, id) {
        var component,
            element,
            scope;

        element = document.createElement('dp-dcatd-button');
        element.setAttribute('type', type);
        element.setAttribute('id', id);
        element.innerText = transcluded;

        scope = $rootScope.$new();
        component = $compile(element)(scope);
        scope.$digest();

        return component;
    }

    describe('rendering', () => {
        it('renders toevoegen button', () => {
            const component = getComponent('Toevoegen', 'toevoegen', '_');

            expect(component.text().trim()).toBe('Toevoegen');
        });

        it('renders wijzigen button', () => {
            const component = getComponent('Wijzigen', 'wijzigen', 'id-van-te-wijzigen-dataset');

            expect(component.text().trim()).toBe('Wijzigen');
        });
    });

    describe('events', () => {
        it('when clicking the toevoegen button', () => {
            spyOn($window.sessionStorage, 'setItem');

            const component = getComponent('Toevoegen', 'toevoegen', '_');
            component.find('button').click();

            expect($window.sessionStorage.setItem)
                .toHaveBeenCalledWith('DCATD_REDIRECT_URL', 'http://localhost:9876/context.html');

            expect($window.location.assign).toHaveBeenCalledWith('/dcatd_admin#/datasets/_');
        });

        it('when clicking the wijzigen button', () => {
            spyOn($window.sessionStorage, 'setItem');

            const component = getComponent('Wijzigen', 'wijzigen', 'id-van-te-wijzigen-dataset');
            component.find('button').click();

            expect($window.sessionStorage.setItem)
                .toHaveBeenCalledWith('DCATD_REDIRECT_URL', 'http://localhost:9876/context.html');

            expect($window.location.assign).toHaveBeenCalledWith('/dcatd_admin#/datasets/id-van-te-wijzigen-dataset');
        });
    });
});
