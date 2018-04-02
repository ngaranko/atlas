const SET_ACTIVE_SUGGESTION = 'SET_ACTIVE_SUGGESTION';
const SET_SHOW_SUGGESTIONS = 'SET_SHOW_SUGGESTIONS';
const FETCH_SUGGESTIONS_REQUEST = 'FETCH_SUGGESTIONS_REQUEST';
const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';

const initialState = {};

export default function AutoSuggestReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUGGESTIONS_REQUEST:
      return {
        ...state,
        query: action.query
      };
    case FETCH_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: action.suggestions
      };
    case SET_ACTIVE_SUGGESTION:
      return {
        ...state,
        activeSuggestion: action.suggestion
      };
    case SET_SHOW_SUGGESTIONS:
      return {
        ...state,
        showSuggestions: action.showSuggestions
      };

    default:
      return state;
  }
}

export const setShowSuggestions = (show = false) =>
  ({ type: SET_SHOW_SUGGESTIONS, showSuggestions: show });

export const setActiveSuggestion = (suggestion = {}) =>
  ({ type: SET_ACTIVE_SUGGESTION, suggestion });

export const getSuggestions = (query = '') =>
  ({ type: FETCH_SUGGESTIONS_REQUEST, query });

window.reducers = window.reducers || {};
window.reducers.AutoSuggestReducer = AutoSuggestReducer;
