(function () {
    angular
        .module('atlas')
        .constant('STATE_URL_CONVERSION', {
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
                    type: 'base62[]',
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
