import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMapFullscreen } from '../../../shared/ducks/ui/ui';

import DrawTool from '../../containers/draw-tool/DrawToolContainer'; //eslint-disable-line
import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';

import LeafletContainer from '../leaflet/LeafletContainer';
import MapPanelContainer from '../../containers/panel/MapPanelContainer';
import MapPreviewPanelContainer from '../../containers/preview-panel/MapPreviewPanelContainer';

import { fetchMapBaseLayers } from '../../ducks/base-layers/map-base-layers';
import { fetchMapLayers } from '../../ducks/layers/map-layers';
import { fetchPanelLayers } from '../../ducks/panel-layers/map-panel-layers';

const mapStateToProps = (state) => ({
  isFullscreen: state.ui.isMapFullscreen,
  drawMode: state.map.drawingMode
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onToggleFullscreen: toggleMapFullscreen
}, dispatch);

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leafletInstance: null
    };
    this.setLeafletInstance = this.setLeafletInstance.bind(this);
  }

  componentDidMount() {
    this.context.store.dispatch(fetchMapBaseLayers());
    this.context.store.dispatch(fetchMapLayers());
    this.context.store.dispatch(fetchPanelLayers());
  }

  setLeafletInstance(leafletInstance) {
    this.setState({ leafletInstance });
  }

  render() {
    return (
      <div className={`c-map c-map--drawing-mode-${this.props.drawMode} qa-map-container`}>
        <LeafletContainer
          getLeafletInstance={this.setLeafletInstance}
        />
        {
          this.state.leafletInstance && (
            <DrawTool
              leafletInstance={this.state.leafletInstance}
            />
          )
        }
        <ToggleFullscreen
          isFullscreen={this.props.isFullscreen}
          onToggleFullscreen={this.props.onToggleFullscreen}
        />
        <MapPanelContainer />
        <MapPreviewPanelContainer />
      </div>
    );
  }
}

MapContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

MapContainer.defaultProps = {
  geometry: null,
  leafletInstance: null,
  drawMode: 'none'
};

MapContainer.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
  drawMode: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
