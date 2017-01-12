(function () {
    angular
        .module('atlas')
        .constant('STATE_URL_CONVERSION', {
            pre: {
                state: (oldState, newState, params, initialValues) => {
                    if (angular.equals(params, {})) {
                        // When no params, go to home page and initial map
                        newState.page = 'home';
                        newState.map = angular.copy(initialValues.map);
                    }
                    return newState;
                },
                search: (oldState, newState) => angular.copy(oldState || newState)
            },
            post: {
                dataSelection: (oldState, newState) => {
                    if (oldState) {
                        newState.markers = oldState.markers;
                        newState.isLoading = oldState.isLoading;
                    }
                    newState.isFullscreen = newState.view !== 'LIST'
                },
                detail: (oldState, newState) => {
                    if (oldState && oldState.endpoint === newState.endpoint) {
                        newState.display = oldState.display;
                        newState.geometry = oldState.geometry;
                        newState.isLoading = oldState.isLoading;
                        newState.isFullscreen = oldState.isFullscreen;
                    }
                },
                straatbeeld: (oldState, newState) => {
                    if (oldState && oldState.id === newState.id) {
                        newState.image = oldState.image;
                        newState.hotspots = oldState.hotspots;
                        newState.date = oldState.date;
                        newState.location = oldState.location;
                        newState.isInitial = false;
                        newState.isLoading = oldState.isLoading;
                    }
                }
            },
            initialValues: {
                state: {
                    page: null,
                    layerSelection: false,
                    isPrintMode: false
                },
                dataSelection: {
                    markers: [],
                    filters: {},
                    isLoading: true
                },
                detail: {
                    isFullscreen: true,
                    isLoading: true
                },
                map: {
                    viewCenter: [52.3719, 4.9012],
                    baseLayer: 'topografie',
                    zoom: 9,
                    overlays: [],
                    isFullscreen: false,
                    isLoading: false,
                    // highlight: null,
                    showActiveOverlays: false
                },
                search: {
                    query: null,
                    location: null,
                    category: null,
                    isLoading: true
                },
                straatbeeld: {
                    location: null,
                    pitch: 0,
                    heading: 0,
                    fov: 0,
                    image: null,
                    hotspots: [],
                    date: null,
                    isFullscreen: false,
                    isInitial: true,
                    isLoading: true
                }
            },
            stateVariables: {
                // property names are keys so that the compiler guarantees the uniqness
                _ls: {
                    name: 'layerSelection',
                    type: 'boolean'
                },
                _pg: {
                    name: 'page',
                    type: 'string'
                },
                _pr: {
                    name: 'isPrintmode',
                    type: 'boolean'
                },
                dsd: {
                    name: 'dataSelection.dataset',
                    type: 'string'
                },
                dsf: {
                    name: 'dataSelection.filters',
                    type: 'string[][]',
                    getValue: filters => Object.keys(filters || {}).map(key => [key, filters[key]]),
                    setValue: filters => filters.reduce((result, [key, value]) => {
                        result[key] = value;
                        return result;
                    }, {})
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
                    type: 'string[][]',
                    getValue: overlays => (overlays || []).map(overlay => [overlay.id, overlay.isVisible ? 'T' : 'F']),
                    setValue: overlays => overlays.map(([id, isVisible]) => {
                        return {id, isVisible: isVisible === 'T'};
                    })
                },
                mps: {
                    name: 'map.showActiveOverlays',
                    type: 'boolean'
                },
                mpv: {
                    name: 'map.viewCenter',
                    type: 'number[]'
                },
                sbf: {
                    name: 'straatbeeld.fov',
                    type: 'number'
                },
                sbfs: {
                    name: 'straatbeeld.isFullscreen',
                    type: 'boolean'
                },
                sbh: {
                    name: 'straatbeeld.heading',
                    type: 'number'
                },
                sbi: {
                    name: 'straatbeeld.id',
                    type: 'string'
                },
                sbl: {
                    name: 'straatbeeld.location',
                    type: 'number[]'
                },
                sbp: {
                    name: 'straatbeeld.pitch',
                    type: 'number'
                },
                src: {
                    name: 'search.category',
                    type: 'string'
                },
                srl: {
                    name: 'search.location',
                    type: 'number[]'
                },
                srq: {
                    name: 'search.query',
                    type: 'string'
                }
            }
        });
})();
