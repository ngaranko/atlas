import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import MapContainer from '../../map/containers/map/MapContainer';
import { getSearchView, SEARCH_VIEW } from '../../shared/ducks/search/search';
import DataSelection, { VIEW_TYPES as CATALOG } from './DataSelection';
import DATASETS from '../../shared/ducks/data-selection/data-selection-datasets';

const AddressPage = ({ view }) => {
  switch (view) {
    case SEARCH_VIEW.SEARCH:
      return (
        <DataSelection
          view={CATALOG.TABLE}
          dataset={DATASETS.BAG}
        />
      );
    default: {
      const sizeMap = 4;
      const sizeDetail = 8;
      return (
        <div style={{ height: '100%' }}>
          <div
            className={`c-dashboard__column u-col-sm--${sizeMap} qa-dashboard__column--middle u-page-break-after`}
          >
            <div className="qa-map">
              <MapContainer />
            </div>
          </div>
          <div
            className={`c-dashboard__column c-dashboard__content u-col-sm--${sizeDetail} qa-dashboard__column--right`}
          >
            <DataSelection
              view={CATALOG.LIST}
              dataset={DATASETS.BAG}
            />
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  view: getSearchView(state)
});

AddressPage.propTypes = {
  view: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(AddressPage);
