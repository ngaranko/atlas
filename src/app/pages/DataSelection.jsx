import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapContainer from '../../map/containers/map/MapContainer';
import NewDataSelection from '../components/DataSelection/DataSelection';
import { isListView, isMapView } from '../../shared/ducks/data-selection/selectors';
import SplitScreen from '../components/SplitScreen/SplitScreen';
import { VIEWS } from '../../shared/ducks/data-selection/constants';
import { setView } from '../../shared/ducks/data-selection/actions';


/* istanbul ignore next */ // TODO: refactor, test
const DataSelection = ({ showList, showMap, toggleList, toggleMap }) => {
  if (showMap) {
    return (<MapContainer isFullscreen toggleFullscreen={toggleList} />);
  }
  if (showList) {
    return (
      <SplitScreen
        leftComponent={(
          <MapContainer isFullscreen={false} toggleFullscreen={toggleMap} />
        )}
        rightComponent={(
          <NewDataSelection />
        )}
      />
    );
  }

  return (
    <NewDataSelection />
  );
};

DataSelection.propTypes = {
  showList: PropTypes.bool.isRequired,
  showMap: PropTypes.bool.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleMap: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  showList: isListView(state),
  showMap: isMapView(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleList: () => setView(VIEWS.LIST),
  toggleMap: () => setView(VIEWS.MAP)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DataSelection);
