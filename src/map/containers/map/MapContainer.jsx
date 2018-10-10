import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMapFullscreen } from '../../../shared/ducks/ui/ui';

import DrawTool from '../../containers/draw-tool/DrawToolContainer';
import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';

import LeafletContainer from '../leaflet/LeafletContainer';
import MapPanelContainer from '../../containers/panel/MapPanelContainer';
import MapPreviewPanelContainer from '../../containers/preview-panel/MapPreviewPanelContainer';
import MapEmbedButton from '../../components/map-embed-button/MapEmbedButton';

import getEmbedLink from '../../ducks/embed/embed';
import { routing } from '../../../app/routes';

const mapStateToProps = (state) => ({
  isFullscreen: state.ui.isMapFullscreen,
  drawMode: state.map.drawingMode,
  embedLink: getEmbedLink(state),
  currentPage: state.currentPage
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
    const { currentPage } = this.props;
    const isMapSubPage = routing.map.children.includes(currentPage);
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
        <MapPanelContainer isMapPanelVisible={!isMapSubPage} />
        {
          this.props.embedLink.length ? (
            <MapEmbedButton link={this.props.embedLink} />
          ) : ''
        }
        {!isMapSubPage && <MapPreviewPanelContainer />}
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
  currentPage: PropTypes.string.isRequired,
  drawMode: PropTypes.string,
  embedLink: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
