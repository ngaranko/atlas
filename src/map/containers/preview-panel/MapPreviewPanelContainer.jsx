import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchSearchResultsByLocation
} from '../../ducks/preview-panel/map-preview-panel';
import { selectNotClickableVisibleMapLayers } from '../../ducks/panel-layers/map-panel-layers';
import { selectLatestMapDetail } from '../../ducks/detail/map-detail';
import { isEmbedded, isEmbedPreview } from '../../../shared/ducks/ui/ui';
import {
  DETAIL_VIEW,
  getDetail
} from '../../../shared/ducks/detail/detail';
import MapPreviewPanel from './MapPreviewPanel';
import {
  getLocationId,
  getSelectedLocation,
  getShortSelectedLocation,
  selectLatestMapSearchResults
} from '../../ducks/map/map-selectors';
import { getPageActionEndpoint, toGeoSearchView, toMap, toPanorama } from '../../../app/routes';
import { isGeoSearch } from '../../../shared/ducks/selection/selection';

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
  isEmbed: isEmbedPreview(state) || isEmbedded(state),
  isSearchPreview: isGeoSearch(state)
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    closePanel: toMap,
    onSearchMaximize: toGeoSearchView
  }, dispatch),
  openPanoById: (pano) => {
    const action = toPanorama(pano.id);
    return dispatch(action);
  },
  openPreviewDetail: (endpoint) => {
    return dispatch(getPageActionEndpoint(endpoint, DETAIL_VIEW.MAP));
  },
  openDetail: (endpoint) => {
    return dispatch(getPageActionEndpoint(endpoint));
  },
  openPreviewSearch: () => {
    // TODO: refactor, merge in query string solution first
  }
});

/* eslint-enable react/no-unused-prop-types */
export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanel);
