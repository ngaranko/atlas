import { put, takeLatest, select } from 'redux-saga/effects';

import { getMapPanelLayers } from '../../ducks/panel-layers/map-panel-layers';
import { getStraatbeeld } from '../../ducks/straatbeeld/straatbeeld';
import { getMapZoom } from '../../ducks/map/map';

import ACTIONS from '../../../shared/actions';

const getMapLayers = (state) => (
  state.map.overlays.map((overlay) => {
    const matchingMapLayer =
      state.mapLayers.layers.items.find((layer) => layer.id === overlay.id) || {};
    return {
      ...matchingMapLayer,
      isVisible: overlay.isVisible
    };
  }).filter((layer) => (
   layer.isVisible === true && layer.detailUrl && !layer.noDetail &&
   (!layer.authScope || state.user.scopes.includes(layer.authScope))
 ))
);

export function* switchClickAction(payload) {
  const straatbeeld = yield select(getStraatbeeld);
  const zoom = yield select(getMapZoom);
  const panelLayers = yield select(getMapPanelLayers);
  const activeMapLayers = yield select(getMapLayers);
  const layers = activeMapLayers.filter((layer) => {
    const matchingPanelLayer = panelLayers.find((panelLayer) => (
      panelLayer.id === layer.id ||
      panelLayer.legendItems.some((legendItem) => legendItem.id === layer.id)
    ));
    return matchingPanelLayer &&
      zoom <= matchingPanelLayer.maxZoom &&
      zoom >= matchingPanelLayer.minZoom;
  });
  if (!straatbeeld && layers.length) {
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
