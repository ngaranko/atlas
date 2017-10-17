import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBaseLayers } from '../../ducks/base-layers/base-layers';
import { setBaseLayer } from '../../ducks/base-layer/base-layer';
import { toggleMapOverlay, toggleMapOverlayVisibility } from '../../ducks/overlays/overlays';
import { getMapLayers, selectActiveMapLayers } from '../../ducks/layers/map-layers';
import { toggleMapPanel } from '../../ducks/panel/map-panel';
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
  isLegendVisible: state.map.showActiveOverlays,
  isMapLayersVisible: state.layerSelection.isEnabled,
  isMapPanelVisible: state.isMapPanelVisible,
  mapLayers: state.mapLayers,
  overlays: state.map.overlays,
  zoomLevel: state.map.zoom,
  user: state.user
});

// TODO: Add method that checks whether layer is active and toggles accordingly
const mapDispatchToProps = dispatch => bindActionCreators({
  onLayerToggle: toggleMapOverlay,
  onBaseLayerToggle: setBaseLayer,
  onLayersToggle: toggleMapOverlay,
  onLayerVisibilityToggle: toggleMapOverlayVisibility,
  onMapPanelToggle: toggleMapPanel
}, dispatch);

class MapPanelContainer extends React.Component {
  componentDidMount() {
    this.context.store.dispatch(getBaseLayers());
    this.context.store.dispatch(getMapLayers());
  }

  render() {
    return (
      <section className={`
        map-panel
        map-panel--${this.props.isMapPanelVisible ? 'expanded' : 'collapsed'}
      `}
      >
        <div className="map-panel__heading">
          <MapLayersIcon className="map-panel__heading-icon" />
          <h1 className="map-panel__heading-title">Kaartlagen</h1>
          <button
            className="map-panel__toggle"
            onClick={this.props.onMapPanelToggle}
          >
            Toggle
          </button>
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
            user={this.props.user}
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
  isMapPanelVisible: false,
  layerSelection: {},
  map: {},
  baseLayers: {},
  mapLayers: [],
  zoomLevel: 0,
  user: {}
};

MapPanelContainer.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
  atlas: PropTypes.object, // eslint-disable-line
  isLegendVisible: PropTypes.bool.isRequired, // eslint-disable-line
  isMapLayersVisible: PropTypes.bool.isRequired, // eslint-disable-line
  isMapPanelVisible: PropTypes.bool,
  map: PropTypes.object, // eslint-disable-line
  baseLayer: PropTypes.string, // eslint-disable-line
  baseLayers: PropTypes.object, // eslint-disable-line
  mapLayers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func, // eslint-disable-line
  onBaseLayerToggle: PropTypes.func, // eslint-disable-line
  onLayersToggle: PropTypes.func, // eslint-disable-line
  onLayerVisibilityToggle: PropTypes.func, // eslint-disable-line
  onMapPanelToggle: PropTypes.func.isRequired,
  overlays: PropTypes.array, // eslint-disable-line
  user: PropTypes.object, // eslint-disable-line
  zoomLevel: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPanelContainer);
