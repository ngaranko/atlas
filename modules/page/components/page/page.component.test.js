describe('The page component', function () {
    var $compile,
        $rootScope,
        $templateCache,
        $q,
        googleSheet,
        entries;

    beforeEach(function () {
        entries = [
            {
                id: 'item'
            },
            {
                id: 'anotheritem'
            }
        ];

        angular.mock.module('dpPage', {
            googleSheet: {
                getContents: () => {
                    let q = $q.defer();
                    q.resolve({
                        feed: 'a feed',
                        entries
                    });
                    return q.promise;
                }
            }
        },
        function ($provide) {
            $provide.constant('GOOGLE_SHEET_CMS', {
                key: 'CMSKEY',
                index: {
                    type: 99
                }
            });
        });

        angular.mock.inject(function (_$compile_, _$rootScope_, _$templateCache_, _$q_, _googleSheet_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $templateCache = _$templateCache_;
            $q = _$q_;
            googleSheet = _googleSheet_;
        });

        $templateCache.put('modules/page/components/page/templates/welcome.html', 'THIS_IS_WELCOME');
        $templateCache.put('modules/page/components/page/templates/about.html', 'THIS_IS_ABOUT');
    });

    function getComponent (name, type, item) {
        var component,
            scope,
            element;

        element = document.createElement('dp-page');
        element.setAttribute('name', name);
        element.setAttribute('type', type);
        element.setAttribute('item', item);

        scope = $rootScope.$new();

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('loads an HTML page based on the name binding', function () {
        var component;

        // Welcome page
        component = getComponent('welcome');
        expect(component.text()).toContain('THIS_IS_WELCOME');

        // About page
        component = getComponent('about');
        expect(component.text()).toContain('THIS_IS_ABOUT');
    });

    it('loads cms contents for the specified type and item', function () {
        $templateCache.put('modules/page/components/page/templates/name.html', 'NAME');
        spyOn(googleSheet, 'getContents').and.callThrough();

        let component = getComponent('name', 'type', 'item');
        let scope = component.isolateScope();

        expect(googleSheet.getContents).toHaveBeenCalledWith('CMSKEY', 99);

        $rootScope.$apply();

        expect(scope.vm.feed).toBe('a feed');
        expect(scope.vm.entries).toEqual(entries);
        expect(scope.vm.entry).toEqual({id: 'item'});
    });

    it('does nothing on empty type', function () {
        let component = getComponent('about', '', '');
        let scope = component.isolateScope();

        $rootScope.$apply();

        expect(scope.vm.feed).toBeNull();
        expect(scope.vm.entries).toEqual([]);
    });
});
