import { createSelector } from 'reselect';
import { CMS_PAGE_MAPPING, initialState, REDUCER_KEY } from './constants';
import { getPage } from '../../../store/redux-first-router/selectors';

const getReducerObject = (state) => state[REDUCER_KEY];

const getValueFromReducerOrConfig = (key) => createSelector(
  getReducerObject, getPage,
  (reducerObject, page) => (
    reducerObject[key] || CMS_PAGE_MAPPING[page][key] || initialState[key]
  ));

export const getItem = createSelector(getValueFromReducerOrConfig('item'), (value) => value);
export const getType = createSelector(getValueFromReducerOrConfig('type'), (value) => value);
export const getTemplateName = createSelector(getValueFromReducerOrConfig('template'), (value) => value);
