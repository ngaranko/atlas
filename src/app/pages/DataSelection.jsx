import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapContainer from '../../map/containers/map/MapContainer';
import NewDataSelection from '../components/DataSelection/DataSelection';
import { isListView } from '../../shared/ducks/data-selection/selectors';
import SplitScreen from '../components/SplitScreen/SplitScreen';
import { toMapAndPreserveQuery } from '../../store/redux-first-router';


/* istanbul ignore next */ // TODO: refactor, test
const DataSelection = ({ showMap, toggleFullscreen }) => {
  if (!showMap) {
    return (
      <NewDataSelection />
    );
  }
  return (
    <SplitScreen
      leftComponent={(
        <MapContainer isFullscreen={false} toggleFullscreen={toggleFullscreen} />
      )}
      rightComponent={(
        <NewDataSelection />
      )}
    />
  );
};

DataSelection.propTypes = {
  showMap: PropTypes.bool.isRequired,
  toggleFullscreen: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  showMap: isListView(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleFullscreen: toMapAndPreserveQuery
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DataSelection);
