export const FETCH_STRAATBEELD_BY_ID = 'FETCH_STRAATBEELD_BY_ID';

export const fetchStraatbeeldById = (id) => ({
  type: { id: FETCH_STRAATBEELD_BY_ID },
  payload: { id }
});
