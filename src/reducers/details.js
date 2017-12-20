export const FETCH_DETAIL = 'FETCH_DETAIL';

// Temporarily only show the preview panel for detail endpoints which are
// also selectable on the map.
const previewPanelDetailEndpoints = [
  'brk/object', // Kadastraal object
  'gebieden/bouwblok', // Bouwblok
  'handelsregister/vestiging', // Vestiging
  'meetbouten/meetbout', // Meetbout
  'milieuthemas/explosieven/inslagen', // Inslag
  'monumenten/monumenten', // Monument
  'nap/peilmerk' // NAP Peilmerk
];

/* eslint-disable */
// export default function detailReducer(state = {}, action) {
/* istanbul ignore next */
window.reducers = window.reducers || {};
window.reducers.detailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DETAIL:
      const leaveMapFullscreen = action.payload && previewPanelDetailEndpoints
        .some((previewPanelEndpoint) => action.payload.includes(previewPanelEndpoint));

      return {
        ...state,
        dataSelection: null,
        detail: {
          endpoint: action.payload,
          reload: Boolean(state.detail && state.detail.endpoint === action.payload),
          isLoading: true,
          isFullscreen: action.payload && action.payload.includes('catalogus/api'),
          skippedSearchResults: Boolean(action.skippedSearchResults)
        },
        map: {
          ...state.map,
          isFullscreen: leaveMapFullscreen ? state.map.isFullscreen : false,
          isLoading: true
        },
        page: {
          ...state.page,
          name: null,
          type: null
        },
        search: null,
        straatbeeld: null
      };

    case 'SHOW_DETAIL':
      return {
        ...state,
        detail: {
          ...state.detail,
          display: action.payload.display,
          geometry: action.payload.geometry,
          isLoading: false,
          reload: false
        },
        map: {
          ...state.map,
          isLoading: false
        }
      };

    case 'DETAIL_FULLSCREEN':
      return {
        ...state,
        detail: {
          ...state.detail,
          isFullscreen: action.payload
        }
      };

    default:
      return state;
  }
};

export const fetchDetail = (endpoint) => ({
  type: FETCH_DETAIL,
  payload: endpoint
});
