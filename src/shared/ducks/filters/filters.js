import { routing } from '../../../app/routes';

export const APPLY_FILTERS = 'APPLY_FILTERS';
export const EMPTY_FILTERS = 'EMPTY_FILTERS';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case routing.addresses.type:
    case routing.establishments.type:
    case routing.cadastralObjects.type: {
      const { filters: queryFilters } = action.meta.query || {};
      const filterToParse = queryFilters || '{}';
      return JSON.parse(filterToParse);
    }
    case APPLY_FILTERS:
      return { ...action.payload };
    case EMPTY_FILTERS:
      return {};
    default:
      return state;
  }
};

export const getFilters = (state) => state.filters;

export const applyFilters = (payload) => ({
  type: APPLY_FILTERS,
  payload
});
export const emptyFilters = () => ({ type: EMPTY_FILTERS });

export default reducer;
