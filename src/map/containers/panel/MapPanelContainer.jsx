import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBaseLayers } from '../../ducks/layers/base-layers';
import { getMapLayers } from '../../ducks/layers/map-layers';
import { toggleMapOverlay } from '../../ducks/overlays/overlays';
import MapLayers from '../../components/layers/MapLayers';
import MapLegend from '../../components/legend/MapLegend';
import MapType from '../../components/type/MapType';

const mapStateToProps = state => ({
  atlas: state.atlas,
  layerSelection: state.layerSelection,
  map: state.map,
  baseLayers: state.baseLayers,
  mapLayers: state.mapLayers,
  mapOverlays: state.map.overlays
});

// TODO: Add method that checks whether layer is active and toggles accordingly
const mapDispatchToProps = dispatch => bindActionCreators({
  onLayerToggle: toggleMapOverlay
}, dispatch);

class MapPanelContainer extends React.Component {
  componentDidMount() {
    this.context.store.dispatch(getBaseLayers());
    this.context.store.dispatch(getMapLayers());
  }

  render() {
    return this.props.layerSelection.isEnabled && (
      <section className="map-panel">
        <h1 className="map-panel__heading">Kaartlagen</h1>
        <MapLegend />
        <MapType
          layers={this.props.baseLayers}
        />
        <MapLayers
          layers={this.props.mapLayers}
          onLayerToggle={this.props.onLayerToggle}
          overlays={this.props.mapOverlays}
        />
      </section>
    );
  }
}

MapPanelContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

MapPanelContainer.defaultProps = {
  atlas: {},
  layerSelection: {},
  map: {},
  baseLayers: {},
  mapLayers: []
};

MapPanelContainer.propTypes = {
  atlas: PropTypes.object, // eslint-disable-line
  layerSelection: PropTypes.object, // eslint-disable-line
  map: PropTypes.object, // eslint-disable-line
  baseLayers: PropTypes.object, // eslint-disable-line
  mapLayers: PropTypes.array, // eslint-disable-line
  mapOverlays: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func // eslint-disable-line
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPanelContainer);
