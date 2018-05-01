import { createSelector } from 'reselect';

export const FETCH_STRAATBEELD_BY_ID = 'FETCH_STRAATBEELD_BY_ID';

export const getStraatbeeld = (state) => state.straatbeeld;
export const getStraatbeeldLocation = createSelector([getStraatbeeld],
  (straatbeeld) => (
    straatbeeld ? straatbeeld.location : ''
  ));
export const getStraatbeeldHeading = createSelector([getStraatbeeld],
  (straatbeeld) => (
    straatbeeld ? straatbeeld.heading : ''
  ));

// related reducer /modules/atlas/services/redux/reducers/straatbeeld-reducers.factory.js

export const fetchStraatbeeldById = (pano) => ({
  type: { id: FETCH_STRAATBEELD_BY_ID },
  payload: { id: pano.id, heading: pano.heading }
});
