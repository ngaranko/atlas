import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { maximiszeMapPreviewPanel } from '../../ducks/preview-panel/map-preview-panel';
import MaximizeIcon from '../../../../public/images/icon-arrow-down.svg';
import CloseIcon from '../../../../public/images/icon-cross.svg';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMapPreviewPanelMaximize: maximiszeMapPreviewPanel
}, dispatch);

class MapPreviewPanelContainer extends React.Component {
  render() {
    return (
      <section className="map-panel map-panel--preview">
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
            onClick={this.props.onMapPreviewPanelMaximize}
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

MapPreviewPanelContainer.propTypes = {
  onMapPreviewPanelMaximize: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanelContainer);
