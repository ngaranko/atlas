fdescribe('The dp-straatbeeld-thumbnail component', function () {
    var $compile,
        $rootScope,
        store,
        ACTIONS,
        $q,
        api,
        hasMockedThumbnail,
        finishApiCall;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                detailConfig: {
                    STRAATBEELD_THUMB_URL: 'http://fake.straatbeeld.url/path/'
                },
                store: {
                    dispatch: function () {}
                },
                api: {
                    getByUrl: function() {
                        var q = $q.defer();
                         
                        finishApiCall = function () {
                            q.resolve( hasMockedThumbnail ? { url:'http://example.com/example.png' } : [] );
                            $rootScope.$apply();
                        };
                        return q.promise;
                    }
                }

            }, function ($provide) {
                    $provide.factory('dpLoadingIndicatorDirective', function () {
                        return {};
                    });
                }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _ACTIONS_, _$q_, _api_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            ACTIONS = _ACTIONS_;
            $q = _$q_;
            api = _api_;

        });

       
 

        hasMockedThumbnail = true;
        spyOn(store, 'dispatch');
        spyOn(api, 'getByUrl').and.callThrough();
    });

    function getComponent (location) {
        var component,
            element,
            scope;

        element = document.createElement('dp-straatbeeld-thumbnail');
        element.setAttribute('location', 'location');

        scope = $rootScope.$new();
        scope.location = location;

        component = $compile(element)(scope);

        scope.$apply();

        return component;
    }
    
  

    it('when it cannot find a thumbnail it shows a message', function () {
        hasMockedThumbnail = false;
        var component = getComponent([52,4]);
        finishApiCall();
        // expect does not show the thumbnail
        // no loading indicator
        expect( component.find('.qa-found-no-panorama').text() )
                          .toContain('Er is geen panorama gevonden voor deze locatie');
        
    });

    it('shows a thumbnail when thumbnail is found', function () {
        hasMockedThumbnail = true;
        var component = getComponent([52,4]);
        finishApiCall();
        // expect do not show message
        // no loading indicator
        expect( component.find('img').attr('ng-src') ).not.toBe('');
                           
    });
    
    it('shows a loading indicator when loading', function () {
      var component = getComponent([52,4]);
      var scope = component.isolateScope();

      expect(component.find('dp-loading-indicator').length).toBe(1);
      expect(component.find('dp-loading-indicator').attr('is-loading')).toBe('vm.isLoading');
      // expect no image no text
      expect(scope.vm.isLoading).toBe(true);

    });

     // click on thumbnail
    
});