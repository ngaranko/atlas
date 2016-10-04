describe('The searchResults controller', function () {
    var $controller,
        $rootScope,
        store,
        mockedState;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            {
                store: {
                    subscribe: function (callbackFn) {
                        callbackFn();
                    },
                    getState: function () {
                        return mockedState;
                    }
                }
            }
        );

        angular.mock.inject(function (_$controller_, _$rootScope_, _store_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            store = _store_;
        });

        mockedState = {
            search: {
                query: 'i am a search query',
                location: null
            }
        };

        spyOn(store, 'getState').and.callThrough();
    });

    function getController () {
        var controller,
            scope = $rootScope.$new();

        controller = $controller('SearchResultsController', {
            $scope: scope
        });

        scope.$apply();

        return controller;
    }

    it('subscribes to the store to listen for changes', function () {
        spyOn(store, 'subscribe').and.callThrough();

        getController();

        expect(store.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('sets the query string based on the state', function () {
        var controller;

        controller = getController();

        expect(controller.query).toBe('i am a search query');
        expect(controller.location).toBeNull();
    });

    it('sets the location based on the state', function () {
        var controller;

        mockedState = {
            search: {
                query: null,
                location: [52.123, 4.789]
            }
        };

        controller = getController();

        expect(controller.query).toBeNull();
        expect(controller.location).toEqual([52.123, 4.789]);
    });

    it('sets the category based on the state', function () {
        var controller;

        mockedState = {
            search: {
                query: 'i am a search query',
                location: null,
                category: 'adres'
            }
        };

        controller = getController();

        expect(controller.category).toBe('adres');
    });

    it('doesn\'t break if search is null', function () {
        var controller;

        mockedState = {
            search: null
        };

        controller = getController();

        expect(controller.query).toBeNull();
        expect(controller.location).toBeNull();
    });
});