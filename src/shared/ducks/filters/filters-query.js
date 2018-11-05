import { APPLY_FILTERS, EMPTY_FILTERS, getFilters } from './filters';

/* istanbul ignore next */ // TODO: refactor, test
const getFiltersString = (state) => (
  Object.keys(getFilters(state)).length ? JSON.stringify(getFilters(state)) : undefined
);

export default {
  filters: {
    selector: getFiltersString,
    addHistory: true
  }
};

export const ACTIONS = [APPLY_FILTERS, EMPTY_FILTERS];
