import isEqual from 'lodash.isequal';
import isObject from 'lodash.isobject';
import UriStripper from './uri-stripper/uri-stripper';

const isDefined = (value) => typeof value !== 'undefined';

/* istanbul ignore next */
const ofTypeArray = (oldState, newState) =>
  (Array.isArray(oldState) ? oldState : newState);
/* istanbul ignore next */
const ofTypeObject = (oldState, newState) =>
  (isObject(oldState) ? oldState : newState);
/* istanbul ignore next */
const ofTypeBoolean = (oldState, newState) =>
  (oldState === true || oldState === false ? oldState : newState);

// This constant holds the configuration of all state variables that are stored in the url
// - The url parameter name can be found in stateVariables.<parameterName>
//   The association between the state variable and the url parameter is described by
//      the name (eg 'map.zoom')
//   The type of the parameter is described by the type parameter
// - Any default value can be found in initialValues.<parameterName>
// - The default state is described in onCreate.DEFAULT
// - Any other default processing for a state object is described in onCreate.<stateObject>
// - The state variables that are copied from a previous state are described in post.<stateObject>
//
// To include a state variable (stateObject.stateVariable) in the url:
// - Define a unique short name for the variable
// - Define the type of the variable
// - Add <shortName>: { name: 'stateObject.stateVariable', type: <typeName> } to stateVariables
//
// Note: The depth of the stateVariable in the stateObject is free
//       eg 'map.x.y.z' is perfectly valid and corresponds to map: { x: { y: { z: <anyValue> } } }
//
// Valid types for state variables are:
// - string
// - boolean
// - number (precision van be specified in the precison property of the stateVariable)
// - base62 (encode any number in base 62, 0-9A-Za-z, precision van be specified
//      in the precison property)
// and the complex types:
// - []
//   eg number[] for a coordinate like [52, 4] which will store as '52:4' in the url
// - keyvalues
//   for { key: stringValue, key: stringValue, ... } objects
//   like { aap: 'noot', mies: 'wim' } which will store as 'aap::noot:mies::wim' in the url
// - object(key:typeName,key:typeName,...)
//   for { key: valueOfType, key: valueOfType, ... } objects
//   like object(aap:string,mies:number) for { aap: 'noot', mies: 5 } which
//      will store as 'noot:5' in the url
//
const stateUrlConversion = {

  onCreate: {
    // Initialisation methods for the url2state conversion
    // These methods are executed after a state object has been initialized with the initialValues
    DEFAULT: (oldState, newState, params, initialValues) => {
      const result = newState;
      [
        'filters',
        'isMapPreviewPanelVisible',
        'mapBaseLayers',
        'mapLayers',
        'mapSearchResults',
        'mapSearchResultsByLocation',
        'mapDetail',
        'mapClickLocation',
        'page',
        'ui',
        'user'
      ].forEach((s) => {
        const value = initialValues[s];
        result[s] = isDefined(value)
          ? (Array.isArray(value)
            ? [...value]
            : isObject(value)
              ? { ...value }
              : value)
          : value;
      });
      if (isEqual(params, {})) {
        // When no params, go to home page and show initial map
        result.page.name = 'home';
        result.map = { ...initialValues.map };
      }
      return result;
    }
  },
  post: {
    // Post processing methods
    // These methods are exectuted when the url2state conversion has finished
    dataSelection: (oldState, newState) => {
      const result = newState;
      if (isObject(oldState)) {
        result.markers = oldState.markers;
        result.isLoading = oldState.isLoading;
      }
      result.isFullscreen = result.view !== 'LIST';
      return result;
    },
    detail: (oldState, newState) => {
      const result = newState;
      if (isObject(oldState) && oldState.endpoint === newState.endpoint) {
        result.display = oldState.display;
        result.geometry = oldState.geometry;
        result.isLoading = oldState.isLoading;
        result.isFullscreen = oldState.isFullscreen;
        result.skippedSearchResults = oldState.skippedSearchResults;
      }
      return result;
    },
    map: (oldState, newState) => {
      const result = newState;
      if (isObject(oldState)) {
        // Do not keep the state of the drawing mode

        result.highlight = oldState.highlight;
        result.isLoading = oldState.isLoading;
        result.shapeMarkers = oldState.shapeMarkers;
        result.shapeDistanceTxt = oldState.shapeDistanceTxt;
        result.shapeAreaTxt = oldState.shapeAreaTxt;
      }
      return result;
    },
    search: (oldState, newState) => {
      const result = newState;
      const hasOldState = isObject(oldState);
      const hasInputChanged = hasOldState && (
        oldState.query !== result.query ||
        !isEqual(oldState.location, result.location) ||
        oldState.category !== result.category
      );

      if (hasInputChanged) {
        result.numberOfResults = null;
        result.isLoading = true;
      } else if (hasOldState) {
        result.numberOfResults = oldState.numberOfResults;
        result.isLoading = oldState.isLoading;
      }

      return result;
    },
    straatbeeld: (oldState, newState) => {
      const result = newState;
      if (isObject(oldState)) {
        result.targetLocation = oldState.targetLocation;

        if (oldState.id === newState.id) {
          result.image = oldState.image;
          result.hotspots = oldState.hotspots;
          result.date = oldState.date;
          result.location = oldState.location;
          result.isInitial = false;
          result.isLoading = oldState.isLoading;
        }
      }
      return newState;
    },
    mapBaseLayers: ofTypeObject,
    mapLayers: ofTypeArray,
    user: ofTypeObject,
    mapSearchResults: ofTypeArray,
    mapSearchResultsByLocation: ofTypeObject,
    mapDetail: ofTypeObject,
    mapClickLocation: ofTypeObject,
    isMapPreviewPanelVisible: ofTypeBoolean,
    ui: (oldState, newState) => {
      const result = newState;
      if (isObject(oldState)) {
        // Do not keep the state of the drawing mode
        result.isMapPanelHandleVisible = oldState.isMapPanelHandleVisible;
      }
      return result;
    }
  },
  initialValues: {
    // When creating a state object it will be initialized with these values
    user: {
      authenticated: false,
      accessToken: '',
      scopes: [],
      name: '',
      error: false
    },
    dataSelection: {
      markers: [], // eg: [[52.1, 4.1], [52.2, 4.0]],
      geometryFilter: {
        markers: []
      },
      isLoading: true
      // view: 'TABLE',
      // dataset: 'bag',
      // query: 'searchText',
      // page: 1,
      // isFullscreen: true,
    },
    detail: {
      isFullscreen: false,
      isLoading: true,
      skippedSearchResults: false
      // endpoint: 'http://api.example.com/bag/verblijfsobject/123/',
      // display: 'This is the _display variable as available in each endpoint',
      // geometry: null,
    },
    filters: {},
    map: {
      viewCenter: [52.3731081, 4.8932945],
      baseLayer: 'topografie',
      zoom: 11,
      overlays: [],
      isLoading: false,
      drawingMode: 'none',
      highlight: true,
      shapeMarkers: 0,
      shapeDistanceTxt: '',
      shapeAreaTxt: ''
    },
    mapBaseLayers: {},
    mapLayers: [],
    mapSearchResults: [],
    mapSearchResultsByLocation: {},
    mapDetail: {
      isLoading: false,
      currentEndpoint: '',
      byEndpoint: {}
    },
    mapClickLocation: {},
    isMapPreviewPanelVisible: false,
    page: {
      name: null  // eg: 'home'
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
      history: 0,     // eg: 2016
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
    },
    ui: {
      isEmbed: false,
      isEmbedPreview: false,
      isMapFullscreen: false,
      isMapLayersVisible: true,
      isMapPanelVisible: false,
      isMapPanelHandleVisible: true,
      isPrintMode: false
    }
  },
  stateVariables: {
    // Property names are keys so that the compiler guarantees the uniqness
    // The type is stored with the name, every state variable has to have a type specification
    // atlas (at)
    atp: {
      name: 'ui.isPrintMode',
      type: 'boolean'
    },
    ate: {
      name: 'ui.isEmbed',
      type: 'boolean'
    },
    atep: {
      name: 'ui.isEmbedPreview',
      type: 'boolean'
    },
    // dataSelection (ds)
    dsd: {
      name: 'dataSelection.dataset',
      type: 'string'
    },
    dsgf: {
      name: 'dataSelection.geometryFilter.markers',
      type: 'base62[][]',
      precision: 7
    },
    dsgd: {
      name: 'dataSelection.geometryFilter.description',
      type: 'string'
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
    // detail (dt)
    dte: {
      name: 'detail.endpoint',
      type: 'string[]',
      getValue: UriStripper.stripDomain,
      setValue: UriStripper.restoreDomain
    },
    dtfs: {
      name: 'detail.isFullscreen',
      type: 'boolean'
    },
    // filters (f) for back compatibility using dsf
    dsf: {
      name: 'filters',
      type: 'keyvalues'
    },
    // header (hd, not used)
    // map (mp)
    mpb: {
      name: 'map.baseLayer',
      type: 'string'
    },
    mpz: {
      name: 'map.zoom',
      type: 'number'
    },
    mpfs: {
      name: 'ui.isMapFullscreen',
      type: 'boolean'
    },
    mpg: {
      name: 'map.geometry',
      type: 'base62[][]',
      precision: 7
    },
    mpo: {
      name: 'map.overlays',
      type: 'object(id:string,isVisible:boolean)[]'
    },
    mpv: {
      name: 'map.viewCenter',
      type: 'number[]',
      precision: 7
    },
    // page (pg)
    pgn: {
      name: 'page.name',
      type: 'string'
    },
    pgi: {
      name: 'page.item',
      type: 'string'
    },
    pgt: {
      name: 'page.type',
      type: 'string'
    },
    // search (sr)
    src: {
      name: 'search.category',
      type: 'string'
    },
    srfs: {
      name: 'search.isFullscreen',
      type: 'boolean'
    },
    srl: {
      name: 'search.location',
      type: 'base62[]',
      precision: 7
    },
    srq: {
      name: 'search.query',
      type: 'string'
    },
    // straatbeeld (sb)
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
    sby: {
      name: 'straatbeeld.history',
      type: 'base62',
      precision: 1
    },
    // UI visibility (uv)
    uvm: {
      name: 'ui.isMapPanelVisible',
      type: 'boolean'
    }
  }
};

export default stateUrlConversion;
