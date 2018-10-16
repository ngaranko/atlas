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
import { isMapSubPage } from '../../../app/routes';
import { isMapCurrentPage } from '../../../reducers/current-page-reducer';

const mapStateToProps = (state) => ({
  isFullscreen: isMapCurrentPage(state),
  drawMode: state.map.drawingMode,
  embedMode: isEmbedded(state),
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
    const { currentPage, embedMode, isFullscreen, onToggleFullscreen, drawMode } = this.props;
    const mapSubPage = isMapSubPage(currentPage);
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
        <MapPanelContainer isMapPanelVisible={!mapSubPage} />
        {
          embedMode ? (
            <MapEmbedButton />
          ) : ''
        }
        {!mapSubPage && <MapPreviewPanelContainer />}
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
  currentPage: PropTypes.string.isRequired,
  drawMode: PropTypes.string,
  embedMode: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
