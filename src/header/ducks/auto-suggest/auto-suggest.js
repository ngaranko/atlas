const SET_ACTIVE_SUGGESTION = 'SET_ACTIVE_SUGGESTION';
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

    default:
      return state;
  }
}

export const setActiveSuggestion = (suggestion = { index: -1 }) =>
  ({ type: SET_ACTIVE_SUGGESTION, suggestion });

export const getSuggestions = (query = '') =>
  ({ type: FETCH_SUGGESTIONS_REQUEST, query });


window.reducers = window.reducers || {};
window.reducers.AutoSuggestReducer = AutoSuggestReducer;
