import { put, takeLatest, select } from 'redux-saga/effects';

import ACTIONS from '../../../shared/actions';

const getMapZoom = (state) => state.map.zoom;
const getStraatbeeld = (state) => state.straatbeeld;
const getMapPanelLayers = (state) => state.mapLayers.panelLayers.items;

const getMapLayers = (state) => (
  state.map.overlays.map((overlay) => (
    state.mapLayers.layers.items.find((layer) => layer.id === overlay.id) || { noDetail: true }
  )).filter((layer) => (
   layer.detailUrl && !layer.noDetail
  )).filter((layer) => (
   !layer.authScope || state.user.scopes.includes(layer.authScope)
  ))
);

function* switchClickAction(payload) {
  const straatbeeld = yield select(getStraatbeeld);
  const zoom = yield select(getMapZoom);
  const panelLayers = yield select(getMapPanelLayers);
  const allLayers = yield select(getMapLayers);
  const layers = allLayers.filter((layer) => {
    const matchingPanelLayer = panelLayers.find((panelLayer) => (
      panelLayer.id === layer.id ||
      panelLayer.legendItems.some((legendItem) => legendItem.id === layer.id)
    ));
    return matchingPanelLayer &&
      zoom <= matchingPanelLayer.maxZoom &&
      zoom >= matchingPanelLayer.minZoom;
  });
  if (!straatbeeld && layers.length > 0) {
    yield put({
      type: 'REQUEST_NEAREST_DETAILS',
      payload: {
        location: payload.location,
        layers,
        zoom
      }
    });
  } else {
    yield put({
      type: 'REQUEST_GEOSEARCH',
      payload: [payload.location.latitude, payload.location.longitude]
    });
  }
}

export default function* watchMapClick() {
  yield takeLatest(ACTIONS.SET_MAP_CLICK_LOCATION.id, switchClickAction);
}
