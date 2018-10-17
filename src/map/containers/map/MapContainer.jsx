import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isEmbedded, toggleMapFullscreen } from '../../../shared/ducks/ui/ui';

import DrawTool from '../../containers/draw-tool/DrawToolContainer';
import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';

import LeafletContainer from '../leaflet/LeafletContainer';
import MapPanelContainer from '../../containers/panel/MapPanelContainer';
import MapPreviewPanelContainer from '../../containers/preview-panel/MapPreviewPanelContainer';
import MapEmbedButton from '../../components/map-embed-button/MapEmbedButton';
import { isMapCurrentPage } from '../../../shared/ducks/current-page/current-page-reducer';
import { previewDataAvailable as previewDataAvailableSelector } from '../../ducks/preview-panel/map-preview-panel';
import { getDrawingMode } from '../../ducks/map/map-selectors';

const mapStateToProps = (state) => ({
  isFullscreen: isMapCurrentPage(state),
  drawMode: getDrawingMode(state),
  embedMode: isEmbedded(state),
  previewDataAvailable: previewDataAvailableSelector(state)
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

  setLeafletInstance(leafletInstance) {
    this.setState({ leafletInstance });
  }

  render() {
    const {
      embedMode,
      isFullscreen,
      onToggleFullscreen,
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
          onToggleFullscreen={onToggleFullscreen}
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
  onToggleFullscreen: PropTypes.func.isRequired,
  drawMode: PropTypes.string,
  embedMode: PropTypes.bool.isRequired,
  showPreviewPanel: PropTypes.bool,
  previewDataAvailable: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
