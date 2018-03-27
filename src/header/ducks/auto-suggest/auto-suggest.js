const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
const SET_ACTIVE_SUGGESTION_INDEX = 'SET_ACTIVE_SUGGESTION_INDEX';
const SET_ACTIVE_SUGGESTION = 'SET_ACTIVE_SUGGESTION';
const SET_SHOW_SUGGESTIONS = 'SET_SHOW_SUGGESTIONS';

const initialState = {};

export default function AutoSuggestReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.query
      };
    case SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
        numberOfSuggestions: action.numberOfSuggestions
      };
    case SET_ACTIVE_SUGGESTION_INDEX:
      return {
        ...state,
        activeSuggestionIndex: action.index
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

export const setSearchQuery = (query = '') =>
  ({ type: SET_SEARCH_QUERY, query });
export const setSuggestions = (suggestions = [], numberOfSuggestions = 0) =>
  ({ type: SET_SUGGESTIONS, suggestions, numberOfSuggestions });
export const setActiveSuggestionIndex = (index = -1) =>
  ({ type: SET_ACTIVE_SUGGESTION_INDEX, index });
export const setShowSuggestions = (show = false) =>
  ({ type: SET_SHOW_SUGGESTIONS, showSuggestions: show });
export const setActiveSuggestion = (suggestion = {}) =>
  ({ type: SET_ACTIVE_SUGGESTION, suggestion });

window.reducers = window.reducers || {};
window.reducers.AutoSuggestReducer = AutoSuggestReducer;
