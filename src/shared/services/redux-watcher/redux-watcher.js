// Tight coupling between Redux and Angular global state
// Code extracted from view components that were also doing business logic.
// DO NOT REPEAT ANY OF THESE PATTERNS!!!

import watch from 'redux-watch';
import { MAP_ADD_PANO_OVERLAY, MAP_REMOVE_PANO_OVERLAY } from '../../../map/ducks/map/map';
import {
  getDetailEndpoint,
  getGeosearchLocation,
  isMapPreviewPanelActive,
  isStraatbeeldActive
} from './redux-watch-selectors';

// mimics dashboard.component behavior:
// $scope.$watchGroup(['vm.isStraatbeeldActive', 'vm.straatbeeldHistory'], () => {
//     console.log('watcher firing');
//     if (vm.isStraatbeeldActive) {
//         store.dispatch({ type: ACTIONS.MAP_ADD_PANO_OVERLAY.id, payload: ... });
//     } else {
//         $timeout(() => store.dispatch({ type: ACTIONS.MAP_REMOVE_PANO_OVERLAY.id }));
//     }
// });
//
// along with:
// store.subscribe(() => {
//   vm.isStraatbeeldActive = Boolean(state.straatbeeld);
//   vm.straatbeeldHistory = vm.isStraatbeeldActive ? state.straatbeeld.history : null;
// });
//

function ReduxWatcher(store) {
  const { getState, subscribe, dispatch } = store;
  const watchStraatbeeld = watch(() => isStraatbeeldActive(getState()));
  const watchMapPreviewPanel = watch(() => isMapPreviewPanelActive(getState()));
  const watchGeosearchLocation = watch(() => getGeosearchLocation(getState()));
  const watchDetailEndpoint = watch(() => getDetailEndpoint(getState()));

  subscribe(watchStraatbeeld((active) => {
    const state = getState();
    if (active) {
      dispatch({ type: MAP_ADD_PANO_OVERLAY, payload: state.straatbeeld });
    } else {
      setTimeout(() => dispatch({ type: MAP_REMOVE_PANO_OVERLAY }));
    }
  }));

  // Open or close React `MapPreviewPanel` app
  function checkMapPreviewPanel() {
    const state = getState();
    const endpointTypes = window.mapPreviewPanelDetailEndpointTypes || {};
    const detailEndpoint = getDetailEndpoint(state);

    const detailActive = detailEndpoint && Object
      .keys(endpointTypes)
      .some((typeKey) => detailEndpoint.includes(endpointTypes[typeKey]));

    if (isMapPreviewPanelActive(state) && (getGeosearchLocation(state) || detailActive)) {
      store.dispatch({ type: 'OPEN_MAP_PREVIEW_PANEL' });
    } else {
      store.dispatch({ type: 'CLOSE_MAP_PREVIEW_PANEL' });
    }
  }

  subscribe(watchMapPreviewPanel(checkMapPreviewPanel));
  subscribe(watchGeosearchLocation(checkMapPreviewPanel));
  subscribe(watchDetailEndpoint(checkMapPreviewPanel));

  // Hack to initially call the checkMapPreview, as it's not called the first time
  // because the default values didn't change when initialize the app
  setTimeout(checkMapPreviewPanel);
}

export default ReduxWatcher;
