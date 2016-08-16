describe('The dp-straatbeeld directive', function () {
    var $compile,
        $rootScope,
        $q,
        store,
        ACTIONS,
        marzipanoService,
        earthmine,
        orientation,
        mockedMarzipanoViewer = 'I_AM_A_MOCKED_MARZIPANO_VIEWER',
        mockedEarthmineData = {
            id: 123,
            date: new Date(2016, 6, 8),
            car: {
                location: [52.129, 4.79],
                heading: 270,
                pitch: 0.75
            },
            hotspots: ['FAKE_HOTSPOT_1', 'FAKE_HOTSPOT_2']
        };

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            {
                store: {
                    dispatch: function () {}
                },
                earthmine: {
                    getImageDataById: function () {
                        var q = $q.defer();

                        q.resolve(mockedEarthmineData);

                        return q.promise;
                    },
                    getImageDataByCoordinates: function () {
                        var q = $q.defer();

                        q.resolve(mockedEarthmineData);

                        return q.promise;
                    }
                }
            }
        );

        angular.mock.inject(
            function (_$compile_, _$rootScope_, _$q_, _store_, _ACTIONS_, _marzipanoService_, _earthmine_,
                _orientation_) {

                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $q = _$q_;
                store = _store_;
                ACTIONS = _ACTIONS_;
                marzipanoService = _marzipanoService_;
                earthmine = _earthmine_;
                orientation = _orientation_;
            }
        );

        spyOn(marzipanoService, 'initialize').and.returnValue(mockedMarzipanoViewer);
        spyOn(marzipanoService, 'loadScene');

        spyOn(earthmine, 'getImageDataById').and.callThrough();
        spyOn(earthmine, 'getImageDataByCoordinates').and.callThrough();

        spyOn(orientation, 'update');

        spyOn(store, 'dispatch');
    });

    function getDirective (state) {
        var directive,
            element,
            scope;

        element = document.createElement('dp-straatbeeld');
        element.setAttribute('state', 'state');

        scope = $rootScope.$new();
        scope.state = state;

        directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    function triggerMousemove (element) {
        var event;

        event = angular.element.Event('mousemove');

        element.trigger(event);
    }

    it('initializes the marzipanoService with the panoramaState', function () {
        var directive,
            container;

        directive = getDirective({id: 123});
        container = directive.find('.js-marzipano-viewer')[0];

        expect(marzipanoService.initialize).toHaveBeenCalledWith(container);
    });

    describe('it loads data from earthmine', function () {
        describe('the initial panorama scene', function () {
            it('loads the data based on coordinates', function () {
                getDirective({id: null, searchLocation: [52.123, 4.789]});

                expect(earthmine.getImageDataById).not.toHaveBeenCalled();
                expect(earthmine.getImageDataByCoordinates).toHaveBeenCalledWith(52.123, 4.789);
            });

            it('triggers SHOW_STRAATBEELD_INITIAL when the earthmineData is resvoled', function () {
                getDirective({id: null, searchLocation: [52.123, 4.789]});

                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.SHOW_STRAATBEELD_INITIAL,
                    payload: {
                        id: 123,
                        date: new Date(2016, 6, 8),
                        car: {
                            location: [52.129, 4.79],
                            heading: 270,
                            pitch: 0.75
                        },
                        hotspots: ['FAKE_HOTSPOT_1', 'FAKE_HOTSPOT_2']
                    }
                });
            });
        });

        describe('subsequent panorama scenes', function () {
            it('loads the data based on ID', function () {
                getDirective({id: 123});

                expect(earthmine.getImageDataById).toHaveBeenCalledWith(123);
                expect(earthmine.getImageDataByCoordinates).not.toHaveBeenCalled();
            });

            it('triggers SHOW_STRAATBEELD_SUBSEQUENT when the earthmineData is resvoled', function () {
                getDirective({id: 123});

                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT,
                    payload: {
                        id: 123,
                        date: new Date(2016, 6, 8),
                        car: {
                            location: [52.129, 4.79],
                            heading: 270,
                            pitch: 0.75
                        },
                        hotspots: ['FAKE_HOTSPOT_1', 'FAKE_HOTSPOT_2']
                    }
                });
            });
        });

        it('doesn\'t directly load a scene when earthmineData is resolved', function () {
            //Loading the scene should only be triggered by a Redux state change, not some internal API call
            getDirective({id: 123});
            expect(marzipanoService.loadScene).not.toHaveBeenCalled();

            getDirective({id: null, searchLocation: [52.123, 4.789]});
            expect(marzipanoService.loadScene).not.toHaveBeenCalled();
        });
    });

    it('calls the orientation factory on mousemove to keep the state in sync', function () {
        var directive;

        directive = getDirective(
            {
                id: 123,
                car: {
                    location: [52, 4],
                    heading: 275,
                    pitch: 0.8
                },
                isLoading: false
            }
        );
        expect(orientation.update).not.toHaveBeenCalled();

        triggerMousemove(directive.find('.js-marzipano-viewer'));
        expect(orientation.update).toHaveBeenCalledWith(
            mockedMarzipanoViewer,
            {
                location: [52, 4],
                heading: 275,
                pitch: 0.8
            },
            false
        );
    });

    it('loads a scene when there is a known car location', function () {
        getDirective({
            id: 123,
            car: {
                location: [52.123, 4.789],
                heading: 90,
                pitch: 0.01
            },
            camera: {
                heading: 90,
                pitch: 0.01
            },
            hotspots: ['FAKE_HOTSPOT_X', 'FAKE_HOTSPOT_Y']
        });

        expect(marzipanoService.loadScene).toHaveBeenCalledWith(
            123,
            {
                location: [52.123, 4.789],
                heading: 90,
                pitch: 0.01
            },
            {
                heading: 90,
                pitch: 0.01
            },
            ['FAKE_HOTSPOT_X', 'FAKE_HOTSPOT_Y']
        );
    });
});