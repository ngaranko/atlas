const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

const initialState = {};

export default function SearchQueryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.query
      };

    default:
      return state;
  }
}

export const setSearchQuery = (query) => ({ type: SET_SEARCH_QUERY, query });


window.reducers = window.reducers || {};
window.reducers.SearchQueryReducer = SearchQueryReducer;
