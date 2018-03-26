const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_SUGGESTIONS = 'SET_SUGGESTIONS';

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

    default:
      return state;
  }
}

export const setSearchQuery = (query = '') => ({ type: SET_SEARCH_QUERY, query });
export const setSuggestions = (suggestions = [], numberOfSuggestions = 0) =>
  ({ type: SET_SUGGESTIONS, suggestions, numberOfSuggestions });


window.reducers = window.reducers || {};
window.reducers.AutoSuggestReducer = AutoSuggestReducer;
