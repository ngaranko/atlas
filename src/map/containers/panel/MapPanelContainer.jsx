import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBaseLayers } from '../../ducks/layers/base-layers';
import { setBaseLayer } from '../../ducks/base-layer/base-layer';
import { getMapLayers, selectActiveMapLayers } from '../../ducks/layers/map-layers';
import { toggleMapOverlay, toggleMapOverlayVisibility } from '../../ducks/overlays/overlays';
import MapLayers from '../../components/layers/MapLayers';
import MapLegend from '../../components/legend/MapLegend';
import MapType from '../../components/type/MapType';
import MapLayersIcon from '../../../../public/images/icon-map-layers.svg';

const mapStateToProps = state => ({
  activeMapLayers: selectActiveMapLayers(state),
  atlas: state.atlas,
  layerSelection: state.layerSelection,
  baseLayers: state.baseLayers,
  baseLayer: state.map.baseLayer,
  mapLayers: state.mapLayers,
  overlays: state.map.overlays,
  zoomLevel: state.map.zoom
});

// TODO: Add method that checks whether layer is active and toggles accordingly
const mapDispatchToProps = dispatch => bindActionCreators({
  onLayerToggle: toggleMapOverlay,
  onBaseLayerToggle: setBaseLayer,
  onLayersToggle: toggleMapOverlay,
  onLayerVisibilityToggle: toggleMapOverlayVisibility
}, dispatch);

class MapPanelContainer extends React.Component {
  componentDidMount() {
    this.context.store.dispatch(getBaseLayers());
    this.context.store.dispatch(getMapLayers());
  }

  render() {
    return this.props.layerSelection.isEnabled && (
      <section className="map-panel">
        <div className="map-panel__heading">
          <MapLayersIcon className="map-panel__heading-icon" />
          <h1 className="map-panel__heading-title">Kaartlagen</h1>
        </div>
        <div className="scroll-wrapper">
          {this.props.activeMapLayers.length > 0 && (
            <MapLegend
              activeMapLayers={this.props.activeMapLayers}
              onLayerToggle={this.props.onLayerToggle}
              onLayerVisibilityToggle={this.props.onLayerVisibilityToggle}
              overlays={this.props.overlays}
              zoomLevel={this.props.zoomLevel}
            />
          )}
          <MapType
            layers={this.props.baseLayers}
            activeLayer={this.props.baseLayer}
            onBaseLayerToggle={this.props.onBaseLayerToggle}
          />
          <MapLayers
            activeMapLayers={this.props.activeMapLayers}
            layers={this.props.mapLayers}
            onLayerToggle={this.props.onLayerToggle}
          />
        </div>
      </section>
    );
  }
}

MapPanelContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

MapPanelContainer.defaultProps = {
  activeMapLayers: [],
  atlas: {},
  layerSelection: {},
  map: {},
  baseLayers: {},
  mapLayers: [],
  zoomLevel: 0
};

MapPanelContainer.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
  atlas: PropTypes.object, // eslint-disable-line
  layerSelection: PropTypes.object, // eslint-disable-line
  map: PropTypes.object, // eslint-disable-line
  baseLayers: PropTypes.object, // eslint-disable-line
  mapLayers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func, // eslint-disable-line
  onBaseLayerToggle: PropTypes.func, // eslint-disable-line
  onLayersToggle: PropTypes.func, // eslint-disable-line
  onLayerVisibilityToggle: PropTypes.func, // eslint-disable-line
  overlays: PropTypes.array, // eslint-disable-line
  zoomLevel: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPanelContainer);
