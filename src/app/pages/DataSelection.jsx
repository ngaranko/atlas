import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { AngularWrapper } from 'react-angular';
import { getCatalogFilters } from '../../catalog/ducks/data-selection/data-selection-catalog';
import { getMapBoundingBox, getMapZoom } from '../../map/ducks/map/map-selectors';
import { getUser } from '../../shared/ducks/user/user';
import { getFilters } from '../../shared/ducks/filters/filters';

const mapStateToProps = (state) => ({
  boundingBox: getMapBoundingBox(state),
  catalogFilters: getCatalogFilters(state),
  dataSelectionState: state.dataSelection,
  filters: getFilters(state),
  zoomLevel: getMapZoom(state),
  user: getUser(state)
});

const DataSelection = ({
  boundingBox,
  catalogFilters,
  filters,
  dataSelectionState,
  user,
  zoomLevel,
  view,
  dataset
}) => (
  <div
    className={'c-dashboard__column c-dashboard__content u-col-sm--12 qa-dashboard__column--right'}
  >
    <div className="qa-data-selection">
      <AngularWrapper
        moduleName="dpDataSelectionWrapper"
        component={'dpDataSelection'}
        dependencies={['atlas']}
        bindings={{
          boundingBox,
          catalogFilters,
          filters,
          state: dataSelectionState,
          user,
          zoomLevel,
          view,
          dataset
        }}
      />
    </div>
  </div>
);

DataSelection.defaultProps = {
  boundingBox: undefined,
  zoomLevel: undefined
};

DataSelection.propTypes = {
  boundingBox: PropTypes.arrayOf(PropTypes.number),
  catalogFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dataSelectionState: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  zoomLevel: PropTypes.number,
  view: PropTypes.string.isRequired,
  dataset: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(DataSelection);
