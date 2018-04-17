export default function fetchSearchResults(location) {
  return {
    type: {
      id: 'FETCH_SEARCH_RESULTS_BY_LOCATION',
      ignore: true
    },
    payload: [location.latitude, location.longitude]
  };
}

export function fetchDataSelection(query) {
  return {
    type: {
      id: 'FETCH_DATA_SELECTION'
    },
    payload: query
  };
}

export function fetchSearchResultsByQuery(query) {
  return {
    type: {
      id: 'FETCH_SEARCH_RESULTS_BY_QUERY'
    },
    payload: query
  };
}
