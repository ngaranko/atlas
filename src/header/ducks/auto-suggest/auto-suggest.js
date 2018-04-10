const SET_ACTIVE_SUGGESTION = 'SET_ACTIVE_SUGGESTION';
const FETCH_SUGGESTIONS_REQUEST = 'FETCH_SUGGESTIONS_REQUEST';
const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';
const FETCH_SUGGESTIONS_FAILURE = 'FETCH_SUGGESTIONS_FAILURE';
const SET_QUERY = 'SET_QUERY';

const initialState = {};

export default function AutoSuggestReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUGGESTIONS_REQUEST:
      return {
        ...state
      };
    case FETCH_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: action.suggestions
      };
    case FETCH_SUGGESTIONS_FAILURE:
      return {
        ...state,
        suggestions: []
      };
    case SET_ACTIVE_SUGGESTION:
      return {
        ...state,
        activeSuggestion: action.suggestion,
        displayQuery: action.suggestion.label
      };
    case SET_QUERY:
      return {
        ...state,
        typedQuery: action.query,
        displayQuery: action.query
      };

    default:
      return state;
  }
}

export const setActiveSuggestion = (suggestion = { index: -1 }) =>
  ({ type: SET_ACTIVE_SUGGESTION, suggestion });

export const getSuggestions = (query = '') =>
  ({ type: FETCH_SUGGESTIONS_REQUEST, query });

export const setQuery = (query = '') =>
  ({ type: SET_QUERY, query });

window.reducers = window.reducers || {};
window.reducers.AutoSuggestReducer = AutoSuggestReducer;
