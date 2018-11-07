import { FETCH_DATASETS_SUCCESS, initialState, SET_PAGE } from './data/data';
import { getPage } from './datasets';

export default {
  page: {
    selector: getPage,
    defaultValue: initialState.page
  }
};

export const ACTIONS = [
  SET_PAGE,
  FETCH_DATASETS_SUCCESS
];
