import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LatLngBounds } from 'leaflet';

import { isEmbedded, isEmbedPreview } from '../../../shared/ducks/ui/ui';

import DrawTool from '../../containers/draw-tool/DrawToolContainer';
import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';

import LeafletContainer from '../leaflet/LeafletContainer';
import MapPanelContainer from '../../containers/panel/MapPanelContainer';
import MapPreviewPanelContainer from '../../containers/preview-panel/MapPreviewPanelContainer';
import MapEmbedButton from '../../components/map-embed-button/MapEmbedButton';
import { previewDataAvailable as previewDataAvailableSelector } from '../../../shared/ducks/selection/selection';
import { getDrawingMode } from '../../ducks/map/map-selectors';
import { getIframeUrl } from '../../../shared/services/embed-url/embed-url';

export const overrideLeafletGetBounds = (map) => {
  // We override here the getBounds method of Leaflet
  // To ensure the full coverage of the visible area
  // of the NonTiledLayer layer types
  map.getBounds = () => { // eslint-disable-line no-param-reassign
    const bounds = map.getPixelBounds();
    const sw = map.unproject(bounds.getBottomLeft());
    const ne = map.unproject(bounds.getTopRight());

    const latLngBounds = (new LatLngBounds(sw, ne)).pad(0.02);
    return latLngBounds;
  };
};

const mapStateToProps = (state) => ({
  drawMode: getDrawingMode(state),
  embedMode: isEmbedded(state),
  previewDataAvailable: previewDataAvailableSelector(state),
  embedPreview: isEmbedPreview(state)
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
    overrideLeafletGetBounds(leafletInstance);
    this.setState({ leafletInstance });
  }

  render() {
    const {
      embedMode,
      isFullscreen,
      toggleFullscreen,
      drawMode,
      showPreviewPanel,
      embedPreview,
      previewDataAvailable
    } = this.props;
    return (
      <div style={{ height: '100%' }} className="c-map-page">
        {/* We need to 'hide' the map when showing the embed preview. display:'none' introduces */}
        {/* a bug: leaflet will reset the zoomlevel to 8 */}
        <div className="qa-map" style={embedPreview ? { visibility: 'hidden', height: 0 } : {}}>
          {/* Note: map must not be unmounted when showing the iframe */}
          {/* as it will reset the map's state */}
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
            {toggleFullscreen && (
              <ToggleFullscreen
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            )}
            <MapPanelContainer isMapPanelVisible />
            {
              embedMode ? (
                <MapEmbedButton />
              ) : ''
            }
            {showPreviewPanel && previewDataAvailable && <MapPreviewPanelContainer />}
          </div>
        </div>
        {embedPreview &&
        <iframe
          title="Grote kaart | Dataportaal"
          id="atlas-iframe-map"
          width="500"
          height="400"
          src={getIframeUrl()}
          frameBorder="0"
        />
        }
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
  drawMode: 'none',
  toggleFullscreen: undefined
};

MapContainer.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  toggleFullscreen: PropTypes.func,
  drawMode: PropTypes.string,
  embedMode: PropTypes.bool.isRequired,
  showPreviewPanel: PropTypes.bool,
  previewDataAvailable: PropTypes.bool.isRequired,
  embedPreview: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(MapContainer);
