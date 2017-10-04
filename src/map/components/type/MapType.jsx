import React from 'react';
import PropTypes from 'prop-types';

const MapType = ({ layers }) => (
  <section className="map-panel__map-type">maptype
    {layers.map(layer => (
      <div key={layer.id}>
        <div>{layer.title}</div>
        <div>{layer.id}</div>
      </div>
    ))}
  </section>
);

MapType.propTypes = {
  layers: PropTypes.array // eslint-disable-line
};

export default MapType;
