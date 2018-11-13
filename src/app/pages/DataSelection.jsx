import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import MapContainer from '../../map/containers/map/MapContainer';
import NewDataSelection from '../components/DataSelection/DataSelection';
import { isListView } from '../../shared/ducks/data-selection/data-selection';

/* istanbul ignore next */ // TODO: refactor, test
const DataSelection = ({ showMap }) => {
  if (!showMap) {
    return (
      <NewDataSelection />
    );
  }
  const sizeMap = 4;
  const sizeDetail = 8;
  return (
    <div style={{ height: '100%' }}>
      <div
        className={`c-dashboard__column u-col-sm--${sizeMap} qa-dashboard__column--middle u-page-break-after`}
      >
        <div className="qa-map">
          <MapContainer isFullscreen={false} />
        </div>
      </div>
      <div
        className={`c-dashboard__column c-dashboard__content u-col-sm--${sizeDetail} qa-dashboard__column--right`}
      >
        <NewDataSelection />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  showMap: isListView(state)
});

DataSelection.propTypes = {
  showMap: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, null)(DataSelection);
