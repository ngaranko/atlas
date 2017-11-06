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
import MaximizeIcon from '../../../../public/images/icon-arrow-down.svg';
import CloseIcon from '../../../../public/images/icon-cross.svg';
import MapResults from '../../components/results/MapResults';

const mapStateToProps = state => ({
  isMapPreviewPanelVisible: state.isMapPreviewPanelVisible,
  search: state.search,
  results: state.mapResults,
  pano: state.mapPano
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMapPreviewPanelMaximize: maximizeMapPreviewPanel,
  onMapPreviewPanelClose: closeMapPreviewPanel
}, dispatch);

class MapPreviewPanelContainer extends React.Component {
  componentDidMount() {
    if (this.props.search && this.props.search.location) {
      this.context.store.dispatch(getMapGeoSearch(this.props.search.location));
      this.context.store.dispatch(getMapPano(this.props.search.location));
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
      this.context.store.dispatch(getMapGeoSearch(this.props.search.location));
      this.context.store.dispatch(getMapPano(this.props.search.location));
    }
  }

  render() {
    return (
      <section className={`
        map-panel
        map-panel--preview
        ${this.props.isMapPreviewPanelVisible ? '' : 'map-panel--hidden'}
      `}
      >
        <div className="map-panel__heading">
          <h1 className="map-panel__heading-title map-panel__heading-title--hidden">Preview</h1>
          <button
            className="map-panel__toggle"
            onClick={this.props.onMapPreviewPanelMaximize}
          >
            <MaximizeIcon className="map-panel__toggle-icon" />
          </button>
          <button
            className="map-panel__toggle"
            onClick={this.props.onMapPreviewPanelClose}
          >
            <CloseIcon className="map-panel__toggle-icon" />
          </button>
        </div>
        <div className="map-panel__body">
          <MapResults
            count={this.props.search.numberOfResults}
            location={this.props.search.location}
            panoUrl={this.props.pano.url}
            results={this.props.results} />
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
  search: PropTypes.object,
  results: PropTypes.array,
  pano: PropTypes.object,
  onMapPreviewPanelMaximize: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanelContainer);
