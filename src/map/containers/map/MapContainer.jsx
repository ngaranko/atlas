import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isEmbedded } from '../../../shared/ducks/ui/ui';

import DrawTool from '../../containers/draw-tool/DrawToolContainer';
import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';

import LeafletContainer from '../leaflet/LeafletContainer';
import MapPanelContainer from '../../containers/panel/MapPanelContainer';
import MapPreviewPanelContainer from '../../containers/preview-panel/MapPreviewPanelContainer';
import MapEmbedButton from '../../components/map-embed-button/MapEmbedButton';
import { previewDataAvailable as previewDataAvailableSelector } from '../../../shared/ducks/selection/selection';
import { getDrawingMode } from '../../ducks/map/map-selectors';

const mapStateToProps = (state) => ({
  drawMode: getDrawingMode(state),
  embedMode: isEmbedded(state),
  previewDataAvailable: previewDataAvailableSelector(state)
});

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leafletInstance: null
    };
    this.setLeafletInstance = this.setLeafletInstance.bind(this);
  }

  setLeafletInstance(leafletInstance) {
    this.setState({ leafletInstance });
  }

  render() {
    const {
      embedMode,
      isFullscreen,
      toggleFullscreen,
      drawMode,
      showPreviewPanel,
      previewDataAvailable
    } = this.props;
    return (
      <div className={`c-map c-map--drawing-mode-${drawMode} qa-map-container`}>
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
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
        <MapPanelContainer isMapPanelVisible />
        {
          embedMode ? (
            <MapEmbedButton />
          ) : ''
        }
        { showPreviewPanel && previewDataAvailable && <MapPreviewPanelContainer /> }
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
  showPreviewPanel: false,
  drawMode: 'none'
};

MapContainer.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
  drawMode: PropTypes.string,
  embedMode: PropTypes.bool.isRequired,
  showPreviewPanel: PropTypes.bool,
  previewDataAvailable: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(MapContainer);
