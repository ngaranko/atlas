import React from 'react';
import PropTypes from 'prop-types';

const MapType = ({ layers }) => (
  <section>maptype
  </section>
);

MapType.propTypes = {
  layers: PropTypes.array // eslint-disable-line
};

export default MapType;
/*
<section>
  {layers[0].map(layer => (
    <div className="map-panel__layer-category" key={layer.id}>
      {layer.label}
    </div>
  ))}
</section>
))}
*/
