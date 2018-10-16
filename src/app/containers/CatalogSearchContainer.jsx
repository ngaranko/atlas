import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { AngularWrapper } from 'react-angular';

const mapStateToProps = (state) => ({
  catalogFilters: state.catalogFilters,
  dataSelectionState: state.dataSelection,
  filters: state.filters,
  zoomLevel: state.map.zoom,
  user: state.user,
  query: state.catalog.query
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
