import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

const fetchDetail = (context, endpoint, result, user) => {
  context.store.dispatch(getMapDetail(endpoint, user));
  if (result && result.location) {
    context.store.dispatch(getPanoPreview(result.location));
  }
};

const fetchResults = (context, location, user) => {
  context.store.dispatch(getMapSearchResults(location, user));
  context.store.dispatch(getPanoPreview(location));
};

class MapPreviewPanelContainer extends React.Component {
  componentDidMount() {
    if (this.props.detail && this.props.detail.endpoint) {
      fetchDetail(
        this.context,
        this.props.detail.endpoint,
        this.props.detailResult,
        this.props.user);
    } else if (this.props.searchLocation) {
      fetchResults(this.context, this.props.searchLocation, this.props.user);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.detail && this.props.detail.endpoint && (
      !prevProps.detail ||
      !prevProps.detail.endpoint ||
      prevProps.detail.endpoint !== this.props.detail.endpoint)
    ) {
      fetchDetail(
        this.context,
        this.props.detail.endpoint,
        this.props.detailResult,
        this.props.user);
    } else if (this.props.searchLocation && (
      !prevProps.searchLocation ||
      prevProps.searchLocation.latitude !== this.props.searchLocation.latitude ||
      prevProps.searchLocation.longitude !== this.props.searchLocation.longitude)
    ) {
      fetchResults(this.context, this.props.searchLocation, this.props.user);
    }
  }

  render() {
    const search = this.props.search || {};
    const detail = this.props.detail || {};
    const pano = this.props.pano || {};
    const panoSearchPreview = (this.props.searchLocation && pano.previews &&
      pano.previews[this.props.searchLocationId]) || {};
    const panoDetailPreview = (this.props.detail && detail.location && pano.previews &&
      pano.previews[detail.location]) || {};
    const isSearchLoaded = this.props.search && !search.isLoading && this.props.searchLocation;
    const isDetailLoaded = this.props.detail && !detail.isLoading && this.props.detailResult;
    const isLoading = (this.props.search && search.isLoading) ||
      (this.props.detail && detail.isLoading);

    return (
      <section className={`
        map-preview-panel
        map-preview-panel--${this.props.isMapPreviewPanelVisible ? 'visible' : 'hidden'}
      `}
      >
        <div className="map-preview-panel__heading">
          <button
            className="map-preview-panel__button"
            onClick={this.props.onMapPreviewPanelMaximize}
          >
            <MaximizeIcon className="map-preview-panel__button-icon" />
          </button>
          <button
            className="map-preview-panel__button"
            onClick={this.props.onMapPreviewPanelClose}
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
              endpoint={this.props.detail.endpoint}
              panoUrl={panoDetailPreview.url}
              result={this.props.detailResult}
            />
          )}
          {!isDetailLoaded && isSearchLoaded && (
            <MapSearchResults
              count={search.numberOfResults}
              location={this.props.searchLocation}
              panoUrl={panoSearchPreview.url}
              results={this.props.results}
              onItemClick={this.props.onMapSearchResultsItemClick}
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
