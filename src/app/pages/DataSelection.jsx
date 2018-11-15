import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapContainer from '../../map/containers/map/MapContainer';
import NewDataSelection from '../components/DataSelection/DataSelection';
import { isListView } from '../../shared/ducks/data-selection/data-selection';
import SplitScreen from '../components/SplitScreen/SplitScreen';

/* istanbul ignore next */ // TODO: refactor, test
const DataSelection = ({ showMap }) => {
  if (!showMap) {
    return (
      <NewDataSelection />
    );
  }
  return (
    <SplitScreen
      leftComponent={(
        <MapContainer isFullscreen={false} />
      )}
      rightComponent={(
        <NewDataSelection />
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  showMap: isListView(state)
});

DataSelection.propTypes = {
  showMap: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, null)(DataSelection);
