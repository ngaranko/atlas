import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { PANORAMA_VIEW } from '../../shared/ducks/straatbeeld/straatbeeld';
import PanoramaContainer from '../containers/PanoramaContainer';
import MapContainer from '../../map/containers/map/MapContainer';

const PanoramaPage = ({ view }) => {
  switch (view) {
    case PANORAMA_VIEW.PANO:
      return (
        <PanoramaContainer />
      );
    case PANORAMA_VIEW.MAP:
      return <MapContainer />;
    default: {
      const sizeMap = 4;
      const sizePano = 8;
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
            className={`c-dashboard__column c-dashboard__content u-col-sm--${sizePano} qa-dashboard__column--right`}
          >
            <PanoramaContainer />
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  view: state.straatbeeld.view
});

export default connect(mapStateToProps, null)(PanoramaPage);
