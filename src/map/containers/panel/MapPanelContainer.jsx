import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBaseLayers } from '../../ducks/layers/base-layers';
import { getMapLayers, selectActiveMapLayers } from '../../ducks/layers/map-layers';
import { toggleMapOverlay } from '../../ducks/overlays/overlays';
import MapLayers from '../../components/layers/MapLayers';
import MapLegend from '../../components/legend/MapLegend';
import MapType from '../../components/type/MapType';
import MapLayersIcon from '../../../../public/images/icon-map-layers.svg';

const mapStateToProps = state => ({
  activeMapLayers: selectActiveMapLayers(state),
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
        <div className="map-panel__heading">
          <MapLayersIcon className="map-panel__heading-icon" />
          <h1 className="map-panel__heading-title">Kaartlagen</h1>
        </div>
        <div className="scroll-wrapper">
          <MapLegend
            activeMapLayers={this.props.activeMapLayers}
          />
          <MapType
            layers={this.props.baseLayers}
          />
          <MapLayers
            layers={this.props.mapLayers}
            onLayerToggle={this.props.onLayerToggle}
            overlays={this.props.mapOverlays}
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
  mapLayers: []
};

MapPanelContainer.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
  atlas: PropTypes.object, // eslint-disable-line
  layerSelection: PropTypes.object, // eslint-disable-line
  map: PropTypes.object, // eslint-disable-line
  baseLayers: PropTypes.object, // eslint-disable-line
  mapLayers: PropTypes.array, // eslint-disable-line
  mapOverlays: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func // eslint-disable-line
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPanelContainer);
