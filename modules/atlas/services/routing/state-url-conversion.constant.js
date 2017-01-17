(function () {
    angular
        .module('atlas')
        .constant('STATE_URL_CONVERSION', {
            onCreate: {
                // Initialisation methods for the url2state conversion
                // These methods are executed after a state object has been initialized with the initialValues
                MAIN: (oldState, newState, params, initialValues) => {
                    if (angular.equals(params, {})) {
                        // When no params, go to home page and show initial map
                        newState.page = 'home';
                        newState.map = angular.copy(initialValues.map);
                    }
                    return newState;
                },
                search: (oldState, newState) => angular.copy(oldState || newState)
            },
            post: {
                // Post processing methods
                // These methods are exectuted when the url2state conversion has finished
                dataSelection: (oldState, newState) => {
                    if (angular.isObject(oldState)) {
                        newState.markers = oldState.markers;
                        newState.isLoading = oldState.isLoading;
                    }
                    newState.isFullscreen = newState.view !== 'LIST';
                    return newState;
                },
                detail: (oldState, newState) => {
                    if (angular.isObject(oldState) && oldState.endpoint === newState.endpoint) {
                        newState.display = oldState.display;
                        newState.geometry = oldState.geometry;
                        newState.isLoading = oldState.isLoading;
                        newState.isFullscreen = oldState.isFullscreen;
                    }
                    return newState;
                },
                straatbeeld: (oldState, newState) => {
                    if (angular.isObject(oldState) && oldState.id === newState.id) {
                        newState.image = oldState.image;
                        newState.hotspots = oldState.hotspots;
                        newState.date = oldState.date;
                        newState.location = oldState.location;
                        newState.isInitial = false;
                        newState.isLoading = oldState.isLoading;
                    }
                    return newState;
                }
            },
            initialValues: {
                // When creating a state object it will be initialized with these values
                // MAIN is used to denote the main or global state part of the state
                MAIN: {
                    page: null,     // eg: 'home'
                    layerSelection: false,
                    atlas: {
                        isPrintMode: false
                    }
                },
                dataSelection: {
                    markers: [],    // eg: [[52.1, 4.1], [52.2, 4.0]],
                    filters: {},    // eg: {buurtcombinatie: 'Geuzenbuurt', buurt: 'Trompbuurt'}
                    isLoading: true
                    // view: 'TABLE',
                    // dataset: 'bag',
                    // query: 'searchText',
                    // page: 1,
                    // isFullscreen: true,
                },
                detail: {
                    isFullscreen: true,
                    isLoading: true
                    // endpoint: 'http://api.example.com/bag/verblijfsobject/123/',
                    // display: 'This is the _display variable as available in each endpoint',
                    // geometry: null,
                },
                map: {
                    viewCenter: [52.3719, 4.9012],
                    baseLayer: 'topografie',
                    zoom: 9,
                    overlays: [],
                    isFullscreen: false,
                    isLoading: false,
                    showActiveOverlays: false
                },
                search: {
                    query: null,    // eg: 'linnaeus'
                    location: null, // eg: [52.123, 4.789]
                    category: null,
                    isLoading: true
                    // numberOfResults: null
                },
                straatbeeld: {
                    location: null, // eg: [52.8, 4.9]
                    pitch: 0,       // eg: -10
                    heading: 0,     // eg: 270
                    fov: 0,         // eg: 65
                    image: null,    // eg: {
                                    //     pattern: 'http://www.example.com/path/some-id/{this}/{that}/{thingie}.jpg',
                                    //     preview: 'http://www.example.com/path/some-id/preview.jpg'
                                    // }
                    hotspots: [],   // eg: [{id: 'ABC124', heading: 90, distance: 18}],
                    date: null,     // eg: new Date()
                    isFullscreen: false,
                    isInitial: true,
                    isLoading: true
                    // id: 'ABC123',
                }
            },
            stateVariables: {
                // Property names are keys so that the compiler guarantees the uniqness
                // The type is stored with the name, every state variable has to have a type specification
                atls: {
                    name: 'layerSelection',
                    type: 'boolean'
                },
                atpg: {
                    name: 'page',
                    type: 'string'
                },
                atpr: {
                    name: 'atlas.isPrintMode',
                    type: 'boolean'
                },
                dsd: {
                    name: 'dataSelection.dataset',
                    type: 'string'
                },
                dsf: {
                    name: 'dataSelection.filters',
                    type: 'keyvalues'
                },
                dsp: {
                    name: 'dataSelection.page',
                    type: 'number'
                },
                dsq: {
                    name: 'dataSelection.query',
                    type: 'string'
                },
                dsv: {
                    name: 'dataSelection.view',
                    type: 'string'
                },
                dte: {
                    name: 'detail.endpoint',
                    type: 'string'
                },
                dtfs: {
                    name: 'detail.isFullscreen',
                    type: 'boolean'
                },
                mpb: {
                    name: 'map.baseLayer',
                    type: 'string'
                },
                mpz: {
                    name: 'map.zoom',
                    type: 'number'
                },
                mpfs: {
                    name: 'map.isFullscreen',
                    type: 'boolean'
                },
                mpo: {
                    name: 'map.overlays',
                    type: 'object(id:string,isVisible:boolean)[]'
                },
                mps: {
                    name: 'map.showActiveOverlays',
                    type: 'boolean'
                },
                mpv: {
                    name: 'map.viewCenter',
                    type: 'number[]',
                    precision: 7
                },
                sbf: {
                    name: 'straatbeeld.fov',
                    type: 'base62',
                    precision: 1
                },
                sbfs: {
                    name: 'straatbeeld.isFullscreen',
                    type: 'boolean'
                },
                sbh: {
                    name: 'straatbeeld.heading',
                    type: 'base62',
                    precision: 1
                },
                sbi: {
                    name: 'straatbeeld.id',
                    type: 'string'
                },
                sbl: {
                    name: 'straatbeeld.location',
                    type: 'base62[]',
                    precision: 7
                },
                sbp: {
                    name: 'straatbeeld.pitch',
                    type: 'base62',
                    precision: 1
                },
                src: {
                    name: 'search.category',
                    type: 'string'
                },
                srl: {
                    name: 'search.location',
                    type: 'base62[]',
                    precision: 7
                },
                srq: {
                    name: 'search.query',
                    type: 'string'
                }
            }
        });
})();
