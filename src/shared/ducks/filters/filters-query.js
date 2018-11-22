import { ADD_FILTER, EMPTY_FILTERS, getFilters } from './filters';

/* istanbul ignore next */ // TODO: refactor, test
const getFiltersString = (state) => (
  Object.keys(getFilters(state)).length ? btoa(JSON.stringify(getFilters(state))) : undefined
);

export default {
  filters: {
    selector: getFiltersString,
    addHistory: true
  }
};

export const ACTIONS = [ADD_FILTER, EMPTY_FILTERS];
