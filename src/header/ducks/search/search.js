export const FETCH_DATA_SELECTION = 'FETCH_DATA_SELECTION';

export const fetchDataSelection = (query) => ({
  type: FETCH_DATA_SELECTION,
  payload: query
});
