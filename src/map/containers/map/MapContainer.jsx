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

import { getMapBaseLayers } from '../../ducks/base-layers/map-base-layers';
import { getMapLayers } from '../../ducks/layers/map-layers';
import { getPanelLayers } from '../../ducks/panel-layers/panel-layers';

const mapStateToProps = (state) => ({
  isFullscreen: state.ui.isMapFullscreen
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onToggleFullscreen: toggleMapFullscreen
}, dispatch);

class MapContainer extends React.Component { //eslint-disable-line
  constructor(props) { //eslint-disable-line
    super(props);
  }

  componentDidMount() {
    this.context.store.dispatch(getMapBaseLayers());
    this.context.store.dispatch(getMapLayers());
    this.context.store.dispatch(getPanelLayers());
  }

  render() {
    return (
      <div className="c-map c-map--drawing-mode- qa-map-container">
        <LeafletContainer />
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
  geometry: null
};

MapContainer.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
