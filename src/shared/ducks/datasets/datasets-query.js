import { FETCH_DATASETS_SUCCESS, initialState, SET_PAGE } from './data/data';
import { getPage, getSearchText } from './datasets';
import { EMPTY_FILTERS } from '../filters/filters';

export default {
  page: {
    selector: getPage,
    defaultValue: initialState.page
  },
  zoekterm: {
    selector: getSearchText,
    defaultValue: initialState.searchText
  }
};

export const ACTIONS = [
  SET_PAGE,
  FETCH_DATASETS_SUCCESS,
  EMPTY_FILTERS
];
