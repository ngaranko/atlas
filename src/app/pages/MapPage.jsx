import React from 'react';
import MapContainer from '../../map/containers/map/MapContainer';

const Map = () => (
  <div style={{ height: '100%' }}>
    <div
      className={'c-dashboard__column u-col-sm--12 qa-dashboard__column--middle u-page-break-after'}
    >
      <div className="qa-map">
        <MapContainer showPreviewPanel isFullscreen />
      </div>
    </div>

  </div>
);

Map.defaultProps = {};

Map.propTypes = {};

export default Map;
