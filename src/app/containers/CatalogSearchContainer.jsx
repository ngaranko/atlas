import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { AngularWrapper } from 'react-angular';
import { getUser } from '../../shared/ducks/user/user';
import { getFilters } from '../../shared/ducks/filters/filters';
import { getCatalogFilters } from '../../catalog/ducks/data-selection/data-selection-catalog';
import { getMapZoom } from '../../map/ducks/map/map-selectors';
import { getCatalogQuery } from '../../shared/ducks/catalog/catalog';

const mapStateToProps = (state) => ({
  catalogFilters: getCatalogFilters(state),
  dataSelectionState: state.dataSelection,
  filters: getFilters(state),
  zoomLevel: getMapZoom(state),
  user: getUser(state),
  query: getCatalogQuery(state)
});

const CatalogSearchContainer = ({
  boundingBox,
  catalogFilters,
  filters,
  dataSelectionState,
  user,
  zoomLevel,
  view,
  dataset,
  query
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
          dataset,
          query
        }}
      />
    </div>
  </div>
);

CatalogSearchContainer.defaultProps = {
  boundingBox: undefined,
  zoomLevel: undefined,
  isLoading: true,
  dataSelectionState: undefined
};

CatalogSearchContainer.propTypes = {
  boundingBox: PropTypes.arrayOf(PropTypes.number),
  catalogFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dataSelectionState: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  zoomLevel: PropTypes.number,
  view: PropTypes.string.isRequired,
  dataset: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(CatalogSearchContainer);
