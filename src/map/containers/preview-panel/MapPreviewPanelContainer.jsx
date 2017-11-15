import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  maximizeMapPreviewPanel,
  closeMapPreviewPanel
} from '../../ducks/preview-panel/map-preview-panel';
import { getMapSearchResults } from '../../ducks/search-results/map-search-results';
import { getPanoPreview } from '../../../pano/ducks/preview/pano-preview';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';
import CloseIcon from '../../../../public/images/icon-cross-big.svg';
import MapSearchResults from '../../components/search-results/MapSearchResults';
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator';

const mapStateToProps = (state) => ({
  isMapPreviewPanelVisible: state.isMapPreviewPanelVisible,
  search: state.search,
  results: state.mapSearchResults,
  pano: state.pano,
  user: state.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onMapPreviewPanelMaximize: maximizeMapPreviewPanel,
  onMapPreviewPanelClose: closeMapPreviewPanel
}, dispatch);

const fetchData = (props, context) => {
  context.store.dispatch(getMapSearchResults(props.search.location, props.user));
  context.store.dispatch(getPanoPreview(props.search.location));
};

class MapPreviewPanelContainer extends React.Component {
  componentDidMount() {
    if (this.props.search && this.props.search.location) {
      fetchData(this.props, this.context);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.search &&
      this.props.search.location && (
        !prevProps.search ||
        !prevProps.search.location ||
        prevProps.search.location[0] !== this.props.search.location[0] ||
        prevProps.search.location[1] !== this.props.search.location[1]
      )
    ) {
      fetchData(this.props, this.context);
    }
  }

  render() {
    const search = this.props.search;
    const pano = this.props.pano;
    const panoPreview = (search && pano && pano.previews[search.location]) || {};
    const isLoading = search && this.props.search.isLoading;
    const isLoaded = search && !this.props.search.isLoading;

    return (
      <section className={`
        map-preview
        map-preview--${this.props.isMapPreviewPanelVisible ? 'visible' : 'hidden'}
      `}
      >
        <div className="map-preview__heading">
          <button
            className="map-preview__button"
            onClick={this.props.onMapPreviewPanelMaximize}
          >
            <MaximizeIcon className="map-preview__button-icon" />
          </button>
          <button
            className="map-preview__button"
            onClick={this.props.onMapPreviewPanelClose}
          >
            <CloseIcon className="map-preview__button-icon" />
          </button>
        </div>
        <div
          className={`
            map-preview__body
            map-preview__body--${isLoading ? 'loading' : 'loaded'}
          `}
        >
          {isLoading && (
            <LoadingIndicator />
          )}
          {(isLoaded && pano) && (
            <MapSearchResults
              count={search.numberOfResults}
              location={search.location}
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
  search: {},
  results: [],
  pano: {},
  user: {}
};

MapPreviewPanelContainer.propTypes = {
  isMapPreviewPanelVisible: PropTypes.bool,
  search: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  results: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  pano: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onMapPreviewPanelMaximize: PropTypes.func.isRequired,
  onMapPreviewPanelClose: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanelContainer);
