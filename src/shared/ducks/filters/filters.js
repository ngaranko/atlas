import { routing } from '../../../app/routes';

export const APPLY_FILTERS = 'APPLY_FILTERS';
export const EMPTY_FILTERS = 'EMPTY_FILTERS';

const parseFiltersString = (string) => {
  if (!string) {
    return {};
  }
  const filterStrings = string.split(',');
  const filters = filterStrings.reduce((acc, singleFilterString) => {
    const [key, value] = singleFilterString.split(':');
    return {
      ...acc,
      [key]: value
    };
  }, {});
  return filters;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case routing.adressen.type:
    case routing.vestigingen.type: {
      const { filters: filterString } = action.meta.query || {};
      const filters = parseFiltersString(filterString);
      return filters;
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
