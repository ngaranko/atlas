import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import apiSpecificationReducer, { API_SPECIFICATION } from './apiSpecification/apiSpecification'

const REDUCER_KEY = 'datasets'

export { REDUCER_KEY as DATASETS }

export default combineReducers({
  [API_SPECIFICATION]: apiSpecificationReducer,
})

// Selectors
export const getApiSpecification = state => state[REDUCER_KEY][API_SPECIFICATION]

const getStateOfKey = {
  apiSpec: key => state =>
    createSelector(
      getApiSpecification,
      data => data[key],
    )(state),
}

export const getApiSpecificationData = getStateOfKey.apiSpec('data')
