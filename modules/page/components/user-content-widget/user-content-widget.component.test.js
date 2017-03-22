describe('The user content widget component', function () {
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
                    const q = $q.defer();
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
    });

    function getComponent (type) {
        var component,
            scope,
            element;

        element = document.createElement('dp-user-content-widget');
        element.setAttribute('type', type);

        scope = $rootScope.$new();

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('loads cms contents for the specified type', function () {
        $templateCache.put('modules/page/components/user-content-widget/templates/type.html', 'TYPE');
        spyOn(googleSheet, 'getContents').and.callThrough();

        const component = getComponent('type'),
            scope = component.isolateScope();

        expect(googleSheet.getContents).toHaveBeenCalledWith('CMSKEY', 99);

        $rootScope.$apply();

        expect(scope.vm.feed).toBe('a feed');
        expect(scope.vm.entries).toEqual(entries);
    });
});
