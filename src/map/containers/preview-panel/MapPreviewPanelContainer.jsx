import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { maximizeMapPreviewPanel, closeMapPreviewPanel }
  from '../../ducks/preview-panel/map-preview-panel';
import { selectLatestMapSearchResults, getMapSearchResults }
  from '../../ducks/search-results/map-search-results';
import { getPanoPreview } from '../../../pano/ducks/preview/pano-preview';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';
import CloseIcon from '../../../../public/images/icon-cross-big.svg';
import MapSearchResults from '../../components/search-results/MapSearchResults';
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
  user: state.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onMapPreviewPanelClose: closeMapPreviewPanel,
  onMapPreviewPanelMaximize: maximizeMapPreviewPanel
}, dispatch);

const fetchData = (context, location, user) => {
  context.store.dispatch(getMapSearchResults(location, user));
  context.store.dispatch(getPanoPreview(location));
};

class MapPreviewPanelContainer extends React.Component {
  componentDidMount() {
    if (this.props.searchLocation) {
      fetchData(this.context, this.props.searchLocation, this.props.user);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchLocation && (
        !prevProps.searchLocation ||
        prevProps.searchLocation.latitude !== this.props.searchLocation.latitude ||
        prevProps.searchLocation.longitude !== this.props.searchLocation.longitude
      )
    ) {
      fetchData(this.context, this.props.searchLocation, this.props.user);
    }
  }

  render() {
    const search = this.props.search || {};
    const pano = this.props.pano || {};
    const panoPreview = (this.props.searchLocation && pano.previews &&
      pano.previews[this.props.searchLocationId]) || {};
    const isLoaded = this.props.search && !search.isLoading && this.props.searchLocation;
    const isLoading = this.props.search && search.isLoading;

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
          {isLoaded && (
            <MapSearchResults
              count={search.numberOfResults}
              location={this.props.searchLocation}
              panoUrl={panoPreview.url}
              results={this.props.results}
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
  user: {}
};

MapPreviewPanelContainer.propTypes = {
  isMapPreviewPanelVisible: PropTypes.bool,
  onMapPreviewPanelClose: PropTypes.func.isRequired,
  onMapPreviewPanelMaximize: PropTypes.func.isRequired,
  pano: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  results: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  search: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchLocation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchLocationId: PropTypes.string, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanelContainer);
