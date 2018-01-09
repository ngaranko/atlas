import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleFullscreen } from '../../ducks/toggle-fullscreen/map-toggle-fullscreen';

import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';

const mapStateToProps = (state) => ({
  isFullscreen: state.ui.isMapFullscreen
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onToggleFullscreen: toggleFullscreen
}, dispatch);

const MapContainer = (props) => (
  <section className="map">
    <ToggleFullscreen
      isFullscreen={props.isFullscreen}
      onToggleFullscreen={props.onToggleFullscreen}
    />
  </section>
);


MapContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

MapContainer.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
