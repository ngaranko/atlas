export const FETCH_STRAATBEELD_BY_ID = 'FETCH_STRAATBEELD_BY_ID';

// related reducer /modules/atlas/services/redux/reducers/straatbeeld-reducers.factory.js
export const fetchStraatbeeldById = (id) => ({
  type: { id: FETCH_STRAATBEELD_BY_ID },
  payload: { id }
});
