import React from 'react';
import PropTypes from 'prop-types';

const MapType = ({ layers }) => (
  <section className="map-panel__map-type">maptype

    {layers.topography ? layers.topography.map(layer => (
      <div key={layer.id}>
        <div>{layer.label}</div>
      </div>
    )) : ''}

    {layers.aerial ? layers.aerial.map(layer => (
      <div key={layer.id}>
        <div>{layer.label}</div>
      </div>
    )) : ''}

  </section>
);

MapType.propTypes = {
  layers: PropTypes.object // eslint-disable-line
};

export default MapType;
