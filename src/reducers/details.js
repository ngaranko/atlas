/* eslint-disable */
// export default function detailReducer(state = {}, action) {
/* istanbul ignore next */
window.reducers = window.reducers || {};
window.reducers.detailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DETAIL':
      return {
        ...state,
        detail: {
          endpoint: action.payload,
          reload: Boolean(state.detail && state.detail.endpoint === action.payload),
          isLoading: true,
          isFullscreen: action.payload && action.payload.includes('catalogus/api')
        },
        layerSelection: {
          ...state.layerSelection,
          isEnabled: false
        },
        map: {
          ...state.map,
          isFullscreen: false,
          isLoading: true
        },
        page: {
          ...state.page,
          name: '',
          type: ''
        }
      };

    case 'SHOW_DETAIL':
      return {
        ...state,
        detail: {
          ...state.detail,
          display: action.payload.display,
          geometry: action.payload.geometry,
          isFullscreen: action.payload.isFullscreen,
          isLoading: false,
          reload: false
        },
        map: {
          ...state.map,
          isLoading: false
        }
      };

    default:
      return state;
  }
};
