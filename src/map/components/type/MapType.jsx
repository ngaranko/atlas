import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../../shared/components/select';

const MapType = ({ layers }) => (
  <section className="map-panel__map-type">maptype
    <Select name="topography" value="topo_rd">
      {layers.topography ? layers.topography.map(layer => (
        <option
          value={layer.id}
          key={layer.id}
        >
          {layer.label}
        </option>
      )) : ''}
    </Select>

    <Select name="aerial" value="lf2017">
      {layers.aerial ? layers.aerial.map(layer => (
        <option
          value={layer.id}
          key={layer.id}
        >
          {layer.label}
        </option>
      )) : ''}
    </Select>
  </section>
);

MapType.propTypes = {
  layers: PropTypes.object // eslint-disable-line
};

export default MapType;
