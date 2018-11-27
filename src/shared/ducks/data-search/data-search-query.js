import { initialState, getSearchQuery } from './data-search';
import { EMPTY_FILTERS } from '../filters/filters';

export default {
  zoekterm: {
    selector: getSearchQuery,
    defaultValue: initialState.query
  }
};

export const ACTIONS = [
  EMPTY_FILTERS
];
