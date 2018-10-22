import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchSearchResultsByLocation,
  showSearchView
} from '../../ducks/preview-panel/map-preview-panel';
import { selectNotClickableVisibleMapLayers } from '../../ducks/panel-layers/map-panel-layers';
import { selectLatestMapDetail } from '../../ducks/detail/map-detail';
import { isEmbedded, isEmbedPreview } from '../../../shared/ducks/ui/ui';
import {
  getDetail,
  setDetailEndpointRoute,
  toMapDetail
} from '../../../shared/ducks/detail/detail';
import MapPreviewPanel from './MapPreviewPanel';
import {
  getLocationId,
  getSelectedLocation,
  getShortSelectedLocation,
  selectLatestMapSearchResults
} from '../../ducks/map/map-selectors';
import { getPageActionEndpoint, toMap, toPanorama } from '../../../app/routes';

const mapStateToProps = (state) => ({
  mapClickLocation: getSelectedLocation(state),
  pano: state.pano,
  results: selectLatestMapSearchResults(state),
  search: state.search,
  searchLocation: getShortSelectedLocation(state),
  searchLocationId: getLocationId(state),
  missingLayers: selectNotClickableVisibleMapLayers(state)
    .map((mapLayer) => mapLayer.title)
    .join(', '),
  detail: getDetail(state),
  mapDetail: state.mapDetail,
  detailResult: selectLatestMapDetail(state) || null,
  user: state.user,
  isEmbed: isEmbedPreview(state) || isEmbedded(state)
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    onSearch: fetchSearchResultsByLocation,
    onMapPreviewPanelClose: toMap,
    onMapPreviewPanelMaximizeDetail: toMapDetail,
    onMapPreviewPanelMaximizeSearch: showSearchView,
    onMapSearchResultsItemClick: setDetailEndpointRoute,
    closeMapFullScreen: () => {} // TODO: refactor, use or remove
  }, dispatch),
  onOpenPanoById: (pano) => {
    const action = toPanorama(pano.id);
    return dispatch(action);
  },
  onMapSearchResultsItemClick: (endpoint) => {
    const action = getPageActionEndpoint(endpoint);
    return dispatch(action);
  }
});

/* eslint-enable react/no-unused-prop-types */
export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanel);
