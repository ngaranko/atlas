import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash.get';

import { maximizeMapPreviewPanel, closeMapPreviewPanel }
  from '../../ducks/preview-panel/map-preview-panel';
import { selectLatestMapSearchResults, getMapSearchResults }
  from '../../ducks/search-results/map-search-results';
import { selectLatestMapDetail, getMapDetail } from '../../ducks/detail/map-detail';
import { fetchDetail as legacyFetchDetail } from '../../../reducers/details';
import { getPanoPreview } from '../../../pano/ducks/preview/pano-preview';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';
import CloseIcon from '../../../../public/images/icon-cross-big.svg';
import MapSearchResults from '../../components/search-results/MapSearchResults';
import MapDetailResult from '../../components/detail-result/MapDetailResult';
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator';

const mapStateToProps = (state) => ({
  isMapPreviewPanelVisible: state.isMapPreviewPanelVisible,
  pano: state.pano,
  results: selectLatestMapSearchResults(state),
  search: state.search,
  searchLocation: state.search && state.search.location && {
    latitude: state.search.location[0],
    longitude: state.search.location[1]
  },
  searchLocationId: state.search && state.search.location && state.search.location.toString(),
  detail: state.detail,
  detailResult: selectLatestMapDetail(state),
  user: state.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onMapPreviewPanelClose: closeMapPreviewPanel,
  onMapPreviewPanelMaximize: maximizeMapPreviewPanel,
  onMapSearchResultsItemClick: legacyFetchDetail
}, dispatch);

const isUpdated = (props, prevProps, paths) => {
  if (typeof paths === 'string') {
    const newValue = get(props, paths);
    const oldValue = get(prevProps, paths);
    return newValue && oldValue !== newValue;
  }

  // Every path must exist in props
  return paths.every((path) => get(props, path)) &&
    // Some paths must have been updated
    paths.some((path) => isUpdated(props, prevProps, path));
};

const update = (dispatch, props, prevProps = {}) => {
  if (isUpdated(props, prevProps, 'detail.endpoint')) {
    dispatch(getMapDetail(props.detail.endpoint, props.user));
  } else if (isUpdated(props, prevProps, 'detailResult.location')) {
    dispatch(getPanoPreview(props.detailResult.location));
  } else if (isUpdated(props, prevProps, ['searchLocation.latitude', 'searchLocation.longitude'])) {
    dispatch(getMapSearchResults(props.searchLocation, props.user));
    dispatch(getPanoPreview(props.searchLocation));
  }
};

class MapPreviewPanelContainer extends React.Component {
  componentDidMount() {
    update(this.context.store.dispatch, this.props);
  }

  componentDidUpdate(prevProps) {
    update(this.context.store.dispatch, this.props, prevProps);
  }

  render() {
    const props = this.props;
    const detailLocationId = get(props, 'detailResult.location') && Object
      .keys(props.detailResult.location)
      .map((key) => props.detailResult.location[key])
      .toString();
    const panoSearchPreview = get(props, `pano.previews['${props.searchLocationId}']`, {});
    const panoDetailPreview = get(props, `pano.previews['${detailLocationId}']`, {});
    const isSearchLoaded = props.search && !props.search.isLoading && props.searchLocation;
    const isDetailLoaded = props.detail && !props.detail.isLoading && props.detailResult;
    const isLoading = get(props, 'search.isLoading') || get(props, 'detail.isLoading');

    return (
      <section className={`
        map-preview-panel
        map-preview-panel--${props.isMapPreviewPanelVisible ? 'visible' : 'hidden'}
      `}
      >
        <div className="map-preview-panel__heading">
          <button
            className="map-preview-panel__button"
            onClick={props.onMapPreviewPanelMaximize}
          >
            <MaximizeIcon className="map-preview-panel__button-icon" />
          </button>
          <button
            className="map-preview-panel__button"
            onClick={props.onMapPreviewPanelClose}
          >
            <CloseIcon className="map-preview-panel__button-icon" />
          </button>
        </div>
        <div
          className={`
            map-preview-panel__body
            map-preview-panel__body--${isLoading ? 'loading' : 'loaded'}
          `}
        >
          {isLoading && (
            <LoadingIndicator />
          )}
          {isDetailLoaded && (
            <MapDetailResult
              endpoint={props.detail.endpoint}
              panoUrl={panoDetailPreview.url}
              result={props.detailResult}
            />
          )}
          {!isDetailLoaded && isSearchLoaded && (
            <MapSearchResults
              count={props.search.numberOfResults}
              location={props.searchLocation}
              panoUrl={panoSearchPreview.url}
              results={props.results}
              onItemClick={props.onMapSearchResultsItemClick}
            />
          )}
        </div>
      </section>
    );
  }
}

MapPreviewPanelContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

MapPreviewPanelContainer.defaultProps = {
  isMapPreviewPanelVisible: false,
  pano: {},
  results: [],
  search: {},
  searchLocation: null,
  searchLocationId: '',
  detail: {},
  detailResult: {},
  user: {}
};

MapPreviewPanelContainer.propTypes = {
  isMapPreviewPanelVisible: PropTypes.bool,
  onMapPreviewPanelClose: PropTypes.func.isRequired,
  onMapPreviewPanelMaximize: PropTypes.func.isRequired,
  onMapSearchResultsItemClick: PropTypes.func.isRequired,
  pano: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  results: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  search: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchLocation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchLocationId: PropTypes.string,
  detail: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  detailResult: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanelContainer);
