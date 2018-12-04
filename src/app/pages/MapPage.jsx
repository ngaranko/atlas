import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapContainer from '../../map/containers/map/MapContainer';
import { toHome } from '../../store/redux-first-router';
import { getSelectionLocation } from '../../shared/ducks/selection/selection';
import { hasGeometryFilter as test } from '../../shared/ducks/data-selection/selectors';
import { setView } from '../../shared/ducks/data-selection/actions';
import { VIEWS } from '../../shared/ducks/data-selection/constants';

/* istanbul ignore next */ // TODO: refactor, test
const MapPage = ({
  hasSelectionLocation,
  hasGeometryFilter,
  navigateToHome,
  navigateToDatasets
}) => {
  const showTogggle = !hasSelectionLocation;
  const navigateAction = hasGeometryFilter ? () => navigateToDatasets(VIEWS.MAP) : navigateToHome;
  const toggleAction = showTogggle ? navigateAction : undefined;
  return (<MapContainer
    showPreviewPanel
    isFullscreen
    toggleFullscreen={toggleAction}
  />);
};

MapPage.propTypes = {
  hasSelectionLocation: PropTypes.bool.isRequired,
  hasGeometryFilter: PropTypes.bool.isRequired,
  navigateToHome: PropTypes.func.isRequired,
  navigateToDatasets: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  hasSelectionLocation: getSelectionLocation(state),
  hasGeometryFilter: test(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  navigateToHome: toHome,
  navigateToDatasets: setView
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
