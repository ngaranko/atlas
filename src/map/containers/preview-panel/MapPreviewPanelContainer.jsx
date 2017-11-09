import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  maximizeMapPreviewPanel,
  closeMapPreviewPanel
} from '../../ducks/preview-panel/map-preview-panel';
import { getMapGeoSearch } from '../../ducks/geo-search/map-geo-search';
import { getMapPano } from '../../ducks/pano/map-pano';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';
import CloseIcon from '../../../../public/images/icon-cross-big.svg';
import MapResults from '../../components/results/MapResults';
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator';

const mapStateToProps = (state) => ({
  isMapPreviewPanelVisible: state.isMapPreviewPanelVisible,
  search: state.search,
  results: state.mapResults,
  pano: state.mapPano
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onMapPreviewPanelMaximize: maximizeMapPreviewPanel,
  onMapPreviewPanelClose: closeMapPreviewPanel
}, dispatch);

const fetchData = (props, context) => {
  context.store.dispatch(getMapGeoSearch(props.search.location));
  context.store.dispatch(getMapPano(props.search.location));
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
    return (
      <section className={`
        map-preview
        ${this.props.isMapPreviewPanelVisible ? '' : 'map-preview--hidden'}
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
            ${this.props.search && this.props.search.isLoading ? 'map-preview__body--loading' : ''}
          `}
        >
          { this.props.search && this.props.search.isLoading &&
            <LoadingIndicator />
          }
          { this.props.search && !this.props.search.isLoading && this.props.pano &&
            <MapResults
              count={this.props.search.numberOfResults}
              location={this.props.search.location}
              panoUrl={this.props.pano.url}
              results={this.props.results}
            />
          }
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
  pano: {}
};

MapPreviewPanelContainer.propTypes = {
  isMapPreviewPanelVisible: PropTypes.bool,
  search: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  results: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  pano: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onMapPreviewPanelMaximize: PropTypes.func.isRequired,
  onMapPreviewPanelClose: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanelContainer);
