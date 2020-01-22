import {
  CLEAR_MAP_DETAIL,
  SET_VIEW,
  SHOW_DETAIL,
  FETCH_DETAIL_REQUEST,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_FAILURE,
  DOWNLOAD_DATASET_RESOURCE,
} from './constants'

export const clearMapDetail = payload => ({
  type: CLEAR_MAP_DETAIL,
  payload,
})

export const showDetail = payload => ({
  type: SHOW_DETAIL,
  payload,
})

export const setView = payload => ({
  type: SET_VIEW,
  payload,
})

export const fetchDetailRequest = payload => ({
  type: FETCH_DETAIL_REQUEST,
  payload,
})

export const fetchDetailSuccess = payload => ({
  type: FETCH_DETAIL_SUCCESS,
  payload,
  meta: {
    tracking: true,
  },
})

export const fetchDetailFailure = payload => ({
  type: FETCH_DETAIL_FAILURE,
  payload,
})

export const downloadDatasetResource = payload => ({
  type: DOWNLOAD_DATASET_RESOURCE,
  meta: {
    tracking: payload,
  },
})
