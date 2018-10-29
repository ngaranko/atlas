import { APPLY_FILTERS, EMPTY_FILTERS, getFilters } from './filters';

/* istanbul ignore next */ // TODO: refactor, test
const getFiltersString = (state) => {
  const filters = getFilters(state);
  const string = Object.entries(filters).map(([key, value]) => `${key}:${value}`);
  return string.join(',');
};

export default [
  {
    param: 'filters',
    selector: getFiltersString
  }
];

export const ACTIONS = [APPLY_FILTERS, EMPTY_FILTERS];
