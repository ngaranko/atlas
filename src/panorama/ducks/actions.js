// Actions creators
import {
  FETCH_PANORAMA_ERROR,
  FETCH_PANORAMA_REQUEST,
  FETCH_PANORAMA_SUCCESS,
  SET_PANORAMA_LOCATION,
  SET_PANORAMA_ORIENTATION,
  SET_PANORAMA_VIEW,
  FETCH_PANORAMA_REQUEST_CLICK,
  FETCH_PANORAMA_REQUEST_TOGGLE
} from './constants';

export const fetchPanoramaRequest = (payload) => ({
  type: FETCH_PANORAMA_REQUEST,
  payload,
  meta: {
    tracking: true
  }
});

export const fetchPanoramaRequestClick = (payload) => ({
  type: FETCH_PANORAMA_REQUEST_CLICK,
  payload,
  meta: {
    tracking: true
  }
});

export const fetchPanoramaRequestToggle = (payload) => ({
  type: FETCH_PANORAMA_REQUEST_TOGGLE,
  payload
});

export const fetchPanoramaSuccess = (payload) => ({
  type: FETCH_PANORAMA_SUCCESS,
  payload,
  meta: {
    tracking: payload
  }
});
export const fetchPanoramaError = (error) => ({
  type: FETCH_PANORAMA_ERROR,
  payload: error
});
export const setPanoramaLocation = (payload) => ({
  type: SET_PANORAMA_LOCATION,
  payload,
  meta: {
    tracking: true
  }
});
export const setView = (payload) => ({
  type: SET_PANORAMA_VIEW,
  payload,
  meta: {
    tracking: payload
  }
});
export const setPanoramaOrientation = ({ heading, pitch, fov }) => ({
  type: SET_PANORAMA_ORIENTATION,
  payload: {
    heading,
    pitch,
    fov
  }
});
