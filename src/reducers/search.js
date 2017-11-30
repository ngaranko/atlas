export const fetchSearchResults = (location) => ({
  type: {
    id: 'FETCH_SEARCH_RESULTS_BY_LOCATION',
    ignore: true
  },
  payload: [location.latitude, location.longitude]
});
