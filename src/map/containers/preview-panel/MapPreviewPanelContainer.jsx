import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  maximizeMapPreviewPanel,
  closeMapPreviewPanel
} from '../../ducks/preview-panel/map-preview-panel';
import MaximizeIcon from '../../../../public/images/icon-arrow-down.svg';
import CloseIcon from '../../../../public/images/icon-cross.svg';

const mapStateToProps = state => ({
  isMapPreviewPanelVisible: state.isMapPreviewPanelVisible,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMapPreviewPanelMaximize: maximizeMapPreviewPanel,
  onMapPreviewPanelClose: closeMapPreviewPanel
}, dispatch);

class MapPreviewPanelContainer extends React.Component {
  render() {
    return (
      <section className={`
        map-panel
        map-panel--preview
        ${this.props.isMapPreviewPanelVisible ? '' : 'map-panel--hidden'}
      `}
      >
        <div className="map-panel__heading">
          <h1 className="map-panel__heading-title map-panel__heading-title--hidden">Preview</h1>
          <button
            className="map-panel__toggle"
            onClick={this.props.onMapPreviewPanelMaximize}
          >
            <MaximizeIcon className="map-panel__toggle-icon" />
          </button>
          <button
            className="map-panel__toggle"
            onClick={this.props.onMapPreviewPanelClose}
          >
            <CloseIcon className="map-panel__toggle-icon" />
          </button>
        </div>
        <div>
          Map Preview Panel Container
        </div>
      </section>
    );
  }
}

MapPreviewPanelContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

MapPreviewPanelContainer.defaultProps = {
  isMapPreviewPanelVisible: false
};

MapPreviewPanelContainer.propTypes = {
  isMapPreviewPanelVisible: PropTypes.bool,
  onMapPreviewPanelMaximize: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanelContainer);
