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
