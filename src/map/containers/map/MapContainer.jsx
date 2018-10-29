import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LatLngBounds } from 'leaflet';

import { toggleMapFullscreen } from '../../../shared/ducks/ui/ui';

import DrawTool from '../../containers/draw-tool/DrawToolContainer'; //eslint-disable-line
import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';

import LeafletContainer from '../leaflet/LeafletContainer';
import MapPanelContainer from '../../containers/panel/MapPanelContainer';
import MapPreviewPanelContainer from '../../containers/preview-panel/MapPreviewPanelContainer';
import MapEmbedButton from '../../components/map-embed-button/MapEmbedButton';

import getEmbedLink from '../../ducks/embed/embed';

export const overrideLeafletGetBounds = (map) => {
  // We override here the getBounds method of Leaflet
  // To ensure the full coverage of the visible area
  // of the NonTiledLayer layer types
  map.getBounds = () => { // eslint-disable-line no-param-reassign
    const bounds = map.getPixelBounds();
    const sw = map.unproject(bounds.getBottomLeft());
    const ne = map.unproject(bounds.getTopRight());

    const latLngBounds = (new LatLngBounds(sw, ne)).pad(0.1);
    return latLngBounds;
  };
};

const mapStateToProps = (state) => ({
  isFullscreen: state.ui.isMapFullscreen,
  drawMode: state.map.drawingMode,
  embedLink: getEmbedLink(state)
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
    overrideLeafletGetBounds(leafletInstance);
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
        {
          this.props.embedLink.length ? (
            <MapEmbedButton link={this.props.embedLink} />
          ) : ''
        }
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
  drawMode: 'none',
  embedLink: ''
};

MapContainer.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
  drawMode: PropTypes.string,
  embedLink: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
