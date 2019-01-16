
import { FETCH_DETAIL, SET_VIEW, SHOW_DETAIL, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_FAILURE } from './constants';

export const fetchDetail = (payload) => ({
  type: FETCH_DETAIL,
  payload
});

export const showDetail = (payload) => ({
  type: SHOW_DETAIL,
  payload
});

export const setView = (payload) => ({
  type: SET_VIEW,
  payload
});

export const fetchDetailRequest = (payload) => ({
  type: FETCH_DETAIL_REQUEST,
  payload
});

export const fetchDetailSuccess = (payload) => ({
  type: FETCH_DETAIL_SUCCESS,
  payload
});

export const fetchDetailFailure = (payload) => ({
  type: FETCH_DETAIL_FAILURE,
  payload
});
