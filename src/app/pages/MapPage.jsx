import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapContainer from '../../map/containers/map/MapContainer';
import { toHome } from '../../store/redux-first-router';

/* istanbul ignore next */ // TODO: refactor, test

const MapPage = ({ toggleFullscreen }) =>
  (<MapContainer
    showPreviewPanel
    isFullscreen
    toggleFullscreen={toggleFullscreen}
  />);

MapPage.propTypes = {
  toggleFullscreen: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleFullscreen: toHome
}, dispatch);

export default connect(null, mapDispatchToProps)(MapPage);
